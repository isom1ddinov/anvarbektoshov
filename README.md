# Dr. Anvarbek Toshov — stomatolog sayti

Stomatolog-implantolog Anvarbek Toshov uchun qisqa, professional landing sahifa.
Toza HTML/CSS/JS bilan yozilgan (build tool talab qilinmaydi) — `index.html` faylini
brauzerda ochish yoki istalgan statik hosting'ga (GitHub Pages, Netlify, Vercel va h.k.)
yuklash yetarli.

## Dizayn

- **Ranglar**: header/aksent `#006666` (teal), fon `#FAF0DC` (kremsimon/qimmat ko'rinish),
  detallar uchun oltin rang (`#B1854A`).
- **Shrift**: Golos Text (Google Fonts). 42.uz saytiga tarmoq cheklovi tufayli kira olmadim
  (bloklangan) — shu sabab uning aniq shriftini tasdiqlay olmadim; Golos Text shunga yaqin,
  zamonaviy va toza shrift sifatida tanlandi. Aniq shrift nomini bersangiz almashtirib beraman.
- **Ikonkalar**: barcha ikonka (logotip, implant, protez-ko'prik, estetik/yaltiroq va h.k.)
  qo'lda chizilgan custom SVG — tashqi ikonka kutubxonasi (Font Awesome va h.k.) ishlatilmagan.
- Sayt qasddan qisqa qilindi: faqat Bosh sahifa (Hero) → Ishonch chizig'i → Xizmatlar →
  Bog'lanish → Footer. Instagram obunachilar soni endi ko'rsatilmaydi.

## Ikki til (RU / UZ)

Sayt rus va o'zbek tillarida ishlaydi. **Birinchi kirganda rus tili ochiladi** — tanlov
`localStorage` (`at-lang`) ga saqlanadi, keyingi tashriflarda o'sha til qayta tiklanadi.
Header'dagi **RU / UZ** tugmasi tilni sahifani qayta yuklamasdan almashtiradi: barcha
sectionlar, forma yorliqlari, modal matnlari, `<title>`, meta teglar, `alt`/`aria-label`
va Telegram'ga yuboriladigan xabar ham tanlangan tilga o'tadi.

Matnlar `script.js` ichidagi `I18N` obyektida (`ru` va `uz` kalitlari bilan) saqlanadi.
HTML tomonda quyidagi atributlar ishlatiladi:

| Atribut | Nimani almashtiradi |
| --- | --- |
| `data-i18n` | element matni (`textContent`) |
| `data-i18n-html` | ichida `<span>` bo'lgan matn (masalan hero sarlavhasi) |
| `data-i18n-placeholder` | input/textarea `placeholder` |
| `data-i18n-aria` / `data-i18n-title` / `data-i18n-alt` | `aria-label`, `title`, `alt` |
| `data-i18n-content` | `<meta>` teglar |

Yangi matn qo'shish uchun: HTML'ga `data-i18n="yangi.kalit"` yozing va `I18N.ru` /
`I18N.uz` ichiga o'sha kalitni qo'shing.

## Xizmatlar — "Batafsil" modali

Har bir xizmat kartasidagi **Batafsil** tugmasi (yoki kartaning o'zi) shu xizmat haqida
to'liq ma'lumotli modal oynani ochadi: tavsif, "nimalar kiradi" ro'yxati va davomiylik /
kafolat kabi chiplar. Matnlar `script.js` ichidagi `SERVICE_DETAILS` obyektida, har bir
til uchun alohida turadi. Modaldagi "Shu xizmatga yozilish" tugmasi formaga olib boradi
va o'sha xizmatni avtomatik tanlab qo'yadi. Escape, backdrop va ✕ tugmasi oynani yopadi.

## Fayllar

- `index.html` — sahifa tuzilishi
- `style.css` — dizayn tokenlari, uslublar, responsive qoidalar
- `script.js` — i18n (RU/UZ), scroll-reveal, mobil menyu, xizmat modali,
  maxsus "Xizmatni tanlang" dropdown, bog'lanish formasi (Telegram deep-link)

## Manba

Sayt matnidagi tasdiqlangan faktlar Instagram'dagi ochiq profil ma'lumotlaridan olindi:
[@anvarbek_toshov](https://www.instagram.com/anvarbek_toshov/) — "Хирург Стоматолог-имплантолог",
6000+ o'rnatilgan implant, "1 kunda implantatsiya", "umrbod kafolat".

## Nashr qilishdan oldin albatta almashtiring

Quyidagi joylar hozircha placeholder (`index.html` ichida `TODO` izohlari bilan belgilangan):

1. **Telefon raqami** — Bog'lanish bo'limidagi `+998 XX XXX XX XX`.
2. **Klinika manzili** — Bog'lanish bo'limidagi "Toshkent shahri".
3. **Ish vaqti** — hozirgi "09:00–19:00" taxminiy, tasdiqlang yoki o'zgartiring.
4. **Telegram/WhatsApp havolalari** — `script.js` ichidagi `TELEGRAM_USERNAME`
   o'zgaruvchisi va `index.html` ichidagi `social-row` bo'limidagi `#` havolalar.

## Lokal ko'rish

```bash
cd anvarbek-toshov
python3 -m http.server 8080
# so'ng brauzerda http://localhost:8080 oching
```
