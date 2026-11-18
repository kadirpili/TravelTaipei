import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { BaseLocation, MacroCategory } from '../data/placesData';
import { TAIPEI_MRT_LINES } from '../data/taipeiMrtData';
import {
  getLocalizedPlaceText,
  Language,
  UI_STRINGS,
} from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  Navigation,
  Sparkles,
  TrainFront,
} from 'lucide-react';

interface InteractiveMapProps {
  places: EnrichedPlaceItem[];
  allPlaces?: EnrichedPlaceItem[];
  selectedPlace: EnrichedPlaceItem | null;
  onSelectPlace: (place: EnrichedPlaceItem) => void;
  onOpenDetailModal: (place: EnrichedPlaceItem) => void;
  baseLocation: BaseLocation;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  itineraryStopOrder?: Map<string, number>;
  routeFitKey?: string;
  lang: Language;
  mobileLayout?: 'split' | 'list' | 'map';
  onToggleMobileFullMap?: () => void;
}

const CATEGORY_COLORS: Record<Exclude<MacroCategory, 'all'>, string> = {
  sights: '#0F766E',
  dining: '#EA580C',
  tea_cafe: '#D97706',
};

const BIG_HUB_IDS = new Set([
  'my-stay-xinyi-brownies',
  'google-tpkd-office',
  'brownies-xinyi',
]);

function createSimplePinIcon(
  place: EnrichedPlaceItem,
  isSelected: boolean,
  isSaved: boolean,
  stopNumber?: number
): L.DivIcon {
  if (place.id === 'my-stay-xinyi-brownies') {
    const size = isSelected ? 36 : 30;
    return L.divIcon({
      className: 'custom-map-pin',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
      html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:#0F172A;border:2.5px solid ${
        isSelected ? '#F59E0B' : '#FFFFFF'
      };box-shadow:0 3px 10px rgba(15,23,42,0.4);display:flex;align-items:center;justify-content:center;font-size:15px;">🏠</div>`,
    });
  }

  if (place.id === 'google-tpkd-office') {
    const size = isSelected ? 36 : 30;
    return L.divIcon({
      className: 'custom-map-pin',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
      html: `<div style="width:${size}px;height:${size}px;border-radius:9999px;background:#1D4ED8;border:2.5px solid ${
        isSelected ? '#FDE047' : '#FFFFFF'
      };box-shadow:0 3px 10px rgba(15,23,42,0.4);display:flex;align-items:center;justify-content:center;font-size:14px;">🏢</div>`,
    });
  }

  const bg = CATEGORY_COLORS[place.macroCategory] || '#0F766E';
  const size = isSelected ? 34 : 24;
  const label =
    stopNumber !== undefined ? String(stopNumber) : isSaved ? '★' : '';

  return L.divIcon({
    className: 'custom-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `<div style="
      width:${size}px;
      height:${size}px;
      border-radius:9999px;
      background:${isSelected ? '#0F172A' : bg};
      border:${isSelected ? '3px solid #F59E0B' : '2px solid #FFFFFF'};
      box-shadow:0 2px 8px rgba(15,23,42,0.35);
      color:#FFFFFF;
      font-weight:800;
      font-size:${isSelected ? '12px' : '10px'};
      display:flex;
      align-items:center;
      justify-content:center;
    ">${
      label ||
      `<span style="width:6px;height:6px;border-radius:9999px;background:#FFFFFF;display:block;"></span>`
    }</div>`,
  });
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  allPlaces = [],
  selectedPlace,
  onSelectPlace,
  onOpenDetailModal,
  baseLocation,
  savedIds,
  itineraryStopOrder,
  routeFitKey,
  lang,
  mobileLayout = 'split',
  onToggleMobileFullMap,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mrtLayerRef = useRef<L.LayerGroup | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());
  const routePolylineRef = useRef<L.Polyline | null>(null);

  // 'pins' = interactive multi-pin map (Google road tiles with OSM fallback)
  // 'google_embed' = native Google Maps iframe
  const [mapMode, setMapMode] = useState<'pins' | 'google_embed'>('pins');
  const [showMrtLines, setShowMrtLines] = useState(true);
  const t = UI_STRINGS[lang];

  const sourcePool = allPlaces.length > 0 ? allPlaces : places;
  const myStayPlace = React.useMemo(
    () => sourcePool.find((p) => p.id === 'my-stay-xinyi-brownies') ?? null,
    [sourcePool]
  );
  const tpkdOfficePlace = React.useMemo(
    () => sourcePool.find((p) => p.id === 'google-tpkd-office') ?? null,
    [sourcePool]
  );

  // Initialize Leaflet map
  useEffect(() => {
    if (mapMode !== 'pins') return;
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [25.0375, 121.5637],
      zoom: 13,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Primary: Standard Google Maps Road & Transit tiles (No API key needed, fast worldwide, shows Taipei MRT natively)
    // With automatic per-tile fallback to CartoDB Voyager & OpenStreetMap if any tile fails
    const tileLayer = L.tileLayer(
      'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: 'Map data &copy; Google · OpenStreetMap',
      }
    );

    tileLayer.on('tileerror', (errEvent: L.TileErrorEvent) => {
      const img = errEvent.tile as HTMLImageElement | undefined;
      if (!img) return;
      const coords = errEvent.coords;
      if (!img.dataset.fallbackStage) {
        img.dataset.fallbackStage = 'carto';
        img.src = `https://a.basemaps.cartocdn.com/rastertiles/voyager/${coords.z}/${coords.x}/${coords.y}.png`;
      } else if (img.dataset.fallbackStage === 'carto') {
        img.dataset.fallbackStage = 'osm';
        img.src = `https://tile.openstreetmap.org/${coords.z}/${coords.x}/${coords.y}.png`;
      }
    });

    tileLayer.addTo(map);

    mrtLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Ensure Leaflet recalculates size immediately and after layout transitions
    const timers = [
      window.setTimeout(() => map.invalidateSize(), 50),
      window.setTimeout(() => map.invalidateSize(), 250),
      window.setTimeout(() => map.invalidateSize(), 600),
    ];

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      mrtLayerRef.current = null;
      markersLayerRef.current = null;
      markerMapRef.current.clear();
    };
  }, [mapMode]);

  // Draw simple, clean Taipei MRT colored lines when enabled
  useEffect(() => {
    const mrtLayer = mrtLayerRef.current;
    if (!mrtLayer) return;

    mrtLayer.clearLayers();
    if (!showMrtLines) return;

    TAIPEI_MRT_LINES.forEach((line) => {
      const lineTitle = lang === 'ru' ? line.nameRu : line.nameEn;
      line.segments.forEach((segment) => {
        L.polyline(segment, {
          color: '#FFFFFF',
          weight: 6,
          opacity: 0.85,
          interactive: false,
        }).addTo(mrtLayer);

        const poly = L.polyline(segment, {
          color: line.color,
          weight: 3.5,
          opacity: 0.9,
        });
        poly.bindTooltip(`🚇 ${line.code}: ${lineTitle} (${line.nameZh})`, {
          sticky: true,
        });
        poly.addTo(mrtLayer);
      });
    });
  }, [showMrtLines, lang, mapMode]);

  // Render Place Pins
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    markerMapRef.current.clear();

    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    const combinedPlacesMap = new Map<string, EnrichedPlaceItem>();
    places.forEach((p) => {
      if (Number.isFinite(p.lat) && Number.isFinite(p.lng)) {
        combinedPlacesMap.set(p.id, p);
      }
    });
    sourcePool.forEach((p) => {
      if (
        BIG_HUB_IDS.has(p.id) &&
        !combinedPlacesMap.has(p.id) &&
        Number.isFinite(p.lat) &&
        Number.isFinite(p.lng)
      ) {
        combinedPlacesMap.set(p.id, p);
      }
    });

    combinedPlacesMap.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const isSaved = savedIds.includes(place.id);
      const stopNum = itineraryStopOrder?.get(place.id);
      const loc = getLocalizedPlaceText(place, lang);

      const marker = L.marker([place.lat, place.lng], {
        icon: createSimplePinIcon(place, isSelected, isSaved, stopNum),
        zIndexOffset: isSelected
          ? 2000
          : BIG_HUB_IDS.has(place.id)
            ? 1200
            : stopNum !== undefined
              ? 600
              : 100,
      });

      marker.bindTooltip(
        `<div style="font-weight:700;font-size:12px;">${
          stopNum ? `${stopNum}. ` : ''
        }${loc.displayName} (${place.chineseName})</div><div style="font-size:11px;color:#475569;">${
          place.distanceKm
        } ${lang === 'ru' ? 'км' : 'km'} · ${place.travelEstimate}</div>`,
        { direction: 'top', offset: [0, -12] }
      );

      marker.on('click', () => {
        onSelectPlace(place);
      });

      marker.addTo(layerGroup);
      markerMapRef.current.set(place.id, marker);
    });

    if (itineraryStopOrder && itineraryStopOrder.size > 1) {
      const orderedStops = [...places]
        .filter(
          (p) =>
            itineraryStopOrder.has(p.id) &&
            Number.isFinite(p.lat) &&
            Number.isFinite(p.lng)
        )
        .sort(
          (a, b) =>
            (itineraryStopOrder.get(a.id) ?? 0) -
            (itineraryStopOrder.get(b.id) ?? 0)
        );

      if (orderedStops.length > 1) {
        const latLngs: [number, number][] = orderedStops.map((p) => [
          p.lat,
          p.lng,
        ]);
        routePolylineRef.current = L.polyline(latLngs, {
          color: '#EA580C',
          weight: 3.5,
          dashArray: '7, 7',
          opacity: 0.9,
        }).addTo(map);
      }
    }
  }, [
    places,
    sourcePool,
    selectedPlace,
    savedIds,
    itineraryStopOrder,
    onSelectPlace,
    lang,
    mapMode,
  ]);

  // Fit route bounds when switching tabs/tours/events
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (
      !map ||
      mapMode !== 'pins' ||
      !routeFitKey ||
      mobileLayout === 'list' ||
      places.length === 0
    ) {
      return;
    }
    const validCoords = places
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
      .map((p) => [p.lat, p.lng] as [number, number]);
    if (validCoords.length === 0) return;

    try {
      map.invalidateSize({ pan: false });
      const bounds = L.latLngBounds(validCoords);
      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          padding: [36, 36],
          maxZoom: 15,
          animate: true,
        });
      }
    } catch {
      // Ignore if map not sized yet
    }
  }, [routeFitKey, mapMode]);

  // Center on selected place cleanly
  const selectedId = selectedPlace?.id ?? null;
  const selectedLat = selectedPlace?.lat ?? null;
  const selectedLng = selectedPlace?.lng ?? null;

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (
      !map ||
      mapMode !== 'pins' ||
      !selectedId ||
      selectedLat === null ||
      selectedLng === null ||
      !Number.isFinite(selectedLat) ||
      !Number.isFinite(selectedLng) ||
      mobileLayout === 'list'
    ) {
      return;
    }

    try {
      map.invalidateSize({ pan: false });
      const targetZoom = Math.max(map.getZoom() || 14, 14);
      map.setView([selectedLat, selectedLng], targetZoom, { animate: true });
    } catch {
      // Fallback
    }
  }, [selectedId, selectedLat, selectedLng, mobileLayout, mapMode]);

  const handleFitAllPins = () => {
    const map = mapInstanceRef.current;
    if (!map || places.length === 0) return;
    const validCoords = places
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
      .map((p) => [p.lat, p.lng] as [number, number]);
    if (validCoords.length === 0) return;

    map.invalidateSize({ pan: false });
    const bounds = L.latLngBounds(validCoords);
    if (Number.isFinite(baseLocation.lat) && Number.isFinite(baseLocation.lng)) {
      bounds.extend([baseLocation.lat, baseLocation.lng]);
    }
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [32, 32],
        maxZoom: 15,
        animate: true,
      });
    }
  };

  const selectedLoc = selectedPlace
    ? getLocalizedPlaceText(selectedPlace, lang)
    : null;

  // Google Maps Embed URL for the selected place (or Taipei 101 by default)
  const googleEmbedQuery = selectedPlace
    ? encodeURIComponent(
        `${selectedPlace.chineseName} ${selectedPlace.name} Taipei`
      )
    : encodeURIComponent('Taipei 101 Taipei');
  const googleEmbedUrl = `https://maps.google.com/maps?q=${googleEmbedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className="relative w-full h-full bg-slate-200 overflow-hidden select-none"
      data-testid="interactive-map-surface"
    >
      {/* Top Simple Controls Bar */}
      <div className="absolute top-2 left-2 right-2 z-[400] flex items-center justify-between gap-1.5 pointer-events-none">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pointer-events-auto">
          {/* Mode Switcher: All Pins Map vs Native Google Maps Embed */}
          <div className="inline-flex items-center bg-white/95 backdrop-blur-md border border-slate-300/90 rounded-xl p-0.5 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => setMapMode('pins')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap ${
                mapMode === 'pins'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lang === 'ru'
                ? `🗺️ Все точки (${places.length})`
                : `🗺️ All Pins (${places.length})`}
            </button>
            <button
              type="button"
              onClick={() => setMapMode('google_embed')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap ${
                mapMode === 'google_embed'
                  ? 'bg-blue-700 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              📍 Google Maps
            </button>
          </div>

          {mapMode === 'pins' && (
            <>
              <button
                type="button"
                onClick={() => setShowMrtLines((prev) => !prev)}
                className={`min-h-[30px] px-2 py-1 rounded-xl border text-[11px] font-bold inline-flex items-center gap-1 shadow-sm transition-colors whitespace-nowrap shrink-0 ${
                  showMrtLines
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white/95 text-slate-700 border-slate-300 hover:bg-white'
                }`}
              >
                <TrainFront className="w-3 h-3 shrink-0" />
                <span>{lang === 'ru' ? 'Метро' : 'MRT'}</span>
              </button>

              <button
                type="button"
                onClick={handleFitAllPins}
                className="min-h-[30px] px-2 py-1 bg-white/95 hover:bg-white text-slate-800 border border-slate-300 rounded-xl shadow-sm text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3 h-3 text-slate-600 shrink-0" />
                <span>{lang === 'ru' ? 'Все' : 'Fit All'}</span>
              </button>

              {myStayPlace && (
                <button
                  type="button"
                  onClick={() => onSelectPlace(myStayPlace)}
                  className="min-h-[30px] px-2 py-1 bg-white/95 hover:bg-white text-slate-900 border border-slate-300 rounded-xl shadow-sm text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>🏠</span>
                </button>
              )}

              {tpkdOfficePlace && (
                <button
                  type="button"
                  onClick={() => onSelectPlace(tpkdOfficePlace)}
                  className="min-h-[30px] px-2 py-1 bg-white/95 hover:bg-white text-slate-900 border border-slate-300 rounded-xl shadow-sm text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>🏢</span>
                </button>
              )}
            </>
          )}
        </div>

        {onToggleMobileFullMap && (
          <button
            type="button"
            onClick={onToggleMobileFullMap}
            className="lg:hidden pointer-events-auto min-h-[30px] px-2 py-1 bg-white/95 hover:bg-white text-slate-900 border border-slate-300 rounded-xl shadow-sm text-[11px] font-bold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          >
            {mobileLayout === 'map' ? (
              <>
                <Minimize2 className="w-3 h-3 shrink-0" />
                <span>{lang === 'ru' ? 'Список' : 'Split'}</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3 h-3 shrink-0" />
                <span>{lang === 'ru' ? 'Экран' : 'Full'}</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Map Surface: Interactive Multi-Pin Map OR Native Google Maps Embed */}
      {mapMode === 'pins' ? (
        <div ref={mapContainerRef} className="w-full h-full z-0" />
      ) : (
        <iframe
          key={googleEmbedUrl}
          title={
            selectedLoc
              ? `Google Map: ${selectedLoc.displayName}`
              : 'Google Map Taipei'
          }
          src={googleEmbedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}

      {/* Sleek 1-Line Bottom Pill for Selected Place (Never blocks the map) */}
      {selectedPlace && selectedLoc && (
        <div className="absolute bottom-2 left-2 right-12 z-[400] pointer-events-none flex items-center">
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-300/90 rounded-2xl p-1.5 pr-2 shadow-lg flex items-center gap-2 max-w-full">
            <img
              src={getPlaceImageUrl(selectedPlace.id)}
              alt={selectedLoc.displayName}
              onClick={() => onOpenDetailModal(selectedPlace)}
              className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-200 cursor-pointer"
            />
            <div
              onClick={() => onOpenDetailModal(selectedPlace)}
              className="min-w-0 flex-1 cursor-pointer"
            >
              <div className="text-xs font-bold text-slate-900 truncate">
                {selectedLoc.displayName}{' '}
                <span className="text-slate-500 font-normal">
                  ({selectedPlace.chineseName})
                </span>
              </div>
              <div className="text-[10px] text-slate-600 truncate">
                {selectedLoc.districtLabel} · {selectedPlace.distanceKm}{' '}
                {lang === 'ru' ? 'км' : 'km'} · {selectedPlace.travelEstimate}
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onOpenDetailModal(selectedPlace)}
                className="min-h-[32px] px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-extrabold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{lang === 'ru' ? 'Инфо' : 'Details'}</span>
              </button>

              <a
                href={selectedPlace.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={t.routeBtn}
                className="min-h-[32px] px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-teal-800 text-[11px] font-bold inline-flex items-center justify-center transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
              </a>

              <a
                href={selectedPlace.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Google Maps"
                className="min-h-[32px] px-2 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
