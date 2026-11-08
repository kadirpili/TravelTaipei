export interface TourProviderLink {
  platform: 'Klook' | 'KKday' | 'GetYourGuide' | 'FunPASS';
  labelEn: string;
  labelRu: string;
  url: string;
}

export interface TourStopItem {
  stopNumber: number;
  timeWindow: string;
  durationEn: string;
  durationRu: string;
  placeId: string;
  highlightEn: string;
  highlightRu: string;
  ticketUrl?: string;
  ticketLabelEn?: string;
  ticketLabelRu?: string;
}

export interface BookableTour {
  id: string;
  platformBadgeEn: string;
  platformBadgeRu: string;
  ratingTextEn: string;
  ratingTextRu: string;
  titleEn: string;
  titleRu: string;
  subtitleEn: string;
  subtitleRu: string;
  priceUsd: string;
  priceTwd: string;
  priceNoteEn: string;
  priceNoteRu: string;
  daysOfWeekEn: string;
  daysOfWeekRu: string;
  departureTimesEn: string;
  departureTimesRu: string;
  returnTimeEn: string;
  returnTimeRu: string;
  totalDurationEn: string;
  totalDurationRu: string;
  meetingPointEn: string;
  meetingPointRu: string;
  bookingUrl: string;
  kkdayUrl: string;
  getYourGuideUrl: string;
  providerLinks: TourProviderLink[];
  includedEn: string[];
  includedRu: string[];
  proTipEn: string;
  proTipRu: string;
  stops: TourStopItem[];
}

export const BOOKABLE_TOURS: BookableTour[] = [
  {
    id: 'klook-north-coast-classic',
    platformBadgeEn: 'Klook #1 Bestseller · 35,000+ Booked',
    platformBadgeRu: 'Хит №1 на Klook · 35 000+ бронирований',
    ratingTextEn: '4.8 ★ (12,400+ reviews)',
    ratingTextRu: '4.8 ★ (12 400+ отзывов)',
    titleEn: 'Yehliu Geopark, Shifen Sky Lanterns, Waterfall & Jiufen Day Tour',
    titleRu: 'Северный берег: Геопарк Йелю, водопад Шифэнь, небесные фонарики и Цзюфэнь',
    subtitleEn:
      'The #1 most booked day trip from Taipei on Klook & KKday covering all North Coast icons in one comfortable coach or minivan loop.',
    subtitleRu:
      'Самый популярный однодневный тур из Тайбэя на Klook и KKday: все главные чудеса северного побережья на комфортабельном автобусе или минивэне без пересадок.',
    priceUsd: '$22 – $34 USD',
    priceTwd: 'NT$ 690 – 1,080',
    priceNoteEn:
      '$22 USD standard coach · $34 USD all-inclusive package (includes Yehliu ticket + 1 Sky Lantern for 4 people) · $48 USD small-group 8-seat van.',
    priceNoteRu:
      '$22 USD базовый автобус · $34 USD пакет «Всё включено» (входной билет в Йелю + 1 небесный фонарик) · $48 USD мини-группа до 8 человек.',
    daysOfWeekEn: 'Daily (Monday – Sunday, guaranteed departures)',
    daysOfWeekRu: 'Ежедневно (Пн – Вс, гарантированный выезд)',
    departureTimesEn: '08:00 AM, 08:30 AM, 09:00 AM (plus 12:30 PM Sunset & Night Jiufen slot)',
    departureTimesRu: '08:00, 08:30, 09:00 утра (есть также дневной выезд в 12:30 к вечерним фонарям)',
    returnTimeEn: '17:45 – 18:30 PM at Taipei Main Station or Ximending',
    returnTimeRu: '17:45 – 18:30 у Главного вокзала Тайбэя или в Симыньдине',
    totalDurationEn: '9 – 9.5 hours',
    totalDurationRu: '9 – 9,5 часов',
    meetingPointEn: 'Taipei Main Station (Exit M3 / East Gate 3) or Ximen MRT Station Exit 5',
    meetingPointRu: 'Метро Taipei Main Station (Выход M3 / East Gate 3) или метро Ximen (Выход 5)',
    bookingUrl:
      'https://www.klook.com/activity/93318-yehliu-jiufen-shifen-shifen-waterfall-day-tour/',
    kkdayUrl:
      'https://www.kkday.com/en/product/2287-jiufen-yehliu-shifen-pingxi-day-tour-night-tour-from-taipei',
    getYourGuideUrl:
      'https://www.getyourguide.com/s/?q=Yehliu+Jiufen+Shifen+Taipei',
    providerLinks: [
      {
        platform: 'Klook',
        labelEn: 'Book on Klook (With Waterfall · $22)',
        labelRu: 'Купить на Klook (с водопадом · $22)',
        url: 'https://www.klook.com/activity/93318-yehliu-jiufen-shifen-shifen-waterfall-day-tour/',
      },
      {
        platform: 'Klook',
        labelEn: 'Klook Classic North Coast Tour',
        labelRu: 'Klook: Классический тур Йелю + Цзюфэнь',
        url: 'https://www.klook.com/activity/97056-yehliu-jiufen-shifen-day-tour/',
      },
      {
        platform: 'KKday',
        labelEn: 'Book on KKday (Day / Night Slot)',
        labelRu: 'Купить на KKday (Дневной / Вечерний)',
        url: 'https://www.kkday.com/en/product/2287-jiufen-yehliu-shifen-pingxi-day-tour-night-tour-from-taipei',
      },
      {
        platform: 'GetYourGuide',
        labelEn: 'Compare on GetYourGuide',
        labelRu: 'Сравнить на GetYourGuide',
        url: 'https://www.getyourguide.com/s/?q=Yehliu+Jiufen+Shifen+Taipei',
      },
    ],
    includedEn: [
      'Round-trip air-conditioned tour bus / van from Taipei',
      'English / Chinese / Japanese / Korean speaking licensed guide',
      'Yehliu Geopark admission ticket (NT$120 value, in All-Inclusive tier)',
      'Sky lantern release on Shifen railway tracks (in All-Inclusive tier)',
    ],
    includedRu: [
      'Трансфер туда-обратно на туристическом автобусе с кондиционером',
      'Англоязычный гид (отправляет номер автобуса в WhatsApp накануне до 18:00)',
      'Входной билет в геопарк Йелю (120 NT$, включен в пакет All-Inclusive)',
      'Небесный фонарик желаний на рельсах в Шифэне (в пакете All-Inclusive)',
    ],
    proTipEn:
      'You can tell your guide you want to stay later in Jiufen for the evening lantern views and take direct Express Bus 965 back to Ximen/Beimen on your own.',
    proTipRu:
      'Совет: вы можете предупредить гида и остаться в Цзюфэне подольше, чтобы поужинать при красных фонарях, и вернуться в Тайбэй на прямом экспресс-автобусе №965.',
    stops: [
      {
        stopNumber: 1,
        timeWindow: '08:30 – 08:45',
        durationEn: '15 mins (Check-in)',
        durationRu: '15 мин (Сбор группы)',
        placeId: 'ximending',
        highlightEn:
          'Meet your Klook guide holding an orange Klook flag at Ximen Station Exit 5 or Taipei Main Station East Gate 3.',
        highlightRu:
          'Встреча с гидом (оранжевый флажок Klook) у выхода 5 метро Ximen или у Восточных ворот №3 Главного вокзала.',
      },
      {
        stopNumber: 2,
        timeWindow: '09:45 – 11:00',
        durationEn: '1 hr 15 mins',
        durationRu: '1 час 15 мин',
        placeId: 'yehliu-geopark',
        highlightEn:
          'Walk the dramatic Pacific headland to photograph the Queen’s Head, Fairy Shoe, Sea Candles, and Honeycomb sandstone rocks.',
        highlightRu:
          'Прогулка по мысу у Тихого океана: скалы «Голова Королевы», «Туфелька феи» и «Морские свечи».',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Yehliu%20Geopark%20Ticket',
        ticketLabelEn: 'Yehliu Ticket on Klook ($4)',
        ticketLabelRu: 'Билет в Йелю на Klook ($4)',
      },
      {
        stopNumber: 3,
        timeWindow: '12:00 – 12:55',
        durationEn: '55 mins',
        durationRu: '55 мин',
        placeId: 'shifen-waterfall',
        highlightEn:
          'Cross two forest suspension bridges to view Taiwan’s widest curtain waterfall ("Taiwan’s Niagara Falls") from three scenic decks.',
        highlightRu:
          'Переход по подвесным мостам через ущелье к самому широкому каскадному водопаду Тайваня («Тайваньская Ниагара»).',
      },
      {
        stopNumber: 4,
        timeWindow: '13:05 – 14:15',
        durationEn: '1 hr 10 mins',
        durationRu: '1 час 10 мин',
        placeId: 'shifen-old-street',
        highlightEn:
          'Paint wishes on a 4-color sky lantern and launch it directly from the active Pingxi railway tracks; try grilled stuffed chicken wings.',
        highlightRu:
          'Запуск расписанного небесного фонарика желаний прямо на железнодорожных путях и фаршированные куриные крылышки на гриле.',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Shifen%20Sky%20Lantern%20Experience',
        ticketLabelEn: 'Sky Lantern Voucher on Klook',
        ticketLabelRu: 'Фонарик в Шифэне на Klook',
      },
      {
        stopNumber: 5,
        timeWindow: '15:00 – 15:30',
        durationEn: '30 mins',
        durationRu: '30 мин',
        placeId: 'golden-waterfall-yinyang-sea',
        highlightEn:
          'Photo stop at the copper-hued Golden Waterfall and the two-toned yellow-and-blue Yin Yang Sea bay below Jinguashi.',
        highlightRu:
          'Фото-остановка у медного Золотого водопада и смотровой площадки двухцветного моря Инь-Ян.',
      },
      {
        stopNumber: 6,
        timeWindow: '15:45 – 17:45',
        durationEn: '2 hours',
        durationRu: '2 часа',
        placeId: 'jiufen-old-street',
        highlightEn:
          'Climb red-lantern Shuqi Road, sip oolong tea facing the ocean at A-Mei Tea House, and eat hot taro balls & peanut ice cream rolls.',
        highlightRu:
          'Прогулка по лестницам с красными фонариками, чайный дом A-Mei с видом на океан, горячие шарики из таро и мороженое с арахисовой крошкой.',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Jiufen%20A-Mei%20Tea%20House%20Klook',
        ticketLabelEn: 'Jiufen Tea House on Klook',
        ticketLabelRu: 'Чайные дома Цзюфэня на Klook',
      },
    ],
  },
  {
    id: 'klook-yangmingshan-beitou-tamsui',
    platformBadgeEn: 'Klook & KKday · Volcanoes, Hot Springs & Sunset',
    platformBadgeRu: 'Klook & KKday · Вулканы, источники и закат',
    ratingTextEn: '4.7 ★ (6,800+ reviews)',
    ratingTextRu: '4.7 ★ (6 800+ отзывов)',
    titleEn: 'Yangmingshan National Park, Beitou Thermal Valley & Tamsui Sunset Tour',
    titleRu: 'Вулканы Янминшаня, термальная долина Бэйтоу и закат на набережной Даньшуй',
    subtitleEn:
      'Skip winding mountain bus transfers: explore steaming volcanic fumaroles, alpine lakes, jade sulfur springs, and Tamsui’s riverside sunset in one day.',
    subtitleRu:
      'Без сложных пересадок на горные автобусы: дымящиеся фумаролы вулкана, озеро Мечты, парящие гейзеры Бэйтоу и закат у океанского пролива в Даньшуе.',
    priceUsd: '$29 – $42 USD',
    priceTwd: 'NT$ 920 – 1,350',
    priceNoteEn:
      '$29 USD shared coach · $42 USD small-group minivan · $145 USD private 5-seater car charter with door-to-door pick-up at your Xinyi stay.',
    priceNoteRu:
      '$29 USD групповой тур · $42 USD мини-группа на микроавтобусе · $145 USD индивидуальная машина на весь день с подачей прямо к вашему дому в Синьи.',
    daysOfWeekEn: 'Tuesday – Sunday (Note: Beitou Thermal Valley & Museum are closed Mondays)',
    daysOfWeekRu: 'Вторник – Воскресенье (в понедельник Термальная долина Бэйтоу закрыта)',
    departureTimesEn: '08:45 AM departure',
    departureTimesRu: 'Выезд в 08:45 утра',
    returnTimeEn: '17:30 – 18:00 PM at Taipei Main Station or drop-off at Shilin Night Market',
    returnTimeRu: '17:30 – 18:00 у Главного вокзала Тайбэя (или высадка у рынка Шилинь)',
    totalDurationEn: '8.5 – 9 hours',
    totalDurationRu: '8,5 – 9 часов',
    meetingPointEn: 'Taipei Main Station (Exit M3) or Hotel Pick-up in Xinyi / Da’an (Van Option)',
    meetingPointRu: 'Метро Taipei Main Station (Выход M3) или подача к дому в Синьи (опция минивэн)',
    bookingUrl:
      'https://www.klook.com/activity/17290-beitou-yangmingshan-tour-taipei/',
    kkdayUrl:
      'https://www.kkday.com/en/product/productlist?keyword=Yangmingshan%20Beitou%20Tamsui%20Tour',
    getYourGuideUrl:
      'https://www.getyourguide.com/s/?q=Yangmingshan+Beitou+Taipei',
    providerLinks: [
      {
        platform: 'Klook',
        labelEn: 'Book on Klook (Yangmingshan & Beitou)',
        labelRu: 'Купить на Klook (Янминшань и Бэйтоу)',
        url: 'https://www.klook.com/activity/17290-beitou-yangmingshan-tour-taipei/',
      },
      {
        platform: 'Klook',
        labelEn: 'Klook: Tamsui & Beitou Hot Spring Tour',
        labelRu: 'Klook: Даньшуй + источники Бэйтоу',
        url: 'https://www.klook.com/activity/86547-tamsui-historic-site-beitou-hot-spring-day-tour-taipei/',
      },
      {
        platform: 'KKday',
        labelEn: 'Book on KKday (Volcano & Coast)',
        labelRu: 'Купить на KKday (Вулкан и Даньшуй)',
        url: 'https://www.kkday.com/en/product/productlist?keyword=Yangmingshan%20Beitou%20Tamsui%20Tour',
      },
      {
        platform: 'GetYourGuide',
        labelEn: 'Compare on GetYourGuide',
        labelRu: 'Сравнить на GetYourGuide',
        url: 'https://www.getyourguide.com/s/?q=Yangmingshan+Beitou+Taipei',
      },
    ],
    includedEn: [
      'Direct mountain transport across Yangmingshan ridge & Beitou',
      'Bilingual tour guide & bottled water',
      'Foot-bath stop at Beitou sulfur hot spring park (bring a small towel)',
      'Optional evening drop-off right at Tamsui or Shilin Night Market',
    ],
    includedRu: [
      'Прямой транспорт по серпантинам Янминшаня, Бэйтоу и Даньшуя',
      'Сопровождение гида и питьевая вода',
      'Остановка у бесплатных горячих ножных ванн в Бэйтоу (возьмите полотенце)',
      'Возможность остаться на закат в Даньшуе и вернуться по Красной ветке метро',
    ],
    proTipEn:
      'Temperatures at Yangmingshan (800m+ elevation) are 5–7°C cooler than Xinyi—pack a light windbreaker even on warm days.',
    proTipRu:
      'Совет: на вершинах Янминшаня (высота более 800 м) на 5–7 °C прохладнее, чем в Синьи — обязательно возьмите легкую ветровку.',
    stops: [
      {
        stopNumber: 1,
        timeWindow: '09:30 – 11:30',
        durationEn: '2 hours',
        durationRu: '2 часа',
        placeId: 'yangmingshan-np',
        highlightEn:
          'See roaring sulfur steam vents at Xiaoyoukeng, Flower Clock, and water buffalo grazing on Qingtiangang volcanic grasslands.',
        highlightRu:
          'Дымящиеся серные кратеры Сяоюкэн, Цветочные часы и альпийские луга Цинтяньган с пасущимися буйволами.',
      },
      {
        stopNumber: 2,
        timeWindow: '11:45 – 12:45',
        durationEn: '1 hour',
        durationRu: '1 час',
        placeId: 'monghuan-lake',
        highlightEn:
          'Easy scenic boardwalk up to misty Monghuan ("Dream Lake") wetland on Qixing Mountain.',
        highlightRu:
          'Прогулка по каменной тропе к туманному высокогорному озеру Мечты (Мэнхуань) на склоне горы Цисин.',
      },
      {
        stopNumber: 3,
        timeWindow: '13:30 – 15:15',
        durationEn: '1 hr 45 mins',
        durationRu: '1 час 45 мин',
        placeId: 'beitou-thermal-valley',
        highlightEn:
          'Stroll beside the steaming 90°C emerald waters of Beitou Thermal Valley, 1913 Japanese Bathhouse Museum, and Beitou Library.',
        highlightRu:
          'Прогулка вдоль парящего изумрудного озера гейзеров (90 °C), японского музея купален 1913 года и деревянной библиотеки Бэйтоу.',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Beitou%20Hot%20Spring%20Spa%20Taipei',
        ticketLabelEn: 'Beitou Hot Spring Spa Vouchers on Klook',
        ticketLabelRu: 'Купальни и СПА Бэйтоу на Klook',
      },
      {
        stopNumber: 4,
        timeWindow: '16:00 – 17:45',
        durationEn: '1 hr 45 mins',
        durationRu: '1 час 45 мин',
        placeId: 'tamsui',
        highlightEn:
          'Explore Red Brick Fort San Domingo, taste Tamsui iron eggs & A-gei, and watch the sun sink into the Taiwan Strait.',
        highlightRu:
          'Старинный форт Сан-Доминго, набережная Даньшуй, свежая выпечка и один из самых красивых закатов над Тайваньским проливом.',
      },
    ],
  },
  {
    id: 'klook-thousand-island-maokong',
    platformBadgeEn: 'KKday & Klook · Tea Mountains & Gondola',
    platformBadgeRu: 'KKday & Klook · Чайные горы и канатная дорога',
    ratingTextEn: '4.9 ★ (4,300+ reviews)',
    ratingTextRu: '4.9 ★ (4 300+ отзывов)',
    titleEn: 'Thousand Island Lake (Shiding), Bagua Tea Terraces & Maokong Gondola Tour',
    titleRu: 'Озеро Тысячи Островов (Шидин), чайные террасы Багуа и канатная дорога Маокун',
    subtitleEn:
      'Reach Taipei’s most photogenic hidden mountain lake (inaccessible by large bus) in a small-group van, paired with Pinglin & Maokong oolong tea tasting.',
    subtitleRu:
      'Самый живописный горный маршрут Тайбэя на микроавтобусе (куда не ходят большие автобусы): панорама Озера Тысячи Островов, плантации чая и канатная дорога Маокун.',
    priceUsd: '$28 – $45 USD',
    priceTwd: 'NT$ 890 – 1,450',
    priceNoteEn:
      '$28 USD half-day Thousand Island Lake & Pinglin van tour · $45 USD full-day combo with Taipei Zoo & Maokong Gondola Crystal Cabin.',
    priceNoteRu:
      '$28 USD полудневный тур к Озеру Тысячи Островов и в Пинлинь · $45 USD полный день вместе с канатной дорогой Маокун и дегустацией чая.',
    daysOfWeekEn: 'Daily (Monday – Sunday)',
    daysOfWeekRu: 'Ежедневно (Пн – Вс)',
    departureTimesEn: '08:00 AM (Morning Slot) or 13:00 PM (Afternoon Slot)',
    departureTimesRu: '08:00 утра (утренний выезд) или 13:00 дня (дневной выезд)',
    returnTimeEn: '16:30 – 17:30 PM at Taipei Zoo MRT or Taipei Main Station',
    returnTimeRu: '16:30 – 17:30 у станции метро Taipei Zoo или Главного вокзала',
    totalDurationEn: '5 hrs (Half-Day) or 8.5 hrs (Full-Day)',
    totalDurationRu: '5 часов (полдня) или 8,5 часов (полный день)',
    meetingPointEn: 'Taipei Main Station (Exit M3) or Zhongxiao Xinsheng MRT Station Exit 2',
    meetingPointRu: 'Метро Taipei Main Station (Выход M3) или метро Zhongxiao Xinsheng (Выход 2)',
    bookingUrl:
      'https://www.klook.com/activity/3209-thousand-island-lake-pinglin-tea-plantation-taipei/',
    kkdayUrl:
      'https://www.kkday.com/en/product/productlist?keyword=Thousand%20Island%20Lake%20Shiding',
    getYourGuideUrl:
      'https://www.getyourguide.com/s/?q=Thousand+Island+Lake+Maokong+Taipei',
    providerLinks: [
      {
        platform: 'Klook',
        labelEn: 'Book on Klook (Thousand Island Lake & Pinglin)',
        labelRu: 'Купить на Klook (Озеро Тысячи Островов)',
        url: 'https://www.klook.com/activity/3209-thousand-island-lake-pinglin-tea-plantation-taipei/',
      },
      {
        platform: 'Klook',
        labelEn: 'Klook: Maokong Gondola & Tea Culture Tour',
        labelRu: 'Klook: Канатная дорога Маокун и чайный тур',
        url: 'https://www.klook.com/en-US/activity/21404-tea-culture-day-tour-taipei/',
      },
      {
        platform: 'KKday',
        labelEn: 'Book on KKday (Shiding & Tea Terraces)',
        labelRu: 'Купить на KKday (Шидин и чайные террасы)',
        url: 'https://www.kkday.com/en/product/productlist?keyword=Thousand%20Island%20Lake%20Shiding',
      },
      {
        platform: 'GetYourGuide',
        labelEn: 'Compare on GetYourGuide',
        labelRu: 'Сравнить на GetYourGuide',
        url: 'https://www.getyourguide.com/s/?q=Thousand+Island+Lake+Maokong+Taipei',
      },
    ],
    includedEn: [
      'Small-group 8-passenger minivan (permitted on narrow Shiding mountain roads)',
      'Bagua Tea Garden viewpoint entry & Wenshan Pouchong tea tasting',
      'Maokong Gondola round-trip ticket (in Full-Day package)',
      'Licensed driver-guide & travel insurance',
    ],
    includedRu: [
      'Поездка на маневренном 8-местном минивэне прямо до верхних смотровых площадок Шидина',
      'Посещение чайных террас Багуа и дегустация высокогорного чая Вэньшань Баочжун',
      'Билет на канатную дорогу Maokong Gondola (в пакете на полный день)',
      'Сопровождение водителя-гида и страховка',
    ],
    proTipEn:
      'From Taipei Zoo / Maokong at the end of the tour, take the Brown Line MRT directly back to Da’an / Xinyi in 20 minutes.',
    proTipRu:
      'Совет: от конечной точки у зоопарка / Маокуна по Коричневой ветке метро вы доедете обратно в Синьи всего за ~20 минут.',
    stops: [
      {
        stopNumber: 1,
        timeWindow: '09:00 – 11:30',
        durationEn: '2.5 hours',
        durationRu: '2,5 часа',
        placeId: 'thousand-island-lake-pinglin',
        highlightEn:
          'Take in panoramic views of Thousand Island Lake, Crocodile Island lookout, and terraced Bagua Tea Plantations with Pouchong tea tasting.',
        highlightRu:
          'Смотровые площадки «Озера Тысячи Островов» и «Острова Крокодила», фото среди ступенчатых чайных плантаций Багуа и дегустация чая.',
      },
      {
        stopNumber: 2,
        timeWindow: '12:30 – 14:00',
        durationEn: '1.5 hours',
        durationRu: '1,5 часа',
        placeId: 'taipei-zoo',
        highlightEn:
          'Visit the Giant Panda House and koala sanctuary at Taipei Zoo before boarding the Maokong Gondola next door.',
        highlightRu:
          'Посещение павильона гигантских панд в Тайбэйском зоопарке и посадка на канатную дорогу Маокун.',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Taipei%20Zoo%20Maokong%20Combo%20Klook',
        ticketLabelEn: 'Zoo + Gondola Combo on Klook',
        ticketLabelRu: 'Комбо Зоопарк + Канатка на Klook',
      },
      {
        stopNumber: 3,
        timeWindow: '14:15 – 15:15',
        durationEn: '1 hour',
        durationRu: '1 час',
        placeId: 'maokong',
        highlightEn:
          'Soar 4km over subtropical forest valleys in a glass-bottom "Crystal Cabin" gondola car to Maokong Village.',
        highlightRu:
          'Панорамный 4-километровый подъем над зелеными горами в кабинке со стеклянным полом «Crystal Cabin».',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Maokong%20Gondola%20Ticket',
        ticketLabelEn: 'Maokong Gondola Ticket on Klook',
        ticketLabelRu: 'Билет на канатку Маокун на Klook',
      },
      {
        stopNumber: 4,
        timeWindow: '15:15 – 17:00',
        durationEn: '1 hr 45 mins',
        durationRu: '1 час 45 мин',
        placeId: 'maokong-camphor-trail-teahouses',
        highlightEn:
          'Walk the flat Camphor Trail through tea fields and brew charcoal-roasted Muzha Tieguanyin oolong overlooking Taipei 101.',
        highlightRu:
          'Прогулка по Камфорной тропе и чаепитие на открытой горной террасе с видом на башню Тайбэй 101.',
      },
    ],
  },
  {
    id: 'klook-wulai-bitan-nature',
    platformBadgeEn: 'Klook & KKday · Waterfall, Mini-Train & Lake',
    platformBadgeRu: 'Klook & KKday · Водопад, вагонетка и озеро',
    ratingTextEn: '4.8 ★ (3,100+ reviews)',
    ratingTextRu: '4.8 ★ (3 100+ отзывов)',
    titleEn: 'Wulai Waterfall, Scenic Forest Trolley, Atayal Old Street & Bitan Lake Tour',
    titleRu: 'Горное ущелье Улай: водопад, лесная вагонетка, источники и озеро Битань',
    subtitleEn:
      'Discover New Taipei’s lush southern river gorges, ride the historic Wulai logging mini-train through a cliff tunnel, and stroll Bitan Suspension Bridge.',
    subtitleRu:
      'Путешествие в южные изумрудные ущелья Нового Тайбэя: поездка на открытой ретро-вагонетке к 80-метровому водопаду Улай, кухня народа Атаял и подвесной мост озера Битань.',
    priceUsd: '$32 – $48 USD',
    priceTwd: 'NT$ 1,020 – 1,520',
    priceNoteEn:
      '$32 USD shared tour (includes Wulai Scenic Trolley ticket) · $48 USD small-group tour with riverside hot spring foot-bath & Atayal lunch.',
    priceNoteRu:
      '$32 USD групповой тур (билет на вагонетку Wulai Trolley включен) · $48 USD мини-группа с обедом кухни Атаял и источниками.',
    daysOfWeekEn: 'Daily (Monday – Sunday)',
    daysOfWeekRu: 'Ежедневно (Пн – Вс)',
    departureTimesEn: '09:00 AM departure',
    departureTimesRu: 'Выезд в 09:00 утра',
    returnTimeEn: '16:30 – 17:00 PM at Gongguan or Taipei Main Station',
    returnTimeRu: '16:30 – 17:00 у метро Gongguan или Главного вокзала Тайбэя',
    totalDurationEn: '7.5 – 8 hours',
    totalDurationRu: '7,5 – 8 часов',
    meetingPointEn: 'Taipei Main Station (Exit M3) or Xindian MRT Station',
    meetingPointRu: 'Метро Taipei Main Station (Выход M3) или метро Xindian',
    bookingUrl:
      'https://www.klook.com/activity/130716-yunxian-paradise-wulai-trolley-wulai-old-street-day-trip/',
    kkdayUrl:
      'https://www.kkday.com/en/product/productlist?keyword=Wulai%20Day%20Tour%20Taipei',
    getYourGuideUrl:
      'https://www.getyourguide.com/s/?q=Wulai+Waterfall+Taipei',
    providerLinks: [
      {
        platform: 'Klook',
        labelEn: 'Book on Klook (Wulai Trolley & Waterfall)',
        labelRu: 'Купить на Klook (Вагонетка и водопад Улай)',
        url: 'https://www.klook.com/activity/130716-yunxian-paradise-wulai-trolley-wulai-old-street-day-trip/',
      },
      {
        platform: 'KKday',
        labelEn: 'Book on KKday (Wulai & Bitan Tour)',
        labelRu: 'Купить на KKday (Улай и озеро Битань)',
        url: 'https://www.kkday.com/en/product/productlist?keyword=Wulai%20Day%20Tour%20Taipei',
      },
      {
        platform: 'GetYourGuide',
        labelEn: 'Compare on GetYourGuide',
        labelRu: 'Сравнить на GetYourGuide',
        url: 'https://www.getyourguide.com/s/?q=Wulai+Waterfall+Taipei',
      },
    ],
    includedEn: [
      'Round-trip transport from Taipei to Wulai & Bitan Scenic Area',
      'Wulai Scenic Trolley ticket (NT$50 value)',
      'Guided walk along Lover’s Trail & Wulai Atayal Old Street',
    ],
    includedRu: [
      'Трансфер туда-обратно из центра Тайбэя в горное ущелье Улай и к озеру Битань',
      'Билет на историческую открытую вагонетку Wulai Scenic Trolley',
      'Прогулка с гидом по Старой улице Улай (жареный кабан, рис в бамбуке и моти)',
    ],
    proTipEn:
      'Try the bamboo-tube sticky rice (竹筒飯) and grilled wild boar sausage on Wulai Old Street before riding the trolley up to the waterfall.',
    proTipRu:
      'Совет: на Старой улице Улай обязательно попробуйте ароматный клейкий рис, запеченный в молодом бамбуке (竹筒飯), и горячие паровые моти.',
    stops: [
      {
        stopNumber: 1,
        timeWindow: '10:00 – 13:30',
        durationEn: '3.5 hours',
        durationRu: '3,5 часа',
        placeId: 'wulai-old-street-waterfall',
        highlightEn:
          'Explore Wulai Atayal Old Street, ride the open-air Wulai Scenic Trolley through the cliffside tunnel, and relax by the 80m Wulai Waterfall.',
        highlightRu:
          'Старая улица коренного народа Атаял, поездка на лесной ретро-вагонетке сквозь скальный тоннель и смотровая терраса у 80-метрового водопада Улай.',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Wulai%20Hot%20Spring%20Volando%20Klook',
        ticketLabelEn: 'Wulai Hot Spring Resorts on Klook',
        ticketLabelRu: 'Горячие источники Улай на Klook',
      },
      {
        stopNumber: 2,
        timeWindow: '14:15 – 15:45',
        durationEn: '1.5 hours',
        durationRu: '1,5 часа',
        placeId: 'bitan-scenic-area',
        highlightEn:
          'Walk across the iconic Bitan Suspension Bridge over emerald cliffs and rent a swan pedal boat on Bitan Lake.',
        highlightRu:
          'Прогулка по знаменитому подвесному мосту Битань над изумрудной рекой и катамараны-лебеди у скалистых берегов.',
      },
      {
        stopNumber: 3,
        timeWindow: '16:15 – 17:30',
        durationEn: '1 hr 15 mins',
        durationRu: '1 час 15 мин',
        placeId: 'gongguan',
        highlightEn:
          'Optional foodie drop-off at Gongguan Night Market near NTU for Lan Jia Gua Bao pork buns and bubble milk tea.',
        highlightRu:
          'Вечерняя гастро-остановка на ночном рынке Гунгуань у университета NTU: знаменитые паровые булочки Гуа-бао и бабл-ти.',
      },
    ],
  },
  {
    id: 'klook-pass-taipei-highlights',
    platformBadgeEn: 'Klook Pass Taipei / FunPASS · Flexible City Pass',
    platformBadgeRu: 'Единый абонемент Klook Pass / Taipei FunPASS',
    ratingTextEn: '4.8 ★ (28,500+ passes sold)',
    ratingTextRu: '4.8 ★ (28 500+ купленных абонементов)',
    titleEn: 'Klook Pass Taipei & Sightseeing Bus: Taipei 101, Yongkang St & Dadaocheng Sunset',
    titleRu: 'Абонемент Klook Pass + 2-этажный автобус: Тайбэй 101, улица Юнкан, Дихуа и Дадаочэн',
    subtitleEn:
      'Bundle Taipei 101 89F Observatory, Hop-On Hop-Off Double-Decker Bus, and Maokong Gondola into one QR pass saving up to 35% vs. gate prices.',
    subtitleRu:
      'Единый QR-абонемент Klook со скидкой до 35%: смотровая площадка Тайбэй 101 (89 этаж), двухэтажный автобус с открытым верхом и главные исторические кварталы города.',
    priceUsd: '$35 – $55 USD',
    priceTwd: 'NT$ 1,120 – 1,750',
    priceNoteEn:
      '$35 USD (2-Attraction Klook Pass) · $41 USD (1-Day Taipei FunPASS with unlimited MRT/buses + Taipei 101 + Gondola) · $10 USD standalone Sightseeing Bus.',
    priceNoteRu:
      '$35 USD (Klook Pass на 2 локации) · $41 USD (Taipei FunPASS на 1 день: безлимитное метро/автобусы + Тайбэй 101 + канатка Маокун) · $10 USD билет на 2-этажный автобус.',
    daysOfWeekEn: 'Daily (Monday – Sunday · Valid 30 days from purchase)',
    daysOfWeekRu: 'Ежедневно (Пн – Вс · Абонемент действует 30 дней с момента покупки)',
    departureTimesEn: '09:00 AM – 21:00 PM (Sightseeing Bus Red & Blue Lines run every 30–40 mins)',
    departureTimesRu: '09:00 – 21:00 (2-этажные автобусы Красной и Синей линий ходят каждые 30–40 мин)',
    returnTimeEn: 'Flexible self-paced schedule (ends ~20:00 PM at Dadaocheng or Xinyi)',
    returnTimeRu: 'Свободный график в своем темпе (завершение ~20:00 на набережной Дадаочэн или в Синьи)',
    totalDurationEn: 'Full Day (Flexible 6 – 9 hours)',
    totalDurationRu: 'Свободный день (6 – 9 часов)',
    meetingPointEn: 'Start right from your Xinyi stay / Sun Yat-Sen Memorial Hall or Taipei 101 stop',
    meetingPointRu: 'Старт прямо от вашего дома в Синьи (Мемориал Сунь Ятсена или башня Тайбэй 101)',
    bookingUrl:
      'https://www.klook.com/en-US/activity/78618-taipei-attractions-pass/',
    kkdayUrl:
      'https://www.kkday.com/en/product/productlist?keyword=Taipei%20FunPASS%20Sightseeing%20Bus',
    getYourGuideUrl:
      'https://funpass.travel.taipei/',
    providerLinks: [
      {
        platform: 'Klook',
        labelEn: 'Buy Klook Pass Taipei (Save 35%)',
        labelRu: 'Купить Klook Pass Taipei (скидка 35%)',
        url: 'https://www.klook.com/en-US/activity/78618-taipei-attractions-pass/',
      },
      {
        platform: 'KKday',
        labelEn: 'Buy Taipei FunPASS on KKday',
        labelRu: 'Купить Taipei FunPASS на KKday',
        url: 'https://www.kkday.com/en/product/productlist?keyword=Taipei%20FunPASS%20Sightseeing%20Bus',
      },
      {
        platform: 'FunPASS',
        labelEn: 'Official Taipei FunPASS Website',
        labelRu: 'Официальный сайт Taipei FunPASS',
        url: 'https://funpass.travel.taipei/',
      },
      {
        platform: 'GetYourGuide',
        labelEn: 'Taipei 101 & Bus on GetYourGuide',
        labelRu: 'Билеты на GetYourGuide',
        url: 'https://www.getyourguide.com/s/?q=Taipei+101+Sightseeing+Bus',
      },
    ],
    includedEn: [
      'Taipei 101 Observatory 89F Fast-Track QR entry',
      'Hop-On Hop-Off Open-Top Sightseeing Bus (Red & Blue Routes with audio guide)',
      'Choice of Maokong Gondola, Taipei Zoo, or National Palace Museum entry',
    ],
    includedRu: [
      'Вход по QR-коду на смотровую площадку 89 этажа небоскреба Тайбэй 101',
      'Поездки на 2-этажном кабриолет-автобусе Hop-On Hop-Off с аудиогидом',
      'На выбор: канатная дорога Маокун, Зоопарк или Музей Императорского дворца',
    ],
    proTipEn:
      'Since you stay right next to Sun Yat-Sen Memorial Hall & Taipei 101 in Xinyi, you can board the Red Line Sightseeing Bus right at Stop #10 (Taipei 101) without going to Taipei Main Station first!',
    proTipRu:
      'Совет: так как вы живете в Синьи рядом с Brownies и Тайбэй 101, вы можете сесть на двухэтажный автобус Красной линии прямо на остановке «Taipei 101», не уезжая на вокзал!',
    stops: [
      {
        stopNumber: 1,
        timeWindow: '10:00 – 11:15',
        durationEn: '1 hr 15 mins',
        durationRu: '1 час 15 мин',
        placeId: 'sun-yat-sen-memorial',
        highlightEn:
          'Morning walk from your Xinyi stay through Sun Yat-Sen Memorial Hall gardens for reflection pond photos of Taipei 101.',
        highlightRu:
          'Утренняя прогулка от вашего дома в Синьи через сады Мемориала Сунь Ятсена и фото отражения Тайбэй 101 в пруду.',
      },
      {
        stopNumber: 2,
        timeWindow: '11:30 – 14:00',
        durationEn: '2.5 hours',
        durationRu: '2,5 часа',
        placeId: 'taipei-101',
        highlightEn:
          'Redeem your Klook Pass QR at the 5F counter to ride the 37-second super-elevator to the 89F Observatory; lunch at Din Tai Fung 101.',
        highlightRu:
          'Подъем по QR-абонементу Klook Pass за 37 секунд на смотровую площадку 89 этажа Тайбэй 101 и обед в Din Tai Fung.',
        ticketUrl:
          'https://www.klook.com/en-US/search/result/?query=Taipei%20101%20Observatory%20Ticket',
        ticketLabelEn: 'Taipei 101 Observatory Ticket on Klook',
        ticketLabelRu: 'Билет на Тайбэй 101 (Klook)',
      },
      {
        stopNumber: 3,
        timeWindow: '14:30 – 16:15',
        durationEn: '1 hr 45 mins',
        durationRu: '1 час 45 мин',
        placeId: 'yongkang-street',
        highlightEn:
          'Ride the Sightseeing Bus (or Red Line MRT) to Dongmen / Yongkang Street for Smoothie House mango shaved ice & flaky scallion pancakes.',
        highlightRu:
          'Переезд на улицу Юнкан в районе Даань: манговый лед Smoothie House, слоеные лепешки с луком и чайные лавки.',
      },
      {
        stopNumber: 4,
        timeWindow: '16:45 – 18:00',
        durationEn: '1 hr 15 mins',
        durationRu: '1 час 15 мин',
        placeId: 'dihua-street',
        highlightEn:
          'Stroll 19th-century Baroque shophouses, herbal tea merchants, and Xia-Hai City God Temple along historic Dihua Street.',
        highlightRu:
          'Прогулка под кирпичными аркадами старинной купеческой улицы Дихуа XIX века и храм Бога Города Сяхай.',
      },
      {
        stopNumber: 5,
        timeWindow: '18:00 – 19:45',
        durationEn: '1 hr 45 mins',
        durationRu: '1 час 45 мин',
        placeId: 'dadaocheng-wharf',
        highlightEn:
          'Walk through Water Gate 5 to Dadaocheng Wharf Pier 5 Container Market for golden-hour sunset views and riverside street food.',
        highlightRu:
          'Выход к реке через Водные ворота №5 на набережную Дадаочэн: закат на верхней палубе контейнерного фуд-маркета.',
      },
    ],
  },
];
