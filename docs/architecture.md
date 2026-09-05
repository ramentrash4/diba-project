# Technical Architecture & Implementation Guide
## The Scrapbook of Us — Next.js + Framer Motion Engine

---

### 1. Technology Stack & Dependencies
* **Framework:** Next.js (App Router, React 18+)
* **Animation & Gesture Engine:** `framer-motion` (Spring physics, drag-to-dismiss, 3D flip card, staggered list animations)
* **Styling & Design Tokens:** `tailwindcss` + Custom CSS Tokens (Paper textures, dynamic gradients)
* **Particles & FX:** `canvas-confetti` (Unboxing and reveal moments)
* **Audio Engine:** Native Web Audio API + HTML5 Audio Controller (Volume ducking, multi-channel crossfading, SFX)
* **Icons:** `lucide-react`
* **Fonts:** `next/font/google` (`Caveat`, `Courier_Prime`, `Plus_Jakarta_Sans`)

---

### 2. Struktur Direktori Proyek
```text
DibaProject/
├── docs/
│   ├── prd.md                     # Product Requirements Document
│   ├── design.md                  # Design Specifications & Atmosphere
│   └── architecture.md            # Technical Architecture (Dokumen ini)
├── public/
│   ├── audio/
│   │   ├── bgm/                   # BGM lo-fi instrumen
│   │   ├── songs/                 # Lagu-lagu kenangan Segmen 2
│   │   ├── vn/                    # Voice Note asli Segmen 6
│   │   └── sfx/                   # Efek suara kaset, kertas, pita
│   ├── images/
│   │   ├── polaroids/             # Foto polaroid Segmen 3
│   │   └── doodles/               # Ilustrasi stiker & washi tape
│   └── textures/                  # Tekstur kertas kraft & grain analog
├── src/
│   ├── app/
│   │   ├── layout.js              # Inisialisasi Google Fonts & Meta SEO
│   │   ├── page.js                # Orchestrator Scrapbook & State Machine
│   │   └── globals.css            # Desain token, CSS keyframes, tekstur
│   ├── components/
│   │   ├── audio/
│   │   │   ├── AudioProvider.js   # Konteks audio & ducking controller
│   │   │   └── CassetteTape.js    # Visual kaset analog berputar
│   │   ├── common/
│   │   │   ├── AtmosphereBackdrop.js # Gradasi dinamis (siang -> malam -> fajar)
│   │   │   ├── WashiTape.js       # Selotip dekoratif dengan rotasi acak
│   │   │   ├── PaperSheet.js      # Kontainer kertas bertekstur
│   │   │   └── TypingIndicator.js # Titik animasi 'Tatwa sedang mengetik...'
│   │   └── segments/
│   │       ├── Segment1Prolog.js       # Kado & tarikan pita 3D
│   │       ├── Segment2Soundtrack.js   # Mixtape lagu & lirik mesin tik
│   │       ├── Segment3Polaroid.js     # Stack polaroid (flip & drag throw)
│   │       ├── Segment4Kamus.js        # Kamus mini bahasa kita & jokes
│   │       ├── Segment5KacaEmbun.js    # Canvas scratch kaca berembun
│   │       ├── Segment6VoiceNotes.js   # VN bertahap & bubble chat Tatwa
│   │       ├── Segment7Wishlist.js     # Kertas robek rencana tertunda
│   │       └── Segment8Closing.js      # Tiket doa & tombol tutup lembaran
│   └── data/
│       └── scrapbookData.js            # Pusat seluruh data teks, lagu, foto, & VN
```

---

### 3. State Machine & Alur Navigasi Terkunci (Storybook Gating)

Untuk memastikan pengalaman berjalan berurutan sesuai kurva emosional, status navigasi dikontrol oleh state terpusat di `src/app/page.js`:

```javascript
// State Inti:
const [unlockedSegment, setUnlockedSegment] = useState(1); // Nilai: 1 s/d 8
const [activeSegment, setActiveSegment] = useState(1);     // Menentukan tema atmosfer visual
const [isPageLocked, setIsPageLocked] = useState(false);    // True saat lembaran ditutup permanen
```

#### Kondisi Pembuka Gerbang (*Unlock Rules*):
1. **Segmen 1 (Kado):** Terbuka setelah pita ditarik -> Mengaktifkan BGM -> `setUnlockedSegment(2)` -> Auto-scroll ke Segmen 2.
2. **Segmen 2 (Mixtape):** Terbuka setelah minimal 1 lagu diputar -> Tombol *"Lanjut Membaca..."* ditekan -> `setUnlockedSegment(3)`.
3. **Segmen 3 (Polaroid):** Terbuka setelah semua polaroid di-swipe/dilihat -> `setUnlockedSegment(4)`.
4. **Segmen 4 (Kamus Kita):** Terbuka setelah Adiba menelusuri entri kamus -> Tombol *"Melangkah ke Malam..."* -> `setUnlockedSegment(5)`.
5. **Segmen 5 (Kaca Berembun):** Terbuka setelah ke-3 kaca berembun diusap (>50% clear) -> `setUnlockedSegment(6)`.
6. **Segmen 6 (Voice Notes):** Terbuka beruntun (VN 1 berputar ➔ balasan Tatwa tampil ➔ VN 2 terbuka ➔ balasan Tatwa tampil ➔ VN terakhir tuntas) -> `setUnlockedSegment(7)`.
7. **Segmen 7 (Wishlist):** Dibaca santai -> Tombol *"Buka Lembaran Terakhir"* ditekan -> `setUnlockedSegment(8)`.
8. **Segmen 8 (Penutup):** Membaca Tiket Doa -> Tombol *"Tutup Lembaran"* ditekan -> Audio fade-out -> Whiteout overlay aktif -> Layar terkunci total (`isPageLocked = true`).

---

### 4. Sistem Kontrol Audio & Auto-Ducking (Audio Engine)

Pengalaman audio ditangani oleh modul `AudioProvider`:
* **Saluran A (BGM Ambient):** Musik instrumen lo-fi yang berputar terus-menerus sejak kado dibuka (volume default 35%).
* **Saluran B (Foreground Media):** Lagu kenangan (Segmen 2) atau rekaman Voice Note Adiba (Segmen 6).
* **Saluran C (SFX Haptik):** Suara klik kaset, sobekan kertas, dan pita kado.

#### Logika Auto-Ducking & Fade:
```javascript
// Saat lagu atau VN mulai berputar:
function onForegroundAudioPlay() {
  fadeAudio(bgmRef.current, 0.35, 0.08, 400); // Turunkan BGM ke 8% dalam 400ms
}

// Saat lagu atau VN selesai/di-pause:
function onForegroundAudioEnd() {
  fadeAudio(bgmRef.current, 0.08, 0.35, 600); // Kembalikan BGM ke 35% dalam 600ms
}

// Saat tombol 'Tutup Lembaran' ditekan:
function onFinalClosure() {
  fadeAudio(bgmRef.current, currentBgmVol, 0.0, 2500); // Mereda ke hening mutlak
  fadeAudio(foregroundRef.current, currentForeVol, 0.0, 1500);
}
```

---

### 5. Skema Data Terpusat (`src/data/scrapbookData.js`)

Seluruh data disusun rapi dan modular sehingga Tatwa cukup menyunting satu file ini:

```javascript
export const scrapbookData = {
  // Informasi Penerima & Prolog
  recipient: {
    name: "Adiba",
    nickname: "Askiyaa",
    tagline: "Pilkom '25",
    greeting: "Untuk Askiyaa, Pilkom 25.",
    giftBoxLabel: "Buka Perlahan...",
  },

  // Pengaturan Audio Latar
  bgm: {
    src: "/audio/bgm/gentle-memory.mp3",
    volume: 0.35,
  },

  // Segmen 2: Soundtrack Mixtape (3-4 Lagu)
  soundtrack: [
    {
      id: "song-1",
      title: "Lagu Pertama Kita",
      artist: "Nama Musisi",
      duration: "3:45",
      src: "/audio/songs/song1.mp3",
      memoryText: "Lagu yang dulu sering kamu putar waktu kita ngerjain tugas bareng di cafe itu...",
    },
    // Lagu lainnya...
  ],

  // Segmen 3: Tumpukan Polaroid (3-5 Foto)
  polaroids: [
    {
      id: "photo-1",
      src: "/images/polaroids/photo1.jpg",
      date: "14 Oktober 2024",
      frontCaption: "Aku suka baju yang kamu pakai di foto ini.",
      backNote: "Di tempat ini kamu ketawa kencang banget gara-gara hal sepele. Semoga tawamu selalu awet.",
      rotation: -3,
    },
    // Foto lainnya...
  ],

  // Segmen 4: Kamus Bahasa Kita (Inside Jokes)
  dictionary: [
    {
      word: "Ngambek 'Y'",
      type: "ungkapan / kata sifat",
      definition: "Kondisi saat Adiba mendadak membalas chat hanya dengan satu huruf kapital tanpa titik.",
      example: "Tatwa: 'Mau makan apa nanti sore?' — Adiba: 'Y'",
    },
    // Kosakata lainnya...
  ],

  // Segmen 5: Kaca Berembun (Hal-hal Kecil)
  foggyGlass: [
    {
      id: "fog-1",
      title: "Hal Kecil #1",
      hiddenText: "Cara bicaramu yang tiba-tiba cepet banget kalau lagi antusias nyeritain hal yang kamu suka.",
    },
    // Kaca lainnya...
  ],

  // Segmen 6: Rekaman Tawa & Tanya (Voice Notes)
  voiceNotes: [
    {
      id: "vn-1",
      sender: "Adiba",
      src: "/audio/vn/vn1.mp3",
      duration: "0:18",
      tatwaReply: "kenapa sii panggil panggil... padahal mau nanya tugas doang kan aslinya :P",
    },
    // VN berikutnya...
  ],

  // Segmen 7: Wishlist Kertas Robek (Rencana Tertunda)
  wishlist: [
    { text: "Nonton konser musik yang dulu tiketnya kehabisan", note: "Mungkin di kesempatan lain" },
    { text: "Makan ramen pedas di tempat langganan", note: "Jangan lupa pesen minum yang manis ya" },
    { text: "Jalan sore santai tanpa mikirin deadline tugas", note: "Semoga kamu tetap punya waktu istirahat" },
  ],

  // Segmen 8: Penutup & Tiket Doa
  closing: {
    letter: `Terima kasih untuk setiap tawa, obrolan larut malam, dan semua hal baik yang pernah kita bagi bersama. Tidak ada penyesalan, hanya rasa syukur pernah mengenalmu.`,
    ticket: {
      passenger: "Adiba (Askiyaa)",
      classType: "First Class — Kehidupan Baru",
      flightNo: "PILKOM-2025",
      destination: "Masa Depan yang Penuh Kebahagiaan",
      validity: "Valid Selamanya",
    },
    prayer: "Semoga langkahmu selalu dimudahkan di Pilkom 25, dan kamu selalu dikelilingi orang-orang yang tulus menyayangimu.",
    finalSignoff: "Berbahagialah. — Tatwa",
  }
};
```

---

### 6. Panduan Deployment & QR Code
1. **Hosting:** Website siap di-deploy secara instan ke platform **Vercel** (`vercel deploy` atau hubungkan repositori GitHub).
2. **Koneksi QR Code:** Domain hasil deploy Vercel (misal: `https://the-scrapbook-of-us.vercel.app`) dibuatkan gambar QR Code resolusi tinggi (via QR code generator bergaya vintage/aesthetic).
3. **Perekatan Fisik:** Gambar QR Code tersebut dicetak dan ditempel di halaman paling akhir buku scrapbook fisik yang diberikan Tatwa kepada Adiba.
