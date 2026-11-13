import React from 'react';
import { getLocalizedPlaceText, Language, UI_STRINGS } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem, SortMode } from '../utils/placesLogic';
import {
  Bookmark,
  ChevronRight,
  MapPin,
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
  isSelected,
  isSaved,
  onSelectOnMap,
  onOpenDetails,
  onToggleSave,
  stopIndex,
  sortBy,
  lang,
}) => {
  const t = UI_STRINGS[lang];
  const loc = getLocalizedPlaceText(place, lang);
  const imageUrl = getPlaceImageUrl(place.id);

  const handleRowClick = () => {
    onSelectOnMap(place);
    onOpenDetails(place);
  };

  return (
    <article
      onClick={handleRowClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleRowClick();
        }
      }}
      aria-label={`${loc.displayName} (${place.chineseName})`}
      className={`group rounded-2xl bg-white border transition-all duration-150 p-2.5 sm:p-3 flex items-center gap-3 cursor-pointer select-none ${
        isSelected
          ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/20 shadow-sm'
          : 'border-slate-200/90 hover:border-amber-500/60 hover:bg-slate-50/60 shadow-2xs'
      }`}
    >
      {/* Left Compact Thumbnail Photo */}
      <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/70">
        <img
          src={imageUrl}
          alt={loc.displayName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Rank or Stop Badge on Thumbnail */}
        {sortBy === 'nearest' && place.distanceRank !== undefined ? (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-emerald-900/90 text-amber-300 font-mono-num text-[10px] font-extrabold shadow-xs">
            #{place.distanceRank}
          </span>
        ) : stopIndex !== undefined ? (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-amber-700 text-white font-mono-num text-[10px] font-extrabold shadow-xs">
            0{stopIndex}
          </span>
        ) : null}

        {/* Price Tier Pill on Bottom-Left of Thumbnail */}
        {place.priceTier && (
          <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-slate-950/80 text-white font-mono-num text-[10px] font-bold">
            {place.priceTier === 'Free' ? t.freePrice : place.priceTier}
          </span>
        )}
      </div>

      {/* Center Compact Info Column */}
      <div className="flex-1 min-w-0 space-y-0.5">
        {/* Micro Metadata Line: Category · District · Distance */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
          <span className="font-semibold text-amber-800 truncate">
            {loc.subCategoryLabel} · {loc.districtLabel}
          </span>
          <span
            className={`font-mono-num font-bold shrink-0 px-1.5 py-0.2 rounded ${
              sortBy === 'nearest'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                : 'text-slate-600'
            }`}
          >
            {place.distanceKm} {lang === 'ru' ? 'км' : 'km'}
          </span>
        </div>

        {/* Title & Chinese Name */}
        <div className="flex items-baseline gap-1.5 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors truncate">
            {loc.displayName}
          </h3>
          <span className="text-xs font-semibold text-slate-500 shrink-0">
            {place.chineseName}
          </span>
        </div>

        {/* Single-line Clamped Preview */}
        <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
          {loc.overview}
        </p>

        {/* Bottom Micro-Row: MRT + Travel Time + Tap Hint */}
        <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
          <span className="truncate">
            🚇 {loc.mrtStation} · {place.travelEstimate}
          </span>
          <span className="text-amber-700 font-semibold shrink-0 hidden sm:inline">
            {lang === 'ru' ? 'Подробнее →' : 'Details →'}
          </span>
        </div>
      </div>

      {/* Right Quick Actions (Pin on Map & Save Bookmark) */}
      <div
        className="flex items-center gap-1 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onSelectOnMap(place)}
          title={lang === 'ru' ? 'Показать на карте' : 'Highlight on Map'}
          aria-label={`Pin ${place.name} on map`}
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
            isSelected
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-600'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-700" />
        </button>

        <button
          type="button"
          onClick={() => onToggleSave(place.id)}
          title={isSaved ? t.savedBtn : t.saveBtn}
          aria-label={
            isSaved
              ? `Remove ${place.name} from saved list`
              : `Save ${place.name} to list`
          }
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
            isSaved
              ? 'bg-amber-700 border-amber-700 text-white'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-600'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        <ChevronRight
          className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all ml-0.5"
          aria-hidden="true"
        />
      </div>
    </article>
  );
};
