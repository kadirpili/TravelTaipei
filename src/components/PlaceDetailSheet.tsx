import React, { useState } from 'react';
import { BaseLocation } from '../data/placesData';
import {
  getLocalizedBaseLocation,
  getLocalizedPlaceText,
  Language,
  UI_STRINGS,
} from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import {
  buildQuickExpandSummary,
  calculateDistanceKm,
  EnrichedPlaceItem,
} from '../utils/placesLogic';
import {
  Bookmark,
  Check,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  Sparkles,
  TrainFront,
  X,
} from 'lucide-react';

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
  const [copiedName, setCopiedName] = useState(false);

  if (!place) return null;

  const t = UI_STRINGS[lang];
  const loc = getLocalizedPlaceText(place, lang);
  const localizedBase = getLocalizedBaseLocation(baseLocation, lang);
  const heroImageUrl = getPlaceImageUrl(place.id);
  const summary = buildQuickExpandSummary(place, allPlaces, lang);

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

  const handleCopyChineseName = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(place.chineseName).catch(() => {});
    }
    setCopiedName(true);
    setTimeout(() => setCopiedName(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-sheet-title"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl max-h-[88vh] bg-[#F8F7F4] rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
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
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeModalAria}
            className="absolute top-3.5 right-3.5 min-h-[42px] min-w-[42px] rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-colors border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3.5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-amber-300 font-semibold">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/30 text-amber-200">
                {loc.subCategoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {loc.districtLabel}, {loc.cityLabel}
              </span>
              {place.priceTier && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono-num px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-200 font-bold">
                    {place.priceTier === 'Free' ? t.freePrice : place.priceTier}
                  </span>
                </>
              )}
            </div>
            <h2
              id="detail-sheet-title"
              className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug"
            >
              {loc.displayName}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium mt-0.5">
              {place.chineseName} · {place.name}
            </p>
          </div>
        </div>

        {/* Scrollable Sheet Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Specialty & Highlights Tags */}
          {loc.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {loc.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-amber-100/80 border border-amber-200/80 text-amber-950 text-xs font-semibold"
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          )}

          {/* Overview & Insider What-to-Order / Local Tip */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                {lang === 'ru'
                  ? 'О месте / Что попробовать'
                  : 'Overview & What to Expect'}
              </div>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {loc.overview}
              </p>
            </div>

            {loc.insiderTip && (
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950">
                    {t.travelerTipLabel}{' '}
                  </span>
                  <span>{loc.insiderTip}</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Logistics Grid: MRT, Duration, Distance from Base */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-start gap-2.5">
              <TrainFront className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500">{t.mrtLabel}</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {loc.mrtStation}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-[11px] text-slate-500">
                  {t.quickTimeLabel}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono-num">
                  {summary.suggestedDuration}
                </div>
              </div>
            </div>
          </div>

          {/* Show-to-Driver / Restaurant Staff Bilingual Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                {t.showToDriverLabel}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyChineseName}
                  className="min-h-[32px] px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  {copiedName ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{t.copiedBtn}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>中文</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCopyTaxiCard}
                  className="min-h-[32px] px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 shrink-0" />
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
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              請載我去：{place.chineseName}
            </p>
            <p className="text-xs text-slate-300 font-mono-num">
              {loc.districtLabel}, {loc.cityLabel} · GPS: {summary.coordinatesText}
            </p>
          </div>

          {/* Distance from Selected Base Point */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-500">
                {t.distanceFromBaseTitle(localizedBase.name)}
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 font-mono-num mt-0.5">
                {place.distanceKm} {lang === 'ru' ? 'км' : 'km'} ·{' '}
                {place.travelEstimate}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onSelectPlaceOnMap(place);
                onClose();
              }}
              className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t.centerOnMapBtn}</span>
            </button>
          </div>

          {/* Nearby Pairings (Walkable Sights / Food Nearby) with Thumbnails */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
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
                    className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={getPlaceImageUrl(item.id)}
                        alt={pairLoc.displayName}
                        loading="lazy"
                        className="w-11 h-11 rounded-xl object-cover shrink-0 border border-slate-200/80"
                      />
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {pairLoc.displayName}{' '}
                          <span className="font-normal text-slate-500 text-xs">
                            ({item.chineseName})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {pairLoc.subCategoryLabel} · {pairLoc.districtLabel}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono-num font-bold text-teal-800 shrink-0">
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
            className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              isSaved
                ? 'bg-amber-700 border-amber-700 text-white'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 shrink-0 ${isSaved ? 'fill-current' : ''}`}
            />
            <span>{isSaved ? t.savedBtn : t.saveBtn}</span>
          </button>

          <div className="flex items-center gap-1.5 flex-1 justify-end">
            <a
              href={place.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
            >
              <Navigation className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>{t.routeBtn}</span>
            </a>
            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
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
