# Transisi Interaktif Segmen 7 ke Segmen 8 (Sobek Garis Perforasi Tiket) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menggantikan tombol digital konvensional di Segmen 7 dengan stub tiket Boarding Pass yang tersambung melalui garis perforasi interaktif yang dapat disobek manual (`drag="x"`) sebagai jembatan fisik menuju Segmen 8 tanpa jeda/rotasi 3D.

**Architecture:** 
- Di Segmen 7 (`Segment7Wishlist.js`), stub Boarding Pass terpasang di bawah kertas wishlist dengan garis putus-putus berlubang perforasi. Slider tab bergerigi diseret secara horizontal untuk merobek tiket secara progresif dengan efek audio `ticket-tear`.
- Di `page.js`, ditambahkan transisi langsung `isDirectBoardingPassTransition` yang meniadakan efek 3D flip dan fade out.
- Di Segmen 8 (`Segment8Closing.js`), layout dipusatkan (`my-auto`) dan Boarding Pass memiliki tepian atas berpori/bergerigi tanda baru saja disobek.

**Tech Stack:** Next.js 16 (App Router), React 19, Framer Motion, Tailwind CSS, Lucide React, HTML5 Audio Provider.

## Global Constraints
- Zero-Button Policy: Tidak boleh menggunakan tombol `<button>` untuk transisi antar-segmen.
- Tanpa Web Verify: Pengujian dilakukan via `npm run build` dan manual testing pengguna (NO `browser_subagent`).
- Centered Mobile Layout: Seluruh elemen berorientasi tengah (`my-auto`, `max-w-[340px]`).

---

### Task 1: Update Transisi Handoff di `src/app/page.js`
**Files:**
- Modify: `src/app/page.js:48-140`

- [ ] **Step 1: Tambahkan `isDirectBoardingPassTransition`**
Tambahkan deklarasi:
```javascript
  const isDirectBoardingPassTransition =
    (prevSegment === 7 && currentSegment === 8);
```
Dan gabungkan ke dalam `isMorphTransition`:
```javascript
  const isMorphTransition =
    isDirectPaperTransition ||
    isDirectBoardingPassTransition ||
    (prevSegment === 1 && currentSegment === 2) ||
...
```
Pastikan `Segment7Wishlist` memanggil `goToNextSegment(8, true)`.

- [ ] **Step 2: Jalankan build test**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**
Run: `git commit -m "feat(transition): add isDirectBoardingPassTransition in page.js"`

---

### Task 2: Implementasi Garis Perforasi & Tab Sobek di `Segment7Wishlist.js`
**Files:**
- Modify: `src/components/segments/Segment7Wishlist.js`

- [ ] **Step 1: Hapus tombol dan tambahkan Boarding Pass Stub dengan Tear Slider**
Gantikan `<motion.button>` di bagian bawah dengan komponen:
- Garis perforasi SVG dengan lubang jarum putus-putus (`- - - ✂️ - - -`).
- Tab sobekan kertas merah bergigi dengan `drag="x"`, batasan `dragConstraints={{ left: 0, right: 220 }}`.
- Umpan balik robekan visual dinamis: tiket sedikit melengkung ke bawah saat robekan berjalan.
- Audio trigger: memutar `playSfx("ticket-tear")` saat disobek dan `playSfx("paper-swoosh")` saat terlepas.
- Begitu robekan >= 75%, jalankan animasi pelepasan tiket ke tengah layar dan panggil `onComplete()`.

- [ ] **Step 2: Jalankan build test**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**
Run: `git commit -m "feat(segment-7): implement interactive perforated tear boarding pass stub"`

---

### Task 3: Sinkronisasi Tepian Tiket & Centering di `Segment8Closing.js`
**Files:**
- Modify: `src/components/segments/Segment8Closing.js`

- [ ] **Step 1: Pusatkan layout dan berikan tepian robekan perforasi pada kartu Boarding Pass**
- Ubah wrapper `min-h-screen justify-between` menjadi terpusat (`my-auto`, `max-w-[340px]`).
- Tambahkan aksen tepian atas bergerigi perforasi pada kartu Boarding Pass agar selaras dengan sobekan dari Segmen 7.

- [ ] **Step 2: Jalankan build test**
Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Commit**
Run: `git commit -m "feat(segment-8): center layout and align perforated ticket edge"`
