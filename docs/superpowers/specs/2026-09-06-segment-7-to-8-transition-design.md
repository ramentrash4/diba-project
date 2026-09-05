# Design Specification: Transisi Interaktif Segmen 7 ke Segmen 8 (Sobek Garis Perforasi Tiket Boarding Pass)

## 1. Latar Belakang & Filosofi Naratif
Menghubungkan secara emosional dan fisik dua artefak utama:
- **Segmen 7 (Rencana Tertunda / Wishlist Kertas Kuning)**: Catatan impian masa lalu yang belum sempat terwujud bersama Tatwa.
- **Segmen 8 (Tiket Doa Masa Depan / Boarding Pass)**: Tiket penerbangan resmi dan doa abadi Tatwa untuk masa depan Adiba.

Sesuai aturan ketat proyek:
- **Zero-Button Policy**: Meniadakan tombol digital konvensional (`<motion.button>`).
- **Physical Metaphor**: Tiket Boarding Pass sudah terpasang menyatu di bagian bawah kertas *legal pad* melalui **garis perforasi bergerigi** (*perforated tear line*).
- **Tactile Progression**: Pengguna menyobek tiket tersebut secara manual untuk membawanya terbang ke lembaran penutup.

---

## 2. Alur Pengalaman Pengguna (User Experience)

### A. Tampilan Awal di Segmen 7 (Wishlist):
1. Pengguna membaca dan mengetuk item *wishlist* untuk melihat catatan refleksi tulisan tangan biru Tatwa.
2. Di bagian bawah lembaran kuning *legal pad*, tampak **Tiket Boarding Pass Merah-Marun** yang masih tersambung kuat ke kertas kuning melalui **Garis Perforasi Putus-putus** (`- - - ✂️ - - -`).
3. Pada sisi kiri garis perforasi, terdapat **Tab Sobekan Kertas Bergigi (*Tear Tab*)** dengan aksen merah dan teks panduan:
   `✂️ Geser untuk merobek tiket penerbangan ➔`

### B. Interaksi Sobek Perforasi (Slide to Tear):
1. Pengguna meletakkan jari pada tab sobekan dan **menggesernya dari kiri ke kanan (`drag="x"`)**.
2. **Umpan Balik Real-Time**:
   - Garis perforasi terbelah secara visual mengikuti posisi jari pengguna (menyingkap tepian kertas robek bergerigi).
   - Tiket bagian bawah mulai melengkung/turun sedikit (*detached angle*) seiring bertambahnya robekan.
   - Efek Audio: Bunyi gemeretak robekan kertas perforasi renyah beruntun (`ticket-tear`).
3. **Pelepasan Penuh (Tear Completion)**:
   - Begitu tab digeser melampaui 75% lebar kertas (atau diayun cepat):
     - Tiket terlepas sepenuhnya dari kertas kuning *wishlist*.
     - Efek audio sobekan final (`ticket-tear`) dan desau kertas melayang (`paper-swoosh`).
     - Lembaran kuning *wishlist* meluncur naik keluar layar secara halus.
     - Tiket Boarding Pass yang terlepas melayang ke posisi tengah layar, membesar dan membentang menjadi kartu Boarding Pass utama Segmen 8.

---

## 3. Komponen Teknis & Integrasi

### A. State Management di `Segment7Wishlist.js`:
- `tearProgress`: persentase robekan (0 hingga 100).
- `isTorn`: boolean (true saat robekan mencapai >= 75%).
- `isTransitioning`: boolean (mengunci interaksi dan menjalankan animasi transisi).

### B. Elemen Visual & Animasi:
- **Garis Perforasi (SVG Pattern)**: Garis putus-putus dengan lubang bulat kecil (*punched holes*) dan ikon gunting kecil di awal garis.
- **Tear Tab Slider**: Kotak tab fisik dengan tekstur kertas tebal yang dapat diseret secara horizontal (`drag="x"`, `dragConstraints={{ left: 0, right: 240 }}`).
- **Preview Boarding Pass Stub**:
  - Warna merah marun khas maskapai (`bg-[#8C3E2D]`).
  - Barcode simbolis dan rute: `PILKOM '25 ➔ Masa Depan Bahagia ✨`.
  - Nama penumpang: `Askiyaa Adiba`.

### C. Handoff ke Segmen 8 (`page.js` & `Segment8Closing.js`):
- Di `src/app/page.js`:
  - Menambahkan `isDirectBoardingPassTransition = (prevSegment === 7 && currentSegment === 8)`.
  - Meniadakan efek fade-out, scale-down, dan rotasi buku 3D untuk transisi 7 ➔ 8.
- Di `src/components/segments/Segment8Closing.js`:
  - Kartu Boarding Pass memiliki tepian atas bergerigi halus (*perforated top edge*), membuktikan bahwa ini adalah tiket yang baru saja disobek dari Segmen 7.

---

## 4. Aksesibilitas & Responsivitas Mobile
- Area sentuh (*touch target*) tab sobekan berukuran minimal 44x44px.
- Mendukung *gesture drag* horizontal dengan *elastic bounce* jika dilepas sebelum 75%.
- Responsif pada semua ukuran layar smartphone Android/iOS tanpa terpotong.
