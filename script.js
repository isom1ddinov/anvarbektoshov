/* ==========================================================================
   Dr. Anvarbek Toshov — UI logic
   i18n (RU/UZ) · GSAP intro + scroll animations · Yandex map & route ·
   service modal · custom select · booking form → Telegram
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  /* ------------------------------------------------------------------
     Clinic constants (Yandex Maps organisation "Anvarbek Toshov")
     ------------------------------------------------------------------ */
  const ORG = {
    oid: '141355307523',
    lat: 41.337263,
    lon: 69.274077,
    slug: 'anvarbek_toshov',
    ref: 'anvarbektoshovuz'
  };
  const YANDEX_GO_TRACKING_ID = '1178268795219780156'; // official: opens app, falls back to store
  const TELEGRAM_USERNAME = 'mrToshoff';

  /* ------------------------------------------------------------------
     Translations — default language is Russian, choice is persisted
     ------------------------------------------------------------------ */
  const DEFAULT_LANG = 'ru';
  const LANGS = ['ru', 'uz'];
  const STORAGE_KEY = 'at-lang';

  const I18N = {
    ru: {
      'meta.title': 'Др. Анварбек Тошов | Стоматолог-имплантолог в Ташкенте',
      'meta.description': 'Др. Анварбек Тошов — хирург стоматолог-имплантолог. 10 лет опыта, 6000+ установленных имплантов, имплантация за 1 день, пожизненная гарантия. Запишитесь на бесплатную консультацию.',
      'meta.ogDescription': '10 лет опыта · 6000+ имплантов · имплантация за 1 день · пожизненная гарантия',

      'brand.name': 'Др. Анварбек Тошов',
      'brand.role': 'Стоматолог-имплантолог',
      'brand.logoAlt': 'Логотип дентального импланта',

      'lang.group': 'Язык сайта',
      'nav.home': 'Главная',
      'nav.doctor': 'Врач',
      'nav.services': 'Услуги',
      'nav.location': 'Адрес',
      'nav.contact': 'Контакты',
      'nav.close': 'Закрыть меню',
      'nav.menu': 'Меню',
      'nav.menuTitle': 'Меню',
      'cta.book': 'Записаться',

      'hero.eyebrow': 'Хирург стоматолог-имплантолог',
      'hero.title': 'Анварбек Тошов — <span>здоровая улыбка</span> в надёжных руках',
      'hero.lead': '10 лет практического опыта и более 6000 успешно установленных имплантов. Индивидуальный план лечения и пожизненная гарантия для каждого пациента.',
      'hero.stat1': 'лет опыта',
      'hero.stat2': 'установленных имплантов',
      'hero.stat3': 'день — имплантация',
      'hero.ctaConsult': 'Бесплатная консультация',
      'hero.ctaCall': 'Позвонить',
      'hero.trustLine': 'Пожизненная гарантия на каждый установленный имплант',
      'hero.photoAlt': 'Др. Анварбек Тошов — хирург стоматолог-имплантолог',
      'hero.badgeTitle': 'Имплантолог',
      'hero.badgeText': 'Индивидуальный подход',
      'hero.fc1Title': 'За 1 день',
      'hero.fc1Text': 'Имплантация',
      'hero.fc2Title': 'Пожизненная',
      'hero.fc2Text': 'Гарантия',
      'hero.scroll': 'Листайте',

      'marquee.1': 'Имплантация за 1 день',
      'marquee.2': 'Пожизненная гарантия',
      'marquee.3': '3D КТ-диагностика',
      'marquee.4': '6000+ имплантов',
      'marquee.5': 'Протезирование',
      'marquee.6': 'Эстетическая стоматология',

      'about.eyebrow': 'О враче',
      'about.title': 'Хирург-имплантолог, которому доверяют улыбку',
      'about.lead': 'Анварбек Тошов — хирург стоматолог-имплантолог с 10-летней практикой. Более 6000 установленных имплантов, имплантация за 1 день и пожизненная гарантия на каждую работу.',
      'about.p1': 'Полный цикл: диагностика → имплантация → протезирование',
      'about.p2': 'Планирование на 3D КТ — предсказуемый результат',
      'about.p3': 'Безболезненно — под современной анестезией',
      'about.cta': 'Записаться на консультацию',
      'about.insta': 'Работы в Instagram',

      'trust.1Title': '10+ лет опыта',
      'trust.1Text': 'В хирургической имплантологии',
      'trust.2Title': 'Современная диагностика',
      'trust.2Text': 'Точное 3D-обследование',
      'trust.3Title': 'Пожизненная гарантия',
      'trust.3Text': 'На установленные импланты',
      'trust.4Title': 'Индивидуальный план',
      'trust.4Text': 'Для каждого пациента',

      'services.eyebrow': 'Услуги',
      'services.title': 'Основные направления',
      'services.lead': 'От диагностики до имплантации — все необходимые услуги в одном месте.',
      'services.more': 'Подробнее',

      'svc.implant.title': 'Имплантация',
      'svc.implant.short': 'Современные имплант-системы с пожизненной гарантией.',
      'svc.implant.option': 'Восстановление зуба вместе с корнем',
      'svc.prosthetics.title': 'Протезирование',
      'svc.prosthetics.short': 'Удобные и естественные зубные протезы (мосты).',
      'svc.prosthetics.option': 'Коронки, мосты и протезы',
      'svc.aesthetic.title': 'Эстетическая стоматология',
      'svc.aesthetic.short': 'Отбеливание зубов и обновление улыбки.',
      'svc.aesthetic.option': 'Отбеливание, виниры, реставрация',
      'svc.diagnostics.title': 'Диагностика',
      'svc.diagnostics.short': 'Точный план лечения на основе 3D КТ-обследования.',
      'svc.diagnostics.option': '3D КТ и консультация',

      'location.eyebrow': 'Адрес',
      'location.title': 'Найдите клинику',
      'location.lead': 'Нажмите «Построить маршрут» — на телефоне откроется Yandex Go, на компьютере — Яндекс Карты.',
      'location.mapTitle': 'Anvarbek Toshov — клиника на Яндекс Картах',
      'location.openYandex': 'Открыть в Яндекс Картах',
      'location.cardTitle': 'Клиника Anvarbek Toshov',
      'location.addressLabel': 'Адрес',
      'location.addressValue': 'Ташкент, Набережная Анхора, 57А',
      'location.hoursLabel': 'Часы работы',
      'location.hoursValue': 'Ежедневно 09:00 – 19:00, по предварительной записи',
      'location.phoneLabel': 'Телефон',
      'location.routeBtn': 'Построить маршрут',
      'location.routeHintDesktop': 'Откроются Яндекс Карты с маршрутом от вашего местоположения',
      'location.routeHintMobile': 'Откроется Yandex Go — клиника уже будет указана как точка назначения',

      'contact.eyebrow': 'Контакты',
      'contact.title': 'Запишитесь на приём',
      'contact.lead': 'Заполните форму — мы свяжемся с вами в ближайшее время.',
      'contact.infoTitle': 'Контактная информация',
      'contact.infoLead': 'Если у вас есть вопросы, свяжитесь с нами по одному из каналов ниже.',
      'contact.phoneLabel': 'Телефон',
      'contact.hoursLabel': 'Часы работы',
      'contact.hoursValue': 'Ежедневно 09:00 – 19:00',

      'form.success': 'Открывается Telegram — готовое сообщение подставится автоматически.',
      'form.nameLabel': 'Ваше имя',
      'form.namePlaceholder': 'Введите ваше имя',
      'form.nameError': 'Введите имя (минимум 2 символа).',
      'form.phoneLabel': 'Номер телефона',
      'form.phoneError': 'Введите полный номер телефона.',
      'form.serviceLabel': 'Какая услуга вас интересует?',
      'form.servicePlaceholder': 'Выберите услугу',
      'form.serviceError': 'Пожалуйста, выберите услугу.',
      'form.msgLabel': 'Сообщение (необязательно)',
      'form.msgPlaceholder': 'Напишите ваш вопрос или удобное время',
      'form.submit': 'Отправить заявку через Telegram',
      'form.note': 'При отправке ваши данные будут подготовлены в виде сообщения в Telegram.',

      'modal.eyebrow': 'Услуга',
      'modal.included': 'Что входит',
      'modal.book': 'Записаться на эту услугу',
      'modal.call': 'Позвонить',
      'modal.close': 'Закрыть',

      'quick.group': 'Быстрая связь',
      'quick.call': 'Звонок',
      'quick.book': 'Записаться',

      'footer.nav': 'Разделы сайта',
      'footer.rights': 'Все права защищены.',

      'tg.header': '🦷 Новая заявка на приём',
      'tg.name': '👤 Имя',
      'tg.phone': '📞 Телефон',
      'tg.service': '🦷 Услуга',
      'tg.message': '💬 Сообщение'
    },

    uz: {
      'meta.title': 'Dr. Anvarbek Toshov | Toshkentda stomatolog-implantolog',
      'meta.description': "Dr. Anvarbek Toshov — jarroh stomatolog-implantolog. 10 yillik tajriba, 6000+ o'rnatilgan implant, 1 kunda implantatsiya, umrbod kafolat. Bepul konsultatsiyaga yoziling.",
      'meta.ogDescription': '10 yillik tajriba · 6000+ implant · 1 kunda implantatsiya · umrbod kafolat',

      'brand.name': 'Dr. Anvarbek Toshov',
      'brand.role': 'Stomatolog-implantolog',
      'brand.logoAlt': 'Dental implant logotipi',

      'lang.group': 'Sayt tili',
      'nav.home': 'Bosh sahifa',
      'nav.doctor': 'Shifokor',
      'nav.services': 'Xizmatlar',
      'nav.location': 'Manzil',
      'nav.contact': "Bog'lanish",
      'nav.close': 'Menyuni yopish',
      'nav.menu': 'Menyu',
      'nav.menuTitle': 'Menyu',
      'cta.book': 'Yozilish',

      'hero.eyebrow': 'Jarroh stomatolog-implantolog',
      'hero.title': "Anvarbek Toshov — <span>sog'lom tabassum</span> ishonchli qo'llarda",
      'hero.lead': "10 yillik amaliy tajriba va 6000 dan ortiq muvaffaqiyatli o'rnatilgan implant. Har bir bemorga individual davolash rejasi va umrbod kafolat.",
      'hero.stat1': 'yillik tajriba',
      'hero.stat2': "o'rnatilgan implant",
      'hero.stat3': 'kunda implantatsiya',
      'hero.ctaConsult': 'Bepul konsultatsiya',
      'hero.ctaCall': "Qo'ng'iroq qilish",
      'hero.trustLine': "Har bir o'rnatilgan implantga umrbod kafolat",
      'hero.photoAlt': 'Dr. Anvarbek Toshov — jarroh stomatolog-implantolog',
      'hero.badgeTitle': 'Implantolog',
      'hero.badgeText': 'Individual yondashuv',
      'hero.fc1Title': '1 kunda',
      'hero.fc1Text': 'Implantatsiya',
      'hero.fc2Title': 'Umrbod',
      'hero.fc2Text': 'Kafolat',
      'hero.scroll': 'Pastga',

      'marquee.1': '1 kunda implantatsiya',
      'marquee.2': 'Umrbod kafolat',
      'marquee.3': '3D KT diagnostika',
      'marquee.4': '6000+ implant',
      'marquee.5': 'Protezlash',
      'marquee.6': 'Estetik stomatologiya',

      'about.eyebrow': 'Shifokor haqida',
      'about.title': "Tabassumingizni ishonib topshirsa bo'ladigan jarroh-implantolog",
      'about.lead': "Anvarbek Toshov — 10 yillik amaliyotga ega jarroh stomatolog-implantolog. 6000 dan ortiq o'rnatilgan implant, 1 kunda implantatsiya va har bir ishga umrbod kafolat.",
      'about.p1': "To'liq sikl: diagnostika → implantatsiya → protezlash",
      'about.p2': '3D KT asosida rejalashtirish — oldindan aniq natija',
      'about.p3': "Og'riqsiz — zamonaviy anesteziya ostida",
      'about.cta': 'Konsultatsiyaga yozilish',
      'about.insta': "Instagram'dagi ishlar",

      'trust.1Title': '10+ yil tajriba',
      'trust.1Text': 'Jarrohlik implantologiyasida',
      'trust.2Title': 'Zamonaviy diagnostika',
      'trust.2Text': 'Aniq 3D tekshiruv',
      'trust.3Title': 'Umrbod kafolat',
      'trust.3Text': "O'rnatilgan implantlarga",
      'trust.4Title': 'Individual reja',
      'trust.4Text': 'Har bir bemor uchun',

      'services.eyebrow': 'Xizmatlar',
      'services.title': "Asosiy yo'nalishlar",
      'services.lead': 'Diagnostikadan implantatsiyagacha — barcha zarur xizmatlar bir joyda.',
      'services.more': 'Batafsil',

      'svc.implant.title': 'Implantatsiya',
      'svc.implant.short': 'Zamonaviy implant tizimlari, umrbod kafolat bilan.',
      'svc.implant.option': 'Tishni ildizi bilan tiklash',
      'svc.prosthetics.title': 'Protezlash',
      'svc.prosthetics.short': "Qulay va tabiiy ko'rinishdagi tish protezlari (ko'prik).",
      'svc.prosthetics.option': "Koronka, ko'prik va protezlar",
      'svc.aesthetic.title': 'Estetik stomatologiya',
      'svc.aesthetic.short': 'Tish oqartirish va tabassumni yangilash.',
      'svc.aesthetic.option': 'Oqartirish, vinir, restavratsiya',
      'svc.diagnostics.title': 'Diagnostika',
      'svc.diagnostics.short': '3D KT tekshiruvi asosida aniq davolash rejasi.',
      'svc.diagnostics.option': '3D KT va konsultatsiya',

      'location.eyebrow': 'Manzil',
      'location.title': 'Klinikani toping',
      'location.lead': '«Marshrut qurish» tugmasini bosing — telefonda Yandex Go, kompyuterda Yandex Maps ochiladi.',
      'location.mapTitle': 'Anvarbek Toshov — Yandex Maps xaritasida klinika',
      'location.openYandex': "Yandex Maps'da ochish",
      'location.cardTitle': 'Anvarbek Toshov klinikasi',
      'location.addressLabel': 'Manzil',
      'location.addressValue': "Toshkent, Anhor bo'yi ko'chasi, 57A",
      'location.hoursLabel': 'Ish vaqti',
      'location.hoursValue': 'Har kuni 09:00 – 19:00, oldindan yozilish orqali',
      'location.phoneLabel': 'Telefon',
      'location.routeBtn': 'Marshrut qurish',
      'location.routeHintDesktop': "Yandex Maps sizning joylashuvingizdan marshrut bilan ochiladi",
      'location.routeHintMobile': "Yandex Go ochiladi — klinika manzil sifatida avtomatik qo'yiladi",

      'contact.eyebrow': "Bog'lanish",
      'contact.title': 'Qabulga yoziling',
      'contact.lead': "Formani to'ldiring — tez orada siz bilan bog'lanamiz.",
      'contact.infoTitle': "Aloqa ma'lumotlari",
      'contact.infoLead': "Savollaringiz bo'lsa, quyidagi kanallar orqali murojaat qiling.",
      'contact.phoneLabel': 'Telefon',
      'contact.hoursLabel': 'Ish vaqti',
      'contact.hoursValue': 'Har kuni 09:00 – 19:00',

      'form.success': 'Telegram ochilmoqda — tayyor xabar avtomatik joylanadi.',
      'form.nameLabel': 'Ismingiz',
      'form.namePlaceholder': 'Ismingizni kiriting',
      'form.nameError': 'Ismingizni kiriting (kamida 2 ta belgi).',
      'form.phoneLabel': 'Telefon raqam',
      'form.phoneError': "To'liq telefon raqamini kiriting.",
      'form.serviceLabel': 'Qaysi xizmat sizni qiziqtiradi?',
      'form.servicePlaceholder': 'Xizmatni tanlang',
      'form.serviceError': 'Iltimos, xizmatni tanlang.',
      'form.msgLabel': 'Xabar (ixtiyoriy)',
      'form.msgPlaceholder': 'Savolingiz yoki qulay vaqtingizni yozing',
      'form.submit': "Telegram orqali so'rov yuborish",
      'form.note': "Yuborish tugmasi orqali ma'lumotlaringiz Telegram xabari sifatida tayyorlanadi.",

      'modal.eyebrow': 'Xizmat',
      'modal.included': 'Nimalar kiradi',
      'modal.book': 'Shu xizmatga yozilish',
      'modal.call': "Qo'ng'iroq qilish",
      'modal.close': 'Yopish',

      'quick.group': 'Tezkor aloqa',
      'quick.call': "Qo'ng'iroq",
      'quick.book': 'Yozilish',

      'footer.nav': "Sayt bo'limlari",
      'footer.rights': 'Barcha huquqlar himoyalangan.',

      'tg.header': "🦷 Yangi qabul so'rovi",
      'tg.name': '👤 Ism',
      'tg.phone': '📞 Telefon',
      'tg.service': '🦷 Xizmat',
      'tg.message': '💬 Xabar'
    }
  };

  /* Chip icons for the service modal */
  const CHIP_ICONS = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    shield: '<path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
    drop: '<path d="M12 3s6 6.3 6 10a6 6 0 01-12 0c0-3.7 6-10 6-10z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    tooth: '<path d="M8 3.5C5.4 3.5 4 5.3 4 8.4c0 3.4 1.6 7.8 3.2 10.2.8 1.3 2.2.9 2.6-.5l.9-2.9c.3-.9 1.3-.9 1.6 0l.9 2.9c.4 1.4 1.8 1.8 2.6.5C17.4 16.2 19 11.8 19 8.4c0-3.1-1.4-4.9-4-4.9-1.7 0-2.3 1.1-3.2 1.1S9.7 3.5 8 3.5Z"/>',
    spark: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    gift: '<rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 13h18M12 9v11"/><path d="M12 9C10.6 5.4 6.3 5.9 6.8 8.2 7.1 9.9 12 9 12 9zm0 0c1.4-3.6 5.7-3.1 5.2-.8C16.9 9.9 12 9 12 9z"/>',
    scan: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M9 21h6M12 17v4"/><path d="M8.5 8.5h7M8.5 12h4"/>'
  };

  /* Service details — "Подробнее / Batafsil" modal */
  const SERVICE_DETAILS = {
    ru: {
      implant: {
        title: 'Имплантация',
        lead: 'Самый надёжный способ восстановить утраченный зуб вместе с корнем. Титановый имплант устанавливается в кость и создаёт прочную основу — как собственный зуб.',
        points: [
          'Планирование по 3D КТ: объём кости и расположение нервных каналов',
          'Сертифицированные имплант-системы',
          'Безболезненно — под современной местной анестезией',
          'Возможна имплантация с установкой временной коронки',
          'Пожизненная гарантия на установленный имплант'
        ],
        chips: [['clock', '40–60 минут'], ['shield', 'Пожизненная гарантия'], ['drop', 'Местная анестезия']]
      },
      prosthetics: {
        title: 'Протезирование',
        lead: 'Если отсутствует несколько зубов или зуб сильно разрушен — коронки, мосты и протезы возвращают жевательную функцию и эстетику улыбки.',
        points: [
          'Циркониевые и металлокерамические коронки',
          'Мостовидные протезы',
          'Съёмные и частично съёмные протезы',
          'Протезы с опорой на импланты',
          'Цвет и форма подбираются под ваши естественные зубы'
        ],
        chips: [['calendar', '2–3 визита'], ['shield', 'С гарантией'], ['tooth', 'Естественный вид']]
      },
      aesthetic: {
        title: 'Эстетическая стоматология',
        lead: 'Делаем улыбку более привлекательной: профессиональная гигиена, безопасное отбеливание, виниры и композитная реставрация.',
        points: [
          'Профессиональная гигиена и снятие зубного камня',
          'Безопасное отбеливание зубов',
          'Виниры и люминиры',
          'Композитная реставрация сколов и трещин',
          'Дизайн улыбки — результат виден заранее'
        ],
        chips: [['calendar', '1–2 визита'], ['spark', 'Заметный результат'], ['tooth', 'Бережно к эмали']]
      },
      diagnostics: {
        title: 'Диагностика и консультация',
        lead: 'Любое лечение начинается с точного диагноза. 3D компьютерная томография показывает объём кости, состояние корней и нервные каналы.',
        points: [
          '3D КТ и панорамный снимок',
          'Оценка объёма и плотности костной ткани',
          'Индивидуальный план лечения и предварительная стоимость',
          'Ответы врача на все ваши вопросы',
          'Первичная консультация — бесплатно'
        ],
        chips: [['clock', '20–30 минут'], ['gift', 'Первая консультация бесплатно'], ['scan', '3D КТ']]
      }
    },
    uz: {
      implant: {
        title: 'Implantatsiya',
        lead: "Yo'qolgan tishni ildizi bilan tiklashning eng ishonchli usuli. Titan implant suyakka o'rnatiladi va o'z tishingizdek mustahkam asos hosil qiladi.",
        points: [
          '3D KT asosida rejalashtirish: suyak hajmi va nerv kanallari',
          'Sertifikatlangan implant tizimlari',
          "Og'riqsiz — zamonaviy mahalliy anesteziya ostida",
          'Vaqtinchalik koronka bilan implantatsiya imkoniyati',
          "O'rnatilgan implantga umrbod kafolat"
        ],
        chips: [['clock', '40–60 daqiqa'], ['shield', 'Umrbod kafolat'], ['drop', 'Mahalliy anesteziya']]
      },
      prosthetics: {
        title: 'Protezlash',
        lead: "Bir nechta tish yetishmasa yoki tish qattiq shikastlangan bo'lsa — koronka, ko'prik va protezlar chaynash funksiyasi va tabassum estetikasini tiklaydi.",
        points: [
          'Sirkoniy va metall-keramika koronkalar',
          "Ko'prikli protezlar",
          'Olinadigan va qisman olinadigan protezlar',
          'Implantga tayanadigan protezlar',
          'Rang va shakl tabiiy tishlaringizga moslashtiriladi'
        ],
        chips: [['calendar', '2–3 tashrif'], ['shield', 'Kafolat bilan'], ['tooth', "Tabiiy ko'rinish"]]
      },
      aesthetic: {
        title: 'Estetik stomatologiya',
        lead: 'Tabassumingizni yanada jozibali qilamiz: professional gigiena, xavfsiz oqartirish, vinirlar va kompozit restavratsiya.',
        points: [
          'Professional gigiena va tish toshini tozalash',
          'Xavfsiz tish oqartirish',
          'Vinir va lyuminirlar',
          'Sinish va yoriqlarni kompozit restavratsiya qilish',
          "Tabassum dizayni — natijani oldindan ko'rish"
        ],
        chips: [['calendar', '1–2 tashrif'], ['spark', 'Seziladigan natija'], ['tooth', 'Emalga ehtiyotkor']]
      },
      diagnostics: {
        title: 'Diagnostika va konsultatsiya',
        lead: "Har qanday davolash aniq tashxisdan boshlanadi. 3D kompyuter tomografiya suyak hajmini, ildizlar holatini va nerv kanallarini aniq ko'rsatadi.",
        points: [
          '3D KT va panoramik tasvir',
          'Suyak hajmi va zichligini baholash',
          'Individual davolash rejasi va taxminiy narx',
          'Barcha savollaringizga shifokor javobi',
          'Birinchi konsultatsiya — bepul'
        ],
        chips: [['clock', '20–30 daqiqa'], ['gift', 'Birinchi konsultatsiya bepul'], ['scan', '3D KT']]
      }
    }
  };

  const t = (key, lang) => I18N[lang]?.[key] ?? I18N[DEFAULT_LANG][key] ?? key;

  const readStoredLang = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return LANGS.includes(saved) ? saved : DEFAULT_LANG;
    } catch { return DEFAULT_LANG; }
  };
  const storeLang = (lang) => { try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* private mode */ } };

  /* ------------------------------------------------------------------
     Device detection for the route button
     ------------------------------------------------------------------ */
  const isMobileDevice = () => {
    const ua = navigator.userAgent || '';
    if (/Android|iPhone|iPod|Windows Phone|IEMobile|Mobile/i.test(ua)) return true;
    // iPadOS 13+ reports itself as Macintosh but has a multi-touch screen
    if (/iPad|Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
    return matchMedia('(pointer: coarse)').matches && !matchMedia('(pointer: fine)').matches && innerWidth < 1024;
  };

  const buildRouteUrl = (lang, mobile) => {
    if (mobile) {
      // Yandex Go: opens the app with the clinic as destination; store page if not installed
      return 'https://3.redirect.appmetrica.yandex.com/route'
        + `?end-lat=${ORG.lat}&end-lon=${ORG.lon}`
        + `&ref=${ORG.ref}&appmetrica_tracking_id=${YANDEX_GO_TRACKING_ID}&lang=${lang}`;
    }
    // Yandex Maps: route from the user's location (~) to the clinic organisation
    return 'https://yandex.uz/maps/'
      + `?mode=routes&rtext=~${ORG.lat}%2C${ORG.lon}&rtt=auto`
      + `&ruri=~${encodeURIComponent('ymapsbm1://org?oid=' + ORG.oid)}`;
  };
  const buildMapSrc = (lang) =>
    'https://yandex.uz/map-widget/v1/'
    + `?oid=${ORG.oid}&ol=biz&mode=search&ll=${ORG.lon}%2C${ORG.lat}&z=17`
    + `&lang=${lang === 'uz' ? 'uz_UZ' : 'ru_RU'}`;
  const ORG_PAGE_URL = `https://yandex.uz/maps/org/${ORG.slug}/${ORG.oid}/`;

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  const init = () => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = matchMedia('(pointer: fine)').matches;
    const mobile = isMobileDevice();
    const hasGsap = !!(window.gsap && window.ScrollTrigger) && !reduce;
    document.documentElement.classList.add(hasGsap ? 'has-gsap' : 'no-gsap');
    document.documentElement.dataset.device = mobile ? 'mobile' : 'desktop';

    let currentLang = readStoredLang();

    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    /* ---------- Hero title: split into words for the intro ---------- */
    const heroTitle = $('#hero-title');
    const splitHeroTitle = () => {
      if (!heroTitle) return;
      const nodes = [...heroTitle.childNodes];
      heroTitle.textContent = '';
      const appendWords = (text, parent) => {
        text.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { parent.append(' '); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('i');
          inner.textContent = part;
          w.append(inner);
          parent.append(w);
        });
      };
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) appendWords(node.textContent, heroTitle);
        else if (node.nodeType === Node.ELEMENT_NODE) {
          const accent = document.createElement('span');
          accent.className = 'accent';
          appendWords(node.textContent, accent);
          heroTitle.append(accent);
        }
      });
    };

    /* ---------- Route button + map (device aware) ---------- */
    const routeBtn = $('#route-btn');
    const routeHintText = $('#route-hint-text');
    const mapCard = $('.map-card');
    const mapFrame = $('#yandex-map');
    const mapOpenLink = $('#map-open-link');
    if (routeHintText) routeHintText.dataset.i18n = mobile ? 'location.routeHintMobile' : 'location.routeHintDesktop';
    if (mapOpenLink) mapOpenLink.href = ORG_PAGE_URL;

    const syncRoute = (lang) => {
      if (routeBtn) {
        routeBtn.href = buildRouteUrl(lang, mobile);
        routeBtn.dataset.app = mobile ? 'yandex-go' : 'yandex-maps';
      }
      if (mapFrame) {
        const src = buildMapSrc(lang);
        if (mapFrame.getAttribute('src') !== src) {
          mapCard?.classList.remove('is-loaded');
          mapFrame.setAttribute('src', src);
        }
      }
    };
    if (mapFrame && mapCard) {
      mapFrame.addEventListener('load', () => mapCard.classList.add('is-loaded'));
      // If the widget is blocked/slow, drop the skeleton anyway so the card is usable
      setTimeout(() => mapCard.classList.add('is-loaded'), 9000);
    }

    /* ---------- i18n ---------- */
    const langSwitch = $('#lang-switch');
    const langButtons = $$('.lang-btn', langSwitch);

    const applyLang = (lang) => {
      currentLang = LANGS.includes(lang) ? lang : DEFAULT_LANG;
      document.documentElement.lang = currentLang;
      document.documentElement.dataset.lang = currentLang;

      $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n, currentLang); });
      $$('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml, currentLang); });
      $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder, currentLang); });
      $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria, currentLang)); });
      $$('[data-i18n-title]').forEach(el => { el.setAttribute('title', t(el.dataset.i18nTitle, currentLang)); });
      $$('[data-i18n-alt]').forEach(el => { el.setAttribute('alt', t(el.dataset.i18nAlt, currentLang)); });
      $$('[data-i18n-content]').forEach(el => { el.setAttribute('content', t(el.dataset.i18nContent, currentLang)); });

      document.title = t('meta.title', currentLang);
      document.documentElement.style.setProperty('--menu-label', `"${t('nav.menuTitle', currentLang)}"`);
      $('meta[property="og:locale"]')?.setAttribute('content', currentLang === 'uz' ? 'uz_UZ' : 'ru_RU');

      splitHeroTitle();
      syncRoute(currentLang);
      syncSelectedService();
      if (modal?.classList.contains('is-open') && openServiceKey) renderModal(openServiceKey);

      langButtons.forEach(btn => {
        const active = btn.dataset.lang === currentLang;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      langSwitch?.style.setProperty('--lang-index', String(LANGS.indexOf(currentLang)));
    };

    langButtons.forEach(btn => btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      storeLang(lang);
      applyLang(lang);
    }));

    /* ---------- Header, scroll progress, scrollspy ---------- */
    const header = $('#site-header');
    const progress = $('#scroll-progress');
    const onScroll = () => {
      const y = window.scrollY || 0;
      header?.classList.toggle('scrolled', y > 24);
      if (progress) {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.width = `${max > 0 ? Math.min(100, (y / max) * 100) : 0}%`;
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const navLinks = $$('.main-nav .nav-link');
    const sections = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
      const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
      sections.forEach(s => spy.observe(s));
    }

    /* ---------- Mobile drawer ---------- */
    const nav = $('#main-nav');
    const toggle = $('#nav-toggle');
    const close = $('#mobile-close');
    const setNav = (open) => {
      nav?.classList.toggle('mobile-open', open);
      document.body.classList.toggle('nav-locked', open);
      toggle?.setAttribute('aria-expanded', String(open));
      if (open) close?.focus({ preventScroll: true });
      else if (document.activeElement && nav?.contains(document.activeElement)) toggle?.focus({ preventScroll: true });
    };
    toggle?.addEventListener('click', () => setNav(!nav?.classList.contains('mobile-open')));
    close?.addEventListener('click', () => setNav(false));
    $$('a', nav).forEach(a => a.addEventListener('click', () => setNav(false)));
    document.addEventListener('click', e => {
      if (!nav?.classList.contains('mobile-open')) return;
      if (nav.contains(e.target) || toggle?.contains(e.target)) return;
      setNav(false);
    });
    matchMedia('(min-width: 981px)').addEventListener?.('change', e => { if (e.matches) setNav(false); });

    /* ---------- Smooth anchors with header offset ---------- */
    const scrollToTarget = (target) => {
      const offset = (header?.offsetHeight || 76) + 12;
      const top = target.getBoundingClientRect().top + scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
    };
    $$('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState?.(null, '', id);
    }));

    /* ---------- Service modal ---------- */
    const modal = $('#service-modal');
    const modalIcon = $('#sm-icon');
    const modalTitle = $('#sm-title');
    const modalLead = $('#sm-lead');
    const modalList = $('#sm-list');
    const modalChips = $('#sm-chips');
    const modalBook = $('#sm-book');
    const modalDialog = $('.sm-dialog', modal);
    let openServiceKey = null;
    let lastFocused = null;

    const renderModal = (key) => {
      const data = SERVICE_DETAILS[currentLang]?.[key] || SERVICE_DETAILS[DEFAULT_LANG][key];
      if (!data) return;
      modalTitle.textContent = data.title;
      modalLead.textContent = data.lead;

      modalList.innerHTML = '';
      data.points.forEach(point => {
        const li = document.createElement('li');
        li.innerHTML = '<svg class="sm-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
        li.append(document.createTextNode(point));
        modalList.append(li);
      });

      modalChips.innerHTML = '';
      data.chips.forEach(([icon, label]) => {
        const span = document.createElement('span');
        span.className = 'sm-chip';
        span.innerHTML = `<svg class="sm-chip-icon" viewBox="0 0 24 24" aria-hidden="true">${CHIP_ICONS[icon] || CHIP_ICONS.clock}</svg>`;
        span.append(document.createTextNode(label));
        modalChips.append(span);
      });

      const cardSvg = $(`.service-card[data-service="${key}"] .service-svg`);
      modalIcon.innerHTML = '';
      if (cardSvg) modalIcon.append(cardSvg.cloneNode(true));
    };

    const openModal = (key, trigger) => {
      if (!modal || !SERVICE_DETAILS[DEFAULT_LANG][key]) return;
      openServiceKey = key;
      lastFocused = trigger || document.activeElement;
      renderModal(key);
      if (modalDialog) modalDialog.scrollTop = 0;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-locked');
      requestAnimationFrame(() => $('.sm-close', modal)?.focus({ preventScroll: true }));
    };

    const closeModal = () => {
      if (!modal?.classList.contains('is-open')) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-locked');
      openServiceKey = null;
      lastFocused?.focus?.({ preventScroll: true });
    };

    $$('[data-open-service]').forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.openService, btn);
    }));
    $$('.service-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.service, $('.service-link', card)));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.service, card); }
      });
    });
    $$('[data-modal-close]', modal).forEach(el => el.addEventListener('click', closeModal));

    modal?.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusables = $$('button, a[href], [tabindex]:not([tabindex="-1"])', modal).filter(el => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    modalBook?.addEventListener('click', () => {
      const key = openServiceKey;
      closeModal();
      if (key) selectService(key);
      const contact = $('#contact');
      if (contact) setTimeout(() => scrollToTarget(contact), 120);
    });

    /* ---------- Custom service select ---------- */
    const selectWrap = $('#service-select');
    const selectTrigger = $('#service-trigger');
    const selectList = $('#service-list');
    const selectValue = $('#service-value');
    const serviceInput = $('#f-service');
    const serviceError = $('#service-error');
    const options = $$('.select-option', selectList);

    const serviceLabel = (key) => t(`svc.${key}.title`, currentLang);

    function syncSelectedService() {
      const key = serviceInput?.value;
      if (!selectValue) return;
      if (key) {
        selectValue.textContent = serviceLabel(key);
        selectValue.classList.remove('is-placeholder');
      } else {
        selectValue.textContent = t('form.servicePlaceholder', currentLang);
        selectValue.classList.add('is-placeholder');
      }
    }

    const setSelectOpen = (open) => {
      selectWrap?.classList.toggle('is-open', open);
      selectTrigger?.setAttribute('aria-expanded', String(open));
      if (open) {
        const active = options.find(o => o.dataset.value === serviceInput.value) || options[0];
        active?.focus({ preventScroll: true });
      }
    };

    function selectService(key) {
      if (!serviceInput) return;
      serviceInput.value = key;
      options.forEach(o => {
        const on = o.dataset.value === key;
        o.classList.toggle('is-selected', on);
        o.setAttribute('aria-selected', String(on));
      });
      syncSelectedService();
      selectWrap?.classList.remove('has-error');
      serviceError?.classList.remove('show');
    }

    options.forEach(opt => {
      opt.tabIndex = -1;
      opt.addEventListener('click', () => {
        selectService(opt.dataset.value);
        setSelectOpen(false);
        selectTrigger?.focus({ preventScroll: true });
      });
      opt.addEventListener('keydown', e => {
        const i = options.indexOf(opt);
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); opt.click(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); options[(i + 1) % options.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); options[(i - 1 + options.length) % options.length].focus(); }
        else if (e.key === 'Escape') { e.preventDefault(); setSelectOpen(false); selectTrigger?.focus(); }
        else if (e.key === 'Tab') { setSelectOpen(false); }
      });
    });
    selectTrigger?.addEventListener('click', () => setSelectOpen(!selectWrap.classList.contains('is-open')));
    selectTrigger?.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectOpen(true); }
    });
    document.addEventListener('click', e => {
      if (selectWrap && !selectWrap.contains(e.target)) setSelectOpen(false);
    });

    /* ---------- Escape: modal → select → drawer ---------- */
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (modal?.classList.contains('is-open')) closeModal();
      else if (selectWrap?.classList.contains('is-open')) { setSelectOpen(false); selectTrigger?.focus(); }
      else if (nav?.classList.contains('mobile-open')) setNav(false);
    });

    /* ---------- Phone formatting ---------- */
    const phone = $('#f-phone');
    phone?.addEventListener('input', () => {
      let digits = phone.value.replace(/\D/g, '');
      if (digits.startsWith('998')) digits = digits.slice(3);
      digits = digits.slice(0, 9);
      const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean);
      phone.value = '+998' + (parts.length ? ' ' + parts.join(' ') : '');
    });
    phone?.addEventListener('focus', () => { if (!phone.value) phone.value = '+998 '; });
    phone?.addEventListener('blur', () => { if (phone.value.replace(/\D/g, '') === '998') phone.value = ''; });

    /* ---------- Booking form → Telegram ---------- */
    const form = $('#booking-form');
    const success = $('#form-success');
    const fieldName = $('#field-name');
    const fieldPhone = $('#field-phone');
    const nameInput = $('#f-name');
    nameInput?.addEventListener('input', () => fieldName?.classList.remove('has-error'));
    phone?.addEventListener('input', () => fieldPhone?.classList.remove('has-error'));

    form?.addEventListener('submit', e => {
      e.preventDefault();
      const name = nameInput?.value.trim() || '';
      const phoneValue = phone?.value.trim() || '';
      const serviceKey = serviceInput?.value;
      const msg = $('#f-msg')?.value.trim();

      let firstBad = null;
      if (name.length < 2) { fieldName?.classList.add('has-error'); firstBad = firstBad || nameInput; }
      if (phoneValue.replace(/\D/g, '').length < 12) { fieldPhone?.classList.add('has-error'); firstBad = firstBad || phone; }
      if (!serviceKey) {
        selectWrap?.classList.add('has-error');
        serviceError?.classList.add('show');
        firstBad = firstBad || selectTrigger;
      }
      if (firstBad) { firstBad.focus({ preventScroll: false }); return; }

      const message = [
        t('tg.header', currentLang),
        '',
        `${t('tg.name', currentLang)}: ${name}`,
        `${t('tg.phone', currentLang)}: ${phoneValue}`,
        `${t('tg.service', currentLang)}: ${serviceLabel(serviceKey)}`,
        `${t('tg.message', currentLang)}: ${msg || '—'}`
      ].join('\n');
      const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
      success?.classList.add('show');
      setTimeout(() => { window.location.href = telegramUrl; }, 250);
    });

    /* ---------- Pointer spotlight / tilt / magnetic (desktop only) ---------- */
    if (!reduce && finePointer) {
      $$('.service-card, .trust-card').forEach(card => {
        card.addEventListener('pointermove', e => {
          const r = card.getBoundingClientRect();
          const x = e.clientX - r.left;
          const y = e.clientY - r.top;
          card.style.setProperty('--mx', `${x}px`);
          card.style.setProperty('--my', `${y}px`);
          if (card.classList.contains('service-card')) {
            const rx = ((y / r.height) - .5) * -7;
            const ry = ((x / r.width) - .5) * 7;
            card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
            card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
          }
        });
        card.addEventListener('pointerleave', () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      });

      if (window.gsap) {
        $$('.btn-magnetic').forEach(btn => {
          const strength = 0.28;
          btn.addEventListener('pointermove', e => {
            const r = btn.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            gsap.to(btn, { x: dx * strength, y: dy * strength, duration: .4, ease: 'power3.out', overwrite: 'auto' });
          });
          btn.addEventListener('pointerleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1, .45)', overwrite: 'auto' });
          });
        });
      }
    }

    /* ---------- First render ---------- */
    applyLang(currentLang);

    /* ---------- GSAP: intro + scroll animations ---------- */
    let intro = null;
    let introPlayed = false;

    const runCounters = () => {
      $$('[data-count]').forEach(el => {
        const target = Number(el.dataset.count) || 0;
        const suffix = el.dataset.suffix || '';
        if (!hasGsap) { el.textContent = target + suffix; return; }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: target > 100 ? 2 : 1.2, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.v) + suffix; },
          onComplete: () => { el.textContent = target + suffix; }
        });
      });
    };

    if (hasGsap) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: 'power3.out' });

      // Intro (paused until the preloader hides)
      intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: .9 } });
      intro
        .from('.hero-eyebrow', { y: 18, opacity: 0, duration: .6 })
        .from('#hero-title .w > i', { yPercent: 115, duration: .95, stagger: .045, ease: 'power4.out' }, '-=.35')
        .from('.hero-copy .lead', { y: 22, opacity: 0, duration: .7 }, '-=.6')
        .from('.hero-stat', { y: 22, opacity: 0, duration: .6, stagger: .08 }, '-=.5')
        .add(runCounters, '-=.45')
        .from('.hero-cta .btn', { y: 18, opacity: 0, duration: .6, stagger: .1, clearProps: 'transform' }, '-=.45')
        .from('.hero-trust-line', { opacity: 0, y: 10, duration: .6 }, '-=.35')
        .from('.hero-frame', { scale: .9, opacity: 0, y: 34, duration: 1.25, ease: 'power4.out' }, .3)
        .from('.floating-card', { scale: .6, opacity: 0, duration: .75, ease: 'back.out(1.8)', stagger: .15 }, '-=.7')
        .from('.scroll-hint', { opacity: 0, y: 8, duration: .6 }, '-=.5')
        .add(() => {
          gsap.to('.fc-1', { y: -14, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to('.fc-2', { y: -10, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: .5 });
        }, '-=.4');

      // Ambient orbs
      gsap.utils.toArray('.orb').forEach((orb, i) => {
        gsap.to(orb, {
          x: 'random(-70, 70)', y: 'random(-60, 60)', scale: 'random(0.9, 1.15)',
          duration: 'random(7, 11)', repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut', delay: i * .35
        });
      });

      // Hero parallax
      gsap.to('.hero-visual', { yPercent: 9, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-copy', { yPercent: 5, opacity: .35, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } });

      // Section reveals
      gsap.utils.toArray('[data-reveal]').forEach(el => {
        gsap.from(el, {
          y: 44, opacity: 0, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      gsap.utils.toArray('[data-stagger]').forEach(group => {
        gsap.from(group.children, {
          y: 40, opacity: 0, duration: .9, stagger: .11, ease: 'power3.out', clearProps: 'transform,opacity',
          scrollTrigger: { trigger: group, start: 'top 84%', once: true }
        });
      });

      // Section headings: eyebrow dot pop
      gsap.utils.toArray('.section-head .eyebrow-dot, .about-copy .eyebrow-dot').forEach(dot => {
        gsap.from(dot, { scale: 0, duration: .6, ease: 'back.out(2.5)', scrollTrigger: { trigger: dot, start: 'top 90%', once: true } });
      });

      addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    } else {
      runCounters();
    }

    /* ---------- Preloader ---------- */
    const preloader = $('#preloader');
    const finishLoading = () => {
      if (introPlayed) return;
      introPlayed = true;
      preloader?.classList.add('hide');
      preloader?.setAttribute('aria-hidden', 'true');
      if (intro) intro.play();
      setTimeout(() => preloader?.remove(), 900);
    };
    if (document.readyState === 'complete') setTimeout(finishLoading, 350);
    else addEventListener('load', () => setTimeout(finishLoading, 300), { once: true });
    setTimeout(finishLoading, 2800); // never keep visitors waiting on a slow font/CDN
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
