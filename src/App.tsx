/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  BASE_LOCATIONS,
  CURATED_ITINERARIES,
  MacroCategory,
  PLACES_DATA,
  SubCategory,
} from './data/placesData';
import {
  getLocalizedBaseLocation,
  getLocalizedDistrict,
  getLocalizedSubCategory,
  Language,
  UI_STRINGS,
} from './data/translationsRu';
import {
  EnrichedPlaceItem,
  filterAndSortPlaces,
  getAvailableSubCategories,
  getDistrictCounts,
  SortMode,
} from './utils/placesLogic';
import { InteractiveMap } from './components/InteractiveMap';
import { PlaceCard } from './components/PlaceCard';
import { PlaceDetailSheet } from './components/PlaceDetailSheet';
import { ItineraryView } from './components/ItineraryView';
import { ToursView } from './components/ToursView';
import { SnacksView } from './components/SnacksView';
import { EventsView } from './components/EventsView';
import { ActivitiesView } from './components/ActivitiesView';
import { BOOKABLE_TOURS } from './data/toursData';
import { MUST_TRY_SNACKS } from './data/snacksData';
import { FESTIVE_EVENTS } from './data/eventsData';
import { TAIWAN_ACTIVITIES } from './data/activitiesData';
import { OfflineControlBar } from './components/OfflineControlBar';
import {
  loadOfflineSnapshot,
  syncOfflineAssetsAndPlaces,
} from './utils/offlineCache';
import {
  Calendar,
  Coffee,
  Compass,
  Cookie,
  Globe,
  ListFilter,
  Map as MapIcon,
  PartyPopper,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  Utensils,
  X,
} from 'lucide-react';

type ActiveTab =
  | 'all'
  | 'sights'
  | 'dining'
  | 'tea_nightlife'
  | 'snacks'
  | 'events'
  | 'activities'
  | 'itineraries'
  | 'tours';
type MobileLayoutMode = 'split' | 'list' | 'map';
type QuickPresetId =
  | 'all'
  | 'tours'
  | 'snacks'
  | 'myhubs'
  | 'saved'
  | 'sights'
  | 'hotpot'
  | 'dumplings'
  | 'izakaya'
  | 'korean'
  | 'teacafe';

const STORAGE_KEY_SAVED = 'taipei_wayfinder_saved_v1';
const STORAGE_KEY_BASE = 'taipei_wayfinder_base_v1';
const STORAGE_KEY_LANG = 'taipei_wayfinder_lang_v1';
const DEFAULT_SAVED_IDS = [
  'my-stay-xinyi-brownies',
  'google-tpkd-office',
  'brownies-xinyi',
  'taipei-101',
  'elephant-mountain',
  'din-tai-fung-101',
  'jiufen-old-street',
];

export default function App() {
  // Language State: Russian ('ru') by default, with English ('en') option
  const [lang, setLang] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
      if (savedLang === 'en' || savedLang === 'ru') return savedLang;
    } catch {
      // Ignore storage errors
    }
    return 'ru';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch {
      // Ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = UI_STRINGS[lang];

  // Navigation & View States
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [mobileLayout, setMobileLayout] = useState<MobileLayoutMode>('split');
  const [showMobileAdvancedFilters, setShowMobileAdvancedFilters] = useState<boolean>(false);
  const [activeItineraryId, setActiveItineraryId] = useState<string>(
    CURATED_ITINERARIES[0].id
  );
  const [activeTourId, setActiveTourId] = useState<string>(
    BOOKABLE_TOURS[0].id
  );
  const [activeSnackId, setActiveSnackId] = useState<string>(
    MUST_TRY_SNACKS[0].id
  );
  const [activeEventId, setActiveEventId] = useState<string>(
    FESTIVE_EVENTS[0].id
  );
  const [activeActivityId, setActiveActivityId] = useState<string>(
    TAIWAN_ACTIVITIES[0].id
  );

  // Filter & Sort States
  const [subCategory, setSubCategory] = useState<SubCategory | 'all'>('all');
  const [district, setDistrict] = useState<string | 'all'>('all');
  const [priceTier, setPriceTier] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedOnly, setSavedOnly] = useState<boolean>(false);
  const [personalHubsOnly, setPersonalHubsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortMode>('featured');

  // Base Hotel Location for Distance & Transit Calculation
  const [baseLocationId, setBaseLocationId] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_BASE) || BASE_LOCATIONS[0].id;
    } catch {
      return BASE_LOCATIONS[0].id;
    }
  });

  // Saved / Bookmarked Place IDs
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return DEFAULT_SAVED_IDS;
  });

  // Selected Place on Map & Detail Modal
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(
    'my-stay-xinyi-brownies'
  );
  const [detailModalPlace, setDetailModalPlace] = useState<EnrichedPlaceItem | null>(
    null
  );
  const [swActive, setSwActive] = useState<boolean>(false);

  // Load places from offline snapshot or bundled dataset, and warm SW JSON cache
  const [placesSource, setPlacesSource] = useState(() => loadOfflineSnapshot(PLACES_DATA).places);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedIds));
    } catch {
      // Ignore storage errors
    }
    syncOfflineAssetsAndPlaces(placesSource, savedIds).catch(() => {});
  }, [savedIds, placesSource]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}places-offline-cache.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.places) && data.places.length > 0) {
          setPlacesSource(data.places);
        }
      })
      .catch(() => {
        // Offline: keep using placesSource from localStorage snapshot
      });

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(() => setSwActive(true))
        .catch(() => {});
      if (navigator.serviceWorker.controller) {
        setSwActive(true);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BASE, baseLocationId);
    } catch {
      // Ignore storage errors
    }
  }, [baseLocationId]);

  const baseLocation = useMemo(
    () =>
      BASE_LOCATIONS.find((b) => b.id === baseLocationId) ?? BASE_LOCATIONS[0],
    [baseLocationId]
  );

  const localizedBase = useMemo(
    () => getLocalizedBaseLocation(baseLocation, lang),
    [baseLocation, lang]
  );

  // Convert activeTab to macroCategory filter
  const effectiveMacroCategory: MacroCategory = useMemo(() => {
    if (activeTab === 'sights') return 'sights';
    if (activeTab === 'dining') return 'dining';
    if (activeTab === 'tea_nightlife') return 'tea_cafe';
    return 'all';
  }, [activeTab]);

  // Enrich all places with distance from current Base Location
  const allEnrichedPlaces = useMemo(
    () =>
      filterAndSortPlaces(placesSource, {
        macroCategory: 'all',
        subCategory: 'all',
        district: 'all',
        priceTier: 'all',
        searchQuery: '',
        savedOnly: false,
        savedIds,
        sortBy,
        baseLocation,
        lang,
      }),
    [placesSource, baseLocation, savedIds, sortBy, lang]
  );

  // Filter places for the active view
  const filteredPlaces = useMemo(() => {
    if (activeTab === 'snacks') {
      const currentSnack =
        MUST_TRY_SNACKS.find((sn) => sn.id === activeSnackId) ?? MUST_TRY_SNACKS[0];
      const placeMap = new Map(allEnrichedPlaces.map((p) => [p.id, p]));
      return currentSnack.placeIds
        .map((pid) => placeMap.get(pid))
        .filter((p): p is EnrichedPlaceItem => Boolean(p));
    }

    if (activeTab === 'events') {
      const currentEvent =
        FESTIVE_EVENTS.find((ev) => ev.id === activeEventId) ?? FESTIVE_EVENTS[0];
      const placeMap = new Map(allEnrichedPlaces.map((p) => [p.id, p]));
      return currentEvent.placeIds
        .map((pid) => placeMap.get(pid))
        .filter((p): p is EnrichedPlaceItem => Boolean(p));
    }

    if (activeTab === 'activities') {
      const currentActivity =
        TAIWAN_ACTIVITIES.find((ac) => ac.id === activeActivityId) ??
        TAIWAN_ACTIVITIES[0];
      const placeMap = new Map(allEnrichedPlaces.map((p) => [p.id, p]));
      return currentActivity.placeIds
        .map((pid) => placeMap.get(pid))
        .filter((p): p is EnrichedPlaceItem => Boolean(p));
    }

    if (activeTab === 'tours') {
      const currentTour =
        BOOKABLE_TOURS.find((tr) => tr.id === activeTourId) ?? BOOKABLE_TOURS[0];
      const placeMap = new Map(allEnrichedPlaces.map((p) => [p.id, p]));
      return currentTour.stops
        .map((s) => placeMap.get(s.placeId))
        .filter((p): p is EnrichedPlaceItem => Boolean(p));
    }

    if (activeTab === 'itineraries') {
      const currentItinerary =
        CURATED_ITINERARIES.find((it) => it.id === activeItineraryId) ??
        CURATED_ITINERARIES[0];
      const stopIds = new Set(currentItinerary.stops.map((s) => s.placeId));
      return allEnrichedPlaces.filter((p) => stopIds.has(p.id));
    }

    return filterAndSortPlaces(placesSource, {
      macroCategory: effectiveMacroCategory,
      subCategory,
      district,
      priceTier,
      searchQuery,
      savedOnly,
      personalHubsOnly,
      savedIds,
      sortBy,
      baseLocation,
      lang,
    });
  }, [
    activeTab,
    activeSnackId,
    activeEventId,
    activeActivityId,
    activeTourId,
    activeItineraryId,
    allEnrichedPlaces,
    placesSource,
    effectiveMacroCategory,
    subCategory,
    district,
    priceTier,
    searchQuery,
    savedOnly,
    personalHubsOnly,
    savedIds,
    sortBy,
    baseLocation,
    lang,
  ]);

  // Available subcategories & districts for current tab
  const availableSubCategories = useMemo(() => {
    return getAvailableSubCategories(placesSource, effectiveMacroCategory);
  }, [placesSource, effectiveMacroCategory]);

  const availableDistricts = useMemo(() => {
    return getDistrictCounts(placesSource, effectiveMacroCategory);
  }, [placesSource, effectiveMacroCategory]);

  // Stop numbering map when viewing snacks, tours, or itineraries
  const itineraryStopOrder = useMemo(() => {
    if (activeTab === 'snacks') {
      const currentSnack =
        MUST_TRY_SNACKS.find((sn) => sn.id === activeSnackId) ?? MUST_TRY_SNACKS[0];
      const orderMap = new Map<string, number>();
      currentSnack.placeIds.forEach((pid, index) => {
        orderMap.set(pid, index + 1);
      });
      return orderMap;
    }

    if (activeTab === 'events') {
      const currentEvent =
        FESTIVE_EVENTS.find((ev) => ev.id === activeEventId) ?? FESTIVE_EVENTS[0];
      const orderMap = new Map<string, number>();
      currentEvent.placeIds.forEach((pid, index) => {
        orderMap.set(pid, index + 1);
      });
      return orderMap;
    }

    if (activeTab === 'activities') {
      const currentActivity =
        TAIWAN_ACTIVITIES.find((ac) => ac.id === activeActivityId) ??
        TAIWAN_ACTIVITIES[0];
      const orderMap = new Map<string, number>();
      currentActivity.placeIds.forEach((pid, index) => {
        orderMap.set(pid, index + 1);
      });
      return orderMap;
    }

    if (activeTab === 'tours') {
      const currentTour =
        BOOKABLE_TOURS.find((tr) => tr.id === activeTourId) ?? BOOKABLE_TOURS[0];
      const orderMap = new Map<string, number>();
      currentTour.stops.forEach((stop) => {
        orderMap.set(stop.placeId, stop.stopNumber);
      });
      return orderMap;
    }

    if (activeTab !== 'itineraries') return undefined;
    const currentItinerary =
      CURATED_ITINERARIES.find((it) => it.id === activeItineraryId) ??
      CURATED_ITINERARIES[0];
    const orderMap = new Map<string, number>();
    currentItinerary.stops.forEach((stop, index) => {
      orderMap.set(stop.placeId, index + 1);
    });
    return orderMap;
  }, [activeTab, activeSnackId, activeEventId, activeActivityId, activeTourId, activeItineraryId]);

  const selectedPlace = useMemo(
    () =>
      filteredPlaces.find((p) => p.id === selectedPlaceId) ??
      filteredPlaces[0] ??
      allEnrichedPlaces.find((p) => p.id === selectedPlaceId) ??
      null,
    [filteredPlaces, allEnrichedPlaces, selectedPlaceId]
  );

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setSubCategory('all');
    setSavedOnly(false);
    setPersonalHubsOnly(false);
    if (tab === 'snacks') {
      const currentSnack =
        MUST_TRY_SNACKS.find((sn) => sn.id === activeSnackId) ?? MUST_TRY_SNACKS[0];
      if (currentSnack.placeIds[0]) {
        setSelectedPlaceId(currentSnack.placeIds[0]);
      }
    }
    if (tab === 'events') {
      const currentEvent =
        FESTIVE_EVENTS.find((ev) => ev.id === activeEventId) ?? FESTIVE_EVENTS[0];
      if (currentEvent.placeIds[0]) {
        setSelectedPlaceId(currentEvent.placeIds[0]);
      }
    }
    if (tab === 'activities') {
      const currentActivity =
        TAIWAN_ACTIVITIES.find((ac) => ac.id === activeActivityId) ??
        TAIWAN_ACTIVITIES[0];
      if (currentActivity.placeIds[0]) {
        setSelectedPlaceId(currentActivity.placeIds[0]);
      }
    }
  };

  // Super easy 1-tap quick filter presets for phone usage
  const handleQuickPreset = (preset: QuickPresetId) => {
    setDistrict('all');
    setPriceTier('all');
    setSearchQuery('');

    switch (preset) {
      case 'all':
        setActiveTab('all');
        setSubCategory('all');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'tours':
        setActiveTab('tours');
        setSubCategory('all');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'myhubs':
        setActiveTab('all');
        setSubCategory('all');
        setSavedOnly(false);
        setPersonalHubsOnly((prev) => !prev);
        break;
      case 'saved':
        if (activeTab === 'itineraries' || activeTab === 'tours') setActiveTab('all');
        setSubCategory('all');
        setPersonalHubsOnly(false);
        setSavedOnly((prev) => !prev);
        break;
      case 'sights':
        setActiveTab('sights');
        setSubCategory('all');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'hotpot':
        setActiveTab('all');
        setSubCategory('Hot Pot & Shabu');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'dumplings':
        setActiveTab('all');
        setSubCategory('Taiwanese & Dumplings');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'izakaya':
        setActiveTab('all');
        setSubCategory('Izakaya & Yakiniku');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'korean':
        setActiveTab('all');
        setSubCategory('Korean');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
      case 'teacafe':
        setActiveTab('tea_nightlife');
        setSubCategory('all');
        setSavedOnly(false);
        setPersonalHubsOnly(false);
        break;
    }
  };

  const activeQuickPreset: QuickPresetId | null = useMemo(() => {
    if (activeTab === 'tours') return 'tours';
    if (personalHubsOnly) return 'myhubs';
    if (savedOnly) return 'saved';
    if (activeTab === 'itineraries') return null;
    if (subCategory === 'Hot Pot & Shabu') return 'hotpot';
    if (subCategory === 'Taiwanese & Dumplings') return 'dumplings';
    if (subCategory === 'Izakaya & Yakiniku') return 'izakaya';
    if (subCategory === 'Korean') return 'korean';
    if (activeTab === 'sights' && subCategory === 'all') return 'sights';
    if (activeTab === 'tea_nightlife' && subCategory === 'all') return 'teacafe';
    if (activeTab === 'all' && subCategory === 'all' && district === 'all' && !searchQuery) {
      return 'all';
    }
    return null;
  }, [personalHubsOnly, savedOnly, activeTab, subCategory, district, searchQuery]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectPlaceOnMap = (place: EnrichedPlaceItem) => {
    setSelectedPlaceId(place.id);
    if (mobileLayout === 'list') {
      setMobileLayout('split');
    }
  };

  const handleResetFilters = () => {
    setSubCategory('all');
    setDistrict('all');
    setPriceTier('all');
    setSearchQuery('');
    setSavedOnly(false);
    setPersonalHubsOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    subCategory !== 'all' ||
    district !== 'all' ||
    priceTier !== 'all' ||
    searchQuery.trim() !== '' ||
    savedOnly ||
    personalHubsOnly;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-slate-900 pb-16 lg:pb-0">
      {/* Top Bar Contract: 1-row, 3-zone header (h-12 on mobile, h-16 on desktop) */}
      <header className="sticky top-0 z-30 h-12 lg:h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#explore"
          onClick={(e) => {
            e.preventDefault();
            handleTabChange('all');
            handleResetFilters();
          }}
          className="font-display text-lg lg:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          {t.brandTitle}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-3 xl:gap-5 text-xs xl:text-sm font-medium text-slate-600 overflow-x-auto no-scrollbar min-w-0"
        >
          <button
            type="button"
            onClick={() => handleTabChange('all')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'all' && !savedOnly
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navAll}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('events')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'events'
                ? 'border-amber-700 text-amber-800 font-bold'
                : 'border-transparent text-amber-900 hover:text-slate-900 font-semibold'
            }`}
          >
            {t.navEvents}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('activities')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'activities'
                ? 'border-teal-700 text-teal-800 font-bold'
                : 'border-transparent text-teal-900 hover:text-slate-900 font-semibold'
            }`}
          >
            {t.navActivities}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('snacks')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'snacks'
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navSnacks}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('sights')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'sights'
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navSights}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('dining')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'dining'
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navDining}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('tea_nightlife')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'tea_nightlife'
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navTeaBars}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('tours')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'tours'
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navTours}
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('itineraries')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeTab === 'itineraries'
                ? 'border-amber-700 text-slate-900 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            {t.navItineraries}
          </button>
        </nav>

        {/* Zone 3: Language Switcher + Primary Saved Action Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div
            className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/90 shrink-0"
            role="group"
            aria-label="Выбор языка / Language selector"
          >
            <button
              type="button"
              onClick={() => setLang('ru')}
              aria-pressed={lang === 'ru'}
              className={`min-h-[30px] px-1.5 sm:px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap ${
                lang === 'ru'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              RU
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={`min-h-[30px] px-1.5 sm:px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap ${
                lang === 'en'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (
                activeTab === 'itineraries' ||
                activeTab === 'tours' ||
                activeTab === 'snacks' ||
                activeTab === 'events' ||
                activeTab === 'activities'
              ) {
                setActiveTab('all');
              }
              setSavedOnly((prev) => !prev);
            }}
            className={`min-h-[34px] lg:min-h-[38px] px-2.5 sm:px-3.5 py-1 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              savedOnly
                ? 'bg-amber-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {savedOnly
              ? t.viewingSavedBtn(savedIds.length)
              : t.savedTripBtn(savedIds.length)}
          </button>
        </div>
      </header>

      {/* Main Responsive Split Workspace */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-2.5 sm:px-6 lg:px-8 pt-1.5 sm:pt-3 pb-6">
        {/* Mobile-First Ultra-Compact Toolbar (Strictly 2 rows on 390px phones, 1 row on desktop) */}
        <section
          aria-label="Search, Quick Filters, and Language Controls"
          className="bg-white border border-slate-200/90 rounded-xl px-2 py-1.5 sm:px-2.5 sm:py-2 shadow-xs mb-2"
        >
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 sm:gap-2">
            {/* Row 1 on mobile: Compact Search Input + Split/List/Map Switcher */}
            <div className="flex items-center gap-1.5 w-full lg:w-auto lg:flex-1 order-1">
              <div className="relative flex-1 min-w-0">
                <label htmlFor="place-search-input" className="sr-only">
                  {t.searchPlaceholder(placesSource.length)}
                </label>
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="place-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (activeTab === 'itineraries' || activeTab === 'tours') {
                      setActiveTab('all');
                    }
                  }}
                  placeholder={t.searchPlaceholder(placesSource.length)}
                  className="w-full min-h-[34px] sm:min-h-[38px] pl-7 pr-7 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-700 focus:bg-white transition-colors [&::-webkit-search-cancel-button]:hidden"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={t.clearSearch}
                    className="min-h-[30px] min-w-[30px] absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile Layout Switcher (Split / List / Map) */}
              <div
                className="flex lg:hidden items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 shrink-0"
                role="group"
                aria-label="Mobile view layout mode"
              >
                <button
                  type="button"
                  onClick={() => setMobileLayout('split')}
                  className={`min-h-[30px] px-1.5 sm:px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    mobileLayout === 'split'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'ru' ? 'Сплит' : t.layoutSplit}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileLayout('list')}
                  className={`min-h-[30px] px-1.5 sm:px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    mobileLayout === 'list'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.layoutList}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileLayout('map')}
                  className={`min-h-[30px] px-1.5 sm:px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    mobileLayout === 'map'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t.layoutMap}
                </button>
              </div>
            </div>

            {/* 2. Category / View Dropdown (Row 2 on mobile) */}
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1.5 sm:px-2 min-h-[34px] sm:min-h-[38px] flex-1 min-w-0 sm:w-auto lg:max-w-[225px] order-2">
              <label htmlFor="category-filter-select" className="sr-only">
                {lang === 'ru' ? 'Категория или раздел' : 'Category or view'}
              </label>
              <select
                id="category-filter-select"
                aria-label={lang === 'ru' ? 'Категория' : 'Category'}
                value={
                  activeTab === 'events'
                    ? 'tab:events'
                    : activeTab === 'activities'
                      ? 'tab:activities'
                      : activeTab === 'snacks'
                        ? 'tab:snacks'
                        : activeTab === 'tours'
                          ? 'tab:tours'
                          : activeTab === 'itineraries'
                            ? 'tab:itineraries'
                            : personalHubsOnly
                              ? 'preset:myhubs'
                              : savedOnly
                                ? 'preset:saved'
                                : subCategory !== 'all'
                                  ? `sub:${subCategory}`
                                  : activeTab !== 'all'
                                    ? `tab:${activeTab}`
                                    : 'all'
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setSavedOnly(false);
                  setPersonalHubsOnly(false);

                  if (val === 'all') {
                    setActiveTab('all');
                    setSubCategory('all');
                  } else if (val === 'preset:myhubs') {
                    setActiveTab('all');
                    setSubCategory('all');
                    setPersonalHubsOnly(true);
                  } else if (val === 'preset:saved') {
                    setActiveTab('all');
                    setSubCategory('all');
                    setSavedOnly(true);
                  } else if (val.startsWith('tab:')) {
                    const nextTab = val.replace('tab:', '') as ActiveTab;
                    setActiveTab(nextTab);
                    setSubCategory('all');
                  } else if (val.startsWith('sub:')) {
                    const nextSub = val.replace('sub:', '') as SubCategory;
                    if (
                      activeTab === 'tours' ||
                      activeTab === 'itineraries' ||
                      activeTab === 'snacks' ||
                      activeTab === 'events' ||
                      activeTab === 'activities'
                    ) {
                      setActiveTab('all');
                    }
                    setSubCategory(nextSub);
                  }
                }}
                className="bg-transparent text-[11px] sm:text-xs font-semibold text-slate-900 focus:outline-none py-1 cursor-pointer truncate w-full"
              >
                <optgroup
                  label={
                    lang === 'ru'
                      ? 'Разделы и подборки'
                      : 'Views & Quick Lists'
                  }
                >
                  <option value="all">
                    {lang === 'ru'
                      ? `🌏 Все места (${placesSource.length})`
                      : `🌏 All Places (${placesSource.length})`}
                  </option>
                  <option value="tab:events">
                    {lang === 'ru'
                      ? `🎉 События 22 дек – 7 янв (${FESTIVE_EVENTS.length})`
                      : `🎉 Events Dec 22 – Jan 7 (${FESTIVE_EVENTS.length})`}
                  </option>
                  <option value="tab:activities">
                    {lang === 'ru'
                      ? `💆 Активности: массаж, чай, креветки (${TAIWAN_ACTIVITIES.length})`
                      : `💆 Activities: Massage, Tea & Local Fun (${TAIWAN_ACTIVITIES.length})`}
                  </option>
                  <option value="tab:snacks">
                    {lang === 'ru'
                      ? `🧋 Что попробовать: Снэки и Боба (${MUST_TRY_SNACKS.length})`
                      : `🧋 Must-Try Snacks & Boba (${MUST_TRY_SNACKS.length})`}
                  </option>
                  <option value="tab:tours">
                    {lang === 'ru'
                      ? `🎟️ Туры Klook (${BOOKABLE_TOURS.length})`
                      : `🎟️ Klook Tours (${BOOKABLE_TOURS.length})`}
                  </option>
                  <option value="preset:myhubs">
                    {lang === 'ru'
                      ? '🏠 Дом, Brownies и Офис TPKD'
                      : '🏠 Home, Brownies & TPKD Office'}
                  </option>
                  <option value="preset:saved">
                    {lang === 'ru'
                      ? `⭐ Избранное (${savedIds.length})`
                      : `⭐ Saved (${savedIds.length})`}
                  </option>
                  <option value="tab:sights">
                    {lang === 'ru' ? '🏞️ Прогулки и парки' : '🏞️ Sights & Parks'}
                  </option>
                  <option value="tab:dining">
                    {lang === 'ru' ? '🍜 Рестораны и еда' : '🍜 Dining & Food'}
                  </option>
                  <option value="tab:tea_nightlife">
                    {lang === 'ru' ? '🍵 Чай, кофе и десерты' : '🍵 Tea & Cafes'}
                  </option>
                  <option value="tab:itineraries">
                    {lang === 'ru' ? '🗺️ Маршруты по дням' : '🗺️ Day Itineraries'}
                  </option>
                </optgroup>
                <optgroup
                  label={
                    lang === 'ru'
                      ? 'Категории и кухня'
                      : 'Categories & Cuisine'
                  }
                >
                  {getAvailableSubCategories(placesSource, 'all').map((item) => (
                    <option
                      key={item.subCategory}
                      value={`sub:${item.subCategory}`}
                    >
                      {getLocalizedSubCategory(item.subCategory, lang)} ({item.count})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* 3. District Dropdown (Row 2 on mobile) */}
            {activeTab !== 'itineraries' &&
              activeTab !== 'tours' &&
              activeTab !== 'snacks' &&
              activeTab !== 'events' &&
              activeTab !== 'activities' && (
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1.5 sm:px-2 min-h-[34px] sm:min-h-[38px] flex-1 min-w-0 sm:w-auto lg:max-w-[185px] order-3">
                  <label htmlFor="district-filter-select" className="sr-only">
                    {t.districtLabel}
                  </label>
                  <select
                    id="district-filter-select"
                    aria-label={lang === 'ru' ? 'Район' : 'District'}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="bg-transparent text-[11px] sm:text-xs font-semibold text-slate-900 focus:outline-none py-1 cursor-pointer truncate w-full"
                  >
                    <option value="all">
                      📍 {t.allAreasBtn} ({placesSource.length})
                    </option>
                    {availableDistricts.map((d) => (
                      <option key={d.district} value={d.district}>
                        {getLocalizedDistrict(d.district, lang)} ({d.count})
                      </option>
                    ))}
                  </select>
                </div>
              )}

            {/* 4. My Hubs & Starting Base Dropdown (Row 2 on mobile) */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-1.5 sm:px-2 min-h-[34px] sm:min-h-[38px] flex-1 min-w-0 sm:w-auto lg:max-w-[225px] order-4">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 shrink-0" />
              <label htmlFor="base-hotel-select" className="sr-only">
                {t.fromBaseLabel}
              </label>
              <select
                id="base-hotel-select"
                aria-label={lang === 'ru' ? 'Мои точки и старт' : 'My Hubs & Starting Point'}
                value={baseLocationId}
                onChange={(e) => {
                  const val = e.target.value;
                  setBaseLocationId(val);
                  if (val === 'xinyi-brownies-stay') {
                    setSelectedPlaceId('my-stay-xinyi-brownies');
                    if (mobileLayout === 'list') setMobileLayout('split');
                  } else if (val === 'brownies-xinyi') {
                    setSelectedPlaceId('brownies-xinyi');
                    if (mobileLayout === 'list') setMobileLayout('split');
                  } else if (val === 'tpkd-office') {
                    setSelectedPlaceId('google-tpkd-office');
                    if (mobileLayout === 'list') setMobileLayout('split');
                  }
                }}
                className="bg-transparent text-[11px] sm:text-xs font-semibold text-slate-900 focus:outline-none py-1 cursor-pointer truncate w-full"
              >
                <optgroup
                  label={
                    lang === 'ru'
                      ? 'Мои главные точки (Дом, Brownies, Офис)'
                      : 'My Key Hubs (Home, Brownies, Office)'
                  }
                >
                  <option value="xinyi-brownies-stay">
                    {lang === 'ru'
                      ? '🏠 Дом: Синьи (у Brownies, Yixian Rd)'
                      : '🏠 Stay: Xinyi (near Brownies, Yixian Rd)'}
                  </option>
                  <option value="brownies-xinyi">
                    {lang === 'ru'
                      ? '🍫 Ресторан Brownies (Синьи)'
                      : '🍫 Brownies Restaurant (Xinyi)'}
                  </option>
                  <option value="tpkd-office">
                    {lang === 'ru'
                      ? '🏢 Офис: Google TPKD (Баньцяо Tpark)'
                      : '🏢 Office: Google TPKD (Banqiao Tpark)'}
                  </option>
                </optgroup>
                <optgroup
                  label={
                    lang === 'ru'
                      ? 'Другие точки отсчёта расстояния'
                      : 'Other Starting Points'
                  }
                >
                  {BASE_LOCATIONS.filter(
                    (loc) =>
                      loc.id !== 'xinyi-brownies-stay' &&
                      loc.id !== 'brownies-xinyi' &&
                      loc.id !== 'tpkd-office'
                  ).map((loc) => {
                    const locText = getLocalizedBaseLocation(loc, lang);
                    return (
                      <option key={loc.id} value={loc.id}>
                        {locText.name}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
            </div>

            {/* 5. Sort Dropdown (Toolbar) */}
            {activeTab !== 'itineraries' &&
              activeTab !== 'tours' &&
              activeTab !== 'snacks' &&
              activeTab !== 'events' &&
              activeTab !== 'activities' && (
                <div className="hidden sm:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 min-h-[38px] sm:w-auto lg:max-w-[175px] order-7">
                  <ListFilter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <label htmlFor="sort-mode-select" className="sr-only">
                    Sort places by
                  </label>
                  <select
                    id="sort-mode-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortMode)}
                    className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none py-1.5 cursor-pointer truncate w-full"
                  >
                    <option value="featured">{t.sortFeatured}</option>
                    <option value="nearest">{t.sortNearest}</option>
                    <option value="name">{t.sortName}</option>
                  </select>
                </div>
              )}

            {/* Reset button when filters active */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                title={t.resetFiltersBtn}
                className="min-h-[34px] sm:min-h-[38px] px-2 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold inline-flex items-center gap-1 shrink-0 transition-colors whitespace-nowrap order-7"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{t.resetFiltersBtn}</span>
              </button>
            )}

            {/* Offline Sync Control (Compact icon on mobile, full button on desktop) */}
            <div className="flex items-center shrink-0 order-8">
              <OfflineControlBar
                totalPlacesCount={placesSource.length}
                savedCount={savedIds.length}
                savedOnly={savedOnly}
                swActive={swActive}
                onSyncOffline={async () => {
                  await syncOfflineAssetsAndPlaces(placesSource, savedIds);
                }}
                onShowSavedSpots={() => {
                  if (
                    activeTab === 'itineraries' ||
                    activeTab === 'tours' ||
                    activeTab === 'events'
                  ) {
                    setActiveTab('all');
                  }
                  setSavedOnly(true);
                }}
                lang={lang}
              />
            </div>
          </div>
        </section>

        {/* Main 2-Column Split Grid (Desktop: Left Directory / Itineraries, Right Sticky Interactive Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-4 lg:gap-5 items-start">
          {/* Interactive Map Column (On Mobile: compact 235px height in 'split' so first card is visible above fold, or full-height in 'map' mode) */}
          <div
            className={`lg:col-span-6 lg:order-2 lg:sticky lg:top-20 ${
              mobileLayout === 'list' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div
              className={`w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm transition-all ${
                mobileLayout === 'map'
                  ? 'h-[calc(100dvh-185px)] min-h-[420px] lg:h-[calc(100vh-140px)]'
                  : 'h-[235px] sm:h-[400px] lg:h-[calc(100vh-140px)]'
              }`}
            >
              <InteractiveMap
                places={filteredPlaces}
                allPlaces={allEnrichedPlaces}
                selectedPlace={selectedPlace}
                onSelectPlace={(p) => setSelectedPlaceId(p.id)}
                onOpenDetailModal={(p) => setDetailModalPlace(p)}
                baseLocation={baseLocation}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                itineraryStopOrder={itineraryStopOrder}
                routeFitKey={
                  activeTab === 'events'
                    ? `event-${activeEventId}`
                    : activeTab === 'activities'
                      ? `activity-${activeActivityId}`
                      : activeTab === 'snacks'
                        ? `snack-${activeSnackId}`
                        : activeTab === 'tours'
                          ? `tour-${activeTourId}`
                          : activeTab === 'itineraries'
                            ? `itinerary-${activeItineraryId}`
                            : undefined
                }
                lang={lang}
                mobileLayout={mobileLayout}
                onToggleMobileFullMap={() =>
                  setMobileLayout((prev) => (prev === 'map' ? 'split' : 'map'))
                }
              />
            </div>
          </div>

          {/* Left Directory / Events / Activities / Snacks / Tours / Itinerary Column */}
          <div
            className={`lg:col-span-6 lg:order-1 ${
              mobileLayout === 'map' ? 'hidden lg:block' : 'block'
            }`}
          >
            {activeTab === 'events' ? (
              <EventsView
                allPlaces={allEnrichedPlaces}
                activeEventId={activeEventId}
                onSelectEvent={(evt) => {
                  setActiveEventId(evt.id);
                  if (evt.placeIds[0]) {
                    setSelectedPlaceId(evt.placeIds[0]);
                  }
                }}
                onSelectPlaceOnMap={handleSelectPlaceOnMap}
                onOpenPlaceDetail={(place) => setDetailModalPlace(place)}
                lang={lang}
                externalSearchQuery={searchQuery}
              />
            ) : activeTab === 'activities' ? (
              <ActivitiesView
                allPlaces={allEnrichedPlaces}
                activeActivityId={activeActivityId}
                onSelectActivity={(act) => {
                  setActiveActivityId(act.id);
                  if (act.placeIds[0]) {
                    setSelectedPlaceId(act.placeIds[0]);
                  }
                }}
                onSelectPlaceOnMap={handleSelectPlaceOnMap}
                onOpenPlaceDetail={(place) => setDetailModalPlace(place)}
                lang={lang}
                externalSearchQuery={searchQuery}
              />
            ) : activeTab === 'snacks' ? (
              <SnacksView
                allPlaces={allEnrichedPlaces}
                activeSnackId={activeSnackId}
                onSelectSnack={(snack) => {
                  setActiveSnackId(snack.id);
                  if (snack.placeIds[0]) {
                    setSelectedPlaceId(snack.placeIds[0]);
                  }
                }}
                onSelectPlaceOnMap={handleSelectPlaceOnMap}
                onOpenPlaceDetail={(place) => setDetailModalPlace(place)}
                lang={lang}
                externalSearchQuery={searchQuery}
              />
            ) : activeTab === 'tours' ? (
              <ToursView
                allPlaces={allEnrichedPlaces}
                activeTourId={activeTourId}
                onSelectTour={(id) => {
                  setActiveTourId(id);
                  const tour = BOOKABLE_TOURS.find((item) => item.id === id);
                  if (tour && tour.stops[0]) {
                    setSelectedPlaceId(tour.stops[0].placeId);
                  }
                }}
                onSelectPlaceOnMap={handleSelectPlaceOnMap}
                onOpenPlaceDetail={(place) => setDetailModalPlace(place)}
                lang={lang}
              />
            ) : activeTab === 'itineraries' ? (
              <ItineraryView
                allPlaces={allEnrichedPlaces}
                activeItineraryId={activeItineraryId}
                onSelectItinerary={(id) => {
                  setActiveItineraryId(id);
                  const it = CURATED_ITINERARIES.find((item) => item.id === id);
                  if (it && it.stops[0]) {
                    setSelectedPlaceId(it.stops[0].placeId);
                  }
                }}
                onSelectPlaceOnMap={handleSelectPlaceOnMap}
                onOpenPlaceDetail={(place) => setDetailModalPlace(place)}
                lang={lang}
              />
            ) : (
              <div>
                {/* Real-Time Directory Sort & Base Location Distance Bar */}
                <div
                  className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3 mb-2.5 shadow-xs space-y-2"
                  role="region"
                  aria-label={
                    lang === 'ru'
                      ? 'Сортировка по расстоянию и выбор базовой точки'
                      : 'Real-time distance sorting and Base Location hub selector'
                  }
                >
                  {/* Top Row: Showing Count + Real-Time Sort Mode Toggle Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm text-slate-600">
                      <span className="font-mono-num font-bold text-slate-900">
                        {t.showingCount(filteredPlaces.length)}
                      </span>
                      {savedOnly ? t.inSavedTripSuffix : ''}
                      {subCategory !== 'all'
                        ? ` · ${getLocalizedSubCategory(subCategory, lang)}`
                        : ''}
                      {district !== 'all'
                        ? ` · ${getLocalizedDistrict(district, lang)}`
                        : ''}
                    </div>

                    {/* Interactive Sort Mode Switcher (Featured / Sort by Distance / A-Z) */}
                    <div
                      className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80"
                      role="group"
                      aria-label={
                        lang === 'ru' ? 'Режим сортировки мест' : 'Sort directory places'
                      }
                    >
                      <button
                        type="button"
                        onClick={() => setSortBy('nearest')}
                        aria-pressed={sortBy === 'nearest'}
                        className={`min-h-[30px] px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold transition-colors inline-flex items-center gap-1 whitespace-nowrap ${
                          sortBy === 'nearest'
                            ? 'bg-emerald-800 text-white shadow-xs'
                            : 'text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <span>📏</span>
                        <span>
                          {lang === 'ru' ? 'По расстоянию' : 'Sort by distance'}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSortBy('featured')}
                        aria-pressed={sortBy === 'featured'}
                        className={`min-h-[30px] px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap ${
                          sortBy === 'featured'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lang === 'ru' ? 'Хиты' : 'Featured'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSortBy('name')}
                        aria-pressed={sortBy === 'name'}
                        className={`min-h-[30px] px-2 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap ${
                          sortBy === 'name'
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {lang === 'ru' ? 'А–Я' : 'A–Z'}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Row: Quick Base Location Hub Pills for Real-Time Distance Calculation */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
                    <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap shrink-0">
                      {t.distancesFromLabel}
                    </span>
                    {BASE_LOCATIONS.map((hub) => {
                      const isCurrentHub = hub.id === baseLocation.id;
                      const hubLabel =
                        hub.id === 'xinyi-brownies-stay'
                          ? lang === 'ru'
                            ? '🏠 Дом (Синьи)'
                            : '🏠 Stay (Xinyi)'
                          : hub.id === 'brownies-xinyi'
                            ? '🍫 Brownies'
                            : hub.id === 'tpkd-office'
                              ? '🏢 Офис TPKD'
                              : getLocalizedBaseLocation(hub, lang).name;
                      return (
                        <button
                          key={hub.id}
                          type="button"
                          onClick={() => {
                            setBaseLocationId(hub.id);
                            if (hub.id === 'xinyi-brownies-stay') {
                              setSelectedPlaceId('my-stay-xinyi-brownies');
                            } else if (hub.id === 'brownies-xinyi') {
                              setSelectedPlaceId('brownies-xinyi');
                            } else if (hub.id === 'tpkd-office') {
                              setSelectedPlaceId('google-tpkd-office');
                            }
                          }}
                          aria-pressed={isCurrentHub}
                          className={`min-h-[28px] px-2.5 py-0.5 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 border ${
                            isCurrentHub
                              ? 'bg-amber-50 border-amber-400 text-amber-950 font-bold'
                              : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          {hubLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Empty Filter State */}
                {filteredPlaces.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                    <h3 className="text-base font-bold text-slate-900">
                      {t.emptyTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                      {t.emptySubtitle}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-4 min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{t.resetAllBtn}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredPlaces.map((place) => (
                      <PlaceCard
                        key={place.id}
                        place={place}
                        allPlaces={allEnrichedPlaces}
                        isSelected={selectedPlace?.id === place.id}
                        isSaved={savedIds.includes(place.id)}
                        onSelectOnMap={handleSelectPlaceOnMap}
                        onOpenDetails={(p) => setDetailModalPlace(p)}
                        onToggleSave={handleToggleSave}
                        sortBy={sortBy}
                        baseLocationName={localizedBase.name}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Quick View Pill on Mobile when in List-Only or Map-Only mode */}
      {mobileLayout !== 'split' && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-30 lg:hidden flex items-center gap-1.5 bg-slate-900/95 backdrop-blur-md p-1 rounded-full shadow-xl border border-white/15">
          <button
            type="button"
            onClick={() => setMobileLayout('split')}
            className="min-h-[34px] px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <span>{lang === 'ru' ? 'Сплит (Карта + Список)' : 'Split View'}</span>
          </button>
          {mobileLayout === 'list' ? (
            <button
              type="button"
              onClick={() => setMobileLayout('map')}
              className="min-h-[34px] px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>
                {lang === 'ru'
                  ? `Карта (${filteredPlaces.length})`
                  : `Map (${filteredPlaces.length})`}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMobileLayout('list')}
              className="min-h-[34px] px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
            >
              <span>
                {lang === 'ru'
                  ? `Список (${filteredPlaces.length})`
                  : `List (${filteredPlaces.length})`}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (6 Ergonomic Thumb-Zone Tabs) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200 grid grid-cols-6 items-center px-1 lg:hidden"
      >
        <button
          type="button"
          onClick={() => handleTabChange('all')}
          className={`h-full flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'all' && !savedOnly
              ? 'text-amber-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {activeTab === 'all' && !savedOnly && (
            <span className="absolute top-0 inset-x-2 h-0.5 bg-amber-700 rounded-b-full" />
          )}
          <MapIcon className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {t.mobileNavAll(placesSource.length)}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('events')}
          className={`h-full flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'events'
              ? 'text-amber-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {activeTab === 'events' && (
            <span className="absolute top-0 inset-x-2 h-0.5 bg-amber-700 rounded-b-full" />
          )}
          <PartyPopper className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {t.mobileNavEvents}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('activities')}
          className={`h-full flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'activities'
              ? 'text-teal-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {activeTab === 'activities' && (
            <span className="absolute top-0 inset-x-2 h-0.5 bg-teal-700 rounded-b-full" />
          )}
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {t.mobileNavActivities}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('snacks')}
          className={`h-full flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'snacks'
              ? 'text-amber-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {activeTab === 'snacks' && (
            <span className="absolute top-0 inset-x-2 h-0.5 bg-amber-700 rounded-b-full" />
          )}
          <Cookie className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {lang === 'ru' ? 'Хиты еды' : t.mobileNavSnacks}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('dining')}
          className={`h-full flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'dining' || activeTab === 'tea_nightlife'
              ? 'text-amber-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {(activeTab === 'dining' || activeTab === 'tea_nightlife') && (
            <span className="absolute top-0 inset-x-2 h-0.5 bg-amber-700 rounded-b-full" />
          )}
          <Utensils className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">
            {lang === 'ru' ? 'Рестораны' : t.mobileNavDining}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('itineraries')}
          className={`h-full flex flex-col items-center justify-center transition-colors relative ${
            activeTab === 'itineraries' || activeTab === 'sights' || activeTab === 'tours'
              ? 'text-amber-800 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          {(activeTab === 'itineraries' || activeTab === 'sights' || activeTab === 'tours') && (
            <span className="absolute top-0 inset-x-2 h-0.5 bg-amber-700 rounded-b-full" />
          )}
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] mt-0.5 whitespace-nowrap">{t.mobileNavPlans}</span>
        </button>
      </nav>

      {/* Slide-Up Mobile Sheet / Desktop Modal for Place Details & Taxi Card */}
      <PlaceDetailSheet
        place={detailModalPlace}
        allPlaces={allEnrichedPlaces}
        baseLocation={baseLocation}
        isSaved={
          detailModalPlace ? savedIds.includes(detailModalPlace.id) : false
        }
        onClose={() => setDetailModalPlace(null)}
        onToggleSave={handleToggleSave}
        onSelectPlaceOnMap={(place) => {
          setSelectedPlaceId(place.id);
          setDetailModalPlace(place);
        }}
        lang={lang}
      />
    </div>
  );
}
