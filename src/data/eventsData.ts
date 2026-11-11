export type EventCategory =
  | 'all'
  | 'nye_countdown'
  | 'concerts_shows'
  | 'christmas_lights'
  | 'markets_culture';

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
    emoji: '🎉',
  },
  {
    id: 'nye_countdown',
    labelEn: 'NYE Countdown & Fireworks',
    labelRu: 'Новый год и салюты',
    emoji: '🎆',
  },
  {
    id: 'concerts_shows',
    labelEn: 'Arena Concerts & Live Music',
    labelRu: 'Концерты и живая музыка',
    emoji: '🎤',
  },
  {
    id: 'christmas_lights',
    labelEn: 'Christmasland & Light Shows',
    labelRu: 'Рождество и световые шоу',
    emoji: '🎄',
  },
  {
    id: 'markets_culture',
    labelEn: 'Exhibitions, Pop-Ups & Markets',
    labelRu: 'Выставки, поп-апы и ярмарки',
    emoji: '🎨',
  },
];

export const EVENT_DATE_PHASES: Array<{
  id: EventDatePhase;
  labelEn: string;
  labelRu: string;
}> = [
  {
    id: 'all',
    labelEn: 'All Dates (Dec 22 – Jan 7)',
    labelRu: 'Все даты (22 дек – 7 янв)',
  },
  {
    id: 'xmas_week',
    labelEn: 'Dec 22 – Dec 28 (Xmas Week)',
    labelRu: '22–28 дек (Рождественская неделя)',
  },
  {
    id: 'nye_peak',
    labelEn: 'Dec 29 – Jan 1 (New Year Peak)',
    labelRu: '29 дек – 1 янв (Пик Нового года)',
  },
  {
    id: 'jan_week',
    labelEn: 'Jan 1 – Jan 7 (First Week of Jan)',
    labelRu: '1–7 янв (Первая неделя января)',
  },
];

export const FESTIVE_EVENTS: FestiveEventItem[] = [
  {
    id: 'taipei-101-nye-fireworks',
    category: 'nye_countdown',
    datePhase: ['xmas_week', 'nye_peak'],
    isMustSee: true,
    titleEn: "Taipei 101 New Year's Eve Fireworks & Laser Light Show",
    titleRu: 'Новогодний салют и лазерное шоу на башне Тайбэй 101',
    titleZh: '台北101跨年煙火大秀',
    dateRangeEn: 'Dec 27 – Jan 1 (Fireworks at 00:00 on Dec 31)',
    dateRangeRu: '27 дек – 1 янв (Салют 31 дек в 00:00)',
    timeWindowEn: 'Nightly light show 18:00–22:00 · NYE Fireworks 00:00–00:06',
    timeWindowRu: 'Подсветка 18:00–22:00 · Салют в полночь 00:00–00:06',
    cityEn: 'Taipei · Xinyi District',
    cityRu: 'Тайбэй · район Синьи',
    venueEn: 'Taipei 101, Sun Yat-sen Memorial Hall & Elephant Mountain',
    venueRu: 'Тайбэй 101, Мемориал Сунь Ятсена и Слоновья гора',
    venueZh: '台北101 / 國父紀念館 / 象山',
    priceBadgeEn: 'Free Outdoor Viewing',
    priceBadgeRu: 'Бесплатно с площадей',
    descriptionEn:
      'One of the world’s most iconic New Year’s Eve spectacles: 16,000+ fireworks shells, T-Pad LED mesh animations, and synchronized roof-mounted lasers erupting from all four sides of the 508-meter Taipei 101 tower for 6 full minutes at midnight, preceded by nightly countdown light projections starting Dec 27.',
    descriptionRu:
      'Одно из самых зрелищных новогодних шоу планеты: более 16 000 залпов фейерверков, гигантская LED-сетка T-Pad и лазерное шоу по всей высоте 508-метрового небоскрёба Тайбэй 101 ровно в полночь (плюс вечерние световые шоу с 27 декабря).',
    highlightsEn: [
      '6-minute 360° pyrotechnic, laser, and LED beam show launched from floors 35 to 90',
      'Best upwind viewing (clear of winter NE monsoon smoke): Sun Yat-sen Memorial Hall & City Hall East Plaza',
      'Just a 10–12 minute walk from your Xinyi stay near Brownies — no taxi needed after midnight!',
    ],
    highlightsRu: [
      '6-минутное 360°-шоу фейерверков, лазеров и LED-анимации с 35-го по 90-й этаж башни',
      'Лучшие точки обзора с наветренной стороны (без дыма): Мемориал Сунь Ятсена и площадь у Мэрии',
      'Всего 10–12 минут пешком от вашего дома в Синьи у Brownies — после полуночи не нужно искать такси!',
    ],
    proTipEn:
      'Winter winds in Taipei blow from the Northeast (NE). Always stand NORTH or EAST of Taipei 101 (near Sun Yat-sen Memorial Hall or Songshan Cultural Park) so the fireworks smoke blows away from you!',
    proTipRu:
      'Зимой ветер в Тайбэе дует с северо-востока. Вставайте к СЕВЕРУ или ВОСТОКУ от Тайбэй 101 (у Мемориала Сунь Ятсена или парка Суншань), чтобы дым от салюта уносило в противоположную сторону!',
    placeIds: ['taipei-101', 'sun-yat-sen-memorial', 'elephant-mountain', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+101+Xinyi+Taipei',
    officialUrl: 'https://www.taipei-101.com.tw/',
  },
  {
    id: 'taipei-nye-city-concert',
    category: 'nye_countdown',
    datePhase: ['nye_peak'],
    isMustSee: true,
    titleEn: 'Taipei "Most High New Year City" NYE Countdown Concert (feat. KARA, Tanya Chua & WeiBird)',
    titleRu: 'Главный новогодний концерт у Мэрии Тайбэя (KARA, Tanya Chua, WeiBird, Nine One One)',
    titleZh: '臺北最High新年城 跨年晚會',
    dateRangeEn: 'Dec 31 – Jan 1 (New Year’s Eve Night)',
    dateRangeRu: '31 декабря – 1 января (Новогодняя ночь)',
    timeWindowEn: '19:00 – 01:00 (6-hour live concert)',
    timeWindowRu: '19:00 – 01:00 (6-часовой живой марафон)',
    cityEn: 'Taipei · Xinyi Civic Plaza',
    cityRu: 'Тайбэй · площадь у Мэрии (Синьи)',
    venueEn: 'Taipei City Hall Civic Plaza (1 Shifu Rd, Xinyi District)',
    venueRu: 'Площадь перед Мэрией Тайбэя (Civic Plaza, Синьи)',
    venueZh: '臺北市政府前廣場 (市民廣場)',
    priceBadgeEn: 'Free Admission',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'Taiwan’s flagship municipal New Year’s Eve concert right in front of Taipei City Hall. The star-studded lineup features the historic reunion of K-pop legends KARA (performing in Taiwan for the first time in 12 years), alongside Golden Melody winners Tanya Chua (蔡健雅), WeiBird (韋禮安), Nick Chou (周湯豪), Nine One One (玖壹壹), Bii, and Genblue.',
    descriptionRu:
      'Главный бесплатный новогодний опен-эйр страны прямо перед зданием Мэрии в районе Синьи. В лайнапе — эксклюзивное возвращение легенд K-pop группы KARA (впервые на Тайване за 12 лет), а также суперзвёзды Tanya Chua (蔡健雅), WeiBird (韋禮安), Nick Chou (周湯豪), Nine One One (玖壹壹) и Bii.',
    highlightsEn: [
      'Exclusive Taiwan performance by K-pop icons KARA plus 15+ top Mandopop/rock acts',
      'Direct front-row view of Taipei 101 for the midnight countdown & fireworks',
      'Taipei Metro (MRT) runs 42 hours non-stop from Dec 31 (06:00) through Jan 1 (24:00)',
    ],
    highlightsRu: [
      'Эксклюзивное выступление легенд K-pop KARA и более 15 главных звёзд тайваньской сцены',
      'Прямой вид со сцены на башню Тайбэй 101 во время полуночного отсчёта и салюта',
      'Метро Тайбэя (MRT) работает 42 часа без перерыва с 06:00 31 декабря до полуночи 1 января',
    ],
    proTipEn:
      'On Dec 31 afternoon (13:00–17:00), artists do open soundchecks with minimal crowds—walk over from your Xinyi stay to watch rehearsals up close!',
    proTipRu:
      'Днём 31 декабря (с 13:00 до 17:00) на площади проходят открытые саундчеки звёзд почти без толпы — отличная возможность посмотреть репетицию вблизи!',
    placeIds: ['xinyi-district', 'taipei-101', 'sun-yat-sen-memorial'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+City+Hall+Plaza',
    officialUrl: 'https://www.newyear.taipei/',
  },
  {
    id: 'jolin-tsai-taipei-dome-nye',
    category: 'concerts_shows',
    datePhase: ['nye_peak'],
    isMustSee: true,
    titleEn: 'Jolin Tsai (蔡依林) "PLEASURE" World Tour at Taipei Dome (Dec 30 – Jan 1)',
    titleRu: 'Концерты Jolin Tsai (蔡依林) «PLEASURE» на стадионе Taipei Dome (30 дек – 1 янв)',
    titleZh: 'JOLIN 蔡依林《PLEASURE》世界巡迴演唱會 臺北大巨蛋',
    dateRangeEn: 'Dec 30, Dec 31 & Jan 1 (3 Consecutive Nights)',
    dateRangeRu: '30 дек, 31 дек и 1 янв (3 вечера подряд)',
    timeWindowEn: '19:30 (Dec 30 & Jan 1) · 21:30 NYE Countdown Show (Dec 31)',
    timeWindowRu: '19:30 (30 дек и 1 янв) · 21:30 Новогоднее шоу (31 дек)',
    cityEn: 'Taipei · Xinyi / Daan Border',
    cityRu: 'Тайбэй · крытый стадион Taipei Dome',
    venueEn: 'Taipei Dome (臺北大巨蛋) — next to Sun Yat-sen Memorial Hall MRT Exit 5',
    venueRu: 'Стадион Taipei Dome (臺北大巨蛋) — у станции метро Sun Yat-sen Memorial Hall',
    venueZh: '臺北大巨蛋 (國父紀念館站 5號出口)',
    priceBadgeEn: 'Concert Tickets NT$1,800–6,800 · Free Fan Zone Outside',
    priceBadgeRu: 'Билеты NT$1,800–6,800 · Фан-зона снаружи бесплатно',
    descriptionEn:
      'Queen of Mandopop Jolin Tsai headlines 3 consecutive nights at the brand-new 40,000-seat Taipei Dome for her "PLEASURE" World Tour. Even without indoor floor tickets, the outdoor sunken plazas, pop-up merch booths, and new Garden City dining avenue around Taipei Dome buzz with thousands of fans every evening.',
    descriptionRu:
      'Королева поп-сцены Азии Джолин Цай (Jolin Tsai) даёт серию из 3 грандиозных шоу подряд (включая новогоднюю ночь!) на новейшей 40-тысячной арене Taipei Dome. Даже без билета внутрь вокруг арены работают тематические фотозоны, поп-ап магазины мерча и новая ресторанная галерея Garden City.',
    highlightsEn: [
      'Jolin Tsai’s historic first residency at the 40,000-seat Taipei Dome with 360° satellite stages',
      'Outdoor fan installations, official merch pop-ups, and lively restaurants around Songshan Park & Taipei Dome',
      'Only 600 meters from your Xinyi stay near Brownies (7-minute walk)',
    ],
    highlightsRu: [
      'Первое историческое шоу Джолин Цай на 40-тысячном стадионе Taipei Dome с круговыми сценами',
      'Наружные фотозоны, поп-ап бутики мерча и рестораны комплекса Garden City вокруг арены',
      'Всего в 600 метрах от вашего дома в Синьи у Brownies (7 минут пешком)',
    ],
    proTipEn:
      'Right after the Dec 31 show or while visiting the Taipei Dome fan plazas, step onto the plaza facing Zhongxiao East Road for a framed view of Taipei 101.',
    proTipRu:
      'Площадь у Taipei Dome и соседнего парка Суншань — одна из лучших точек для вечерней прогулки и наблюдения за подсветкой Тайбэй 101.',
    placeIds: ['sun-yat-sen-memorial', 'songshan-cultural-park', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+Dome',
    officialUrl: 'https://www.farglorydome.com.tw/',
  },
  {
    id: 'taipei-arena-concerts-dec-jan',
    category: 'concerts_shows',
    datePhase: ['xmas_week', 'jan_week'],
    isMustSee: true,
    titleEn: 'Taipei Arena Concerts: Mr.Children (Dec 26–27) & BABYMONSTER (Jan 2–3)',
    titleRu: 'Концерты в Taipei Arena: легенды J-Rock Mr.Children (26–27 дек) и BABYMONSTER (2–3 янв)',
    titleZh: '臺北小巨蛋演唱會：Mr.Children & BABYMONSTER',
    dateRangeEn: 'Dec 26–27 (Mr.Children) & Jan 2–3 (BABYMONSTER)',
    dateRangeRu: '26–27 дек (Mr.Children) и 2–3 янв (BABYMONSTER)',
    timeWindowEn: 'Evening Shows 19:00 / 19:30 · Daytime Ice Skating Rink 10:00–21:00',
    timeWindowRu: 'Концерты в 19:00 / 19:30 · Ледовый каток внутри 10:00–21:00',
    cityEn: 'Taipei · Songshan District (MRT Taipei Arena)',
    cityRu: 'Тайбэй · район Суншань (метро Taipei Arena)',
    venueEn: 'Taipei Arena (臺北小巨蛋, 2 Nanjing E Rd Sec 4)',
    venueRu: 'Арена Taipei Arena (臺北小巨蛋, зелёная ветка метро G17)',
    venueZh: '臺北小巨蛋 (捷運台北小巨蛋站)',
    priceBadgeEn: 'Arena Concerts · Ice Land Skating NT$200',
    priceBadgeRu: 'Концерты · Ледовый каток внутри NT$200',
    descriptionEn:
      'Taipei Arena hosts back-to-back international tours across the holiday window: Japanese stadium rock legends Mr.Children perform on Dec 26–27, followed by YG Entertainment’s K-pop sensation BABYMONSTER ("LOVE MONSTERS" Asia Fan Concert) on Jan 2–3. Plus, the 2nd floor of Taipei Arena houses Taipei Ice Land — Taiwan’s Olympic-sized indoor ice skating rink!',
    descriptionRu:
      'В дни каникул главная крытая сцена города Taipei Arena принимает мировых звёзд: 26–27 декабря выступают легенды японского рока Mr.Children, а 2–3 января — хитовая K-pop группа BABYMONSTER («LOVE MONSTERS» Tour). Кроме того, на 2-м этаже арены каждый день работает огромный олимпийский ледовый каток Taipei Ice Land!',
    highlightsEn: [
      'Dec 26 & 27: Japanese rock icons Mr.Children Tour 2025/2026 live at Taipei Arena',
      'Jan 2 & 3: K-pop powerhouse BABYMONSTER "LOVE MONSTERS" Fan Concert Tour',
      'Bonus activity: Skate on the Olympic-size indoor Ice Land rink inside Taipei Arena (2F) any day from Dec 22 to Jan 7!',
    ],
    highlightsRu: [
      '26 и 27 декабря: сольные концерты культовой японской рок-группы Mr.Children',
      '2 и 3 января: большое K-pop шоу группы BABYMONSTER («LOVE MONSTERS»)',
      'Бонус в любой день с 22 дек по 7 янв: на 2-м этаже Taipei Arena работает олимпийский ледовый каток с прокатом коньков!',
    ],
    proTipEn:
      'After an evening show or skating session at Taipei Arena, hop 2 stops east on the MRT Green Line (to G19 Songshan) for late-night bites at Raohe Street Night Market!',
    proTipRu:
      'После концерта или катания на коньках в Taipei Arena проедьте всего 2 станции по зелёной ветке метро (до G19 Songshan) на ночной рынок Жаохэ!',
    placeIds: ['raohe-night-market', 'haidilao-qingcheng', 'dubu-house-songshan'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+Arena',
    officialUrl: 'https://www.arena.taipei/',
  },
  {
    id: 'mayday-taoyuan-nye-concerts',
    category: 'concerts_shows',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Mayday (五月天) New Year Stadium Concerts & Taoyuan NYE Fireworks Party',
    titleRu: 'Стадионные шоу группы Mayday (五月天) и новогодний фестиваль в Таоюане',
    titleZh: '五月天跨年演唱會 & 桃園跨年晚會 (樂天桃園棒球場 / 青埔)',
    dateRangeEn: 'Dec 27–28, Dec 31 & Jan 1–4 (Multi-Night Residency)',
    dateRangeRu: '27–28 дек, 31 дек и 1–4 янв (Серия стадионных шоу)',
    timeWindowEn: '18:30 – 22:30 (NYE Dec 31 show runs 21:00 – 00:30)',
    timeWindowRu: '18:30 – 22:30 (В новогоднюю ночь 31 дек с 21:00 до 00:30)',
    cityEn: 'Taoyuan · Qingpu (19 min via HSR from Taipei)',
    cityRu: 'Таоюань · Цинпу (19 мин на скоростном поезде HSR)',
    venueEn: 'Rakuten Taoyuan Baseball Stadium & Qingpu High-Speed Rail Plaza',
    venueRu: 'Стадион Rakuten Taoyuan и площадь у станции HSR Taoyuan',
    venueZh: '樂天桃園棒球場 / 高鐵桃園站前廣場',
    priceBadgeEn: 'Open-Air Fan Market Free · HSR 19 min',
    priceBadgeRu: 'Фан-ярмарка бесплатно · 19 мин на HSR',
    descriptionEn:
      'Known as the "Beatles of the Chinese-speaking world", Taiwanese rock legends Mayday (五月天) stage their famous year-end open-air stadium residency in Taoyuan alongside Taoyuan City’s official free New Year’s Eve Countdown Party at the HSR Plaza — complete with synchronized LED light-sticks, giant stage pyrotechnics, and Gloria Outlets winter shopping.',
    descriptionRu:
      'Главная рок-группа Тайваня Mayday (五月天) проводит свою знаменитую новогоднюю серию стадионных шоу под открытым небом в Таоюане (всего в 19 минутах на скоростном поезде HSR от Тайбэя). Параллельно на площади у станции HSR Taoyuan проходит бесплатный городской новогодний концерт с салютом и рождественская деревня в аутлете Gloria Outlets.',
    highlightsEn: [
      'Taiwan’s most famous live music ritual with 25,000+ fans singing under open-air stadium fireworks',
      'Free municipal Taoyuan NYE Countdown Concert right outside Taoyuan HSR Station on Dec 31',
      'Adjacent to Gloria Outlets (華泰名品城) featuring an American retro Christmas market & snowfall',
    ],
    highlightsRu: [
      'Самое легендарное музыкальное событие Тайваня с синхронным световым шоу тысяч браслетов и фейерверками',
      'Бесплатный городской новогодний концерт Таоюаня прямо у выхода со станции HSR 31 декабря',
      'Рядом расположен открытый аутлет Gloria Outlets с декорациями американского Рождества и искусственным снегом',
    ],
    proTipEn:
      'Take the High-Speed Rail (HSR) from Taipei Main Station or Banqiao Station to Taoyuan Station (only 19 minutes) + 1 stop on the Airport MRT to A19 Taoyuan Sports Park.',
    proTipRu:
      'Садитесь на скоростной поезд HSR на Taipei Main Station или в Баньцяо до станции Taoyuan (всего 19 минут в пути) + 1 остановка на метро до стадиона (A19).',
    placeIds: ['google-tpkd-office', 'haidilao-q-square'],
    googleMapsUrl: 'https://maps.google.com/?q=Rakuten+Taoyuan+Baseball+Stadium',
    officialUrl: 'https://www.tycg.gov.tw/',
  },
  {
    id: 'new-taipei-christmasland-banqiao',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak'],
    isMustSee: true,
    titleEn: 'Christmasland in New Taipei City (Banqiao) — Kanahei Light World & 3D Laser Show',
    titleRu: 'Christmasland в Новом Тайбэе (Баньцяо) — 3D-маппинг и мир Kanahei',
    titleZh: '新北歡樂耶誕城 (板橋市民廣場)',
    dateRangeEn: 'Dec 22 – Dec 28 (Final Grand Week)',
    dateRangeRu: '22 дек – 28 дек (Финальная гранд-неделя фестиваля)',
    timeWindowEn: '17:30 – 23:00 Nightly (3D Laser Show every 30 mins)',
    timeWindowRu: '17:30 – 23:00 каждый вечер (3D-шоу каждые 30 минут)',
    cityEn: 'New Taipei City · Banqiao District',
    cityRu: 'Новый Тайбэй · район Баньцяо',
    venueEn: 'New Taipei City Plaza, Banqiao Station Plaza & Wanping Park',
    venueRu: 'Площадь Мэрии Нового Тайбэя, вокзал Баньцяо и парк Ваньпин',
    venueZh: '新北市市民廣場 / 板橋車站站前廣場 / 萬坪公園',
    priceBadgeEn: 'Free Admission',
    priceBadgeRu: 'Бесплатно',
    descriptionEn:
      'Taiwan’s largest winter holiday festival transforms four interconnected plazas in Banqiao (right near your Google TPKD office!) into a glowing wonderland. Catch the final grand week (Dec 22–28) featuring a 360-degree 3D laser projection show across the 33-story City Hall building, giant Kanahei’s Small Animals character installations, and 7 illuminated Instagrammable pedestrian skybridges.',
    descriptionRu:
      'Крупнейший зимний фестиваль Тайваня превращает четыре площади вокруг вокзала Баньцяо (совсем рядом с офисом Google TPKD!) в сияющий сказочный город. Успейте захватить финальную неделю (22–28 декабря): масштабное 3D-лазерное проекционное шоу на 33-этажном фасаде Мэрии, светящиеся фигуры персонажей Kanahei и 7 сияющих пешеходных мостов-туннелей.',
    highlightsEn: [
      'Taiwan’s largest 3D architectural projection mapping show every 30 minutes from 17:30 to 22:00',
      '7 themed LED skybridge light tunnels (purple wisteria, golden stars, snow crystal walkways) around Banqiao',
      'Free family carousel, festive market chalets, and giant Kanahei photo installations in Wanping Park',
    ],
    highlightsRu: [
      'Грандиозный 3D-видеомаппинг на здании Мэрии каждые 30 минут с 17:30 до 22:00',
      '7 тематических световых пешеходных мостов-галерей вокруг площади Баньцяо для лучших вечерних фото',
      'Бесплатные карусели, ярмарочные шале с глинтвейном и светящийся парк персонажей Kanahei',
    ],
    proTipEn:
      'Visit between Dec 22 and Dec 27 right after work at TPKD — take the Blue Line (BL07 Banqiao Exit 2 or 3A) directly into the underground plaza.',
    proTipRu:
      'Обязательно сходите сюда в первые дни (с 22 по 27 декабря) прямо после работы в офисе TPKD — выход со станции метро Banqiao (BL07, выход 2 или 3A) ведёт прямо в центр светового шоу.',
    placeIds: ['google-tpkd-office', 'chamonix-banqiao', 'oh-my-yakiyan-banqiao', 'nextdoor-brunch-banqiao'],
    googleMapsUrl: 'https://maps.google.com/?q=New+Taipei+City+Plaza+Banqiao',
    officialUrl: 'https://christmasland.ntpc.gov.tw/',
  },
  {
    id: 'zhongshan-linear-park-xmas-market',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Xinzhongshan Linear Park "Zootopia" Holiday Lights & Weekend Christmas Market',
    titleRu: 'Световой бульвар Чжуншань (Zootopia) и дизайн-ярмарка у метро Zhongshan',
    titleZh: '心中山線形公園 耶誕跨年光環境 & 週末市集',
    dateRangeEn: 'Dec 22 – Jan 7 (Markets Fri–Sun & Dec 31; Lights nightly)',
    dateRangeRu: '22 дек – 7 янв (Ярмарка Пт–Вс и 31 дек; Иллюминация ежедневно)',
    timeWindowEn: 'Lights 17:00–23:00 · Pop-Up Market Stalls 14:00–21:00',
    timeWindowRu: 'Иллюминация 17:00–23:00 · Ярмарочные ряды 14:00–21:00',
    cityEn: 'Taipei · Zhongshan District (MRT Zhongshan Exit 4)',
    cityRu: 'Тайбэй · район Чжуншань (метро Zhongshan, выход 4)',
    venueEn: 'Xinzhongshan Linear Park (stretching from MRT Zhongshan to Shuanglian)',
    venueRu: 'Линейный парк Синьчжуншань (бульвар от метро Zhongshan до Shuanglian)',
    venueZh: '心中山線形公園 (捷運中山站 4號出口至雙連站)',
    priceBadgeEn: 'Free Entry',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'Taipei’s trendiest neighborhood promenade between MRT Zhongshan (R11/G14) and Shuanglian (R12) lights up with a giant Disney "Zootopia" themed Christmas tree, a glowing elevated pergola walkway, street jazz buskers, and 60+ curated indie craft, hot mulled wine, canelé, and vintage fashion stalls.',
    descriptionRu:
      'Самый модный молодёжный бульвар Тайбэя между станциями метро Zhongshan и Shuanglian сияет тысячами огней: здесь установлена огромная тематическая ёлка Disney «Зверополис» (Zootopia), светящаяся смотровая галерея над парком, выступают уличные джаз-музыканты и работают более 60 дизайнерских киосков с горячим глинтвейном, канеле и винтажем.',
    highlightsEn: [
      'Giant themed holiday tree and glowing Disney Zootopia photo installations at MRT Zhongshan Exit 4',
      '60+ boutique market stalls selling handmade jewelry, French pastries, mulled wine & craft coffee',
      'Surrounded by Chifeng Street’s vintage clothing shops, Eslite Nanxi, and hidden alley cafes',
    ],
    highlightsRu: [
      'Гигантская праздничная ёлка и светящиеся фотозоны Disney Zootopia прямо у выхода №4 метро Zhongshan',
      'Более 60 дизайнерских лавок с украшениями ручной работы, французской выпечкой, глинтвейном и крафтовым кофе',
      'Вокруг парка — знаменитые винтажные переулки улицы Чифэн (Chifeng St) и книжный центр Eslite Nanxi',
    ],
    proTipEn:
      'Combine an evening stroll through Zhongshan Linear Park with a 12-minute walk west to Dihua Street & Dadaocheng Wharf!',
    proTipRu:
      'Вечернюю прогулку по парку Чжуншань идеально совместить с походом пешком (12 минут на запад) до исторической улицы Дихуа и пирса Дадаочэн!',
    placeIds: ['dihua-street', 'dadaocheng-wharf', 'regent-brasserie'],
    googleMapsUrl: 'https://maps.google.com/?q=Xinzhongshan+Linear+Park+Taipei',
    officialUrl: 'https://www.travel.taipei/',
  },
  {
    id: 'xinyi-christmas-wonderland',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Xinyi "Colorful Christmas Play" — Bellavita Snow Village & Artificial Snowfall',
    titleRu: 'Зимняя сказка в Синьи: Снежная деревня Bellavita и вечерний снегопад',
    titleZh: '信義區耶誕城：BELLAVITA 聖誕雪國 & 香堤大道飄雪秀',
    dateRangeEn: 'Dec 22 – Jan 3 (Daily)',
    dateRangeRu: '22 декабря – 3 января (Ежедневно)',
    timeWindowEn: '11:00 – 22:00 (Artificial Snowfall at 19:00 & 20:00)',
    timeWindowRu: '11:00 – 22:00 (Шоу снегопада в 19:00 и 20:00)',
    cityEn: 'Taipei · Xinyi Shopping District',
    cityRu: 'Тайбэй · пешеходный бульвар Синьи',
    venueEn: 'Bellavita Atrium, Breeze Nan Shan, Shin Kong Mitsukoshi & Xiangti Ave',
    venueRu: 'Атриум Bellavita, бульвар Сянти (Xiangti Ave) и площадь Shin Kong Mitsukoshi',
    venueZh: 'BELLAVITA 寶麗廣塲 / 香堤大道廣場 / 新光三越信義新天地',
    priceBadgeEn: 'Free Admission',
    priceBadgeRu: 'Бесплатно',
    descriptionEn:
      'Just minutes from your Xinyi stay, the entire pedestrian shopping district between Taipei City Hall and Taipei 101 turns into a winter wonderland. Step inside Bellavita’s glass-domed atrium to explore an elaborate indoor European alpine snow village, then walk Xiangti Avenue under glowing canopy lights with scheduled artificial snowfall and live acrobat/busker shows.',
    descriptionRu:
      'В нескольких минутах ходьбы от вашего дома в Синьи весь пешеходный квартал между Мэрией и Тайбэй 101 превращается в зимнюю сказку. Под стеклянным куполом роскошного ТЦ Bellavita выстроена целая альпийская снежная деревня с канатными вагончиками и мостиками, а на бульваре Сянти каждый вечер идёт искусственный снег и выступают уличные артисты.',
    highlightsEn: [
      'Bellavita 1F Atrium: Indoor Nordic snow village (best photographed from the 2nd & 3rd floor balconies)',
      'Shin Kong Mitsukoshi A11 Plaza: 20-meter kinetic Christmas tree with music-and-snow shows every 30 mins',
      'Taipei 101 4th Floor indoor garden & outdoor plaza luxury brand holiday installations (Chanel, Dior, Diptyque)',
    ],
    highlightsRu: [
      'Атриум Bellavita (1 этаж): крытая альпийская снежная деревня (лучшие кадры получаются с балконов 2 и 3 этажей)',
      'Площадь у A11: 20-метровая ёлка со свето-музыкальным шоу и запуском искусственного снега каждые 30 минут',
      'Праздничные арт-инсталляции мировых домов моды (Dior, Chanel, Cartier) внутри и вокруг Тайбэй 101',
    ],
    proTipEn:
      'Since you are staying near Brownies in Xinyi, stroll through Bellavita and Xiangti Avenue after 20:30 on a weekday when the photo queues are shortest!',
    proTipRu:
      'Так как вы живёте рядом с Brownies в Синьи, приходите в Bellavita и на бульвар Сянти в будний вечер после 20:30 — очередей для фото почти не будет!',
    placeIds: ['xinyi-district', 'taipei-101', 'my-stay-xinyi-brownies', 'haidilao-breeze-nanshan'],
    googleMapsUrl: 'https://maps.google.com/?q=Bellavita+Taipei+Xinyi',
    officialUrl: 'https://www.bellavita.com.tw/',
  },
  {
    id: 'taichung-christmas-carnival',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    titleEn: 'Taichung Christmas Carnival: Liuchuan & Green River Water-Dance Light Walk',
    titleRu: 'Рождественский карнавал Тайчжуна: водно-световое шоу на каналах Лючуань и Люйчуань',
    titleZh: '臺中耶誕嘉年華 (柳川水岸 / 綠川水岸 / 舊臺中火車站)',
    dateRangeEn: 'Dec 22 – Jan 3 (Nightly)',
    dateRangeRu: '22 декабря – 3 января (Каждый вечер)',
    timeWindowEn: '17:30 – 22:00 (Water-dance light show every 30 mins)',
    timeWindowRu: '17:30 – 22:00 (Водно-световое шоу каждые 30 минут)',
    cityEn: 'Taichung · Central District',
    cityRu: 'Тайчжун · исторический центр',
    venueEn: 'Old Taichung Railway Station Plaza, Liuchuan Canal & Green River Waterfront',
    venueRu: 'Старый вокзал Тайчжуна и набережные каналов Лючуань (柳川) и Люйчуань (綠川)',
    venueZh: '舊臺中火車站前廣場 / 柳川水岸景觀步道 / 綠川水岸',
    priceBadgeEn: 'Free Admission',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'When visiting Taichung (for Lihpao Land or a central Taiwan day trip), stay until dusk to experience the Taichung Christmas Carnival! A 17-meter Christmas tree anchors the historic 1917 red-brick Taichung Station, while the sunken Liuchuan and Green River canals glow with floating Disney/Pixar-themed light sculptures and synchronized musical water fountains.',
    descriptionRu:
      'Поездка в Тайчжун (например, в парк развлечений Lihpao Land) станет вдвойне волшебной вечером: с 22 декабря по 3 января в центре города проходит Рождественский карнавал Тайчжуна! У исторического здания вокзала 1917 года сияет 17-метровая ёлка, а вдоль пешеходных набережных каналов Лючуань и Люйчуань проходят музыкальные шоу танцующих фонтанов и светящихся инсталляций на воде.',
    highlightsEn: [
      'Floating illuminated art installations and musical water-dance shows along Liuchuan Canal (柳川)',
      '17-meter holiday tree and weekend dessert market at the 1917 Old Taichung Railway Station plaza',
      'Right next to Miyahara (宮原眼科) — famous for enjoying giant Christmas sundaes inside a 1927 ophthalmology building',
    ],
    highlightsRu: [
      'Светящиеся арт-объекты на воде и шоу танцующих фонтанов вдоль набережной канала Лючуань (柳川)',
      '17-метровая праздничная ёлка и ярмарка десертов на площади у старинного вокзала Тайчжуна 1917 года',
      'В двух шагах находится знаменитая кондитерская Miyahara (宮原眼科) с рождественским мороженым в здании 1927 года',
    ],
    proTipEn:
      'Spend the day riding roller coasters at Lihpao Land Resort in Taichung, then head into central Taichung at 17:30 for the canal lights and Miyahara ice cream before taking the late HSR back to Taipei!',
    proTipRu:
      'Проведите день на аттракционах в Lihpao Land, а к 17:30 отправляйтесь в центр Тайчжуна смотреть световое шоу на каналах и пробовать мороженое в Miyahara перед обратным поездом HSR в Тайбэй!',
    placeIds: ['lihpao-land-taichung'],
    googleMapsUrl: 'https://maps.google.com/?q=Liuchuan+Riverside+Walk+Taichung',
    officialUrl: 'https://travel.taichung.gov.tw/',
  },
  {
    id: 'lihpao-taichung-nye-concert',
    category: 'concerts_shows',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Lihpao Land Taichung — Sky Dream NYE Countdown Concert & Winter Parades',
    titleRu: 'Lihpao Land в Тайчжуне: зимние парады, колесо Sky Dream и новогодний концерт с салютом',
    titleZh: '台中麗寶樂園渡假區：耶誕新年季 & 跨年演唱會煙火秀',
    dateRangeEn: 'Dec 22 – Jan 7 (NYE Concert & Fireworks on Dec 31)',
    dateRangeRu: '22 дек – 7 янв (Новогодний концерт и салют — 31 дек)',
    timeWindowEn: 'Park & Parades 09:30–21:30 · NYE Concert Dec 31 20:00–00:30',
    timeWindowRu: 'Парк и парады 09:30–21:30 · Новогодний концерт 31 дек 20:00–00:30',
    cityEn: 'Taichung · Houli District (48 min via HSR from Taipei)',
    cityRu: 'Тайчжун · Хоули (48 мин на поезде HSR от Тайбэя)',
    venueEn: 'Lihpao Land Resort, Lihpao Outlet Mall & Sky Dream Ferris Wheel',
    venueRu: 'Курорт Lihpao Land, Lihpao Outlet Mall и колесо обозрения Sky Dream',
    venueZh: '麗寶樂園渡假區 / 麗寶OUTLET MALL / 天空之夢摩天輪',
    priceBadgeEn: 'Park NT$899 · Outlet & NYE Concert Free',
    priceBadgeRu: 'Парк NT$899 · Аутлет и NYE-концерт бесплатно',
    descriptionEn:
      'Taiwan’s largest amusement resort in Taichung celebrates Dec 22 – Jan 7 with Christmas street parades at Discovery World, Italian lakeside light installations at Lihpao Outlet Mall (modeled after Portofino & Lake Como), and a massive free New Year’s Eve Countdown Concert on Dec 31 featuring a 300-second 360° fireworks show beneath the 120-meter Sky Dream Ferris Wheel.',
    descriptionRu:
      'Крупнейший курорт развлечений Тайваня в Тайчжуне с 22 декабря по 7 января проводит зимний фестиваль: дневные рождественские парады в парке аттракционов Discovery World (с единственной в мире горкой Gravity Max с вертикальным обрывом 90°), вечерние световые шоу на озере в итальянском аутлете и грандиозный бесплатный новогодний концерт 31 декабря с 300-секундным салютом вокруг 120-метрового колеса обозрения Sky Dream.',
    highlightsEn: [
      'Ride the world-famous Gravity Max 90° tilt coaster & 120m Sky Dream Ferris Wheel',
      'Daily Christmas elves parade, snow bubble shows & Portofino-style Italian Outlet winter sales',
      'Dec 31 Night: Central Taiwan’s iconic NYE concert + Ferris wheel light animation + midnight fireworks',
    ],
    highlightsRu: [
      'Американская горка Gravity Max с наклоном рельса на 90° и 120-метровое колесо обозрения Sky Dream',
      'Ежедневные рождественские парады, шоу снежных пузырей и новогодние скидки в итальянском аутлете',
      'Вечер 31 декабря: большой новогодний концерт звёзд + световая анимация колеса + салют в полночь',
    ],
    proTipEn:
      'Take the High-Speed Rail (HSR) from Taipei Main Station or Banqiao to HSR Taichung Station (48 mins), then hop on the free Lihpao Resort Shuttle Bus (or Bus 155).',
    proTipRu:
      'Садитесь на скоростной поезд HSR на Taipei Main Station или в Баньцяо до станции HSR Taichung (48 минут), откуда прямо до парка ходит бесплатный шаттл Lihpao (или автобус №155).',
    placeIds: ['lihpao-land-taichung'],
    googleMapsUrl: 'https://maps.google.com/?q=Lihpao+Land+Taichung',
    officialUrl: 'https://www.lihpaoresort.com/',
  },
  {
    id: 'taichung-central-park-nye',
    category: 'nye_countdown',
    datePhase: ['nye_peak'],
    titleEn: 'Taichung Shuinan Central Park Mega New Year’s Eve Concert & Fireworks',
    titleRu: 'Гигантский новогодний опен-эйр и салют в парке Шуйнань (Тайчжун)',
    titleZh: '臺中水湳中央公園 跨年晚會',
    dateRangeEn: 'Dec 31 – Jan 1 (New Year’s Eve Night)',
    dateRangeRu: '31 декабря – 1 января (Новогодняя ночь)',
    timeWindowEn: '18:00 – 01:00 (Midnight Fireworks at 00:00)',
    timeWindowRu: '18:00 – 01:00 (Праздничный салют в 00:00)',
    cityEn: 'Taichung · Xitun District',
    cityRu: 'Тайчжун · Центральный парк Шуйнань',
    venueEn: 'Shuinan Central Park (水湳中央公園 — 67-hectare former airport park)',
    venueRu: 'Центральный парк Шуйнань (水湳中央公園, территория 67 гектаров)',
    venueZh: '臺中水湳中央公園',
    priceBadgeEn: 'Free Admission',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'Hosted on the 67-hectare grounds of Taichung’s former airport, Shuinan Central Park stages the largest open-field New Year’s Eve concert in Taiwan by land area — drawing over 200,000 spectators for a 7-hour concert of Mandopop/K-pop headliners, a massive street-food market near Fengchia Night Market, and wide-horizon midnight pyrotechnics.',
    descriptionRu:
      'На огромном поле (67 гектаров) бывшего аэропорта Тайчжуна проходит самый масштабный по площади новогодний опен-эйр Тайваня, собирающий более 200 000 зрителей: 7 часов живых выступлений звёзд Mandopop и K-pop, панорамный полуночный салют без заслоняющих небоскрёбов и близость к крупнейшему ночному рынку Фэнцзя (Fengchia).',
    highlightsEn: [
      'Taiwan’s largest open-lawn concert venue with unobstructed 180° views of midnight fireworks',
      'Warmer, drier winter weather in Taichung compared to northern Taiwan on New Year’s Eve',
      'Located right next to Fengchia Night Market (逢甲夜市) for post-concert late-night street food',
    ],
    highlightsRu: [
      'Самая просторная открытая концертная площадка страны с панорамным обзором полуночного салюта',
      'Более тёплая и сухая зимняя погода в Тайчжуне по сравнению с севером острова',
      'Рядом расположен знаменитый ночной рынок Фэнцзя (逢甲夜市) — можно поужинать сразу после шоу',
    ],
    proTipEn:
      'Free city shuttle buses run continuously from HSR Taichung Station and MRT Wenxin Yinghua Station directly to Shuinan Central Park on Dec 31.',
    proTipRu:
      '31 декабря от станции скоростных поездов HSR Taichung и станции метро Wenxin Yinghua до парка непрерывно курсируют бесплатные шаттлы.',
    placeIds: ['lihpao-land-taichung'],
    googleMapsUrl: 'https://maps.google.com/?q=Taichung+Central+Park',
    officialUrl: 'https://travel.taichung.gov.tw/',
  },
  {
    id: 'tamsui-new-year-fireworks',
    category: 'nye_countdown',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Tamsui Fisherman’s Wharf "1314" Early Cross-River NYE Fireworks (20:26)',
    titleRu: 'Ранний новогодний салют над рекой в Даньшуе в 20:26 («1314») и огни гавани',
    titleZh: '閃耀新北1314跨河煙火 (淡水漁人碼頭 / 八里)',
    dateRangeEn: 'Fireworks on Dec 31 at 20:26 · Harbour Lights Dec 22 – Jan 7',
    dateRangeRu: 'Салют 31 дек в 20:26 · Иллюминация гавани 22 дек – 7 янв',
    timeWindowEn: 'Dec 31 Concert 15:00–21:30 · Fireworks at 20:26 (13 min 14 sec long!)',
    timeWindowRu: 'Концерт 31 дек с 15:00 · Салют ровно в 20:26 (длится 13 мин 14 сек!)',
    cityEn: 'New Taipei City · Tamsui Riverfront',
    cityRu: 'Новый Тайбэй · набережная Даньшуй (Tamsui)',
    venueEn: 'Tamsui Fisherman’s Wharf, Lover’s Bridge, Customs Wharf & Bali Left Bank',
    venueRu: 'Рыбацкая пристань Даньшуй, Мост Влюблённых и таможенная пристань',
    venueZh: '淡水漁人碼頭 / 淡水海關碼頭 / 淡江大橋',
    priceBadgeEn: 'Free Riverfront Viewing',
    priceBadgeRu: 'Бесплатно с набережной',
    descriptionEn:
      'Want to see TWO major New Year’s Eve fireworks shows in one night? New Taipei City launches its massive cross-river fireworks over the Tamsui River and Danjiang Bridge early on Dec 31 at exactly 20:26 — lasting 13 minutes and 14 seconds ("1314" sounds like "forever love" in Mandarin) with over 30,000 shells! Plus, nightly harbour light installations run Dec 22 – Jan 7.',
    descriptionRu:
      'Хотите увидеть сразу ДВА грандиозных новогодних салюта за один вечер 31 декабря? В Даньшуе главный салют над широким устьем реки и мостом Даньцзян запускают заранее — ровно в 20:26! Шоу длится 13 минут 14 секунд (код «1314» по-китайски созвучен фразе «всю жизнь вместе») и включает более 30 000 залпов над водой.',
    highlightsEn: [
      'Early Dec 31 fireworks at 20:26 lets you watch Tamsui’s 13-min river show AND take the Red Line back to Taipei 101 before midnight!',
      '1-kilometer-wide water pyrotechnics launched across the Tamsui River mouth and Danjiang Bridge',
      'Afternoon live music stage, food trucks, and glowing harbour light art at Fisherman’s Wharf (Dec 22 – Jan 7)',
    ],
    highlightsRu: [
      'Ранний старт в 20:26 позволяет посмотреть 13-минутный салют над рекой и спокойно успеть на метро к полуночному салюту у Тайбэй 101!',
      'Размах водной пиротехники шириной более 1 километра над рекой Даньшуй и мостом Даньцзян',
      'Дневная сцена с живой музыкой, фудтраки и вечерняя световая выставка на пристани (с 22 дек по 7 янв)',
    ],
    proTipEn:
      'Take the MRT Red Line straight to R28 Tamsui Station, stroll the riverfront promenade for sunset at 17:15, watch the 20:26 fireworks, and ride the Red Line directly back to R03 Taipei 101!',
    proTipRu:
      'Прямая красная ветка метро (R28 Tamsui) идёт до самой набережной: приезжайте к закату (17:15), смотрите салют в 20:26 и возвращайтесь по той же красной ветке прямо к Тайбэй 101 (R03)!',
    placeIds: ['tamsui'],
    googleMapsUrl: 'https://maps.google.com/?q=Tamsui+Fishermans+Wharf',
    officialUrl: 'https://newtaipei.travel/',
  },
  {
    id: 'songshan-golden-pin-popups',
    category: 'markets_culture',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Songshan Cultural Park: Golden Pin Design Exhibition & Winter XR/Anime Pop-Ups',
    titleRu: 'Парк Суншань: выставка дизайна Golden Pin, XR-шоу и зимние поп-ап маркеты',
    titleZh: '松山文創園區：金點設計展 & 冬季限定快閃店・文創市集',
    dateRangeEn: 'Dec 22 – Jan 7 (Open Daily, incl. Jan 1 New Year’s Day)',
    dateRangeRu: '22 декабря – 7 января (Ежедневно, включая 1 января)',
    timeWindowEn: '10:00 – 18:00 (Eslite Spectrum Songyan open until 22:00)',
    timeWindowRu: '10:00 – 18:00 (Книжный и дизайн-центр Eslite открыт до 22:00)',
    cityEn: 'Taipei · Xinyi District (8 min walk from your stay)',
    cityRu: 'Тайбэй · район Синьи (8 минут пешком от вашего дома)',
    venueEn: 'Songshan Cultural and Creative Park (Taiwan Design Museum & Warehouses 1–5)',
    venueRu: 'Культурный парк Суншань (Музей дизайна Тайваня и павильоны 1–5)',
    venueZh: '松山文創園區 (台灣設計館 & 1–5號倉庫)',
    priceBadgeEn: 'Park & Markets Free · Exhibitions NT$150–450',
    priceBadgeRu: 'Парк и ярмарки бесплатно · Выставки NT$150–450',
    descriptionEn:
      'Just an 8-minute walk from your Xinyi stay near Brownies, the historic 1937 Songshan Tobacco Factory hosts the flagship "Golden Pin Design Exhibition" at the Taiwan Design Museum, the curated Japanese-Taiwanese "For Stockists Exhibition", immersive VR/XR digital art showcases in Warehouses 1–5, and weekend outdoor craft markets.',
    descriptionRu:
      'Всего в 8 минутах пешком от вашего дома в Синьи бывшая табачная фабрика 1937 года с внутренним прудом принимает главную выставку промышленного и пространственного дизайна Азии «Golden Pin Design Exhibition», японско-тайваньский шоурум «For Stockists», иммерсивные VR/XR-выставки и уличные ремесленные ярмарки выходного дня.',
    highlightsEn: [
      '2026 Golden Pin Design Exhibition at Taiwan Design Museum — showcasing Asia’s most innovative products & spaces',
      'Warehouses 1–5: Rotating winter anime/character pop-up stores and immersive VR/XR exhibitions',
      'Blow your own glass souvenir or sip hand-drip coffee inside the Baroque courtyard garden & Eslite Songyan',
    ],
    highlightsRu: [
      'Главная выставка азиатского дизайна Golden Pin Design Exhibition в Музее дизайна Тайваня',
      'Павильоны 1–5: зимние поп-ап магазины японского аниме, иллюстрации и иммерсивные VR-выставки',
      'Барочный сад с фонтаном, экологическим прудом и круглосуточный дух дизайн-молла Eslite Spectrum Songyan',
    ],
    proTipEn:
      'This is the #1 activity for January 1st (New Year’s Day) or a cool drizzly afternoon — walk right over from Brownies in Xinyi!',
    proTipRu:
      'Идеальный план на 1 января или прохладный день — дойти сюда пешком от дома у Brownies можно всего за 8 минут!',
    placeIds: ['songshan-cultural-park', 'sun-yat-sen-memorial', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Songshan+Cultural+and+Creative+Park',
    officialUrl: 'https://www.songshanculturalpark.org/',
  },
  {
    id: 'huashan-legacy-winter-fest',
    category: 'markets_culture',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Huashan 1914 Winter Pop-Up Exhibitions & Legacy Taipei "Temperature Festival" NYE Live',
    titleRu: 'Huashan 1914: 15+ зимних выставок и инди-фестиваль «Temperature Festival» в Legacy Taipei',
    titleZh: '華山1914冬季特展 & Legacy Taipei 跨年《溫度祭》',
    dateRangeEn: 'Dec 22 – Jan 7 (Live Concerts Dec 27, Dec 31 & Jan 4)',
    dateRangeRu: '22 дек – 7 янв (Концерты в Legacy: 27 дек, 31 дек и 4 янв)',
    timeWindowEn: 'Exhibitions 10:00–18:00 · Legacy Live Concerts & Bars 19:00–01:00',
    timeWindowRu: 'Выставки 10:00–18:00 · Концерты Legacy и винные бистро 19:00–01:00',
    cityEn: 'Taipei · Zhongzheng District (MRT Zhongxiao Xinsheng Exit 1)',
    cityRu: 'Тайбэй · район Чжунчжэн (метро Zhongxiao Xinsheng, выход 1)',
    venueEn: 'Huashan 1914 Creative Park & Legacy Taipei Music Hall (1 Bade Rd Sec 1)',
    venueRu: 'Креативный парк Huashan 1914 и концертный зал Legacy Taipei',
    venueZh: '華山1914文化創意產業園區 / Legacy Taipei 傳音樂展演空間',
    priceBadgeEn: 'Grounds Free · Live Shows & Pop-Ups Ticketed',
    priceBadgeRu: 'Парк бесплатно · Поп-апы и концерты по билетам',
    descriptionEn:
      'Housed in a 1914 Japanese-era sake and camphor refinery, Huashan 1914 is Taipei’s capital of pop culture and live indie music. By day, explore 15+ simultaneous character pop-up stores, photography exhibitions, and weekend lawn markets; by night, catch Taipei’s best indie bands at Legacy Taipei — including the "Next Big Thing Year-End Special" (Dec 27), the "Temperature Festival: Time" New Year’s Eve concert (Dec 31), and "Eternal 3rd Anniversary Live" (Jan 4).',
    descriptionRu:
      'В старинных краснокирпичных цехах японского винного завода 1914 года кипит главная поп-культурная и музыкальная жизнь Тайбэя. Днём здесь работают более 15 зимних выставок, аниме поп-ап магазинов и дизайн-бутиков, а вечером в зале Legacy Taipei проходят лучшие инди-концерты сезона: итоговое шоу «The Next Big Thing» (27 дек), новогодний фестиваль «Temperature Festival: Time» (31 дек) и концерт 4 января.',
    highlightsEn: [
      'Dec 27 & Dec 31 at Legacy Taipei: Year-End Indie Showcase & "Temperature Festival (溫度祭)" NYE countdown gig',
      '15+ simultaneous indoor pop-up exhibitions, Wooderful Life music-box workshop, and Spot Huashan arthouse cinema',
      'Right across the street from Syntrend & Guanghua Digital Plaza for tech/gaming shopping and Meet Fresh taro desserts',
    ],
    highlightsRu: [
      '27 и 31 декабря в Legacy Taipei: большой инди-концерт года и новогодний фестиваль «Temperature Festival (溫度祭)»',
      'Более 15 одновременных поп-ап выставок, мастерская деревянных музыкальных шкатулок Wooderful Life и артхаус-кинотеатр Spot',
      'Через дорогу — техно-молл Syntrend и легендарные тайваньские десерты Meet Fresh (鮮芋仙)',
    ],
    proTipEn:
      'If you want an intimate, hipster New Year’s Eve with craft beer and live Taiwanese indie bands instead of massive stadium crowds, Legacy Taipei’s Dec 31 "Temperature Festival" at Huashan 1914 is the local favorite!',
    proTipRu:
      'Если вместо огромной толпы на площади вы хотите встретить Новый год под живую инди-музыку с крафтовым напитком в творческой атмосфере — выбирайте фестиваль «Temperature Festival» 31 декабря в Huashan 1914!',
    placeIds: ['meet-fresh-syntrend', 'din-tai-fung-xinsheng', 'fuhang-soy-milk'],
    googleMapsUrl: 'https://maps.google.com/?q=Huashan+1914+Creative+Park+Taipei',
    officialUrl: 'https://www.huashan1914.com/',
  },
  {
    id: 'gongguan-water-park-xmas',
    category: 'christmas_lights',
    datePhase: ['xmas_week', 'nye_peak'],
    titleEn: 'Gongguan Christmas Season: Taipei Water Park Light Festival & Concerts',
    titleRu: 'Рождественский фестиваль света и музыки в Водном парке Гунгуань (Taipei Water Park)',
    titleZh: '公館聖誕季 (臺北自來水園區)',
    dateRangeEn: 'Dec 22 – Dec 31 (Final 10 Days of Festival)',
    dateRangeRu: '22 декабря – 31 декабря (Финальные 10 дней)',
    timeWindowEn: 'Park 09:00–20:00 (Fri–Sun & Dec 31 illuminated until 22:00)',
    timeWindowRu: '09:00–20:00 (Пт–Вс и 31 дек подсветка до 22:00)',
    cityEn: 'Taipei · Zhongzheng / Gongguan (MRT Gongguan Exit 4)',
    cityRu: 'Тайбэй · студенческий квартал Гунгуань (метро Gongguan)',
    venueEn: 'Taipei Water Park & 1908 Baroque Museum of Drinking Water (1 Siyuan St)',
    venueRu: 'Водный парк Тайбэя и барочный Музей питьевой воды 1908 года',
    venueZh: '臺北自來水園區 (思源街1號 / 捷運公館站 4號出口)',
    priceBadgeEn: 'Admission NT$50 (~$1.50)',
    priceBadgeRu: 'Вход всего NT$50 (~$1.50)',
    descriptionEn:
      'A beloved Taipei winter tradition now in its 15th year: the historic 1908 Neoclassical Baroque Water Pump Museum in Gongguan is surrounded by thousands of red poinsettias, glowing starlight tunnels, water-droplet light sculptures, and open-air classical/jazz concerts — right next to National Taiwan University (NTU) and Gongguan Night Market!',
    descriptionRu:
      'Уютная зимняя традиция Тайбэя: неоклассический барочный дворец Музея воды 1908 года в студенческом районе Гунгуань украшают тысячами алых пуансеттий, световыми арками и зеркальными водными инсталляциями. По выходным на лужайке перед дворцом звучит живая классическая и джазовая музыка, а в двух шагах шумит ночной рынок Гунгуань.',
    highlightsEn: [
      'Illuminated 1908 Neoclassical Baroque colonnade reflecting in the winter garden pools',
      'Sea of seasonal poinsettia flowers by day + romantic starlight tunnels at dusk',
      'Combine with Michelin Bib Gourmand street food at Gongguan Night Market & Treasure Hill Artist Village',
    ],
    highlightsRu: [
      'Подсвеченная барочная колоннада 1908 года — одно из самых фотогеничных исторических зданий Тайбэя',
      'Днём — цветочные композиции из пуансеттий, вечером — романтичные световые туннели без давки',
      'Рядом находятся ночной рынок Гунгуань (с булочками гуа-бао из гида Мишлен) и арт-деревня Treasure Hill',
    ],
    proTipEn:
      'Visit around 16:30 to see the Baroque museum in golden-hour light, watch the Christmas lights turn on at 17:30, and then walk 3 minutes to Gongguan Night Market for dinner!',
    proTipRu:
      'Приходите к 16:30, чтобы застать барочный дворец на закате, дождитесь включения огней в 17:30, а затем идите ужинать на соседний ночной рынок Гунгуань!',
    placeIds: ['gongguan', 'wistaria-tea-house'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+Water+Park+Gongguan',
    officialUrl: 'https://waterpark.water.gov.taipei/',
  },
  {
    id: 'dadaocheng-dihua-winter-market',
    category: 'markets_culture',
    datePhase: ['xmas_week', 'nye_peak', 'jan_week'],
    isMustSee: true,
    titleEn: 'Dadaocheng Wharf Pier 5 Holiday Sunset DJ Parties & Dihua Pre-Lunar New Year Fair',
    titleRu: 'Вечеринки на закате у пирса Дадаочэн (Pier 5) и предновогодняя улица Дихуа',
    titleZh: '大稻埕碼頭貨櫃市集跨年派對 & 迪化街年貨大街暖身季',
    dateRangeEn: 'Dec 22 – Jan 7 (Daily)',
    dateRangeRu: '22 декабря – 7 января (Ежедневно)',
    timeWindowEn: 'Dihua Street 10:00–19:30 · Pier 5 Sunset Market & DJs 16:00–22:00',
    timeWindowRu: 'Дихуа 10:00–19:30 · Пирс №5 (закат, бары и DJ) 16:00–22:00',
    cityEn: 'Taipei · Datong District',
    cityRu: 'Тайбэй · исторический район Датун',
    venueEn: 'Dadaocheng Wharf Pier 5 (Gate 5) & Dihua Street Section 1',
    venueRu: 'Пристань Дадаочэн (Пирс №5) и историческая улица Дихуа',
    venueZh: '大稻埕碼頭五號水門 / 迪化街一段',
    priceBadgeEn: 'Free Entry',
    priceBadgeRu: 'Вход свободный',
    descriptionEn:
      'Between late December and early January, historic Dihua Street hangs thousands of hand-painted red lanterns and begins its lively pre-Lunar New Year street fair warmup (free tastings of nougat, dried mango, mulled oolong tea, and flaky pastries). At 16:45, walk 5 minutes to Gate 5 for Dadaocheng Wharf’s two-story riverside shipping-container market featuring sunset DJ sets, wood-fired pizza, and hot mulled wine on the water.',
    descriptionRu:
      'В конце декабря и первой неделе января старинная купеческая улица Дихуа украшается тысячами красных фонарей в преддверии Китайского Нового года: лавки выставляют дегустации свежей нуги, сушёного манго и выпечки. А к 16:45 все переходят через ворота №5 на набережную Дадаочэн, где на крышах двухэтажных контейнеров прямо у воды играют диджеи, подают горячий глинтвейн, коктейли и пиццу из печи с видом на закат.',
    highlightsEn: [
      'Dihua Street red lantern canopies & early Lunar New Year artisan food tastings',
      'Rooftop river-view decks on shipping containers at Pier 5 with live evening acoustic & DJ sets',
      'Rent a YouBike right at Pier 5 for a breezy winter riverside ride along the Tamsui River',
    ],
    highlightsRu: [
      'Своды из сотен красных фонарей над барочными аркадами улицы Дихуа и дегустации тайваньских сладостей',
      'Смотровые террасы на втором этаже контейнеров у воды (Пирс №5) с вечерними DJ-сетами и глинтвейном',
      'Прямо у пирса можно взять велосипед YouBike и прокатиться вдоль набережной реки Даньшуй',
    ],
    proTipEn:
      'Start at Dihua Street around 15:00 for tea and pastry shopping, then walk through Water Gate 5 at 16:45 to claim a rooftop container table before sunset!',
    proTipRu:
      'Начните прогулку по улице Дихуа около 15:00 (чай, сладости и фонари), а к 16:45 выходите через ворота №5 к реке, чтобы занять столик на крыше контейнера к закату!',
    placeIds: ['dadaocheng-wharf', 'dihua-street'],
    googleMapsUrl: 'https://maps.google.com/?q=Dadaocheng+Wharf+Container+Market',
    officialUrl: 'https://www.travel.taipei/',
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
