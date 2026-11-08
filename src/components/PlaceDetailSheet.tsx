import React, { useState } from 'react';
import { BaseLocation } from '../data/placesData';
import {
  getLocalizedBaseLocation,
  getLocalizedPlaceText,
  Language,
  UI_STRINGS,
} from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { calculateDistanceKm, EnrichedPlaceItem } from '../utils/placesLogic';
import { Bookmark, Check, Copy, ExternalLink, MapPin, Navigation, X } from 'lucide-react';

interface PlaceDetailSheetProps {
  place: EnrichedPlaceItem | null;
  allPlaces: EnrichedPlaceItem[];
  baseLocation: BaseLocation;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onSelectPlaceOnMap: (place: EnrichedPlaceItem) => void;
  lang: Language;
}

export const PlaceDetailSheet: React.FC<PlaceDetailSheetProps> = ({
  place,
  allPlaces,
  baseLocation,
  isSaved,
  onClose,
  onToggleSave,
  onSelectPlaceOnMap,
  lang,
}) => {
  const [copied, setCopied] = useState(false);

  if (!place) return null;

  const t = UI_STRINGS[lang];
  const loc = getLocalizedPlaceText(place, lang);
  const localizedBase = getLocalizedBaseLocation(baseLocation, lang);
  const heroImageUrl = getPlaceImageUrl(place.id);

  // Find up to 4 closest places from the dataset to pair with this stop
  const nearbyPairings = allPlaces
    .filter((p) => p.id !== place.id)
    .map((p) => ({
      item: p,
      distFromHere: calculateDistanceKm(place.lat, place.lng, p.lat, p.lng),
    }))
    .sort((a, b) => a.distFromHere - b.distFromHere)
    .slice(0, 4);

  const handleCopyTaxiCard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(`請載我去：${place.chineseName} (${place.name} - ${place.district})`)
        .catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/55 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[88vh] bg-[#F8F7F4] rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image Header with Dark Scrim & Close Button */}
        <div className="relative h-52 sm:h-64 w-full shrink-0 bg-slate-900 overflow-hidden">
          <img
            src={heroImageUrl}
            alt={loc.displayName}
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeModalAria}
            className="absolute top-3.5 right-3.5 min-h-[44px] min-w-[44px] rounded-xl bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center shadow-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3.5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-amber-200">
              <span className="font-semibold">{loc.subCategoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>
                {loc.districtLabel}, {loc.cityLabel}
              </span>
              {place.priceTier && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num">
                    {place.priceTier === 'Free' ? t.freePrice : place.priceTier}
                  </span>
                </>
              )}
            </div>
            <h2
              id="detail-sheet-title"
              className="text-xl sm:text-2xl font-bold text-white mt-0.5 leading-snug"
            >
              {loc.displayName}
            </h2>
          </div>
        </div>

        {/* Scrollable Sheet Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Show-to-Driver / Local Bilingual Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500">
                {t.showToDriverLabel}
              </span>
              <button
                type="button"
                onClick={handleCopyTaxiCard}
                className="min-h-[38px] px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span>{t.copiedPhraseBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.copyPhraseBtn}</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide mt-1">
              {place.chineseName}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {t.mrtLabel}{' '}
              <span className="text-slate-800 font-medium">{loc.mrtStation}</span>
              {loc.recommendedDuration ? ` · ${t.suggestedStayLabel} ${loc.recommendedDuration}` : ''}
            </p>
          </div>

          {/* Overview & Local Tip */}
          <div className="space-y-3">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {loc.overview}
            </p>
            {loc.insiderTip && (
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed">
                <span className="font-semibold text-amber-900">{t.travelerTipLabel} </span>
                {loc.insiderTip}
              </div>
            )}
          </div>

          {/* Distance from Selected Base Point */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">
                {t.distanceFromBaseTitle(localizedBase.name)}
              </div>
              <div className="text-base font-bold text-slate-900 font-mono-num mt-0.5">
                {place.distanceKm} {lang === 'ru' ? 'км' : 'km'} · {place.travelEstimate}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectPlaceOnMap(place);
                onClose();
              }}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t.centerOnMapBtn}</span>
            </button>
          </div>

          {/* Nearby Pairings (Walkable Sights / Food Nearby) with Thumbnails */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2.5">
              {t.closestPairingsTitle(loc.displayName)}
            </h3>
            <div className="divide-y divide-slate-200/70 bg-white border border-slate-200/90 rounded-2xl overflow-hidden">
              {nearbyPairings.map(({ item, distFromHere }) => {
                const pairLoc = getLocalizedPlaceText(item, lang);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectPlaceOnMap(item);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 min-h-[64px]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={getPlaceImageUrl(item.id)}
                        alt={pairLoc.displayName}
                        loading="lazy"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200/80"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          {pairLoc.displayName}{' '}
                          <span className="font-normal text-slate-500 text-xs">
                            ({item.chineseName})
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 truncate mt-0.5">
                          {pairLoc.subCategoryLabel} · {pairLoc.districtLabel}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono-num font-medium text-teal-800 shrink-0">
                      {distFromHere} {t.kmAwaySuffix}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Sheet Actions */}
        <div className="bg-white border-t border-slate-200 px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onToggleSave(place.id)}
            className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-amber-700 border-amber-700 text-white'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 shrink-0 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? t.savedBtn : t.saveBtn}</span>
          </button>

          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <a
              href={place.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{t.routeBtn}</span>
            </a>
            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.googleMapsBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
