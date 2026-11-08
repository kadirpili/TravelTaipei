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
  ChevronDown,
  ChevronUp,
  Copy,
  Gift,
  MapPin,
  Maximize2,
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
  const [expandedTipsIds, setExpandedTipsIds] = useState<Record<string, boolean>>({});
  const [vendorModalSnack, setVendorModalSnack] = useState<MustTrySnack | null>(null);

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

  const toggleTips = (id: string) => {
    setExpandedTipsIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-2.5 sm:space-y-4">
      {/* Compact Mobile-First Header + Horizontal Thumb-Scroll Category Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display text-sm sm:text-lg font-bold text-slate-900 truncate">
                {lang === 'ru'
                  ? 'Что попробовать: Бабл-ти, Нуга-крекеры и Хиты'
                  : 'Must-Try Snacks: Bubble Tea, Nougat Crackers & Classics'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                {lang === 'ru'
                  ? 'Нажмите на карточку для точек на карте или «Крупно продавцу» для заказа'
                  : 'Tap any card to map its best Taipei shops or show the Chinese order card'}
              </p>
            </div>
          </div>
        </div>

        {/* Horizontal Thumb-Scroll Category Pills */}
        <div
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 -mx-1 px-1"
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
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
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

      {/* Must-Try Cards List (Optimized for 1-handed mobile scanning & tapping) */}
      <div className="space-y-2.5 sm:space-y-3.5">
        {filteredSnacks.map((snack, index) => {
          const isSelected = snack.id === activeSnackId;
          const isTipsOpen = Boolean(expandedTipsIds[snack.id]);
          const title = lang === 'ru' ? snack.titleRu : snack.titleEn;
          const badge = lang === 'ru' ? snack.badgeRu : snack.badgeEn;
          const description =
            lang === 'ru' ? snack.descriptionRu : snack.descriptionEn;
          const howToOrder =
            lang === 'ru' ? snack.howToOrderRu : snack.howToOrderEn;
          const phraseMeaning =
            lang === 'ru'
              ? snack.orderPhraseMeaningRu
              : snack.orderPhraseMeaningEn;
          const bestStalls =
            lang === 'ru'
              ? snack.bestBrandsOrStallsRu
              : snack.bestBrandsOrStallsEn;
          const imgUrl = getPlaceImageUrl(snack.imagePlaceId);

          const mappedPlaces = snack.placeIds
            .map((id) => placeMap.get(id))
            .filter((p): p is EnrichedPlaceItem => Boolean(p))
            .sort((a, b) => a.distanceKm - b.distanceKm);

          return (
            <article
              key={snack.id}
              onClick={() => onSelectSnack(snack)}
              className={`bg-white rounded-2xl border transition-all p-3 sm:p-4 cursor-pointer space-y-2.5 ${
                isSelected
                  ? 'border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
                  : 'border-slate-200/90 hover:border-amber-500/60 shadow-xs'
              }`}
            >
              {/* Mobile-First Top Row: Compact Thumbnail on Left + Title, Chinese Name & Price on Right */}
              <div className="flex items-start gap-3">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200/60">
                  <img
                    src={imgUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] sm:text-xs font-extrabold shadow-xs">
                    {snack.emoji} #{index + 1}
                  </div>
                  {snack.isTopSouvenir && (
                    <div className="absolute bottom-1 left-1 right-1 px-1 py-0.5 rounded bg-amber-500/95 text-slate-950 text-[9px] sm:text-[10px] font-extrabold inline-flex items-center justify-center gap-0.5 shadow-xs">
                      <Gift className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">
                        {lang === 'ru' ? 'Сувенир' : 'Souvenir'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-[11px] font-semibold text-amber-800 truncate">
                      {badge}
                    </span>
                    <span className="font-mono-num text-[11px] sm:text-xs font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {snack.priceRangeTwd}
                    </span>
                  </div>

                  <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-bold text-slate-900 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded text-xs">
                      {snack.chineseName}
                    </span>
                    <span className="text-[11px] text-slate-500 italic truncate">
                      {snack.pinyin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Concise Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {description}
              </p>

              {/* Point-and-Order Chinese Box with Fullscreen Vendor Card Button & 1-Tap Copy */}
              <div
                className="bg-slate-900 text-white rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
                    {lang === 'ru'
                      ? 'Фраза для заказа продавцу (中文):'
                      : 'Show Vendor to Order (中文):'}
                  </div>
                  <div className="text-sm sm:text-base font-bold tracking-wide text-white mt-0.5">
                    {snack.orderPhraseChinese}
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {phraseMeaning}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setVendorModalSnack(snack)}
                    className="min-h-[40px] flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>
                      {lang === 'ru' ? 'Крупно продавцу' : 'Show Big'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyPhrase(snack.id, snack.orderPhraseChinese)
                    }
                    className="min-h-[40px] flex-1 sm:flex-initial px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                  >
                    {copiedId === snack.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 shrink-0" />
                        <span>{lang === 'ru' ? 'Копировать' : 'Copy 中文'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mapped Taipei Shops (1-Tap Map Highlight + Info + Google Maps) */}
              <div
                className="space-y-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>
                      {lang === 'ru'
                        ? 'Где купить / попробовать на карте:'
                        : 'Where to Try / Buy on Map:'}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleTips(snack.id)}
                    aria-expanded={isTipsOpen}
                    className="text-amber-800 hover:text-amber-950 font-semibold inline-flex items-center gap-0.5 py-0.5 px-1.5 rounded-md bg-amber-50"
                  >
                    <Sparkles className="w-3 h-3 shrink-0" />
                    <span>
                      {lang === 'ru' ? 'Советы и бренды' : 'Tips & Brands'}
                    </span>
                    {isTipsOpen ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {/* Collapsible Tips & Best Brands Box (Saves vertical space on mobile) */}
                {isTipsOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pb-1">
                    <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 text-xs text-amber-950">
                      <div className="font-bold mb-0.5">
                        {lang === 'ru'
                          ? 'Как заказывать и есть:'
                          : 'Ordering & Eating Tip:'}
                      </div>
                      <p className="text-amber-900 leading-relaxed">
                        {howToOrder}
                      </p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700">
                      <div className="font-bold text-slate-900 mb-0.5">
                        {lang === 'ru'
                          ? 'Лучшие бренды в Тайбэе:'
                          : 'Top Taipei Brands:'}
                      </div>
                      <ul className="space-y-0.5">
                        {bestStalls.map((stall, idx) => (
                          <li key={idx}>• {stall}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {mappedPlaces.map((place, stopIdx) => {
                    const loc = getLocalizedPlaceText(place, lang);
                    return (
                      <div
                        key={place.id}
                        className="bg-slate-50 hover:bg-amber-50/60 border border-slate-200/90 rounded-xl p-2 flex items-center justify-between gap-2 transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSnack(snack);
                            onSelectPlaceOnMap(place);
                          }}
                          className="text-left flex-1 min-w-0 py-0.5 focus:outline-none"
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-mono-num text-[10px] font-bold shrink-0">
                              #{stopIdx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {loc.displayName}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {loc.districtLabel} · {place.distanceKm}{' '}
                            {lang === 'ru' ? 'км' : 'km'} · {place.travelEstimate}
                          </div>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSnack(snack);
                              onSelectPlaceOnMap(place);
                            }}
                            title={
                              lang === 'ru' ? 'Показать на карте' : 'Show on Map'
                            }
                            className="min-h-[38px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                          >
                            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{lang === 'ru' ? 'Карта' : 'Map'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenPlaceDetail(place)}
                            className="min-h-[38px] px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                          >
                            {lang === 'ru' ? 'Инфо' : 'Info'}
                          </button>
                          <a
                            href={place.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Google Maps: ${loc.displayName}`}
                            className="min-h-[38px] min-w-[36px] px-2 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-teal-700 text-xs font-semibold inline-flex items-center justify-center"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Fullscreen Mobile Vendor Order Card Modal (For showing directly to shopkeepers in Taipei) */}
      {vendorModalSnack && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={
            lang === 'ru'
              ? 'Карточка заказа для продавца'
              : 'Fullscreen Vendor Order Card'
          }
          onClick={() => setVendorModalSnack(null)}
        >
          <div
            className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{vendorModalSnack.emoji}</span>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    {lang === 'ru'
                      ? 'Покажите экран продавцу'
                      : 'Show Screen to Vendor'}
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    {lang === 'ru'
                      ? vendorModalSnack.titleRu
                      : vendorModalSnack.titleEn}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setVendorModalSnack(null)}
                aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}
                className="min-h-[44px] min-w-[44px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 text-center space-y-3">
              <div className="text-xs text-amber-300 font-semibold">
                你好！我想點 / 請問有：
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-wide text-white">
                {vendorModalSnack.orderPhraseChinese}
              </div>
              <div className="pt-2 border-t border-white/15 text-sm text-amber-200 font-bold">
                {vendorModalSnack.chineseName}
              </div>
            </div>

            <div className="text-xs text-slate-600 text-center">
              {lang === 'ru'
                ? vendorModalSnack.orderPhraseMeaningRu
                : vendorModalSnack.orderPhraseMeaningEn}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() =>
                  handleCopyPhrase(
                    vendorModalSnack.id,
                    vendorModalSnack.orderPhraseChinese
                  )
                }
                className="flex-1 min-h-[48px] px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-extrabold inline-flex items-center justify-center gap-2 transition-colors"
              >
                {copiedId === vendorModalSnack.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>
                      {lang === 'ru'
                        ? 'Скопировать китайский текст'
                        : 'Copy Chinese Text'}
                    </span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setVendorModalSnack(null)}
                className="min-h-[48px] px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors"
              >
                {lang === 'ru' ? 'Готово' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
