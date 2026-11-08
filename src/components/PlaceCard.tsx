import React, { useMemo, useState } from 'react';
import { getLocalizedPlaceText, Language, UI_STRINGS } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { buildQuickExpandSummary, EnrichedPlaceItem, SortMode } from '../utils/placesLogic';
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  Sparkles,
} from 'lucide-react';

interface PlaceCardProps {
  place: EnrichedPlaceItem;
  allPlaces?: EnrichedPlaceItem[];
  isSelected: boolean;
  isSaved: boolean;
  onSelectOnMap: (place: EnrichedPlaceItem) => void;
  onOpenDetails: (place: EnrichedPlaceItem) => void;
  onToggleSave: (id: string) => void;
  stopIndex?: number;
  sortBy?: SortMode;
  baseLocationName?: string;
  lang: Language;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  allPlaces = [],
  isSelected,
  isSaved,
  onSelectOnMap,
  onOpenDetails,
  onToggleSave,
  stopIndex,
  sortBy,
  baseLocationName,
  lang,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedTaxi, setCopiedTaxi] = useState(false);

  const t = UI_STRINGS[lang];
  const loc = getLocalizedPlaceText(place, lang);
  const imageUrl = getPlaceImageUrl(place.id);

  const summary = useMemo(
    () => buildQuickExpandSummary(place, allPlaces, lang),
    [place, allPlaces, lang]
  );

  const handleCopyChinese = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${place.chineseName} (${place.name})`).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleCopyTaxiPhrase = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary.taxiPhrase).catch(() => {});
    }
    setCopiedTaxi(true);
    setTimeout(() => setCopiedTaxi(false), 1800);
  };

  const summaryPanelId = `quick-summary-${place.id}`;

  return (
    <article
      onClick={() => onSelectOnMap(place)}
      className={`group rounded-2xl bg-white border transition-all duration-150 overflow-hidden cursor-pointer ${
        isSelected
          ? 'border-amber-700 ring-2 ring-amber-700/15 shadow-md'
          : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
      }`}
    >
      {/* Place Photograph Banner */}
      <div className="relative h-32 sm:h-48 w-full overflow-hidden bg-slate-200">
        <img
          src={imageUrl}
          alt={`${loc.displayName} (${place.chineseName})`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent pointer-events-none" />

        {/* Bottom-Left Distance & Travel Estimate over Photo */}
        <div className="absolute bottom-2 left-2.5 right-14 flex items-center justify-between gap-2 pointer-events-none">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg backdrop-blur-xs text-xs font-mono-num font-bold shadow-xs ${
              sortBy === 'nearest'
                ? 'bg-emerald-900/90 text-emerald-100 border border-emerald-400/40'
                : 'bg-slate-950/75 text-white font-medium'
            }`}
          >
            {sortBy === 'nearest' && place.distanceRank !== undefined && (
              <span className="text-amber-300 font-extrabold">
                #{place.distanceRank}
              </span>
            )}
            <span>
              {place.distanceKm} {lang === 'ru' ? 'км' : 'km'} · {place.travelEstimate}
            </span>
          </span>
        </div>

        {/* Top-Right Save / Bookmark Button over Photo (>=44px touch target) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(place.id);
          }}
          aria-label={isSaved ? `Remove ${place.name} from saved list` : `Save ${place.name} to list`}
          className={`absolute top-2 right-2 min-h-[44px] min-w-[44px] rounded-xl border flex items-center justify-center shrink-0 transition-colors shadow-sm ${
            isSaved
              ? 'bg-amber-700 border-amber-600 text-white'
              : 'bg-white/90 backdrop-blur-md border-white/80 text-slate-800 hover:bg-white'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-3 sm:p-5">
        {/* Top quiet unboxed metadata line (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            {stopIndex !== undefined && (
              <>
                <span className="font-mono-num font-bold text-amber-700">
                  0{stopIndex}.
                </span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <span className="font-medium text-slate-700">{loc.subCategoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>
              {loc.districtLabel}, {loc.cityLabel}
            </span>
            {place.priceTier && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono-num text-slate-700">
                  {place.priceTier === 'Free' ? t.freePrice : place.priceTier}
                </span>
              </>
            )}
            {sortBy === 'nearest' && baseLocationName && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-800 font-semibold truncate">
                  {lang === 'ru' ? `от: ${baseLocationName}` : `from: ${baseLocationName}`}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Main Title & Chinese Name Lockup */}
        <div className="mt-1">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition-colors">
            {loc.displayName}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-600">
            <span className="font-medium text-slate-800">{loc.secondaryName}</span>
            <span aria-hidden="true">·</span>
            <span>
              {t.mrtLabel} {loc.mrtStation}
            </span>
          </div>
        </div>

        {/* Overview Prose (Clamped to 2 lines when collapsed, full text when quick-expanded) */}
        <p
          className={`mt-2.5 text-sm text-slate-600 leading-relaxed ${
            isExpanded ? '' : 'line-clamp-2'
          }`}
        >
          {loc.overview}
        </p>

        {/* Unboxed Tags Line when collapsed */}
        {!isExpanded && loc.tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
            {loc.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{tag}</span>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Inline Quick-Expand Summary Section (Shows summary details without opening the full detail sheet) */}
        {isExpanded && (
          <div
            id={summaryPanelId}
            role="region"
            aria-label={`${t.quickSummaryTitle}: ${loc.displayName}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-3.5 pt-3.5 border-t border-slate-200/80 space-y-3 cursor-default"
          >
            {/* Local Insider Tip */}
            {loc.insiderTip && (
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 rounded-xl p-3">
                <span className="font-semibold text-amber-900">{t.localNoteLabel} </span>
                {loc.insiderTip}
              </div>
            )}

            {/* Structured Summary Key Facts Grid */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div className="flex items-baseline justify-between sm:justify-start gap-2 py-1 border-b border-slate-100">
                <dt className="text-slate-500 shrink-0">{t.mrtLabel}</dt>
                <dd className="font-semibold text-slate-900 text-right sm:text-left">
                  {loc.mrtStation}
                </dd>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start gap-2 py-1 border-b border-slate-100">
                <dt className="text-slate-500 shrink-0">{t.quickTimeLabel}</dt>
                <dd className="font-semibold text-slate-900 font-mono-num text-right sm:text-left">
                  {summary.suggestedDuration}
                </dd>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start gap-2 py-1 border-b border-slate-100">
                <dt className="text-slate-500 shrink-0">{t.fromBaseLabel}</dt>
                <dd className="font-semibold text-slate-900 font-mono-num text-right sm:text-left">
                  {place.distanceKm} {lang === 'ru' ? 'км' : 'km'} · {place.travelEstimate}
                </dd>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start gap-2 py-1 border-b border-slate-100">
                <dt className="text-slate-500 shrink-0">GPS:</dt>
                <dd className="font-mono-num text-slate-700 text-right sm:text-left">
                  {summary.coordinatesText}
                </dd>
              </div>
            </dl>

            {/* Inline Show-to-Taxi-Driver Strip */}
            <div className="bg-slate-50 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-slate-500">
                  {t.showToDriverLabel}
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900 tracking-wide mt-0.5">
                  請載我去：{place.chineseName}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyTaxiPhrase}
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
              >
                {copiedTaxi ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    <span className="text-teal-800">{t.copiedPhraseBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.copyPhraseBtn}</span>
                  </>
                )}
              </button>
            </div>

            {/* Nearby Spots to Pair With */}
            {summary.nearbySpots.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold text-slate-500 mb-1.5">
                  {t.quickNearbyLabel}
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {summary.nearbySpots.map(({ place: nearPlace, distanceFromHereKm }) => {
                    const nearLoc = getLocalizedPlaceText(nearPlace, lang);
                    return (
                      <button
                        key={nearPlace.id}
                        type="button"
                        onClick={() => onSelectOnMap(nearPlace)}
                        className="min-h-[34px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span className="truncate max-w-[160px]">{nearLoc.displayName}</span>
                        <span className="font-mono-num text-[11px] text-teal-800 font-semibold">
                          {distanceFromHereKm} {lang === 'ru' ? 'км' : 'km'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tags & Full Detail Sheet Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              {loc.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
                  {loc.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span aria-hidden="true">·</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => onOpenDetails(place)}
                className="min-h-[36px] px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ml-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>{t.quickFullSheetBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* Bottom Action Bar with >=44px Mobile Touch Targets */}
        <div
          className="mt-2.5 sm:mt-3.5 pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Quick-Expand Toggle Button */}
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              aria-expanded={isExpanded}
              aria-controls={summaryPanelId}
              className={`min-h-[42px] sm:min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
                isExpanded
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900'
              }`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.quickCollapseBtn}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.quickExpandBtn}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectOnMap(place)}
              aria-label={`Pin ${place.name} on map`}
              className="min-h-[42px] sm:min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{t.pinOnMapBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleCopyChinese}
              className="min-h-[42px] sm:min-h-[44px] px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-600 text-xs font-medium inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              aria-label={`Copy Chinese name for ${place.name}`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-700" />
                  <span className="text-teal-800">{t.copiedBtn}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>中文</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <a
              href={place.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] sm:min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              aria-label={`Directions to ${place.name} in Google Maps`}
            >
              <Navigation className="w-3.5 h-3.5 text-teal-700" />
              <span>{t.routeBtn}</span>
            </a>

            <a
              href={place.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] sm:min-h-[44px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
              aria-label={`Open ${place.name} in Google Maps`}
            >
              <span className="sm:hidden">{lang === 'ru' ? 'Карта' : 'Maps'}</span>
              <span className="hidden sm:inline">{t.googleMapsBtn}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

