import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { BaseLocation, MacroCategory } from '../data/placesData';
import {
  MrtLineId,
  TAIPEI_MRT_LINES,
  TAIPEI_MRT_STATIONS,
} from '../data/taipeiMrtData';
import {
  getLocalizedBaseLocation,
  getLocalizedPlaceText,
  Language,
  UI_STRINGS,
} from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
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

const CATEGORY_COLORS: Record<Exclude<MacroCategory, 'all'>, { bg: string; ring: string }> = {
  sights: { bg: '#0F766E', ring: '#99F6E4' },
  dining: { bg: '#C2410C', ring: '#FED7AA' },
  tea_cafe: { bg: '#B45309', ring: '#FDE68A' },
};

function createPersonalHubIcon(
  placeId: string,
  isSelected: boolean,
  lang: Language
): L.DivIcon {
  if (placeId === 'my-stay-xinyi-brownies') {
    const label = lang === 'ru' ? '🏠 ДОМ (Синьи)' : '🏠 MY STAY';
    const html = `
      <div style="
        padding: 4px 10px;
        background-color: #0F172A;
        color: #FFFFFF;
        border: 2.5px solid ${isSelected ? '#F59E0B' : '#FFFFFF'};
        box-shadow: ${isSelected ? '0 0 0 4px #FDE68A, 0 8px 20px rgba(15,23,42,0.45)' : '0 4px 14px rgba(15,23,42,0.38)'};
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 800;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transform: ${isSelected ? 'scale(1.08)' : 'scale(1)'};
      ">
        <span>${label}</span>
      </div>
    `;
    return L.divIcon({
      html,
      className: 'custom-map-pin',
      iconSize: [110, 28],
      iconAnchor: [55, 30],
    });
  }

  if (placeId === 'google-tpkd-office') {
    const label = lang === 'ru' ? '🏢 ОФИС TPKD' : '🏢 TPKD OFFICE';
    const html = `
      <div style="
        padding: 4px 10px;
        background-color: #1D4ED8;
        color: #FFFFFF;
        border: 2.5px solid ${isSelected ? '#FDE047' : '#FFFFFF'};
        box-shadow: ${isSelected ? '0 0 0 4px #BFDBFE, 0 8px 20px rgba(29,78,216,0.45)' : '0 4px 14px rgba(15,23,42,0.38)'};
        border-radius: 9999px;
        font-size: 11px;
        font-weight: 800;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transform: ${isSelected ? 'scale(1.08)' : 'scale(1)'};
      ">
        <span>${label}</span>
      </div>
    `;
    return L.divIcon({
      html,
      className: 'custom-map-pin',
      iconSize: [110, 28],
      iconAnchor: [55, 14],
    });
  }

  // brownies-xinyi right next to My Stay
  const label = '🍫 Brownies';
  const html = `
    <div style="
      padding: 3px 8px;
      background-color: #78350F;
      color: #FEF3C7;
      border: 2px solid ${isSelected ? '#F59E0B' : '#FFFFFF'};
      box-shadow: ${isSelected ? '0 0 0 4px #FDE68A, 0 6px 16px rgba(120,53,15,0.45)' : '0 3px 10px rgba(15,23,42,0.32)'};
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 700;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transform: ${isSelected ? 'scale(1.08)' : 'scale(1)'};
    ">
      <span>${label}</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-map-pin',
    iconSize: [86, 24],
    iconAnchor: [43, -4],
  });
}

function createPinIcon(
  category: Exclude<MacroCategory, 'all'>,
  isSelected: boolean,
  isSaved: boolean,
  stopNumber?: number
): L.DivIcon {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.sights;
  const size = isSelected ? 38 : 28;
  const badgeText = stopNumber !== undefined ? String(stopNumber) : isSaved ? '★' : '';

  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${color.bg};
      border: ${isSelected ? '3px solid #0F172A' : '2.5px solid #FFFFFF'};
      box-shadow: ${isSelected ? '0 0 0 4px ' + color.ring + ', 0 8px 20px rgba(15,23,42,0.35)' : '0 3px 10px rgba(15,23,42,0.28)'};
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-weight: 700;
      font-size: ${isSelected ? '13px' : '11px'};
      font-family: 'JetBrains Mono', monospace;
      transform: ${isSelected ? 'scale(1.08) translateY(-3px)' : 'scale(1)'};
      transition: transform 150ms ease;
    ">
      ${badgeText || `<span style="width: 7px; height: 7px; border-radius: 9999px; background: rgba(255,255,255,0.9);"></span>`}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-map-pin',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createBaseHotelIcon(lang: Language): L.DivIcon {
  const label = lang === 'ru' ? 'СТАРТ' : 'BASE';
  const html = `
    <div style="
      padding: 3px 8px;
      background-color: #0F172A;
      color: #F8FAFC;
      border: 2px solid #FFFFFF;
      border-radius: 8px;
      font-size: 10px;
      font-weight: 700;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(15,23,42,0.35);
      display: flex;
      align-items: center;
      gap: 4px;
    ">
      <span>${label}</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-map-pin',
    iconSize: [56, 24],
    iconAnchor: [28, 12],
  });
}

const BIG_HUB_IDS = new Set([
  'my-stay-xinyi-brownies',
  'google-tpkd-office',
  'brownies-xinyi',
]);

const MRT_LINE_COLORS: Record<MrtLineId, { color: string; textColor: string }> = {
  R: { color: '#E3002C', textColor: '#FFFFFF' },
  BL: { color: '#0070BD', textColor: '#FFFFFF' },
  G: { color: '#008659', textColor: '#FFFFFF' },
  O: { color: '#F59E0B', textColor: '#FFFFFF' },
  BR: { color: '#B47B28', textColor: '#FFFFFF' },
  Y: { color: '#EAB308', textColor: '#0F172A' },
};

function createMrtStationIcon(
  lines: MrtLineId[],
  isTransfer: boolean,
  shortCode: string,
  nameZh: string,
  showLabel: boolean
): L.DivIcon {
  const primaryColor = MRT_LINE_COLORS[lines[0]]?.color || '#E3002C';
  const secondaryColor = lines.length > 1 ? MRT_LINE_COLORS[lines[1]]?.color : null;
  const dotSize = isTransfer ? 14 : 10;

  const ringStyle = secondaryColor
    ? `background: #FFFFFF; border: 3px solid ${primaryColor}; box-shadow: 0 0 0 2.5px ${secondaryColor}, 0 2px 6px rgba(15,23,42,0.35);`
    : `background: #FFFFFF; border: 2.5px solid ${primaryColor}; box-shadow: 0 1px 4px rgba(15,23,42,0.3);`;

  const labelHtml = showLabel
    ? `<span style="
        margin-left: 4px;
        padding: 1px 4px;
        border-radius: 4px;
        background: rgba(255,255,255,0.92);
        border: 1px solid ${primaryColor}55;
        color: #0F172A;
        font-size: 9.5px;
        font-weight: 700;
        line-height: 1.15;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(15,23,42,0.14);
      "><span style="color:${primaryColor};font-family:'JetBrains Mono',monospace;margin-right:2px;">${shortCode}</span>${nameZh}</span>`
    : '';

  const html = `
    <div style="display:inline-flex;align-items:center;transform:translate(-${dotSize / 2}px, -${dotSize / 2}px);pointer-events:auto;">
      <span style="width:${dotSize}px;height:${dotSize}px;border-radius:9999px;display:inline-block;flex-shrink:0;${ringStyle}"></span>
      ${labelHtml}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'mrt-station-icon',
    iconSize: [dotSize, dotSize],
    iconAnchor: [0, 0],
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
  onToggleSave,
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
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [isCardDismissed, setIsCardDismissed] = React.useState(false);
  const [showMrtLines, setShowMrtLines] = React.useState(true);
  const [activeMrtLine, setActiveMrtLine] = React.useState<MrtLineId | 'all'>('all');
  const [mapZoom, setMapZoom] = React.useState(13);
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

  // Current index of selectedPlace within filtered places for Prev/Next cycling
  const currentPlaceIndex = React.useMemo(() => {
    if (!selectedPlace || places.length === 0) return -1;
    return places.findIndex((p) => p.id === selectedPlace.id);
  }, [places, selectedPlace]);

  const handleCyclePlace = (direction: -1 | 1) => {
    if (places.length === 0) return;
    setIsCardDismissed(false);
    if (currentPlaceIndex === -1) {
      onSelectPlace(places[0]);
      return;
    }
    const nextIndex = (currentPlaceIndex + direction + places.length) % places.length;
    onSelectPlace(places[nextIndex]);
  };

  // Reset card dismissed state when selectedPlace changes
  useEffect(() => {
    setIsCardDismissed(false);
  }, [selectedPlace?.id]);

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [25.0402, 121.5626],
      zoom: 13,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap · Taipei MRT',
      maxZoom: 19,
    }).addTo(map);

    mrtLayerRef.current = L.layerGroup().addTo(map);
    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const handleZoomEnd = () => {
      setMapZoom(map.getZoom());
    };
    map.on('zoomend', handleZoomEnd);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      map.off('zoomend', handleZoomEnd);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render Taipei Metro (MRT) lines and station markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    const mrtLayer = mrtLayerRef.current;
    if (!map || !mrtLayer) return;

    mrtLayer.clearLayers();
    if (!showMrtLines) return;

    // 1. Draw colored Taipei MRT lines with white casing so they stand out at all zoom levels
    TAIPEI_MRT_LINES.forEach((line) => {
      const isSelectedLine = activeMrtLine === line.id;
      const isDimmed = activeMrtLine !== 'all' && !isSelectedLine;
      const lineTitle = lang === 'ru' ? line.nameRu : line.nameEn;

      line.segments.forEach((segment) => {
        // White halo casing underneath
        L.polyline(segment, {
          color: '#FFFFFF',
          weight: isSelectedLine ? 9.5 : isDimmed ? 4.5 : 8,
          opacity: isDimmed ? 0.5 : 0.96,
          lineCap: 'round',
          lineJoin: 'round',
          interactive: false,
        }).addTo(mrtLayer);

        // Colored MRT route line
        const coloredLine = L.polyline(segment, {
          color: line.color,
          weight: isSelectedLine ? 6 : isDimmed ? 2.5 : 4.8,
          opacity: isDimmed ? 0.35 : 0.98,
          lineCap: 'round',
          lineJoin: 'round',
        });

        coloredLine.bindTooltip(
          `<div style="display:flex;align-items:center;gap:6px;font-size:11px;font-weight:700;"><span style="background:${line.color};color:${line.textColor};padding:1px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;">${line.code}</span><span>${lineTitle} (${line.nameZh})</span></div>`,
          { sticky: true, direction: 'top' }
        );

        coloredLine.on('click', () => {
          setActiveMrtLine((prev) => (prev === line.id ? 'all' : line.id));
        });

        coloredLine.addTo(mrtLayer);
      });
    });

    // 2. Draw MRT Station markers and labels
    TAIPEI_MRT_STATIONS.forEach((station) => {
      const matchesFilter =
        activeMrtLine === 'all' || station.lines.includes(activeMrtLine);
      if (!matchesFilter) return;

      const shortCode = station.code.split(' / ')[0];
      const showStationLabel =
        mapZoom >= 14 ||
        (mapZoom >= 13 && (station.isTransfer || activeMrtLine !== 'all')) ||
        (mapZoom >= 12 && activeMrtLine !== 'all' && station.isTransfer);

      const stationMarker = L.marker([station.lat, station.lng], {
        icon: createMrtStationIcon(
          station.lines,
          station.isTransfer,
          shortCode,
          station.nameZh,
          showStationLabel
        ),
        zIndexOffset: station.isTransfer ? 60 : 20,
      });

      const badgesHtml = station.lines
        .map((lid) => {
          const c = MRT_LINE_COLORS[lid];
          return `<span style="background:${c.color};color:${c.textColor};padding:1px 5px;border-radius:4px;font-size:10px;font-weight:800;font-family:'JetBrains Mono',monospace;">${lid}</span>`;
        })
        .join(' ');

      const stationTitle = lang === 'ru' ? station.nameRu : station.nameEn;

      stationMarker.bindTooltip(
        `<div style="min-width:140px;">
          <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;">
            ${badgesHtml}
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;color:#475569;">${station.code}</span>
          </div>
          <div style="font-weight:700;font-size:12px;color:#0F172A;line-height:1.25;">🚇 ${stationTitle}</div>
          <div style="font-size:11px;color:#475569;margin-top:1px;">${station.nameZh}站 · Taipei MRT</div>
        </div>`,
        { direction: 'top', offset: [0, -8] }
      );

      stationMarker.addTo(mrtLayer);
    });
  }, [showMrtLines, activeMrtLine, mapZoom, lang]);

  // Update markers and optional itinerary polyline whenever places, selection, base, or language changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const layerGroup = markersLayerRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    const localizedBase = getLocalizedBaseLocation(baseLocation, lang);

    // Add Base Location Marker if it isn't already covered by My Stay or TPKD Office
    if (
      baseLocation.id !== 'xinyi-brownies-stay' &&
      baseLocation.id !== 'tpkd-office' &&
      Number.isFinite(baseLocation.lat) &&
      Number.isFinite(baseLocation.lng)
    ) {
      const baseMarker = L.marker([baseLocation.lat, baseLocation.lng], {
        icon: createBaseHotelIcon(lang),
        zIndexOffset: 500,
      });
      baseMarker.bindTooltip(
        `${lang === 'ru' ? 'Точка старта' : 'Starting Point'}: ${localizedBase.name} (${baseLocation.chineseName})`,
        {
          direction: 'top',
          offset: [0, -10],
        }
      );
      baseMarker.addTo(layerGroup);
    }

    // Ensure the 3 Big Hubs (My Stay in Xinyi, Brownies Xinyi, and Google TPKD Office) are ALWAYS shown on the map
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

    // Add Place Markers
    combinedPlacesMap.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const isSaved = savedIds.includes(place.id);
      const stopNum = itineraryStopOrder?.get(place.id);
      const loc = getLocalizedPlaceText(place, lang);
      const imgUrl = getPlaceImageUrl(place.id);
      const isBigHub = BIG_HUB_IDS.has(place.id);

      const marker = L.marker([place.lat, place.lng], {
        icon: isBigHub
          ? createPersonalHubIcon(place.id, isSelected, lang)
          : createPinIcon(place.macroCategory, isSelected, isSaved, stopNum),
        zIndexOffset: isSelected
          ? 2500
          : isBigHub
            ? 1800
            : stopNum !== undefined
              ? 700
              : isSaved
                ? 400
                : 100,
      });

      marker.bindTooltip(
        `<div style="width:150px;"><img src="${imgUrl}" alt="" style="width:150px;height:76px;object-fit:cover;border-radius:6px;margin-bottom:4px;display:block;" /><div style="font-weight:600;font-size:12px;line-height:1.25;white-space:normal;">${stopNum ? `${stopNum}. ` : ''}${loc.displayName}</div><div style="font-size:11px;color:#475569;margin-top:2px;">${place.chineseName} · ${place.distanceKm} ${lang === 'ru' ? 'км' : 'km'}</div></div>`,
        { direction: 'top', offset: [0, -14] }
      );

      marker.on('click', () => {
        setIsCardDismissed(false);
        onSelectPlace(place);
      });

      marker.addTo(layerGroup);
    });

    // If tour or itinerary stops exist, draw a clear route line connecting them in order
    if (itineraryStopOrder && itineraryStopOrder.size > 1) {
      const orderedStops = [...places]
        .filter((p) => itineraryStopOrder.has(p.id) && Number.isFinite(p.lat) && Number.isFinite(p.lng))
        .sort((a, b) => (itineraryStopOrder.get(a.id) ?? 0) - (itineraryStopOrder.get(b.id) ?? 0));

      if (orderedStops.length > 1) {
        const latLngs: [number, number][] = orderedStops.map((p) => [p.lat, p.lng]);
        routePolylineRef.current = L.polyline(latLngs, {
          color: '#EA580C',
          weight: 4,
          dashArray: '8, 8',
          opacity: 0.88,
        }).addTo(map);
      }
    }
  }, [places, sourcePool, selectedPlace, baseLocation, savedIds, itineraryStopOrder, onSelectPlace, lang]);

  // Automatically frame the full tour / itinerary path when switching tours or itineraries
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !routeFitKey || mobileLayout === 'list' || places.length === 0) return;
    const validCoords = places
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
      .map((p) => [p.lat, p.lng] as [number, number]);
    if (validCoords.length === 0) return;

    try {
      map.stop();
      map.invalidateSize({ pan: false });
      const size = map.getSize();
      if (size.x <= 0 || size.y <= 0) return;
      const bounds = L.latLngBounds(validCoords);
      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          paddingTopLeft: [32, 52],
          paddingBottomRight: [32, isCardDismissed ? 40 : 160],
          maxZoom: 14,
          animate: true,
        });
      }
    } catch {
      // Ignore if bounds cannot be fit yet
    }
  }, [routeFitKey]);

  // Pan/zoom to selected place with vertical offset so the pin sits cleanly above the bottom card on mobile
  const selectedId = selectedPlace?.id ?? null;
  const selectedLat = selectedPlace?.lat ?? null;
  const selectedLng = selectedPlace?.lng ?? null;

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (
      !map ||
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
      map.stop();
      map.invalidateSize({ pan: false });

      const size = map.getSize();
      const currentZoom = map.getZoom();
      const targetZoom = Number.isFinite(currentZoom) ? Math.max(currentZoom, 14) : 14;

      if (size.x <= 0 || size.y <= 0) {
        map.setView([selectedLat, selectedLng], targetZoom, { animate: false });
        return;
      }

      const verticalOffsetPx = !isCardDismissed
        ? Math.min(56, Math.round(size.y * 0.16))
        : 0;

      const targetPoint = map.project([selectedLat, selectedLng], targetZoom);
      if (Number.isFinite(targetPoint.x) && Number.isFinite(targetPoint.y)) {
        const offsetLatLng = map.unproject(
          L.point(targetPoint.x, targetPoint.y + verticalOffsetPx),
          targetZoom
        );
        if (Number.isFinite(offsetLatLng.lat) && Number.isFinite(offsetLatLng.lng)) {
          map.setView(offsetLatLng, targetZoom, { animate: true });
          return;
        }
      }

      map.setView([selectedLat, selectedLng], targetZoom, { animate: false });
    } catch {
      // Fallback if map projection is not ready
    }
  }, [selectedId, selectedLat, selectedLng, isCardDismissed, mobileLayout]);

  const handleFitAllPins = () => {
    const map = mapInstanceRef.current;
    if (!map || places.length === 0) return;
    const validCoords = places
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))
      .map((p) => [p.lat, p.lng] as [number, number]);
    if (validCoords.length === 0) return;

    map.stop();
    map.invalidateSize({ pan: false });
    const bounds = L.latLngBounds(validCoords);
    if (Number.isFinite(baseLocation.lat) && Number.isFinite(baseLocation.lng)) {
      bounds.extend([baseLocation.lat, baseLocation.lng]);
    }
    if (myStayPlace && Number.isFinite(myStayPlace.lat) && Number.isFinite(myStayPlace.lng)) {
      bounds.extend([myStayPlace.lat, myStayPlace.lng]);
    }
    if (
      tpkdOfficePlace &&
      Number.isFinite(tpkdOfficePlace.lat) &&
      Number.isFinite(tpkdOfficePlace.lng)
    ) {
      bounds.extend([tpkdOfficePlace.lat, tpkdOfficePlace.lng]);
    }
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        paddingTopLeft: [24, 48],
        paddingBottomRight: [24, isCardDismissed ? 36 : 150],
        maxZoom: 15,
        animate: true,
      });
    }
  };

  const handleJumpToMyStay = () => {
    if (myStayPlace) {
      setIsCardDismissed(false);
      onSelectPlace(myStayPlace);
    }
  };

  const handleJumpToTPKD = () => {
    if (tpkdOfficePlace) {
      setIsCardDismissed(false);
      onSelectPlace(tpkdOfficePlace);
    }
  };

  const selectedLoc = selectedPlace ? getLocalizedPlaceText(selectedPlace, lang) : null;

  return (
    <div
      className="relative w-full h-full bg-slate-200 overflow-hidden select-none"
      data-testid="interactive-map-surface"
    >
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Single-Row Top Map Overlay: Fits 100% within 390px mobile width without clipping */}
      <div className="absolute top-2 left-2 right-12 z-[400] flex items-center gap-1 sm:gap-1.5">
        <div
          className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl px-2 sm:px-2.5 py-1.5 shadow-sm shrink-0"
          title={`${t.legendSights} · ${t.legendDining} · ${t.legendTea}`}
        >
          <span className="text-[11px] sm:text-xs font-bold text-slate-900 font-mono-num whitespace-nowrap">
            {places.length}
          </span>
          <div className="flex items-center gap-1 sm:gap-2 text-[11px] text-slate-700">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] inline-block" />
              <span className="hidden sm:inline">{t.legendSights}</span>
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#C2410C] inline-block" />
              <span className="hidden sm:inline">{t.legendDining}</span>
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#B45309] inline-block" />
              <span className="hidden sm:inline">{t.legendTea}</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleJumpToMyStay}
          className="min-h-[34px] px-2 sm:px-2.5 py-1 bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-900 rounded-xl shadow-sm text-[11px] sm:text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          aria-label={lang === 'ru' ? 'Показать где я живу (Синьи, у Brownies)' : 'Show My Stay in Xinyi'}
        >
          <span>{lang === 'ru' ? '🏠 Дом' : '🏠 Stay'}</span>
        </button>

        <button
          type="button"
          onClick={handleJumpToTPKD}
          className="min-h-[34px] px-2 sm:px-2.5 py-1 bg-blue-700/95 hover:bg-blue-800 text-white border border-blue-700 rounded-xl shadow-sm text-[11px] sm:text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          aria-label={lang === 'ru' ? 'Показать мой офис Google TPKD' : 'Show My Office in TPKD'}
        >
          <span>🏢 TPKD</span>
        </button>

        <button
          type="button"
          onClick={handleFitAllPins}
          className="min-h-[34px] px-2 sm:px-2.5 py-1 bg-white/95 hover:bg-white text-slate-800 border border-slate-200/90 rounded-xl shadow-sm text-[11px] sm:text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          aria-label={t.fitAllBtn}
        >
          <Maximize2 className="w-3 h-3 text-slate-600 shrink-0" />
          <span className="sm:hidden">{lang === 'ru' ? 'Все' : 'All'}</span>
          <span className="hidden sm:inline">{t.fitAllBtn}</span>
        </button>

        {onToggleMobileFullMap && (
          <button
            type="button"
            onClick={onToggleMobileFullMap}
            className="lg:hidden min-h-[34px] px-2 py-1 bg-white/95 hover:bg-white text-slate-900 border border-slate-300 rounded-xl shadow-sm text-[11px] font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
            aria-label={
              mobileLayout === 'map'
                ? lang === 'ru'
                  ? 'Вернуть список и карту'
                  : 'Split view'
                : lang === 'ru'
                  ? 'Развернуть карту на весь экран'
                  : 'Full screen map'
            }
          >
            {mobileLayout === 'map' ? (
              <>
                <Minimize2 className="w-3 h-3 shrink-0" />
                <span>{lang === 'ru' ? 'Сплит' : 'Split'}</span>
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

      {/* Taipei Metro (MRT) Line Legend & Filter Bar */}
      <div className="absolute top-12 left-2 right-12 z-[400] flex items-center gap-1 overflow-x-auto no-scrollbar pointer-events-auto">
        <div className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl px-1.5 py-1 shadow-sm">
          <button
            type="button"
            onClick={() => setShowMrtLines((prev) => !prev)}
            className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold inline-flex items-center gap-1 transition-colors ${
              showMrtLines
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
            title={
              lang === 'ru'
                ? 'Показать / скрыть линии метро Тайбэя (MRT)'
                : 'Toggle Taipei Metro (MRT) lines'
            }
          >
            <TrainFront className="w-3 h-3 shrink-0" />
            <span>{lang === 'ru' ? 'Метро' : 'MRT'}</span>
          </button>

          {showMrtLines && (
            <>
              <button
                type="button"
                onClick={() => setActiveMrtLine('all')}
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                  activeMrtLine === 'all'
                    ? 'bg-slate-200 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lang === 'ru' ? 'Все' : 'All'}
              </button>
              {TAIPEI_MRT_LINES.map((line) => {
                const isActive = activeMrtLine === line.id;
                const lineTitle = lang === 'ru' ? line.nameRu : line.nameEn;
                return (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() =>
                      setActiveMrtLine((prev) => (prev === line.id ? 'all' : line.id))
                    }
                    title={`${lineTitle} (${line.nameZh})`}
                    style={{
                      backgroundColor: line.color,
                      color: line.textColor,
                      opacity: activeMrtLine === 'all' || isActive ? 1 : 0.4,
                      outline: isActive ? '2px solid #0F172A' : 'none',
                    }}
                    className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold font-mono-num transition-all"
                  >
                    {line.code}
                  </button>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Minimized Pill when user closes the bottom preview card */}
      {selectedPlace && selectedLoc && isCardDismissed && (
        <div className="absolute bottom-2.5 left-2.5 z-[400]">
          <button
            type="button"
            onClick={() => setIsCardDismissed(false)}
            className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-900/95 text-white shadow-lg text-xs font-semibold inline-flex items-center gap-2 border border-white/15"
          >
            <img
              src={getPlaceImageUrl(selectedPlace.id)}
              alt=""
              className="w-5 h-5 rounded-md object-cover shrink-0"
            />
            <span className="truncate max-w-[180px]">{selectedLoc.displayName}</span>
            <span className="text-amber-300 font-mono-num">
              {selectedPlace.distanceKm} {lang === 'ru' ? 'км' : 'km'}
            </span>
          </button>
        </div>
      )}

      {/* Selected Place Compact Floating Card on Map with Photo & Prev/Next Stepper */}
      {selectedPlace && selectedLoc && !isCardDismissed && (
        <div
          className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 z-[400] bg-white/98 backdrop-blur-md border border-slate-200 rounded-2xl p-2 sm:p-3.5 shadow-xl"
          role="region"
          aria-label={`Selected map location: ${selectedLoc.displayName}`}
        >
          <div className="flex items-center sm:items-start gap-2 sm:gap-2.5">
            <img
              src={getPlaceImageUrl(selectedPlace.id)}
              alt={selectedLoc.displayName}
              onClick={() => onOpenDetailModal(selectedPlace)}
              className="w-11 h-11 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200/80 cursor-pointer"
            />
            <div className="min-w-0 flex-1">
              {/* Row 1: District + Distance on left, Prev/Next Stepper + Close on right */}
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1 text-[11px] text-slate-500 min-w-0 truncate">
                  <span className="font-semibold text-amber-800 truncate">
                    {selectedLoc.districtLabel.replace(/^Район\s+/i, '')}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num text-slate-700 font-semibold whitespace-nowrap">
                    {selectedPlace.distanceKm} {lang === 'ru' ? 'км' : 'km'}
                  </span>
                  <span className="hidden xs:inline text-slate-400" aria-hidden="true">
                    ·
                  </span>
                  <span className="hidden xs:inline text-slate-500 truncate">
                    {selectedPlace.travelEstimate}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {places.length > 1 && (
                    <div className="flex items-center bg-slate-100 rounded-lg px-0.5 py-0.5 border border-slate-200/70">
                      <button
                        type="button"
                        onClick={() => handleCyclePlace(-1)}
                        aria-label={lang === 'ru' ? 'Предыдущее место на карте' : 'Previous place on map'}
                        className="w-6 h-6 rounded-md hover:bg-white text-slate-700 flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono-num text-[10px] font-bold text-slate-700 px-1 whitespace-nowrap">
                        {currentPlaceIndex >= 0 ? currentPlaceIndex + 1 : 1}/{places.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCyclePlace(1)}
                        aria-label={lang === 'ru' ? 'Следующее место на карте' : 'Next place on map'}
                        className="w-6 h-6 rounded-md hover:bg-white text-slate-700 flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsCardDismissed(true)}
                    aria-label="Hide map preview card"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Row 2: Place Title + Chinese Name */}
              <h3 className="text-xs sm:text-base font-bold text-slate-900 truncate mt-0.5">
                {selectedLoc.displayName}{' '}
                <span className="font-normal text-slate-500 text-[11px] sm:text-xs">
                  ({selectedPlace.chineseName})
                </span>
              </h3>

              {/* Row 3: Overview on Desktop only to keep Mobile map preview sleek */}
              <p className="hidden sm:block text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                {selectedLoc.overview}
              </p>
            </div>
          </div>

          <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onToggleSave(selectedPlace.id)}
                aria-label={
                  savedIds.includes(selectedPlace.id)
                    ? `Remove ${selectedPlace.name} from saved trip`
                    : `Save ${selectedPlace.name} to trip`
                }
                className={`min-h-[36px] min-w-[36px] px-2.5 rounded-lg border flex items-center justify-center gap-1 text-xs font-semibold transition-colors ${
                  savedIds.includes(selectedPlace.id)
                    ? 'bg-amber-600 border-amber-600 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 fill-current shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onOpenDetailModal(selectedPlace)}
                className="min-h-[36px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span className="sm:hidden">{lang === 'ru' ? 'Инфо / Такси' : 'Info / Taxi'}</span>
                <span className="hidden sm:inline">{t.taxiCardBtn}</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={selectedPlace.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
                aria-label={`Transit directions to ${selectedPlace.name}`}
              >
                <Navigation className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>{t.routeBtn}</span>
              </a>
              <a
                href={selectedPlace.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[36px] px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
                aria-label={`Open ${selectedPlace.name} in Google Maps`}
              >
                <span className="sm:hidden">{lang === 'ru' ? 'Карта' : 'Maps'}</span>
                <span className="hidden sm:inline">{t.googleMapsBtn}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

