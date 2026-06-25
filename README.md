# CODESIGN — Staggered Card Animation Landing

Landing page bertema _mental-wellness_ dengan **hero section** ungu (`#573FEF`) ber-_background shape_ efek **path-trim draw**, headline yang **slide-in dari bawah ke atas**, lalu sebuah **features section** berisi 3 kartu dengan **pinned scroll-driven staggered reveal** (kartu masuk dari atas & bawah saat scroll), **3D tilt hover**, dan **footer hitam raksasa** ala Awwwards. Dibangun dengan Next.js, Tailwind CSS, dan GSAP + ScrollTrigger.

## ✨ Fitur

- **Hero path-trim + text reveal** — _shape_ SVG pada latar hero di-_draw_ memakai GSAP (animasi `strokeDashoffset`, panjang diukur via `getTotalLength()`) selama 1.5s; setelah selesai, headline / subtitle / tombol **slide-in dari bawah ke atas** secara berurutan (`stagger`).
- **Pinned staggered card reveal** — _features section_ di-**pin** selama satu viewport. Kondisi awal hanya menampilkan judul + subtitle di tengah; saat scroll, judul bergeser ke atas dan **3 kartu masuk staggered** (pink & green dari atas, blue dari bawah) sampai membentuk satu baris. Animasi terikat scroll (`scrub`) lewat **GSAP ScrollTrigger** dengan `stagger: 0.15` dan ease `power3.out`.
- **Title & subtitle reveal** — judul section kedua **slide-in dari bawah ke atas** saat section baru masuk viewport.
- **3D tilt hover** — tiap kartu miring mengikuti posisi mouse (`rotateX` / `rotateY`, maks 10°) dengan `transformPerspective`, halus dengan `power3.out`.
- **Responsive fallback** — di layar `<768px` _pin_ dimatikan dan kartu memakai _staggered reveal_ sederhana (lebih nyaman di mobile) via `gsap.matchMedia`.
- **Footer Awwwards-style** — latar hitam (`#131313`) dengan _wordmark_ raksasa **CODESIGN** (`text-[clamp(3rem,19vw,22rem)]`) yang memenuhi lebar layar, plus tagline, CTA, kolom link, dan _copyright bar_.
- **Ilustrasi transparan** — ketiga ilustrasi `.webp` (RGBA) ditempel langsung di warna kartu tanpa _background_ tambahan.
- Memakai font **Inter** (next/font): **ExtraBold (800)** untuk headline/title, **Regular (400)** untuk body.

## 🧰 Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [React 18](https://react.dev/) + **JavaScript / JSX**
- [Tailwind CSS 3](https://tailwindcss.com/)
- [GSAP 3](https://gsap.com/) + **ScrollTrigger** (dimuat via CDN)
- [Inter](https://fonts.google.com/specimen/Inter) (via `next/font`)

## 🚀 Get Started

### Prasyarat

- **Node.js** versi 18.17 atau lebih baru
- **npm** (atau `pnpm` / `yarn`)

### 1. Clone repository

```bash
git clone <url-repository-ini>
cd staggered-card-animation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Jalankan development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser. _Note: jika port 3000 terpakai, Next.js otomatis pindah ke 3001._

> ⚠️ Jangan menjalankan `npm run build` selagi `npm run dev` masih aktif — keduanya berbagi folder `.next` dan cache webpack dev bisa rusak.

### 4. Build untuk production

```bash
npm run build
npm run start
```

## 📜 Script yang Tersedia

| Perintah        | Keterangan                                  |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Menjalankan server development              |
| `npm run build` | Build aplikasi untuk production             |
| `npm run start` | Menjalankan hasil build production          |
| `npm run lint`  | Menjalankan linting (ESLint bawaan Next.js) |

## 📁 Struktur Proyek

```
.
├── app/
│   ├── globals.css         # Tailwind + state pra-animasi (.feature-card, .reveal-text, .hero-text-item)
│   ├── layout.js           # Root layout + load font Inter (next/font)
│   └── page.js             # Menyusun Header, Hero, Features, Footer
├── components/
│   ├── useGsap.js          # Hook loader GSAP + ScrollTrigger via CDN
│   ├── Header.js           # Logo CODESIGN di tengah
│   ├── Hero.js             # Hero: path-trim shape + text slide-in (GSAP timeline)
│   ├── Features.js         # Pinned staggered card reveal + 3D tilt (ScrollTrigger)
│   └── Footer.js           # Footer hitam dengan wordmark raksasa
├── assets/                 # Sumber aset: illustration-0x.webp, shape-hero.svg, logo-codesign.svg
├── public/assets/          # Aset yang di-serve Next.js (ilustrasi, shape, logo)
└── tailwind.config.js      # Warna brand & font family (Inter)
```

## 🎨 Kustomisasi

- **Warna & font** — atur di [`tailwind.config.js`](tailwind.config.js): `hero: #573FEF`, `card-pink: #FF29AE`, `card-blue: #2E74FF`, `card-green: #7AC743`, `ink: #131313`; font `sans` (Inter).
- **Animasi kartu** — sesuaikan di [`components/Features.js`](components/Features.js): `stagger` (jeda antar kartu), `end: "+=2200"` (panjang scroll saat pin), pengali `* 1.15` (jarak kartu mulai dari luar layar), dan arah masuk lewat properti `from` (`"top"` / `"bottom"`) pada array `CARDS`.
- **Hero** — atur durasi path-trim (`duration: 1.5`) dan urutan slide-in teks di [`components/Hero.js`](components/Hero.js).
- **Footer** — ubah ukuran wordmark (`text-[clamp(...)]`) dan kolom link di [`components/Footer.js`](components/Footer.js).
- **Aset ilustrasi, shape & logo** — ganti file di [`public/assets/`](public/assets/).

## ☕ Traktir Kopi

Kalau project ini bermanfaat dan kamu mau mendukung, boleh banget traktir kopi Rp10.000 😄

**👉 [lynk.id/fandy.codesign](https://lynk.id/fandy.codesign/46kjr1d8oo85)**

Terima kasih banyak atas dukungannya! 🙏

## 🌐 Ikuti / Connect

Yuk follow & ngobrol soal desain dan coding:

- 📸 **Instagram** — [@fandy.codesign](https://instagram.com/fandy.codesign)
- 🎵 **TikTok** — [@fandy.codesign](https://tiktok.com/@fandy.codesign)
