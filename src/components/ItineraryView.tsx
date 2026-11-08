import React, { useState } from 'react';
import { CuratedItinerary } from '../data/placesData';
import {
  getLocalizedItineraries,
  getLocalizedPlaceText,
  getLocalizedUnverifiedNotes,
  Language,
  UI_STRINGS,
} from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  Calendar,
  ExternalLink,
  HelpCircle,
  MapPin,
  Navigation,
  Table,
} from 'lucide-react';

interface ItineraryViewProps {
  allPlaces: EnrichedPlaceItem[];
  activeItineraryId: string;
  onSelectItinerary: (id: string) => void;
  onSelectPlaceOnMap: (place: EnrichedPlaceItem) => void;
  onOpenPlaceDetail: (place: EnrichedPlaceItem) => void;
  lang: Language;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  allPlaces,
  activeItineraryId,
  onSelectItinerary,
  onSelectPlaceOnMap,
  onOpenPlaceDetail,
  lang,
}) => {
  const [showQuickTable, setShowQuickTable] = useState(false);

  const itineraries = getLocalizedItineraries(lang);
  const unverifiedNotes = getLocalizedUnverifiedNotes(lang);
  const t = UI_STRINGS[lang];

  const placeMap = new Map<string, EnrichedPlaceItem>(
    allPlaces.map((p) => [p.id, p])
  );

  const currentItinerary: CuratedItinerary =
    itineraries.find((it) => it.id === activeItineraryId) ?? itineraries[0];

  const sightsSummaryPlaces = allPlaces.filter((p) => p.macroCategory === 'sights');

  return (
    <div className="space-y-6">
      {/* Header & Day Selector Tabs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-amber-800">
              {lang === 'ru'
                ? 'Готовые маршруты по Тайбэю и Новому Тайбэю'
                : 'Curated Taipei & New Taipei Routes'}
            </p>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              {lang === 'ru'
                ? 'Идеи маршрутов на 1–4 дня'
                : 'Suggested 1-Day & Multi-Day Itineraries'}
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            {lang === 'ru'
              ? 'Выберите день — все остановки с номерами появятся на карте'
              : 'Selecting a day plots numbered stops & route lines on the map'}
          </span>
        </div>

        {/* Interactive Day Plan Selector Buttons */}
        <div
          className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"
          role="tablist"
          aria-label="Curated Day Itineraries"
        >
          {itineraries.map((itinerary, index) => {
            const isSelected = itinerary.id === currentItinerary.id;
            return (
              <button
                key={itinerary.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectItinerary(itinerary.id)}
                className={`min-h-[54px] text-left p-3.5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-slate-50/80 border-slate-200/90 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span
                    className={`font-mono-num font-semibold ${
                      isSelected ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    0{index + 1}. {itinerary.duration}
                  </span>
                  <span
                    className={`text-[11px] ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {itinerary.stops.length}{' '}
                    {lang === 'ru' ? 'остановок' : 'stops'}
                  </span>
                </div>
                <div className="font-bold text-sm mt-1 line-clamp-1">
                  {itinerary.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Itinerary Timeline with Stop Photographs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6">
        <div className="pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>{currentItinerary.duration}</span>
            <span aria-hidden="true">·</span>
            <span>
              {lang === 'ru' ? 'Кому подойдет:' : 'Best for:'}{' '}
              {currentItinerary.bestFor}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            {currentItinerary.title}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {currentItinerary.subtitle}
          </p>
        </div>

        <div className="mt-5 divide-y divide-slate-100">
          {currentItinerary.stops.map((stop, idx) => {
            const place = placeMap.get(stop.placeId);
            if (!place) return null;
            const loc = getLocalizedPlaceText(place, lang);

            return (
              <div
                key={stop.placeId}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <img
                  src={getPlaceImageUrl(place.id)}
                  alt={loc.displayName}
                  loading="lazy"
                  onClick={() => onSelectPlaceOnMap(place)}
                  className="w-full sm:w-32 h-36 sm:h-28 rounded-xl object-cover shrink-0 border border-slate-200/80 cursor-pointer"
                />

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-mono-num font-bold text-amber-800">
                      {lang === 'ru' ? `Точка 0${idx + 1}` : `Stop 0${idx + 1}`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700">
                      {stop.timeOfDay}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{loc.districtLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-num text-teal-800">
                      {place.distanceKm}{' '}
                      {lang === 'ru' ? 'км от старта' : 'km from Base'}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900">
                    {loc.displayName}{' '}
                    <span className="font-normal text-slate-600 text-sm">
                      ({place.chineseName})
                    </span>
                  </h4>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {stop.activityNote}
                  </p>

                  <p className="text-xs text-slate-500">
                    {t.mrtLabel} {loc.mrtStation}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectPlaceOnMap(place)}
                      className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>{t.pinOnMapBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenPlaceDetail(place)}
                      className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <span>{t.taxiCardBtn}</span>
                    </button>
                    <a
                      href={place.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors whitespace-nowrap"
                      aria-label={`Open ${place.name} in Google Maps`}
                    >
                      <span>{t.googleMapsBtn}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Summary Table of All 20+ Sights & Quick Map Links */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-4 h-4 text-amber-700" />
              <span>
                {lang === 'ru'
                  ? 'Сводная таблица — быстрые ссылки Google Карт'
                  : 'Summary Table — Quick Google Maps Links'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ru'
                ? 'Удобная таблица всех главных парков, районов и смотровых площадок в один клик'
                : 'Fast one-tap reference table for all Taipei & New Taipei landmarks, parks, and districts'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowQuickTable((prev) => !prev)}
            aria-expanded={showQuickTable}
            className="min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors whitespace-nowrap"
          >
            {showQuickTable
              ? lang === 'ru'
                ? 'Скрыть таблицу'
                : 'Hide Table'
              : lang === 'ru'
                ? 'Показать таблицу'
                : 'Expand Table'}
          </button>
        </div>

        {showQuickTable && (
          <div className="mt-4 overflow-x-auto border-t border-slate-100 pt-3">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 text-xs">
                  <th className="py-2.5 pr-3 font-semibold">
                    {lang === 'ru' ? 'Место' : 'Place'}
                  </th>
                  <th className="py-2.5 px-3 font-semibold">
                    {lang === 'ru' ? 'Район и метро' : 'District & MRT'}
                  </th>
                  <th className="py-2.5 px-3 font-semibold font-mono-num">
                    {lang === 'ru' ? 'Расстояние' : 'Distance'}
                  </th>
                  <th className="py-2.5 pl-3 font-semibold text-right">
                    {lang === 'ru' ? 'Карта' : 'Quick Link'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sightsSummaryPlaces.map((sight) => {
                  const loc = getLocalizedPlaceText(sight, lang);
                  return (
                    <tr key={sight.id} className="hover:bg-slate-50/80">
                      <td className="py-2.5 pr-3 font-medium text-slate-900">
                        <button
                          type="button"
                          onClick={() => onSelectPlaceOnMap(sight)}
                          className="text-left hover:text-amber-800 transition-colors flex items-center gap-2.5"
                        >
                          <img
                            src={getPlaceImageUrl(sight.id)}
                            alt={loc.displayName}
                            loading="lazy"
                            className="w-11 h-8 rounded-md object-cover shrink-0 border border-slate-200"
                          />
                          <span>
                            {loc.displayName}{' '}
                            <span className="text-slate-500 font-normal">
                              ({sight.chineseName})
                            </span>
                          </span>
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {loc.districtLabel} · {loc.mrtStation}
                      </td>
                      <td className="py-2.5 px-3 font-mono-num text-slate-700 whitespace-nowrap">
                        {sight.distanceKm} {lang === 'ru' ? 'км' : 'km'}
                      </td>
                      <td className="py-2.5 pl-3 text-right whitespace-nowrap">
                        <a
                          href={sight.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold"
                        >
                          <span>Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Items Needs Clarification / Transliteration Notes from Prompt */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {lang === 'ru'
                ? 'Заметки по редким или транслитерированным названиям из списка'
                : 'Notes on Unregistered / Transliterated Places from Your List'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === 'ru'
                ? 'Подсказки и поиск для 3 мест из заметок, у которых нет точного совпадения на английском:'
                : 'Helpful lookups for the 3 entries in your saved notes that didn’t match an exact English venue registration:'}
            </p>
          </div>
        </div>

        <div className="mt-3.5 divide-y divide-slate-100">
          {unverifiedNotes.map((item) => (
            <div
              key={item.name}
              className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">
                  {item.name}{' '}
                  <span className="font-normal text-slate-500">
                    · {item.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.suggestion}
                </p>
              </div>
              <a
                href={item.searchQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[38px] px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold inline-flex items-center gap-1 shrink-0 self-start sm:self-center transition-colors whitespace-nowrap"
              >
                <Navigation className="w-3 h-3 text-amber-700" />
                <span>{lang === 'ru' ? 'Найти рядом' : 'Search Nearby'}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
