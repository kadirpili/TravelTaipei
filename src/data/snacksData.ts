export type SnackCategory = 'all' | 'drinks' | 'souvenirs' | 'savory' | 'desserts';

export interface MustTrySnack {
  id: string;
  category: Exclude<SnackCategory, 'all'>;
  emoji: string;
  titleRu: string;
  titleEn: string;
  chineseName: string;
  pinyin: string;
  badgeRu: string;
  badgeEn: string;
  priceRangeTwd: string;
  priceRangeUsd: string;
  isTopSouvenir?: boolean;
  descriptionRu: string;
  descriptionEn: string;
  howToOrderRu: string;
  howToOrderEn: string;
  orderPhraseChinese: string;
  orderPhraseMeaningRu: string;
  orderPhraseMeaningEn: string;
  bestBrandsOrStallsRu: string[];
  bestBrandsOrStallsEn: string[];
  placeIds: string[];
  imagePlaceId: string;
}

export const SNACK_CATEGORIES: {
  id: SnackCategory;
  labelRu: string;
  labelEn: string;
}[] = [
  {
    id: 'all',
    labelRu: '🔥 Все хиты Тайваня (12)',
    labelEn: '🔥 All Must-Tries (12)',
  },
  {
    id: 'drinks',
    labelRu: '🧋 Напитки и Бабл-ти',
    labelEn: '🧋 Bubble Tea & Drinks',
  },
  {
    id: 'souvenirs',
    labelRu: '🍪 Нуга-крекеры и сувениры',
    labelEn: '🍪 Nougat Crackers & Souvenirs',
  },
  {
    id: 'savory',
    labelRu: '🥟 Уличная еда и классика',
    labelEn: '🥟 Savory Street Classics',
  },
  {
    id: 'desserts',
    labelRu: '🍧 Десерты и завтраки',
    labelEn: '🍧 Desserts & Breakfast',
  },
];

export const MUST_TRY_SNACKS: MustTrySnack[] = [
  {
    id: 'bubble-milk-tea',
    category: 'drinks',
    emoji: '🧋',
    titleRu: 'Бабл-ти (Bubble Milk Tea) и молоко с тростниковой тапиокой',
    titleEn: 'Original Pearl Bubble Milk Tea & Brown Sugar Boba',
    chineseName: '珍珠奶茶 / 黑糖珍珠鮮奶',
    pinyin: 'Zhēnzhū Nǎichá / Hēitáng Zhēnzhū Xiānnǎi',
    badgeRu: 'Главный напиток Тайваня #1',
    badgeEn: 'Taiwan’s #1 Iconic Drink',
    priceRangeTwd: 'NT$60 – 130',
    priceRangeUsd: '~$2.00 – $4.00',
    descriptionRu:
      'Изобретен на Тайване в 1980-х! Крепкий ароматный чай Ассам или обжаренный улун с молоком и упругими жемчужинами тапиоки («боба» / «QQ»), томленными в карамельном тростниковом сиропе.',
    descriptionEn:
      'Invented in Taiwan in the 1980s! Fragrant Assam black tea or roasted oolong milk tea shaken with ice and chewy tapioca pearls ("QQ" boba) simmered in caramelized brown sugar syrup.',
    howToOrderRu:
      'В любой чайной вас спросят уровень сахара и льда. Местные заказывают «半糖少冰» (50% сахара, меньше льда) или «微糖少冰» (30% сахара, меньше льда), чтобы вкус чая не перебивался сладостью.',
    howToOrderEn:
      'Every tea shop asks for your sweetness and ice level. Locals order "半糖少冰" (50% sugar, less ice) or "微糖少冰" (30% sugar, less ice) so the roasted tea aroma shines through.',
    orderPhraseChinese: '請給我一杯冰珍珠奶茶，半糖少冰',
    orderPhraseMeaningRu: 'Дайте, пожалуйста, 1 холодный Бабл-ти, 50% сахара и меньше льда',
    orderPhraseMeaningEn: '1 Iced Pearl Milk Tea please, half sugar, less ice',
    bestBrandsOrStallsRu: [
      'Chun Shui Tang (春水堂, Синьи A9) — создатели оригинального Бабл-ти',
      'Xing Fu Tang (幸福堂, Симыньдин) — горячие жемчужины в черном сахаре на огне',
      '50 Lan (50嵐), Kebuke (可不可) и Dejeng (得正) — лучшие уличные чайные',
    ],
    bestBrandsOrStallsEn: [
      'Chun Shui Tang (春水堂, Xinyi A9) — original 1987 inventor of Pearl Milk Tea',
      'Xing Fu Tang (幸福堂, Ximending) — stir-fried brown sugar boba fresh from the wok',
      '50 Lan (50嵐), Kebuke (可不可) & Dejeng Oolong (得正) — top local street chains',
    ],
    placeIds: ['chun-shui-tang-xinyi', 'ximending', 'gongguan', 'yongkang-street'],
    imagePlaceId: 'chun-shui-tang-xinyi',
  },
  {
    id: 'scallion-nougat-crackers',
    category: 'souvenirs',
    emoji: '🍪',
    titleRu: 'Хрустящие крекеры с зеленым луком и тягучей нугой (Nougat Crackers)',
    titleEn: 'Scallion & Coffee Nougat Crackers (Noughut Crackers)',
    chineseName: '香蔥牛軋餅 / 咖啡蔥軋餅',
    pinyin: 'Xiāngcōng Niúgábǐng',
    badgeRu: 'Главный гастро-сувенир #1',
    badgeEn: '#1 Must-Buy Edible Souvenir',
    priceRangeTwd: 'NT$220 – 380 за коробку',
    priceRangeUsd: '~$7.00 – $12.00 / box',
    isTopSouvenir: true,
    descriptionRu:
      'Самое затягивающее лакомство Тайбэя! Два тонких хрустящих содовых крекера с солью и зеленым луком, между которыми спрятана нежная сливочная или кофейная нуга, не прилипающая к зубам. Идеальный баланс соленого и сладкого.',
    descriptionEn:
      'Taipei’s most addictive sweet-and-savory treat! Two crispy, lightly salted green-onion soda crackers sandwiching a soft, creamy milk or coffee nougat filling that never sticks to your teeth.',
    howToOrderRu:
      'Секрет местных: перед едой положите крекер в микроволновку ровно на 5–8 секунд — нуга внутри слегка подтает и станет невероятно тягучей!',
    howToOrderEn:
      'Insider tip: Warm a nougat cracker in the microwave for 5–8 seconds before eating so the nougat center turns warm, melty, and stretchy!',
    orderPhraseChinese: '請問有香蔥牛軋餅和咖啡牛軋餅嗎？我想買兩盒',
    orderPhraseMeaningRu: 'У вас есть луковые и кофейные нуга-крекеры? Хочу купить 2 коробки',
    orderPhraseMeaningEn: 'Do you have scallion and coffee nougat crackers? I would like 2 boxes',
    bestBrandsOrStallsRu: [
      'Saint Peter (聖比德, улица Юнкан) — знаменитые кофейные и луковые нуга-крекеры',
      'Laetitia (甜滿, улица Юнкан) и ChiaTe (佳德, Суншань) — толстый слой сливочной нуги',
      'Mimi Cracker (蜜密) и Sugar & Spice (糖村, Тайбэй 101 B1)',
    ],
    bestBrandsOrStallsEn: [
      'Saint Peter (聖比德, Yongkang St) — famous for Coffee & Scallion Nougat Crackers',
      'Laetitia (甜滿, Yongkang St) & ChiaTe Bakery (佳德, Songshan) — extra-thick milk nougat',
      'Sugar & Spice (糖村, Taipei 101 B1) — gourmet gift boxes',
    ],
    placeIds: [
      'saint-peter-nougat-yongkang',
      'chiate-bakery-pineapple',
      'yongkang-street',
      'taipei-101',
    ],
    imagePlaceId: 'saint-peter-nougat-yongkang',
  },
  {
    id: 'pineapple-cakes',
    category: 'souvenirs',
    emoji: '🍍',
    titleRu: 'Тайваньские ананасовые пирожные (Pineapple Cakes / Фэнлису)',
    titleEn: 'Taiwanese Pineapple Cake & Egg-Yolk Pineapple Pastry',
    chineseName: '鳳梨酥 / 鳳黃酥 / 土鳳梨酥',
    pinyin: 'Fènglísū / Fènghuángsū',
    badgeRu: 'Золотой стандарт подарка из Тайбэя',
    badgeEn: 'Classic Taiwan Gift Box',
    priceRangeTwd: 'NT$280 – 540 за коробку',
    priceRangeUsd: '~$9.00 – $17.00 / box',
    isTopSouvenir: true,
    descriptionRu:
      'Рассыпчатое песочное тесто на новозеландском сливочном масле с густой начинкой из тайваньского ананаса. Бывают двух видов: классические сладкие (佳德 ChiaTe) и с легкой тропической кислинкой из 100% фермерского ананаса (土鳳梨酥 SunnyHills).',
    descriptionEn:
      'Buttery, crumbly shortbread crust filled with slow-cooked Taiwanese pineapple jam. Comes in two beloved styles: smooth & sweet classic blend (ChiaTe 佳德) or tangy 100% native mountain pineapple (SunnyHills 微熱山丘).',
    howToOrderRu:
      'В пекарне ChiaTe обязательно возьмите коробку «鳳黃酥» (Фэнхуансу — ананасовое пирожное с соленым яичным желтком внутри): сочетание сладкого ананаса и солоноватого желтка — фаворит тайваньцев.',
    howToOrderEn:
      'At ChiaTe Bakery, also grab a box of "鳳黃酥" (Fenghuangsu — Pineapple Cake with Salted Egg Yolk): the sweet-savory yolk center is the #1 favorite among Taipei locals!',
    orderPhraseChinese: '請給我一盒原味鳳梨酥，還有一盒鳳黃酥',
    orderPhraseMeaningRu: 'Дайте, пожалуйста, 1 коробку классических ананасовых пирожных и 1 коробку с желтком',
    orderPhraseMeaningEn: '1 box of original pineapple cakes and 1 box of egg-yolk pineapple cakes please',
    bestBrandsOrStallsRu: [
      'ChiaTe Bakery (佳德糕餅, Суншань) — чемпион Тайбэя, в 6 мин на такси от Синьи',
      'SunnyHills (微熱山丘, Тайбэй 101 и Суншань) — 100% ананас с бесплатной дегустацией',
      'Costco Neihu / Taipei 101 B1 Food Hall — подарочные наборы без очередей',
    ],
    bestBrandsOrStallsEn: [
      'ChiaTe Bakery (佳德糕餅, Songshan) — Taipei’s #1 gold-medal bakery, 6 mins from Xinyi',
      'SunnyHills (微熱山丘, Taipei 101 & Minsheng) — 100% tangy native pineapple',
      'Taipei 101 B1 Souvenir Hall & Costco Neihu — convenient gift boxes',
    ],
    placeIds: ['chiate-bakery-pineapple', 'taipei-101', 'costco-neihu', 'dihua-street'],
    imagePlaceId: 'chiate-bakery-pineapple',
  },
  {
    id: 'french-milk-nougat',
    category: 'souvenirs',
    emoji: '🍬',
    titleRu: 'Мягкая молочная нуга с макадамией, миндалем и клубникой',
    titleEn: 'Taiwanese Soft Milk, Matcha & Macadamia Nougat',
    chineseName: '法式牛軋糖 / 夏威夷豆牛軋糖',
    pinyin: 'Fǎshì Niúgátáng',
    badgeRu: 'Нежная нуга ручной работы',
    badgeEn: 'Artisan Soft Nougat',
    priceRangeTwd: 'NT$320 – 500 за упаковку',
    priceRangeUsd: '~$10.00 – $16.00 / pack',
    isTopSouvenir: true,
    descriptionRu:
      'Тайваньская мягкая нуга на французском сливочном масле с цельным жареным калифорнийским миндалем или орехом макадамия. Тает во рту, не твердеет и выпускается со вкусами сливок, клубники, чая улун и японской матчи.',
    descriptionEn:
      'Creamy, melt-in-your-mouth Taiwanese milk nougat crafted with French butter and whole roasted Californian almonds or Australian macadamia nuts, in original milk, freeze-dried strawberry, oolong tea, and Uji matcha flavors.',
    howToOrderRu:
      'Попросите ассорти («綜合牛軋糖»), чтобы в одной подарочной упаковке были сливочная, клубничная и матча-нуга.',
    howToOrderEn:
      'Ask for the assorted gift bag ("綜合牛軋糖") to get original milk, strawberry, and matcha nougat in one pack.',
    orderPhraseChinese: '請問有綜合口味的牛軋糖（原味、草莓、抹茶）嗎？',
    orderPhraseMeaningRu: 'У вас есть ассорти нуги (классическая, клубника, матча)?',
    orderPhraseMeaningEn: 'Do you have assorted nougat (original, strawberry, matcha)?',
    bestBrandsOrStallsRu: [
      'Sugar & Spice (糖村, Тайбэй 101 B1 и улица Юнкан) — самая известная нуга Тайваня',
      'Saint Peter (聖比德, улица Юнкан) — нуга с макадамией и кофе',
      'Лавки старой улицы Дихуа (迪化街) — свежесваренная нуга с орехами',
    ],
    bestBrandsOrStallsEn: [
      'Sugar & Spice (糖村, Taipei 101 B1 & Yongkang St) — Taiwan’s most famous French nougat',
      'Saint Peter (聖比德, Yongkang St) — macadamia & coffee nougat',
      'Dihua Street (迪化街) traditional sweet shops',
    ],
    placeIds: ['saint-peter-nougat-yongkang', 'taipei-101', 'dihua-street', 'xinyi-district'],
    imagePlaceId: 'taipei-101',
  },
  {
    id: 'guava-tea-fruit-drinks',
    category: 'drinks',
    emoji: '🍹',
    titleRu: 'Кофе со свежей гуавой, чай улун с маракуйей и папайя с молоком',
    titleEn: 'Guava Iced Americano, Passionfruit Green Tea & Papaya Milk',
    chineseName: '芭樂美式咖啡 / 百香雙響炮 / 木瓜牛奶',
    pinyin: 'Bālè Měishì Kāfēi / Mùguā Niúnǎi',
    badgeRu: 'Тропическая свежесть Тайбэя',
    badgeEn: 'Tropical Taipei Refreshers',
    priceRangeTwd: 'NT$65 – 145',
    priceRangeUsd: '~$2.00 – $4.50',
    descriptionRu:
      'Помимо классического Бабл-ти, Тайбэй обожает тропические миксы: холодный эспрессо со свежевыжатым соком тайваньской гуавы (в Barista Ray), зеленый чай с маракуйей, тапиокой и кокосовым желе, а также густой коктейль из спелой папайи с молоком.',
    descriptionEn:
      'Beyond classic milk tea, Taipei excels at tropical fruit craft drinks: iced espresso layered over fresh Taiwanese heart-guava juice (at Barista Ray), passionfruit green tea with boba & coconut jelly, and velvety fresh papaya milk.',
    howToOrderRu:
      'Папайю с молоком («木瓜牛奶») нужно пить сразу в течение 15 минут после взбивания, пока она воздушная и густая!',
    howToOrderEn:
      'Drink fresh Papaya Milk ("木瓜牛奶") within 15 minutes of blending while it is cold, frothy, and velvety!',
    orderPhraseChinese: '請給我一杯芭樂美式咖啡，微冰',
    orderPhraseMeaningRu: 'Дайте, пожалуйста, 1 холодный кофе с гуавой, минимум льда',
    orderPhraseMeaningEn: '1 Guava Iced Americano please, light ice',
    bestBrandsOrStallsRu: [
      'Barista Ray Coffee (睿咖啡, Даань) — легендарный холодный американо с соком гуавы',
      'Чайные Маокуна и Kai Men Cha Dang — холодный высокогорный улун и Тегуаньинь',
      'Ночные рынки Жаохэ и Симыньдин — свежая папайя с молоком (木瓜牛奶)',
    ],
    bestBrandsOrStallsEn: [
      'Barista Ray Coffee (Da’an) — signature Taiwanese Guava Iced Americano',
      'Kai Men Cha Dang & Maokong Tea Houses — cold-brewed high-mountain oolong',
      'Raohe & Ximending Night Markets — freshly blended Papaya Milk (木瓜牛奶)',
    ],
    placeIds: ['barista-ray-coffee', 'kai-men-cha-dang', 'maokong', 'raohe-night-market'],
    imagePlaceId: 'barista-ray-coffee',
  },
  {
    id: 'xiaolongbao-soup-dumplings',
    category: 'savory',
    emoji: '🥟',
    titleRu: 'Суповые пельмени Сяолунбао (18 защипов) и пельмени с люффой и креветкой',
    titleEn: '18-Fold Xiao Long Bao (Pork & Loofah-Shrimp Soup Dumplings)',
    chineseName: '原味小籠包 / 絲瓜蝦仁小籠包',
    pinyin: 'Xiǎolóngbāo',
    badgeRu: 'Кулинарный символ Тайбэя',
    badgeEn: 'Michelin Culinary Icon',
    priceRangeTwd: 'NT$160 – 280 за корзинку',
    priceRangeUsd: '~$5.00 – $9.00 / steamer',
    descriptionRu:
      'Тончайшее полупрозрачное тесто с ювелирными 18 защипами, внутри которого — сочная свинина (или нежная зеленая тыква-люффа со сладкой креветкой) и ложка обжигающего ароматного бульона.',
    descriptionEn:
      'Paper-thin dough hand-pleated with 18 precise folds around juicy pork (or sweet green loofah gourd and whole shrimp) swimming in rich, piping-hot savory broth.',
    howToOrderRu:
      'Смешайте в блюдце соевый соус и черный рисовый уксус в пропорции 1:3, добавьте свежий имбирь. Положите пельмень в ложку, надкусите край, выпейте бульон и затем съешьте пельмень с имбирем!',
    howToOrderEn:
      'Mix 1 part soy sauce to 3 parts black vinegar over fresh ginger threads. Place the dumpling in your spoon, nip a tiny hole to sip the hot broth first, then top with ginger and enjoy!',
    orderPhraseChinese: '請給我一籠原味小籠包、一籠絲瓜蝦仁小籠包、一盤炒空心菜',
    orderPhraseMeaningRu: '1 корзинку классических сяолунбао, 1 с люффой и креветкой и тарелку водяного шпината',
    orderPhraseMeaningEn: '1 steamer of pork XLB, 1 steamer of loofah & shrimp XLB, and garlic water spinach',
    bestBrandsOrStallsRu: [
      'Din Tai Fung (鼎泰豐, Тайбэй 101 и флагман Синьшэн на Юнкан) — мировой эталон',
      'Zhuji / Jhuji (朱記餡餅粥店, Breeze Xinyi) — сяолунбао и жареные пирожки с говядиной',
      'Bei Da Hang (北大行, Синьи) и Ding Hao Zi Lin (頂好紫琳, Даань) — любимые места местных',
    ],
    bestBrandsOrStallsEn: [
      'Din Tai Fung (鼎泰豐, Taipei 101 & Xinsheng Yongkang Flagship) — the global gold standard',
      'Zhuji / Jhuji (朱記餡餅粥店, Breeze Xinyi) — soup dumplings & crispy beef pies',
      'Bei Da Hang (北大行, Xinyi) & Ding Hao Zi Lin (頂好紫琳, Da’an) — beloved local institutions',
    ],
    placeIds: [
      'din-tai-fung-101',
      'din-tai-fung-xinsheng',
      'zhuji-dumplings',
      'bei-da-hang-xlb',
    ],
    imagePlaceId: 'din-tai-fung-101',
  },
  {
    id: 'black-pepper-pork-bun',
    category: 'savory',
    emoji: '🥯',
    titleRu: 'Хрустящая перцовая булочка со свининой из глиняного тандыра (Hujiaobing)',
    titleEn: 'Clay-Oven Crispy Black Pepper Pork Bun (Hujiaobing)',
    chineseName: '福州世祖胡椒餅',
    pinyin: 'Hújiāobǐng',
    badgeRu: 'Гид Мишлен Bib Gourmand',
    badgeEn: 'Michelin Bib Gourmand Street Hit',
    priceRangeTwd: 'NT$60 – 65',
    priceRangeUsd: '~$2.00',
    descriptionRu:
      'Горячая булочка в кунжутной корочке, начиненная маринованной свининой, огромной горстью сочного зеленого лука и дробленым черным перцем. Выпекается прямо на внутренних стенках раскаленной до 200°C угольной глиняной бочки!',
    descriptionEn:
      'Sesame-crusted dough stuffed with marinated pork belly and lean loin, mounds of fragrant green scallions, and cracked black pepper, slapped onto the wall of a 200°C charcoal clay barrel oven.',
    howToOrderRu:
      'Осторожно при первом укусе: внутри скапливается обжигающий перечно-мясной сок! Подождите 1–2 минуты после покупки.',
    howToOrderEn:
      'Wait 60 seconds before taking your first bite—the crispy crust seals in lava-hot peppery meat broth!',
    orderPhraseChinese: '老闆，請給我兩個熱的胡椒餅',
    orderPhraseMeaningRu: 'Босс, дайте, пожалуйста, две горячие перцовые булочки',
    orderPhraseMeaningEn: 'Boss, two hot black pepper pork buns please',
    bestBrandsOrStallsRu: [
      'Fuzhou Ancestral Pepper Bun (福州世祖胡椒餅) — у восточного входа на ночной рынок Жаохэ',
      'Киоски у станции Симыньдин и Главного вокзала Тайбэя',
    ],
    bestBrandsOrStallsEn: [
      'Fuzhou Ancestral Pepper Bun (福州世祖胡椒餅) — East Entrance of Raohe Night Market',
      'Street stalls around Ximending & Taipei Main Station',
    ],
    placeIds: ['raohe-night-market', 'ximending', 'gongguan'],
    imagePlaceId: 'raohe-night-market',
  },
  {
    id: 'tianjin-scallion-pancake',
    category: 'savory',
    emoji: '🥞',
    titleRu: 'Слоеная луковая лепешка Тяньцзинь с яйцом, базиликом и сыром',
    titleEn: 'Flaky Hand-Pulled Scallion Pancake with Egg & Thai Basil',
    chineseName: '天津蔥抓餅（加蛋、九層塔、起司）',
    pinyin: 'Cōngzhuābǐng Jiādàn Jiǔcéngtǎ',
    badgeRu: 'Легенда улицы Юнкан',
    badgeEn: 'Yongkang Street Legend',
    priceRangeTwd: 'NT$40 – 65',
    priceRangeUsd: '~$1.30 – $2.00',
    descriptionRu:
      'Крученую лепешку с зеленым луком жарят на чугунной плите и прямо в процессе взбивают двумя лопатками, чтобы тесто разделилось на десятки воздушных хрустящих слоев, а затем заворачивают внутрь яйцо, свежий базилик и сыр.',
    descriptionEn:
      'Griddled coiled scallion dough beaten rhythmically with two spatulas until it fluffs into dozens of feathery, crispy layers, folded over a fried egg, fresh Taiwanese basil, and melted cheese.',
    howToOrderRu:
      'Берите версию «總匯» (Цзунхуэй — всё включено: яйцо, базилик, ветчина и сыр) и попросите немного сладковатой чесночно-соевой пасты.',
    howToOrderEn:
      'Order the "總匯" (Everything combo: egg, fresh basil, ham & cheese) brushed with sweet soy-garlic paste and a touch of chili.',
    orderPhraseChinese: '請給我一個總匯蔥抓餅（加蛋、九層塔、起司），小辣',
    orderPhraseMeaningRu: '1 слоеную лепешку «всё включено» (яйцо, базилик, сыр), слегка острую',
    orderPhraseMeaningEn: '1 everything scallion pancake (egg, basil, cheese), mild spicy please',
    bestBrandsOrStallsRu: [
      'Tian Jin Flaky Scallion Pancake (天津蔥抓餅, угол парка на улице Юнкан)',
      'Ночной рынок Гунгуань (公館夜市) и улочки Даань',
    ],
    bestBrandsOrStallsEn: [
      'Tian Jin Flaky Scallion Pancake (天津蔥抓餅, corner of Yongkang St & Alley 6)',
      'Gongguan Night Market (公館夜市)',
    ],
    placeIds: ['yongkang-street', 'saint-peter-nougat-yongkang', 'gongguan'],
    imagePlaceId: 'yongkang-street',
  },
  {
    id: 'beef-noodle-soup-luroufan',
    category: 'savory',
    emoji: '🍜',
    titleRu: 'Тайваньский суп с томленой говядиной (Beef Noodle Soup) и Гуа-бао',
    titleEn: 'Taiwanese Braised Beef Noodle Soup & Pork Belly Gua Bao',
    chineseName: '紅燒牛肉麵 / 清燉牛肉麵 / 刈包',
    pinyin: 'Niúròumiàn & Guàbāo',
    badgeRu: 'Национальное блюдо Тайваня',
    badgeEn: 'Taiwan’s National Comfort Food',
    priceRangeTwd: 'NT$70 – 260',
    priceRangeUsd: '~$2.20 – $8.20',
    descriptionRu:
      'Гордость тайваньской кухни: густой пряный бульон «хуншао» или прозрачный бульон «циндунь» с тающей во рту говяжьей голяшкой и домашней упругой лапшой, а также «тайваньский бургер» Гуа-бао — паровая булочка со свиной грудинкой, арахисовой пудрой и кинзой.',
    descriptionEn:
      'Taiwan’s national pride: slow-braised beef shank and tendon over springy hand-cut noodles in rich spiced soy-beef broth (Hongshao) or clear herbal broth (Qingdun), paired with Gua Bao ("Taiwanese hamburger" with pork belly & crushed peanut powder).',
    howToOrderRu:
      'В Chang’s Halal Beef Noodle обязательно возьмите к супу слоеные лепешки с рубленой говядиной (牛肉餡餅). А в Гунгуане при заказе Гуа-бао скажите «半肥半瘦» (половина постного, половина сочного мяса).',
    howToOrderEn:
      'At Chang’s Beef Noodle, pair your bowl with pan-fried beef pies (牛肉餡餅). When ordering Gua Bao in Gongguan, ask for "半肥半瘦" (half-lean, half-fatty pork) for the best texture.',
    orderPhraseChinese: '請給我一碗紅燒半筋半肉牛肉麵，還有一個半肥半瘦刈包',
    orderPhraseMeaningRu: '1 суп с говядиной и сухожилиями в темном бульоне и 1 гуа-бао 50/50',
    orderPhraseMeaningEn: '1 braised half-tendon half-beef noodle soup and 1 half-lean Gua Bao',
    bestBrandsOrStallsRu: [
      'Chang’s Halal Beef Noodle (張記清真黃牛肉麵館, Чжунчжэн) и Yongkang Beef Noodle',
      'Lan Jia Gua Bao (藍家割包, ночной рынок Гунгуань у NTU)',
      'Chun Shui Tang (春水堂, Синьи A9) и Zhuji (朱記, Breeze Xinyi)',
    ],
    bestBrandsOrStallsEn: [
      'Chang’s Halal Beef Noodle Shop (張記清真黃牛肉麵館) & Yongkang Street',
      'Lan Jia Traditional Gua Bao (藍家割包, Gongguan Night Market)',
      'Chun Shui Tang (Xinyi A9) & Zhuji (Breeze Xinyi)',
    ],
    placeIds: ['changs-halal-beef-noodle', 'yongkang-street', 'gongguan', 'zhuji-dumplings'],
    imagePlaceId: 'changs-halal-beef-noodle',
  },
  {
    id: 'night-market-chicken-vermicelli',
    category: 'savory',
    emoji: '🍗',
    titleRu: 'Гигантская хрустящая куриная отбивная (Ji Pai) и вермишель А-Цзун',
    titleEn: 'Giant Night-Market Fried Chicken Cutlet & Ay-Chung Vermicelli',
    chineseName: '豪大大雞排 & 阿宗麵線',
    pinyin: 'Dàjīpái & Ā-Zōng Mìanxiàn',
    badgeRu: 'Короли вечернего Симыньдина',
    badgeEn: 'Ximending & Night Market Icons',
    priceRangeTwd: 'NT$65 – 100',
    priceRangeUsd: '~$2.00 – $3.20',
    descriptionRu:
      'Два легендарных хита вечерних прогулок: куриная грудка размером с лицо в хрустящей панировке из бататового крахмала с белым перцем или пудрой из сушеной сливы, и густая шелковистая вермишель А-Цзун в бульоне с тунцом-бонито, кинзой и чесноком.',
    descriptionEn:
      'The ultimate night-walk duo: a face-sized marinated chicken breast fried in sweet-potato starch until shatteringly crisp and dusted with white pepper or plum powder, followed by a steaming bowl of Ay-Chung bonito-broth vermicelli eaten standing up with a spoon.',
    howToOrderRu:
      'Куриную отбивную всегда просите «不切» (не нарезать на кусочки), чтобы весь мясной сок остался внутри хрустящей корочки!',
    howToOrderEn:
      'Always order your giant chicken cutlet "不切" (uncut)—slicing it lets the hot steam and meat juices escape!',
    orderPhraseChinese: '一片原味大雞排（不切、小辣），還有一碗小碗阿宗麵線',
    orderPhraseMeaningRu: '1 большую куриную отбивную (не резать, чуть острую) и 1 малую порцию вермишели',
    orderPhraseMeaningEn: '1 giant chicken cutlet (uncut, mild spicy) and 1 small bowl of Ay-Chung vermicelli',
    bestBrandsOrStallsRu: [
      'Пешеходная зона Симыньдин (西門町, Emei St) — Ay-Chung Flour-Rice Noodle и Hot-Star',
      'Ночной рынок Жаохэ (饒河街夜市) — куриный стейк на углях и шарики из сладкого картофеля',
    ],
    bestBrandsOrStallsEn: [
      'Ximending Pedestrian Zone (Emei St) — Ay-Chung Flour-Rice Noodle & Hot-Star Large Fried Chicken',
      'Raohe Street Night Market — charcoal-grilled chicken cutlet & sweet potato balls',
    ],
    placeIds: ['ximending', 'raohe-night-market', 'gongguan', 'dadaocheng-wharf'],
    imagePlaceId: 'ximending',
  },
  {
    id: 'mango-shaved-ice-taro-balls',
    category: 'desserts',
    emoji: '🍧',
    titleRu: 'Манговый снежный лед (Snowflake Ice) и шарики из таро (Taro Balls)',
    titleEn: 'Fresh Mango Snowflake Shaved Ice & Jiufen Taro Balls',
    chineseName: '新鮮芒果雪花冰 & 手工芋圓仙草凍',
    pinyin: 'Mángguǒ Xuěhuābīng & Yùyuán',
    badgeRu: 'Главный десерт Тайваня',
    badgeEn: 'Signature Taiwanese Dessert',
    priceRangeTwd: 'NT$95 – 250',
    priceRangeUsd: '~$3.00 – $8.00',
    descriptionRu:
      'Воздушные ленты замороженного мангового молока («снежный лед» 雪花冰), усыпанные крупными кусками спелого тайваньского манго сорта Ирвин, панна-коттой и шариком мангового сорбета. А в прохладную погоду — теплые тягучие шарики из таро и батата (芋圓) с травяным желе.',
    descriptionEn:
      'Feather-light ribbons of shaved mango-milk snow (雪花冰) crowned with sweet Taiwanese Irwin mangoes, condensed milk, and mango sorbet—or chewy handmade taro and sweet potato balls (芋圓) served warm or iced over herbal grass jelly.',
    howToOrderRu:
      'Одна порция мангового снежного льда в Smoothie House на улице Юнкан огромная — смело берите одну чашу на двоих!',
    howToOrderEn:
      'One bowl of Mango Snowflake Ice on Yongkang Street is massive—easily shared between two people!',
    orderPhraseChinese: '請給我一碗新鮮芒果雪花冰加奶酪，還有一碗綜合芋圓仙草冰',
    orderPhraseMeaningRu: '1 чашу мангового снежного льда с панна-коттой и 1 десерт с шариками таро',
    orderPhraseMeaningEn: '1 fresh mango snowflake ice with panna cotta and 1 mixed taro-ball grass jelly dessert',
    bestBrandsOrStallsRu: [
      'Smoothie House (思慕昔, улица Юнкан) — самый знаменитый манговый лед в Тайбэе',
      'Meet Fresh (鮮芋仙, Syntrend / Синьи) — шарики таро, травяное желе и тофу-пудинг Доухуа',
      'Ah Gan Auntie Taro Balls (阿柑姨芋圓, старая улица Цзюфэнь) — с видом на океан',
    ],
    bestBrandsOrStallsEn: [
      'Smoothie House (思慕昔, Yongkang Street) — Taipei’s iconic towering mango snowflake ice',
      'Meet Fresh (鮮芋仙, Syntrend) — handmade taro balls, grass jelly & silky tofu pudding',
      'Ah Gan Auntie Taro Balls (阿柑姨芋圓, Jiufen Old Street) — eaten overlooking the ocean',
    ],
    placeIds: ['yongkang-street', 'meet-fresh-syntrend', 'jiufen-old-street', 'ximending'],
    imagePlaceId: 'meet-fresh-syntrend',
  },
  {
    id: 'taiwanese-breakfast-fantuan-soymilk',
    category: 'desserts',
    emoji: '🥪',
    titleRu: 'Традиционный тайваньский завтрак: Соевое молоко, Шаобин, Даньбин и Фаньтуань',
    titleEn: 'Classic Taiwanese Breakfast: Salty Soy Milk, Clay-Oven Shaobing & Fantuan',
    chineseName: '鹹豆漿、厚餅夾蛋油條、紫米飯糰、粉漿蛋餅',
    pinyin: 'Xiándòujiāng, Shāobǐng, Fàntuán & Dànbǐng',
    badgeRu: 'Утренний ритуал Тайбэя',
    badgeEn: 'Taipei Morning Ritual',
    priceRangeTwd: 'NT$45 – 120',
    priceRangeUsd: '~$1.50 – $3.80',
    descriptionRu:
      'Настоящее тайваньское утро: карамельная лепешка из тандыра с омлетом и хрустящим хворостом ютяо (厚餅夾蛋油條), горячее пикантное соевое молоко с кунжутным маслом и зеленью (鹹豆漿), плотный ролл из черного риса с начинкой (飯糰) и нежные яичные блинчики даньбин (蛋餅).',
    descriptionEn:
      'Experience a true Taipei morning: caramelized clay-oven flatbread folded around egg and crispy cruller (厚餅夾蛋油條), warm savory soy milk curds with chili oil & scallions (鹹豆漿), purple sticky-rice roll (飯糰), and soft-batter egg crepes (蛋餅).',
    howToOrderRu:
      'В Fuhang Soy Milk возьмите «厚餅夾蛋» (толстая лепешка с яйцом) и стакан холодного сладкого или горячего соленого соевого молока. А рядом с вашим домом в Синьи — тосты на углях в Zhen Fang!',
    howToOrderEn:
      'At Fuhang Soy Milk, order the "厚餅夾蛋" (thick clay-oven flatbread with egg) with iced sweet soy milk or hot savory soy milk. Right near your Xinyi stay, visit Zhen Fang for charcoal-grilled toast & soft egg crepes!',
    orderPhraseChinese: '一碗溫豆漿、一碗鹹豆漿、一個厚餅夾蛋、一個飯糰',
    orderPhraseMeaningRu: '1 теплое соевое молоко, 1 соленое соевое молоко, 1 толстую лепешку с яйцом и 1 ролл фаньтуань',
    orderPhraseMeaningEn: '1 warm sweet soy milk, 1 savory soy milk, 1 thick flatbread with egg, and 1 rice roll',
    bestBrandsOrStallsRu: [
      'Fuhang Soy Milk (阜杭豆漿, метро Shandao Temple) — мишленовская легенда завтраков с 1958 г.',
      'Zhen Fang Brunch (真芳, Синьи у парка Суншань) — блинчики даньбин и тосты в 5 мин от дома',
      'Zhuji (朱記, Breeze Xinyi) — пшенная каша, слоеные пирожки и пельмени',
    ],
    bestBrandsOrStallsEn: [
      'Fuhang Soy Milk (阜杭豆漿, Shandao Temple MRT) — Michelin Bib Gourmand legend since 1958',
      'Zhen Fang Brunch (真芳, Xinyi Songyan) — soft egg crepes & charcoal toast 5 mins from your stay',
      'Zhuji (朱記, Breeze Xinyi) — traditional millet porridge & flaky pastries',
    ],
    placeIds: ['fuhang-soy-milk', 'zhen-fang-brunch', 'zhuji-dumplings'],
    imagePlaceId: 'fuhang-soy-milk',
  },
];

export function filterMustTrySnacks(
  snacks: MustTrySnack[],
  category: SnackCategory,
  searchQuery: string
): MustTrySnack[] {
  const raw = searchQuery.trim().toLowerCase();
  const normalized = raw
    .replace(/noughut|noughet|nugat/g, 'nougat')
    .replace(/snakcs|snaks/g, 'snacks')
    .replace(/boba|bubble tea|milk tea/g, 'bubble milk tea');

  return snacks.filter((item) => {
    if (category !== 'all' && item.category !== category) {
      return false;
    }
    if (!normalized) return true;

    const haystack = [
      item.id,
      item.titleRu,
      item.titleEn,
      item.chineseName,
      item.pinyin,
      item.badgeRu,
      item.badgeEn,
      item.descriptionRu,
      item.descriptionEn,
      item.howToOrderRu,
      item.howToOrderEn,
      item.orderPhraseChinese,
      ...item.bestBrandsOrStallsRu,
      ...item.bestBrandsOrStallsEn,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalized) || haystack.includes(raw);
  });
}
