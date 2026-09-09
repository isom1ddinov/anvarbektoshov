# Dr. Anvarbek Toshov — stomatolog-implantolog sayti

Jarroh stomatolog-implantolog Anvarbek Toshov uchun premium landing sahifa (5 bo'lim).
Toza HTML/CSS/JS — build tool kerak emas. `index.html`'ni brauzerda ochish yoki istalgan
statik hostingga (GitHub Pages, Netlify, Vercel, oddiy shared hosting) yuklash yetarli.

## Bo'limlar

1. **Hero** — sarlavha, hisoblagichlar (10+ yil, 6000+ implant, 1 kun), CTA, shifokor surati (glow ring).
2. **Shifokor haqida** — matn + 4 ta ishonch kartasi (bento).
3. **Xizmatlar** — 4 ta karta, har biri "Batafsil" modalini ochadi.
4. **Manzil** — Yandex Maps widget (ofis kartochkasi bilan) + "Marshrut qurish" tugmasi.
5. **Bog'lanish** — aloqa kartasi + forma (Telegram'ga tayyor xabar).

Qo'shimcha: marquee lenta, mobil drawer-menyu, mobil quick-bar (Qo'ng'iroq / Yozilish), preloader.

## Dizayn va animatsiyalar

- Palitra: chuqur teal (`#04302e`…`#159a95`) + krem (`#faf3e6`) + oltin (`#c1924f`…`#e9c78f`).
- Shriftlar: Plus Jakarta Sans (asosiy) + Playfair Display italic (hero'dagi urg'u so'zi).
- **GSAP 3.13 + ScrollTrigger** (cdnjs): hero intro (so'zma-so'z sarlavha, stagger), hisoblagichlar,
  scroll-reveal (`data-reveal`, `data-stagger`), parallax, orb'lar harakati, magnit tugmalar.
- CSS glow: conic-gradient aylanuvchi ring (surat), spotlight + gradient-border kartalar,
  oltin pulse CTA, glass (backdrop-filter) elementlar.
- `prefers-reduced-motion` yoqilgan bo'lsa yoki GSAP yuklanmasa — barcha kontent darhol ko'rinadi.

## Xarita va marshrut (Yandex)

Ofis Yandex Maps'da tashkilot sifatida ro'yxatdan o'tgan: **oid `141355307523`**,
koordinatalar `41.337263, 69.274077` (`script.js` → `ORG`).

| Holat | Nima ochiladi |
| --- | --- |
| Xarita (iframe) | `yandex.uz/map-widget/v1/?oid=141355307523&ol=biz&mode=search…` — ofis kartochkasi ko'rinib turadi, til RU/UZ bilan almashadi |
| **Marshrut** — telefon | Yandex Go deep link (`3.redirect.appmetrica.yandex.com/route?end-lat…&end-lon…`) — ilova ochiladi, ofis manzil sifatida qo'yiladi; ilova yo'q bo'lsa do'kon sahifasi |
| **Marshrut** — kompyuter | Yandex Maps: `mode=routes&rtext=~lat,lon&ruri=~ymapsbm1://org?oid=…` — "Mening joylashuvim" → ofis |
| "Yandex Maps'da ochish" | Tashkilot sahifasi `yandex.uz/maps/org/anvarbek_toshov/141355307523/` |

Qurilma `isMobileDevice()` (User-Agent + touch) orqali aniqlanadi.

## Ikki til (RU / UZ)

Birinchi kirganda rus tili, tanlov `localStorage` (`at-lang`) da saqlanadi. Matnlar
`script.js` → `I18N` (`ru` / `uz`), xizmat tafsilotlari `SERVICE_DETAILS` ichida.
HTML atributlari: `data-i18n`, `data-i18n-html`, `data-i18n-placeholder`, `data-i18n-aria`,
`data-i18n-title`, `data-i18n-alt`, `data-i18n-content`.

## Fayllar

- `index.html` — tuzilma, meta/OG, JSON-LD (schema.org `Dentist`)
- `style.css` — dizayn tokenlari, bo'limlar, responsive (980 / 760 / 430 / 380 px)
- `script.js` — i18n, GSAP, Yandex marshrut, modal, custom select, forma
- `img/` — `author.jpg`, `logo-mark.png`, `favicon.png`

Loyihada faqat shu to'plam bo'lishi kerak — `index.html` bitta, ichki papkalarda nusxalar yo'q.

## O'zgartirish kerak bo'lishi mumkin

- Telefon: `+998 91 920 77 11` (`index.html` ichida `tel:` havolalar va matn).
- Telegram: `script.js` → `TELEGRAM_USERNAME` (`mrToshoff`).
- Ish vaqti: `I18N` → `location.hoursValue`, `contact.hoursValue` va JSON-LD `openingHours`.

## Lokal ko'rish

```bash
python -m http.server 8080
# brauzerda http://localhost:8080
```
