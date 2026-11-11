export type EventCategory =
  | 'all'
  | 'nye_countdown'
  | 'christmas_lights'
  | 'concerts_shows'
  | 'markets_culture'
  | 'day_trips';

export type EventDatePhase = 'all' | 'xmas_week' | 'nye_peak' | 'jan_week';

export interface FestiveEventItem {
  id: string;
  category: Exclude<EventCategory, 'all'>;
  datePhase: EventDatePhase[];
  isMustSee?: boolean;
  titleEn: string;
  titleRu: string;
  titleZh: string;
  dateRangeEn: string;
  dateRangeRu: string;
  timeWindowEn: string;
  timeWindowRu: string;
  cityEn: string;
  cityRu: string;
  venueEn: string;
  venueRu: string;
  venueZh: string;
  priceBadgeEn: string;
  priceBadgeRu: string;
  descriptionEn: string;
  descriptionRu: string;
  highlightsEn: string[];
  highlightsRu: string[];
  proTipEn: string;
  proTipRu: string;
  placeIds: string[];
  googleMapsUrl: string;
  officialUrl: string;
}

export const EVENT_CATEGORIES: Array<{
  id: EventCategory;
  labelEn: string;
  labelRu: string;
  emoji: string;
}> = [
  {
    id: 'all',
    labelEn: 'All Events (Dec 22 – Jan 7)',
    labelRu: 'Все события (22 дек – 7 янв)',
    emoji: '✨',
  },
  {
    id: 'nye_countdown',
    labelEn: 'New Year & Fireworks',
    labelRu: 'Новый год и салюты',
    emoji: '🎆',
  },
  {
    id: 'christmas_lights',
    labelEn: 'Christmas & Light Shows',
    labelRu: 'Рождество и огни',
    emoji: '🎄',
  },
  {
    id: 'concerts_shows',
    labelEn: 'Concerts & Shows',
    labelRu: 'Концерты и шоу',
    emoji: '🎸',
  },
  {
    id: 'markets_culture',
    labelEn: 'Markets & Pop-Ups',
    labelRu: 'Ярмарки и выставки',
    emoji: '🎨',
  },
  {
    id: 'day_trips',
    labelEn: 'Winter Escapes & Nearby Cities',
    labelRu: 'Поездки и соседние города',
    emoji: '🏮',
  },
];

export const EVENT_DATE_PHASES: Array<{
  id: EventDatePhase;
  labelEn: string;
  labelRu: string;
}> = [
  { id: 'all', labelEn: 'All Dates (Dec 22 – Jan 7)', labelRu: 'Все даты (22 дек – 7 янв)' },
  { id: 'xmas_week', labelEn: 'Dec 22 – Dec 28 (Xmas Week)', labelRu: '22 – 28 дек (Рождество)' },
  { id: 'nye_peak', labelEn: 'Dec 29 – Jan 1 (New Year Peak)', labelRu: '29 дек – 1 янв (Новый год)' },
  { id: 'jan_week', labelEn: 'Jan 1 – Jan 7 (First Week of Jan)', labelRu: '1 – 7 янв (Январские дни)' },
];

export const FESTIVE_EVENTS: FestiveEventItem[] = [
  {
    id: 'taipei-101-nye-fireworks',
    category: 'nye_countdown',
    datePhase: ['xmas_week', 'nye_peak'],
    isMustSee: true,
    titleEn: 'Taipei 101 Midnight Fireworks & Laser Light Show',
    titleRu: 'Новогодний салют и лазерное шоу на башне Тайбэй 101',
    titleZh: '台北101跨年煙火大秀・光雕投影',
    dateRangeEn: 'Dec 27 – Jan 1 (Fireworks at Midnight Dec 31)',
    dateRangeRu: '27 дек – 1 янв (Главный салют в полночь 31 дек)',
    timeWindowEn: 'Nightly projections 18:00–22:00 · NYE Fireworks 00:00',
    timeWindowRu: 'Проекции 18:00–22:00 · Салют в 00:00 (31 дек)',
    cityEn: 'Taipei · Xinyi District',
    cityRu: 'Тайбэй · район Синьи',
    venueEn: 'Taipei 101, Sun Yat-sen Memorial Hall & Elephant Mountain',
    venueRu: 'Башня Тайбэй 101, Мемориал Сунь Ятсена и Гора Слона',
    venueZh: '台北101 / 國父紀念館 / 象山',
    priceBadgeEn: 'Free Outdoor Show',
    priceBadgeRu: 'Бесплатно',
    descriptionEn:
      'One of the world’s most iconic New Year’s Eve spectacles right in your Xinyi neighborhood! From Dec 27 through Dec 31, Taipei 101 lights up nightly with giant countdown laser projections, culminating at midnight on Dec 31 in a 300+ second 360-degree skyscraper firework and T-Pad LED mesh show.',
    descriptionRu:
      'Одно из самых знаменитых новогодних шоу планеты прямо в вашем районе Синьи! С 27 по 31 декабря фасад Тайбэй 101 каждый вечер светится праздничными лазерными проекциями, а в полночь 31 декабря вся 508-метровая башня вспыхивает 5-минутным панорамным фейерверком на 360° и светомузыкой.',
    highlightsEn: [
      '5+ minutes of 360° low-smoke pyrotechnics, synchronized beams, and music',
      'Best upwind viewing (clear of smoke): Sun Yat-sen Memorial Hall Cui Lake & Songshan Cultural Park',
      'Walkable straight back to your Xinyi stay near Brownies in 8 minutes without needing a taxi!',
    ],
    highlightsRu: [
      'Более 5 минут панорамного фейерверка на 360°, лазерных лучей и музыки со всех этажей небоскреба',
      'Лучшие точки с наветренной стороны (без дыма): озеро Цуйху у Мемориала Сунь Ятсена и парк Суншань',
      'От вашего дома в Синьи (у Brownies) до лучших точек обзора — всего 5–8 минут пешком!',
    ],
    proTipEn:
      'Winter wind in Taipei blows from the Northeast (동북풍)—always stand North or East of Taipei 101 (near Sun Yat-sen Memorial Hall, City Hall Plaza, or Songshan Cultural Park) so the firework smoke blows away from you!',
    proTipRu:
      'Зимой ветер в Тайбэе дует с северо-востока — обязательно вставайте к северу или востоку от башни Тайбэй 101 (у Мемориала Сунь Ятсена, площади Мэрии или парка Суншань), чтобы дым от салюта относило в противоположную сторону!',
    placeIds: ['taipei-101', 'sun-yat-sen-memorial', 'elephant-mountain', 'xinyi-district'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+101+Fireworks+Viewpoint+Xinyi',
    officialUrl: 'https://www.newyear.taipei/',
  },
  {
    id: 'taipei-nye-city-concert',
    category: 'concerts_shows',
    datePhase: ['nye_peak'],
    isMustSee: true,
    titleEn: 'Taipei Most High New Year City — 6-Hour Countdown Concert',
    titleRu: 'Главный новогодний концерт «Taipei Most High New Year City»',
    titleZh: '臺北最High新年城 跨年晚會演唱會',
    dateRangeEn: 'Dec 31, 19:00 – Jan 1, 01:00',
    dateRangeRu: '31 декабря (19:00) – 1 января (01:00)',
    timeWindowEn: '6-Hour Live Open-Air Festival (Free Entry)',
    timeWindowRu: '6-часовой опен-эйр концерт (вход свободный)',
    cityEn: 'Taipei · Xinyi City Hall Plaza',
    cityRu: 'Тайбэй · площадь Мэрии в Синьи',
    venueEn: 'Taipei City Hall Civic Plaza (5 mins from your Xinyi stay)',
    venueRu: 'Площадь Мэрии Тайбэя (5 мин пешком от дома в Синьи)',
    venueZh: '臺北市政府前廣場 (市民廣場)',
    priceBadgeEn: 'Free Admission',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'Taiwan’s biggest annual open-air music festival right outside Taipei City Hall! Top Mandopop stars, indie rock bands, and international/K-pop headliners perform live on a massive stadium stage leading up to the midnight Taipei 101 fireworks countdown.',
    descriptionRu:
      'Крупнейший новогодний музыкальный фестиваль Тайваня под открытым небом прямо перед Мэрией Тайбэя! На гигантской сцене выступают главные звезды Азии, инди-группы и приглашенные артисты вплоть до обратного отсчета и полуночного салюта на Тайбэй 101.',
    highlightsEn: [
      'Star-studded 6-hour lineup of Mandopop, rock, hip-hop, and international performers',
      'Festive street food stalls, glow-stick zones, and giant outdoor projection screens along Ren’ai Rd',
      'Taipei MRT runs 42 hours non-stop through New Year’s Eve & New Year’s Day',
    ],
    highlightsRu: [
      '6 часов живых выступлений топ-артистов Тайваня и зарубежных хедлайнеров',
      'Фудкорты, светящиеся инсталляции и огромные экраны вдоль бульвара Жэньай (Ren’ai Rd)',
      'Метро Тайбэя работает 42 часа без перерыва всю новогоднюю ночь',
    ],
    proTipEn:
      'Since your stay is right on Yixian Rd next to Sun Yat-sen Memorial Hall & City Hall, you can walk over at 21:30 for the main headliners without worrying about crowded MRT trains!',
    proTipRu:
      'Поскольку вы живете на Yixian Rd прямо рядом с Мэрией и Мемориалом Сунь Ятсена, вы можете спокойно прийти пешком к 21:30 к выходу главных хедлайнеров и вернуться домой за 5 минут!',
    placeIds: ['xinyi-district', 'my-stay-xinyi-brownies', 'taipei-101', 'songshan-cultural-park'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+City+Hall+Civic+Plaza',
    officialUrl: 'https://www.newyear.taipei/',
  },
  {
    id: 'new-taipei-christmasland-banqiao',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak'],
    isMustSee: true,
    titleEn: 'Christmasland in New Taipei City — 3D Light Projections & Market',
    titleRu: 'Рождественский городок Christmasland в Баньцяо (3D-шоу и ярмарка)',
    titleZh: '新北歡樂耶誕城 (板橋市民廣場・3D光雕投影秀)',
    dateRangeEn: 'Dec 22 – Dec 29 (Final Festive Week)',
    dateRangeRu: '22 дек – 29 дек (Финальная праздничная неделя)',
    timeWindowEn: 'Nightly 17:30 – 23:00 (3D Laser Show every 30 mins)',
    timeWindowRu: 'Каждый вечер 17:30 – 23:00 (3D-шоу каждые 30 мин)',
    cityEn: 'New Taipei · Banqiao Station Plaza',
    cityRu: 'Новый Тайбэй · Баньцяо (рядом с TPKD)',
    venueEn: 'New Taipei City Hall Citizens Square & Banqiao Station Skywalks',
    venueRu: 'Площадь Мэрии Нового Тайбэя и световые мосты Баньцяо',
    venueZh: '新北市市民廣場・板橋車站站前廣場',
    priceBadgeEn: 'Free Festival',
    priceBadgeRu: 'Бесплатно',
    descriptionEn:
      'Taiwan’s largest and most dazzling winter light festival right in Banqiao (just 5 minutes from your Google TPKD office)! Features a 360-degree 3D projection-mapping show across the New Taipei City Hall tower, 8 glowing pedestrian skybridge light tunnels, European Christmas market chalets, and family rides.',
    descriptionRu:
      'Самый масштабный зимний фестиваль иллюминации на Тайване в районе Баньцяо (всего в 5 минутах от вашего офиса Google TPKD)! Включает грандиозное 3D-маппинг шоу на небоскребе Мэрии, 8 знаменитых светящихся пешеходных мостов-туннелей, рождественскую ярмарку и карусели.',
    highlightsEn: [
      'Every 30 mins from 17:30 to 22:00: 3D architectural projection mapping & snow effects on City Hall',
      '8 Instagram-famous illuminated skywalk tunnels connecting Banqiao Station & Mega City Mall',
      'Combine with a teppanyaki dinner at Chamonix Banqiao right next to the square!',
    ],
    highlightsRu: [
      'Каждые 30 минут с 17:30 до 22:00 — масштабное 3D-световое шоу с эффектом снегопада на здании Мэрии',
      '8 знаменитых светящихся пешеходных мостов вокруг вокзала Баньцяо для вечерних фото',
      'Идеально совместить с ужином теппаньяки в Chamonix Banqiao или после работы в офисе TPKD!',
    ],
    proTipEn:
      'Visit between Dec 22 and Dec 28 right after work at Google TPKD or ride the Blue Line straight from Xinyi to Banqiao Station (Exit 2 / 3A).',
    proTipRu:
      'Обязательно посетите в первую неделю (22–28 декабря) после офиса TPKD или по прямой Синей ветке метро до станции Banqiao (Выход 2 / 3A).',
    placeIds: ['google-tpkd-office', 'chamonix-banqiao'],
    googleMapsUrl: 'https://maps.google.com/?q=New+Taipei+City+Citizens+Square+Banqiao',
    officialUrl: 'https://christmasland.ntpc.gov.tw/',
  },
  {
    id: 'xinyi-christmas-wonderland',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Xinyi Winter Wonderland, Bellavita Snow Village & Artificial Snowfall',
    titleRu: 'Зимняя сказка в Синьи: Снежная деревня в Bellavita и вечерний снегопад',
    titleZh: '信義區聖誕跨年燈海・BELLAVITA奇幻雪村・香堤大道飄雪',
    dateRangeEn: 'Dec 22 – Jan 3 (Daily 11:00 – 22:30)',
    dateRangeRu: '22 дек – 3 янв (ежедневно 11:00 – 22:30)',
    timeWindowEn: 'Evening Lights 17:00–22:30 · Snowfall every 30 mins',
    timeWindowRu: 'Огни 17:00–22:30 · Искусственный снег каждые 30 мин',
    cityEn: 'Taipei · Xinyi Shopping District',
    cityRu: 'Тайбэй · квартал Синьи',
    venueEn: 'Xiangti Avenue Plaza, Bellavita Atrium, Breeze NanShan & Taipei 101 4F',
    venueRu: 'Бульвар Сянти, атриум Bellavita, Breeze NanShan и 4 этаж Тайбэй 101',
    venueZh: '信義香堤大道廣場・BELLAVITA寶麗廣塲・台北101四樓花園',
    priceBadgeEn: 'Free Entry',
    priceBadgeRu: 'Бесплатно',
    descriptionEn:
      'Every evening from Dec 22 into early January, Xinyi’s pedestrian boulevards and skybridges transform into a glowing winter wonderland. Step inside Bellavita’s glass-domed atrium for its famous European alpine snow village, catch artificial snowfall on Shin Kong Mitsukoshi Xiangti Avenue, and visit Taipei 101’s 4th-floor indoor holiday garden.',
    descriptionRu:
      'С 22 декабря по начало января пешеходный бульвар Сянти и воздушные переходы Синьи превращаются в сияющий зимний парк. Загляните под стеклянный купол Bellavita в альпийскую снежную деревню, поймайте вечерний «снегопад» у 20-метровой елки на площади Сянти и поднимитесь в зимний сад на 4-м этаже Тайбэй 101.',
    highlightsEn: [
      'Bellavita 1F Atrium: Photogenic European alpine chalets, snow-covered pines &teddy bear displays',
      'Shin Kong Mitsukoshi A11 Plaza: 20m animated Christmas tree with music, laser & snow shows every 30 mins',
      'Street musicians, weekend holiday pop-up stalls & sparkling skybridge canopies',
    ],
    highlightsRu: [
      'Атриум Bellavita (1 этаж): сказочная альпийская деревня с заснеженными домиками и мостиками',
      'Площадь у Shin Kong Mitsukoshi A11: 20-метровая елка со светомузыкой и снегопадом каждые полчаса',
      'Уличные музыканты, праздничные киоски с глинтвейном и километры сияющих пешеходных мостов',
    ],
    proTipEn:
      'Start at Taipei City Hall MRT Exit 3, walk through Bellavita’s indoor snow village, cross the lit skybridge to Xiangti Avenue, and finish at Taipei 101!',
    proTipRu:
      'Начните прогулку от метро Taipei City Hall (Выход 3) через снежную деревню в Bellavita, пройдите по светящимся мостам над бульваром Сянти прямо к Тайбэй 101!',
    placeIds: ['xinyi-district', 'taipei-101', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Bellavita+Xiangti+Avenue+Xinyi+Taipei',
    officialUrl: 'https://www.travel.taipei/',
  },
  {
    id: 'lihpao-taichung-nye-concert',
    category: 'nye_countdown',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Lihpao Land Taichung — Winter Parades & Sky Dream NYE Fireworks Concert',
    titleRu: 'Новогодний концерт и салют на колесе Sky Dream в парке Липао (Тайчжун)',
    titleZh: '台中麗寶樂園跨年演唱會・天空之夢摩天輪300秒煙火秀',
    dateRangeEn: 'Dec 22 – Jan 7 (NYE Concert & Fireworks: Dec 31)',
    dateRangeRu: '22 дек – 7 янв (Новогодний концерт и салют: 31 дек)',
    timeWindowEn: 'Park 09:30–17:00 (Weekend/Holiday to 20:00 · Dec 31 to 00:30)',
    timeWindowRu: 'Парк с 09:30 · 31 дек шоу и салют до 00:30 ночи',
    cityEn: 'Taichung (Taizhong) · Houli District',
    cityRu: 'Тайчжун (Taizhong) · парк Lihpao Land',
    venueEn: 'Lihpao Land Resort, Discovery World & Sky Dream Ferris Wheel Plaza',
    venueRu: 'Курорт Lihpao Land, парк Discovery World и площадь у колеса Sky Dream',
    venueZh: '麗寶樂園渡假區・探索世界・天空之夢摩天輪',
    priceBadgeEn: 'Concert Free · Park $$',
    priceBadgeRu: 'Концерт бесплатно · Парк $$',
    descriptionEn:
      'Central Taiwan’s most thrilling winter holiday destination! Throughout Dec 22 – Jan 7, Lihpao Land hosts festive Christmas & New Year street parades, rides on the world-famous Gravity Max 90° tilt roller coaster, Italian outlet shopping, and on Dec 31 a massive free open-air countdown concert crowned by 300 seconds of ring-shaped fireworks around the 120m Sky Dream Ferris wheel.',
    descriptionRu:
      'Главный праздник Центрального Тайваня в крупнейшем парке развлечений Тайчжуна! С 22 декабря по 7 января в Lihpao Land проходят зимние костюмированные парады, работают экстремальные горки Gravity Max и итальянский аутлет, а 31 декабря гремит новогодний концерт с 300-секундным круговым салютом вокруг гигантского 120-метрового колеса обозрения Sky Dream.',
    highlightsEn: [
      'Ride Gravity Max (world’s first 90° vertical-drop tilt coaster) in mild sunny Taichung winter weather',
      '120m Sky Dream Ferris wheel light animations + 300-second circular midnight fireworks on Dec 31',
      'Easy 47-min High Speed Rail (HSR) trip from Taipei Main Station or Banqiao + free Lihpao shuttle',
    ],
    highlightsRu: [
      'Солнечная и теплая зимняя погода Тайчжуна (+20…23°C) — идеально для аттракционов и горок Gravity Max',
      'Световое шоу на 120-метровом колесе обозрения Sky Dream и 300-секундный салют в новогоднюю ночь',
      'Всего 47 минут на скоростном поезде HSR из Тайбэя или Баньцяо + бесплатный шаттл до ворот парка',
    ],
    proTipEn:
      'Northern Taiwan can be rainy in late December, while Taichung is almost always sunny and 4–5°C warmer—making Lihpao Land the best sunny day-trip escape between Dec 22 and Jan 7!',
    proTipRu:
      'Когда в Тайбэе в конце декабря пасмурно, в Тайчжуне почти всегда светит солнце и на 4–5°C теплее — поездка на HSR в Lihpao Land станет лучшим солнечным приключением!',
    placeIds: ['lihpao-land-taichung'],
    googleMapsUrl: 'https://maps.google.com/?q=Lihpao+Land+Resort+Taichung+麗寶樂園渡假區',
    officialUrl: 'https://www.lihpaoresort.com/',
  },
  {
    id: 'songshan-huashan-winter-popups',
    category: 'markets_culture',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Songshan Cultural Park & Creative Winter Design Markets + Pop-Up Exhibitions',
    titleRu: 'Зимние дизайн-маркеты, поп-ап выставки и фестивали в парке Суншань',
    titleZh: '松山文創園區 (松菸)・冬季文創市集與期間限定特展',
    dateRangeEn: 'Dec 22 – Jan 7 (Daily 10:00 – 21:00 · Weekend Markets)',
    dateRangeRu: '22 дек – 7 янв (ежедневно 10:00 – 21:00 · ярмарки по выходным)',
    timeWindowEn: 'Exhibitions 10:00–18:00 · Courtyard & Eslite until 22:00',
    timeWindowRu: 'Выставки 10:00–18:00 · Дворик и Eslite до 22:00',
    cityEn: 'Taipei · Xinyi / Songshan Border',
    cityRu: 'Тайбэй · парк Суншань (рядом с домом)',
    venueEn: 'Songshan Cultural & Creative Park Warehouses 1–5 & Baroque Garden',
    venueRu: 'Павильоны 1–5 и сад барокко в креативном парке Суншань',
    venueZh: '松山文創園區 製菸工廠・巴洛克花園',
    priceBadgeEn: 'Free Park & Markets',
    priceBadgeRu: 'Парк и ярмарки бесплатно',
    descriptionEn:
      'Right across from your Xinyi stay, the historic 1937 Songshan Tobacco Factory hosts Taipei’s biggest winter holiday pop-up exhibitions (Japanese anime/character stores, immersive digital art, and illustration fests), outdoor craft markets with hot mulled wine & desserts, and DIY pottery/glassblowing workshops at Eslite Spectrum Songyan.',
    descriptionRu:
      'Буквально через дорогу от вашего дома в Синьи бывшая табачная фабрика 1937 года принимает главные зимние поп-ап выставки Тайбэя (японские аниме-фестивали, цифровое искусство, дизайн-маркеты), уличные ярмарки с горячим глинтвейном и ремесленные мастер-классы в центре Eslite Spectrum.',
    highlightsEn: [
      'Rotating winter character pop-up stores & immersive art exhibitions inside Warehouses 1–5',
      'Weekend handmade craft & vintage markets along the banyan-shaded coconut boulevard',
      '24-hour Eslite Spectrum bookstore, vinyl listening room, and Hermit’s Hut Taiwanese tea house next door',
    ],
    highlightsRu: [
      'Крупные зимние тематические выставки и поп-ап магазины в исторических складах №1–5',
      'Ярмарки авторских подарков, керамики и уличных десертов по выходным и в праздничные дни',
      'Книжный центр Eslite Spectrum 24/7 и дизайнерская чайная Hermit’s Hut в двух шагах',
    ],
    proTipEn:
      'Perfect rainy-day or crisp afternoon activity within a 5-minute walk of your stay on Yixian Rd!',
    proTipRu:
      'Идеальный вариант для дневной прогулки в любую погоду — всего 5 минут пешком от вашего дома на Yixian Rd!',
    placeIds: ['songshan-cultural-park', 'hermits-hut', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Songshan+Cultural+and+Creative+Park+Taipei',
    officialUrl: 'https://www.songshanculturalpark.org/',
  },
  {
    id: 'dadaocheng-dihua-winter-market',
    category: 'markets_culture',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    titleEn: 'Dadaocheng Wharf Pier 5 Sunset Market & Dihua Street New Year Lanterns',
    titleRu: 'Вечерний маркет на пирсе Дадаочэн и предновогодняя улица Дихуа',
    titleZh: '大稻埕碼頭貨櫃市集・迪化街歲末年貨大街暖身季',
    dateRangeEn: 'Dec 22 – Jan 7 (Daily · Wharf Market 16:00 – 22:00)',
    dateRangeRu: '22 дек – 7 янв (ежедневно · пирс 16:00 – 22:00)',
    timeWindowEn: 'Dihua St 10:00–19:00 · Pier 5 Wharf 16:00–22:00',
    timeWindowRu: 'Ул. Дихуа 10:00–19:00 · Набережная 16:00–22:00',
    cityEn: 'Taipei · Datong (Historic Riverside)',
    cityRu: 'Тайбэй · исторический район Дадаочэн',
    venueEn: 'Dadaocheng Wharf Gate 5 & Dihua Street Section 1',
    venueRu: 'Пирс №5 набережной Дадаочэн и историческая улица Дихуа',
    venueZh: '大稻埕碼頭五號水門・迪化街一段',
    priceBadgeEn: 'Free Entry',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'In late December and early January, Taipei’s 19th-century merchant street strings up thousands of hand-painted festive lanterns ahead of the New Year season. Browse herbal apothecaries, Taiwanese tea shops, and Xia-Hai City God Temple by afternoon, then walk 5 minutes to Dadaocheng Pier 5 for riverside sunset dining on rooftop shipping containers.',
    descriptionRu:
      'В конце декабря и начале января старинная купеческая улица Дихуа украшается тысячами расписных красных фонариков. Днем попробуйте редкие чаи, сухофрукты и нугу в лавках XIX века у храма бога любви Сяхай, а к закату выходите на пирс Дадаочэн №5 к фудтракам с террасами на крышах контейнеров и живой музыкой.',
    highlightsEn: [
      'Festive red lantern canopies & free tastings of Taiwanese oolong tea, dried mango, and nougat on Dihua St',
      'Dadaocheng Pier 5 Container Market: Golden-hour views over the Tamsui River with wood-fired pizza & craft drinks',
      'Famous Xia-Hai City God Temple (霞海城隍廟) where locals pray for luck and romance in the New Year',
    ],
    highlightsRu: [
      'Сотни традиционных фонариков и дегустации улуна, сушеного манго и нуги в купеческих домах Дихуа',
      'Контейнерный маркет на пирсе №5 с открытыми палубами над рекой Даньшуй и живой акустической музыкой',
      'Знаменитый храм Сяхай (霞海城隍廟), куда в начале года приходят загадать желание о любви и удаче',
    ],
    proTipEn:
      'Arrive on Dihua Street around 15:00, then head out through Water Gate 5 to Dadaocheng Wharf by 16:45 to catch the winter sunset over the river.',
    proTipRu:
      'Приезжайте на улицу Дихуа к 15:00, а к 16:45 выходите через ворота №5 на набережную Дадаочэн встречать закат над рекой!',
    placeIds: ['dadaocheng-wharf', 'dihua-street'],
    googleMapsUrl: 'https://maps.google.com/?q=Dadaocheng+Wharf+Container+Market+Taipei',
    officialUrl: 'https://www.travel.taipei/',
  },
  {
    id: 'tamsui-new-year-fireworks',
    category: 'nye_countdown',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Tamsui Harbour Light Festival & Early Dec 31 Cross-River Fireworks (20:26)',
    titleRu: 'Ранний новогодний салют над рекой Даньшуй (31 дек в 20:26) и фестиваль света',
    titleZh: '閃耀新北1314跨河煙火 (淡水漁人碼頭)・淡水海關碼頭光影展',
    dateRangeEn: 'Dec 22 – Jan 7 (Cross-River Fireworks: Dec 31 at 20:26)',
    dateRangeRu: '22 дек – 7 янв (Большой салют над рекой: 31 дек в 20:26)',
    timeWindowEn: 'Harbour Lights 17:00–22:00 · Dec 31 Fireworks at 20:26',
    timeWindowRu: 'Иллюминация 17:00–22:00 · Салют 31 дек ровно в 20:26',
    cityEn: 'New Taipei · Tamsui Fisherman’s Wharf',
    cityRu: 'Новый Тайбэй · набережная Даньшуй',
    venueEn: 'Tamsui Fisherman’s Wharf, Lover’s Bridge & Customs Wharf',
    venueRu: 'Рыбацкая пристань Даньшуй, Мост Влюбленных и Таможенный пирс',
    venueZh: '淡水漁人碼頭・情人橋・淡水海關碼頭',
    priceBadgeEn: 'Free Event',
    priceBadgeRu: 'Бесплатно',
    descriptionEn:
      'Want to see TWO massive firework shows on New Year’s Eve? Every December 31 at 20:26 (8:26 PM), New Taipei City launches its signature "1314" (13 minutes 14 seconds) panoramic firework display across the Tamsui River estuary and Danjiang Bridge—early enough that you can watch it and still ride the Red Line back to Xinyi for Taipei 101 at midnight!',
    descriptionRu:
      'Хотите увидеть ДВА грандиозных салюта в один вечер 31 декабря? Каждый год ровно в 20:26 в устье реки Даньшуй запускают панорамный фейерверк «1314» (длительностью 13 минут 14 секунд) длиной более километра над водой — после него вы легко успеете вернуться по Красной ветке метро к полуночному салюту у Тайбэй 101!',
    highlightsEn: [
      '13-minute 14-second ("1314" = forever) wide-angle river & bridge fireworks at 20:26 on Dec 31',
      'Afternoon live concerts, harbourside food market & glowing light art at Tamsui Customs Wharf (Dec 22 – Jan 7)',
      'Direct Red Line MRT connection straight back to Taipei 101 / Xinyi Anhe in ~45 mins',
    ],
    highlightsRu: [
      'Более 13 минут панорамного салюта над водой и мостом Даньцзян в 20:26 вечера 31 декабря',
      'Вечерние световые инсталляции на Таможенном пирсе и Мосту Влюбленных с 22 декабря по 7 января',
      'Прямая Красная ветка метро возвращает вас прямо к Тайбэй 101 за ~45 минут к полуночи',
    ],
    proTipEn:
      'Watch from Tamsui Customs Wharf or the riverside promenade near Tamsui MRT Station so you can board the Red Line train quickly right after the 20:40 finale!',
    proTipRu:
      'Смотрите салют с набережной у Таможенного пирса ближе к станции метро Tamsui — тогда сразу после финала в 20:40 вы без очередей сядете в поезд Красной ветки обратно в Синьи!',
    placeIds: ['tamsui'],
    googleMapsUrl: 'https://maps.google.com/?q=Tamsui+Fishermans+Wharf+New+Taipei',
    officialUrl: 'https://newtaipei.travel/',
  },
  {
    id: 'taipei-dome-taoyuan-concerts',
    category: 'concerts_shows',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    titleEn: 'Taipei Dome (大巨蛋) & Taoyuan HSR Year-End Superstar Concert Week',
    titleRu: 'Зимние стадионные шоу в Taipei Dome (Синьи) и на арене Таоюань (Mayday / Звезды Азии)',
    titleZh: '臺北大巨蛋 & 桃園高鐵站前 歲末跨年巨星演唱會週',
    dateRangeEn: 'Dec 22 – Jan 5 (Evening Stadium Shows & Fan Plazas)',
    dateRangeRu: '22 дек – 5 янв (Вечерние концерты и фан-зоны)',
    timeWindowEn: 'Plazas & Merch Zones 14:00–22:00 · Concerts 19:00',
    timeWindowRu: 'Фан-зоны и мерч 14:00–22:00 · Шоу в 19:00',
    cityEn: 'Taipei (Xinyi Taipei Dome) & Taoyuan (19 min HSR)',
    cityRu: 'Тайбэй (Taipei Dome у дома) и Таоюань (19 мин HSR)',
    venueEn: 'Taipei Dome (next to Songshan Park), Taipei Arena & Taoyuan Stadium',
    venueRu: 'Стадион Taipei Dome (у парка Суншань), Taipei Arena и Таоюань',
    venueZh: '臺北大巨蛋・臺北小巨蛋・樂天桃園棒球場',
    priceBadgeEn: 'Fan Plazas Free · Tickets $$$',
    priceBadgeRu: 'Фан-парк бесплатно · Билеты $$$',
    descriptionEn:
      'Late December to Jan 5 is Taiwan’s peak stadium concert season! Right beside your Xinyi stay, the brand-new 40,000-seat Taipei Dome (台北大巨蛋) and Taipei Arena host mega pop/rock residencies, while nearby Taoyuan (just 19 mins by HSR) hosts outdoor New Year stadium shows and Mayday-style rock spectacles.',
    descriptionRu:
      'Неделя с 22 декабря по 5 января — пик главных стадионных концертов Тайваня! Прямо рядом с вашим домом в Синьи новейший крытый стадион Taipei Dome (台北大巨蛋 на 40 000 зрителей) и Taipei Arena принимают новогодние шоу суперзвезд, а в соседнем Таоюане (19 минут на поезде HSR) проходят масштабные рок-концерты и городской новогодний фестиваль.',
    highlightsEn: [
      'Taipei Dome (大巨蛋) is literally across the street from Sun Yat-sen Memorial Hall & Songshan Park',
      'Even without a concert ticket, enjoy the lively sunken garden restaurants, fan installations & merch pop-ups',
      'Taoyuan HSR Plaza (19 mins from Taipei Main Station) also hosts a free New Year’s Eve concert & Gloria Outlets winter village',
    ],
    highlightsRu: [
      'Новейший стадион Taipei Dome находится буквально через дорогу от Мемориала Сунь Ятсена и парка Суншань',
      'Даже без билета можно прогуляться по новым подземным садам, ресторанам и ярким фан-зонам вокруг арены',
      'У станции HSR Taoyuan (19 минут от Тайбэя) также проходят бесплатный новогодний концерт и рождественская ярмарка в Gloria Outlets',
    ],
    proTipEn:
      'Stroll through the newly opened Garden City dining promenade around Taipei Dome right between Songshan Cultural Park and Sun Yat-sen Memorial Hall!',
    proTipRu:
      'Обязательно прогуляйтесь по новой вечерней гастро-променаде Garden City вокруг купола Taipei Dome между парком Суншань и Мемориалом Сунь Ятсена!',
    placeIds: ['songshan-cultural-park', 'sun-yat-sen-memorial', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+Dome+Xinyi+Taipei',
    officialUrl: 'https://tixcraft.com/',
  },
  {
    id: 'shifen-winter-sky-lanterns',
    category: 'day_trips',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Shifen New Year Wishes Sky Lantern Release & Jiufen Red Lantern Dusk',
    titleRu: 'Запуск небесных фонариков желаний на Новый год в Шифэне и огни Цзюфэня',
    titleZh: '十分老街歲末祈福天燈・九份山城紅燈籠夜景',
    dateRangeEn: 'Dec 22 – Jan 7 (Daily 10:00 – 20:00 · Best at Dusk 16:30–18:00)',
    dateRangeRu: '22 дек – 7 янв (ежедневно · красивее всего в сумерках 16:30–18:00)',
    timeWindowEn: 'All Day · Twilight Lantern Release 16:30–18:30',
    timeWindowRu: 'Весь день · Запуск в сумерках 16:30–18:30',
    cityEn: 'New Taipei · Pingxi & Ruifang Mountain Towns',
    cityRu: 'Новый Тайбэй · горные Шифэнь и Цзюфэнь',
    venueEn: 'Shifen Old Street Railway Tracks, Shifen Waterfall & Jiufen Old Street',
    venueRu: 'Рельсы старой улицы Шифэнь, водопад Шифэнь и чайные дома Цзюфэня',
    venueZh: '十分老街鐵道・十分瀑布・九份老街',
    priceBadgeEn: 'NT$200–250 per Lantern ($)',
    priceBadgeRu: 'NT$200–250 за фонарик ($)',
    descriptionEn:
      'One of Taiwan’s most magical year-end traditions! Between Dec 22 and Jan 7, locals and travelers head to the misty mountain railway town of Shifen to brush their New Year wishes onto giant 4-color paper sky lanterns and float them into the evening sky right as the vintage yellow train rumbles past.',
    descriptionRu:
      'Одна из самых волшебных новогодних традиций Тайваня! В дни между 22 декабря и 7 января путешественники и жители Тайбэя едут в горную деревню Шифэнь, чтобы кистью написать свои новогодние желания на больших четырехцветных бумажных фонариках и запустить их в вечернее небо прямо с железнодорожных путей.',
    highlightsEn: [
      '4-color lantern meanings: Red (Health & Peace), Yellow (Wealth), Blue (Career), Pink (Happiness & Love)',
      'Shop staff gladly film your whole group releasing the glowing lantern on the railway tracks',
      'Pair with a 15-minute walk to roaring Shifen Waterfall and sunset oolong tea in Jiufen Old Street',
    ],
    highlightsRu: [
      'Четыре цвета фонарика: Красный (здоровье), Желтый (богатство), Синий (карьера), Розовый (любовь и радость)',
      'Мастера лавки бесплатно сделают серию отличных фото и видео вашего запуска прямо на рельсах',
      'Совместите с прогулкой к водопаду Шифэнь и вечерним чаепитием под красными фонарями в Цзюфэне',
    ],
    proTipEn:
      'Release your sky lantern around 16:45–17:15 blue hour so the glowing lantern contrasts against the deep blue mountain sky!',
    proTipRu:
      'Запускайте фонарик в «синий час» около 16:45–17:15 — в сумерках светящийся купол смотрится особенно волшебно на фоне темно-синих гор!',
    placeIds: ['shifen-old-street', 'shifen-waterfall', 'jiufen-old-street'],
    googleMapsUrl: 'https://maps.google.com/?q=Shifen+Old+Street+New+Taipei',
    officialUrl: 'https://newtaipei.travel/',
  },
  {
    id: 'beitou-winter-hot-springs',
    category: 'day_trips',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    titleEn: 'Beitou Winter Hot Spring Festival Season & Steaming Thermal Valley',
    titleRu: 'Зимний сезон горячих источников Бэйтоу и парящая Термальная долина',
    titleZh: '北投冬季溫泉季・地熱谷青磺煙霧與日式湯屋',
    dateRangeEn: 'Dec 22 – Jan 7 (Thermal Valley 09:00–18:00 · Baths until 22:00)',
    dateRangeRu: '22 дек – 7 янв (Долина 09:00–18:00 · Купальни до 22:00)',
    timeWindowEn: 'Daily 09:00 – 22:00 (Closed Mondays for Thermal Valley)',
    timeWindowRu: 'Ежедневно 09:00 – 22:00 (кроме пн для долины)',
    cityEn: 'Taipei · Xinbeitou Hot Spring Village',
    cityRu: 'Тайбэй · курорт Синьбэйтоу',
    venueEn: 'Beitou Thermal Valley, Hot Spring Museum & Private Hinoki Bathhouses',
    venueRu: 'Термальная долина Бэйтоу, Музей источников и японские купальни',
    venueZh: '北投地熱谷・北投溫泉博物館・新北投公園',
    priceBadgeEn: 'Park Free · Private Baths $$',
    priceBadgeRu: 'Парк бесплатно · Купальни $$',
    descriptionEn:
      'Cool 14–18°C late-December and early-January weather is the absolute peak season for Beitou! Watch dramatic clouds of sulfuric steam billow across the turquoise waters of Thermal Valley (Hell Valley), stroll the lantern-lit Japanese bathhouse park, and warm up in a private cedar (hinoki) hot spring room.',
    descriptionRu:
      'Прохладные дни с 22 декабря по 7 января (+14…18°C) — лучшее время в году для поездки в Бэйтоу! В морозном воздухе над бирюзовым озером Термальной долины поднимаются густые клубы пара, старинный японский парк светится теплой подсветкой, а после прогулки можно погреться в отдельной кипарисовой купели с горячей минеральной водой.',
    highlightsEn: [
      'Walk the lakeside boardwalk around 90°C steaming turquoise Thermal Valley (地熱谷)',
      'Visit the 1913 Japanese Tudor-style Beitou Hot Spring Museum & award-winning wooden green library',
      'Book a 60–90 minute private mineral bath + afternoon tea at a Xinbeitou resort',
    ],
    highlightsRu: [
      'Прогулка по деревянной тропе вокруг бурлящего бирюзового озера Термальной долины (+90°C)',
      'Японский Музей горячих источников 1913 года и знаменитая деревянная эко-библиотека Бэйтоу',
      'Отдельные семейные купальни (汤屋) с горячей серной водой в отелях вокруг станции Xinbeitou',
    ],
    proTipEn:
      'Note that Beitou Thermal Valley & the Hot Spring Museum are closed on Mondays—plan your visit for Tuesday through Sunday!',
    proTipRu:
      'Обратите внимание: Термальная долина и Музей источников закрыты по понедельникам — выбирайте любой день со вторника по воскресенье!',
    placeIds: ['beitou-thermal-valley', 'yangmingshan-np'],
    googleMapsUrl: 'https://maps.google.com/?q=Beitou+Thermal+Valley+Taipei',
    officialUrl: 'https://www.travel.taipei/',
  },
  {
    id: 'maokong-new-year-tea-terrace',
    category: 'day_trips',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    titleEn: 'Maokong Crystal Gondola & Mountain Tea Houses Winter Night View',
    titleRu: 'Вечерняя канатная дорога Маокун и зимнее чаепитие с видом на огни Тайбэя',
    titleZh: '貓空纜車水晶車廂・山城冬季品茗賞101夜景',
    dateRangeEn: 'Dec 22 – Jan 7 (Gondola 09:00–21:00 · Tea Houses until Midnight)',
    dateRangeRu: '22 дек – 7 янв (Канатка 09:00–21:00 · Чайные до полуночи)',
    timeWindowEn: 'Best 16:00 – 21:30 for Sunset & Night Skyline',
    timeWindowRu: 'Лучшее время 16:00 – 21:30 (закат и огни города)',
    cityEn: 'Taipei · Wenshan Mountain Ridge',
    cityRu: 'Тайбэй · чайные холмы Маокун',
    venueEn: 'Maokong Gondola & Open-Air Ridge Tea Houses',
    venueRu: 'Канатная дорога Маокун и панорамные чайные террасы',
    venueZh: '貓空纜車・貓空景觀茶坊',
    priceBadgeEn: 'Gondola NT$120 · Tea $$',
    priceBadgeRu: 'Канатка NT$120 · Чай $$',
    descriptionEn:
      'Glide above the lush southern hills of Taipei in a glass-bottom "Crystal Cabin" gondola to Maokong Tea Village. On crisp evenings between Dec 22 and Jan 7, sit around a warm charcoal kettle on an open mountain terrace, roasting Tieguanyin oolong tea while watching Taipei 101 glow on the horizon.',
    descriptionRu:
      'Поднимитесь в кабинке со стеклянным полом Crystal Cabin над зелеными холмами в горную деревню Маокун. В свежие зимние вечера с 22 декабря по 7 января здесь особенно уютно сидеть на открытой террасе у горячего чайника на углях, пить ароматный прожаренный улун Тегуаньинь и любоваться сияющей вдалеке башней Тайбэй 101.',
    highlightsEn: [
      'Glass-bottom "Crystal Cabin" (水晶車廂) costs the exact same fare as standard cabins',
      'On Dec 31, Maokong Gondola extends hours past midnight for panoramic distant views of Taipei 101 fireworks',
      'Try Maokong’s signature Tieguanyin tea soft-serve ice cream and tea-leaf fried rice',
    ],
    highlightsRu: [
      'Кабинки со стеклянным дном Crystal Cabin стоят столько же, сколько и обычные (NT$120 с картой EasyCard)',
      'В новогоднюю ночь 31 декабря канатная дорога продлевает работу до 02:00 ночи для панорамного обзора салюта',
      'Обязательно попробуйте фирменное мороженое из чая Тегуаньинь и жареный рис с чайными листьями',
    ],
    proTipEn:
      'Maokong Gondola is closed on Mondays (except on national holidays like Dec 31 / Jan 1)—tap your EasyCard for a NT$20 discount on weekdays!',
    proTipRu:
      'По понедельникам (кроме праздничных дней) канатная дорога закрыта на техобслуживание — в остальные дни оплачивайте проезд картой EasyCard со скидкой!',
    placeIds: ['maokong', 'taipei-zoo'],
    googleMapsUrl: 'https://maps.google.com/?q=Maokong+Gondola+Taipei',
    officialUrl: 'https://www.gondola.taipei/',
  },
];

export function filterFestiveEvents(
  events: FestiveEventItem[],
  category: EventCategory,
  datePhase: EventDatePhase,
  searchQuery: string
): FestiveEventItem[] {
  const q = searchQuery.trim().toLowerCase();

  return events.filter((ev) => {
    if (category !== 'all' && ev.category !== category) {
      return false;
    }
    if (datePhase !== 'all' && !ev.datePhase.includes(datePhase)) {
      return false;
    }
    if (q.length > 0) {
      const haystack = [
        ev.titleEn,
        ev.titleRu,
        ev.titleZh,
        ev.dateRangeEn,
        ev.dateRangeRu,
        ev.cityEn,
        ev.cityRu,
        ev.venueEn,
        ev.venueRu,
        ev.venueZh,
        ev.descriptionEn,
        ev.descriptionRu,
        ...ev.highlightsEn,
        ...ev.highlightsRu,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) {
        return false;
      }
    }
    return true;
  });
}
