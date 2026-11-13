import React, { useMemo, useState } from 'react';
import {
  EVENT_CATEGORIES,
  EVENT_DATE_PHASES,
  EventCategory,
  EventDatePhase,
  FESTIVE_EVENTS,
  FestiveEventItem,
  filterFestiveEvents,
} from '../data/eventsData';
import { getLocalizedPlaceText, Language } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  PartyPopper,
  Sparkles,
  X,
} from 'lucide-react';

interface EventsViewProps {
  allPlaces: EnrichedPlaceItem[];
  activeEventId: string;
  onSelectEvent: (event: FestiveEventItem) => void;
  onSelectPlaceOnMap: (place: EnrichedPlaceItem) => void;
  onOpenPlaceDetail: (place: EnrichedPlaceItem) => void;
  lang: Language;
  externalSearchQuery?: string;
}

export const EventsView: React.FC<EventsViewProps> = ({
  allPlaces,
  activeEventId,
  onSelectEvent,
  onSelectPlaceOnMap,
  onOpenPlaceDetail,
  lang,
  externalSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [selectedDatePhase, setSelectedDatePhase] =
    useState<EventDatePhase>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [detailEvent, setDetailEvent] = useState<FestiveEventItem | null>(null);

  const placeMap = useMemo(() => {
    const map = new Map<string, EnrichedPlaceItem>();
    allPlaces.forEach((p) => map.set(p.id, p));
    return map;
  }, [allPlaces]);

  const filteredEvents = useMemo(
    () =>
      filterFestiveEvents(
        FESTIVE_EVENTS,
        selectedCategory,
        selectedDatePhase,
        externalSearchQuery
      ),
    [selectedCategory, selectedDatePhase, externalSearchQuery]
  );

  const handleCopyVenue = (id: string, text: string) => {
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
      {/* Compact Header + Date Phase & Category Filter Bars */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3.5 shadow-xs space-y-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
            <PartyPopper className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-sm sm:text-base font-bold text-slate-900 truncate">
              {lang === 'ru'
                ? 'События, фестивали и мастер-классы (DIY): 22 дек – 7 янв'
                : 'Festive Events, Concerts & DIY Classes: Dec 22 – Jan 7'}
            </h2>
            <p className="text-[11px] text-slate-500 truncate">
              {lang === 'ru'
                ? 'Нажмите на любую строку для расписания, адреса на китайском и деталей'
                : 'Tap any row to pop up full schedule, Chinese taxi card & map points'}
            </p>
          </div>
        </div>

        {/* Date Window Quick Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="group"
          aria-label={
            lang === 'ru' ? 'Фильтр по датам' : 'Filter by date window'
          }
        >
          <Calendar className="w-3.5 h-3.5 text-rose-700 shrink-0 mr-0.5" />
          {EVENT_DATE_PHASES.map((phase) => {
            const isActive = selectedDatePhase === phase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => {
                  setSelectedDatePhase(phase.id);
                  const next = filterFestiveEvents(
                    FESTIVE_EVENTS,
                    selectedCategory,
                    phase.id,
                    externalSearchQuery
                  );
                  if (
                    next.length > 0 &&
                    !next.some((e) => e.id === activeEventId)
                  ) {
                    onSelectEvent(next[0]);
                  }
                }}
                aria-pressed={isActive}
                className={`min-h-[28px] px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-rose-700 border-rose-700 text-white shadow-xs'
                    : 'bg-rose-50/70 border-rose-200/80 text-rose-950 hover:bg-rose-100/80'
                }`}
              >
                {lang === 'ru' ? phase.labelRu : phase.labelEn}
              </button>
            );
          })}
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="group"
          aria-label={lang === 'ru' ? 'Категории событий' : 'Event categories'}
        >
          {EVENT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const next = filterFestiveEvents(
                    FESTIVE_EVENTS,
                    cat.id,
                    selectedDatePhase,
                    externalSearchQuery
                  );
                  if (
                    next.length > 0 &&
                    !next.some((e) => e.id === activeEventId)
                  ) {
                    onSelectEvent(next[0]);
                  }
                }}
                aria-pressed={isActive}
                className={`min-h-[30px] px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1 border ${
                  isActive
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
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

      {/* Compact Scrollable Event Rows */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-slate-800">
            {lang === 'ru'
              ? 'По выбранному фильтру событий не найдено'
              : 'No events match the current filter'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedDatePhase('all');
            }}
            className="mt-3 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
          >
            {lang === 'ru'
              ? 'Показать все события (22 дек – 7 янв)'
              : 'Show All Events'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredEvents.map((ev) => {
            const isSelected = ev.id === activeEventId;
            const primaryPlaceId = ev.placeIds[0] || 'taipei-101';
            const heroImg = getPlaceImageUrl(primaryPlaceId);
            const title = lang === 'ru' ? ev.titleRu : ev.titleEn;
            const dateRange = lang === 'ru' ? ev.dateRangeRu : ev.dateRangeEn;
            const cityLabel = lang === 'ru' ? ev.cityRu : ev.cityEn;
            const venueLabel = lang === 'ru' ? ev.venueRu : ev.venueEn;
            const priceBadge =
              lang === 'ru' ? ev.priceBadgeRu : ev.priceBadgeEn;
            const description =
              lang === 'ru' ? ev.descriptionRu : ev.descriptionEn;

            return (
              <article
                key={ev.id}
                onClick={() => {
                  onSelectEvent(ev);
                  setDetailEvent(ev);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectEvent(ev);
                    setDetailEvent(ev);
                  }
                }}
                className={`group rounded-2xl bg-white border transition-all duration-150 p-2.5 sm:p-3 flex items-center gap-3 cursor-pointer select-none ${
                  isSelected
                    ? 'border-rose-600 ring-2 ring-rose-500/20 bg-rose-50/20 shadow-sm'
                    : 'border-slate-200/90 hover:border-rose-500/60 hover:bg-slate-50/60 shadow-2xs'
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
                  {ev.isMustSee && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-extrabold shadow-xs">
                      🔥 {lang === 'ru' ? 'Хит' : 'Top'}
                    </span>
                  )}
                  <span className="absolute bottom-1 left-1 right-1 px-1 py-0.2 rounded bg-slate-950/85 text-white text-[9px] font-bold truncate text-center">
                    {dateRange}
                  </span>
                </div>

                {/* Center Compact Info */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold text-rose-800 truncate">
                      📍 {cityLabel} · {ev.titleZh}
                    </span>
                    <span className="font-mono-num font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded shrink-0 truncate max-w-[150px]">
                      {priceBadge}
                    </span>
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 group-hover:text-rose-800 transition-colors truncate">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
                    {description}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
                    <span className="truncate">{venueLabel}</span>
                    <span className="text-rose-700 font-semibold shrink-0">
                      {lang === 'ru' ? 'Подробнее →' : 'Details →'}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className="w-4 h-4 text-slate-400 group-hover:text-rose-700 group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      )}

      {/* Pop-Up Event Detail Modal */}
      {detailEvent && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'ru' ? detailEvent.titleRu : detailEvent.titleEn}
          onClick={() => setDetailEvent(null)}
        >
          <div
            className="bg-[#F8F7F4] text-slate-900 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image Header */}
            <div className="relative h-48 sm:h-56 w-full shrink-0 bg-slate-900 overflow-hidden">
              <img
                src={getPlaceImageUrl(detailEvent.placeIds[0] || 'taipei-101')}
                alt={lang === 'ru' ? detailEvent.titleRu : detailEvent.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <button
                type="button"
                onClick={() => setDetailEvent(null)}
                aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                className="absolute top-3.5 right-3.5 min-h-[40px] min-w-[40px] rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3.5 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-extrabold inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {lang === 'ru'
                        ? detailEvent.dateRangeRu
                        : detailEvent.dateRangeEn}
                    </span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-mono-num font-bold">
                    {lang === 'ru'
                      ? detailEvent.priceBadgeRu
                      : detailEvent.priceBadgeEn}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
                  {lang === 'ru' ? detailEvent.titleRu : detailEvent.titleEn}
                </h3>
                <p className="text-xs text-amber-300 font-semibold mt-0.5">
                  📍 {lang === 'ru' ? detailEvent.cityRu : detailEvent.cityEn} ·{' '}
                  {detailEvent.titleZh}
                </p>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {/* Venue & Taxi Chinese Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {lang === 'ru'
                      ? 'Место проведения (для такси 中文):'
                      : 'Venue & Taxi Card (中文):'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyVenue(
                        detailEvent.id,
                        `${detailEvent.venueZh} (${detailEvent.titleZh})`
                      )
                    }
                    className="min-h-[32px] px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedId === detailEvent.id ? (
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
                <div className="text-base sm:text-lg font-extrabold text-white">
                  {detailEvent.venueZh}
                </div>
                <div className="text-xs text-slate-300 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? detailEvent.venueRu
                        : detailEvent.venueEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? detailEvent.timeWindowRu
                        : detailEvent.timeWindowEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description & Highlights */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <p className="text-sm text-slate-800 leading-relaxed">
                  {lang === 'ru'
                    ? detailEvent.descriptionRu
                    : detailEvent.descriptionEn}
                </p>

                <ul className="space-y-1.5 bg-amber-50/60 border border-amber-200/80 rounded-xl p-3">
                  {(lang === 'ru'
                    ? detailEvent.highlightsRu
                    : detailEvent.highlightsEn
                  ).map((bullet, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-rose-600 font-bold shrink-0">
                        ✦
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-start gap-2 bg-teal-50/70 border border-teal-200/80 rounded-xl p-3 text-xs text-teal-950">
                  <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">
                      {lang === 'ru' ? 'Совет инсайдера: ' : 'Insider Tip: '}
                    </span>
                    <span>
                      {lang === 'ru'
                        ? detailEvent.proTipRu
                        : detailEvent.proTipEn}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mapped Venues */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'ru'
                    ? 'Точки на интерактивной карте:'
                    : 'Venues & Viewpoints on Map:'}
                </h4>
                <div className="divide-y divide-slate-200/70 bg-white border border-slate-200/90 rounded-2xl overflow-hidden">
                  {detailEvent.placeIds
                    .map((pid) => placeMap.get(pid))
                    .filter((p): p is EnrichedPlaceItem => Boolean(p))
                    .map((place, idx) => {
                      const loc = getLocalizedPlaceText(place, lang);
                      return (
                        <div
                          key={place.id}
                          className="p-3 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onSelectEvent(detailEvent);
                              onSelectPlaceOnMap(place);
                              setDetailEvent(null);
                            }}
                            className="text-left flex-1 min-w-0 flex items-center gap-2.5"
                          >
                            <span className="w-5 h-5 rounded-full bg-rose-700 text-white text-[11px] font-bold font-mono-num flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {loc.displayName} ({place.chineseName})
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {place.distanceKm}{' '}
                                {lang === 'ru' ? 'км' : 'km'} ·{' '}
                                {place.travelEstimate}
                              </div>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDetailEvent(null);
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
                  onSelectEvent(detailEvent);
                  setDetailEvent(null);
                }}
                className="min-h-[40px] px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ru' ? 'Показать на карте' : 'Show on Map'}
                </span>
              </button>

              <div className="flex items-center gap-1.5">
                <a
                  href={detailEvent.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-700" />
                  <span>Google Maps</span>
                </a>
                <a
                  href={detailEvent.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{lang === 'ru' ? 'Сайт' : 'Official Site'}</span>
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
