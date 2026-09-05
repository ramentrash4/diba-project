# Spesifikasi Desain: Segmen 8 Penutup & Ritual Segel Lilin (Closing Ritual & Wax Seal)

## 1. Ringkasan & Tujuan
Spesifikasi ini mendefinisikan perbaikan menyeluruh pada **Segmen 8 (Tiket Doa & Penutup)** untuk menciptakan pengalaman penutup yang sakral, puitis, dan sepenuhnya berorientasi pada interaksi fisik (*tactile physical gestures*):
1. **Surat Tidak Langsung Keluar**: Menampilkan tiket Boarding Pass terlebih dahulu di tengah layar secara mandiri, dengan ujung amplop surat terlipat di bawahnya yang harus ditarik oleh pengguna untuk membuka surat.
2. **Ritual Tutup Lembaran Tanpa Tombol (*Zero-Button Policy*)**: Menghapus tombol digital `<motion.button>` dan menggantinya dengan **Gagang Stempel Lilin Kuningan (*Brass Wax Stamp*)** yang diseret ke atas pita merah untuk menyegel lembaran kenangan selamanya.
3. **Pemusatan Optik & Kerapatan Mobile (*Optical Centering & Density*)**: Seluruh elemen terpusat di zona tengah layar ponsel (`my-auto`, `max-w-[345px] sm:max-w-[355px]`, tinggi ~380px–420px) dengan ruang bernapas visual yang seimbang di atas dan bawah, tanpa pemborosan ruang dan tanpa teks mikro yang sulit dibaca.

---

## 2. Alur Pengalaman Pengguna (Multi-Stage Journey)

### Tahap 1: Tiket Boarding Pass & Tab Tarik Surat (`currentStage === 'ticket'`)
- **Posisi Layar**: Berada tepat di tengah layar (`my-auto`).
- **Artefak Tiket**:
  - Kartu Boarding Pass First Class bertepian atas bergerigi perforasi (hasil robekan dari Segmen 7).
  - Header marun: `BOARDING PASS • FIRST CLASS`, nomor penerbangan `PILKOM-2025`.
  - Data tiket:
    - Penumpang: `Adiba (Askiyaa)`
    - Rute: `PILKOM '25 ➔ Masa Depan Bahagia ✨`
    - Kursi: `No. 1 di Ceritamu Sendiri`
    - Status: `Valid Selamanya`
    - Barcode estetis di kaki tiket.
- **Tab Lipatan Surat Tersembunyi**:
  - Di bawah tiket, terselip tab amplop surat bergaris emas:
    `💌 Tarik lipatan surat ke bawah ⬇️`
- **Interaksi Fisik**:
  - Pengguna menyeret tab ke bawah (`drag="y"`, `dragConstraints={{ top: 0, bottom: 90 }}`).
  - Saat diseret melewati batas (> 40px):
    - Efek suara `paper-swoosh` diputar.
    - Tiket meluncur halus ke atas/belakang.
    - Lembaran Surat Tatwa terbentang mulus ke tengah layar (`currentStage = 'letter'`).
- **Petunjuk Sentuh Tunggal**:
  - `💌 Tarik tab surat ke bawah untuk membuka pesan terakhir Tatwa`

---

### Tahap 2: Surat Tulisan Tangan Tatwa (`currentStage === 'letter'`)
- **Posisi Layar**: Terpusat di tengah layar menggantikan posisi tiket.
- **Kartu Surat Parchment**:
  - Latar kertas halus `#FFFDF8` dengan *paper shadow* realistis.
  - Header: `Surat Perpisahan & Doa ✍️` berhiaskan ikon hati merah.
  - Isi surat:
    - Kutipan refleksi: `"{closing.letter}"` (`font-handwriting text-[15.5px] sm:text-[17px] leading-relaxed text-[#140E0A]`).
    - Doa masa depan: `"{closing.prayer}"` (`font-handwriting text-[14.5px] sm:text-[15.5px] text-[#1E3A8A] leading-relaxed border-t border-[#F0E6CE] pt-2`).
    - Tanda tangan penutup: `Berbahagialah. — Tatwa` (`font-handwriting text-lg font-black text-right pt-1`).

---

### Tahap 3: Ritual Tutup Lembaran (Cap Segel Lilin Emas)
- **Dock Segel Lilin**:
  - Terletak di kaki surat:
    - Sisi Kiri: **Gagang Stempel Lilin Kuningan** (`drag="x"`).
    - Sisi Kanan: **Pita Sutra Merah & Bulatan Lilin Hangat**.
- **Interaksi Fisik Penutup**:
  - Pengguna menyeret stempel ke kanan menuju bulatan lilin (`dragConstraints={{ left: 0, right: 140 }}`).
  - Saat stempel berada di atas bulatan lilin (> 55%):
    - Stempel mengunci ke lilin (*snap*).
    - Suara debum stempel logam dan retakan lilin (`clasp-open` + `tape-click`).
    - Cap emas berukir bintang/monogram memancar pendar hangat (*golden wax seal*).
  - Petunjuk sentuh berubah: `🔒 Lembaran tersegel abadi... Menutup kenangan.`
  - Setelah 750ms, memicu `onFinalLock()`.
- **Transisi Whiteout Abadi**:
  - Layar memutih perlahan selama 2.2 detik.
  - Muncul teks puitis tulisan tangan: `Berbahagialah. — Tatwa`.

---

## 3. Standar Keterbacaan & Komposisi Mobile
- **Ukuran Font**:
  - Label micro: `8.5px` mono uppercase tracking-wider.
  - Teks data tiket: `12.5px – 13px` font-black.
  - Teks surat: `15.5px – 17px` handwriting.
  - Judul segmen: `24px – 26px` handwriting font-black.
- **Target Sentuh**:
  - Tab surat: tinggi 36px, lebar penuh.
  - Gagang stempel: tinggi 38px, lebar 48px, ramah jempol.
- **Strict Zero-Button**: Tidak ada tag `<button>` di seluruh komponen.
