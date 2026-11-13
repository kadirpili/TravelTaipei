import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  BASE_LOCATIONS,
  CURATED_ITINERARIES,
  PLACES_DATA,
} from '../data/placesData';
import {
  buildQuickExpandSummary,
  calculateDistanceKm,
  estimateTravelTime,
  filterAndSortPlaces,
  getAvailableSubCategories,
  getDistrictCounts,
  sortPlacesByDistanceFromHub,
} from './placesLogic';
import { buildOfflineSnapshot, latLngToTileXYZ } from './offlineCache';
import { getPlaceImageUrl } from './placeImages';
import { getLocalizedPlaceText, PLACE_TRANSLATIONS_RU } from '../data/translationsRu';
import { BOOKABLE_TOURS } from '../data/toursData';
import { filterMustTrySnacks, MUST_TRY_SNACKS } from '../data/snacksData';
import { FESTIVE_EVENTS, filterFestiveEvents } from '../data/eventsData';
import { TAIWAN_ACTIVITIES, filterTaiwanActivities } from '../data/activitiesData';
import { TAIPEI_MRT_LINES, TAIPEI_MRT_STATIONS } from '../data/taipeiMrtData';

test('dataset integrity: all places have valid coordinates, Google Maps links, Russian translations, and local photographs', () => {
  assert.ok(PLACES_DATA.length >= 65, `Expected at least 65 places, got ${PLACES_DATA.length}`);
  const seenIds = new Set<string>();

  for (const place of PLACES_DATA) {
    assert.ok(!seenIds.has(place.id), `Duplicate place id: ${place.id}`);
    seenIds.add(place.id);
    assert.ok(place.lat > 24.0 && place.lat < 25.3, `Invalid latitude for ${place.id}`);
    assert.ok(place.lng > 120.5 && place.lng < 122.0, `Invalid longitude for ${place.id}`);
    assert.ok(place.googleMapsUrl.startsWith('https://maps.google.com/?q='), `Invalid map link for ${place.id}`);
    assert.ok(PLACE_TRANSLATIONS_RU[place.id], `Missing Russian translation for ${place.id}`);

    const imgRel = getPlaceImageUrl(place.id);
    assert.equal(imgRel, `/images/places/${place.id}.jpg`);
    const diskPath = path.join(process.cwd(), 'public', imgRel);
    assert.ok(fs.existsSync(diskPath), `Missing image file on disk for ${place.id}: ${diskPath}`);
    assert.ok(fs.statSync(diskPath).size > 3000, `Image file too small for ${place.id}`);
  }
});

test('all places in public/places-offline-cache.json match PLACES_DATA, have local photographs, and contain zero bars', () => {
  const cacheJsonPath = path.join(process.cwd(), 'public/places-offline-cache.json');
  const cacheData = JSON.parse(fs.readFileSync(cacheJsonPath, 'utf8'));
  assert.equal(cacheData.places.length, PLACES_DATA.length);
  for (const place of cacheData.places) {
    assert.notEqual(place.macroCategory, 'nightlife');
    assert.notEqual(place.subCategory, 'Bars & Craft Beer');
    const diskPath = path.join(process.cwd(), 'public', getPlaceImageUrl(place.id));
    assert.ok(fs.existsSync(diskPath), `Missing image file for cached place ${place.id}`);
    assert.ok(fs.statSync(diskPath).size > 3000, `Image file too small for cached place ${place.id}`);
  }
});

test('all curated itinerary stops reference existing place IDs', () => {
  const validIds = new Set(PLACES_DATA.map((p) => p.id));
  for (const itinerary of CURATED_ITINERARIES) {
    assert.ok(itinerary.stops.length >= 4);
    for (const stop of itinerary.stops) {
      assert.ok(
        validIds.has(stop.placeId),
        `Itinerary ${itinerary.id} references missing placeId: ${stop.placeId}`
      );
    }
  }
});

test('calculateDistanceKm and estimateTravelTime support both Russian (default) and English', () => {
  const taipei101 = PLACES_DATA.find((p) => p.id === 'taipei-101')!;
  const elephantMtn = PLACES_DATA.find((p) => p.id === 'elephant-mountain')!;
  const dist = calculateDistanceKm(
    taipei101.lat,
    taipei101.lng,
    elephantMtn.lat,
    elephantMtn.lng
  );
  // Taipei 101 to Elephant Mountain is roughly 0.9 - 1.1 km
  assert.ok(dist > 0.7 && dist < 1.3, `Unexpected distance: ${dist} km`);
  assert.match(estimateTravelTime(dist, 'ru'), /мин пешком/);
  assert.match(estimateTravelTime(dist, 'en'), /min walk/);
});

test('filterAndSortPlaces supports Russian, English, and Chinese queries', () => {
  const xinyiBase = BASE_LOCATIONS.find((b) => b.id === 'xinyi-101')!;

  // Search for Haidilao in English
  const haidilaoResults = filterAndSortPlaces(PLACES_DATA, {
    macroCategory: 'all',
    subCategory: 'all',
    district: 'all',
    priceTier: 'all',
    searchQuery: 'Haidilao',
    savedOnly: false,
    savedIds: [],
    sortBy: 'nearest',
    baseLocation: xinyiBase,
    lang: 'ru',
  });

  assert.equal(haidilaoResults.length, 5);
  assert.equal(haidilaoResults[0].id, 'haidilao-breeze-nanshan');
  assert.ok(haidilaoResults[0].distanceKm <= haidilaoResults[1].distanceKm);

  // Search in Russian for 'Симыньдин'
  const ximendingRu = filterAndSortPlaces(PLACES_DATA, {
    macroCategory: 'all',
    subCategory: 'all',
    district: 'all',
    priceTier: 'all',
    searchQuery: 'Симыньдин',
    savedOnly: false,
    savedIds: [],
    sortBy: 'featured',
    baseLocation: xinyiBase,
    lang: 'ru',
  });
  assert.ok(ximendingRu.some((p) => p.id === 'ximending'));

  // Verify getLocalizedPlaceText returns Russian and English correctly
  const ximendingPlace = PLACES_DATA.find((p) => p.id === 'ximending')!;
  assert.match(getLocalizedPlaceText(ximendingPlace, 'ru').displayName, /Симыньдин/);
  assert.equal(getLocalizedPlaceText(ximendingPlace, 'en').displayName, 'Ximending');
});

test('getAvailableSubCategories and getDistrictCounts return accurate counts', () => {
  const sightSubs = getAvailableSubCategories(PLACES_DATA, 'sights');
  assert.ok(sightSubs.length >= 4);
  const totalSights = sightSubs.reduce((acc, item) => acc + item.count, 0);
  assert.equal(
    totalSights,
    PLACES_DATA.filter((p) => p.macroCategory === 'sights').length
  );

  const districts = getDistrictCounts(PLACES_DATA, 'all');
  assert.ok(districts.some((d) => d.district === 'Xinyi'));
  assert.ok(districts.some((d) => d.district === "Da'an"));
});

test('buildOfflineSnapshot captures all places, saved spots count, and remote mountain spots', () => {
  const saved = ['taipei-101', 'jiufen-old-street', 'yangmingshan-np'];
  const snapshot = buildOfflineSnapshot(
    PLACES_DATA,
    saved,
    '2026-10-31T00:00:00.000Z'
  );
  assert.equal(snapshot.placesCount, PLACES_DATA.length);
  assert.equal(snapshot.savedPlacesCount, 3);
  assert.ok(snapshot.remoteMountainSpotsCount >= 10);
  assert.equal(snapshot.syncedAt, '2026-10-31T00:00:00.000Z');
});

test('latLngToTileXYZ computes valid OpenStreetMap XYZ tile coordinates for Taipei 101', () => {
  const tile = latLngToTileXYZ(25.0339, 121.5645, 13);
  assert.equal(tile.z, 13);
  assert.ok(tile.x > 6800 && tile.x < 6900);
  assert.ok(tile.y > 3500 && tile.y < 3600);
});

test('buildQuickExpandSummary computes taxi phrase, GPS coordinates, duration, and 3 sorted nearby spots', () => {
  const xinyiBase = BASE_LOCATIONS.find((b) => b.id === 'xinyi-101')!;
  const enriched = filterAndSortPlaces(PLACES_DATA, {
    macroCategory: 'all',
    subCategory: 'all',
    district: 'all',
    priceTier: 'all',
    searchQuery: '',
    savedOnly: false,
    savedIds: [],
    sortBy: 'featured',
    baseLocation: xinyiBase,
    lang: 'ru',
  });
  const taipei101 = enriched.find((p) => p.id === 'taipei-101')!;
  const summaryRu = buildQuickExpandSummary(taipei101, enriched, 'ru');

  assert.match(summaryRu.taxiPhrase, /^請載我去：台北101/);
  assert.match(summaryRu.coordinatesText, /25\.\d{4}° N, 121\.\d{4}° E/);
  assert.ok(summaryRu.suggestedDuration.length > 0);
  assert.equal(summaryRu.nearbySpots.length, 3);
  assert.ok(
    summaryRu.nearbySpots[0].distanceFromHereKm <=
      summaryRu.nearbySpots[1].distanceFromHereKm
  );
  assert.equal(summaryRu.nearbySpots[0].place.id, 'din-tai-fung-101');
});

test('personal hubs (My Stay near Brownies in Xinyi, Brownies Restaurant, and Google TPKD Office) are prioritized and filterable', () => {
  const stayBase = BASE_LOCATIONS.find((b) => b.id === 'xinyi-brownies-stay')!;
  const tpkdBase = BASE_LOCATIONS.find((b) => b.id === 'tpkd-office')!;
  assert.ok(stayBase, 'Missing xinyi-brownies-stay base location');
  assert.ok(tpkdBase, 'Missing tpkd-office base location');

  const hubsOnly = filterAndSortPlaces(PLACES_DATA, {
    macroCategory: 'all',
    subCategory: 'all',
    district: 'all',
    priceTier: 'all',
    searchQuery: '',
    savedOnly: false,
    personalHubsOnly: true,
    savedIds: [],
    sortBy: 'featured',
    baseLocation: stayBase,
    lang: 'ru',
  });

  const hubIds = hubsOnly.map((p) => p.id);
  assert.ok(hubIds.includes('my-stay-xinyi-brownies'));
  assert.ok(hubIds.includes('brownies-xinyi'));
  assert.ok(hubIds.includes('google-tpkd-office'));

  // Verify Brownies Restaurant is right next to My Stay in Xinyi (< 0.1 km)
  const brownies = hubsOnly.find((p) => p.id === 'brownies-xinyi')!;
  assert.ok(brownies.distanceKm < 0.1, `Expected Brownies to be < 0.1km from stay, got ${brownies.distanceKm}`);
});

test('requested landmarks (Dadaocheng, Dihua Street, Yongkang/Yongkan Street, Yehliu/Yeliou, Maokong, Costco) exist and are searchable', () => {
  const stayBase = BASE_LOCATIONS[0];
  const expectedIds = [
    'dadaocheng-wharf',
    'dihua-street',
    'yongkang-street',
    'yehliu-geopark',
    'maokong',
    'maokong-camphor-trail-teahouses',
    'costco-neihu',
    'costco-zhonghe',
  ];

  for (const id of expectedIds) {
    assert.ok(PLACES_DATA.some((p) => p.id === id), `Missing expected place ID: ${id}`);
  }

  for (const query of ['Dadaocheng', 'Dihua', 'Yongkan', 'Yeliou', 'Maokong', 'Costco']) {
    const results = filterAndSortPlaces(PLACES_DATA, {
      macroCategory: 'all',
      subCategory: 'all',
      district: 'all',
      priceTier: 'all',
      searchQuery: query,
      savedOnly: false,
      savedIds: [],
      sortBy: 'featured',
      baseLocation: stayBase,
      lang: 'ru',
    });
    assert.ok(results.length >= 1, `Expected search query "${query}" to return at least 1 result`);
  }
});

test('all BOOKABLE_TOURS have valid prices, operating days, departure/return times, and mapped stop placeIds', () => {
  assert.ok(BOOKABLE_TOURS.length >= 5, `Expected at least 5 bookable tours, got ${BOOKABLE_TOURS.length}`);
  const validPlaceIds = new Set(PLACES_DATA.map((p) => p.id));

  for (const tour of BOOKABLE_TOURS) {
    assert.ok(tour.priceUsd.includes('$'), `Tour ${tour.id} missing USD price`);
    assert.ok(tour.priceTwd.includes('NT$'), `Tour ${tour.id} missing TWD price`);
    assert.ok(tour.daysOfWeekEn.length > 0 && tour.daysOfWeekRu.length > 0, `Tour ${tour.id} missing operating days`);
    assert.ok(tour.departureTimesEn.length > 0 && tour.departureTimesRu.length > 0, `Tour ${tour.id} missing departure times`);
    assert.ok(tour.bookingUrl.startsWith('https://www.klook.com/'), `Tour ${tour.id} missing valid Klook URL`);
    assert.ok(tour.kkdayUrl.startsWith('https://www.kkday.com/'), `Tour ${tour.id} missing valid KKday URL`);
    assert.ok(tour.getYourGuideUrl.startsWith('https://'), `Tour ${tour.id} missing valid GetYourGuide/FunPASS URL`);
    assert.ok(tour.providerLinks.length >= 3, `Tour ${tour.id} should have at least 3 provider booking links`);
    for (const pl of tour.providerLinks) {
      assert.ok(pl.url.startsWith('https://'), `Tour ${tour.id} provider link ${pl.platform} invalid URL`);
    }
    assert.ok(tour.stops.length >= 3, `Tour ${tour.id} should have at least 3 route stops`);

    for (const stop of tour.stops) {
      assert.ok(
        validPlaceIds.has(stop.placeId),
        `Tour ${tour.id} stop #${stop.stopNumber} references missing placeId: ${stop.placeId}`
      );
    }
  }
});

test('newly added restaurants (Youmeca Restaurant, Din Tai Fung / Digntaifung, Jhuji / Zhujian Hotpot) exist and match user queries', () => {
  const stayBase = BASE_LOCATIONS[0];
  const expectedNewIds = [
    'youmeca-restaurant',
    'youmeca-coffee',
    'din-tai-fung-101',
    'din-tai-fung-xinsheng',
    'zhujian-hotpot',
    'zhuji-dumplings',
  ];

  for (const id of expectedNewIds) {
    assert.ok(PLACES_DATA.some((p) => p.id === id), `Missing expected restaurant ID: ${id}`);
  }

  const queryExpectations: Array<{ query: string; expectedId: string }> = [
    { query: 'youmeca restaraunt', expectedId: 'youmeca-restaurant' },
    { query: 'youmeca', expectedId: 'youmeca-restaurant' },
    { query: 'digntaifung', expectedId: 'din-tai-fung-101' },
    { query: 'digntaifung', expectedId: 'din-tai-fung-xinsheng' },
    { query: 'jhuji', expectedId: 'zhujian-hotpot' },
    { query: 'jhuji', expectedId: 'zhuji-dumplings' },
    { query: 'zhujian hotpot', expectedId: 'zhujian-hotpot' },
    { query: 'jhuji, zhujian hotpot', expectedId: 'zhujian-hotpot' },
  ];

  for (const { query, expectedId } of queryExpectations) {
    const results = filterAndSortPlaces(PLACES_DATA, {
      macroCategory: 'all',
      subCategory: 'all',
      district: 'all',
      priceTier: 'all',
      searchQuery: query,
      savedOnly: false,
      savedIds: [],
      sortBy: 'featured',
      baseLocation: stayBase,
      lang: 'ru',
    });
    assert.ok(
      results.some((p) => p.id === expectedId),
      `Expected search query "${query}" to include place ID "${expectedId}", got: ${results.map((r) => r.id).join(', ')}`
    );
  }
});

test('MUST_TRY_SNACKS and new snack/boba/nougat places exist, map to valid placeIds, and support typo-tolerant search', () => {
  assert.ok(MUST_TRY_SNACKS.length >= 12, `Expected at least 12 must-try snacks, got ${MUST_TRY_SNACKS.length}`);
  const validPlaceIds = new Set(PLACES_DATA.map((p) => p.id));

  for (const snack of MUST_TRY_SNACKS) {
    assert.ok(snack.titleRu.length > 0 && snack.titleEn.length > 0, `Snack ${snack.id} missing title`);
    assert.ok(snack.chineseName.length > 0, `Snack ${snack.id} missing Chinese name`);
    assert.ok(snack.orderPhraseChinese.length > 0, `Snack ${snack.id} missing Chinese order phrase`);
    assert.ok(snack.priceRangeTwd.includes('NT$'), `Snack ${snack.id} missing TWD price`);
    assert.ok(snack.placeIds.length >= 2, `Snack ${snack.id} should map to at least 2 Taipei places`);
    assert.ok(validPlaceIds.has(snack.imagePlaceId), `Snack ${snack.id} imagePlaceId ${snack.imagePlaceId} not in PLACES_DATA`);
    for (const pid of snack.placeIds) {
      assert.ok(validPlaceIds.has(pid), `Snack ${snack.id} references unknown placeId: ${pid}`);
    }
  }

  // Verify Bubble Milk Tea and Nougat Crackers (including typo 'Noughut crackers')
  const bobaMatches = filterMustTrySnacks(MUST_TRY_SNACKS, 'all', 'Bubble Milk Tea');
  assert.ok(bobaMatches.some((s) => s.id === 'bubble-milk-tea'));

  const noughutMatches = filterMustTrySnacks(MUST_TRY_SNACKS, 'all', 'Noughut crackers');
  assert.ok(noughutMatches.some((s) => s.id === 'scallion-nougat-crackers'));

  const souvenirsOnly = filterMustTrySnacks(MUST_TRY_SNACKS, 'souvenirs', '');
  assert.equal(souvenirsOnly.length, 3);
  assert.ok(souvenirsOnly.every((s) => s.isTopSouvenir));
});

test('real-time Sort by distance (sortBy: nearest) recalculates distances, ranks, and order for each Base Location hub', () => {
  assert.ok(BASE_LOCATIONS.length >= 8, 'Expected at least 8 Base Location hubs including Brownies');

  for (const hub of BASE_LOCATIONS) {
    const sorted = sortPlacesByDistanceFromHub(PLACES_DATA, hub, 'ru');
    assert.equal(sorted.length, PLACES_DATA.length);

    for (let i = 0; i < sorted.length; i++) {
      assert.equal(
        sorted[i].distanceRank,
        i + 1,
        `Expected distanceRank ${i + 1} at index ${i} for hub ${hub.id}`
      );
      assert.ok(
        sorted[i].directionsUrl.includes(`origin=${hub.lat},${hub.lng}`),
        `Expected directionsUrl to use hub origin for ${hub.id}`
      );
      if (i > 0) {
        assert.ok(
          sorted[i - 1].distanceKm <= sorted[i].distanceKm,
          `Expected non-decreasing distanceKm at index ${i} for hub ${hub.id}: ${sorted[i - 1].distanceKm} > ${sorted[i].distanceKm}`
        );
      }
    }
  }

  // Verify switching hubs dynamically changes the #1 nearest place
  const xinyiStayHub = BASE_LOCATIONS.find((b) => b.id === 'xinyi-brownies-stay')!;
  const browniesHub = BASE_LOCATIONS.find((b) => b.id === 'brownies-xinyi')!;
  const tpkdHub = BASE_LOCATIONS.find((b) => b.id === 'tpkd-office')!;

  const nearestToStay = sortPlacesByDistanceFromHub(PLACES_DATA, xinyiStayHub, 'ru');
  assert.equal(nearestToStay[0].id, 'my-stay-xinyi-brownies');
  assert.equal(nearestToStay[0].distanceKm, 0);
  assert.equal(nearestToStay[1].id, 'brownies-xinyi');

  const nearestToBrownies = sortPlacesByDistanceFromHub(PLACES_DATA, browniesHub, 'ru');
  assert.equal(nearestToBrownies[0].id, 'brownies-xinyi');
  assert.equal(nearestToBrownies[0].distanceKm, 0);

  const nearestToTpkd = sortPlacesByDistanceFromHub(PLACES_DATA, tpkdHub, 'ru');
  assert.equal(nearestToTpkd[0].id, 'google-tpkd-office');
  assert.equal(nearestToTpkd[0].distanceKm, 0);
});

test('Taipei MRT metro lines and stations dataset covers all 6 color-coded lines and major transfer stations', () => {
  assert.equal(TAIPEI_MRT_LINES.length, 6);
  const lineIds = TAIPEI_MRT_LINES.map((l) => l.id);
  assert.deepEqual(lineIds, ['R', 'BL', 'G', 'O', 'BR', 'Y']);
  for (const line of TAIPEI_MRT_LINES) {
    assert.ok(line.segments.length > 0, `Expected route segments for MRT line ${line.id}`);
    assert.ok(line.color.startsWith('#'), `Expected hex color for MRT line ${line.id}`);
  }

  assert.ok(TAIPEI_MRT_STATIONS.length >= 115);
  const taipei101Station = TAIPEI_MRT_STATIONS.find((s) => s.code === 'R03');
  assert.ok(taipei101Station, 'Expected Taipei 101 / World Trade Center MRT station (R03)');
  const mainStation = TAIPEI_MRT_STATIONS.find((s) => s.nameZh === '台北車站');
  assert.ok(mainStation?.isTransfer, 'Expected Taipei Main Station to be marked as transfer');
});

test('Lihpao Land Resort in Taichung (Taizhong) exists and matches English, Russian, and Chinese queries', () => {
  const xinyiBase = BASE_LOCATIONS.find((b) => b.id === 'xinyi-brownies-stay')!;
  const lihpao = PLACES_DATA.find((p) => p.id === 'lihpao-land-taichung');
  assert.ok(lihpao, 'Expected lihpao-land-taichung in PLACES_DATA');
  assert.equal(lihpao.city, 'Taichung');

  for (const query of ['taizhong', 'Taichung', 'amusement park', 'Lihpao', '麗寶樂園', 'Тайчжун']) {
    const res = filterAndSortPlaces(PLACES_DATA, {
      macroCategory: 'all',
      subCategory: 'all',
      district: 'all',
      priceTier: 'all',
      searchQuery: query,
      savedOnly: false,
      savedIds: [],
      sortBy: 'featured',
      baseLocation: xinyiBase,
      lang: 'ru',
    });
    assert.ok(
      res.some((p) => p.id === 'lihpao-land-taichung'),
      `Expected lihpao-land-taichung to match query "${query}"`
    );
  }
});

test('FESTIVE_EVENTS (Dec 22 – Jan 7) have valid placeIds, date phases, categories, and bilingual details', () => {
  assert.ok(FESTIVE_EVENTS.length >= 14, `Expected at least 14 festive events, got ${FESTIVE_EVENTS.length}`);
  assert.ok(!FESTIVE_EVENTS.some((e) => e.id.includes('maokong')), 'Maokong should not be in FESTIVE_EVENTS');
  const validPlaceIds = new Set(PLACES_DATA.map((p) => p.id));

  for (const evt of FESTIVE_EVENTS) {
    assert.ok(evt.titleEn.length > 0 && evt.titleRu.length > 0, `Event ${evt.id} missing bilingual title`);
    assert.ok(evt.titleZh.length > 0, `Event ${evt.id} missing Chinese title`);
    assert.ok(evt.dateRangeEn.length > 0 && evt.dateRangeRu.length > 0, `Event ${evt.id} missing date range`);
    assert.ok(evt.datePhase.length >= 1, `Event ${evt.id} missing datePhase`);
    assert.ok(evt.placeIds.length >= 1, `Event ${evt.id} must link to at least 1 map placeId`);
    for (const pid of evt.placeIds) {
      assert.ok(
        validPlaceIds.has(pid),
        `Event ${evt.id} references unknown placeId "${pid}"`
      );
    }
  }

  // Test filtering by date phase and category
  const nyePeakEvents = filterFestiveEvents(FESTIVE_EVENTS, 'all', 'nye_peak', '');
  assert.ok(nyePeakEvents.some((e) => e.id === 'taipei-101-nye-fireworks'));
  assert.ok(nyePeakEvents.some((e) => e.id === 'lihpao-taichung-nye-concert'));

  const fireworksOnly = filterFestiveEvents(FESTIVE_EVENTS, 'nye_countdown', 'all', '');
  assert.ok(fireworksOnly.length >= 3);

  const christmaslandQuery = filterFestiveEvents(FESTIVE_EVENTS, 'all', 'all', 'Banqiao');
  assert.ok(christmaslandQuery.some((e) => e.id === 'new-taipei-christmasland-banqiao'));

  const diyClasses = filterFestiveEvents(FESTIVE_EVENTS, 'diy_kids', 'all', '');
  assert.equal(diyClasses.length, 6, 'Expected 6 DIY & Kids workshops');
  assert.ok(diyClasses.some((e) => e.id === 'diy-pineapple-cake-kuo-yuan-ye'));
  assert.ok(diyClasses.some((e) => e.id === 'diy-wooderful-life-music-box'));
  assert.ok(diyClasses.some((e) => e.id === 'diy-eslite-songyan-glass-tufting'));
});

test('TAIWAN_ACTIVITIES cover foot massage, knife massage, tea ceremonies, shrimp fishing, and map to valid placeIds', () => {
  assert.equal(TAIWAN_ACTIVITIES.length, 12);
  const validPlaceIds = new Set(PLACES_DATA.map((p) => p.id));

  for (const act of TAIWAN_ACTIVITIES) {
    assert.ok(act.titleEn.length > 0 && act.titleRu.length > 0, `Activity ${act.id} missing bilingual title`);
    assert.ok(act.titleZh.length > 0, `Activity ${act.id} missing Chinese title`);
    assert.ok(act.venueZh.length > 0, `Activity ${act.id} missing Chinese venue phrase`);
    assert.ok(act.stepByStepEn.length >= 2 && act.stepByStepRu.length >= 2, `Activity ${act.id} missing step-by-step guide`);
    assert.ok(act.placeIds.length >= 1, `Activity ${act.id} must link to at least 1 map placeId`);
    for (const pid of act.placeIds) {
      assert.ok(validPlaceIds.has(pid), `Activity ${act.id} references unknown placeId "${pid}"`);
    }
  }

  assert.ok(filterTaiwanActivities(TAIWAN_ACTIVITIES, 'all', 'foot massage').some((a) => a.id === 'taiwanese-foot-reflexology-6star'));
  assert.ok(filterTaiwanActivities(TAIWAN_ACTIVITIES, 'all', 'knife').some((a) => a.id === 'ancient-knife-massage-daoliao'));
  assert.ok(filterTaiwanActivities(TAIWAN_ACTIVITIES, 'all', '刀療').some((a) => a.id === 'ancient-knife-massage-daoliao'));
  assert.ok(filterTaiwanActivities(TAIWAN_ACTIVITIES, 'tea_culture', '').length >= 3);
  assert.ok(filterTaiwanActivities(TAIWAN_ACTIVITIES, 'all', 'shrimp').some((a) => a.id === 'indoor-shrimp-fishing-grill'));
});





