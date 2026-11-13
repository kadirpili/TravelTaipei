import React, { useMemo, useState } from 'react';
import {
  ACTIVITY_CATEGORIES,
  ActivityCategory,
  filterTaiwanActivities,
  TAIWAN_ACTIVITIES,
  TaiwanActivityItem,
} from '../data/activitiesData';
import { getLocalizedPlaceText, Language } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  Check,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  Sparkles,
  X,
} from 'lucide-react';

interface ActivitiesViewProps {
  allPlaces: EnrichedPlaceItem[];
  activeActivityId: string;
  onSelectActivity: (activity: TaiwanActivityItem) => void;
  onSelectPlaceOnMap: (place: EnrichedPlaceItem) => void;
  onOpenPlaceDetail: (place: EnrichedPlaceItem) => void;
  lang: Language;
  externalSearchQuery?: string;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  allPlaces,
  activeActivityId,
  onSelectActivity,
  onSelectPlaceOnMap,
  onOpenPlaceDetail,
  lang,
  externalSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [detailActivity, setDetailActivity] = useState<TaiwanActivityItem | null>(
    null
  );

  const placeMap = useMemo(() => {
    const map = new Map<string, EnrichedPlaceItem>();
    allPlaces.forEach((p) => map.set(p.id, p));
    return map;
  }, [allPlaces]);

  const filteredActivities = useMemo(
    () =>
      filterTaiwanActivities(
        TAIWAN_ACTIVITIES,
        selectedCategory,
        externalSearchQuery
      ),
    [selectedCategory, externalSearchQuery]
  );

  const handleCopyPhrase = (id: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <div className="space-y-2.5">
      {/* Compact Header + Category Filter Pills */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3.5 shadow-xs space-y-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 text-sm">
            💆
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-sm sm:text-base font-bold text-slate-900 truncate">
              {lang === 'ru'
                ? 'Тайваньские активности: массаж стоп, массаж ножами, чай и креветки'
                : 'Taiwanese Activities: Foot Massage, Knife Therapy, Tea & Shrimp Fishing'}
            </h2>
            <p className="text-[11px] text-slate-500 truncate">
              {lang === 'ru'
                ? 'Нажмите на любую строку, чтобы открыть полное описание, как проходит ритуал и адреса'
                : 'Tap any row to pop up step-by-step details, Chinese taxi phrase & map venues'}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="group"
          aria-label={
            lang === 'ru' ? 'Категории активностей' : 'Activity categories'
          }
        >
          {ACTIVITY_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const next = filterTaiwanActivities(
                    TAIWAN_ACTIVITIES,
                    cat.id,
                    externalSearchQuery
                  );
                  if (
                    next.length > 0 &&
                    !next.some((a) => a.id === activeActivityId)
                  ) {
                    onSelectActivity(next[0]);
                  }
                }}
                aria-pressed={isActive}
                className={`min-h-[30px] px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1 border ${
                  isActive
                    ? 'bg-teal-900 border-teal-900 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200/90 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{lang === 'ru' ? cat.labelRu : cat.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Scrollable Activity Rows */}
      {filteredActivities.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-slate-800">
            {lang === 'ru'
              ? 'По выбранному фильтру активностей не найдено'
              : 'No activities match the current filter'}
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
          >
            {lang === 'ru' ? 'Показать все активности' : 'Show All Activities'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredActivities.map((act) => {
            const isSelected = act.id === activeActivityId;
            const primaryPlaceId = act.placeIds[0] || 'taipei-101';
            const heroImg = getPlaceImageUrl(primaryPlaceId);
            const title = lang === 'ru' ? act.titleRu : act.titleEn;
            const subtitle = lang === 'ru' ? act.subtitleRu : act.subtitleEn;
            const duration = lang === 'ru' ? act.durationRu : act.durationEn;
            const priceRange =
              lang === 'ru' ? act.priceRangeRu : act.priceRangeEn;
            const venueLabel = lang === 'ru' ? act.venueRu : act.venueEn;

            return (
              <article
                key={act.id}
                onClick={() => {
                  onSelectActivity(act);
                  setDetailActivity(act);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectActivity(act);
                    setDetailActivity(act);
                  }
                }}
                className={`group rounded-2xl bg-white border transition-all duration-150 p-2.5 sm:p-3 flex items-center gap-3 cursor-pointer select-none ${
                  isSelected
                    ? 'border-teal-700 ring-2 ring-teal-600/20 bg-teal-50/20 shadow-sm'
                    : 'border-slate-200/90 hover:border-teal-600/60 hover:bg-slate-50/60 shadow-2xs'
                }`}
              >
                {/* Left Compact Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/60">
                  <img
                    src={heroImg}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {act.isSignature && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-extrabold shadow-xs">
                      ⭐ {lang === 'ru' ? 'Хит' : 'Top'}
                    </span>
                  )}
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-slate-950/80 text-white text-[10px] font-bold">
                    {duration}
                  </span>
                </div>

                {/* Center Compact Info */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold text-teal-800 truncate">
                      {act.titleZh}
                    </span>
                    <span className="font-mono-num font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded shrink-0 truncate max-w-[160px]">
                      {priceRange}
                    </span>
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors truncate">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
                    {subtitle}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
                    <span className="truncate">📍 {venueLabel}</span>
                    <span className="text-teal-700 font-semibold shrink-0">
                      {lang === 'ru' ? 'Подробнее →' : 'Details →'}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className="w-4 h-4 text-slate-400 group-hover:text-teal-700 group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      )}

      {/* Pop-Up Activity Detail Modal */}
      {detailActivity && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={
            lang === 'ru' ? detailActivity.titleRu : detailActivity.titleEn
          }
          onClick={() => setDetailActivity(null)}
        >
          <div
            className="bg-[#F8F7F4] text-slate-900 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image Header */}
            <div className="relative h-48 sm:h-56 w-full shrink-0 bg-slate-900 overflow-hidden">
              <img
                src={getPlaceImageUrl(detailActivity.placeIds[0] || 'taipei-101')}
                alt={
                  lang === 'ru'
                    ? detailActivity.titleRu
                    : detailActivity.titleEn
                }
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <button
                type="button"
                onClick={() => setDetailActivity(null)}
                aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                className="absolute top-3.5 right-3.5 min-h-[40px] min-w-[40px] rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3.5 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-teal-600 text-white font-extrabold inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {lang === 'ru'
                        ? detailActivity.durationRu
                        : detailActivity.durationEn}
                    </span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-mono-num font-bold">
                    {lang === 'ru'
                      ? detailActivity.priceRangeRu
                      : detailActivity.priceRangeEn}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {lang === 'ru'
                    ? detailActivity.titleRu
                    : detailActivity.titleEn}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  {detailActivity.titleZh}
                </p>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {/* Time & Venue + Copy Chinese Taxi Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {lang === 'ru'
                      ? 'Адрес и название для такси / персонала:'
                      : 'Show to Taxi Driver / Staff:'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyPhrase(
                        detailActivity.id,
                        `${detailActivity.venueZh} (${detailActivity.titleZh})`
                      )
                    }
                    className="min-h-[32px] px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedId === detailActivity.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'ru' ? 'Скопировать 中文' : 'Copy 中文'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-base sm:text-lg font-extrabold text-white leading-snug">
                  {detailActivity.venueZh}
                </div>
                <div className="text-xs text-slate-300 space-y-0.5">
                  <div>
                    📍{' '}
                    {lang === 'ru'
                      ? detailActivity.venueRu
                      : detailActivity.venueEn}
                  </div>
                  <div>
                    🕒{' '}
                    {lang === 'ru'
                      ? detailActivity.bestTimeRu
                      : detailActivity.bestTimeEn}
                  </div>
                </div>
              </div>

              {/* Description & Step-by-Step Guide */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <p className="text-sm text-slate-800 leading-relaxed">
                  {lang === 'ru'
                    ? detailActivity.descriptionRu
                    : detailActivity.descriptionEn}
                </p>

                <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-3 space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-teal-900">
                    {lang === 'ru'
                      ? 'Как проходит ритуал / Что внутри:'
                      : 'Step-by-Step / What to Expect:'}
                  </div>
                  <ul className="space-y-1.5">
                    {(lang === 'ru'
                      ? detailActivity.stepByStepRu
                      : detailActivity.stepByStepEn
                    ).map((step, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-teal-700 font-bold shrink-0">
                          ✦
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">
                      {lang === 'ru' ? 'Совет инсайдера: ' : 'Insider Tip: '}
                    </span>
                    <span>
                      {lang === 'ru'
                        ? detailActivity.proTipRu
                        : detailActivity.proTipEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mapped Venues */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'ru'
                    ? 'Рекомендуемые точки на карте:'
                    : 'Recommended Venues on Map:'}
                </h4>
                <div className="divide-y divide-slate-200/70 bg-white border border-slate-200/90 rounded-2xl overflow-hidden">
                  {detailActivity.placeIds
                    .map((pid) => placeMap.get(pid))
                    .filter((p): p is EnrichedPlaceItem => Boolean(p))
                    .map((place, idx) => {
                      const pText = getLocalizedPlaceText(place, lang);
                      return (
                        <div
                          key={place.id}
                          className="p-3 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onSelectActivity(detailActivity);
                              onSelectPlaceOnMap(place);
                              setDetailActivity(null);
                            }}
                            className="text-left flex-1 min-w-0 flex items-center gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {pText.displayName} ({place.chineseName})
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {pText.districtLabel} ·{' '}
                                {place.distanceKm.toFixed(1)}{' '}
                                {lang === 'ru' ? 'км' : 'km'} ·{' '}
                                {place.travelEstimate}
                              </div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDetailActivity(null);
                              onOpenPlaceDetail(place);
                            }}
                            className="min-h-[34px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold shrink-0"
                          >
                            {lang === 'ru' ? 'О месте' : 'Place Info'}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="bg-white border-t border-slate-200 px-4 sm:px-5 py-3 flex items-center justify-between gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  onSelectActivity(detailActivity);
                  setDetailActivity(null);
                }}
                className="min-h-[40px] px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ru' ? 'Показать на карте' : 'Show on Map'}
                </span>
              </button>

              <div className="flex items-center gap-1.5">
                <a
                  href={detailActivity.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-700" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={detailActivity.bookingOrOfficialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{lang === 'ru' ? 'Сайт / Бронь' : 'Info / Book'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
