// Dr. Anvarbek Toshov — premium UI interactions + RU/UZ i18n
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  /* ==========================================================
     Translations — saytga kirilganda birinchi rus tili ochiladi
     ========================================================== */
  const DEFAULT_LANG = 'ru';
  const LANGS = ['ru', 'uz'];
  const STORAGE_KEY = 'at-lang';

  const I18N = {
    ru: {
      'meta.title': 'Др. Анварбек Тошов | Стоматолог-имплантолог',
      'meta.description': 'Др. Анварбек Тошов — стоматолог-имплантолог. 10 лет опыта, 6000+ установленных имплантов, пожизненная гарантия. Запишитесь на бесплатную консультацию.',
      'meta.ogDescription': '10 лет опыта · 6000+ имплантов · пожизненная гарантия',

      'brand.name': 'Др. Анварбек Тошов',
      'brand.role': 'Стоматолог-имплантолог',
      'brand.logoAlt': 'Логотип дентального импланта',

      'lang.group': 'Язык сайта',
      'nav.home': 'Главная',
      'nav.doctor': 'Врач',
      'nav.services': 'Услуги',
      'nav.location': 'Адрес',
      'nav.contact': 'Контакты',
      'nav.close': 'Закрыть',
      'nav.menu': 'Меню',
      'nav.menuTitle': 'Меню',
      'cta.book': 'Записаться на приём',

      'hero.eyebrow': 'Стоматолог-имплантолог',
      'hero.title': 'Анварбек Тошов — <span>здоровая улыбка</span> в надёжных руках',
      'hero.lead': '10 лет практического опыта и более 6000 успешно установленных имплантов. Индивидуальный план лечения и пожизненная гарантия для каждого пациента.',
      'hero.stat1': '10+ лет опыта',
      'hero.stat2': '6000+ имплантов',
      'hero.stat3': 'Пожизненная гарантия',
      'hero.ctaConsult': 'Бесплатная консультация',
      'hero.ctaCall': 'Позвонить',
      'hero.photoAlt': 'Др. Анварбек Тошов',
      'hero.badgeTitle': 'Имплантолог',
      'hero.badgeText': 'Индивидуальный подход',
      'hero.fc1Title': 'За 1 день',
      'hero.fc1Text': 'Имплантация',
      'hero.fc2Title': 'Пожизненная',
      'hero.fc2Text': 'Гарантия',

      'trust.1Title': '10+ лет опыта',
      'trust.1Text': 'В области имплантологии',
      'trust.2Title': 'Современная диагностика',
      'trust.2Text': 'Точное 3D-обследование',
      'trust.3Title': 'Пожизненная гарантия',
      'trust.3Text': 'На установленные импланты',
      'trust.4Title': 'Индивидуальный план',
      'trust.4Text': 'Для каждого пациента',

      'services.eyebrow': 'Услуги',
      'services.title': 'Основные направления',
      'services.lead': 'От диагностики до имплантации — все необходимые услуги.',
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
      'location.lead': 'Удобное расположение — посмотрите маршрут на карте или сохраните адрес.',
      'location.mapTitle': 'Адрес клиники — карта',
      'location.cardTitle': 'Адрес приёма',
      'location.addressLabel': 'Адрес',
      'location.hoursLabel': 'Часы работы',
      'location.hoursValue': 'По предварительной записи',
      'location.routeBtn': 'Открыть маршрут',

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
      'form.phoneLabel': 'Номер телефона',
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

      'footer.rights': 'Все права защищены.',

      'tg.header': '🦷 Новая заявка на приём',
      'tg.name': '👤 Имя',
      'tg.phone': '📞 Телефон',
      'tg.service': '🦷 Услуга',
      'tg.message': '💬 Сообщение'
    },

    uz: {
      'meta.title': "Dr. Anvarbek Toshov | Stomatolog-implantolog",
      'meta.description': "Dr. Anvarbek Toshov — stomatolog-implantolog. 10 yillik tajriba, 6000+ o'rnatilgan implant, umrbod kafolat. Bepul konsultatsiyaga yoziling.",
      'meta.ogDescription': "10 yillik tajriba · 6000+ implant · Umrbod kafolat",

      'brand.name': 'Dr. Anvarbek Toshov',
      'brand.role': 'Stomatolog-implantolog',
      'brand.logoAlt': 'Dental implant logotipi',

      'lang.group': 'Sayt tili',
      'nav.home': 'Bosh sahifa',
      'nav.doctor': 'Shifokor',
      'nav.services': 'Xizmatlar',
      'nav.location': 'Manzil',
      'nav.contact': "Bog'lanish",
      'nav.close': 'Yopish',
      'nav.menu': 'Menyu',
      'nav.menuTitle': 'Menyu',
      'cta.book': 'Qabulga yozilish',

      'hero.eyebrow': 'Stomatolog-implantolog',
      'hero.title': "Anvarbek Toshov — <span>sog'lom tabassum</span> ishonchli qo'lda",
      'hero.lead': "10 yillik amaliy tajriba va 6000 dan ortiq muvaffaqiyatli o'rnatilgan implant. Har bir bemorga individual davolash rejasi va umrbod kafolat.",
      'hero.stat1': '10+ yil tajriba',
      'hero.stat2': '6000+ implant',
      'hero.stat3': 'Umrbod kafolat',
      'hero.ctaConsult': 'Bepul konsultatsiya',
      'hero.ctaCall': "Qo'ng'iroq qilish",
      'hero.photoAlt': 'Dr. Anvarbek Toshov',
      'hero.badgeTitle': 'Implantolog',
      'hero.badgeText': 'Individual yondashuv',
      'hero.fc1Title': '1 kunda',
      'hero.fc1Text': 'Implantatsiya',
      'hero.fc2Title': 'Umrbod',
      'hero.fc2Text': 'Kafolat',

      'trust.1Title': '10+ yil tajriba',
      'trust.1Text': 'Implantologiya sohasida',
      'trust.2Title': 'Zamonaviy diagnostika',
      'trust.2Text': 'Aniq 3D tekshiruv',
      'trust.3Title': 'Umrbod kafolat',
      'trust.3Text': "O'rnatilgan implantlarga",
      'trust.4Title': 'Individual reja',
      'trust.4Text': 'Har bir bemor uchun',

      'services.eyebrow': 'Xizmatlar',
      'services.title': "Asosiy yo'nalishlar",
      'services.lead': 'Diagnostikadan implantatsiyagacha — barcha zarur xizmatlar.',
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
      'location.lead': "Qulay joylashuv — xaritadan yo'nalishni ko'ring yoki manzilni saqlab qo'ying.",
      'location.mapTitle': 'Klinika manzili — xarita',
      'location.cardTitle': 'Qabulxona manzili',
      'location.addressLabel': 'Manzil',
      'location.hoursLabel': 'Ish vaqti',
      'location.hoursValue': 'Oldindan yozilish orqali',
      'location.routeBtn': "Yo'nalishni ochish",

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
      'form.phoneLabel': 'Telefon raqam',
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
      'quick.book': 'Qabulga yozilish',

      'footer.rights': 'Barcha huquqlar himoyalangan.',

      'tg.header': "🦷 Yangi qabul so'rovi",
      'tg.name': '👤 Ism',
      'tg.phone': '📞 Telefon',
      'tg.service': '🦷 Xizmat',
      'tg.message': '💬 Xabar'
    }
  };

  /* Modal chiplari uchun ikonkalar */
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

  /* Xizmatlar bo'yicha batafsil ma'lumot — "Batafsil" tugmasi shuni ochadi */
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
          "3D KT asosida rejalashtirish: suyak hajmi va nerv kanallari",
          'Sertifikatlangan implant tizimlari',
          "Og'riqsiz — zamonaviy mahalliy anesteziya ostida",
          "Vaqtinchalik koronka bilan implantatsiya imkoniyati",
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
          "Olinadigan va qisman olinadigan protezlar",
          'Implantga tayanadigan protezlar',
          "Rang va shakl tabiiy tishlaringizga moslashtiriladi"
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
          'Tabassum dizayni — natijani oldindan ko‘rish'
        ],
        chips: [['calendar', '1–2 tashrif'], ['spark', 'Seziladigan natija'], ['tooth', 'Emalga ehtiyot']]
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

  let currentLang = readStoredLang();

  document.addEventListener('DOMContentLoaded', () => {
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- i18n: matnlarni almashtirish ---------- */
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

      // Tanlangan xizmat nomini yangilash
      syncSelectedService();
      // Ochiq modal bo'lsa — uni ham yangilash
      if (modal?.classList.contains('is-open') && openServiceKey) renderModal(openServiceKey);

      langButtons.forEach(btn => {
        const active = btn.dataset.lang === currentLang;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      langSwitch?.style.setProperty('--lang-index', String(LANGS.indexOf(currentLang)));
    };

    const langSwitch = $('#lang-switch');
    const langButtons = $$('.lang-btn', langSwitch);
    langButtons.forEach(btn => btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      storeLang(lang);
      applyLang(lang);
    }));

    // Header + scroll progress
    const header = $('#site-header');
    const progress = $('#scroll-progress');
    const onScroll = () => {
      const y = window.scrollY || 0;
      header?.classList.toggle('scrolled', y > 18);
      if (progress) {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile navigation — drawer, backdrop, focus-safe body lock
    const nav = $('#main-nav');
    const toggle = $('#nav-toggle');
    const close = $('#mobile-close');
    const setNav = (open) => {
      nav?.classList.toggle('mobile-open', open);
      document.body.classList.toggle('nav-locked', open);
      toggle?.setAttribute('aria-expanded', String(open));
      if (open) close?.focus({ preventScroll: true });
    };
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.addEventListener('click', () => setNav(true));
    close?.addEventListener('click', () => setNav(false));
    $$('.nav-link', nav).forEach(a => a.addEventListener('click', () => setNav(false)));
    document.addEventListener('click', e => {
      if (nav?.classList.contains('mobile-open') && e.target === nav) setNav(false);
    });

    // Smooth anchors with dynamic header offset
    const scrollToTarget = (target) => {
      const offset = (header?.offsetHeight || 76) + 12;
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
    };
    $$('a[href^="#"]').forEach(link => link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      scrollToTarget(target);
    }));

    // Reveal animations, disabled only when reduced motion is requested
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: .12, rootMargin: '0px 0px -45px' });
      $$('.reveal, .reveal-stagger').forEach(el => io.observe(el));
    } else {
      $$('.reveal, .reveal-stagger').forEach(el => el.classList.add('in-view'));
    }

    /* ==========================================================
       Xizmat kartasi -> "Batafsil" modal oynasi
       ========================================================== */
    const modal = $('#service-modal');
    const modalIcon = $('#sm-icon');
    const modalTitle = $('#sm-title');
    const modalLead = $('#sm-lead');
    const modalList = $('#sm-list');
    const modalChips = $('#sm-chips');
    const modalBook = $('#sm-book');
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

      // Karta ikonkasini modal sarlavhasiga ko'chirish
      const cardSvg = $(`.service-card[data-service="${key}"] .service-svg`);
      modalIcon.innerHTML = '';
      if (cardSvg) modalIcon.append(cardSvg.cloneNode(true));
    };

    const openModal = (key, trigger) => {
      if (!modal || !SERVICE_DETAILS[DEFAULT_LANG][key]) return;
      openServiceKey = key;
      lastFocused = trigger || document.activeElement;
      renderModal(key);
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

    // Butun karta ham bosilsa ochilsin (klaviatura bilan ham)
    $$('.service-card').forEach(card => {
      card.addEventListener('click', () => openModal(card.dataset.service, $('.service-link', card)));
    });

    $$('[data-modal-close]', modal).forEach(el => el.addEventListener('click', closeModal));

    // Modal ichida fokusni ushlab turish
    modal?.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusables = $$('button, a[href], [tabindex]:not([tabindex="-1"])', modal)
        .filter(el => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Modaldagi "yozilish" tugmasi -> formaga o'tadi va xizmatni tanlab qo'yadi
    modalBook?.addEventListener('click', () => {
      const key = openServiceKey;
      closeModal();
      if (key) selectService(key);
      const contact = $('#contact');
      if (contact) setTimeout(() => scrollToTarget(contact), 120);
    });

    /* ==========================================================
       Maxsus "Xizmatni tanlang" dropdown
       ========================================================== */
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
      });
    });

    selectTrigger?.addEventListener('click', () => setSelectOpen(!selectWrap.classList.contains('is-open')));
    selectTrigger?.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectOpen(true); }
    });
    document.addEventListener('click', e => {
      if (selectWrap && !selectWrap.contains(e.target)) setSelectOpen(false);
    });

    // Escape: modal -> dropdown -> mobil menyu
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (modal?.classList.contains('is-open')) closeModal();
      else if (selectWrap?.classList.contains('is-open')) { setSelectOpen(false); selectTrigger?.focus(); }
      else setNav(false);
    });

    // Phone formatting
    const phone = $('#f-phone');
    phone?.addEventListener('input', () => {
      let digits = phone.value.replace(/\D/g, '');
      if (digits.startsWith('998')) digits = digits.slice(3);
      digits = digits.slice(0, 9);
      const parts = [digits.slice(0,2), digits.slice(2,5), digits.slice(5,7), digits.slice(7,9)].filter(Boolean);
      phone.value = '+998' + (parts.length ? ' ' + parts.join(' ') : '');
    });

    // Booking -> Telegram @mrToshoff with prefilled request
    const form = $('#booking-form');
    const success = $('#form-success');
    form?.addEventListener('submit', e => {
      e.preventDefault();
      const nameField = $('#f-name');
      const name = nameField?.value.trim();
      const phoneValue = phone?.value.trim();
      const serviceKey = serviceInput?.value;
      const msg = $('#f-msg')?.value.trim();

      if (!name) { nameField?.focus(); return; }
      if (!phoneValue || phoneValue.replace(/\D/g, '').length < 12) { phone?.focus(); return; }
      if (!serviceKey) {
        selectWrap?.classList.add('has-error');
        serviceError?.classList.add('show');
        selectTrigger?.focus({ preventScroll: true });
        return;
      }
      serviceError?.classList.remove('show');

      const message = [
        t('tg.header', currentLang),
        '',
        `${t('tg.name', currentLang)}: ${name}`,
        `${t('tg.phone', currentLang)}: ${phoneValue}`,
        `${t('tg.service', currentLang)}: ${serviceLabel(serviceKey)}`,
        `${t('tg.message', currentLang)}: ${msg || '—'}`
      ].join('\n');
      const telegramUrl = `https://t.me/mrToshoff?text=${encodeURIComponent(message)}`;
      success?.classList.add('show');
      setTimeout(() => window.location.href = telegramUrl, 250);
    });

    // Subtle pointer glow on desktop cards
    if (!reduce && matchMedia('(pointer:fine)').matches) {
      $$('.service-card, .contact-form, .location-info').forEach(card => {
        card.addEventListener('pointermove', e => {
          const r = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${e.clientX - r.left}px`);
          card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
      });
    }

    // Birinchi render — saqlangan til yoki rus tili
    applyLang(currentLang);
  });
})();
