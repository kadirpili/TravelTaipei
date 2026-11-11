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
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Navigation,
  PartyPopper,
  Sparkles,
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
  const [selectedDatePhase, setSelectedDatePhase] = useState<EventDatePhase>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    <div className="space-y-3 sm:space-y-4">
      {/* Festive Header + Date Phase & Category Filter Bars */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
              <PartyPopper className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-display text-sm sm:text-lg font-bold text-slate-900">
                  {lang === 'ru'
                    ? 'События и фестивали: 22 декабря – 7 января'
                    : 'Festive Events & Shows: Dec 22 – Jan 7'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide">
                  {lang === 'ru'
                    ? 'Тайбэй · Баньцяо · Таоюань · Тайчжун'
                    : 'Taipei · New Taipei · Taoyuan · Taichung'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                {lang === 'ru'
                  ? 'Салют Тайбэй 101, концерты Jolin Tsai, BABYMONSTER и Mayday, Christmasland в Баньцяо, бульвар Zootopia и выставки'
                  : 'Taipei 101 NYE fireworks, Jolin Tsai, BABYMONSTER & Mayday concerts, Banqiao Christmasland & pop-up exhibitions'}
              </p>
            </div>
          </div>
        </div>

        {/* Date Window Quick Filter Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="group"
          aria-label={lang === 'ru' ? 'Фильтр по датам' : 'Filter by date window'}
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
                  if (next.length > 0 && !next.some((e) => e.id === activeEventId)) {
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
                  if (next.length > 0 && !next.some((e) => e.id === activeEventId)) {
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

      {/* Events List */}
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
            {lang === 'ru' ? 'Показать все события (22 дек – 7 янв)' : 'Show All Events'}
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredEvents.map((ev) => {
            const isSelected = ev.id === activeEventId;
            const primaryPlaceId = ev.placeIds[0] || 'taipei-101';
            const heroImg = getPlaceImageUrl(primaryPlaceId);
            const title = lang === 'ru' ? ev.titleRu : ev.titleEn;
            const dateRange = lang === 'ru' ? ev.dateRangeRu : ev.dateRangeEn;
            const timeWindow = lang === 'ru' ? ev.timeWindowRu : ev.timeWindowEn;
            const cityLabel = lang === 'ru' ? ev.cityRu : ev.cityEn;
            const venueLabel = lang === 'ru' ? ev.venueRu : ev.venueEn;
            const priceBadge = lang === 'ru' ? ev.priceBadgeRu : ev.priceBadgeEn;
            const description = lang === 'ru' ? ev.descriptionRu : ev.descriptionEn;
            const highlights = lang === 'ru' ? ev.highlightsRu : ev.highlightsEn;
            const proTip = lang === 'ru' ? ev.proTipRu : ev.proTipEn;

            const mappedPlaces = ev.placeIds
              .map((pid) => placeMap.get(pid))
              .filter((p): p is EnrichedPlaceItem => Boolean(p));

            return (
              <article
                key={ev.id}
                onClick={() => onSelectEvent(ev)}
                className={`group rounded-2xl bg-white border transition-all duration-150 overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'border-rose-600 ring-2 ring-rose-500/20 shadow-md'
                    : 'border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Hero Banner */}
                <div className="relative h-40 sm:h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={heroImg}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-600/95 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-extrabold shadow-sm inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 shrink-0" />
                        <span>{dateRange}</span>
                      </span>
                      {ev.isMustSee && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                          {lang === 'ru' ? '🔥 Главный хит' : '🔥 Top Highlight'}
                        </span>
                      )}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-emerald-300 border border-white/15 text-[10px] sm:text-[11px] font-bold">
                      {priceBadge}
                    </span>
                  </div>

                  {/* Bottom Title Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1.5">
                      <span>📍 {cityLabel}</span>
                      <span>·</span>
                      <span className="text-white/85 truncate">{ev.titleZh}</span>
                    </div>
                    <h3 className="font-display text-sm sm:text-lg font-bold text-white leading-snug mt-0.5">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-3 sm:p-4 space-y-3">
                  {/* Time & Venue Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-2 text-xs">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                        <span>{timeWindow}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span className="truncate">{venueLabel}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyVenue(ev.id, `${ev.venueZh} (${ev.titleZh})`);
                      }}
                      className="min-h-[32px] px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-semibold inline-flex items-center gap-1 shrink-0 transition-colors"
                    >
                      {copiedId === ev.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">
                            {lang === 'ru' ? 'Скопировано!' : 'Copied!'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>{lang === 'ru' ? 'Адрес для такси 中文' : 'Copy Venue 中文'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {description}
                  </p>

                  {/* Highlights List */}
                  <ul className="space-y-1.5 bg-amber-50/50 border border-amber-200/70 rounded-xl p-2.5 sm:p-3">
                    {highlights.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-800 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="text-rose-600 font-bold shrink-0 mt-0.5">✦</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pro Tip */}
                  <div className="flex items-start gap-2 bg-teal-50/70 border border-teal-200/80 rounded-xl p-2.5 text-xs text-teal-950">
                    <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
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
                          ? 'Точки на интерактивной карте (нажмите, чтобы показать):'
                          : 'Event Venues & Viewpoints on Map (tap to locate):'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {mappedPlaces.map((place, idx) => {
                          const loc = getLocalizedPlaceText(place, lang);
                          return (
                            <div
                              key={place.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectEvent(ev);
                                onSelectPlaceOnMap(place);
                              }}
                              className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 hover:bg-rose-50/60 border border-slate-200/90 transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="w-5 h-5 rounded-full bg-rose-700 text-white text-[11px] font-bold font-mono-num flex items-center justify-center shrink-0">
                                  {idx + 1}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-xs font-bold text-slate-900 truncate">
                                    {loc.displayName}
                                  </div>
                                  <div className="text-[11px] text-slate-500 truncate">
                                    {place.distanceKm} {lang === 'ru' ? 'км' : 'km'} ·{' '}
                                    {place.travelEstimate}
                                  </div>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenPlaceDetail(place);
                                }}
                                className="px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 shrink-0"
                              >
                                {lang === 'ru' ? 'Инфо' : 'Info'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Footer Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(ev);
                        if (mappedPlaces[0]) {
                          onSelectPlaceOnMap(mappedPlaces[0]);
                        }
                      }}
                      className="min-h-[36px] px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'ru' ? 'Показать на карте' : 'Show Venue on Map'}
                      </span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={ev.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[36px] px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-teal-700" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={ev.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="min-h-[36px] px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{lang === 'ru' ? 'Сайт' : 'Official Site'}</span>
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
