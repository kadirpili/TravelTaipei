import React from 'react';
import { getLocalizedPlaceText, Language, UI_STRINGS } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem, SortMode } from '../utils/placesLogic';
import {
  Bookmark,
  ChevronRight,
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
      className={`group rounded-2xl bg-white border transition-all duration-150 p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none active:scale-[0.99] ${
        isSelected
          ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/25 shadow-sm'
          : 'border-slate-200/90 hover:border-amber-500/60 hover:bg-slate-50/60 shadow-2xs'
      }`}
    >
      {/* Left Compact Thumbnail Photo (68px on mobile, 84px on desktop) */}
      <div className="relative w-[68px] h-[68px] sm:w-[84px] sm:h-[84px] rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/70">
        <img
          src={imageUrl}
          alt={loc.displayName}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Rank or Stop Badge on Thumbnail */}
        {sortBy === 'nearest' && place.distanceRank !== undefined ? (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-emerald-900/90 text-amber-300 font-mono-num text-[10px] font-extrabold shadow-xs">
            #{place.distanceRank}
          </span>
        ) : stopIndex !== undefined ? (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-700 text-white font-mono-num text-[10px] font-extrabold shadow-xs">
            0{stopIndex}
          </span>
        ) : null}

        {/* Price Tier Pill on Bottom-Left of Thumbnail */}
        {place.priceTier && (
          <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-slate-950/80 text-white font-mono-num text-[9px] sm:text-[10px] font-bold">
            {place.priceTier === 'Free' ? t.freePrice : place.priceTier}
          </span>
        )}
      </div>

      {/* Center Mobile-Optimized Info Column */}
      <div className="flex-1 min-w-0 space-y-0.5">
        {/* Line 1: Subcategory · District + Distance Badge */}
        <div className="flex items-center justify-between gap-1.5 text-[11px] text-slate-500">
          <span className="font-semibold text-amber-800 truncate">
            {loc.subCategoryLabel} · {loc.districtLabel}
          </span>
          <span
            className={`font-mono-num font-bold shrink-0 px-1.5 py-0.2 rounded text-[11px] ${
              sortBy === 'nearest'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                : 'text-slate-700 bg-slate-100'
            }`}
          >
            {place.distanceKm} {lang === 'ru' ? 'км' : 'km'}
          </span>
        </div>

        {/* Line 2: Full Readable Title (up to 2 lines on mobile) */}
        <h3 className="text-[13px] sm:text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug line-clamp-2 sm:line-clamp-1">
          {loc.displayName}
        </h3>

        {/* Line 3: Chinese Name + MRT + Travel Time */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
          <span className="font-semibold text-slate-700 shrink-0">
            {place.chineseName}
          </span>
          <span aria-hidden="true">·</span>
          <span className="truncate">
            🚇 {loc.mrtStation} · {place.travelEstimate}
          </span>
        </div>

        {/* Line 4: 1-line summary on tablet/desktop, or concise tags on mobile */}
        <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 leading-relaxed">
          {loc.overview}
        </p>
      </div>

      {/* Right Compact Save & Chevron */}
      <div
        className="flex items-center gap-1 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onToggleSave(place.id)}
          title={isSaved ? t.savedBtn : t.saveBtn}
          aria-label={
            isSaved
              ? `Remove ${place.name} from saved list`
              : `Save ${place.name} to list`
          }
          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors ${
            isSaved
              ? 'bg-amber-700 border-amber-700 text-white'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200/80 text-slate-500'
          }`}
        >
          <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        <ChevronRight
          className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-colors"
          aria-hidden="true"
        />
      </div>
    </article>
  );
};
