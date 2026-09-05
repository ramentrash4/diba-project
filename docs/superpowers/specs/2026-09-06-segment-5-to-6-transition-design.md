# Design Specification: Transisi Interaktif Segmen 5 ke Segmen 6 (Audio Jack Plug-In)

## 1. Latar Belakang & Tujuan
Menghadirkan transisi fisik yang nyata dan berkesan antara **Segmen 5 (Hal-hal Kecil / Kaca Berembun)** menuju **Segmen 6 (Rekaman Suara / Voice Notes)** tanpa menggunakan tombol standar dan tanpa gestur klik/slide biasa. Objek fisik yang relevan dengan tema audio (kabel earphone vintage dan colokan jack audio 3.5mm) akan hadir di ambang meja kafe Segmen 5 untuk diinteraksikan langsung oleh pengguna sebagai jembatan fisik menuju Segmen 6.

## 2. Alur Pengalaman Pengguna (User Experience)

1. **Segmen 5 (Kaca #1 & #2)**:
   - Pengguna mengusap embun dingin hingga teks memori terbuka.
   - Pesan dibaca dengan santai tanpa dibatasi timer.
   - Pengguna mengetuk kaca untuk mengalirkan uap dingin ke jendela berikutnya (*Re-Frosting*).

2. **Segmen 5 (Kaca #3 - Hal Kecil Terakhir)**:
   - Pengguna mengusap embun Kaca #3 hingga bersih.
   - Di bagian bawah bingkai/meja kusen kafe, muncul kompartemen meja kayu kafe yang menampilkan:
     - **Kabel Earphone Vintage**: Kabel meliuk dengan kepala colokan jack 3.5mm berlapis kuningan dan label kecil bertuliskan *"Dengarkan suaraku... 🎧"*.
     - **Port Audio 3.5mm**: Lubang colokan bundar beraksen kuningan vintage dengan pendar cahaya halus (*subtle pulse*).
   - Panduan di bawah bingkai: `"🎧 Tarik colokan jack dan masukkan ke lubang audio"`.

3. **Interaksi Fisik (Drag to Plug-In)**:
   - Pengguna menyentuh dan menyeret kepala jack audio (`drag="x, y"` dengan batasan realistis).
   - Kabel earphone meliuk secara visual mengikuti posisi koordinat drag jack audio.
   - Ketika kepala jack didekatkan dalam radius < 30px dari lubang port:
     - Jack otomatis *snap* dan menancap ke dalam port audio.
     - Efek Audio: Bunyi klik logam colokan audio (`clasp-open`) dan dengung/desis statis headset analog.
     - Efek Visual: Lampu port menyala hijau/amber cerah, dan gelombang suara (*waveform ripple*) memancar keluar dari titik colokan.

4. **Transisi ke Segmen 6 (Voice Notes)**:
   - Suasana malam kafe berembun menyatu secara mulus ke antarmuka Segmen 6.
   - Di Segmen 6, kabel earphone tersebut tampak terhubung langsung ke pemutar rekaman suara Adiba & Tatwa, menciptakan kesinambungan visual yang utuh.

## 3. Komponen Teknis & State Management

### A. State di Segmen 5 (`Segment5KacaEmbun.js`):
- `isPluggedIn`: boolean (true saat jack berhasil dicolokkan ke port audio).
- `jackPosition`: koordinat relatif { x, y } untuk interpolasi kabel SVG.
- `showEarphoneDock`: boolean (true saat `activeTab === 2` dan `clearedTabs[2] === true`).

### B. Visual & SVG Rendering:
- **Kabel Fleksibel**: Menggunakan elemen SVG `<path d="M ... Q ... C ..." />` yang merender garis lengkung fleksibel dari titik pangkal kabel ke kepala jack audio yang sedang ditarik.
- **Kepala Jack Audio**: Komponen `<motion.div drag ...>` dengan siluet colokan jack 3.5mm bertekstur logam kuningan bergaris isolator hitam.
- **Port Audio Target**: Komponen bundar dengan cincin logam luar dan lubang hitam pekat di tengahnya, dilengkapi indikator pendar magnetik.

### C. Fallback & Aksesibilitas:
- Rentang deteksi *snap* toleran (radius 35px) agar mudah dilakukan pada layar sentuh smartphone.
- Drag didukung di desktop (mouse) maupun mobile (touch) secara responsif.
