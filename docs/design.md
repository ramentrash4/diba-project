# Design Specification Document
## The Scrapbook of Us — Aesthetics, Atmosphere & Interaction System

---

### 1. Visi Desain & Art Direction
* **Konsep Utama:** *Warm Handcrafted Scrapbook meets Lo-Fi Analog Cassette*
* **Sensasi Visual:** Terasa seperti memegang buku kliping kenangan fisik yang memiliki nyawa digital:
  - Tekstur kertas kraft dan linen berpori halus.
  - Potongan selotip washi tape bermotif warna-warni lembut.
  - Bingkai foto polaroid dengan bayangan terangkat (*lifted elevation*).
  - Pemutar audio berwujud kaset pita analog dengan roda yang berputar nyata.
  - Tipografi perpaduan tulisan tangan pena basah, ketikan mesin tik lama, dan sans-serif modern yang nyaman dibaca.

---

### 2. Dynamic Visual Atmosphere (Gradasi Atmosfer Sinematik)
Website ini memiliki pencahayaan lingkungan (*environmental grading*) yang bertransisi secara dinamis antar babak, merefleksikan perubahan waktu dan kedalaman emosi:

```text
[Babak 1 - Siang Hangat & Ceria]
  Segmen 1 (Kado) ➔ Segmen 2 (Mixtape) ➔ Segmen 3 (Polaroid) ➔ Segmen 4 (Kamus Kita)
  • Latar Belakang: #FDFBF7 (Kertas linen krem hangat) bergradasi ke #F5EFEB (Kraft halus).
  • Pencahayaan: Golden hour lembut, partikel debu halus melayang di udara.
  • Suasana: Manis, ceria, hangat, penuh senyuman.

[Babak 2 - Transisi Malam Temaram & Hujan]
  Segmen 5 (Kaca Berembun) ➔ Segmen 6 (Voice Notes & Lampu Meja)
  • Latar Belakang: Menggelap mulus ke #141B2B (Deep Midnight Slate) & #0E131E.
  • Efek Lingkungan: Titik lampu kota yang kabur (bokeh lights) dan bulir air hujan tipis di kaca.
  • Pencahayaan: Sorot lampu belajar temaram (warm amber glow #FFB86C) yang fokus ke obrolan.
  • Suasana: Intim, sepi, hangat di tengah malam, menggetarkan kenangan.

[Babak 3 - Fajar Meluruh Menuju Awal Baru]
  Segmen 7 (Wishlist) ➔ Segmen 8 (Tiket Doa & Penutup)
  • Latar Belakang: Kembali bertransisi cerah ke #F6F2EA dengan aura fajar emas pucat (#FFF9E6).
  • Suasana: Kedamaian, keikhlasan mendalam, doa masa depan yang bersih dan lapang.
  • Ending: Layar larut ke putih mutlak (#FFFFFF) dengan ketenangan abadi.
```

---

### 3. Sistem Tipografi (Typography Hierarchy)

| Peran | Font Google | Gaya & Karakter | Penerapan |
|---|---|---|---|
| **Tulisan Tangan (Handwritten)** | `Caveat` / `Marck Script` | Alami, goresan pena personal, hangat, manis | Judul scrapbook, catatan di belakang polaroid, coretan catatan kecil |
| **Mesin Tik Vintage (Typewriter)** | `Courier Prime` | Monospace analog, nostalgia, berkarakter | Label kaset pita, stempel tanggal, entri kamus, lirik lagu |
| **Teks Utama & Instruksi (Clean Sans)** | `Plus Jakarta Sans` | Modern, ramah, sangat nyaman dibaca di HP | Paragraf cerita, teks tombol navigasi, petunjuk interaksi |

---

### 4. Palet Warna & Desain Token (Tailwind & CSS Tokens)

```css
:root {
  /* Nuansa Kertas & Scrapbook */
  --paper-cream: #FAF7F2;
  --paper-kraft: #EFE7DA;
  --paper-aged: #E4DAC9;
  --paper-dark: #2B2520;

  /* Warna Tinta Tulisan */
  --ink-primary: #2C2621;
  --ink-muted: #6B6259;
  --ink-faded: #9E9489;
  --ink-blue-pen: #2A4365;

  /* Warna Aksen Washi Tape & Stiker */
  --washi-rose: #E8B4B8;
  --washi-sage: #B8C4B8;
  --washi-mustard: #E2C275;
  --washi-sky: #A8C0D6;
  --tape-translucent: rgba(255, 255, 255, 0.45);

  /* Suasana Malam Temaram (Segmen 5 & 6) */
  --night-bg: #141B2B;
  --night-card: rgba(26, 35, 54, 0.85);
  --night-glow: #FFAA5A;
  --glass-frost: rgba(255, 255, 255, 0.18);

  /* Fajar & Harapan (Segmen 8) */
  --dawn-gold: #F7E7CE;
  --pure-white: #FFFFFF;
}
```

---

### 5. Detail Mekanika Interaksi per Segmen

#### Segmen 1: Kotak Kado & Penarik Pita (The Unboxing)
* **Visual:** Kotak kado persegi warna blush-terracotta dengan pita satin emas melingkar.
* **Interaksi:**
  - Pengguna melakukan gestur tarik (*drag swipe*) pada ujung simpul pita ke arah bawah/samping.
  - Menggunakan Framer Motion `drag` dengan resistansi elastis.
* **Animasi Pembuka:**
  - Pita lepas melingkar, tutup kotak terangkat naik ke atas dengan efek 3D tilt perspective.
  - Muncul partikel confetti kertas warna-warni dan kelopak bunga (*canvas-confetti*).
  - BGM mengalun lembut (volume mulai dari 0 naik halus ke 35% dalam 2 detik).
  - Halaman otomatis melakukan *smooth-scroll* terarah ke Segmen 2.

#### Segmen 2: Mixtape Kaset Berputar (The Cassette Player)
* **Visual:** Unit kaset pita analog bergaya 90-an dengan jendela mika transparan yang memperlihatkan dua gulungan pita (*reels*).
* **Interaksi:**
  - Terdapat tombol Play/Pause berbentuk tombol kaset mekanik dengan bunyi klik tape (*subtle click SFX*).
  - Saat lagu berputar, gear roda kaset berputar dengan kecepatan natural.
  - Garis gelombang suara (*waveform/equalizer*) bergerak ritmis mengikuti irama.
  - Teks memori lagu muncul di bawah kaset dengan animasi ketikan huruf demi huruf (*typewriter effect*).
  - Begitu minimal 1 lagu diputar, tombol bergaya prangko perangko pos bertuliskan *"Lanjut Membaca..."* muncul dengan transisi *fade-in & bounce*.

#### Segmen 3: Tumpukan Polaroid Fisik (Flip & Throw Stack)
* **Visual:** 3–5 lembar foto polaroid bertumpuk dengan rotasi sudut acak (-4°, +3°, -2°). Tiap foto ditempel dengan selotip transparan (*washi tape*) di bagian atas.
* **Dua Mode Interaksi Sentuh:**
  1. **Tap to Flip:** Mengetuk foto akan memicu rotasi sumbu Y (`rotateY: 180deg`) menggunakan `transform-style: preserve-3d`. Bagian belakang foto berwarna kertas polaroid buram dengan stempel tanggal dan tulisan tangan pulpen biru dari Tatwa.
  2. **Drag & Throw (Swipe):** Menggeser foto dengan jari ke kiri/kanan. Jika tarikan melebihi ambang batas (*threshold 120px* atau kecepatan *velocity* tinggi), kartu akan melayang keluar layar (*exit animation*) dengan efek suara gesekan kertas halus (*paper swoosh SFX*), memperlihatkan foto berikutnya.

#### Segmen 4: Kamus Bahasa Kita (Pocket Dictionary of Us)
* **Visual:** Desain buku saku kecil bersampul kertas kraft dengan stempel *"Edisi Terbatas — Hanya Kita Berdua yang Tahu"*.
* **Interaksi:**
  - Berisi kartu-kartu kosakata seperti format kamus nyata:
    - Kata (fonetik pengucapan) / kelas kata (*n., v., adj.*).
    - Definisi resmi versi Tatwa & Adiba.
    - Contoh penggunaan dalam obrolan sehari-hari.
  - Kartu dapat di-expand/collapse dengan sentuhan lembut, disertai stiker doodle kecil lucu (misal: gambar kucing ngambek, cup kopi, dll.).

#### Segmen 5: Kaca Berembun (Foggy Glass Scratch-to-Reveal)
* **Visual:** Transisi warna layar menggelap menjadi malam biru slate temaram. Ada 3 bingkai kaca jendela berembun tebal dengan tetesan air tipis.
* **Teknologi:** HTML5 Canvas dengan `context.globalCompositeOperation = 'destination-out'`.
* **Interaksi:**
  - Jari pengguna bertindak seperti wiper yang menghapus lapisan embun dingin.
  - Jejak sentuhan jari meninggalkan jalur kaca bening mengilap, memancarkan percikan partikel embun halus, dan menampakkan tulisan kebiasaan kecil Adiba di balik kaca.
  - Sistem menghitung persentase piksel yang terhapus. Jika >50% embun terhapus, kaca otomatis bening sempurna dengan animasi kilau lembut.

#### Segmen 6: Voice Note & Chat Bubble Balasan Tatwa
* **Visual:** Pemutar pesan suara berbalut kartu kertas malam dengan gelombang audio (*scrubbing waveform*).
* **Alur Waktu Beruntun (*Strict Sequence*):**
  1. Adiba memutar VN 1. Audio suara asli Adiba mengalun jernih, BGM mereda ke 10%.
  2. Setelah audio selesai, tombol VN berhenti, dan muncul jeda hening selama 1 detik.
  3. Muncul indikator animasi: *"Tatwa sedang mengetik..."* dengan 3 titik memantul.
  4. Bubble chat balasan Tatwa yang usil, akrab, dan menghangatkan hati muncul dengan efek pegas (*spring pop-in*).
  5. Hanya setelah balasan Tatwa muncul, tombol Play untuk VN 2 menjadi aktif.

#### Segmen 7: Wishlist Rencana Tertunda (Torn Paper Note)
* **Visual:** Selembar kertas robek bergaris (*torn yellow legal pad*) yang sedikit kusut di tepinya, ditempel dengan isolasi kertas.
* **Konten:** Daftar rencana yang belum sempat terlaksana dengan kotak centang yang sengaja tidak dicentang (*unchecked*).
* **Suasana:** Hening dan tenang. Tidak ada interaksi rumit; memberi waktu bagi Adiba untuk membaca dan merasakan kedamaian di balik kenangan tersebut.

#### Segmen 8: Tiket Doa Masa Depan & Penutup (The Eternal Closure)
* **Visual Tiket Doa:**
  - Desain tiket pesawat / boarding pass vintage dengan garis sobekan perforasi, barcode estetik, dan cap stempel stempel pos:
    - **Nama Penumpang:** Adiba (Askiyaa)
    - **Penerbangan:** PILKOM-2025 ➔ Masa Depan Bahagia
    - **Status:** Valid Selamanya & Didoakan Tulus
* **Surat Terakhir:** Paragraf surat perpisahan yang tulus, dewasa, dan penuh rasa syukur atas waktu yang pernah terlewati bersama.
* **Momen "Tutup Lembaran":**
  - Di bawah surat terdapat tombol elegan beraksen emas tembaga: **"Tutup Lembaran"**.
  - Saat ditekan:
    1. Efek suara audio berhenti dengan klik lembut.
    2. Seluruh BGM meluruh perlahan (*smooth fade out*) menuju hening total.
    3. Lapisan putih mutlak (`#FFFFFF`) perlahan menutup seluruh layar selama 3 detik.
    4. Menyisakan teks tulisan tangan minimalis di titik tengah layar ponsel:
       > *"Berbahagialah. — Tatwa"*
    5. Halaman terkunci permanen (*freeze*); tidak dapat discroll ke atas atau berinteraksi lagi, memberikan momen penutupan yang damai dan sakral.
