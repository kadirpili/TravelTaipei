import { BaseLocation, MacroCategory, PlaceItem, SubCategory } from '../data/placesData';
import {
  DISTRICT_RU,
  Language,
  PLACE_TRANSLATIONS_RU,
  SUBCATEGORY_RU,
} from '../data/translationsRu';

export type SortMode = 'featured' | 'nearest' | 'name';

export interface FilterOptions {
  macroCategory: MacroCategory;
  subCategory: SubCategory | 'all';
  district: string | 'all';
  priceTier: string | 'all';
  searchQuery: string;
  savedOnly: boolean;
  personalHubsOnly?: boolean;
  savedIds: string[];
  sortBy: SortMode;
  baseLocation: BaseLocation;
  lang?: Language;
}

export interface EnrichedPlaceItem extends PlaceItem {
  distanceKm: number;
  travelEstimate: string;
  directionsUrl: string;
  distanceRank?: number;
}

/**
 * Calculates great-circle distance between two coordinates in kilometers using the Haversine formula.
 */
export function calculateDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}

/**
 * Estimates walking or Taipei MRT / bus transit duration based on straight-line distance.
 */
export function estimateTravelTime(distanceKm: number, lang: Language = 'ru'): string {
  if (distanceKm <= 0.15) {
    return lang === 'ru' ? '2 мин пешком' : '2 min walk';
  }
  if (distanceKm <= 1.8) {
    // Average urban walking pace with crosswalks (~13 min per straight-line km)
    const walkMins = Math.max(3, Math.round(distanceKm * 13));
    return lang === 'ru' ? `${walkMins} мин пешком` : `${walkMins} min walk`;
  }
  if (distanceKm <= 12) {
    // Taipei MRT + station walk estimate
    const mrtMins = Math.max(10, Math.round(8 + distanceKm * 2.4));
    return lang === 'ru' ? `~${mrtMins} мин на метро` : `~${mrtMins} min MRT`;
  }
  // Mountain / coastal day trips (Jiufen, Yangmingshan, Tamsui)
  const transitMins = Math.round(22 + distanceKm * 1.45);
  return lang === 'ru' ? `~${transitMins} мин транспорт` : `~${transitMins} min transit`;
}

/**
 * Builds a Google Maps transit/walking directions link from the selected base hotel to the place.
 */
export function buildGoogleMapsDirectionsUrl(
  base: BaseLocation,
  place: Pick<PlaceItem, 'name' | 'chineseName' | 'lat' | 'lng'>
): string {
  const origin = `${base.lat},${base.lng}`;
  const destination = encodeURIComponent(`${place.name} ${place.chineseName} Taipei`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
}

/**
 * Enriches, filters, and sorts places according to user filter controls and base point.
 * Supports searching in Russian, English, or Traditional Chinese simultaneously,
 * and computes real-time distance rankings relative to the currently selected Base Location hub.
 */
export function filterAndSortPlaces(
  places: PlaceItem[],
  options: FilterOptions
): EnrichedPlaceItem[] {
  const query = options.searchQuery.trim().toLowerCase();
  const lang: Language = options.lang ?? 'ru';

  const enriched: EnrichedPlaceItem[] = places.map((place) => {
    const distanceKm = calculateDistanceKm(
      options.baseLocation.lat,
      options.baseLocation.lng,
      place.lat,
      place.lng
    );
    return {
      ...place,
      distanceKm,
      travelEstimate: estimateTravelTime(distanceKm, lang),
      directionsUrl: buildGoogleMapsDirectionsUrl(options.baseLocation, place),
    };
  });

  const filtered = enriched.filter((place) => {
    if (options.personalHubsOnly && !place.isPersonalHub) {
      return false;
    }
    if (options.savedOnly && !options.savedIds.includes(place.id)) {
      return false;
    }
    if (options.macroCategory !== 'all' && place.macroCategory !== options.macroCategory) {
      return false;
    }
    if (options.subCategory !== 'all' && place.subCategory !== options.subCategory) {
      return false;
    }
    if (options.district !== 'all' && place.district !== options.district) {
      return false;
    }
    if (options.priceTier !== 'all' && place.priceTier !== options.priceTier) {
      return false;
    }
    if (query.length > 0) {
      const ru = PLACE_TRANSLATIONS_RU[place.id];
      const searchableText = [
        place.name,
        place.chineseName,
        place.overview,
        place.district,
        place.city,
        place.subCategory,
        place.mrtStation,
        place.insiderTip ?? '',
        ...place.tags,
        ru?.nameRu ?? '',
        ru?.overviewRu ?? '',
        ru?.insiderTipRu ?? '',
        ru?.mrtStationRu ?? '',
        ...(ru?.tagsRu ?? []),
        SUBCATEGORY_RU[place.subCategory] ?? '',
        DISTRICT_RU[place.district] ?? '',
      ]
        .join(' ')
        .toLowerCase();

      const normalizedQuery = query
        .replace(/restaraunt/g, 'restaurant')
        .replace(/digntaifung/g, 'din tai fung')
        .replace(/dintaifung/g, 'din tai fung')
        .replace(/noughut|noughet|nugat/g, 'nougat')
        .replace(/snakcs|snaks/g, 'snacks');

      if (!searchableText.includes(query) && !searchableText.includes(normalizedQuery)) {
        const tokens = normalizedQuery
          .split(/[\s,]+/)
          .map((t) => t.trim())
          .filter((t) => t.length > 0);
        const allTokensMatch =
          tokens.length > 0 && tokens.every((token) => searchableText.includes(token));
        if (!allTokensMatch) {
          return false;
        }
      }
    }
    return true;
  });

  // Compute 1-based distance rank from the active Base Location hub across the filtered set
  const byDistance = [...filtered].sort((a, b) => {
    if (a.distanceKm !== b.distanceKm) {
      return a.distanceKm - b.distanceKm;
    }
    return a.id.localeCompare(b.id);
  });
  const rankMap = new Map<string, number>();
  byDistance.forEach((item, index) => {
    rankMap.set(item.id, index + 1);
  });

  const withRanks = filtered.map((item) => ({
    ...item,
    distanceRank: rankMap.get(item.id) ?? 1,
  }));

  return withRanks.sort((a, b) => {
    if (options.sortBy === 'nearest') {
      if (a.distanceKm !== b.distanceKm) {
        return a.distanceKm - b.distanceKm;
      }
      return a.id.localeCompare(b.id);
    }
    if (options.sortBy === 'name') {
      const aName = lang === 'ru' ? (PLACE_TRANSLATIONS_RU[a.id]?.nameRu ?? a.name) : a.name;
      const bName = lang === 'ru' ? (PLACE_TRANSLATIONS_RU[b.id]?.nameRu ?? b.name) : b.name;
      return aName.localeCompare(bName, lang === 'ru' ? 'ru' : 'en');
    }
    // Default 'featured': personal hubs (My Stay, Brownies, TPKD Office) first, then featured items, then by distance
    const aHub = a.isPersonalHub ? 1 : 0;
    const bHub = b.isPersonalHub ? 1 : 0;
    if (aHub !== bHub) {
      return bHub - aHub;
    }
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    if (aFeatured !== bFeatured) {
      return bFeatured - aFeatured;
    }
    return a.distanceKm - b.distanceKm;
  });
}

/**
 * Convenience helper that calculates real-time distance from any Base Location hub
 * and sorts the provided places from nearest to farthest.
 */
export function sortPlacesByDistanceFromHub(
  places: PlaceItem[],
  baseLocation: BaseLocation,
  lang: Language = 'ru'
): EnrichedPlaceItem[] {
  return filterAndSortPlaces(places, {
    macroCategory: 'all',
    subCategory: 'all',
    district: 'all',
    priceTier: 'all',
    searchQuery: '',
    savedOnly: false,
    savedIds: [],
    sortBy: 'nearest',
    baseLocation,
    lang,
  });
}

/**
 * Returns subcategory counts within the currently active macroCategory.
 */
export function getAvailableSubCategories(
  places: PlaceItem[],
  macroCategory: MacroCategory
): Array<{ subCategory: SubCategory; count: number }> {
  const counts = new Map<SubCategory, number>();
  for (const place of places) {
    if (macroCategory !== 'all' && place.macroCategory !== macroCategory) {
      continue;
    }
    counts.set(place.subCategory, (counts.get(place.subCategory) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([subCategory, count]) => ({ subCategory, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Returns unique districts and their counts for the current macroCategory.
 */
export function getDistrictCounts(
  places: PlaceItem[],
  macroCategory: MacroCategory
): Array<{ district: string; count: number }> {
  const counts = new Map<string, number>();
  for (const place of places) {
    if (macroCategory !== 'all' && place.macroCategory !== macroCategory) {
      continue;
    }
    counts.set(place.district, (counts.get(place.district) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count);
}

export interface QuickExpandNearbySpot {
  place: EnrichedPlaceItem;
  distanceFromHereKm: number;
}

export interface QuickExpandSummary {
  taxiPhrase: string;
  coordinatesText: string;
  suggestedDuration: string;
  nearbySpots: QuickExpandNearbySpot[];
}

/**
 * Computes structured summary details for the inline PlaceCard quick-expand panel.
 */
export function buildQuickExpandSummary(
  place: EnrichedPlaceItem,
  allPlaces: EnrichedPlaceItem[] = [],
  lang: Language = 'ru'
): QuickExpandSummary {
  const ru = PLACE_TRANSLATIONS_RU[place.id];
  const explicitDuration =
    lang === 'ru'
      ? ru?.recommendedDurationRu || place.recommendedDuration
      : place.recommendedDuration;

  const fallbackDuration =
    place.macroCategory === 'sights'
      ? lang === 'ru'
        ? '1–2 часа'
        : '1–2 hrs'
      : place.macroCategory === 'tea_cafe'
        ? lang === 'ru'
          ? '45–90 мин'
          : '45–90 min'
        : lang === 'ru'
          ? '1–1.5 часа'
          : '1–1.5 hrs';

  const nearbySpots: QuickExpandNearbySpot[] = allPlaces
    .filter((p) => p.id !== place.id)
    .map((p) => ({
      place: p,
      distanceFromHereKm: calculateDistanceKm(place.lat, place.lng, p.lat, p.lng),
    }))
    .sort((a, b) => a.distanceFromHereKm - b.distanceFromHereKm)
    .slice(0, 3);

  return {
    taxiPhrase: `請載我去：${place.chineseName} (${place.name} - ${place.district})`,
    coordinatesText: `${place.lat.toFixed(4)}° N, ${place.lng.toFixed(4)}° E`,
    suggestedDuration: explicitDuration || fallbackDuration,
    nearbySpots,
  };
}

