"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Camera,
  BookOpen,
  Heart,
  Paperclip,
} from "lucide-react";
import Image from "next/image";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment3Polaroid({ onComplete }) {
  const { playSfx } = useAudio();
  const polaroids = scrapbookData.polaroids;

  // Indeks foto polaroid teratas saat ini
  const [currentIndex, setCurrentIndex] = useState(0);

  // Status kartu apakah sedang dibalik (3D flip ke catatan belakang)
  const [isFlipped, setIsFlipped] = useState(false);

  // Arah lemparan kartu saat di-drag keluar (-1: kiri, 1: kanan)
  const [exitX, setExitX] = useState(0);

  // Status apakah pengguna sudah melihat seluruh foto
  const [hasFinishedAll, setHasFinishedAll] = useState(false);

  // Fallback map untuk gambar lokal jika file JPG belum dimasukkan Tatwa
  const getPhotoSrc = (photo, idx) => {
    // Jika ada file JPG asli, gunakan. Jika tidak, gunakan SVG mockup estetik
    return `/images/polaroids/photo${idx + 1}.svg`;
  };

  // Toggle 3D flip card
  const handleToggleFlip = (e) => {
    if (e) e.stopPropagation();
    playSfx("card-flip");
    setIsFlipped((prev) => !prev);
  };

  // Geser ke foto berikutnya (Throw card)
  const handleNextPhoto = (direction = 1) => {
    playSfx("paper-swoosh");
    setExitX(direction * 400);
    setIsFlipped(false);

    setTimeout(() => {
      setExitX(0);
      if (currentIndex + 1 < polaroids.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setHasFinishedAll(true);
      }
    }, 220);
  };

  // Kembali ke foto sebelumnya
  const handlePrevPhoto = () => {
    if (currentIndex > 0) {
      playSfx("paper-swoosh");
      setIsFlipped(false);
      setHasFinishedAll(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Reset putar ulang tumpukan foto dari awal
  const handleResetStack = () => {
    playSfx("paper-swoosh");
    setIsFlipped(false);
    setHasFinishedAll(false);
    setCurrentIndex(0);
  };

  const currentPhoto = polaroids[currentIndex];

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-3.5 py-4 select-none relative overflow-hidden">
      
      {/* 1. HEADER SEGMEN: JUDUL TULISAN TANGAN & INDIKATOR COUNTER */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center mt-1 z-20">
        <div className="relative inline-block mb-1">
          <WashiTape color="sage" angle={-1.5} className="absolute -top-3 left-1/2 -translate-x-1/2" />
          <h2 className="font-handwriting text-2xl sm:text-3xl text-[#140E0A] font-black tracking-wide pt-1">
            Tumpukan Memori 📸
          </h2>
        </div>

        <p className="font-typewriter text-[11px] sm:text-xs text-[#5A4839] font-bold">
          Foto-foto yang tersimpan rapi di sela hari kita.
        </p>

        {/* Counter Badge Pill & Dots */}
        {!hasFinishedAll && (
          <div className="mt-2 flex items-center gap-2 bg-[#EFE4D6]/90 px-3 py-1 rounded-full border border-[#D5C7B5] shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#8C3E2D]" />
            <span className="font-mono text-[10.5px] font-black text-[#2E2016]">
              Foto 0{currentIndex + 1} / 0{polaroids.length}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {polaroids.map((_, i) => (
                <span
                  key={`dot-${i}`}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-[#8C3E2D] w-3"
                      : i < currentIndex
                      ? "bg-[#A8947E]"
                      : "bg-[#D5C7B5]"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. TUMPUKAN KARTU POLAROID FISIK REALISTIS */}
      <div className="w-full max-w-[325px] sm:max-w-[340px] h-[375px] sm:h-[395px] relative flex items-center justify-center my-auto z-10">
        
        {/* KONDISI A: PENGGUNA SUDAH MENYELESAIKAN SEMUA FOTO (KARTU PENUTUP SEGMEN 3) */}
        {hasFinishedAll ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full bg-[#FFFDF8] border-2 border-[#D8C7B0] rounded-2xl p-5 shadow-2xl text-center flex flex-col items-center justify-between relative paper-shadow"
          >
            <WashiTape color="rose" angle={1.5} className="absolute -top-3 left-1/2 -translate-x-1/2" />
            
            <div className="w-12 h-12 rounded-full bg-[#FAF1E6] border border-[#D5C7B5] flex items-center justify-center text-[#8C3E2D] shadow-inner mb-2 mt-1">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <span className="font-typewriter text-[10px] uppercase tracking-wider text-[#8C3E2D] font-black bg-[#FAF0E6] px-2 py-0.5 rounded border border-[#E8DACB]">
                Semua Memori Terbuka ✨
              </span>
              <h3 className="font-handwriting text-2xl text-[#140E0A] font-black">
                Terima kasih sudah mengingatnya.
              </h3>
              <p className="font-sans-ui text-xs text-[#5A4839] font-bold leading-relaxed px-2">
                Setiap foto punya lagunya sendiri, dan setiap cerita punya bahasa khususnya.
              </p>
            </div>

            {/* Tombol Aksi Utama: Lanjut ke Kamus Bahasa Kita */}
            <div className="w-full space-y-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={onComplete}
                className="w-full h-11 rounded-xl bg-[#8C3E2D] hover:bg-[#773324] text-white font-sans-ui text-xs sm:text-[13px] font-black shadow-lg flex items-center justify-center gap-2 border border-[#6B281A] cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka Kamus Bahasa Kita 📖</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>

              <button
                onClick={handleResetStack}
                className="w-full h-9 rounded-lg bg-[#EFE6D8] hover:bg-[#E4D7C4] text-[#3D2E1F] font-sans-ui text-[11px] font-black flex items-center justify-center gap-1.5 border border-[#CBB69E] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Buka & Lihat Foto Lagi ↺</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* KONDISI B: TUMPUKAN FOTO AKTIF (FLIP & THROW) */
          <div className="w-full h-full relative flex items-center justify-center">
            
            {/* Foto-foto di Bawah (Shadow Stack Effect) */}
            {polaroids.slice(currentIndex + 1, currentIndex + 3).map((subPhoto, subIdx) => {
              const depth = subIdx + 1;
              return (
                <div
                  key={`sub-${subPhoto.id}`}
                  style={{
                    transform: `translateY(${depth * 7}px) scale(${1 - depth * 0.04}) rotate(${
                      subPhoto.rotation * 0.8
                    }deg)`,
                    zIndex: 10 - depth,
                  }}
                  className="absolute w-[275px] sm:w-[290px] h-[350px] sm:h-[365px] bg-[#FFFDF8] rounded-sm p-3 border border-[#D5C7B5] shadow-lg pointer-events-none opacity-90 transition-transform"
                >
                  <div className="w-full h-[215px] sm:h-[230px] bg-[#EBE0D2] rounded-xs relative overflow-hidden opacity-50" />
                </div>
              );
            })}

            {/* FOTO TERATAS AKTIF (DAPAT DI-DRAG, DI-SWIPE, & DI-FLIP) */}
            <AnimatePresence custom={exitX}>
              <motion.div
                key={currentPhoto.id}
                layoutId={currentIndex === 0 ? "shared-polaroid-lead" : undefined}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 80 || info.velocity.x > 300) {
                    handleNextPhoto(1);
                  } else if (info.offset.x < -80 || info.velocity.x < -300) {
                    handleNextPhoto(-1);
                  }
                }}
                animate={{
                  x: exitX,
                  rotate: isFlipped ? 0 : currentPhoto.rotation,
                  opacity: exitX !== 0 ? 0 : 1,
                  scale: 1,
                }}
                exit={{
                  x: exitX,
                  opacity: 0,
                  rotate: exitX > 0 ? 18 : -18,
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="absolute w-[275px] sm:w-[290px] h-[350px] sm:h-[365px] cursor-grab active:cursor-grabbing z-20"
                style={{ perspective: "1000px" }}
              >
                {/* INNER 3D CONTAINER FOR FLIP */}
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative"
                >
                  {/* ============================================================ */}
                  {/* SISI DEPAN: FOTO POLAROID REALISTIS + TULISAN TANGAN CAPTION */}
                  {/* ============================================================ */}
                  <div
                    onClick={handleToggleFlip}
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0 bg-[#FFFDF8] rounded-sm p-3 pb-3.5 border border-[#D5C7B5] shadow-2xl flex flex-col justify-between select-none group"
                  >
                    {/* Washi Tape di Pojok Atas */}
                    <WashiTape
                      color={currentIndex % 2 === 0 ? "mustard" : "rose"}
                      angle={currentIndex % 2 === 0 ? -2 : 2}
                      className="absolute -top-3 left-6 z-30 pointer-events-none"
                    />

                    {/* Area Foto Polaroid Glossy */}
                    <div className="w-full h-[215px] sm:h-[230px] bg-[#1E1712] rounded-xs relative overflow-hidden border border-black/20 shadow-inner">
                      <Image
                        src={getPhotoSrc(currentPhoto, currentIndex)}
                        alt={currentPhoto.frontCaption}
                        fill
                        className="object-cover"
                        sizes="(max-width: 412px) 270px, 300px"
                        priority={currentIndex === 0}
                      />

                      {/* Kilau Permukaan Foto Glossy */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                        }}
                      />

                      {/* Stempel Tanggal Vintage di Sudut Foto */}
                      <span className="absolute bottom-1.5 right-1.5 font-typewriter text-[9.5px] font-bold text-[#FAF5EC] bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded shadow">
                        {currentPhoto.date}
                      </span>
                    </div>

                    {/* Bagian Bawah Kertas Polaroid: Tulisan Tangan Caption */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center px-1 pt-2 pb-0.5">
                      <p className="font-handwriting text-base sm:text-[18px] text-[#140E0A] font-black leading-tight">
                        "{currentPhoto.frontCaption}"
                      </p>
                      
                      {/* Hint Balik Foto */}
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-sans-ui text-[#7A6757] font-bold">
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Ketuk foto untuk baca catatan belakang ✍️</span>
                      </div>
                    </div>
                  </div>

                  {/* ============================================================ */}
                  {/* SISI BELAKANG: KERTAS VINTAGE + CATATAN TULISAN TANGAN TATWA */}
                  {/* ============================================================ */}
                  <div
                    onClick={handleToggleFlip}
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 bg-[#FDF7EB] rounded-sm p-4 sm:p-4.5 border-2 border-[#D8C7B0] shadow-2xl flex flex-col justify-between select-none"
                  >
                    {/* Header Sisi Belakang: Cap Pos & Tanggal */}
                    <div className="flex items-center justify-between border-b border-[#E0D2C0] pb-2">
                      <div className="flex items-center gap-1 text-[#8C3E2D]">
                        <Paperclip className="w-3.5 h-3.5" />
                        <span className="font-mono text-[9.5px] font-black uppercase tracking-wider">
                          ARCHIVE MEMO • {currentIndex + 1}
                        </span>
                      </div>
                      <span className="font-typewriter text-[9.5px] text-[#5A4839] font-bold">
                        {currentPhoto.date}
                      </span>
                    </div>

                    {/* Pesan Tulisan Tangan Tinta Biru Pulpen Tatwa */}
                    <div className="flex-1 flex flex-col justify-center py-2 text-left">
                      <p className="font-handwriting text-[17px] sm:text-[19px] text-[#1E3A8A] font-black leading-relaxed">
                        "{currentPhoto.backNote}"
                      </p>
                    </div>

                    {/* Tanda Tangan & Tombol Balik Kembali */}
                    <div className="border-t border-[#E0D2C0] pt-2 flex items-center justify-between">
                      <span className="font-handwriting text-sm text-[#1E3A8A] font-bold">
                        — Tatwa ✨
                      </span>
                      <button
                        onClick={handleToggleFlip}
                        className="h-7 px-2 rounded bg-[#EFE4D6] hover:bg-[#E5D7C5] text-[#3D2E1F] font-sans-ui text-[10px] font-black flex items-center gap-1 border border-[#D5C7B5] cursor-pointer"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Balik ke foto</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. PANEL TOMBOL NAVIGASI & KONTROL ERGONOMIS (TOUCH TARGET >= 40PX) */}
      {!hasFinishedAll && (
        <div className="w-full max-w-[340px] flex flex-col items-center gap-2 mb-1 z-20">
          {/* Tombol Aksi Sentuh (Balik Kartu & Foto Berikutnya) */}
          <div className="w-full flex items-center justify-between gap-2 px-1">
            {/* Tombol Sebelumnya (Opsional jika bukan foto pertama) */}
            {currentIndex > 0 ? (
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handlePrevPhoto}
                className="h-10 px-3 rounded-xl bg-[#FFFDF8] hover:bg-[#F5ECE0] text-[#3D2E1F] border border-[#C5B49E] font-sans-ui text-xs font-black shadow-2xs flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </motion.button>
            ) : (
              <div className="w-20" />
            )}

            {/* Tombol Balik Kartu Tengah */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={handleToggleFlip}
              className={`h-10 px-4 rounded-xl font-sans-ui text-xs font-black shadow-md flex items-center gap-1.5 border cursor-pointer transition-colors ${
                isFlipped
                  ? "bg-[#3D2E1C] text-amber-200 border-amber-500/60 hover:bg-[#4E3B24]"
                  : "bg-[#FFFDF8] hover:bg-[#F5ECE0] text-[#140E0A] border-[#C5B49E]"
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFlipped ? "Lihat Foto Depan" : "Balik Kartu ✍️"}</span>
            </motion.button>

            {/* Tombol Foto Berikutnya / Geser */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => handleNextPhoto(1)}
              className="h-10 px-3.5 rounded-xl bg-[#8C3E2D] hover:bg-[#773324] text-white border border-[#6B281A] font-sans-ui text-xs font-black shadow-md flex items-center gap-1 cursor-pointer"
            >
              <span>{currentIndex + 1 === polaroids.length ? "Selesai" : "Foto Berikutnya"}</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Teks Bantuan / Hint Ergonomis */}
          <div className="flex items-center gap-1.5 text-[#5A4839] font-sans-ui text-[10.5px] font-bold mt-0.5">
            <Sparkles className="w-3 h-3 text-[#8C3E2D]" />
            <span>Geser kartu ke samping atau ketuk tombol untuk membalik</span>
          </div>
        </div>
      )}
    </section>
  );
}
