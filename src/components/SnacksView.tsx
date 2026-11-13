import React, { useMemo, useState } from 'react';
import {
  filterMustTrySnacks,
  MUST_TRY_SNACKS,
  MustTrySnack,
  SNACK_CATEGORIES,
  SnackCategory,
} from '../data/snacksData';
import { getLocalizedPlaceText, Language } from '../data/translationsRu';
import { getPlaceImageUrl } from '../utils/placeImages';
import { EnrichedPlaceItem } from '../utils/placesLogic';
import {
  Check,
  ChevronRight,
  Copy,
  Gift,
  MapPin,
  Navigation,
  Sparkles,
  UtensilsCrossed,
  X,
} from 'lucide-react';

interface SnacksViewProps {
  allPlaces: EnrichedPlaceItem[];
  activeSnackId: string;
  onSelectSnack: (snack: MustTrySnack) => void;
  onSelectPlaceOnMap: (place: EnrichedPlaceItem) => void;
  onOpenPlaceDetail: (place: EnrichedPlaceItem) => void;
  lang: Language;
  externalSearchQuery?: string;
}

export const SnacksView: React.FC<SnacksViewProps> = ({
  allPlaces,
  activeSnackId,
  onSelectSnack,
  onSelectPlaceOnMap,
  onOpenPlaceDetail,
  lang,
  externalSearchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SnackCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [detailSnack, setDetailSnack] = useState<MustTrySnack | null>(null);

  const placeMap = useMemo(() => {
    const map = new Map<string, EnrichedPlaceItem>();
    allPlaces.forEach((p) => map.set(p.id, p));
    return map;
  }, [allPlaces]);

  const filteredSnacks = useMemo(
    () => filterMustTrySnacks(MUST_TRY_SNACKS, selectedCategory, externalSearchQuery),
    [selectedCategory, externalSearchQuery]
  );

  const handleCopyPhrase = (id: string, phrase: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(phrase).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <div className="space-y-2.5">
      {/* Compact Header + Category Pills */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-3.5 shadow-xs space-y-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
            <UtensilsCrossed className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-sm sm:text-base font-bold text-slate-900 truncate">
              {lang === 'ru'
                ? 'Что попробовать: Бабл-ти, Нуга-крекеры и Хиты еды'
                : 'Must-Try Snacks: Bubble Tea, Nougat Crackers & Classics'}
            </h2>
            <p className="text-[11px] text-slate-500 truncate">
              {lang === 'ru'
                ? 'Нажмите на любую строку, чтобы открыть описание, фразу заказа и точки на карте'
                : 'Tap any row to pop up full details, Chinese order card & map locations'}
            </p>
          </div>
        </div>

        {/* Horizontal Thumb-Scroll Category Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5"
          role="group"
          aria-label={
            lang === 'ru'
              ? 'Фильтр по категориям еды и снэков'
              : 'Filter must-try snacks by category'
          }
        >
          {SNACK_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const nextList = filterMustTrySnacks(
                    MUST_TRY_SNACKS,
                    cat.id,
                    externalSearchQuery
                  );
                  if (nextList.length > 0) {
                    onSelectSnack(nextList[0]);
                  }
                }}
                aria-pressed={isActive}
                className={`min-h-[32px] px-2.5 py-1 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lang === 'ru' ? cat.labelRu : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact Scrollable Snack Rows */}
      <div className="space-y-2">
        {filteredSnacks.map((snack, index) => {
          const isSelected = snack.id === activeSnackId;
          const title = lang === 'ru' ? snack.titleRu : snack.titleEn;
          const badge = lang === 'ru' ? snack.badgeRu : snack.badgeEn;
          const description =
            lang === 'ru' ? snack.descriptionRu : snack.descriptionEn;
          const imgUrl = getPlaceImageUrl(snack.imagePlaceId);

          return (
            <article
              key={snack.id}
              onClick={() => {
                onSelectSnack(snack);
                setDetailSnack(snack);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectSnack(snack);
                  setDetailSnack(snack);
                }
              }}
              className={`group bg-white rounded-2xl border transition-all p-2.5 sm:p-3 flex items-center gap-3 cursor-pointer select-none ${
                isSelected
                  ? 'border-amber-600 ring-2 ring-amber-500/20 bg-amber-50/20 shadow-sm'
                  : 'border-slate-200/90 hover:border-amber-500/60 hover:bg-slate-50/60 shadow-2xs'
              }`}
            >
              {/* Left Compact Thumbnail */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/60">
                <img
                  src={imgUrl}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-extrabold shadow-xs">
                  {snack.emoji} #{index + 1}
                </div>
                {snack.isTopSouvenir && (
                  <div className="absolute bottom-1 left-1 right-1 px-1 py-0.5 rounded bg-amber-500/95 text-slate-950 text-[9px] font-extrabold inline-flex items-center justify-center gap-0.5 shadow-xs">
                    <Gift className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">
                      {lang === 'ru' ? 'Сувенир' : 'Souvenir'}
                    </span>
                  </div>
                )}
              </div>

              {/* Center Compact Info */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-amber-800 truncate">
                    {badge}
                  </span>
                  <span className="font-mono-num text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded whitespace-nowrap shrink-0">
                    {snack.priceRangeTwd}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5 min-w-0">
                  <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors truncate">
                    {title}
                  </h3>
                  <span className="text-xs font-bold text-slate-600 shrink-0">
                    {snack.chineseName}
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-1 leading-relaxed">
                  {description}
                </p>

                <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
                  <span className="truncate">
                    📍 {snack.placeIds.length}{' '}
                    {lang === 'ru' ? 'лучших мест на карте' : 'best spots on map'}
                  </span>
                  <span className="text-amber-700 font-semibold shrink-0">
                    {lang === 'ru' ? 'Заказ и детали →' : 'Order & Details →'}
                  </span>
                </div>
              </div>

              <ChevronRight
                className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all shrink-0"
                aria-hidden="true"
              />
            </article>
          );
        })}
      </div>

      {/* Pop-Up Detail Modal when User Presses a Snack Row */}
      {detailSnack && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label={
            lang === 'ru' ? detailSnack.titleRu : detailSnack.titleEn
          }
          onClick={() => setDetailSnack(null)}
        >
          <div
            className="bg-[#F8F7F4] text-slate-900 rounded-t-3xl sm:rounded-3xl max-w-xl w-full max-h-[88vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Image Header */}
            <div className="relative h-48 sm:h-56 w-full shrink-0 bg-slate-900 overflow-hidden">
              <img
                src={getPlaceImageUrl(detailSnack.imagePlaceId)}
                alt={lang === 'ru' ? detailSnack.titleRu : detailSnack.titleEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <button
                type="button"
                onClick={() => setDetailSnack(null)}
                aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                className="absolute top-3.5 right-3.5 min-h-[40px] min-w-[40px] rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3.5 left-5 right-5 text-white">
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold">
                    {detailSnack.emoji}{' '}
                    {lang === 'ru' ? detailSnack.badgeRu : detailSnack.badgeEn}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/30 text-emerald-200 font-mono-num font-bold">
                    {detailSnack.priceRangeTwd}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-white mt-1 leading-snug">
                  {lang === 'ru' ? detailSnack.titleRu : detailSnack.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200 font-semibold mt-0.5">
                  {detailSnack.chineseName} ({detailSnack.pinyin})
                </p>
              </div>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              {/* Point-and-Order Chinese Box for Vendor */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    {lang === 'ru'
                      ? 'Покажите экран продавцу для заказа (中文):'
                      : 'Show Screen to Vendor to Order (中文):'}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyPhrase(
                        detailSnack.id,
                        detailSnack.orderPhraseChinese
                      )
                    }
                    className="min-h-[34px] px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold inline-flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedId === detailSnack.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{lang === 'ru' ? 'Копировать' : 'Copy 中文'}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-wide text-white leading-snug">
                  {detailSnack.orderPhraseChinese}
                </div>
                <div className="text-xs text-slate-300">
                  {lang === 'ru'
                    ? detailSnack.orderPhraseMeaningRu
                    : detailSnack.orderPhraseMeaningEn}
                </div>
              </div>

              {/* Full Description */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <p className="text-sm text-slate-800 leading-relaxed">
                  {lang === 'ru'
                    ? detailSnack.descriptionRu
                    : detailSnack.descriptionEn}
                </p>

                <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>
                      {lang === 'ru'
                        ? 'Как заказывать и есть:'
                        : 'Ordering & Eating Tip:'}
                    </span>
                  </div>
                  <p className="text-amber-900 leading-relaxed">
                    {lang === 'ru'
                      ? detailSnack.howToOrderRu
                      : detailSnack.howToOrderEn}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 mb-1">
                    {lang === 'ru'
                      ? 'Лучшие бренды и лавки в Тайбэе:'
                      : 'Top Taipei Brands & Stalls:'}
                  </div>
                  <ul className="space-y-1">
                    {(lang === 'ru'
                      ? detailSnack.bestBrandsOrStallsRu
                      : detailSnack.bestBrandsOrStallsEn
                    ).map((stall, idx) => (
                      <li key={idx}>• {stall}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mapped Shops where to buy/try */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {lang === 'ru'
                    ? 'Где попробовать на карте (от ближайшего):'
                    : 'Where to Try / Buy on Map (sorted by distance):'}
                </h4>
                <div className="divide-y divide-slate-200/70 bg-white border border-slate-200/90 rounded-2xl overflow-hidden">
                  {detailSnack.placeIds
                    .map((id) => placeMap.get(id))
                    .filter((p): p is EnrichedPlaceItem => Boolean(p))
                    .sort((a, b) => a.distanceKm - b.distanceKm)
                    .map((place, stopIdx) => {
                      const loc = getLocalizedPlaceText(place, lang);
                      return (
                        <div
                          key={place.id}
                          className="p-3 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSnack(detailSnack);
                              onSelectPlaceOnMap(place);
                              setDetailSnack(null);
                            }}
                            className="text-left flex-1 min-w-0 flex items-center gap-2.5"
                          >
                            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono-num text-[11px] font-bold shrink-0">
                              #{stopIdx + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                {loc.displayName} ({place.chineseName})
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {loc.districtLabel} · {place.distanceKm}{' '}
                                {lang === 'ru' ? 'км' : 'km'} ·{' '}
                                {place.travelEstimate}
                              </div>
                            </div>
                          </button>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setDetailSnack(null);
                                onOpenPlaceDetail(place);
                              }}
                              className="min-h-[34px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                            >
                              {lang === 'ru' ? 'О месте' : 'Place Info'}
                            </button>
                            <a
                              href={place.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Google Maps: ${loc.displayName}`}
                              className="min-h-[34px] min-w-[34px] px-2 py-1 rounded-lg bg-slate-900 text-white text-xs font-semibold inline-flex items-center justify-center"
                            >
                              <Navigation className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white border-t border-slate-200 px-4 sm:px-5 py-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  onSelectSnack(detailSnack);
                  setDetailSnack(null);
                }}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>
                  {lang === 'ru' ? 'Показать все точки на карте' : 'Show Spots on Map'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setDetailSnack(null)}
                className="min-h-[42px] px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                {lang === 'ru' ? 'Закрыть' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
