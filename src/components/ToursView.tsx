import React from 'react';
import { BOOKABLE_TOURS, BookableTour } from '../data/toursData';
import { getLocalizedPlaceText, Language, UI_STRINGS } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  MapPin,
  Navigation,
  Sparkles,
  Star,
  Ticket,
} from 'lucide-react';

interface ToursViewProps {
  allPlaces: EnrichedPlaceItem[];
  activeTourId: string;
  onSelectTour: (id: string) => void;
  onSelectPlaceOnMap: (place: EnrichedPlaceItem) => void;
  onOpenPlaceDetail: (place: EnrichedPlaceItem) => void;
  lang: Language;
}

export const ToursView: React.FC<ToursViewProps> = ({
  allPlaces,
  activeTourId,
  onSelectTour,
  onSelectPlaceOnMap,
  onOpenPlaceDetail,
  lang,
}) => {
  const t = UI_STRINGS[lang];
  const activeTour: BookableTour =
    BOOKABLE_TOURS.find((tour) => tour.id === activeTourId) ?? BOOKABLE_TOURS[0];

  const placeMap = React.useMemo(() => {
    const map = new Map<string, EnrichedPlaceItem>();
    allPlaces.forEach((p) => map.set(p.id, p));
    return map;
  }, [allPlaces]);

  return (
    <div className="space-y-2.5 sm:space-y-4">
      {/* Compact Mobile-First Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-teal-900 text-white rounded-2xl p-3 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/15 text-amber-200 text-[11px] font-bold">
            <Ticket className="w-3.5 h-3.5" />
            <span>
              {lang === 'ru'
                ? 'Туры Klook / KKday с маршрутом на карте'
                : 'Verified Klook & KKday Tours with Map Paths'}
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-amber-100/90 font-medium">
            {lang === 'ru'
              ? 'Нажмите на любой тур, чтобы увидеть все его остановки и линию маршрута на карте →'
              : 'Click any tour below to plot its numbered stops & route path on the map →'}
          </span>
        </div>
        <h2 className="font-display text-sm sm:text-xl font-bold mt-1.5">
          {lang === 'ru'
            ? 'Лучшие экскурсии из Тайбэя (Цены, расписание и маршрут)'
            : 'Best Bookable Taipei & North Coast Tours (Prices, Times & Map Path)'}
        </h2>
      </div>

      {/* Tour Selector Cards with Direct Klook / KKday / GetYourGuide Links */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
        role="region"
        aria-label={lang === 'ru' ? 'Выбор экскурсионного тура Klook' : 'Select a Klook Tour'}
      >
        {BOOKABLE_TOURS.map((tour, idx) => {
          const isActive = tour.id === activeTour.id;
          const title = lang === 'ru' ? tour.titleRu : tour.titleEn;
          const badge = lang === 'ru' ? tour.platformBadgeRu : tour.platformBadgeEn;
          const days = lang === 'ru' ? tour.daysOfWeekRu : tour.daysOfWeekEn;

          return (
            <div
              key={tour.id}
              onClick={() => onSelectTour(tour.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-2.5 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500/50'
                  : 'bg-white text-slate-900 border-slate-200/90 hover:border-amber-600/60 hover:bg-amber-50/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    #{idx + 1} · {badge}
                  </span>
                  <span
                    className={`font-mono-num text-xs font-extrabold whitespace-nowrap ${
                      isActive ? 'text-emerald-300' : 'text-emerald-800'
                    }`}
                  >
                    {tour.priceUsd}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectTour(tour.id)}
                  className="text-left w-full focus:outline-none"
                >
                  <h3 className="font-display text-sm sm:text-base font-bold leading-snug">
                    {title}
                  </h3>
                </button>
              </div>

              <div
                className={`flex flex-wrap items-center justify-between gap-2 pt-2 border-t text-[11px] ${
                  isActive
                    ? 'border-white/15 text-slate-300'
                    : 'border-slate-100 text-slate-500'
                }`}
              >
                <span className="truncate">
                  {days.split('(')[0].trim()} ·{' '}
                  {lang === 'ru'
                    ? `${tour.stops.length} точек`
                    : `${tour.stops.length} stops`}
                </span>

                {/* Direct Klook / KKday / GetYourGuide Links right on every Tour Card */}
                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={tour.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded-lg bg-[#FF5B00] hover:bg-[#E05000] text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Klook</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={tour.kkdayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                  >
                    <span>KKday</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={tour.getYourGuideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-colors ${
                      isActive
                        ? 'bg-white/15 hover:bg-white/25 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>
                      {tour.id === 'klook-pass-taipei-highlights'
                        ? 'FunPASS'
                        : 'GetYourGuide'}
                    </span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Tour Full Details Card: Price, Direct Booking Websites, Days, Times, Meeting Point & Inclusions */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold">
                {lang === 'ru' ? activeTour.platformBadgeRu : activeTour.platformBadgeEn}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {lang === 'ru' ? activeTour.ratingTextRu : activeTour.ratingTextEn}
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-2xl font-bold text-slate-900">
              {lang === 'ru' ? activeTour.titleRu : activeTour.titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ru' ? activeTour.subtitleRu : activeTour.subtitleEn}
            </p>
          </div>

          {/* Price + Immediate Klook & KKday CTA Box */}
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl px-4 py-3 shrink-0 min-w-[230px] space-y-2">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                {lang === 'ru' ? 'Стоимость тура (Klook / KKday)' : 'Tour Price (Klook / KKday)'}
              </div>
              <div className="font-mono-num text-xl sm:text-2xl font-extrabold text-emerald-950 mt-0.5">
                {activeTour.priceUsd}
              </div>
              <div className="font-mono-num text-xs font-semibold text-emerald-800">
                ≈ {activeTour.priceTwd} {lang === 'ru' ? 'за человека' : 'per person'}
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <a
                href={activeTour.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-[#FF5B00] hover:bg-[#E05000] text-white text-xs font-bold inline-flex items-center justify-center gap-1 shadow-xs transition-colors whitespace-nowrap"
              >
                <span>{lang === 'ru' ? 'На Klook' : 'Book Klook'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={activeTour.kkdayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold inline-flex items-center justify-center gap-1 shadow-xs transition-colors whitespace-nowrap"
              >
                <span>{lang === 'ru' ? 'На KKday' : 'Book KKday'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Prominent Direct Booking Websites Bar (Klook, KKday, GetYourGuide, Official FunPASS) */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 sm:p-3.5">
          <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-[#FF5B00]" />
            <span>
              {lang === 'ru'
                ? 'Прямые ссылки для покупки и сравнения цен (откроются в новой вкладке):'
                : 'Direct Booking & Price Comparison Links (opens in new tab):'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeTour.providerLinks.map((link, i) => {
              const styleClass =
                link.platform === 'Klook'
                  ? 'bg-[#FF5B00] hover:bg-[#E05000] text-white'
                  : link.platform === 'KKday'
                    ? 'bg-teal-700 hover:bg-teal-800 text-white'
                    : link.platform === 'FunPASS'
                      ? 'bg-indigo-700 hover:bg-indigo-800 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white';

              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors ${styleClass}`}
                >
                  <span>{lang === 'ru' ? link.labelRu : link.labelEn}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Key Logistics Grid: Days, Departure/Return Times, Duration, Meeting Point, Price Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50/90 border border-slate-200/70 rounded-xl p-3.5 text-xs">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">
                {lang === 'ru' ? 'Дни проведения:' : 'Operating Days:'}
              </div>
              <div className="text-slate-700 mt-0.5">
                {lang === 'ru' ? activeTour.daysOfWeekRu : activeTour.daysOfWeekEn}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">
                {lang === 'ru'
                  ? `Время выезда и возврата (${activeTour.totalDurationRu}):`
                  : `Departure & Return (${activeTour.totalDurationEn}):`}
              </div>
              <div className="text-slate-700 mt-0.5">
                <span className="font-semibold">
                  {lang === 'ru' ? 'Старт: ' : 'Start: '}
                </span>
                {lang === 'ru' ? activeTour.departureTimesRu : activeTour.departureTimesEn}
                <br />
                <span className="font-semibold">
                  {lang === 'ru' ? 'Возврат: ' : 'Return: '}
                </span>
                {lang === 'ru' ? activeTour.returnTimeRu : activeTour.returnTimeEn}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">
                {lang === 'ru' ? 'Место встречи / посадки:' : 'Meeting / Pick-up Point:'}
              </div>
              <div className="text-slate-700 mt-0.5">
                {lang === 'ru' ? activeTour.meetingPointRu : activeTour.meetingPointEn}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <DollarSign className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-slate-900">
                {lang === 'ru' ? 'Варианты пакетов и цен:' : 'Package Tiers & Pricing:'}
              </div>
              <div className="text-slate-700 mt-0.5">
                {lang === 'ru' ? activeTour.priceNoteRu : activeTour.priceNoteEn}
              </div>
            </div>
          </div>
        </div>

        {/* What's Included + Pro Tip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200/80 rounded-xl p-3.5">
            <div className="text-xs font-bold text-slate-900 mb-2">
              {lang === 'ru' ? 'Что включено в стоимость:' : 'What’s Included:'}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {(lang === 'ru' ? activeTour.includedRu : activeTour.includedEn).map(
                (item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 flex flex-col justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>
                  {lang === 'ru' ? 'Совет перед бронированием:' : 'Insider Booking Tip:'}
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {lang === 'ru' ? activeTour.proTipRu : activeTour.proTipEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Tour Path with Interactive Map Pin Buttons & Separate Klook Attraction Tickets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-display text-base font-bold text-slate-900">
            {lang === 'ru'
              ? `Маршрут тура по шагам (${activeTour.stops.length} точек на карте)`
              : `Step-by-Step Tour Path (${activeTour.stops.length} Map Stops)`}
          </h4>
          <span className="text-xs text-slate-500">
            {lang === 'ru'
              ? 'Нажмите на остановку, чтобы показать её на карте'
              : 'Tap any stop to highlight it on the map'}
          </span>
        </div>

        {activeTour.stops.map((stop) => {
          const place = placeMap.get(stop.placeId);
          if (!place) return null;
          const loc = getLocalizedPlaceText(place, lang);
          const imgUrl = getPlaceImageUrl(place.id);
          const highlight = lang === 'ru' ? stop.highlightRu : stop.highlightEn;
          const duration = lang === 'ru' ? stop.durationRu : stop.durationEn;

          return (
            <div
              key={`${activeTour.id}-stop-${stop.stopNumber}`}
              onClick={() => onSelectPlaceOnMap(place)}
              className="bg-white border border-slate-200/90 hover:border-amber-600/60 rounded-2xl p-3.5 sm:p-4 shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row items-start gap-3.5"
            >
              <div className="relative w-full sm:w-36 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={imgUrl}
                  alt={loc.displayName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white font-mono-num text-xs font-extrabold shadow-xs">
                  #{stop.stopNumber} · {stop.timeWindow}
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                    {lang === 'ru' ? `Стоянка: ${duration}` : `Stop Duration: ${duration}`} ·{' '}
                    {loc.districtLabel}
                  </span>
                  <span className="font-mono-num text-xs text-slate-500">
                    {place.distanceKm} {lang === 'ru' ? 'км от старта' : 'km from base'}
                  </span>
                </div>

                <h5 className="font-display text-base font-bold text-slate-900 leading-snug">
                  {loc.displayName}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    ({place.chineseName})
                  </span>
                </h5>

                <p className="text-xs text-slate-700 leading-relaxed">{highlight}</p>

                <div
                  className="pt-1.5 flex flex-wrap items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onSelectPlaceOnMap(place)}
                    className="min-h-[34px] px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'ru' ? 'Показать на карте' : 'Show on Map'}</span>
                  </button>

                  {stop.ticketUrl && (
                    <a
                      href={stop.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[34px] px-3 py-1 rounded-lg bg-[#FF5B00] hover:bg-[#E05000] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Ticket className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'ru'
                          ? stop.ticketLabelRu || 'Билет на Klook'
                          : stop.ticketLabelEn || 'Klook Ticket'}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenPlaceDetail(place)}
                    className="min-h-[34px] px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{lang === 'ru' ? 'Подробнее о месте' : 'Place Details'}</span>
                  </button>

                  <a
                    href={place.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[34px] px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3 text-teal-700" />
                    <span>Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
