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
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  Sparkles,
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
    <div className="space-y-3 sm:space-y-4">
      {/* Header + Category Filter Pills */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 text-base">
              💆
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-display text-sm sm:text-lg font-bold text-slate-900">
                  {lang === 'ru'
                    ? 'Тайваньские активности: массаж стоп, массаж ножами, чай и колорит'
                    : 'Signature Taiwanese Activities: Foot Massage, Knife Therapy, Tea & Local Fun'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 text-[10px] font-extrabold uppercase tracking-wide">
                  {lang === 'ru' ? '12 лучших впечатлений' : '12 Iconic Experiences'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {lang === 'ru'
                  ? 'Знаменитый рефлексомассаж стоп (6 Star), древний массаж тесаками Дао-Ляо (刀療), мытьё головы сидя с пенной башней, чайные церемонии Гунфу-Ча и ночная ловля креветок'
                  : 'Traditional foot reflexology (6 Star), 2,000-year-old cleaver knife massage (刀療), seated bubble shampoo, Gongfu mountain tea drinking, and indoor shrimp fishing'}
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="group"
          aria-label={lang === 'ru' ? 'Категории активностей' : 'Activity categories'}
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
                  if (next.length > 0 && !next.some((a) => a.id === activeActivityId)) {
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

      {/* Activities Cards List */}
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
        <div className="space-y-3.5">
          {filteredActivities.map((act) => {
            const isSelected = act.id === activeActivityId;
            const primaryPlaceId = act.placeIds[0] || 'taipei-101';
            const heroImg = getPlaceImageUrl(primaryPlaceId);
            const title = lang === 'ru' ? act.titleRu : act.titleEn;
            const subtitle = lang === 'ru' ? act.subtitleRu : act.subtitleEn;
            const duration = lang === 'ru' ? act.durationRu : act.durationEn;
            const bestTime = lang === 'ru' ? act.bestTimeRu : act.bestTimeEn;
            const priceRange = lang === 'ru' ? act.priceRangeRu : act.priceRangeEn;
            const venueLabel = lang === 'ru' ? act.venueRu : act.venueEn;
            const description = lang === 'ru' ? act.descriptionRu : act.descriptionEn;
            const steps = lang === 'ru' ? act.stepByStepRu : act.stepByStepEn;
            const proTip = lang === 'ru' ? act.proTipRu : act.proTipEn;

            const mappedPlaces = act.placeIds
              .map((pid) => placeMap.get(pid))
              .filter((p): p is EnrichedPlaceItem => Boolean(p));

            return (
              <article
                key={act.id}
                onClick={() => onSelectActivity(act)}
                className={`group rounded-2xl bg-white border transition-all duration-150 overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-teal-700 ring-2 ring-teal-600/20 shadow-md'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Hero Image Banner */}
                <div className="relative h-44 sm:h-52 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={heroImg}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-700/95 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-extrabold shadow-sm inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 shrink-0" />
                        <span>{duration}</span>
                      </span>
                      {act.isSignature && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                          {lang === 'ru' ? '⭐ Обязательно попробовать' : '⭐ Must-Try Experience'}
                        </span>
                      )}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-emerald-300 border border-white/15 text-[10px] sm:text-[11px] font-bold">
                      {priceRange}
                    </span>
                  </div>

                  {/* Bottom Title Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <div className="text-[11px] font-semibold text-amber-300 truncate">
                      {act.titleZh}
                    </div>
                    <h3 className="font-display text-sm sm:text-lg font-bold text-white leading-snug mt-0.5">
                      {title}
                    </h3>
                    <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                      {subtitle}
                    </p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3 sm:p-4 space-y-3">
                  {/* Best Time & Venue + Copy Chinese Button */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-2 text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span>{bestTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="truncate">{venueLabel}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyPhrase(act.id, `${act.venueZh} (${act.titleZh})`);
                      }}
                      className="min-h-[32px] px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold inline-flex items-center gap-1 shrink-0 transition-colors"
                    >
                      {copiedId === act.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">
                            {lang === 'ru' ? 'Скопировано!' : 'Copied!'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>
                            {lang === 'ru' ? 'Скопировать для такси 中文' : 'Copy Address 中文'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {description}
                  </p>

                  {/* Step-by-Step / What to Expect */}
                  <div className="bg-teal-50/50 border border-teal-200/70 rounded-xl p-2.5 sm:p-3 space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-teal-900">
                      {lang === 'ru' ? 'Как проходит ритуал / Что внутри:' : 'How It Works / What to Expect:'}
                    </div>
                    <ul className="space-y-1.5">
                      {steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed"
                        >
                          <span className="text-teal-700 font-bold shrink-0 mt-0.5">✦</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Insider Tip */}
                  <div className="flex items-start gap-2 bg-amber-50/70 border border-amber-200/80 rounded-xl p-2.5 text-xs text-amber-950">
                    <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">
                        {lang === 'ru' ? 'Совет инсайдера: ' : 'Insider Tip: '}
                      </span>
                      <span>{proTip}</span>
                    </div>
                  </div>

                  {/* Mapped Venues on Interactive Map */}
                  {mappedPlaces.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {lang === 'ru'
                          ? 'Лучшие проверенные точки на карте (нажмите, чтобы показать):'
                          : 'Recommended Spots on Interactive Map (tap to locate):'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {mappedPlaces.map((place, idx) => {
                          const pText = getLocalizedPlaceText(place, lang);
                          return (
                            <div
                              key={place.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectActivity(act);
                                onSelectPlaceOnMap(place);
                              }}
                              className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 hover:bg-teal-50/60 border border-slate-200/80 hover:border-teal-300 transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-5 h-5 rounded-full bg-teal-700 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-slate-900 truncate">
                                    {pText.displayName}
                                  </div>
                                  <div className="text-[10px] text-slate-500 truncate">
                                    {place.chineseName} · {place.distanceKm.toFixed(1)}{' '}
                                    {lang === 'ru' ? 'км' : 'km'}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenPlaceDetail(place);
                                }}
                                className="px-2 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-semibold text-slate-700 hover:text-slate-900 shrink-0"
                              >
                                {lang === 'ru' ? 'Инфо' : 'Info'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Bottom Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectActivity(act);
                        if (mappedPlaces[0]) {
                          onSelectPlaceOnMap(mappedPlaces[0]);
                        }
                      }}
                      className="min-h-[34px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {lang === 'ru' ? 'Показать на карте' : 'Highlight on Map'}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={act.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[34px] px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-teal-700" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={act.bookingOrOfficialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[34px] px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{lang === 'ru' ? 'Сайт / Бронь' : 'Info / Book'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
