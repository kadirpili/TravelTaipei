import {
  BaseLocation,
  CURATED_ITINERARIES,
  CuratedItinerary,
  PlaceItem,
  SubCategory,
  UNVERIFIED_NOTES,
  UnverifiedNote,
} from './placesData';

export type Language = 'ru' | 'en';

export interface PlaceTranslationRu {
  nameRu: string;
  overviewRu: string;
  insiderTipRu?: string;
  mrtStationRu?: string;
  recommendedDurationRu?: string;
  tagsRu: string[];
}

export const SUBCATEGORY_RU: Record<SubCategory, string> = {
  'Neighborhoods & Districts': 'Районы и кварталы',
  'Parks & Nature': 'Парки и природа',
  'Views, Landmarks & Wildlife': 'Виды, башня 101 и зоопарк',
  'Waterfront & Heritage': 'Набережная и история',
  'Cultural & Universities': 'Культура и университеты',
  'Hot Pot & Shabu': 'Хого (Hot Pot) и сябу-сябу',
  Korean: 'Корейская кухня',
  'Izakaya & Yakiniku': 'Изакая и японское барбекю',
  'Taiwanese & Dumplings': 'Тайваньская кухня и пельмени',
  'Japanese & Teppanyaki': 'Японская кухня и теппаньяки',
  'Indian, Thai & Vietnamese': 'Индийская, тайская и вьетнамская',
  'Mediterranean & Middle Eastern': 'Средиземноморская и Ближний Восток',
  'Mexican, Burgers & Pizza': 'Мексиканская, бургеры и пицца',
  'Brunch, Vegan & European': 'Бранчи, веган и европейская',
  'Buffet & Hotel Dining': 'Буфеты и рестораны при отелях',
  'Tea Houses & Desserts': 'Чайные дома и десерты',
  'Cafés & Specialty Coffee': 'Кофейни и десерты',
};

export const DISTRICT_RU: Record<string, string> = {
  Xinyi: 'Синьи (Xinyi)',
  "Da'an": 'Даань (Da’an)',
  Songshan: 'Суншань (Songshan)',
  Zhongzheng: 'Чжунчжэн (Центр)',
  Banqiao: 'Баньцяо (Banqiao)',
  Zhongshan: 'Чжуншань (Zhongshan)',
  Shilin: 'Шилинь (Shilin)',
  Wanhua: 'Ваньхуа (Симыньдин)',
  Wenshan: 'Вэньшань (Зоопарк/Маокун)',
  Xinzhuang: 'Синьчжуан (Xinzhuang)',
  Ruifang: 'Жуйфан (Цзюфэнь)',
  Xindian: 'Синьдянь (Озеро Битань)',
  'Beitou / Shilin': 'Бэйтоу / Янминшань',
  Beitou: 'Бэйтоу (Beitou)',
  Neihu: 'Нэйху (Neihu)',
  Tamsui: 'Даньшуй (Tamsui)',
  Datong: 'Датун (Дадаочэн / Дихуа)',
  Wanli: 'Ваньли (Геопарк Йелю)',
  Zhonghe: 'Чжунхэ (Zhonghe)',
  Pingxi: 'Пинси (Шифэнь)',
  Shiding: 'Шидин (Озеро Тысячи Островов)',
  Wulai: 'Улай (Водопад и источники)',
  'Taichung (Houli)': 'Тайчжун (Хоули / Lihpao)',
};

export const CITY_RU: Record<'Taipei' | 'New Taipei' | 'Taichung', string> = {
  Taipei: 'Тайбэй',
  'New Taipei': 'Новый Тайбэй',
  Taichung: 'Тайчжун',
};

export const BASE_LOCATION_RU: Record<string, { nameRu: string; districtRu: string }> = {
  'xinyi-brownies-stay': {
    nameRu: '🏠 Где я живу — Синьи (у Brownies, Yixian Rd)',
    districtRu: 'Синьи',
  },
  'brownies-xinyi': {
    nameRu: '🍫 Ресторан Brownies (Синьи, Yixian Rd)',
    districtRu: 'Синьи',
  },
  'tpkd-office': {
    nameRu: '🏢 Мой офис — Google TPKD (Баньцяо Tpark)',
    districtRu: 'Баньцяо',
  },
  'taipei-main': {
    nameRu: 'Главный вокзал Тайбэя / Q Square',
    districtRu: 'Чжунчжэн',
  },
  ximending: {
    nameRu: 'Метро Симыньдин (Выход 6)',
    districtRu: 'Ваньхуа',
  },
  'xinyi-101': {
    nameRu: 'Синьи / Метро Тайбэй 101',
    districtRu: 'Синьи',
  },
  'daan-zhongxiao': {
    nameRu: 'Даань / Чжунсяо Дуньхуа',
    districtRu: 'Даань',
  },
  banqiao: {
    nameRu: 'Вокзал Баньцяо (Новый Тайбэй)',
    districtRu: 'Баньцяо',
  },
};

export const UI_STRINGS = {
  ru: {
    brandTitle: 'Гид по Тайбэю',
    navAll: 'Все места',
    navSights: 'Прогулки и парки',
    navDining: 'Рестораны',
    navTeaBars: 'Чай, кофе и десерты',
    navItineraries: 'Маршруты',
    navTours: 'Туры Klook',
    navSnacks: 'Что попробовать (Снэки и Боба)',
    navEvents: '🎉 События (22 дек–7 янв)',
    savedTripBtn: (count: number) => `Избранное (${count})`,
    viewingSavedBtn: (count: number) => `Избранное (${count}) ✓`,
    searchPlaceholder: (count: number) =>
      `Поиск по ${count} местам: Симыньдин, Хого, пельмени, парк, 鼎泰豐...`,
    clearSearch: 'Очистить поиск',
    fromBaseLabel: 'Откуда:',
    sortFeatured: 'Сначала главные хиты',
    sortNearest: 'Ближе всего ко мне',
    sortName: 'По алфавиту (А–Я)',
    layoutSplit: 'Карта + Список',
    layoutList: 'Список',
    layoutMap: 'Карта',
    allCategoriesBtn: (count: number) => `Все категории (${count})`,
    districtLabel: 'Район:',
    allAreasBtn: 'Все районы',
    resetFiltersBtn: 'Сбросить фильтры',
    showingCount: (count: number) => `Найдено мест: ${count}`,
    inSavedTripSuffix: ' в вашем списке Избранного',
    distancesFromLabel: 'Расстояние от:',
    emptyTitle: 'По выбранным фильтрам ничего не найдено',
    emptySubtitle:
      'Попробуйте очистить поиск или нажать «Сбросить фильтры», чтобы снова увидеть все места Тайбэя.',
    resetAllBtn: 'Показать все места',
    mobileNavAll: (count: number) => `Все (${count})`,
    mobileNavSights: 'Места',
    mobileNavDining: 'Еда',
    mobileNavTea: 'Чай/Кофе',
    mobileNavPlans: 'Маршруты',
    mobileNavTours: 'Туры',
    mobileNavSnacks: 'Хиты еды',
    mobileNavEvents: 'События',
    // Map labels
    pinsCount: (count: number) => `${count} точек`,
    legendSights: 'Места',
    legendDining: 'Еда',
    legendTea: 'Чай/Кофе',
    fitAllBtn: 'Весь Тайбэй',
    baseBtn: 'Моя точка',
    taxiCardBtn: 'Карточка для такси',
    routeBtn: 'Маршрут',
    googleMapsBtn: 'Открыть Карту',
    pinOnMapBtn: 'На карте',
    copyChineseBtn: 'Копировать 中文',
    copiedBtn: 'Скопировано!',
    localNoteLabel: 'Совет:',
    mrtLabel: 'Метро / Как добраться:',
    freePrice: 'Бесплатно',
    // Detail Sheet
    closeModalAria: 'Закрыть окно',
    showToDriverLabel: 'Покажите таксисту или прохожим (華語名稱)',
    copyPhraseBtn: 'Скопировать для такси',
    copiedPhraseBtn: 'Скопировано!',
    suggestedStayLabel: 'Время на осмотр:',
    travelerTipLabel: 'Полезный совет:',
    distanceFromBaseTitle: (baseName: string) => `Расстояние от точки «${baseName}»`,
    centerOnMapBtn: 'Показать на карте',
    closestPairingsTitle: (placeName: string) => `Что посмотреть и где поесть рядом (${placeName})`,
    kmAwaySuffix: 'км отсюда',
    saveBtn: 'В избранное',
    savedBtn: 'В избранном ✓',
    // Offline Bar
    offlineActiveTitle: 'Офлайн-режим',
    offlineActiveDesc: (total: number, saved: number) =>
      ` — Доступны все ${total} мест Тайбэя и ${saved} избранных точек без интернета.`,
    browseSavedOfflineBtn: (saved: number) => `Мои сохранённые места (${saved})`,
    showingSavedOfflineBtn: (saved: number) => `Показаны сохранённые (${saved}) ✓`,
    offlineReadyStatus: 'Работает без интернета',
    offlineCacheActiveStatus: 'Используется офлайн-кэш',
    cachedSummary: (total: number, saved: number) =>
      `${total} мест и ${saved} избранных сохранены в памяти телефона`,
    swActiveBadge: 'Офлайн-защита включена',
    cacheOfflinePackBtn: 'Скачать офлайн-пакет',
    cachingBtn: 'Сохранение...',
    offlinePackCachedBtn: 'Офлайн-пакет обновлён ✓',
    installAppBtn: 'Установить приложение',
    installIOSBtn: 'Установить на iPhone',
    iosInstallTitle: 'Установка на iPhone / iPad',
    iosInstallSteps:
      '1. Нажмите кнопку «Поделиться» (Share) в нижней панели Safari.\n2. Выберите «На экран „Домой“» (Add to Home Screen), чтобы пользоваться картой без интернета в горах.',
    gotItBtn: 'Понятно',
    // Quick Filter Pills for super easy phone usage
    quickFiltersTitle: 'Быстрый выбор в одно касание:',
    qfAll: '🌏 Все места',
    qfMyHubs: '🏠 Дом и Офис TPKD',
    qfSaved: '⭐ Избранное',
    qfSights: '🏞️ Парки и виды',
    qfHotpot: '🍲 Хого (Hot Pot)',
    qfDumplings: '🥟 Пельмени и Тайвань',
    qfIzakaya: '🥩 Изакая и Вагю',
    qfKorean: '🇰🇷 Корейская',
    qfTeaCafe: '🍵 Чай и Кофе',
    // Quick-Expand Card Summary
    quickExpandBtn: 'Краткая сводка',
    quickCollapseBtn: 'Свернуть сводку',
    quickSummaryTitle: 'Краткая сводка по месту',
    quickTimeLabel: 'Время на визит:',
    quickNearbyLabel: 'Рядом с этим местом:',
    quickFullSheetBtn: 'Открыть полную карточку',
  },
  en: {
    brandTitle: 'Taipei Wayfinder',
    navAll: 'All Places',
    navSights: 'Sights & Parks',
    navDining: 'Restaurants',
    navTeaBars: 'Tea & Cafés',
    navItineraries: 'Itineraries',
    navTours: 'Tours (Klook)',
    navSnacks: 'Must-Try Snacks',
    navEvents: '🎉 Events (Dec 22–Jan 7)',
    savedTripBtn: (count: number) => `Saved Trip (${count})`,
    viewingSavedBtn: (count: number) => `Viewing Saved (${count})`,
    searchPlaceholder: (count: number) =>
      `Search ${count} places: e.g. Ximending, Haidilao, 鼎泰豐, Xinyi, Vegan...`,
    clearSearch: 'Clear search query',
    fromBaseLabel: 'From:',
    sortFeatured: 'Sort: Featured First',
    sortNearest: 'Sort: Nearest to Base',
    sortName: 'Sort: A–Z Name',
    layoutSplit: 'Split',
    layoutList: 'List',
    layoutMap: 'Map',
    allCategoriesBtn: (count: number) => `All Categories (${count})`,
    districtLabel: 'District:',
    allAreasBtn: 'All Areas',
    resetFiltersBtn: 'Reset Filters',
    showingCount: (count: number) => `Showing ${count} ${count === 1 ? 'place' : 'places'}`,
    inSavedTripSuffix: ' in your Saved Trip',
    distancesFromLabel: 'Distances from',
    emptyTitle: 'No places match your current filters',
    emptySubtitle:
      'Try clearing your search query or clicking Reset Filters to explore all Taipei & New Taipei spots.',
    resetAllBtn: 'Reset All Filters',
    mobileNavAll: (count: number) => `All (${count})`,
    mobileNavSights: 'Sights',
    mobileNavDining: 'Dining',
    mobileNavTea: 'Tea/Cafés',
    mobileNavPlans: 'Day Plans',
    mobileNavTours: 'Tours',
    mobileNavSnacks: 'Snacks',
    mobileNavEvents: 'Events',
    // Map labels
    pinsCount: (count: number) => `${count} ${count === 1 ? 'Pin' : 'Pins'}`,
    legendSights: 'Sights',
    legendDining: 'Dining',
    legendTea: 'Tea/Café',
    fitAllBtn: 'Fit All',
    baseBtn: 'Base',
    taxiCardBtn: 'Taxi Card & Info',
    routeBtn: 'Route',
    googleMapsBtn: 'Google Maps',
    pinOnMapBtn: 'Pin on Map',
    copyChineseBtn: 'Copy 中文',
    copiedBtn: 'Copied',
    localNoteLabel: 'Local Note:',
    mrtLabel: 'MRT:',
    freePrice: 'Free',
    // Detail Sheet
    closeModalAria: 'Close place details',
    showToDriverLabel: 'Show to Taxi Driver or Local Staff (華語名稱)',
    copyPhraseBtn: 'Copy Phrase',
    copiedPhraseBtn: 'Copied',
    suggestedStayLabel: 'Suggested Stay:',
    travelerTipLabel: 'Traveler Tip:',
    distanceFromBaseTitle: (baseName: string) => `Distance from Base (${baseName})`,
    centerOnMapBtn: 'Center on Map',
    closestPairingsTitle: (placeName: string) => `Closest Spots to Pair With ${placeName}`,
    kmAwaySuffix: 'km away',
    saveBtn: 'Save',
    savedBtn: 'Saved',
    // Offline Bar
    offlineActiveTitle: 'Offline Mode Active',
    offlineActiveDesc: (total: number, saved: number) =>
      ` — Browsing ${total} cached Taipei places & ${saved} saved spots without internet.`,
    browseSavedOfflineBtn: (saved: number) => `Browse Saved Spots (${saved})`,
    showingSavedOfflineBtn: (saved: number) => `Showing Saved Spots (${saved})`,
    offlineReadyStatus: 'Offline Ready',
    offlineCacheActiveStatus: 'Offline Cache Active',
    cachedSummary: (total: number, saved: number) =>
      `${total} places & ${saved} saved spots cached locally`,
    swActiveBadge: 'Service Worker Active',
    cacheOfflinePackBtn: 'Cache Offline Pack',
    cachingBtn: 'Caching...',
    offlinePackCachedBtn: 'Offline Pack Cached',
    installAppBtn: 'Install App',
    installIOSBtn: 'Install on iOS',
    iosInstallTitle: 'Install Taipei Wayfinder on iOS',
    iosInstallSteps:
      '1. Tap the Share icon in your Safari toolbar.\n2. Scroll down and tap Add to Home Screen to use Taipei Wayfinder offline on mountain trails.',
    gotItBtn: 'Got It',
    quickFiltersTitle: 'One-Tap Quick Filters:',
    qfAll: '🌏 All Places',
    qfMyHubs: '🏠 My Stay & TPKD',
    qfSaved: '⭐ Saved Spots',
    qfSights: '🏞️ Parks & Views',
    qfHotpot: '🍲 Hot Pot',
    qfDumplings: '🥟 Dumplings & Taiwanese',
    qfIzakaya: '🥩 Izakaya & Wagyu',
    qfKorean: '🇰🇷 Korean',
    qfTeaCafe: '🍵 Tea & Cafés',
    // Quick-Expand Card Summary
    quickExpandBtn: 'Quick Summary',
    quickCollapseBtn: 'Hide Summary',
    quickSummaryTitle: 'Place Summary',
    quickTimeLabel: 'Suggested Time:',
    quickNearbyLabel: 'Nearby Spots to Pair:',
    quickFullSheetBtn: 'Open Full Sheet',
  },
};

export const PLACE_TRANSLATIONS_RU: Record<string, PlaceTranslationRu> = {
  // 0. MY KEY HUBS: STAY IN XINYI, BROWNIES & TPKD OFFICE
  'my-stay-xinyi-brownies': {
    nameRu: '🏠 Где я живу — Синьи (рядом с рестораном Brownies, Yixian Rd)',
    overviewRu:
      'Ваша точка проживания в районе Синьи на тихой зеленой улице Yixian Road (переулок 42), в двух шагах от ресторана Brownies, Мемориала Сунь Ятсена, парка Суншань и станции метро Taipei City Hall.',
    insiderTipRu:
      'Прямая поездка по синей ветке метро (Bannan Line) от станции Taipei City Hall или Sun Yat-Sen Memorial Hall прямо до станции Far Eastern Hospital к офису Google TPKD занимает ~26 минут.',
    mrtStationRu: 'Метро Taipei City Hall (Выход 2) / Sun Yat-Sen Memorial Hall (Выход 4)',
    recommendedDurationRu: 'База проживания',
    tagsRu: ['Мой дом в Тайбэе', 'Улица Yixian Rd', 'Рядом с Brownies', 'Синяя ветка метро'],
  },
  'google-tpkd-office': {
    nameRu: '🏢 Мой офис — Google TPKD (Баньцяо, технопарк Tpark)',
    overviewRu:
      'Ваш офис во флагманском 16-этажном инженерном кампусе Google TPKD на территории технопарка Taipei Far Eastern Telecom Park (Tpark), ул. Yuandong Rd, 62–66, район Баньцяо.',
    insiderTipRu:
      'От вашего дома в Синьи садитесь на синюю ветку метро (Bannan Line) на станции Taipei City Hall или Sun Yat-Sen Memorial Hall и поезжайте без пересадок до станции Far Eastern Hospital (Выход 3, ~5 минут пешком по парку Tpark).',
    mrtStationRu: 'Метро Far Eastern Hospital (亞東醫院站, Выход 3)',
    recommendedDurationRu: 'Рабочий кампус',
    tagsRu: ['Мой офис', 'Google TPKD', 'Технопарк Tpark', 'Баньцяо'],
  },
  'brownies-xinyi': {
    nameRu: '🍫 Кафе-ресторан Brownies в Синьи (布朗尼咖啡餐廳)',
    overviewRu:
      'Уютное соседское кафе-ресторан по адресу Lane 42, Yixian Rd, № 3 в районе Синьи — прямо рядом с тем местом, где вы живете. Здесь подают теплые шоколадные брауни, кофе, бранчи и домашние блюда.',
    insiderTipRu:
      'Самый удобный ориентир прямо у вашего дома на Yixian Road — идеально, чтобы называть адрес таксисту или выпить утренний кофе перед поездкой в офис TPKD.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 4) / Taipei City Hall (Выход 2)',
    recommendedDurationRu: '45–90 мин',
    tagsRu: ['Прямо у дома', 'Ориентир в Синьи', 'Кофе и брауни', 'Yixian Road'],
  },
  // 1. CITY NEIGHBORHOODS & DISTRICTS
  ximending: {
    nameRu: 'Симыньдин (Ximending)',
    overviewRu:
      'Знаменитый пешеходный квартал шопинга, уличной еды и молодежной культуры в районе Ваньхуа с историческим Красным домом (Red House) и атмосферой ночного рынка.',
    insiderTipRu:
      'Лучше всего приходить после 17:00, когда зажигаются неоновые вывески; обязательно попробуйте лапшу Ay-Chung и загляните на арт-рынок у Красного дома.',
    mrtStationRu: 'Метро Ximen (Выход 6)',
    recommendedDurationRu: '2–3 часа',
    tagsRu: ['Шопинг', 'Уличная еда', 'Вечерняя прогулка', 'Пешеходная зона'],
  },
  'xinyi-district': {
    nameRu: 'Деловой и торговый район Синьи (Xinyi District)',
    overviewRu:
      'Современный центр Тайбэя с небоскребом Тайбэй 101, модными торговыми центрами, крытыми надземными переходами, уличными музыкантами и ночной жизнью.',
    insiderTipRu:
      'Крытые надземные галереи соединяют Breeze NanShan, ATT 4 FUN, Shin Kong Mitsukoshi и Тайбэй 101 — идеально для прогулки даже в дождь.',
    mrtStationRu: 'Метро Taipei City Hall / Taipei 101',
    recommendedDurationRu: '2–4 часа',
    tagsRu: ['Небоскребы', 'Торговые центры', 'Ночная жизнь', 'Удобно в дождь'],
  },
  gongguan: {
    nameRu: 'Студенческий квартал и ночной рынок Гунгуань (Gongguan)',
    overviewRu:
      'Оживленный университетский район рядом с главным вузом страны (NTU) с книжными лавками, недорогими кафе и популярным ночным рынком.',
    insiderTipRu:
      'Попробуйте знаменитые паровые булочки со свининой Lan Jia Gua Bao и молоко с тапиокой в тростниковом сиропе.',
    mrtStationRu: 'Метро Gongguan (Выходы 1 и 4)',
    recommendedDurationRu: '1.5–2.5 часа',
    tagsRu: ['Ночной рынок', 'Район NTU', 'Уличная еда', 'Книжные магазины'],
  },
  'jiufen-old-street': {
    nameRu: 'Старая улица Цзюфэнь (Jiufen Old Street)',
    overviewRu:
      'Исторический горный городок золотоискателей на склоне у океана со знаменитыми узкими лестницами, красными фонариками, чайными домами и шариками из таро.',
    insiderTipRu:
      'Садитесь на прямой автобус №965 от метро Ximen или Beimen (~55 минут). Оставайтесь до 17:30, когда на улице Шуци зажигаются красные фонари.',
    mrtStationRu: 'Автобус 965 от Ximen / Автобус 1062 от Zhongxiao Fuxing',
    recommendedDurationRu: '4–5 часов (поездка на полдня)',
    tagsRu: ['Поездка из города', 'Красные фонарики', 'Горные виды', 'Чайные дома'],
  },
  'dihua-street': {
    nameRu: 'Историческая улица Дихуа в Дадаочэне (Dihua Street / 迪化街)',
    overviewRu:
      'Самая колоритная старинная торговая улица Тайбэя XIX века в квартале Дадаочэн с купеческими домами в стиле барокко, лавками чая, трав и сухофруктов, рынком тканей Юнлэ, стильными кофейнями и знаменитым храмом Бога Города Сяхай.',
    insiderTipRu:
      'Прогуляйтесь с юга на север от рынка тканей Юнлэ и храма Сяхай под старинными кирпичными аркадами, а к закату выйдите через ворота №5 к пристани Дадаочэн (Dadaocheng Wharf).',
    mrtStationRu: 'Метро Beimen (Выход 3) / Daqiaotou (Выход 1)',
    recommendedDurationRu: '2–3 часа',
    tagsRu: ['Улица Дихуа', 'Дадаочэн', 'Старинная архитектура', 'Чайные лавки', 'Храм Сяхай'],
  },
  'yongkang-street': {
    nameRu: 'Гастрономическая улица Юнкан в районе Даань (Yongkang Street / 永康街)',
    overviewRu:
      'Знаменитая пешеходная улица гурманов, чайных и бутиков вокруг парка Юнкан в районе Даань — родина первого ресторана пельменей Din Tai Fung, легендарного мангового льда Smoothie House и хрустящих слоеных лепешек с зеленым луком.',
    insiderTipRu:
      'Возьмите горячую слоеную лепешку с луком и яйцом Tian Jin прямо у угла парка Юнкан, попробуйте огромную порцию десерта со свежим манго в Smoothie House и прогуляйтесь пешком до лесопарка Даань.',
    mrtStationRu: 'Метро Dongmen (Красная и Оранжевая ветки, Выход 5)',
    recommendedDurationRu: '1.5–2.5 часа',
    tagsRu: ['Улица Юнкан', 'Район Даань', 'Манговый лед', 'Уличная еда и чайные'],
  },
  'costco-neihu': {
    nameRu: 'Гипермаркет Costco Wholesale — Нэйху, Тайбэй (好市多 內湖店)',
    overviewRu:
      'Главный гипермаркет Costco в самом Тайбэе (район Нэйху, Jiuzong Rd, Sec. 1, 268) — популярное место для покупки продуктов, импортных товаров, больших подарочных наборов тайваньских ананасовых пирожных, улуна и перекуса на фуд-корте.',
    insiderTipRu:
      'От вашего дома в Синьи сюда всего ~10–12 минут на такси через мост. Ваша международная клубная карта Costco (или цифровая карта в приложении) действует во всех магазинах Costco на Тайване!',
    mrtStationRu: 'Метро Songshan / Gangqian + 8 мин на такси или автобусе',
    recommendedDurationRu: '1–2 часа',
    tagsRu: ['Costco', 'Шопинг и продукты', 'Сувениры оптом', 'Фуд-корт', 'Нэйху'],
  },
  'costco-zhonghe': {
    nameRu: 'Гипермаркет Costco Wholesale — Чжунхэ, рядом с Баньцяо и TPKD (好市多 中和店)',
    overviewRu:
      'Крупный гипермаркет Costco в Новом Тайбэе (район Чжунхэ, Zhongshan Rd, Sec. 2, 347), расположенный совсем недалеко к востоку от Баньцяо и вашего офиса Google TPKD.',
    insiderTipRu:
      'Очень удобно заехать после работы из кампуса Google TPKD в Баньцяо (~10 минут на такси); на фуд-корте обязательно попробуйте эксклюзивный тайваньский ролл Bulgogi Bake и суп клэм-чаудер.',
    mrtStationRu: 'Метро Qiaohe (Кольцевая желтая ветка) / 10 мин на такси от TPKD',
    recommendedDurationRu: '1–2 часа',
    tagsRu: ['Costco', 'Рядом с Баньцяо и TPKD', 'Покупки и продукты', 'Новый Тайбэй'],
  },

  // 2. PARKS, NATURE & SCENIC SPOTS
  'songshan-cultural-park': {
    nameRu: 'Культурно-креативный парк Суншань (Songshan Cultural Park)',
    overviewRu:
      'Бывшая табачная фабрика 1937 года в районе Синьи, превращенная в стильный парк дизайна с выставками, прудом с лотосами, садом и магазином Eslite Spectrum.',
    insiderTipRu:
      'Совместите прогулку с походом в веган-бистро BaganHood, завтраком в Zhen Fang или чайной церемонией в Hermit’s Hut прямо через дорогу.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 5)',
    recommendedDurationRu: '1.5–3 часа',
    tagsRu: ['Искусство и дизайн', 'Выставки', 'Архитектура', 'Кофе'],
  },
  'sanmin-park': {
    nameRu: 'Парк Саньминь (Sanmin Park)',
    overviewRu:
      'Зеленый уютный городской парк в микрорайоне Миньшэн (район Суншань) с тенистыми аллеями, детскими площадками и спокойной атмосферой.',
    insiderTipRu:
      'В двух кварталах от парка находится уютная чайная Kai Men Cha Dang с тайваньским улуном и десертами.',
    mrtStationRu: 'Метро Nanjing Sanmin',
    recommendedDurationRu: '45–60 мин',
    tagsRu: ['Городской парк', 'Прогулка', 'Район Миньшэн'],
  },
  'yingfeng-riverside-park': {
    nameRu: 'Набережные парки Инфэн и Гуаньшань (Yingfeng & Guanshan)',
    overviewRu:
      'Просторные парки вдоль реки Цзилун — отличное место для велопрогулок на городских велосипедах YouBike, пикников и наблюдения за посадкой самолетов.',
    insiderTipRu:
      'Возьмите напрокат велосипед YouBike 2.0 и прокатитесь по ровной велодорожке вдоль воды на закате.',
    mrtStationRu: 'Метро Songshan Airport / Jiannan Rd',
    recommendedDurationRu: '1.5–2.5 часа',
    tagsRu: ['Велодорожки', 'Набережная', 'Пикник', 'Закат'],
  },
  'daan-forest-park': {
    nameRu: 'Лесопарк Даань (Daan Forest Park)',
    overviewRu:
      '«Центральный парк» Тайбэя площадью 26 гектаров в районе Даань с бамбуковыми рощами, прудом с цаплями и черепахами, лужайками для пикника и амфитеатром.',
    insiderTipRu:
      'Обязательно посмотрите стеклянный павильон с водопадом у Выхода 5 станции метро Daan Park.',
    mrtStationRu: 'Метро Daan Park (Выходы 2–5)',
    recommendedDurationRu: '1–2 часа',
    tagsRu: ['Зеленый оазис', 'Пикник', 'Пруд с птицами', 'Отдых'],
  },
  'bitan-scenic-area': {
    nameRu: 'Озеро Битань и подвесной мост (Bitan Scenic Area)',
    overviewRu:
      'Живописное изумрудное озеро на реке в Синьдяне с историческим подвесным мостом, катамаранами-лебедями, скалами и кафе у воды.',
    insiderTipRu:
      'Важно: станция Xiaobitan (小碧潭) — это просто пересадка и ТЦ! Чтобы попасть к самому озеру и мосту Битань, поезжайте по Зеленой ветке до конечной станции Xindian (新店).',
    mrtStationRu: 'Метро Xindian (конечная Зеленой ветки)',
    recommendedDurationRu: '2–3 часа',
    tagsRu: ['Подвесной мост', 'Катамараны', 'Озеро', 'Важная подсказка по метро'],
  },
  'yangmingshan-np': {
    nameRu: 'Национальный парк Янминшань (Yangmingshan NP)',
    overviewRu:
      'Вулканический национальный парк к северу от Тайбэя с дымящимися фумаролами Сяоюкэн, горячими источниками, альпийскими лугами Цинтяньган и сезонными цветами.',
    insiderTipRu:
      'От автостанции Янминшань курсирует удобный парковый автобус №108 между Сяоюкэн, озером Мэнхуань и лугами Цинтяньган.',
    mrtStationRu: 'Метро Jiantan или Shilin + автобус R5 / S15',
    recommendedDurationRu: '4–6 часов',
    tagsRu: ['Горы и треккинг', 'Горячие источники', 'Вулканы', 'Природа'],
  },
  'dahu-park': {
    nameRu: 'Парк Даху и Лунный мост (Dahu Park)',
    overviewRu:
      'Красивый озерный парк в районе Нэйху, знаменитый арочным каменным «Лунным мостом» Цзиньдай, отражающимся в воде на фоне зеленых холмов.',
    insiderTipRu:
      'Поезд Коричневой ветки метро проезжает по эстакаде прямо над озером — садитесь в первый вагон для панорамного вида.',
    mrtStationRu: 'Метро Dahu Park (Выход 2)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Лунный мост', 'Фотолокация', 'Озеро', 'Нэйху'],
  },
  'monghuan-lake': {
    nameRu: 'Озеро Мечты Мэнхуань (Monghuan / Dream Lake)',
    overviewRu:
      'Туманное высокогорное озеро-заповедник на склоне горы Цисин внутри национального парка Янминшань с редкими эндемичными растениями.',
    insiderTipRu:
      'От парковки Menghuan Pond каменная тропа за 20 минут ведет к смотровой площадке, откуда видно, как облака плывут прямо над водой.',
    mrtStationRu: 'Парковый шаттл №108 (остановка Menghuan Pond)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Горное озеро', 'Янминшань', 'Туманные виды', 'Легкая тропа'],
  },
  'yehliu-geopark': {
    nameRu: 'Геопарк Йелю и скала «Голова Королевы» (Yehliu / Yeliou Geopark)',
    overviewRu:
      'Всемирно известный мыс на северном побережье Тайваня, где волны Тихого океана и ветер выточили из песчаника инопланетные фигуры: знаменитую «Голову Королевы» (Queen’s Head), «Туфельку феи» и «Морские свечи».',
    insiderTipRu:
      'Удобнее всего доехать на прямом междугороднем автобусе №1815 компании Kuo-Kuang от Главного вокзала Тайбэя или сесть на него прямо в Синьи у станции метро Taipei City Hall (~75 минут в пути).',
    mrtStationRu: 'Прямой автобус 1815 от Taipei Main Station / Taipei City Hall',
    recommendedDurationRu: '2.5–3.5 часа (поездка к океану)',
    tagsRu: ['Геопарк Йелю (Yeliou)', 'Голова Королевы', 'Побережье океана', 'Природа и скалы'],
  },
  'shifen-waterfall': {
    nameRu: 'Водопад Шифэнь — «Тайваньская Ниагара» (Shifen Waterfall / 十分瀑布)',
    overviewRu:
      'Самый широкий каскадный водопад Тайваня (ширина 40 м, высота 20 м) в изумрудном ущелье реки Цзилун, к которому ведут подвесные мосты среди субтропического леса.',
    insiderTipRu:
      'Перейдите по подвесному мосту Сыань (Si’an Bridge) и спуститесь на нижнюю смотровую террасу — в солнечную погоду в брызгах водопада всегда видна радуга.',
    mrtStationRu: 'Автобус тура Klook / Ж/д ветка Pingxi Line до станции Shifen',
    recommendedDurationRu: '50–60 мин',
    tagsRu: ['Остановка тура Klook', 'Водопад Шифэнь', 'Подвесные мосты', 'Пинси'],
  },
  'shifen-old-street': {
    nameRu: 'Старая улица Шифэнь и запуск небесных фонариков на рельсах (Shifen Old Street / 十分老街)',
    overviewRu:
      'Знаменитая старинная деревня вдоль действующей железной дороги Пинси, где прямо на рельсах запускают в небо расписанные бумажные фонарики желаний.',
    insiderTipRu:
      'Большой 4-цветный небесный фонарик стоит ~200–250 NT$; сотрудники лавки бесплатно сделают для вас серию фото и видео запуска прямо на путях.',
    mrtStationRu: 'Автобус тура Klook / Станция Shifen (ветка Pingxi Line)',
    recommendedDurationRu: '60–75 мин',
    tagsRu: ['Небесные фонарики', 'Поезд по улице', 'Остановка тура Klook', 'Крылышки с рисом'],
  },
  'golden-waterfall-yinyang-sea': {
    nameRu: 'Золотой водопад и двухцветное море Инь-Ян в Цзиньгуаши (Golden Waterfall & Yin Yang Sea)',
    overviewRu:
      'Необычный каскад воды по медным золотисто-рыжим скалам у подножия золотых рудников Цзиньгуаши и бухта двухцветного желто-лазурного моря Инь-Ян.',
    insiderTipRu:
      'Поднимитесь на 2 минуты вверх по дороге от побережья моря Инь-Ян — оттуда открывается знаменитый вид на уходящее в океан шоссе в стиле японской Камакуры.',
    mrtStationRu: 'Тур Klook по Северному берегу / Автобус 856 от Цзюфэня',
    recommendedDurationRu: '30–45 мин',
    tagsRu: ['Золотой водопад', 'Море Инь-Ян', 'Остановка тура Klook', 'Рядом с Цзюфэнем'],
  },
  'beitou-thermal-valley': {
    nameRu: 'Термальная долина гейзеров Бэйтоу и горячие источники (Beitou Thermal Valley / 北投地熱谷)',
    overviewRu:
      'Парящее нефритово-зеленое серное озеро вулканического происхождения («Долина Ведьм»), исторический японский музей купален 1913 года и деревянная эко-библиотека Бэйтоу.',
    insiderTipRu:
      'Важно: по понедельникам Термальная долина и Музей горячих источников закрыты! Лучше всего планировать со вторника по воскресенье вместе с парком Янминшань.',
    mrtStationRu: 'Метро Xinbeitou (7 мин пешком по парку)',
    recommendedDurationRu: '1.5–2.5 часа',
    tagsRu: ['Горячие источники', 'Термальная долина', 'Остановка тура Klook', 'Бэйтоу'],
  },
  'thousand-island-lake-pinglin': {
    nameRu: 'Озеро Тысячи Островов в Шидине и чайные плантации Пинлинь (Thousand Island Lake / 石碇千島湖)',
    overviewRu:
      'Захватывающая дух панорама изумрудного водохранилища среди зеленых холмов («Остров Крокодила») в окружении ступенчатых чайных террас Багуа и плантаций улуна Баочжун.',
    insiderTipRu:
      'Общественные автобусы останавливаются далеко на трассе, поэтому сюда удобнее всего ехать с полудневным туром Klook / KKday на микроавтобусе прямо до смотровой площадки.',
    mrtStationRu: 'Тур Klook / KKday на микроавтобусе от Taipei Main Station',
    recommendedDurationRu: '2.5–3.5 часа',
    tagsRu: ['Озеро Тысячи Островов', 'Чайные террасы Багуа', 'Тур Klook / KKday', 'Панорама гор'],
  },
  'wulai-old-street-waterfall': {
    nameRu: 'Водопад Улай, горная вагонетка и горячие источники аборигенов Атаял (Wulai Waterfall / 烏來瀑布)',
    overviewRu:
      'Горное ущелье коренного народа Атаял к югу от Тайбэя с 80-метровым водопадом Улай, открытой ретро-вагонеткой (Wulai Scenic Trolley), источниками у реки и старой улицей.',
    insiderTipRu:
      'Прокатитесь на исторической лесной вагонетке Wulai Trolley (50 NT$) сквозь тоннель в скале от Старой улицы прямо к подножию водопада.',
    mrtStationRu: 'Метро Xindian + автобус 849 или дневной тур Klook в Улай',
    recommendedDurationRu: '3–4 часа',
    tagsRu: ['Водопад Улай', 'Горная вагонетка', 'Горячие источники', 'Тур Klook'],
  },

  // 3. WILDLIFE, MOUNTAINS & VIEWS
  'taipei-101': {
    nameRu: 'Небоскреб Тайбэй 101 (Taipei 101)',
    overviewRu:
      'Главный символ Тайбэя высотой 508 метров со смотровыми площадками на 89 и 91 этажах, гигантским маятником-стабилизатором и люксовым торговым центром.',
    insiderTipRu:
      'Сначала возьмите талончик электронной очереди в Din Tai Fung на этаже B1, а пока ждете столик — поднимитесь на смотровую площадку 89 этажа.',
    mrtStationRu: 'Метро Taipei 101 / World Trade Center (Выход 4)',
    recommendedDurationRu: '2–3 часа',
    tagsRu: ['Главный символ', 'Смотровая площадка', 'Панорама', 'Шопинг'],
  },
  'elephant-mountain': {
    nameRu: 'Гора Слона — Сяншань (Elephant Mountain / Xiangshan)',
    overviewRu:
      'Самая популярная смотровая тропа Тайбэя с захватывающим видом на небоскреб Тайбэй 101 и закат над районом Синьи.',
    insiderTipRu:
      'Начинайте подъем по ступенькам за 45 минут до заката; возьмите воду и пройдите на 5 минут выше знаменитых «Шести валунов» до верхней террасы.',
    mrtStationRu: 'Метро Xiangshan (конечная Красной ветки, Выход 2)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Лучший закат', 'Короткий подъем', 'Фото Тайбэй 101', 'Обязательно к посещению'],
  },
  'taipei-zoo': {
    nameRu: 'Тайбэйский зоопарк (Taipei Zoo)',
    overviewRu:
      'Один из крупнейших и лучших зоопарков Азии среди зеленых холмов с гигантскими пандами, коалами, панголинами и тропическим павильоном.',
    insiderTipRu:
      'Садитесь на недорогой автопоезд у входа до верхней станции Bird World, а затем спускайтесь пешком без усталости.',
    mrtStationRu: 'Метро Taipei Zoo (конечная Коричневой ветки)',
    recommendedDurationRu: '3–4 часа',
    tagsRu: ['Гигантские панды', 'Для всей семьи', 'Зоопарк', 'Рядом с канатной дорогой'],
  },
  maokong: {
    nameRu: 'Маокун (Маоконг) — Канатная дорога и чайная деревня в горах (Maokong)',
    overviewRu:
      'Живописная деревня чайных плантаций на вершине гор Вэньшань, куда ведет 4-километровая панорамная канатная дорога Maokong Gondola от Тайбэйского зоопарка.',
    insiderTipRu:
      'Выбирайте кабинку со стеклянным полом «Crystal Cabin» (цена билета та же!) и попробуйте мороженое из чая Тегуаньинь прямо у выхода с верхней станции.',
    mrtStationRu: 'Метро Taipei Zoo + Канатная дорога Maokong Gondola',
    recommendedDurationRu: '2.5–4 часа',
    tagsRu: ['Маокун / Маоконг', 'Канатная дорога', 'Чайные дома в горах', 'Вид на закат'],
  },
  'maokong-camphor-trail-teahouses': {
    nameRu: 'Маокун — Камфорная тропа и панорамные чайные террасы (Maokong Tea Terraces)',
    overviewRu:
      'Пологая прогулочная тропа среди чайных плантаций и открытые видовые чайные дома в 5 минутах ходьбы от верхней станции канатной дороги Маокун с видом на башню Тайбэй 101.',
    insiderTipRu:
      'Прогуляйтесь по ровной Камфорной тропе (樟樹步道, 1.1 км) мимо пруда с буйволами и чайных кустов, а на закате займите столик на террасе чайного дома Yao Yue, чтобы заварить горный улун Тегуаньинь.',
    mrtStationRu: 'Верхняя станция канатной дороги Maokong (5 мин пешком)',
    recommendedDurationRu: '2–3 часа',
    tagsRu: ['Маокун / Маоконг', 'Улун Тегуаньинь', 'Камфорная тропа', 'Чай с видом на Тайбэй 101'],
  },

  // 4. WATERFRONT & CULTURAL / UNIVERSITIES
  'dadaocheng-wharf': {
    nameRu: 'Набережная Дадаочэн и контейнерный фуд-маркет у Пирса 5 (Dadaocheng Wharf)',
    overviewRu:
      'Атмосферная набережная реки Даньшуй у Водных ворот №5 (Water Gate 5) с вечерним рынком уличной еды и напитков в двухэтажных морских контейнерах, велодорожкой и одними из лучших закатов в Тайбэе.',
    insiderTipRu:
      'Приходите за 30 минут до заката сразу после прогулки по старинной улице Дихуа; поднимитесь на верхнюю террасу контейнеров с чаем или ужином, чтобы встретить закат над рекой.',
    mrtStationRu: 'Метро Beimen (Выход 3) / Shuanglian (12 мин пешком)',
    recommendedDurationRu: '1.5–2.5 часа',
    tagsRu: ['Дадаочэн (Dadaocheng)', 'Лучший закат у реки', 'Фуд-маркет Пирс 5', 'Велопрогулка'],
  },
  tamsui: {
    nameRu: 'Старая улица и набережная Даньшуй (Tamsui)',
    overviewRu:
      'Старинный портовый городок в устье реки с испанско-голландским фортом Сан-Доминго, закатами над проливом, мостом Влюбленных и уличными закусками.',
    insiderTipRu:
      'Прогуляйтесь по набережной Даньшуй мимо форта Сан-Доминго, а к закату доплывите на катере до Рыбацкой пристани (Fisherman’s Wharf).',
    mrtStationRu: 'Метро Tamsui (конечная Красной ветки)',
    recommendedDurationRu: '3–4 часа',
    tagsRu: ['Закат у воды', 'Старинный форт', 'Уличная еда', 'Набережная'],
  },
  'sun-yat-sen-memorial': {
    nameRu: 'Мемориальный зал Сунь Ятсена и парк (Sun Yat-Sen Memorial Hall)',
    overviewRu:
      'Монументальный культурный дворец, окруженный парком Чжуншань с прудом, садами и одним из лучших ракурсов для фото небоскреба Тайбэй 101 целиком.',
    insiderTipRu:
      'Встаньте у западного берега озера Цуйху (Cui Lake) в парке — оттуда башня Тайбэй 101 идеально отражается в воде.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 4)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Мемориальный парк', 'Лучший ракурс Тайбэй 101', 'Сады'],
  },
  'google-taipei': {
    nameRu: 'Офис Google в Тайбэе (Google Taipei)',
    overviewRu:
      'Корпоративный офис компании Google в небоскребе Тайбэй 101 в районе Синьи (а также инженерный кампус Tpark в Баньцяо).',
    insiderTipRu:
      'Обратите внимание: вход на офисные этажи Тайбэй 101 возможен только по приглашению сотрудника через стойку регистрации.',
    mrtStationRu: 'Метро Taipei 101 / World Trade Center',
    recommendedDurationRu: '30 мин',
    tagsRu: ['IT-офис', 'Район Синьи', 'Тайбэй 101'],
  },
  'chinese-culture-university': {
    nameRu: 'Университет китайской культуры (Wenhua Daxue)',
    overviewRu:
      'Крупный университет на горном хребте рядом с Янминшанем, известный зданиями в стиле традиционных дворцов и потрясающей ночной панорамой города.',
    insiderTipRu:
      'Склон за спортивным корпусом университета — легендарная секретная точка местных жителей с видом на огни всего Тайбэя.',
    mrtStationRu: 'Метро Jiantan + автобус R5 / 260',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Университет', 'Ночная панорама', 'По пути в Янминшань'],
  },

  // 5. KOREAN RESTAURANTS
  'dubu-house-songshan': {
    nameRu: 'Dubu House — Суншань (涓豆腐 松山店)',
    overviewRu:
      'Популярный корейский ресторан, знаменитый нежным острым супом с мягким тофу (сундубу), фиолетовым рисом в каменном горшочке и бесплатными закусками панчхан.',
    insiderTipRu:
      'Бесплатные корейские закуски можно пополнять без ограничений; закажите блинчик с морепродуктами.',
    mrtStationRu: 'Метро Songshan (ТЦ CITYLINK)',
    tagsRu: ['Корейский суп тофу', 'Бесплатные закуски', 'Суншань'],
  },
  'dubu-house-breeze-station': {
    nameRu: 'Dubu House — Главный вокзал Breeze (涓豆腐 微風台北車站)',
    overviewRu:
      'Филиал сети корейских ресторанов Dubu House на 2 этаже вокзала Taipei Main Station с горячими супами тофу и бесплатными закусками.',
    insiderTipRu: 'Очень удобно пообедать перед поездом HSR или экспрессом в аэропорт.',
    mrtStationRu: 'Метро Taipei Main Station (2 этаж Breeze)',
    tagsRu: ['Корейский суп тофу', 'Главный вокзал', 'Удобное расположение'],
  },
  'dubu-house-dunnan': {
    nameRu: 'Dubu House — Дуньнань, Даань (涓豆腐 敦南店)',
    overviewRu:
      'Просторный филиал корейского ресторана Dubu House на зеленом бульваре Дуньхуа в районе Даань с супами тофу и корейской курочкой.',
    mrtStationRu: 'Метро Technology Building / Liuzhangli',
    tagsRu: ['Суп тофу', 'Район Даань', 'Для компании'],
  },
  'dubu-house-unipresident': {
    nameRu: 'Dubu House — ТЦ Uni-President Синьи (涓豆腐 統一時代店)',
    overviewRu:
      'Филиал Dubu House в универмаге Uni-President с прямым выходом из станции метро Taipei City Hall.',
    mrtStationRu: 'Метро Taipei City Hall (Выход 2)',
    tagsRu: ['Корейская кухня', 'Район Синьи', 'В торговом центре'],
  },
  'abv-korean-banqiao': {
    nameRu: 'Корейский гастропаб ABV Bar & Kitchen — Баньцяо',
    overviewRu:
      'Современный корейский гастропаб в Баньцяо с коллекцией из 300+ сортов крафтового пива, корейским барбекю и таккальби с сыром.',
    mrtStationRu: 'Метро Banqiao / Xinpu',
    tagsRu: ['Корейский фьюжн', '300+ сортов пива', 'Баньцяо'],
  },
  'twozzim-xinyi': {
    nameRu: 'Twozzim — Корейская тушеная курица ччимдак (Синьи)',
    overviewRu:
      'Филиал популярной корейской сети в ТЦ ATT 4 FUN, специализирующийся на ччимдаке — нежной курице, тушенной с бататовой лапшой, овощами и сыром.',
    mrtStationRu: 'Метро Taipei 101 / City Hall (ATT 4 FUN)',
    tagsRu: ['Ччимдак', 'Корейская курица', 'Синьи'],
  },
  'seoraksan-korean': {
    nameRu: 'Seoraksan — Корейская кухня (雪嶽山韓式料理)',
    overviewRu:
      'Недорогое и вкусное место с классической корейской едой в районе Синьи: пибимпап в каменном горшочке, мясо на чугунной сковороде и супы.',
    mrtStationRu: 'Метро Taipei City Hall',
    tagsRu: ['Пибимпап', 'Корейское барбекю', 'Доступные цены'],
  },

  // 6. HOT POT & SHABU-SHABU
  'haidilao-breeze-nanshan': {
    nameRu: 'Хого Haidilao — Breeze NanShan, Синьи (海底撈 微風南山)',
    overviewRu:
      'Флагманский ресторан знаменитой сети китайского хого (Hot Pot) рядом с Тайбэй 101: кастрюля на 4 бульона, шоу танцующей лапши и легендарный сервис.',
    insiderTipRu:
      'Работает до глубокой ночи (3–4 утра); заказывайте кастрюлю на 4 секции, чтобы попробовать острый сычуаньский, томатный и грибной бульоны.',
    mrtStationRu: 'Метро Taipei 101 / World Trade Center (Выход 4)',
    tagsRu: ['Хого (Hot Pot)', 'Работает ночью', 'Шоу с лапшой', 'Синьи'],
  },
  'haidilao-ximen': {
    nameRu: 'Хого Haidilao — Симыньдин (海底撈 西門店)',
    overviewRu:
      'Филиал знаменитого хого Haidilao в районе Симыньдин с богатым соус-баром, 4 бульонами и сычуаньским шоу смены масок.',
    mrtStationRu: 'Метро Ximen',
    tagsRu: ['Хого (Hot Pot)', 'Симыньдин', 'Допоздна'],
  },
  'haidilao-q-square': {
    nameRu: 'Хого Haidilao — ТЦ Q Square у Главного вокзала (京站店)',
    overviewRu:
      'Ресторан Haidilao на 4 этаже торгового центра Q Square прямо у Главного вокзала Тайбэя.',
    mrtStationRu: 'Метро Taipei Main Station (Q Square)',
    tagsRu: ['Хого (Hot Pot)', 'ТЦ Q Square', 'Главный вокзал'],
  },
  'haidilao-qingcheng': {
    nameRu: 'Хого Haidilao — Цинчэн, Суншань (海底撈 慶城店)',
    overviewRu:
      'Удобный филиал Haidilao в ТЦ Urban One прямо у выхода со станции метро Nanjing Fuxing.',
    mrtStationRu: 'Метро Nanjing Fuxing (Выход 7)',
    tagsRu: ['Хого (Hot Pot)', 'Суншань', 'У метро'],
  },
  'haidilao-xinzhuang': {
    nameRu: 'Хого Haidilao — Honhui Plaza, Синьчжуан (新莊宏匯店)',
    overviewRu:
      'Просторный ресторан Haidilao в ТЦ Honhui Plaza (Новый Тайбэй), куда легко доехать по ветке метро в аэропорт.',
    mrtStationRu: 'Метро Xinzhuang Fuduxin (Airport MRT)',
    tagsRu: ['Хого (Hot Pot)', 'Новый Тайбэй', 'ТЦ Honhui Plaza'],
  },
  'chan-chi-hotpot': {
    nameRu: 'Острый хого Chan Chi — Главный ресторан в Синьчжуане (詹記麻辣火鍋)',
    overviewRu:
      'Культовый тайваньский ресторан острого хого в ретро-интерьере 1980-х годов, прославившийся невероятно нежным тофу и желеобразной утиной кровью в пряном бульоне.',
    insiderTipRu:
      'Бронируйте столик заранее онлайн; обязательно закажите фирменный тофу и шарики с таро.',
    mrtStationRu: 'Метро Xinzhuang',
    tagsRu: ['Легендарный тайваньский хого', 'Ретро 80-х', 'Острый бульон'],
  },
  'shabu-ong': {
    nameRu: 'Shabu Ong — Премиальное сябу-сябу (Даань)',
    overviewRu:
      'Камерный японский ресторан сябу-сябу в районе Даань с медными котелками, отборной мраморной говядиной и трюфельной рисовой кашей в конце трапезы.',
    mrtStationRu: 'Метро Zhongxiao Fuxing / Daan',
    tagsRu: ['Медный котелок сябу', 'Мраморная говядина', 'Даань'],
  },
  'zhujian-hotpot': {
    nameRu: 'Каменный хого Jhujian / Zhujian Hotpot (Jhuji — 築間幸福鍋物 信義世貿店)',
    overviewRu:
      'Популярная тайваньская сеть индивидуального каменного хого (築間幸福鍋物 — Jhujian / Zhujian / Jhuji Hotpot) в Синьи рядом с Тайбэй 101 (а также на Zhongxiao E. Rd и в Симыньдине): обжарка чеснока, лука и кальмара в кунжутном масле прямо в чугунном котелке у стола, безлимитный буфет из 30+ видов овощей и морепродуктов, мороженое и работа до 04:00 утра.',
    insiderTipRu:
      'Берите фирменный каменный бульон Signature Stone Hot Pot — повар обжаривает специи с кунжутным маслом прямо при вас, а овощной салат-бар и мороженое включены без ограничений!',
    mrtStationRu: 'Метро Taipei 101 / World Trade Center (Выход 1, 4 мин пешком)',
    recommendedDurationRu: '1.5 часа',
    tagsRu: ['Jhuji / Zhujian Hotpot', 'Каменный хого с обжаркой', 'Безлимитный овощной буфет', 'До 04:00 утра'],
  },

  // 7. IZAKAYA, YAKINIKU & JAPANESE
  'kanpai-main': {
    nameRu: 'Якинику-изакая Kanpai — Главный ресторан (乾杯 本店)',
    overviewRu:
      'Веселая японская изакая с грилем на углях в районе Даань, где каждый вечер в 20:00 все гости дружно поднимают бокалы («Канпай!») под жареную австралийскую говядину Вагю.',
    mrtStationRu: 'Метро Zhongxiao Dunhua (Выход 2)',
    tagsRu: ['Тост в 20:00', 'Японское барбекю', 'Восточный квартал'],
  },
  'kanpai-classic-xinyi': {
    nameRu: 'Kanpai Classic — Премиум Вагю в Синьи (老乾杯 信義店)',
    overviewRu:
      'Премиальный ресторан японского гриля якинику в ТЦ Shin Kong Mitsukoshi A9, где охлажденную мраморную говядину Вагю жарят прямо у вашего столика.',
    mrtStationRu: 'Метро Taipei City Hall / Taipei 101 (A9, 8 этаж)',
    tagsRu: ['Премиум Вагю', 'Гриль у стола', 'Синьи'],
  },
  'kanpai-classic-shilin': {
    nameRu: 'Kanpai Classic — Шилинь (老乾杯 士林店)',
    overviewRu:
      'Элегантный филиал Kanpai Classic в районе Шилинь — отличный выбор для ужина после прогулки по горам Янминшань.',
    mrtStationRu: 'Метро Shilin / Zhishan',
    tagsRu: ['Вагю на углях', 'Шилинь', 'Саке'],
  },
  'hachiyo-izakaya': {
    nameRu: 'Изакая Hachiyo — Суншань (捌千代居酒屋 松山店)',
    overviewRu:
      'Традиционная японская изакая в двух шагах от вокзала Суншань с шашлычками якитори на углях бинтётан, омлетом с икрой минтая и большим выбором саке.',
    mrtStationRu: 'Метро Songshan',
    tagsRu: ['Шашлычки на углях', 'Саке', 'Суншань'],
  },
  'luigi-power-xinyi': {
    nameRu: 'Якинику Luigi’s Power Company — Синьи (路易奇電力公司)',
    overviewRu:
      'Популярный ресторан японского барбекю в Синьи, где действует большая скидка почти в 2 раза, если вы сами жарите премиальные стейки японской говядины A5 Вагю.',
    insiderTipRu:
      'Выбирайте тариф самостоятельной прожарки и соус из черного трюфеля из бесплатного соус-бара.',
    mrtStationRu: 'Метро Taipei City Hall',
    tagsRu: ['Японская говядина A5', 'Выгодная цена', 'Синьи'],
  },
  'oh-my-yakiyan-banqiao': {
    nameRu: 'Якинику Oh my! Yakiyan — Баньцяо (Oh my!原燒 板橋文化店)',
    overviewRu:
      'Современный ресторан японского гриля в Баньцяо с большими мясными сетами для компании и отличным сервисом.',
    mrtStationRu: 'Метро Xinpu / Banqiao',
    tagsRu: ['Мясные сеты на гриле', 'Баньцяо', 'Для компании'],
  },
  'li-jun-izakaya': {
    nameRu: 'Изакая Li Jun и квартал изакай Чжуншань (狸君居酒屋)',
    overviewRu:
      'Высоко оцененная японская изакая в переулках Чжуншаня (рядом также отличные изакаи Chu Cang Jiu, Mura на Linsen и GUGU Yakitori).',
    mrtStationRu: 'Метро Zhongshan',
    tagsRu: ['Переулки Чжуншань', 'Якитори', 'Вечерняя атмосфера'],
  },
  'ootoya-unipresident': {
    nameRu: 'Японские сеты OOTOYA — Uni-President (大戶屋 統一時代店)',
    overviewRu:
      'Любимая японская сеть домашних комплексных обедов «тэйсёку» с рыбой на углях, курицей кацу и бесплатной добавкой риса и мисо-супа.',
    mrtStationRu: 'Метро Taipei City Hall (этаж B2)',
    tagsRu: ['Японские сеты тэйсёку', 'Рыба на гриле', 'Домашняя кухня'],
  },
  'tienfood-curry': {
    nameRu: 'Японское карри TienFood (甜福 / 日式咖哩)',
    overviewRu:
      'Уютное место в районе Даань с густым, томленым японским карри, хрустящей свиной котлетой тонкацу и нежным омлетом.',
    mrtStationRu: 'Метро Daan',
    tagsRu: ['Японское карри', 'Тонкацу', 'Даань'],
  },
  'yamato-japanese': {
    nameRu: 'Японский ресторан Yamato (大和日本料理)',
    overviewRu:
      'Классический японский ресторан в Тайбэе со свежайшими сашими, суши нигири, темпурой и бенто-сетами.',
    mrtStationRu: 'Метро Nanjing Fuxing',
    tagsRu: ['Суши и сашими', 'Классическая Япония', 'Чжуншань'],
  },
  'nanshan-teppanyaki': {
    nameRu: 'Теппаньяки Nanshan — Яньцзи (南山鐵板燒)',
    overviewRu:
      'Традиционное тайваньское теппаньяки, где повар прямо перед вами за стойкой обжаривает на раскаленной плите говядину с чесноком, морепродукты и овощи.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 1)',
    tagsRu: ['Готовка перед вами', 'Теппаньяки', 'Недорого и вкусно'],
  },
  'chamonix-banqiao': {
    nameRu: 'Французское теппаньяки Chamonix — Баньцяо (夏慕尼鐵板燒)',
    overviewRu:
      'Изысканный ресторан теппаньяки с французским акцентом: утиная грудка фламбе, морепродукты и десерты в романтической атмосфере.',
    mrtStationRu: 'Метро Xinpu (Баньцяо)',
    tagsRu: ['Премиум теппаньяки', 'Для свидания', 'Баньцяо'],
  },

  // 8. TAIWANESE, DUMPLINGS & CHINESE
  'din-tai-fung-101': {
    nameRu: 'Din Tai Fung — Тайбэй 101 (Digntaifung / 鼎泰豐 101店)',
    overviewRu:
      'Всемирно известный кулинарный символ Тайваня (Din Tai Fung / Digntaifung / 鼎泰豐) в подножии башни Тайбэй 101: легендарные суповые пельмени сяолунбао с 18 защипами, острые вонтоны с креветками, жареный рис со свиной отбивной и шоколадные сяолунбао.',
    insiderTipRu:
      'Скачайте приложение Din Tai Fung, чтобы следить за очередью онлайн, или возьмите талончик и прогуляйтесь по ТЦ Taipei 101.',
    mrtStationRu: 'Метро Taipei 101 / World Trade Center (Выход 4)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Din Tai Fung / Digntaifung', 'Сяолунбао (18 защипов)', 'Кулинарная легенда', 'Тайбэй 101'],
  },
  'din-tai-fung-xinsheng': {
    nameRu: 'Din Tai Fung — Флагман Синьшэн у улицы Юнкан (Digntaifung / 鼎泰豐 新生店)',
    overviewRu:
      'Просторный многоэтажный флагманский ресторан Din Tai Fung (Digntaifung / 鼎泰豐 新生店) прямо у входа на гастрономическую улицу Юнкан (Yongkang St): панорамные окна лепки пельменей, быстрая очередь и полное меню.',
    insiderTipRu:
      'Возьмите номерок очереди на входе и прогуляйтесь 1 минуту по улице Юнкан за манговым льдом или луковыми лепешками, пока подходит ваш столик.',
    mrtStationRu: 'Метро Dongmen (Выход 6, 1 мин пешком)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Din Tai Fung / Digntaifung', 'Флагман на Юнкан', 'Сяолунбао', 'Метро Dongmen'],
  },
  'zhuji-dumplings': {
    nameRu: 'Пирожки с бульоном и пельмени Zhuji / Jhuji (朱記餡餅粥店 — Синьи A13 и Баньцяо)',
    overviewRu:
      'Знаменитый с 1973 года тайбэйский ресторан северной кухни Zhuji / Jhuji (朱記餡餅粥店) в ТЦ Far Eastern Xinyi A13 и Баньцяо: жареные золотистые пирожки с говядиной и горячим мясным соком внутри, слоеные луковые лепешки, пельмени и пшенная каша.',
    insiderTipRu:
      'Откусывайте фирменный пирожок с говядиной (Beef Xianbing) осторожно — внутри много обжигающего ароматного бульона! Есть филиал и в Mega City Banqiao рядом с офисом TPKD.',
    mrtStationRu: 'Метро Taipei City Hall / Taipei 101 (Far Eastern A13, этаж B3)',
    recommendedDurationRu: '45–60 мин',
    tagsRu: ['Jhuji / Zhuji', 'Пирожки с говядиной и бульоном', 'Луковые лепешки', 'С 1973 года'],
  },
  'fujin-tree-101': {
    nameRu: 'Fujin Tree Taiwanese Cuisine & Champagne — 101 (富錦樹台菜香檳)',
    overviewRu:
      'Флагманский ресторан со звездой Мишлен на 5 этаже Тайбэй 101, где утонченную тайваньскую кухню подают в светлом ботаническом зале в паре с шампанским.',
    mrtStationRu: 'Метро Taipei 101 / World Trade Center',
    tagsRu: ['Звезда Мишлен ⭐', 'Высокая тайваньская кухня', 'Тайбэй 101'],
  },
  'moon-moon-food': {
    nameRu: 'Moon Moon Food — Куриные супы Мишлен (雙月食品社 濟南店)',
    overviewRu:
      'Любимый местными ресторан из гида Michelin Bib Gourmand, знаменитый наваристыми тайваньскими куриными супами с моллюсками, курицей в кунжутном масле и устрицами.',
    mrtStationRu: 'Метро Shandao Temple (Выход 2)',
    tagsRu: ['Гид Мишлен Bib Gourmand', 'Куриный суп с моллюсками', 'Тайваньская классика'],
  },
  'ding-hao-zi-lin': {
    nameRu: 'Пельменная Ding Hao Zi Lin (頂好紫琳蒸餃館)',
    overviewRu:
      'Народный хит на цокольном этаже ТЦ Dinghao в Восточном квартале: сочные паровые гедза, поджаристые потстикеры, роллы с говядиной и лапша.',
    mrtStationRu: 'Метро Zhongxiao Fuxing (Выход 4)',
    tagsRu: ['Паровые пельмени', 'Хрустящие гедза', 'Любимое место местных'],
  },
  'bei-da-hang-xlb': {
    nameRu: 'Пельменная Bei Da Hang Xiao Long Bao (北大行小籠包)',
    overviewRu:
      'Традиционная закусочная рядом с Мемориалом Сунь Ятсена с домашними суповыми пельменями сяолунбао и кисло-острым супом.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 4)',
    tagsRu: ['Сяолунбао', 'Традиционный завтрак и обед', 'Синьи'],
  },
  'do-it-true-xinyi': {
    nameRu: 'Do It True — Пекинская кухня Мишлен (都一處 信義店)',
    overviewRu:
      'Ресторан севернокитайской кухни с 70-летней историей и наградой Michelin Bib Gourmand: знаменитые кунжутные лепешки с томленой свининой, шаомай и луковые блины.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 4)',
    tagsRu: ['Гид Мишлен Bib Gourmand', 'Кунжутные булочки', 'История 70 лет'],
  },
  'paradise-dynasty-xinyi': {
    nameRu: 'Paradise Dynasty — 8 цветных пельменей (樂天皇朝 信義店)',
    overviewRu:
      'Известный ресторан в ТЦ Breeze Xinyi, прославившийся корзинкой из 8 разноцветных пельменей сяолунбао (с трюфелем, фуа-гра, крабом, сыром, чесноком и сычуаньским перцем).',
    mrtStationRu: 'Метро Taipei City Hall (Выход 3, Breeze Xinyi 4 этаж)',
    tagsRu: ['Цветные сяолунбао 8 вкусов', 'ТЦ Breeze Xinyi'],
  },
  'changs-halal-beef-noodle': {
    nameRu: 'Халяльный суп с говяжьей лапшой Chang’s (張家清真黃牛肉麵館)',
    overviewRu:
      'Старинное сертифицированное халяльное кафе недалеко от Симыньдина с ароматным говяжьим супом с лапшой и хрустящими слоеными пирожками с говядиной.',
    mrtStationRu: 'Метро Beimen / Ximen',
    tagsRu: ['Сертификат Халяль', 'Тайваньский говяжий суп', 'Пирожки с говядиной'],
  },
  'hai-jiu-seafood': {
    nameRu: 'Морской ресторан Hai Jiu Penghu (海九澎湖海鮮餐廳)',
    overviewRu:
      'Ресторан свежайших морепродуктов, куда ежедневно самолетом доставляют живую рыбу, кальмаров и крабов с островов Пэнху.',
    mrtStationRu: 'Метро Nanjing Fuxing',
    tagsRu: ['Свежие морепродукты Пэнху', 'Тайваньский банкет'],
  },

  // 9. INDIAN, THAI & VIETNAMESE
  'mayur-indian-kitchen': {
    nameRu: 'Индийский ресторан и бар Mayur Indian Kitchen (馬友友印度餐酒館)',
    overviewRu:
      'Популярный современный индийский ресторан шефа Маюра с богатым выбором карри, блюдами из печи тандури, вегетарианским и халяльным меню и живой музыкой.',
    mrtStationRu: 'Метро Songjiang Nanjing / Zhongxiao Xinsheng',
    tagsRu: ['Индийское карри', 'Вегетарианское и Халяль', 'Тандури'],
  },
  'madras-magic-indian': {
    nameRu: 'Индийский ресторан Madras Magic',
    overviewRu:
      'Аутентичная южно- и североиндийская кухня: хрустящие блины доса, пряные карри, чесночный наан и шашлыки из тандыра.',
    mrtStationRu: 'Метро Nanjing Fuxing',
    tagsRu: ['Южная и Северная Индия', 'Доса и Наан', 'Суншань'],
  },
  'calcutta-indian-food': {
    nameRu: 'Индийское кафе Calcutta Indian Food (加爾各答印度料理)',
    overviewRu:
      'Уютный индийский ресторан прямо в Симыньдине: курица баттер-чикен, палак панир со шпинатом, бирьяни и свежие лепешки наан.',
    mrtStationRu: 'Метро Ximen',
    tagsRu: ['Индийская кухня', 'Симыньдин', 'Свежий наан'],
  },
  'ms-indian-restaurant': {
    nameRu: 'Индийский ресторан Ms Indian Restaurant (米斯印度餐廳)',
    overviewRu:
      'Гостеприимный индийский ресторан в районе Даань с традиционными карри, самосами, мясом тандури и лепешками.',
    mrtStationRu: 'Метро Dongmen / Zhongxiao Xinsheng',
    tagsRu: ['Индийское карри', 'Тандури и лепешки'],
  },
  'xiang-chu-thai': {
    nameRu: 'Тайский ресторан Xiang Chu (象廚泰式料理)',
    overviewRu:
      'Любимый местными ресторан тайской кухни в Даане: зеленое карри на кокосовом молоке, сибас на пару с лаймом и креветочные котлетки.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall / Xinyi Anhe',
    tagsRu: ['Тайская кухня', 'Морепродукты с лаймом', 'Даань'],
  },
  'a-zhun-vietnamese': {
    nameRu: 'Вьетнамская кухня A-Zhun (阿準越南料理)',
    overviewRu:
      'Высоко оцененное вьетнамское кафе в Баньцяо с большими порциями наваристого супа Фо-бо с говядиной и свежими спринг-роллами с креветками.',
    mrtStationRu: 'Метро Xinpu (Баньцяо)',
    tagsRu: ['Суп Фо-бо', 'Спринг-роллы', 'Баньцяо'],
  },

  // 10. MEDITERRANEAN & MIDDLE EASTERN
  'miznon-taipei': {
    nameRu: 'Средиземноморское бистро Miznon Taipei (米諾台北)',
    overviewRu:
      'Яркое тель-авивское бистро в районе Даань, знаменитое воздушными питами с сочными начинками, запеченной целиком цветной капустой и открытой кухней.',
    mrtStationRu: 'Метро Zhongxiao Dunhua',
    tagsRu: ['Питы с начинками', 'Запеченная цветная капуста', 'Средиземноморье'],
  },
  'hala-chicken': {
    nameRu: 'Hala Chicken — Курица с рисом по-нью-йоркски (大安創始店)',
    overviewRu:
      'Популярная уличная точка прямо у метро Daan: пряная халяльная курица-гриль на желтом рисе с фирменным белым чесночным и острым соусами.',
    mrtStationRu: 'Метро Daan (Выход 4)',
    tagsRu: ['Курица с рисом Халяль', 'Фирменный белый соус', 'Быстро и сытно'],
  },
  '1001-nights-taipei': {
    nameRu: 'Персидский ресторан 1001 Nights Taipei (一千零一夜廚房)',
    overviewRu:
      'Старейший ресторан персидской и ближневосточной кухни в Тайбэе с шафрановыми кебабами, гранатово-ореховым рагу фесенджан, хумусом и восточным колоритом.',
    mrtStationRu: 'Метро Nanjing Sanmin / Taipei Arena',
    tagsRu: ['Персидские кебабы', 'Халяль', 'Ближневосточная кухня'],
  },
  'toasteria-cafe': {
    nameRu: 'Средиземноморское кафе TOASTERiA CAFE (吐司利亞)',
    overviewRu:
      'Атмосферное многоэтажное кафе на улице Юнкан / Дуньнань с 40+ видами горячих панини на гриле, шакшукой на сковородке, хумусом и вином.',
    mrtStationRu: 'Метро Dongmen (Выход 5) / Zhongxiao Dunhua',
    tagsRu: ['Шакшука', 'Панини на гриле', 'Улица Юнкан'],
  },
  'abv-mediterranean-daan': {
    nameRu: 'Средиземноморский гастропаб ABV — Даань (ABV 地中海餐酒館)',
    overviewRu:
      'Флагманский гастропаб средиземноморских тапас, паэльи и пиццы с холодильной витриной на 300+ сортов крафтового пива со всего мира.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 2)',
    tagsRu: ['Тапас и паэлья', '300+ сортов пива', 'Работает допоздна'],
  },
  'greek-go': {
    nameRu: 'Греческая уличная еда Greek - Go! (希臘街頭美食)',
    overviewRu:
      'Непринужденное кафе с греческим гиросом, шашлычками сувлаки в теплой пите, соусом дзадзики и картофелем фри.',
    mrtStationRu: 'Метро Jiantan / Shilin',
    tagsRu: ['Гирос и сувлаки', 'Греческая пита'],
  },
  'taipei-souvlaki': {
    nameRu: 'Греческий гриль Taipei Souvlaki (希臘烤肉捲)',
    overviewRu:
      'Настоящая греческая уличная кухня: домашние питы, сувлаки на углях, греческий салат с фетой и густой соус дзадзики.',
    mrtStationRu: 'Метро Dongmen / Guting',
    tagsRu: ['Сувлаки в пите', 'Греческий салат'],
  },

  // 11. MEXICAN, BURGERS & PIZZA
  'pang-taqueria': {
    nameRu: 'Такерия Pàng Taqueria (胖塔可)',
    overviewRu:
      'Лучшая крафтовая такерия в районе Даань, где каждый день сами пекут кукурузные тортильи и подают сочные тако биррия с говяжьим бульоном и аль-пастор.',
    mrtStationRu: 'Метро Xinyi Anhe',
    tagsRu: ['Тако биррия с бульоном', 'Свежие тортильи', 'Даань'],
  },
  'macho-tacos-yanji': {
    nameRu: 'Мексиканское кафе Macho Tacos — Яньцзи (瑪丘墨式餅舖)',
    overviewRu:
      'Популярная мексиканская закусочная с большими буррито, кесадильями, начос и домашним напитком орчата.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 1)',
    tagsRu: ['Буррито и кесадильи', 'Мексиканский стритфуд'],
  },
  'aunt-sus-pizza': {
    nameRu: 'Пиццерия тетушки Су — Aunt Su’s Pizza House (蘇阿姨比薩屋)',
    overviewRu:
      'Легендарное заведение напротив Мемориала Сунь Ятсена (работает с 1991 года), знаменитое пышной пиццей с огромным слоем тягучего сыра и сочной жареной курицей.',
    insiderTipRu:
      'Хотя в названии слово «Пицца», абсолютно каждый столик заказывает баскет их фирменной хрустящей жареной курочки с картофельными дольками!',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 3)',
    tagsRu: ['Пышная сырная пицца', 'Легендарная жареная курица'],
  },
  'triple-t-burger': {
    nameRu: 'Бургерная и десерты TRIPLE T Burger / Dessert',
    overviewRu:
      'Уютное кафе в районе Синьи с сочными смэш-бургерами из говядины, молочными коктейлями и десертами.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall / City Hall',
    tagsRu: ['Сочные бургеры', 'Десерты', 'Синьи'],
  },

  // 12. BRUNCH, VEGAN, EUROPEAN & BUFFETS
  'baganhood-vegan': {
    nameRu: 'Веганский гастробар BaganHood Vegan Bistro (蔬食餐酒館)',
    overviewRu:
      'Модное растительное бистро рядом с парком Суншань: невероятные веганские бургеры, пицца с трюфелем, печеная цветная капуста и коктейли.',
    mrtStationRu: 'Метро Taipei City Hall / Sun Yat-Sen Memorial Hall',
    tagsRu: ['100% Веганское бистро', 'Рядом с парком Суншань', 'Хит Тайбэя'],
  },
  'red-room-rendezvous': {
    nameRu: 'Веганский гастропаб Red Room Rendezvous (紅房餐酒館)',
    overviewRu:
      'Творческий веганский гастропаб и интернациональное пространство в Даане с авторской западной, тайваньской и средиземноморской кухней.',
    mrtStationRu: 'Метро Liuzhangli / Technology Building',
    tagsRu: ['Веган-гастропаб', 'Живое общение', 'Коктейли'],
  },
  'zhen-fang-brunch': {
    nameRu: 'Тайваньские завтраки Zhen Fang Brunch (真芳 碳烤吐司)',
    overviewRu:
      'Любимое место для завтрака в переулках Сунъянь: молочные тосты на углях со свиной котлетой и чеддером, нежные яичные блинчики даньбин и чай с молоком.',
    mrtStationRu: 'Метро Taipei City Hall (Выход 1)',
    tagsRu: ['Тосты на углях', 'Блинчики даньбин', 'Лучший тайваньский завтрак'],
  },
  'nextdoor-brunch-banqiao': {
    nameRu: 'Бранч-кафе NextDoor — Баньцяо (隔壁早餐)',
    overviewRu:
      'Популярное утреннее кафе в Баньцяо с сытными сэндвичами, роллами, хашбраунами и тайваньскими завтраками.',
    mrtStationRu: 'Метро Jiangzicui / Xinpu',
    tagsRu: ['Завтраки и бранчи', 'Баньцяо'],
  },
  'second-floor-cafe-ntnu': {
    nameRu: 'Кафе американских бранчей Second Floor Cafe — Шида (貳樓)',
    overviewRu:
      'Просторный семейный и pet-friendly ресторан рядом с университетом NTNU с огромным меню американских завтраков, пасты и панкейков весь день.',
    mrtStationRu: 'Метро Taipower Building / Guting',
    tagsRu: ['Бранчи весь день', 'Район Шида', 'Большие порции'],
  },
  'guang-yi-no-4': {
    nameRu: 'Стеклянная оранжерея Guang Yi No. 4 (光一肆號)',
    overviewRu:
      'Красивый ресторан в белом стеклянном доме среди деревьев рядом с университетом NTU: полезные боулы, бранчи, паста, стейки и кофе.',
    mrtStationRu: 'Метро Gongguan / Taipower Building',
    tagsRu: ['Белый стеклянный дом', 'Красивый интерьер', 'Бранч у NTU'],
  },
  'rain-man-boulangerie': {
    nameRu: 'Пекарня-бистро Rain Man Boulangerie (雨人麵包餐館)',
    overviewRu:
      'Уютное европейское бистро-пекарня с ремесленным хлебом ручной работы, тартинами, супами и горячими блюдами.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall / City Hall',
    tagsRu: ['Ремесленный хлеб', 'Европейское бистро', 'Синьи'],
  },
  'lukas-tree-bistro': {
    nameRu: 'Французское бистро Lukas Tree (蘆卡樹法式小館)',
    overviewRu:
      'Камерное французское бистро в Баньцяо с утиным конфи, томленым мясом, сезонными закусками и винной картой.',
    mrtStationRu: 'Метро Banqiao',
    tagsRu: ['Французская кухня', 'Уютный ужин', 'Баньцяо'],
  },
  'camping-cuisine': {
    nameRu: 'Кемпинг-ресторан Camping Cuisine (露營風餐廳)',
    overviewRu:
      'Необычный тематический ресторан в атмосфере лесного кемпинга с палатками, походными креслами и блюдами на чугунных сковородках.',
    mrtStationRu: 'Метро Taipei Arena / Zhongxiao Dunhua',
    tagsRu: ['Атмосфера кемпинга', 'Еда на чугунной сковороде'],
  },
  'youmeca-restaurant': {
    nameRu: 'Ресторан японских бранчей и кофе YOUMECA — Флагман Чжунсяо (YOUMECA 夢珈忠孝旗艦店)',
    overviewRu:
      'Флагманский японский ресторан и спешелти-кафе YOUMECA (夢珈忠孝旗艦店 от японской компании Sanyo Industry / CAFEC) в гастрономическом переулке Lane 216 в Даане: сытные японские бранч-сеты с запеченной куриной ножкой и су-вид грудкой, японское карри, паста, воздушные шифоновые торты, пудинг и эталонный пуровер-кофе в светлом дворике.',
    insiderTipRu:
      'Находится в знаменитом переулке Lane 216 (Zhongxiao E. Rd Sec. 4) всего в 10 минутах пешком от вашего дома на улице Yixian Rd в Синьи; есть уютная терраса.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall (Выход 2) / Zhongxiao Dunhua (Выход 3)',
    recommendedDurationRu: '1–1.5 часа',
    tagsRu: ['Youmeca Restaurant', 'Японские бранчи и карри', 'Кофе CAFEC', '10 мин от дома в Синьи'],
  },
  'eatogether-xinyi': {
    nameRu: 'Премиум-буфет Eatogether — Синьи (饗食天堂 信義・京站・板橋)',
    overviewRu:
      'Знаменитый тайваньский буфет «все включено» в ТЦ ATT 4 FUN (а также филиалы в Q Square и Баньцяо): сашими, ростбиф, морепродукты, темпура, димсамы и десерты.',
    mrtStationRu: 'Метро Taipei 101 / City Hall (ATT 4 FUN, 6 этаж)',
    tagsRu: ['Шведский стол без лимита', 'Морепродукты и суши', '3 филиала'],
  },
  'regent-brasserie': {
    nameRu: 'Буфет Brasserie в 5★ отеле Regent Taipei (晶華酒店 栢麗廳)',
    overviewRu:
      'Роскошный ресторан-буфет в пятизвездочном отеле Regent Taipei с панорамными окнами в сад, свежими морепродуктами, стейками и французской кондитерской.',
    mrtStationRu: 'Метро Zhongshan (Выход 3)',
    tagsRu: ['Буфет в 5★ отеле', 'Морские деликатесы', 'Чжуншань'],
  },

  // 13. CAFÉS, TEA HOUSES & DESSERTS
  'cafe-costumice': {
    nameRu: 'Кафе с двориком Costumice Café (Даань)',
    overviewRu:
      'Атмосферное кафе с зеленым внутренним двориком в тихом переулке Восточного квартала: фильтр-кофе, домашние десерты и уютные вечера.',
    mrtStationRu: 'Метро Zhongxiao Dunhua (Выход 2)',
    tagsRu: ['Уютный дворик', 'Работает допоздна', 'Кофе и десерты'],
  },
  'barista-ray-coffee': {
    nameRu: 'Кофейня Barista Ray Coffee — Кофе с гуавой (睿咖啡)',
    overviewRu:
      'Спешелти-кофейня чемпиона бариста в районе Даань, прославившаяся фирменным холодным американо со свежим соком тайваньской гуавы («芭樂咖啡»).',
    insiderTipRu:
      'Обязательно закажите Guava Americano — сочетание сладкой тайваньской гуавы и цветочного эспрессо освежает в любую погоду.',
    mrtStationRu: 'Метро Zhongxiao Dunhua / Zhongxiao Fuxing',
    tagsRu: ['Американо с гуавой', 'Спешелти кофе', 'Даань'],
  },
  'hermits-hut': {
    nameRu: 'Чайный дом Hermit’s Hut (三徑就荒)',
    overviewRu:
      'Эстетичное современное чайное пространство рядом с парком Суншань, где подают коллекционные тайваньские улуны с карточками заваривания и изящными чайными сладостями.',
    mrtStationRu: 'Метро Taipei City Hall (Выход 1)',
    tagsRu: ['Тайваньский улун', 'Чайная церемония', 'Дзен-интерьер'],
  },
  'kai-men-cha-dang': {
    nameRu: 'Чайная гостиная Kai Men Cha Dang (開門茶堂)',
    overviewRu:
      'Светлая уютная чайная в зеленом районе Миньшэн с дегустационными сетами высокогорного чая, пирожными с таро и пряными чайными яйцами.',
    mrtStationRu: 'Метро Taipei Arena / Nanjing Sanmin',
    tagsRu: ['Чайные сеты с выпечкой', 'Район Миньшэн'],
  },
  'wistaria-tea-house': {
    nameRu: 'Исторический чайный дом Wistaria (紫藤盧 и чайные Тайбэя)',
    overviewRu:
      'Знаменитый деревянный чайный дом 1920-х годов рядом с лесопарком Даань (а также рекомендованные чайные South Street Delight на улице Дихуа и Mikazuki).',
    mrtStationRu: 'Метро Taipower Building / Technology Building',
    tagsRu: ['Памятник истории', 'Традиционный чай', 'Даань'],
  },
  'bremen-tea-house': {
    nameRu: 'Чайный дом Bremen Tea House (不萊梅茶館)',
    overviewRu:
      'Уютное чайное кафе с большой картой листового и фруктового чая, а также домашней запеченной лазаньей и пастой.',
    mrtStationRu: 'Метро Jiantan / Shilin',
    tagsRu: ['Листовой чай', 'Запеченная лазанья', 'Шилинь'],
  },
  'meet-fresh-syntrend': {
    nameRu: 'Тайваньские десерты Meet Fresh — ТЦ Syntrend (鮮芋仙 三創店)',
    overviewRu:
      'Фирменная тайваньская десертная с жевательными шариками из таро и батата, травяным желе сяньцао, тофу-пудингом и струганым льдом.',
    mrtStationRu: 'Метро Zhongxiao Xinsheng (Выход 1)',
    tagsRu: ['Шарики из таро', 'Травяное желе и лед', 'Тайваньский десерт'],
  },
  'meow-house-cat-cafe': {
    nameRu: 'Котокафе Meow House (喵喵屋中途貓咪咖啡廳)',
    overviewRu:
      'Доброе котокафе с вафлями, панини и напитками, где живут спасенные ласковые котики, которым ищут новый дом.',
    mrtStationRu: 'Метро Zhongxiao Xinsheng',
    tagsRu: ['Котокафе', 'Вафли и кофе', 'Уютно'],
  },
  'museum-50-coffee': {
    nameRu: 'Ретро-кафе Museum 50 Coffee (50年代博物館咖啡)',
    overviewRu:
      'Ностальгическое кафе-музей 1950-х годов, полное винтажных игрушек, пластинок и плакатов, где подают домашние тайваньские обеды и кофе из сифона.',
    mrtStationRu: 'Метро Sun Yat-Sen Memorial Hall / Taipei 101',
    tagsRu: ['Музей ретро 1950-х', 'Кофе в сифоне', 'Необычное место'],
  },
  'youmeca-coffee': {
    nameRu: 'Кофейня и кондитерская YOUMECA (夢珈・夢卡朵)',
    overviewRu:
      'Японская кофейня ручной заварки (CAFEC) и кондитерская с нежнейшими бисквитными рулетами, шифоновыми пирожными и свежеобжаренным зерном.',
    mrtStationRu: 'Метро Zhongxiao Dunhua (Выход 3) / Sun Yat-Sen Memorial Hall',
    recommendedDurationRu: '45–90 мин',
    tagsRu: ['Youmeca Coffee', 'Фильтр-кофе CAFEC', 'Бисквитные рулеты'],
  },
  'yogo-dessert': {
    nameRu: 'Замороженный йогурт и десерты Yogo (優格霜淇淋)',
    overviewRu:
      'Освежающее кафе замороженного йогурта со свежими тропическими фруктами в районе Даань.',
    mrtStationRu: 'Метро Zhongxiao Dunhua',
    tagsRu: ['Замороженный йогурт', 'Свежие фрукты'],
  },
  'chun-shui-tang-xinyi': {
    nameRu: 'Чайный дом Chun Shui Tang — Синьи A9 (Родина Бабл-ти / 珍珠奶茶創始店)',
    overviewRu:
      'Легендарный тайваньский чайный дом, где в 1987 году изобрели оригинальный Bubble Milk Tea с жемчужинами тапиоки (珍珠奶茶)! Находится на этаже B1 универмага Shin Kong Mitsukoshi A9 в Синьи (рядом с вашим домом). Подают знаменитый взбитый чай с молоком и тапиокой, лапшу кунг-фу и редьковый пирог.',
    insiderTipRu:
      'Закажите классический холодный чай с молоком и тапиокой (冰珍珠奶茶) с половинным сахаром и меньшим количеством льда («半糖少冰» — бань тан шао бин).',
    mrtStationRu: 'Метро Taipei City Hall (Выход 3) / Taipei 101 (Выход 4)',
    recommendedDurationRu: '45–75 мин',
    tagsRu: ['Изобретатели Бабл-ти', 'Chun Shui Tang', 'Синьи A9', 'Жемчужины тапиоки'],
  },
  'saint-peter-nougat-yongkang': {
    nameRu: 'Нуга-крекеры Saint Peter и Laetitia на улице Юнкан (蔥軋餅・牛軋餅)',
    overviewRu:
      'Знаменитые пекарни тайваньских нуга-крекеров на улице Юнкан в районе Даань (Saint Peter 聖比德 и Laetitia 甜滿). Хрустящие солоноватые крекеры с зеленым луком и нежной тягучей молочной или кофейной нугой внутри — главный гастрономический сувенир Тайбэя!',
    insiderTipRu:
      'В Saint Peter дают бесплатно попробовать кофейные и луковые нуга-крекеры. Дома прогрейте крекер 6 секунд в микроволновке — нуга станет теплой и тягучей!',
    mrtStationRu: 'Метро Dongmen (Выход 5, 1 мин пешком)',
    recommendedDurationRu: '15–30 мин',
    tagsRu: ['Нуга-крекеры', 'Луковые крекеры с нугой', 'Улица Юнкан', 'Лучший сувенир'],
  },
  'chiate-bakery-pineapple': {
    nameRu: 'Пекарня ChiaTe — №1 ананасовые пирожные и нуга-крекеры (佳德鳳梨酥・蔥軋餅)',
    overviewRu:
      'Самая знаменитая кондитерская Тайбэя на Nanjing E. Rd Sec. 5 (всего 6 минут на такси от вашего дома в Синьи). Обладатель золотых медалей за рассыпчатые ананасовые пирожные (鳳梨酥), пирожные с ананасом и соленым желтком (鳳黃酥) и свежайшие луковые крекеры с нугой (蔥軋餅).',
    insiderTipRu:
      'Приходите к 08:30–09:30 утра — в это время нет очереди, а на полках еще есть свежие утренние коробки луковых нуга-крекеров (蔥軋餅), которые разбирают к обеду!',
    mrtStationRu: 'Метро Nanjing Sanmin (Зеленая ветка, Выход 2)',
    recommendedDurationRu: '20–40 мин',
    tagsRu: ['Ананасовые пирожные', 'Нуга-крекеры ChiaTe', 'Сувениры №1', 'Суншань'],
  },
  'raohe-night-market': {
    nameRu: 'Ночной рынок Жаохэ — Перцовые булочки из тандыра и стритфуд (饒河街夜市・胡椒餅)',
    overviewRu:
      'Один из старейших и самых вкусных ночных рынков Тайбэя (600 метров у красивейшего храма Цыю в Суншане, в 8 минутах от Синьи). Главный хит у входа — отмеченные гидом Мишлен хрустящие булочки с перченой свининой и зеленым луком из угольной глиняной печи (福州世祖胡椒餅).',
    insiderTipRu:
      'Выходите со станции метро Songshan (Выход 5) прямо к восточным воротам рынка и сразу вставайте в быструю очередь за горячей перцовой булочкой (胡椒餅, NT$65).',
    mrtStationRu: 'Метро Songshan (Выход 5, прямо у входа на рынок)',
    recommendedDurationRu: '1,5–2,5 часа',
    tagsRu: ['Ночной рынок Жаохэ', 'Перцовые булочки', 'Гид Мишлен', 'Уличная еда'],
  },
  'fuhang-soy-milk': {
    nameRu: 'Традиционный завтрак Fuhang Soy Milk — Мишлен (阜杭豆漿・傳統早餐)',
    overviewRu:
      'Самая легендарная точка тайваньских завтраков в Тайбэе (с 1958 года, гид Мишлен Bib Gourmand) на 2-м этаже рынка Хуашань. Славится горячим пикантным соевым молоком (鹹豆漿), карамельными лепешками из тандыра с яйцом и хворостом ютяо (厚餅夾蛋油條) и рисовыми роллами фаньтуань (飯糰).',
    insiderTipRu:
      'Прямая Синяя ветка метро от вашего дома в Синьи до станции Shandao Temple (Выход 5). Через стекло открытой кухни видно, как пекари лепят лепешки на стенки раскаленных угольных печей!',
    mrtStationRu: 'Метро Shandao Temple (Синяя ветка, Выход 5)',
    recommendedDurationRu: '45–75 мин',
    tagsRu: ['Тайваньский завтрак', 'Соевое молоко', 'Лепешки Шаобин', 'Гид Мишлен'],
  },
  'lihpao-land-taichung': {
    nameRu: 'Курорт и парк аттракционов Липао Лэнд — Тайчжун (麗寶樂園渡假區・台中)',
    overviewRu:
      'Крупнейший парк развлечений и курортный комплекс Тайваня в районе Хоули города Тайчжун (Taizhong, 200 гектаров). Включает парк аттракционов Discovery World (с уникальными американскими горками Gravity Max с вертикальным сбросом рельса на 90°), аквапарк Mala Bay с гигантской волной, самое большое колесо обозрения Тайваня Sky Dream (120 м), итальянский аутлет-молл и международный автодром для картинга.',
    insiderTipRu:
      'Садитесь на скоростной поезд HSR на Главном вокзале Тайбэя или в Баньцяо до станции HSR Taichung (~47 минут), а оттуда — на бесплатный шаттл Lihpao Resort (бронируется онлайн) или городской автобус №155 прямо до ворот парка!',
    mrtStationRu: 'Скоростной поезд HSR до Тайчжуна (47 мин из Тайбэя) + бесплатный шаттл Lihpao / автобус №155',
    recommendedDurationRu: 'Весь день (6–8 часов)',
    tagsRu: ['Парк аттракционов', 'Тайчжун (Taizhong)', 'Американские горки', 'Аквапарк', 'Колесо обозрения'],
  },
};

export const ITINERARIES_RU: CuratedItinerary[] = [
  {
    id: 'day-1-xinyi-icons',
    title: 'День 1: Район Синьи, башня Тайбэй 101 и закат на Горе Слона',
    subtitle: 'Креативные парки, легендарные пельмени сяолунбао и лучший закат с видом на небоскребы.',
    duration: 'Весь день (09:30 – 22:00)',
    bestFor: 'Первое знакомство с Тайбэем и панорамные фото',
    themeColor: '#C2410C',
    stops: [
      {
        timeOfDay: '09:30 · Завтрак',
        placeId: 'zhen-fang-brunch',
        activityNote: 'Начните утро с тостов на углях с чеддером и традиционных яичных блинчиков даньбин в переулках Сунъянь.',
      },
      {
        timeOfDay: '10:45 · Прогулка и дизайн',
        placeId: 'songshan-cultural-park',
        activityNote: 'Прогуляйтесь по выставочным залам бывшей табачной фабрики 1937 года, саду в стиле барокко и магазину Eslite Spectrum.',
      },
      {
        timeOfDay: '13:00 · Чайная пауза',
        placeId: 'hermits-hut',
        activityNote: 'Попробуйте ароматный высокогорный тайваньский улун в дизайнерской чайной рядом с парком.',
      },
      {
        timeOfDay: '14:30 · Парк и отражение 101',
        placeId: 'sun-yat-sen-memorial',
        activityNote: 'Пройдитесь по парку Мемориала Сунь Ятсена и сделайте фото башни Тайбэй 101 у озера Цуйху.',
      },
      {
        timeOfDay: '16:30 · Подъем к закату',
        placeId: 'elephant-mountain',
        activityNote: 'Поднимитесь по тропе Сяншань за 45 минут до заката, чтобы увидеть, как зажигаются огни Тайбэй 101.',
      },
      {
        timeOfDay: '18:45 · Знаменитый ужин',
        placeId: 'din-tai-fung-101',
        activityNote: 'Поужинайте пельменями сяолунбао в Din Tai Fung 101 (или выберите мишленовский Fujin Tree / хого Haidilao).',
      },
      {
        timeOfDay: '20:45 · Вечерний кофе и десерты во дворике',
        placeId: 'cafe-costumice',
        activityNote: 'Завершите вечер фильтр-кофе и домашним десертом в уютном зеленом дворике Costumice Café.',
      },
    ],
  },
  {
    id: 'day-2-daan-westside-tamsui',
    title: 'День 2: Лесопарк Даань, закат в Даньшуе и огни Симыньдина',
    subtitle: 'Зеленый оазис в центре города, кофе с гуавой, старинный речной порт и вечерний стритфуд.',
    duration: 'Весь день (10:00 – 22:30)',
    bestFor: 'Любители прогулок, кофеен и уличной еды',
    themeColor: '#0F766E',
    stops: [
      {
        timeOfDay: '10:00 · Утро в парке',
        placeId: 'daan-forest-park',
        activityNote: 'Неспешная прогулка среди баньянов и пруда с цаплями в главном парке Тайбэя.',
      },
      {
        timeOfDay: '12:00 · Обед по гиду Мишлен',
        placeId: 'moon-moon-food',
        activityNote: 'Попробуйте знаменитый куриный суп с моллюсками в Moon Moon Food (или шакшуку в TOASTERiA).',
      },
      {
        timeOfDay: '14:00 · Необычный кофе',
        placeId: 'barista-ray-coffee',
        activityNote: 'Возьмите фирменный холодный американо со свежим соком гуавы в Barista Ray Coffee.',
      },
      {
        timeOfDay: '16:00 · Закат на набережной',
        placeId: 'tamsui',
        activityNote: 'Доедьте по Красной ветке метро до Даньшуя: старая улица, форт Сан-Доминго и закат над проливом.',
      },
      {
        timeOfDay: '19:30 · Неоновый квартал',
        placeId: 'ximending',
        activityNote: 'Окунитесь в атмосферу вечернего Симыньдина с уличными артистами и маркетом у Красного дома.',
      },
      {
        timeOfDay: '21:00 · Горячий ужин',
        placeId: 'haidilao-ximen',
        activityNote: 'Ужин с четырьмя бульонами в Haidilao Ximen или индийское карри в Calcutta Indian Food.',
      },
    ],
  },
  {
    id: 'day-3-zoo-maokong-south',
    title: 'День 3: Панды в Зоопарке, канатная дорога Маокун и озеро Битань',
    subtitle: 'Кабинка со стеклянным полом над чайными холмами, подвесной мост и студенческий рынок.',
    duration: 'Весь день (09:30 – 21:00)',
    bestFor: 'Природа, чайные плантации и семейный отдых',
    themeColor: '#15803D',
    stops: [
      {
        timeOfDay: '09:30 · Гигантские панды',
        placeId: 'taipei-zoo',
        activityNote: 'Посетите павильон панд, панголинов и тропический лес в Тайбэйском зоопарке.',
      },
      {
        timeOfDay: '13:30 · Канатная дорога и чай',
        placeId: 'maokong',
        activityNote: 'Поднимитесь в стеклянной кабинке Crystal Cabin в деревню Маокун на чай Тегуаньинь с видом на горы.',
      },
      {
        timeOfDay: '16:30 · Изумрудное озеро',
        placeId: 'bitan-scenic-area',
        activityNote: 'Переезжайте на метро Xindian к озеру Битань: пройдитесь по подвесному мосту и покатайтесь на катамаране.',
      },
      {
        timeOfDay: '18:30 · Вечер у университета NTU',
        placeId: 'gongguan',
        activityNote: 'Загляните на ночной рынок Гунгуань или в стеклянный ресторан Guang Yi No. 4.',
      },
      {
        timeOfDay: '20:00 · Тост в 20:00',
        placeId: 'kanpai-main',
        activityNote: 'Пожарьте мраморную говядину на углях и поднимите бокалы со всем залом в Kanpai Yakiniku.',
      },
    ],
  },
  {
    id: 'day-4-mountains-jiufen',
    title: 'День 4: Вулканы Янминшаня и вечерние фонарики Цзюфэня',
    subtitle: 'Туманное Озеро Мечты, дымящиеся фумаролы и старинный город на скалах у океана.',
    duration: 'Весь день (09:00 – 21:00)',
    bestFor: 'Горные пейзажи и атмосферные фотографии',
    themeColor: '#7C2D12',
    stops: [
      {
        timeOfDay: '09:00 · Национальный парк',
        placeId: 'yangmingshan-np',
        activityNote: 'Посмотрите дымящиеся серные источники Сяоюкэн и зеленые холмы Цинтяньган.',
      },
      {
        timeOfDay: '11:00 · Озеро в облаках',
        placeId: 'monghuan-lake',
        activityNote: 'Поднимитесь за 20 минут к смотровой площадке над туманным озером Мэнхуань (Dream Lake).',
      },
      {
        timeOfDay: '12:45 · Вид с горного хребта',
        placeId: 'chinese-culture-university',
        activityNote: 'Остановитесь у Университета китайской культуры с панорамным видом на долину Тайбэя.',
      },
      {
        timeOfDay: '16:00 · Красные фонарики Цзюфэня',
        placeId: 'jiufen-old-street',
        activityNote: 'Поезжайте на автобусе №965 в горный Цзюфэнь пить чай над океаном и встречать сумерки.',
      },
      {
        timeOfDay: '20:00 · Сытный ужин в городе',
        placeId: 'aunt-sus-pizza',
        activityNote: 'Вернитесь в Тайбэй за легендарной хрустящей курочкой и пиццей у Тетушки Су (или в Dubu House Songshan).',
      },
    ],
  },
];

export const UNVERIFIED_NOTES_RU: UnverifiedNote[] = [
  {
    name: 'Lao Mo Mexican (老墨塔可 / Уличный киоск с тако)',
    status: 'Небольшой киоск или старое название',
    suggestion:
      'Стационарного ресторана с названием «Lao Mo Mexican» на картах нет — вероятно, это фудтрак. За лучшими проверенными тако в Тайбэе отправляйтесь в Pàng Taqueria (Даань) или Macho Tacos (Яньцзи).',
    searchQueryUrl: 'https://maps.google.com/?q=Pang+Taqueria+Taipei',
  },
  {
    name: 'Yusuan / Bagua Restaurant (район горы Янминшань)',
    status: 'Панорамный ресторан на горе Янминшань',
    suggestion:
      '«Yusuan / Bagua» у Янминшаня, скорее всего, относится к видовым ресторанам на склоне за Университетом культуры — таким как The Top (屋頂上), Bagua Night View или Grass Mountain Chateau (草山行館).',
    searchQueryUrl: 'https://maps.google.com/?q=陽明山景觀餐廳',
  },
];

export function getLocalizedSubCategory(sub: SubCategory, lang: Language): string {
  return lang === 'ru' ? SUBCATEGORY_RU[sub] || sub : sub;
}

export function getLocalizedDistrict(district: string, lang: Language): string {
  return lang === 'ru' ? DISTRICT_RU[district] || district : district;
}

export function getLocalizedCity(
  city: 'Taipei' | 'New Taipei' | 'Taichung',
  lang: Language
): string {
  return lang === 'ru' ? CITY_RU[city] || city : city;
}

export function getLocalizedBaseLocation(
  base: BaseLocation,
  lang: Language
): { name: string; district: string } {
  if (lang === 'ru' && BASE_LOCATION_RU[base.id]) {
    return {
      name: BASE_LOCATION_RU[base.id].nameRu,
      district: BASE_LOCATION_RU[base.id].districtRu,
    };
  }
  return { name: base.name, district: base.district };
}

export function getLocalizedPlaceText(place: PlaceItem, lang: Language) {
  const ru = PLACE_TRANSLATIONS_RU[place.id];
  if (lang === 'ru' && ru) {
    return {
      displayName: ru.nameRu,
      secondaryName: `${place.chineseName} · ${place.name}`,
      overview: ru.overviewRu,
      insiderTip: ru.insiderTipRu ?? place.insiderTip,
      mrtStation: ru.mrtStationRu ?? place.mrtStation,
      recommendedDuration: ru.recommendedDurationRu ?? place.recommendedDuration,
      tags: ru.tagsRu.length > 0 ? ru.tagsRu : place.tags,
      subCategoryLabel: getLocalizedSubCategory(place.subCategory, 'ru'),
      districtLabel: getLocalizedDistrict(place.district, 'ru'),
      cityLabel: getLocalizedCity(place.city, 'ru'),
    };
  }

  return {
    displayName: place.name,
    secondaryName: place.chineseName,
    overview: place.overview,
    insiderTip: place.insiderTip,
    mrtStation: place.mrtStation,
    recommendedDuration: place.recommendedDuration,
    tags: place.tags,
    subCategoryLabel: place.subCategory,
    districtLabel: place.district,
    cityLabel: place.city,
  };
}

export function getLocalizedItineraries(lang: Language): CuratedItinerary[] {
  return lang === 'ru' ? ITINERARIES_RU : CURATED_ITINERARIES;
}

export function getLocalizedUnverifiedNotes(lang: Language): UnverifiedNote[] {
  return lang === 'ru' ? UNVERIFIED_NOTES_RU : UNVERIFIED_NOTES;
}
