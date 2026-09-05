# Product Requirements Document (PRD)
## The Scrapbook of Us (Hadiah Terakhir untuk Adiba)

---

### 1. Ringkasan Eksekutif & Misi Proyek
* **Judul Proyek:** *The Scrapbook of Us* (Digital Companion to Physical Scrapbook)
* **Pemberi:** Tatwa
* **Penerima:** Adiba (Askiyaa) — Mahasiswi Pilkom '25
* **Media Akses:** Single Page Web Application yang diakses melalui pemindaian QR Code di lembar terakhir scrapbook fisik.
* **Tujuan Utama:** Memberikan pengalaman perpisahan (*farewell gift*) yang manis, interaktif, menghangatkan hati, dan memberikan penutupan yang damai (*peaceful closure*). Proyek ini merayakan hal-hal baik yang pernah ada, tawa dan obrolan bersama, hingga doa tulus untuk masa depan Adiba tanpa rasa dendam atau paksaan.

---

### 2. Sasaran Pengguna & Konteks Penggunaan
* **Perangkat Utama:** Mobile Smartphone (iOS Safari & Android Chrome). Pengguna memindai QR Code langsung dari kamera ponsel.
* **Karakter Pengalaman:** 
  - Personal, privat, dan intim.
  - Berurutan secara terarah (*Strict Storybook Flow*), mengajak Adiba menyusuri kenangan tahap demi tahap tanpa melompati babak emosional.
  - Kaya akan interaksi sentuh fisik (menarik pita, membalik foto, mengusap embun kaca, mendengarkan suara asli).

---

### 3. Busur Emosional (The Emotional Arc)
Aplikasi ini dirancang mengikuti kurva narasi sinematik 8 babak:

| No | Segmen | Tema Babak | Resonansi Emosional |
|---|---|---|---|
| **1** | **Prolog (Pintu Masuk)** | Kotak Kado & Pita Satin | Rasa penasaran, kejutan, dan kehangatan awal. |
| **2** | **Soundtrack Perjalanan** | Mixtape Kaset Pita | Pembentukan suasana, memori musikal berdua. |
| **3** | **Tumpukan Memori** | Polaroid Interaktif & Catatan Balik | Nostalgia visual, manis, dan senyuman ringan. |
| **4** | **Kamus Bahasa Kita** | Inside Jokes & Kosakata Rahasia | Ceria, tawa lepas, mengingat kebiasaan konyol bersama. |
| **5** | **Hal-hal Kecil** | Kaca Berembun Malam Hari | Keintiman, mulai hangat, menatap hal-hal personal. |
| **6** | **Rekaman Tawa & Tanya** | Voice Note Nyata & Balasan Tatwa | Puncak emosi: mendengar suara asli Adiba & banter khas Tatwa. |
| **7** | **Rencana Tertunda** | Wishlist di Kertas Robek | Hening, reflektif, penerimaan hal-hal yang tak sempat terwujud. |
| **8** | **Penutup** | Tiket Doa & Tutup Lembaran | Pelepasan tulus, keikhlasan penuh, doa masa depan, dan ketenangan abadi. |

---

### 4. Rincian Fungsional 8 Segmen

#### Segmen 1: Prolog (Pintu Masuk)
* **Kondisi Awal:** Layar terkunci. Scrolling dinonaktifkan.
* **Komponen:** Ilustrasi kotak kado vintage dengan pita satin virtual bertuliskan *"Untuk Askiyaa, Pilkom 25"*.
* **Interaksi:** Pengguna menarik/menggeser pita kado (*drag/pull ribbon*).
* **Efek:**
  1. Pita terlepas, tutup kotak kado terangkat dengan animasi 3D spring.
  2. Letupan partikel confetti/kelopak bunga lembut memancar.
  3. Audio BGM (*gentle lo-fi ambient*) mulai mengalun lembut.
  4. Layar bergulir otomatis (*smooth scroll*) ke Segmen 2 dan membuka kunci scroll berikutnya.

#### Segmen 2: Soundtrack Perjalanan (Mixtape Kita)
* **Kondisi:** Menampilkan kaset pita vintage (*Cassette Tape*) berlabel *"Side A: Untuk Didengarkan"*.
* **Daftar Lagu:** 3–4 lagu bermakna dengan judul, artis, dan teks memori.
* **Interaksi:** Pengguna menekan tombol Play pada salah satu lagu.
* **Efek:**
  1. Roda kaset berputar secara realistis dengan animasi audio waveform.
  2. BGM utama otomatis mereda (*ducking*) saat lagu berbunyi.
  3. Teks memori pengiring muncul dengan efek mesin tik (*typewriter*).
  4. Memutar lagu baru otomatis menghentikan lagu sebelumnya (*mutual exclusivity*).
  5. Begitu minimal 1 lagu diputar, muncul tombol manis bertuliskan *"Lanjut Membaca..."* untuk membuka akses ke Segmen 3.

#### Segmen 3: Tumpukan Memori (Polaroid Interaktif)
* **Kondisi:** Tumpukan 3–5 lembar foto polaroid vintage dengan selotip washi tape.
* **Interaksi:**
  - **Swipe/Drag:** Pengguna bisa menggeser atau melempar foto teratas ke samping dengan fisika pegas (*spring physics*).
  - **Tap to Flip:** Pengguna dapat mengetuk foto untuk membalik ke sisi belakang (*back of polaroid*), menampilkan tanggal, tempat, dan catatan rahasia tulisan tangan Tatwa.
* **Efek:** Setelah foto teratas tergeser keluar layar, foto berikutnya terungkap beserta pembaruan teks memori di bawahnya. Setelah semua polaroid dilihat, tombol lanjut menuju Segmen 4 terbuka.

#### Segmen 4: Kamus Bahasa Kita (Inside Jokes)
* **Kondisi:** Tampilan buku saku kamus mini vintage dengan ornamen doodle lucu.
* **Konten:** 3–5 kosakata khas, panggilan unik, atau istilah konyol yang hanya dipahami oleh Tatwa dan Adiba.
* **Interaksi:** Pengguna membuka/mengetuk kartu definisi kamus untuk melihat contoh kalimat atau obrolan mereka.
* **Tujuan Emosional:** Menghadirkan tawa dan senyuman di antara mereka sebelum masuk ke babak malam yang lebih intim.

#### Segmen 5: Hal-hal Kecil (Kaca Berembun)
* **Kondisi:** Transisi visual memasuki suasana malam temaram (*moody midnight/rain*). Terdapat 3 panel kaca berembun dingin dengan teks instruksi *"Usap embun di layar..."*.
* **Interaksi:** Pengguna mengusapkan jarinya di atas kaca berembun (*scratch/wipe gesture*).
* **Efek:**
  1. Lapisan embun terhapus secara dinamis mengikuti jalur sentuhan jari via HTML5 Canvas.
  2. Muncul percikan partikel air/cahaya halus dan mengungkap tulisan kebiasaan kecil Adiba di baliknya (misal: *"Gayamu kalau lagi ngambek cuma balas 'Y'"*).
  3. Setelah ketiga kaca berembun dibersihkan, gerbang ke Segmen 6 terbuka.

#### Segmen 6: Rekaman Tawa & Tanya (Voice Note & Balasan Tatwa)
* **Kondisi:** Suasana malam hening dengan sorot lampu meja hangat.
* **Mekanisme Beruntun (*Sequential Chat/Player*):**
  1. Awalnya hanya tombol Play VN 1 (suara asli Adiba) yang aktif.
  2. Pengguna menekan Play VN 1. BGM mereda, suara asli Adiba terdengar.
  3. Saat VN selesai berputar, muncul jeda 1 detik dengan indikator *"Tatwa sedang mengetik..."* (`...`).
  4. Balasan teks Tatwa yang personal, lucu, dan hangat muncul dalam bentuk bubble obrolan (balasan imajiner seolah-olah Tatwa membalas saat itu juga).
  5. Setelah balasan Tatwa tampil, barulah tombol Play VN berikutnya terbuka.

#### Segmen 7: Rencana Tertunda (Wishlist Kertas Robek)
* **Kondisi:** Kertas robek bergaris (*torn memo paper*) dengan nuansa fajar meluruh.
* **Konten:** Daftar rencana dan impian yang belum sempat terwujud (nonton konser, jalan sore, dll.).
* **Interaksi:** Scroll santai tanpa paksaan tombol rumit. Kotak centang dibiarkan kosong (*unchecked*) dengan tulisan catatan kecil di tepi kertas (*"Mungkin di semesta lain"*). Memberikan ruang jeda hening dan penerimaan.
* **Aksi:** Tombol di bagian bawah *"Buka Lembaran Terakhir"* mengarahkan ke segmen puncak.

#### Segmen 8: Penutup (Tiket Doa Masa Depan & Tutup Lembaran)
* **Kondisi:** Suasana fajar cerah yang bersih dan hangat, melambangkan awal baru bagi Adiba.
* **Konten:**
  1. Surat singkat ucapan terima kasih dan pelepasan yang damai dari Tatwa.
  2. **Tiket Doa Masa Depan:** Desain tiket penerbangan/boarding pass vintage bernomor penerbangan khusus dengan rute menuju kebahagiaan dan kelancaran kuliah di Pilkom '25 (berlaku selamanya).
  3. Tombol sakral: **"Tutup Lembaran"**.
* **Interaksi & Ending:**
  - Pengguna menekan tombol "Tutup Lembaran".
  - Efek suara audio kaset berhenti (*tape stop*), seluruh BGM memudar perlahan (*fade out* ke hening total).
  - Seluruh antarmuka layar memudar ke putih bersih mutlak (*pure whiteout*), hanya menyisakan satu kalimat di tengah layar:
    > *"Berbahagialah. — Tatwa"*
  - Halaman terkunci permanen (tidak dapat discroll atau ditekan lagi tanpa me-refresh halaman).

---

### 5. Kebutuhan Non-Fungsional & Kriteria Kualitas
1. **Mobile-First Touch Precision:** Optimal di layar ponsel 360px – 430px (iPhone & Android modern).
2. **Audio Autoplay Compliance:** Autoplay BGM baru aktif setelah interaksi pertama pengguna di Segmen 1 (menarik pita kado), memenuhi standar browser modern (iOS WebKit & Android Chrome).
3. **Smooth 60fps Performance:** Canvas scratch dan gesture swipe Framer Motion tidak boleh lag atau patah-patah di HP.
4. **Data Isolation:** Seluruh konten (lagu, foto, VN, teks memori) dikonsolidasikan dalam `src/data/scrapbookData.js` sehingga mudah diperbarui.
