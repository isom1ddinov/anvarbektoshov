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

## Fayllar

- `index.html` — sahifa tuzilishi
- `style.css` — dizayn tokenlari, uslublar, responsive qoidalar
- `script.js` — scroll-reveal, mobil menyu, bog'lanish formasi (Telegram deep-link)

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
