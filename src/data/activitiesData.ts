export type ActivityCategory =
  | 'all'
  | 'massage_wellness'
  | 'tea_culture'
  | 'local_fun'
  | 'diy_crafts';

export interface TaiwanActivityItem {
  id: string;
  category: Exclude<ActivityCategory, 'all'>;
  isSignature?: boolean;
  titleEn: string;
  titleRu: string;
  titleZh: string;
  subtitleEn: string;
  subtitleRu: string;
  durationEn: string;
  durationRu: string;
  bestTimeEn: string;
  bestTimeRu: string;
  priceRangeEn: string;
  priceRangeRu: string;
  venueEn: string;
  venueRu: string;
  venueZh: string;
  descriptionEn: string;
  descriptionRu: string;
  stepByStepEn: string[];
  stepByStepRu: string[];
  proTipEn: string;
  proTipRu: string;
  placeIds: string[];
  googleMapsUrl: string;
  bookingOrOfficialUrl: string;
}

export const ACTIVITY_CATEGORIES: Array<{
  id: ActivityCategory;
  labelEn: string;
  labelRu: string;
  emoji: string;
}> = [
  {
    id: 'all',
    labelEn: 'All Taiwanese Activities (12)',
    labelRu: 'Все активности Тайваня (12)',
    emoji: '💆',
  },
  {
    id: 'massage_wellness',
    labelEn: 'Foot Massage, Knife Therapy & Spa',
    labelRu: 'Массаж стоп, массаж ножами и спа',
    emoji: '🦶',
  },
  {
    id: 'tea_culture',
    labelEn: 'Tea Drinking & Gongfu Ceremony',
    labelRu: 'Чайные церемонии и чаепитие',
    emoji: '🍵',
  },
  {
    id: 'local_fun',
    labelEn: 'Shrimp Fishing & Local Nightlife',
    labelRu: 'Ловля креветок и местные развлечения',
    emoji: '🦐',
  },
  {
    id: 'diy_crafts',
    labelEn: 'Hands-On DIY & Dress-Up',
    labelRu: 'Мастер-классы (DIY) и ретро-образы',
    emoji: '🧁',
  },
];

export const TAIWAN_ACTIVITIES: TaiwanActivityItem[] = [
  {
    id: 'taiwanese-foot-reflexology-6star',
    category: 'massage_wellness',
    isSignature: true,
    titleEn: 'Traditional Taiwanese Foot Reflexology & Herbal Soak (6 Star Foot Massage)',
    titleRu: 'Традиционный тайваньский массаж стоп и травяная ванночка (6 Star Foot Massage)',
    titleZh: '台灣傳統腳底按摩 & 肩頸舒壓 (台北六星集足體養生會館)',
    subtitleEn: 'After 15,000+ steps of sightseeing, nothing beats Taipei’s world-famous meridian foot reflexology',
    subtitleRu: 'После 15 000+ шагов по городу нет ничего лучше знаменитого тайваньского рефлекторного массажа стоп',
    durationEn: '60 – 90 mins',
    durationRu: '60 – 90 минут',
    bestTimeEn: 'Daily 09:00 – 01:00 (Best at 21:00–00:30 after night markets!)',
    bestTimeRu: 'Ежедневно 09:00 – 01:00 (Идеально после 21:00 после ночных рынков!)',
    priceRangeEn: 'NT$1,000–1,480 (~$32–$46) for 60 mins',
    priceRangeRu: 'NT$1,000–1,480 (~$32–$46) за 60 минут',
    venueEn: '6 Star Foot Massage — Taipei City Hall Branch (17-3 Zhongxiao E Rd Sec 5, Xinyi)',
    venueRu: 'Центр 6 Star Foot Massage — филиал у Мэрии (Синьи, 9 мин пешком от вашего дома!)',
    venueZh: '台北六星集足體養生會館 市府會館 (信義區忠孝東路五段17-3號)',
    descriptionEn:
      'Taiwanese foot reflexology (腳底按摩) is a national institution based on mapping every organ and meridian of the body to pressure points on the soles of your feet. At Taipei’s premier resort-style sanctuary "6 Star Foot Massage" (just a 9-minute walk from your Xinyi stay near Brownies!), you begin with a warm sea-salt and Chinese herbal foot soak while the master massages your head, neck, and shoulders, followed by 50 minutes of deep thumb-knuckle reflexology on plush reclining armchairs and warm organic chamomile/burdock tea.',
    descriptionRu:
      'Тайваньский массаж стоп (腳底按摩) — настоящий культурный символ острова: каждая точка на подошве отвечает за определённый орган и меридиан тела. В лучшем массажном центре города «6 Star Foot Massage» (всего в 9 минутах ходьбы от вашего дома в Синьи у Brownies!) ритуал начинается с горячей ванночки для ног с морской солью и китайскими травами, во время которой мастер разминает шею, плечи и голову. Затем вы откидываетесь в глубоком кресле на 50 минут точечной проработки стоп и икр с горячими полотенцами и завершаете сеанс чашкой тёплого травяного чая.',
    stepByStepEn: [
      'Step 1 (10 min): Soak feet in a steaming ceramic tub of sea salt & herbs while getting a neck & shoulder acupressure massage',
      'Step 2 (50 min): Recline in a plush chair as the therapist works every reflexology zone from toes to calves, finishing with hot towel wraps',
      'Step 3: Sip freshly brewed hot herbal burdock/chamomile tea; say "Qīng yīdiǎn (輕一點)" if you want softer pressure!',
    ],
    stepByStepRu: [
      'Шаг 1 (10 мин): Распаривание ног в горячей ванночке с морской солью и травами + одновременный массаж шеи и плеч',
      'Шаг 2 (50 мин): Глубокая проработка всех рефлекторных точек стоп, лодыжек и икр в мягком кресле-реклайнере + компресс горячими полотенцами',
      'Шаг 3: Чаепитие с горячим травяным настоем после сеанса. Полезная фраза: скажите мастеру «Цин и-дянь (輕一點)», если хотите помягче!',
    ],
    proTipEn:
      'The Taipei City Hall branch of 6 Star Foot Massage is open until 01:00 AM and is only 700 meters from your Xinyi stay — pre-book a voucher on Klook or ask your concierge to reserve a 21:30 slot!',
    proTipRu:
      'Филиал 6 Star Foot Massage у станции Taipei City Hall работает до 01:00 ночи и находится всего в 700 метрах от вашего дома в Синьи — идеально зайти перед сном!',
    placeIds: ['six-star-foot-massage', 'my-stay-xinyi-brownies', 'xinyi-district'],
    googleMapsUrl: 'https://maps.google.com/?q=6+Star+Foot+Massage+Taipei+City+Hall+Xinyi',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/activity/10064-6-star-foot-massage-taipei/',
  },
  {
    id: 'ancient-knife-massage-daoliao',
    category: 'massage_wellness',
    isSignature: true,
    titleEn: 'Ancient Taiwanese "Knife Massage" Therapy (刀療 Dao Liao — Steel Cleaver Meridian Tapping)',
    titleRu: 'Древний тайваньский «Массаж ножами» (刀療 Дао-Ляо — акупунктурное постукивание тесаками)',
    titleZh: '中華世界刀療協會 — 台灣傳統刀療體驗 (台北地下街 Y16)',
    subtitleEn: 'A 2,000-year-old esoteric healing art using two blunted steel cleavers to vibrate deep fascia knots',
    subtitleRu: 'Уникальная 2000-летняя практика: ритмичный массаж двумя затупленными стальными тесаками через ткань',
    durationEn: '15 – 40 mins',
    durationRu: '15 – 40 минут',
    bestTimeEn: 'Daily 11:00 – 20:30 (Walk-ins welcome)',
    bestTimeRu: 'Ежедневно 11:00 – 20:30 (Можно без предварительной записи)',
    priceRangeEn: 'NT$350 (10-min trial) to NT$1,000 (~$31) full session',
    priceRangeRu: 'От NT$350 (пробные 10 мин) до NT$1,000 (~$31) полный сеанс',
    venueEn: 'World Knife Massage Association — Taipei City Mall Exit Y16 (B1, 100 Civic Blvd Sec 1)',
    venueRu: 'Ассоциация массажа ножами — подземная галерея Taipei City Mall у выхода Y16 (вокзал Taipei Main)',
    venueZh: '中華世界刀療協會 (台北地下街 接近Y16出口 / 市民大道一段100號B1)',
    descriptionEn:
      'Originating with Tang Dynasty Buddhist monks over 2,000 years ago and preserved almost exclusively in Taiwan today, Knife Therapy (刀療 Dao Liao) looks dramatic but feels remarkably soothing! You lie comfortably covered in a thick yellow cloth while a certified master rhythmically chops and taps along your back, shoulders, head, and legs using two heavy, specially blunted surgical-steel cleavers. The heavy metal blades create a deep, resonant percussive vibration that penetrates deeper than human fingers and releases stubborn fascia tension.',
    descriptionRu:
      'Практика «Дао-Ляо» (刀療 — исцеление ножами) зародилась у буддийских монахов эпохи Тан более 2000 лет назад и сегодня сохранилась практически только на Тайване! Выглядит это невероятно эффектно, но абсолютно безопасно и очень приятно: вас накрывают плотным жёлтым полотном, после чего сертифицированный мастер берёт два тяжёлых, специально затупленных стальных тесака и начинает ритмично простукивать меридианы вдоль спины, плеч, шеи и ног. Тяжёлая сталь создаёт глубокую низкочастотную вибрацию и статический заряд, которые снимают зажимы глубже обычного ручного массажа.',
    stepByStepEn: [
      '100% Safe & Painless: The heavy steel cleavers have rounded, unsharpened edges and always tap over a thick cloth towel',
      'Starts with a brief meridian energy check, followed by rhythmic dual-cleaver percussion from head to toe',
      'You can start with a quick 10-minute neck & shoulder trial (NT$350) or do a full 30-minute body session (~NT$1,000)',
    ],
    stepByStepRu: [
      '100% безопасно и безболезненно: лезвия тесаков полностью затуплены и закруглены, а массаж идёт поверх плотной ткани',
      'Ритмичный двойной стук тяжёлых стальных клинков погружает в медитативное состояние и моментально прогревает мышцы спины',
      'Можно взять короткий 10-минутный пробный сеанс на шейно-воротниковую зону (NT$350) или полный 30-минутный массаж всего тела (~NT$1,000)',
    ],
    proTipEn:
      'To find it easily: Enter Taipei Main Station Underground Mall Y (台北地下街) and walk down the central shopping corridor to Pillar / Exit Y16!',
    proTipRu:
      'Как легко найти: спуститесь в подземную торговую улицу Y (Taipei City Mall / 台北地下街) у вокзала Taipei Main Station и идите по коридору до указателя выхода Y16!',
    placeIds: ['taipei-knife-massage', 'haidilao-q-square', 'dihua-street'],
    googleMapsUrl: 'https://maps.google.com/?q=Taipei+City+Mall+Exit+Y16+Knife+Massage',
    bookingOrOfficialUrl: 'https://www.daoliao.com/',
  },
  {
    id: 'taiwanese-seated-shampoo-massage',
    category: 'massage_wellness',
    isSignature: true,
    titleEn: 'Taiwanese Salon Seated Bubble Shampoo & Acupressure Scalp Massage (台式坐洗)',
    titleRu: 'Тайваньское мытьё головы сидя в кресле с пенной скульптурой и массажем скальпа (台式坐洗)',
    titleZh: '正宗台式坐洗 & 泡沫造型頭皮SPA按摩',
    subtitleEn: 'Sit upright as a stylist sculpts gravity-defying shampoo foam towers on your head + 30-min scalp massage',
    subtitleRu: 'Знаменитый ритуал салонов Тайбэя: 30 минут точечного массажа головы и невероятные башни из густой пены для фото!',
    durationEn: '45 – 60 mins',
    durationRu: '45 – 60 минут',
    bestTimeEn: 'Daily 11:00 – 20:30',
    bestTimeRu: 'Ежедневно 11:00 – 20:30',
    priceRangeEn: 'NT$450–900 (~$14–$28) incl. blow-dry styling',
    priceRangeRu: 'NT$450–900 (~$14–$28) включая укладку феном',
    venueEn: 'Pro Cutti / H Gallery / Ximending & Zhongshan Traditional Hair Salons',
    venueRu: 'Традиционные и спа-салоны в районах Симыньдин, Чжуншань и у Тайбэй 101',
    venueZh: '西門町 / 中山區 / 永康街 台式坐洗髮廊',
    descriptionEn:
      'Unlike anywhere else in the world, a traditional Taiwanese shampoo (台式坐洗) happens while you sit completely upright in the styling chair! The stylist pours cool shampoo directly onto your dry hair and uses small splashes of water to whip up a dense, drip-free lather—massaging your scalp, temples, neck, and ears for 25 minutes before sculpting your foam-covered hair into hilarious gravity-defying shapes (a towering 30cm unicorn horn, Mickey Mouse ears, a heart, or Taipei 101!) so you can take photos before rinsing and blow-drying.',
    descriptionRu:
      'Уникальная тайваньская традиция, которую обожают путешественники: в местных салонах голову моют прямо сидя в обычном парикмахерском кресле! Мастер наносит шампунь прямо на сухие волосы и взбивает его в настолько густую, плотную пену, что ни одна капля не течёт по лицу. В течение 25 минут вам делают глубокий акупунктурный массаж кожи головы, висков, шеи и ушных раковин, а затем прямо на вашей голове лепят из пены невероятные стоячие скульптуры (30-сантиметровый рог единорога, сердечко, ушки Микки-Мауса или шпиль Тайбэй 101!) для весёлых селфи, после чего смывают воду и делают красивую укладку феном.',
    stepByStepEn: [
      'Sit upright in the salon chair—the dense Taiwanese shampoo foam technique never drips down your face!',
      'Photo Moment: Ask the stylist for "Pàopào zàoxíng (泡泡造型)" to get a towering foam cone, heart, or bow sculpted on your head',
      'Finishes with a warm waterfall rinse, hot towel ear/neck press, and professional blow-dry styling',
    ],
    stepByStepRu: [
      'Всё происходит сидя перед зеркалом — особая техника взбивания густой пены гарантирует, что вода не течёт на лицо и одежду',
      'Момент для фото: покажите мастеру фразу «泡泡造型 (Pàopào zàoxíng)», чтобы вам слепили высокую пенную корону, рог или сердечко!',
      'Завершается тёплым ополаскиванием, горячим компрессом для ушей и шеи и профессиональной укладкой феном',
    ],
    proTipEn:
      'Show the stylist the Chinese phrase "請幫我做台式坐洗＋泡泡造型拍照" ("Please give me a seated shampoo + foam sculpture for photos")!',
    proTipRu:
      'Просто покажите в салоне фразу на экране: «請幫我做台式坐洗＋泡泡造型拍照» («Пожалуйста, сделайте тайваньское мытьё сидя + пенную фигуру для фото»)!',
    placeIds: ['ximending', 'yongkang-street', 'taipei-101'],
    googleMapsUrl: 'https://maps.google.com/?q=Ximending+Hair+Salon+Shampoo+Taipei',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/city/19-taipei-things-to-do/',
  },
  {
    id: 'traditional-gongfu-tea-drinking',
    category: 'tea_culture',
    isSignature: true,
    titleEn: 'Traditional Taiwanese Gongfu Tea Ceremony & Historic Tea House Tasting',
    titleRu: 'Традиционная тайваньская чайная церемония Гунфу-Ча в деревянном чайном доме',
    titleZh: '台灣工夫茶品茗體驗 (隱山茶房・紫藤盧・開門茶堂)',
    subtitleEn: 'Brew High-Mountain Alishan Oolong & Oriental Beauty in miniature clay teapots with artisan tea snacks',
    subtitleRu: 'Заваривание высокогорного улуна Алишань и «Восточной красавицы» в глиняных чайниках с чайными сладостями',
    durationEn: '1.5 – 2.5 hours',
    durationRu: '1.5 – 2.5 часа',
    bestTimeEn: 'Afternoon 14:00 – 18:00 or calm evening tea',
    bestTimeRu: 'Днём 14:00 – 18:00 или уютное вечернее чаепитие',
    priceRangeEn: 'NT$350–650 (~$11–$20) per person',
    priceRangeRu: 'NT$350–650 (~$11–$20) на человека',
    venueEn: 'Hermit’s Hut (Xinyi — 6 min from your stay), Kai Men Cha Dang (Songshan) & Wistaria Tea House',
    venueRu: 'Чайные дома Hermit’s Hut (Синьи — 6 мин от вашего дома), Kai Men Cha Dang и Wistaria Tea House',
    venueZh: '隱山茶房 (信義區) / 開門茶堂 (民生社區) / 紫藤盧',
    descriptionEn:
      'Taiwan produces the world’s most prized high-mountain oolong teas (高山烏龍茶). Sitting in a tranquil wooden tea house with a personal hot-water kettle at your table is the ultimate slow-paced Taipei ritual. A tea master brings a wooden tray with a miniature Yixing clay teapot, a tall cylindrical "aroma cup" (聞香杯), and a low tasting cup, teaching you how to wake the rolled tea leaves and steep 5 to 6 evolving infusions of floral Alishan Oolong, honey-scented Oriental Beauty (東方美人), or roasted Dong Ding Oolong.',
    descriptionRu:
      'Тайвань выращивает лучшие в мире высокогорные улуны (高山烏龍茶), и неспешное чаепитие «Гунфу-Ча» в тихом деревянном чайном доме — обязательная часть путешествия. Вам приносят деревянный чабань, крошечный глиняный чайник, высокую узкую чашечку для вдыхания аромата («вэньсянбэй» 聞香杯) и пиалу, а также персональный чайник на подогреве. Чайный мастер покажет, как правильно «разбудить» скрученный чайный лист первым проливом и сделать 5–6 заварок цветочного улуна с гор Алишань, медовой «Восточной красавицы» (東方美人) или прожаренного Тегуаньинь под домашние пирожные из зелёных бобов.',
    stepByStepEn: [
      'Pour the first infusion into the tall narrow Aroma Cup (聞香杯), place the tasting cup on top, flip it over, and roll the empty aroma cup between your palms to inhale the warm honey-orchid fragrance!',
      'Keep your personal water kettle simmering at your table to steep 5–6 rounds from the same leaves',
      'Pair with traditional handmade green-bean糕 (mung bean糕), dried愛文 mango, and salted pumpkin seeds',
    ],
    stepByStepRu: [
      'Секрет ритуала: первый настой наливают в высокую узкую чашечку аромата (聞香杯), накрывают пиалой, переворачивают и катают пустую тёплую чашечку в ладонях, вдыхая густой цветочно-медовый аромат!',
      'На вашем столе стоит горячий чайник — одни и те же листья раскрывают новый вкус на протяжении 5–6 проливов',
      'К чаю подают тающие во рту пирожные из маша, тайваньские орешки и вяленое манго',
    ],
    proTipEn:
      'Hermit’s Hut (隱山茶房) is only a 6-minute walk from your Xinyi stay near Brownies — or visit Kai Men Cha Dang (開門茶堂) in leafy Minsheng Community for contemporary tea & taro/red-bean madeleines!',
    proTipRu:
      'Уютный чайный дом Hermit’s Hut (隱山茶房) находится всего в 6 минутах пешком от вашего дома у Brownies в Синьи, а в Kai Men Cha Dang подают потрясающие сеты улунов с авторскими десертами!',
    placeIds: ['hermits-hut', 'kai-men-cha-dang', 'wistaria-tea-house', 'bremen-tea-house'],
    googleMapsUrl: 'https://maps.google.com/?q=Hermits+Hut+Tea+House+Xinyi+Taipei',
    bookingOrOfficialUrl: 'https://maps.google.com/?q=Kai+Men+Cha+Dang+Taipei',
  },
  {
    id: 'maokong-mountain-tea-terrace-night',
    category: 'tea_culture',
    isSignature: true,
    titleEn: 'Maokong Gondola & Open-Air Mountain Tea Drinking Overlooking Taipei 101',
    titleRu: 'Вечернее чаепитие на горных террасах Маокун с панорамным видом на Тайбэй 101',
    titleZh: '貓空山頂景觀茶坊 — 木柵鐵觀音夜間品茗 & 台北101夜景',
    subtitleEn: 'Ride the glass-bottom gondola into the hills and brew locally grown Tieguanyin tea under the stars',
    subtitleRu: 'Поднимитесь в чайные горы на кабинке со стеклянным дном и заваривайте чай у живого огня с видом на ночной мегаполис',
    durationEn: '3 – 4 hours',
    durationRu: '3 – 4 часа',
    bestTimeEn: 'Arrive at 16:30 for sunset + night skyline (Many tea houses open 24h!)',
    bestTimeRu: 'Приезжайте к 16:30 на закат и ночные огни (Многие чайные открыты 24 часа!)',
    priceRangeEn: 'Gondola NT$120 · Mountain Tea & Tea-Oil Chicken ~NT$400–650',
    priceRangeRu: 'Канатка NT$120 · Чай на террасе и ужин с чаем ~NT$400–650',
    venueEn: 'Maokong Tea Terraces (Yao Yue Teahouse 邀月茶坊 & Camphor Trail Teahouses)',
    venueRu: 'Горные чайные террасы Маокун (круглосуточная чайная Yao Yue 邀月茶坊 и тропа Камфорного дерева)',
    venueZh: '貓空纜車 & 貓空邀月茶坊 / 樟樹步道景觀茶座',
    descriptionEn:
      'In Taipei, locals don’t go to bars to catch up late into the night—they drive or ride the gondola up to Maokong Mountain to drink hot tea under the trees! Board a "Crystal Cabin" glass-bottom gondola at MRT Taipei Zoo, glide 4 km over emerald valleys to Maokong Station, and claim a wooden terrace table overlooking Taipei 101. Order a tin of locally grown charcoal-roasted Muzha Tieguanyin (木柵鐵觀音), tea-oil noodles (茶油麵線), and crispy fried tea-leaf tempura while watching the city lights.',
    descriptionRu:
      'Любимая традиция жителей Тайбэя — ехать вечером не в бар, а высоко в чайные горы Маокун, чтобы пить горячий чай под звёздами до самой полуночи! Поднимитесь от станции метро Taipei Zoo в кабинке со стеклянным полом «Crystal Cabin» над зелёными каньонами и займите столик на открытой деревянной террасе среди чайных плантаций с прямым видом на сияющий шпиль Тайбэй 101. Вам принесут банку местного прожаренного чая Тегуаньинь (木柵鐵觀音), горячий котелок с водой и блюда чайной кухни — лапшу на чайном масле и хрустящие листья чая в темпуре.',
    stepByStepEn: [
      'Take the Maokong Gondola (choose the "Crystal Cabin 水晶車廂" queue for a transparent glass floor at the same NT$120 price!)',
      'Order local Muzha Tieguanyin (木柵鐵觀音) or fragrant Baozhong green oolong — you keep the leftover tea tin as a souvenir!',
      'Must-order mountain dishes: Camellia Tea-Oil Noodles (茶油麵線), Tea-Leaf Fried Rice, and Tieguanyin Soft-Serve Ice Cream at the station exit',
    ],
    stepByStepRu: [
      'На нижней станции канатки вставайте в очередь «Crystal Cabin (水晶車廂)» — кабинка с прозрачным стеклянным полом стоит те же NT$120!',
      'Закажите местный горный чай Мучжа Тегуаньинь (木柵鐵觀音) — всю оставшуюся в баночке заварку вы забираете с собой домой!',
      'Обязательно попробуйте блюда на чайном листе: лапшу на масле камелии (茶油麵線), рис с зелёным чаем и мягкое мороженое из улуна у выхода со станции',
    ],
    proTipEn:
      'Note: Maokong Gondola is closed on Mondays for maintenance (except public holidays). After 22:00 when the gondola closes, frequent minibuses (S10 / Brown 15) and Uber/taxis run down the mountain all night!',
    proTipRu:
      'Важно: по понедельникам канатная дорога закрыта на техобслуживание. Если засидитесь в чайной после 22:00, вниз к метро всю ночь ходят микроавтобусы S10 / Brown 15 и такси!',
    placeIds: ['maokong', 'maokong-camphor-trail-teahouses', 'taipei-zoo'],
    googleMapsUrl: 'https://maps.google.com/?q=Maokong+Yao+Yue+Teahouse+Taipei',
    bookingOrOfficialUrl: 'https://www.gondola.taipei/',
  },
  {
    id: 'dihua-street-tea-roasting-tasting',
    category: 'tea_culture',
    titleEn: '1890 Historic Tea Factory Charcoal-Roasting Tour & Tasting on Dihua Street',
    titleRu: 'Экскурсия на старинную чайную фабрику 1890 года с угольной обжаркой чая и дегустацией на улице Дихуа',
    titleZh: '大稻埕百年茶行體驗：王有記名茶 (1890) 炭火焙籠間導覽 & 品茗',
    subtitleEn: 'Step inside a 135-year-old Dadaocheng tea refinery to see bamboo charcoal roasting pits and taste vintage Oolongs',
    subtitleRu: 'Загляните в цех угольной прожарки чая 1890 года в купеческом квартале Дадаочэн и попробуйте редкие сорта улуна',
    durationEn: '60 – 90 mins',
    durationRu: '60 – 90 минут',
    bestTimeEn: 'Mon–Sun 09:30 – 18:30',
    bestTimeRu: 'Ежедневно 09:30 – 18:30',
    priceRangeEn: 'Factory Viewing Free · Tea Tasting Set NT$150–350',
    priceRangeRu: 'Осмотр цеха бесплатно · Дегустация чая NT$150–350',
    venueEn: 'Wang Tea (有記名茶, 64 Chongqing N Rd Sec 2) & Lin Hua Tai Tea (林華泰茶行) near Dihua Street',
    venueRu: 'Историческая фабрика Wang Tea (有記名茶, 1890 г.) и оптовая лавка Lin Hua Tai у улицы Дихуа',
    venueZh: '王有記名茶 (台北市大同區重慶北路二段64號) / 迪化街',
    descriptionEn:
      'In the late 19th century, Dadaocheng was the global capital of the Formosa Tea trade. At historic 1890 "Wang Tea (有記名茶)" just steps from Dihua Street, you can walk directly into an authentic brick "Pei Lung (焙籠間)" charcoal-roasting room where dozens of woven bamboo baskets slowly toast tea leaves over glowing longan-wood coals. Afterward, sit at their modern tea bar to taste cold-brewed and hot-steeped Oriental Beauty and奇種 (Qizhong) Oolong!',
    descriptionRu:
      'В конце XIX века район Дадаочэн был мировой столицей торговли «Формозским чаем». В историческом чайном доме и фабрике «Wang Tea (有記名茶)», работающем с 1890 года в паре минут от улицы Дихуа, вы можете зайти прямо в настоящий кирпичный цех «Пэй-Лун (焙籠間)», где в десятках плетёных бамбуковых корзин над тлеющими углями дерева лонган медленно прожаривают чайный лист. После осмотра цеха присядьте за стойку чайного бара, чтобы продегустировать горячий и холодный (Cold Brew) улуны!',
    stepByStepEn: [
      'Walk into the warm, aromatic brick charcoal-roasting room (焙籠間) to see 40+ bamboo roasting baskets over sunken coal pits',
      'Order a tasting flight at the tea counter comparing light floral Pouchong vs. deep charcoal-roasted奇種 Oolong',
      'Bonus stop 5 mins away: Visit 1883 "Lin Hua Tai Tea (林華泰茶行)" where you can scoop tea from giant 100-kg metal drums at wholesale prices!',
    ],
    stepByStepRu: [
      'Загляните в тёплую ароматную комнату угольной сушки (焙籠間), где чай томится в 40 бамбуковых корзинах над углями',
      'Попробуйте дегустационный сет за чайной стойкой: сравните лёгкий цветочный Баочжун и густой улун угольной прожарки',
      'Бонус в 5 минутах пешком: старейшая оптовая лавка 1883 года Lin Hua Tai (林華泰茶行), где чай насыпают совками из огромных металлических бочек!',
    ],
    proTipEn:
      'Wang Tea’s second floor is also an intimate traditional Taiwanese acoustic music & Nanguan performance loft on weekends!',
    proTipRu:
      'На 2-м этаже чайной фабрики Wang Tea сохранился старинный деревянный чердак, где часто звучит традиционная тайваньская музыка!',
    placeIds: ['dihua-street', 'dadaocheng-wharf'],
    googleMapsUrl: 'https://maps.google.com/?q=Wang+Tea+Chongqing+North+Road+Taipei',
    bookingOrOfficialUrl: 'https://wangtea.com.tw/',
  },
  {
    id: 'indoor-shrimp-fishing-grill',
    category: 'local_fun',
    isSignature: true,
    titleEn: 'Taiwanese Late-Night Indoor Shrimp Fishing & Live Salt-Grilling (釣蝦場)',
    titleRu: 'Тайваньская ночная ловля гигантских креветок в бассейне и жарка на соли (釣蝦場)',
    titleZh: '台灣道地釣蝦場體驗 — 釣泰國蝦 & 現場鹽烤現吃',
    subtitleEn: 'Grab a bamboo rod and cold Taiwan Beer, catch blue-claw prawns indoors, and grill them yourself!',
    subtitleRu: 'Возьмите бамбуковую удочку, наловите крупных пресноводных креветок в крытом бассейне и сразу зажарьте их на гриле!',
    durationEn: '1 – 2 hours',
    durationRu: '1 – 2 часа',
    bestTimeEn: 'Open afternoon until 03:00 AM / 24 Hours (Best evening vibe 19:00–01:00)',
    bestTimeRu: 'Работает до 03:00 ночи / 24 часа (Лучшая атмосфера с 19:00 до 01:00)',
    priceRangeEn: 'NT$350–450 (~$11–$14) per rod for 1 hour (includes bait & grill!)',
    priceRangeRu: 'NT$350–450 (~$11–$14) за удочку в час (наживка и гриль включены!)',
    venueEn: 'Quan Jia Le Shrimp Fishing (190 Jinzhou St, Zhongshan) & Xin Chao 24h Shrimp Fishing (91 Minzu E Rd)',
    venueRu: 'Крытые клубы ловли креветок Quan Jia Le (Чжуншань, метро Xingtian Temple) и круглосуточный Xin Chao',
    venueZh: '全佳樂釣蝦場 (中山區錦州街190號) / 新潮釣蝦美食廣場 (民族東路91號)',
    descriptionEn:
      'Invented in Taiwan in the 1980s, indoor shrimp fishing halls (釣蝦場) are one of the most uniquely Taiwanese social hangouts you will ever experience! Pay NT$350–400 at the counter to receive a light bamboo fishing rod, a mesh net, and bait (dried baby shrimp or liver), then pull up a plastic chair around a bubbling indoor pool stocked with giant freshwater blue-claw prawns (泰國蝦). Every hour the staff dumps a fresh bucket of live prawns into the pool! When you’re done, rinse your catch, coat them heavily in coarse salt, and roast them yourself in the glowing tabletop oven.',
    descriptionRu:
      'Крытые клубы ловли креветок (釣蝦場) появились на Тайване в 1980-х и стали одним из самых колоритных местных развлечений! За NT$350–400 на стойке вам выдают лёгкую удочку с поплавком, сачок и наживку. Вы садитесь вокруг большого бурлящего крытого бассейна, куда каждый час выпускают свежее ведро крупных синеклешневых пресноводных креветок (泰國蝦). Как только поплавок уходит под воду — подсекайте! А самое вкусное начинается в финале: вы промываете свой улов, густо засыпаете крупной морской солью на шампурах и сами запекаете свежайших креветок в раскалённой печи прямо в зале под холодное тайваньское пиво или чай!',
    stepByStepEn: [
      'Counter supplies everything: Bamboo rod, float, bait (tiny dried shrimp), and a submerged mesh net at your feet',
      'Pro hook-setting trick: Wait 3–4 seconds after the bobber sinks so the prawn swallows the bait, then tug sideways and lift!',
      'Free DIY Salt Grill: Rinse your prawns, shake them in a plastic bag with coarse salt, skewer them, and bake for 8 mins in the hall’s grill oven!',
    ],
    stepByStepRu: [
      'Всё включено в стоимость часа: удочка, наживка, сачок для улова и бесплатное пользование солью, шампурами и печью-грилем',
      'Секрет удачной подсечки: когда поплавок ушёл под воду, подождите 3–4 секунды и плавно потяните удочку немного вбок, а затем вверх!',
      'Готовка на месте: промойте пойманных креветок, обваляйте в крупной соли, насадите на шпажки и запекайте 8 минут в печи-гриле прямо у бассейна!',
    ],
    proTipEn:
      'Quan Jia Le (全佳樂釣蝦場) in Zhongshan is only a 5-minute walk from MRT Xingtian Temple Station (Orange Line O09) and is very friendly to first-time visitors!',
    proTipRu:
      'Зал Quan Jia Le (全佳樂釣蝦場) в районе Чжуншань находится всего в 5 минутах пешком от станции метро Xingtian Temple (оранжевая ветка O09) — персонал охотно помогает новичкам настроить удочку!',
    placeIds: ['xin-chao-shrimp-fishing', 'dihua-street'],
    googleMapsUrl: 'https://maps.google.com/?q=Quan+Jia+Le+Shrimp+Fishing+Zhongshan+Taipei',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/city/19-taipei-things-to-do/',
  },
  {
    id: 'beitou-hot-spring-hinoki-soak',
    category: 'massage_wellness',
    isSignature: true,
    titleEn: 'Beitou Volcanic Sulfur Hot Springs: Private Cypress Bath & Geothermal Eggs (北投泡湯)',
    titleRu: 'Серные термальные источники Бэйтоу: приватные кипарисовые купели и геотермальная долина (北投泡湯)',
    titleZh: '北投溫泉泡湯體驗 — 白磺牛奶湯・青磺泉 & 地熱谷溫泉蛋',
    subtitleEn: 'Soak in natural milky-white volcanic sulfur spring water piped straight from Yangmingshan volcano',
    subtitleRu: 'Расслабьтесь в приватной каменной или кипарисовой купели с природной молочно-белой вулканической водой',
    durationEn: '2 – 3.5 hours',
    durationRu: '2 – 3.5 часа',
    bestTimeEn: 'Daily 09:00 – 23:00 (Best in cool 15°C winter evenings!)',
    bestTimeRu: 'Ежедневно 09:00 – 23:00 (Идеально в прохладную зимнюю погоду!)',
    priceRangeEn: 'Public Bath NT$60–800 · Private Room for 2: NT$1,200–2,800 (90 mins)',
    priceRangeRu: 'Общие купальни NT$60–800 · Приватная комната на двоих: NT$1,200–2,800',
    venueEn: 'MRT Xinbeitou Hot Spring Village (Spring City Resort, Radium Kagaya & Thermal Valley)',
    venueRu: 'Курортный квартал Синьбэйтоу (MRT Xinbeitou — частные купальни и Термальная долина)',
    venueZh: '新北投溫泉區 (北投地熱谷 / 春天酒店 / 日勝生加賀屋)',
    descriptionEn:
      'Taipei is one of the only capital cities on Earth with an active volcanic hot spring resort right inside its metro network! Ride the cute themed Hot Spring MRT train to R22A Xinbeitou, walk beside the steaming emerald waters of Beitou Thermal Valley (地熱谷), and rent a private 90-minute stone or Japanese Hinoki cypress bathhouse room ("Tangwu 湯屋") filled with silky milky-white sulfur water (白磺泉, known as "Beauty Soup" for softening skin) or world-rare radium green sulfur water (青磺泉, found only in Beitou and Tamagawa, Japan!).',
    descriptionRu:
      'Тайбэй — одна из немногих столиц мира, где прямо на метро можно доехать до действующих вулканических горячих источников! Поезжайте на расписном тематическом поезде метро до станции R22A Xinbeitou, прогуляйтесь вдоль клубов бирюзового пара в Термальной долине (地熱谷), а затем арендуйте приватную купальню на 90 минут («Тан-у» 湯屋) с каменной или японской кипарисовой ванной. Купели наполняются природной молочно-белой серной водой (白磺泉 — «источник красоты») или редчайшей радиевой зелёной серой (青磺泉, которая в мире встречается только в Бэйтоу и японской Тамагаве!).',
    stepByStepEn: [
      'First stroll through steaming Beitou Thermal Valley (地熱谷, open 09:00–18:00, free) and the wooden Beitou Library',
      'Choose your soak style: A private 90-minute couples/family room (湯屋, no swimsuit needed!) or an open-air resort garden spa pool (requires swimsuit & cap)',
      'Snack on hot-spring boiled eggs (溫泉蛋) and warm ginger sweet potato soup after your soak!',
    ],
    stepByStepRu: [
      'Сначала прогуляйтесь вдоль кипящего изумрудного озера Термальной долины (地熱谷, открыта 09:00–18:00, бесплатно)',
      'Выберите формат: приватная комната-купальня на двоих/семью на 90 минут (湯屋 — купальник не нужен!) или открытый спа-бассейн в саду отеля',
      'После горячей ванны обязательно попробуйте сваренные в геотермальной воде яйца (溫泉蛋) и горячий имбирный суп с таро!',
    ],
    proTipEn:
      'In December and January (when Taipei air is a crisp 14°C–18°C), private hot spring rooms are in high demand — book a Spring City Resort or Gaia Hotel private bath voucher on Klook before heading up!',
    proTipRu:
      'В декабре и январе (при температуре воздуха +14...+18°C) горячие источники особенно популярны — ваучер в приватную купель (Spring City Resort, Kagaya или Gaia) удобно забронировать заранее на Klook!',
    placeIds: ['beitou-thermal-valley', 'yangmingshan-np'],
    googleMapsUrl: 'https://maps.google.com/?q=Beitou+Thermal+Valley+Hot+Springs+Taipei',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/activity/10455-spring-city-resort-hot-spring-taipei/',
  },
  {
    id: 'night-market-retro-carnival-games',
    category: 'local_fun',
    titleEn: 'Taiwanese Night Market Retro Carnival Games: Pinball, Mahjong Bingo & Balloon Darts',
    titleRu: 'Ретро-игры ночных рынков Тайваня: деревянный пинбол, маджонг-бинго и дартс по шарикам',
    titleZh: '台灣夜市復古童玩體驗：打彈珠・麻將賓果・射氣球・套圈圈',
    subtitleEn: 'Pull up a tiny plastic stool at Raohe Night Market to play classic Taiwanese street games',
    subtitleRu: 'Присядьте на низкую табуретку на ночном рынке Жаохэ и сыграйте в классические уличные игры Тайваня!',
    durationEn: '30 – 60 mins',
    durationRu: '30 – 60 минут',
    bestTimeEn: 'Nightly 18:00 – 23:30',
    bestTimeRu: 'Каждый вечер с 18:00 до 23:30',
    priceRangeEn: 'NT$50–100 (~$1.50–$3) per game',
    priceRangeRu: 'Всего NT$50–100 (~$1.50–$3) за партию',
    venueEn: 'Raohe Street Night Market (Middle & Temple Sections) & Shilin Night Market Basement/Alleys',
    venueRu: 'Ночной рынок улицы Жаохэ (Raohe Night Market — центральный ряд) и рынок Шилинь',
    venueZh: '饒河街觀光夜市 / 士林夜市 遊戲攤位區',
    descriptionEn:
      'Taiwanese night markets aren’t just about street food—half the fun is playing the nostalgic carnival games (夜市童玩) that every Taiwanese kid grew up with! Between snacking on black pepper buns and sweet potato balls at Raohe Street Night Market, sit on a miniature plastic stool to flick steel marbles on vintage wooden pinball machines (打彈珠), draw tiles in Taiwanese Mahjong Bingo (麻將賓果 — line up 6 matching tiles on the grid to win a giant plush toy!), pop water balloons with feather darts (射氣球), or try your luck at the glowing claw machines (夾娃娃機).',
    descriptionRu:
      'Ночные рынки Тайваня — это не только уличная еда, но и шумные ряды ретро-аттракционов (夜市童玩), на которых выросло каждое поколение тайваньцев! Прогуливаясь по ночному рынку Жаохэ с горячей перечной булочкой в руке, обязательно присядьте на маленькую пластиковую табуретку и сыграйте в старинный деревянный пинбол с металлическими шариками (打彈珠), разложите кости в тайваньское «Маджонг-Бинго» (麻將賓果 — соберите линию из 6 костей на поле и выиграйте игрушку!), полопайте воздушные шарики дротиками (射氣球) или испытайте удачу в круглосуточных залах автоматов-кранов (夾娃娃機).',
    stepByStepEn: [
      'Wooden Pinball (打彈珠, NT$50–100): Use the wooden paddle to launch marbles through spinning nails and score tickets for retro snacks & toys',
      'Mahjong Bingo (麻將賓果, NT$100): Draw 15 tiles blindly and match them to the board—if you complete a row of 6 (or even get close!), you win a prize',
      'Balloon Darts & Ring Toss (射氣球 / 套圈圈): Pop 6 balloons in a row with real brass darts or toss bamboo rings over bottles & prizes',
    ],
    stepByStepRu: [
      'Деревянный пинбол (打彈珠, NT$50–100): запускайте стальные шарики деревянной лопаткой сквозь гвоздики и набирайте призовые очки',
      'Маджонг-Бинго (麻將賓果, NT$100): вытяните 15 костей вслепую и выставьте их на карточку — за полную линию из 6 символов вручают мягкую игрушку (знать китайский не нужно, по картинкам всё понятно!)',
      'Дартс по шарикам и бросание колец (射氣球 / 套圈圈): сбейте 6 шариков подряд дротиками или набросьте колечко на приз',
    ],
    proTipEn:
      'Even if you don’t speaks Chinese, Mahjong Bingo stall owners at Raohe Night Market love helping tourists match the symbols on the grid—and usually give you a cute consolation keychain even if you miss by one tile!',
    proTipRu:
      'Даже если вы никогда не играли в маджонг, хозяева игровых столов на рынке Жаохэ с улыбкой помогут найти нужные символы на поле — и почти всегда дарят милый брелок даже за 5 совпадений из 6!',
    placeIds: ['raohe-night-market', 'ximending'],
    googleMapsUrl: 'https://maps.google.com/?q=Raohe+Street+Night+Market+Taipei',
    bookingOrOfficialUrl: 'https://www.travel.taipei/en/attraction/details/1538',
  },
  {
    id: 'dadaocheng-vintage-qipao-walk',
    category: 'diy_crafts',
    titleEn: '1920s Dadaocheng Qipao / Retro Suit Dress-Up & Baroque Old Street Tea Walk',
    titleRu: 'Перевоплощение в стиле 1920-х: аренда шёлкового ципао (Qipao) и прогулка по улице Дихуа',
    titleZh: '大稻埕復古旗袍 & 古著換裝漫遊體驗 (迪化街)',
    subtitleEn: 'Dress in a tailored silk Qipao or 1920s gentleman’s vest and stroll Taipei’s historic tea & fabric district',
    subtitleRu: 'Примерьте элегантное платье ципао или ретро-жилет 1920-х с аксессуарами для фотосессии в барочных аркадах Дадаочэн',
    durationEn: '3 – 5 hours',
    durationRu: '3 – 5 часов',
    bestTimeEn: 'Daily 10:00 – 18:00',
    bestTimeRu: 'Ежедневно 10:00 – 18:00',
    priceRangeEn: 'NT$600–950 (~$19–$30) incl. hairstyling & accessories',
    priceRangeRu: 'NT$600–950 (~$19–$30) включая причёску и аксессуары',
    venueEn: 'Dihua Street Qipao Studios (Twatutia 貳零年華 Salon / VA VA VOOM Dadaocheng)',
    venueRu: 'Костюмерные салоны на исторической улице Дихуа (Twatutia 1920s Salon)',
    venueZh: '迪化街一段 — 貳零年華 Salon 1920s / 大稻埕旗袍租借',
    descriptionEn:
      'In the 1920s ("Golden Era of Twatutia"), Dihua Street and Dadaocheng were the most glamorous cosmopolitan neighborhood in Taiwan—filled with Baroque merchant mansions, jazz cafes, and silk tailors. Today, you can step into a boutique Qipao salon on Dihua Street, choose from 200+ floral silk Qipaos (for women/kids) or 1920s suspenders, vests & fedoras (for men), get a vintage finger-wave hairdo with pearl hairpins, embroidered fans, and parasols, and spend the afternoon sipping oolong tea and taking cinematic photos under the red lanterns!',
    descriptionRu:
      'В 1920-е годы («Золотой век Дадаочэна») улица Дихуа была самым модным и богатым кварталом Тайваня с купеческими особняками в стиле барокко, театрами и шёлковыми ателье. Сегодня в уютных салонах прямо на улице Дихуа можно выбрать из 200+ шёлковых платьев ципао (для женщин и детей) или ретро-костюмов с жилетами и шляпами-федорами (для мужчин). Стилисты сделают вам ретро-укладку с жемчужными заколками, выдадут кружевной зонтик, веер и ридикюль — и вы отправитесь гулять и фотографироваться под красными фонарями старинных аркад и пить чай в исторических особняках!',
    stepByStepEn: [
      'Choose from 200+ silk, velvet, and lace Qipaos (all sizes available, plus winter velvet shawls & fur stoles for December/January!)',
      'Includes vintage hairstyling, pearl earrings, embroidered clutch bag, folding fan, and retro shoes',
      'Best photo spots within a 3-min walk: Dihua Street Room 127 red-brick courtyard, Xiahai City God Temple lanterns, and Dadaocheng Pier 5',
    ],
    stepByStepRu: [
      'Более 200 платьев ципао из шёлка, бархата и парчи (все размеры, плюс тёплые бархатные накидки и палантины для декабря и января!)',
      'В стоимость входит ретро-причёска, жемчужные украшения, вышитая сумочка, веер и туфли',
      'Лучшие локации для фото в 3 минутах ходьбы: внутренние дворики из красного кирпича на улице Дихуа, своды красных фонарей и пирс Дадаочэн',
    ],
    proTipEn:
      'Many historic Dihua Street cafes and tea houses offer a 10% discount on tea and pastries when you walk in wearing a Qipao!',
    proTipRu:
      'Во многих исторических кофейнях и чайных домах на улице Дихуа гостям в ципао дают скидку 10% на чай и десерты!',
    placeIds: ['dihua-street', 'dadaocheng-wharf'],
    googleMapsUrl: 'https://maps.google.com/?q=Dihua+Street+Qipao+Rental+Taipei',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/activity/15772-dadaocheng-qipao-rental-experience-taipei/',
  },
  {
    id: 'pineapple-cake-boba-diy-combo',
    category: 'diy_crafts',
    isSignature: true,
    titleEn: 'Taiwanese Culinary DIY: Shake Your Own Bubble Tea (春水堂) & Bake Pineapple Cakes (鳳梨酥)',
    titleRu: 'Кулинарный DIY: взбей свой Bubble Tea в Chun Shui Tang и испеки ананасовые пирожные 鳳梨酥',
    titleZh: '台灣經典美食手作DIY：春水堂手搖珍奶 & 郭元益鳳梨酥烘焙',
    subtitleEn: 'Learn to shake frothy Pearl Milk Tea from its 1983 inventor + bake a gift box of 10 hot pineapple cakes',
    subtitleRu: 'Приготовьте настоящий бабл-ти в шейкере у изобретателей напитка (1983 г.) и испеките коробку горячих пирожных!',
    durationEn: '1 – 2 hours per class',
    durationRu: '1 – 2 часа на мастер-класс',
    bestTimeEn: 'Daily 10:00 – 17:00',
    bestTimeRu: 'Ежедневно 10:00 – 17:00',
    priceRangeEn: 'NT$450–680 (~$14–$21) per workshop',
    priceRangeRu: 'NT$450–680 (~$14–$21) за мастер-класс',
    venueEn: 'Chun Shui Tang Xinyi A9 (10 min from your stay!) & Kuo Yuan Ye Pastry Museum (Shilin)',
    venueRu: 'Чайный дом Chun Shui Tang (Синьи A9 — 10 мин от дома!) и Музей выпечки Kuo Yuan Ye (Шилинь)',
    venueZh: '春水堂 (信義A9店) / 郭元益糕餅博物館 (士林館)',
    descriptionEn:
      'Don’t just eat Taiwan’s two most famous treats—make them yourself! At Chun Shui Tang (the tea house that invented Bubble Tea in 1983), put on a tearista apron, measure chewy tapioca pearls and cane syrup, and shake two full glasses of frothy Foam Black Tea & Pearl Milk Tea (taking home a certificate + souvenir shaker!). And at Kuo Yuan Ye Pastry Museum in Shilin, knead golden butter dough, wrap sweet pineapple filling, and bake 10 warm pineapple cakes to take home in a gift box.',
    descriptionRu:
      'Два главных гастрономических символа Тайваня можно приготовить своими руками! В легендарном чайном доме Chun Shui Tang (именно здесь в 1983 году изобрели первый в мире Bubble Tea) вы наденете фартук бариста, смешаете крепкий чай Ассам, тростниковый сироп и тёплую тапиоку и сами взболтаете в шейкере два больших бокала чая — получив именной диплом мастера и фирменный шейкер в подарок! А в Музее кондитерского искусства Kuo Yuan Ye (в районе Шилинь) вы сами замесите песочное тесто, завернёте ананасовую начинку и испечёте подарочную коробку из 10 горячих ананасовых пирожных 鳳梨酥.',
    stepByStepEn: [
      'Chun Shui Tang Bubble Tea DIY: Shake 2 drinks yourself + get a Bubble Tea Master Certificate, souvenir shaker & snacks',
      'Kuo Yuan Ye Pineapple Cake DIY: Mix dough, stamp 10 cakes, dress up in traditional costumes & enjoy afternoon tea while they bake',
      'Fun for both adults and kids (ages 3+ welcome)',
    ],
    stepByStepRu: [
      'Мастер-класс Bubble Tea в Chun Shui Tang: приготовьте 2 бокала чая в шейкере + получите диплом мастера, шейкер в подарок и закуски',
      'Выпечка ананасовых пирожных в Kuo Yuan Ye: слепите и испеките 10 пирожных + чаепитие и фото в традиционных костюмах',
      'Идеально подходит как для взрослых компаний, так и для семей с детьми от 3 лет',
    ],
    proTipEn:
      'Chun Shui Tang’s Xinyi A9 branch is only a 10-minute walk from your stay near Brownies!',
    proTipRu:
      'Филиал Chun Shui Tang в ТЦ Shin Kong Mitsukoshi A9 находится всего в 10 минутах пешком от вашего дома у Brownies в Синьи!',
    placeIds: ['chun-shui-tang-xinyi', 'chiate-bakery-pineapple', 'my-stay-xinyi-brownies'],
    googleMapsUrl: 'https://maps.google.com/?q=Chun+Shui+Tang+Shin+Kong+Mitsukoshi+A9+Taipei',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/activity/16873-chun-shui-tang-diy-tea-experience-taichung/',
  },
  {
    id: 'eslite-songyan-glass-musicbox-diy',
    category: 'diy_crafts',
    isSignature: true,
    titleEn: 'Eslite Songyan Craft Village: Mouth-Blown Glass (吹玻璃), Wooden Music Box & Silver Ring DIY',
    titleRu: 'Ремесленные мастерские в Eslite Songyan: выдувание стекла, деревянные музыкальные шкатулки и ковка колец',
    titleZh: '誠品生活松菸店 手作體驗：坤水晶吹玻璃・Wooderful life 音樂盒・草山金工',
    subtitleEn: 'Just an 8-min walk from your Xinyi stay: blow molten 1,300°C glass or build a mechanical wooden music box',
    subtitleRu: 'Всего в 8 минутах от вашего дома в Синьи: выдуйте стакан из жидкого стекла у печи или соберите музыкальную шкатулку!',
    durationEn: '1 – 2.5 hours',
    durationRu: '1 – 2.5 часа',
    bestTimeEn: 'Daily 11:00 – 21:00',
    bestTimeRu: 'Ежедневно 11:00 – 21:00',
    priceRangeEn: 'Music Box NT$850+ · Glassblowing NT$1,380 · Silver Ring NT$1,800+',
    priceRangeRu: 'Шкатулка от NT$850 · Выдувание стекла NT$1,380 · Серебряное кольцо от NT$1,800',
    venueEn: 'Eslite Spectrum Songyan Store 2F (Songshan Cultural Park) & Huashan 1914',
    venueRu: '2-й этаж дизайн-молла Eslite Spectrum Songyan (парк Суншань — 8 мин пешком от дома!)',
    venueZh: '誠品生活松菸店 2F (松山文創園區 / 菸廠路88號)',
    descriptionEn:
      'Inside the historic Songshan Cultural Park (an 8-minute walk from your Xinyi stay near Brownies), the 2nd floor of Eslite Spectrum Songyan is a hands-on craft paradise! At Kun’s Crystal (坤水晶), stand before a glowing 1,300°C furnace and blow through a steel pipe to inflate molten glass into your own colorful drinking glass or paperweight. Right next door at Wooderful Life, pick from 100+ miniature wooden figurines (Taipei 101, bubble tea, trains) to build a wind-up wooden music box, or hammer and stamp a custom sterling silver ring at Choccy Metal (草山金工).',
    descriptionRu:
      'В культурном парке Суншань (всего в 8 минутах пешком от вашего дома в Синьи у Brownies) весь 2-й этаж центра Eslite Spectrum Songyan посвящён живым ремёслам! В стеклодувной мастерской Kun’s Crystal (坤水晶) вы встанете у пылающей печи (1300°C) и сами через трубку выдуете из раскалённого стекла собственный цветной стакан или вазочку. По соседству в Wooderful Life можно собрать заводную деревянную музыкальную шкатулку с движущимся паровозиком и фигуркой Тайбэй 101, набить пушистый коврик тафтинг-пистолетом или выковать именное серебряное кольцо в ювелирной студии Choccy Metal (草山金工).',
    stepByStepEn: [
      'Kun’s Crystal Glassblowing (坤水晶): Choose your colors, blow molten glass through the pipe, and shape the rim with wooden paddles (ready for pickup the next afternoon after cooling!)',
      'Wooderful Life Music Box DIY: Pick your melody, wooden base, and miniature moving Taipei 101 / train charms (take home immediately in 45 mins!)',
      'Choccy Metal (草山金工): Anneal with a blowtorch, hammer textures, and stamp letters/dates into a sterling silver ring',
    ],
    stepByStepRu: [
      'Выдувание стекла в Kun’s Crystal (坤水晶): выберите цветную крошку, надуйте шар через трубку и сформируйте стакан деревянными щипцами (забрать можно на следующий день после остывания в печи!)',
      'Деревянная музыкальная шкатулка Wooderful Life: выберите мелодию и миниатюрные фигурки Тайбэй 101 и поезда (забираете сразу через 45 минут!)',
      'Ювелирная мастерская Choccy Metal (草山金工): прогрейте серебро горелкой, отчеканьте фактуру молоточком и набейте памятную надпись на кольце',
    ],
    proTipEn:
      'Because blown glass must cool overnight in the kiln, schedule your glassblowing session early in your trip so you can walk over from your Xinyi stay the next day to pick it up!',
    proTipRu:
      'Так как выдутое стекло остывает в печи всю ночь, запишитесь на стеклодувный мастер-класс в первые дни поездки, чтобы спокойно забрать свой бокал на следующий день!',
    placeIds: ['songshan-cultural-park', 'my-stay-xinyi-brownies', 'brownies-xinyi'],
    googleMapsUrl: 'https://maps.google.com/?q=Eslite+Spectrum+Songyan+Store+Taipei',
    bookingOrOfficialUrl: 'https://www.klook.com/en-US/activity/13917-choccy-metal-jewelry-making-class-taipei/',
  },
];

export function filterTaiwanActivities(
  activities: TaiwanActivityItem[],
  category: ActivityCategory,
  searchQuery: string
): TaiwanActivityItem[] {
  const q = searchQuery.trim().toLowerCase();

  return activities.filter((act) => {
    if (category !== 'all' && act.category !== category) {
      return false;
    }
    if (q.length > 0) {
      const haystack = [
        act.titleEn,
        act.titleRu,
        act.titleZh,
        act.subtitleEn,
        act.subtitleRu,
        act.venueEn,
        act.venueRu,
        act.venueZh,
        act.descriptionEn,
        act.descriptionRu,
        ...act.stepByStepEn,
        ...act.stepByStepRu,
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
