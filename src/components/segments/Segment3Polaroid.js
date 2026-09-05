"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  Camera,
  BookOpen,
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

  // Ref untuk mendeteksi apakah pengguna sedang men-drag foto (mencegah flip tidak sengaja)
  const isDraggingRef = useRef(false);

  // Fallback map untuk gambar lokal jika file JPG belum dimasukkan Tatwa
  const getPhotoSrc = (photo, idx) => {
    return `/images/polaroids/photo${idx + 1}.svg`;
  };

  // Toggle 3D flip card (eksklusif ketukan foto, bukan saat drag)
  const handleToggleFlip = (e) => {
    if (e) e.stopPropagation();
    if (isDraggingRef.current) return;
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

  // Reset putar ulang tumpukan foto dari awal
  const handleResetStack = () => {
    playSfx("paper-swoosh");
    setIsFlipped(false);
    setHasFinishedAll(false);
    setCurrentIndex(0);
  };

  const currentPhoto = polaroids[currentIndex];

  return (
    <section className="w-full h-full flex-1 flex flex-col justify-between items-center p-3 sm:p-4 select-none relative overflow-hidden my-auto">
      
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
                <button
                  key={`dot-${i}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx("paper-swoosh");
                    setIsFlipped(false);
                    setCurrentIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentIndex
                      ? "bg-[#8C3E2D] w-3"
                      : i < currentIndex
                      ? "bg-[#A8947E] hover:bg-[#8C3E2D] w-1.5"
                      : "bg-[#D5C7B5] hover:bg-[#A8947E] w-1.5"
                  }`}
                  title={`Foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. TUMPUKAN KARTU POLAROID FISIK REALISTIS */}
      <div className="w-full max-w-[325px] sm:max-w-[340px] h-[375px] sm:h-[395px] relative flex items-center justify-center my-auto z-10">
        
        {/* KONDISI A: PENGGUNA SUDAH MENYELESAIKAN SEMUA FOTO -> BUKU SAKU KAMUS KITA TERGELETAK DI BAWAH TUMPUKAN */}
        {hasFinishedAll ? (
          <motion.div
            layoutId="shared-pocket-book"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={() => {
              playSfx("clasp-open");
              setTimeout(() => onComplete(), 300);
            }}
            className="w-full max-w-[295px] sm:max-w-[310px] h-[360px] sm:h-[375px] bg-gradient-to-b from-[#4A3222] via-[#3B2516] to-[#2B190D] rounded-2xl p-4 sm:p-5 border-4 border-[#6E4B33] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between relative paper-shadow cursor-pointer select-none group hover:scale-[1.02] transition-transform"
          >
            {/* Tekstur Jahitan Buku Kulit (Stitching) */}
            <div className="absolute inset-2 rounded-xl border border-dashed border-[#8C6549]/50 pointer-events-none" />

            {/* Tulang Buku Kiri (Spine) */}
            <div className="absolute left-3.5 top-0 bottom-0 w-3 bg-black/25 border-r border-[#6E4B33]" />

            {/* Pita Pembatas Buku Merah Terjulur di Bawah */}
            <div className="absolute -bottom-5 right-8 w-4 h-9 bg-[#A83226] shadow-md rounded-b-xs transform -rotate-6 pointer-events-none z-30 flex items-end justify-center pb-1">
              <div className="w-2 h-2 border-b-2 border-r-2 border-[#FFE8E8]/70 transform rotate-45 mb-0.5" />
            </div>

            {/* Bagian Atas Sampul: Stempel Emas Pos */}
            <div className="flex items-center justify-between pl-4 z-10">
              <span className="font-mono text-[9px] text-[#F3D39B] font-black uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded border border-[#C59F60]/40">
                LIMITED EDITION • 01/01
              </span>
              <BookOpen className="w-4 h-4 text-[#F3D39B]" />
            </div>

            {/* Bagian Tengah Sampul: Judul Emboss Emas Mewah */}
            <div className="text-center pl-4 my-auto z-10 space-y-1">
              <span className="font-typewriter text-[10.5px] uppercase tracking-widest text-[#D4AF7A] font-black block">
                Buku Saku
              </span>
              <h3 className="font-handwriting text-3xl sm:text-4xl text-[#FFF6E5] font-black tracking-wide leading-tight drop-shadow-md">
                Kamus Bahasa Kita 📖
              </h3>
              <p className="font-sans-ui text-[11px] text-[#D8C2A7] font-bold leading-relaxed pt-1 max-w-[220px] mx-auto">
                Hanya kita berdua yang tahu arti setiap kata di dalamnya.
              </p>
            </div>

            {/* Kancing Pengunci Kuningan Fisik (Brass Clasp) */}
            <div className="w-full flex flex-col items-center pl-4 z-10">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] text-[#2A180B] font-sans-ui text-xs font-black shadow-lg flex items-center gap-2 border border-[#8C6D1F]"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#3D2513] border border-white/60 shadow-inner" />
                <span>Buka Kancing Buku ➔</span>
              </motion.div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleResetStack();
                }}
                className="mt-2 text-[10.5px] font-sans-ui text-[#D4AF7A] hover:text-white font-bold underline cursor-pointer"
              >
                ↺ Lihat foto lagi
              </button>
            </div>
          </motion.div>
        ) : (
          /* KONDISI B: TUMPUKAN FOTO AKTIF (FLIP & THROW) */
          <div className="w-full h-full relative flex items-center justify-center">
            
            {/* Foto-foto di Bawah (Cascade Spring Entrance & Shadow Stack Effect) */}
            {polaroids.slice(currentIndex + 1, currentIndex + 3).map((subPhoto, subIdx) => {
              const depth = subIdx + 1;
              return (
                <motion.div
                  key={`sub-${subPhoto.id}`}
                  initial={{ y: 70, opacity: 0, scale: 0.92, rotate: 0 }}
                  animate={{
                    y: depth * 7,
                    scale: 1 - depth * 0.04,
                    rotate: subPhoto.rotation * 0.8,
                    opacity: 0.9,
                  }}
                  transition={{
                    delay: depth * 0.14,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ zIndex: 10 - depth }}
                  className="absolute w-[275px] sm:w-[290px] h-[350px] sm:h-[365px] bg-[#FFFDF8] rounded-sm p-3 border border-[#D5C7B5] shadow-lg pointer-events-none"
                >
                  <div className="w-full h-[215px] sm:h-[230px] bg-[#EBE0D2] rounded-xs relative overflow-hidden opacity-50" />
                </motion.div>
              );
            })}

            {/* FOTO TERATAS AKTIF (DAPAT DI-DRAG, DI-SWIPE, & DI-FLIP LANGSUNG) */}
            <AnimatePresence custom={exitX}>
              <motion.div
                key={currentPhoto.id}
                layoutId={currentIndex === 0 ? "shared-polaroid-lead" : undefined}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragStart={() => {
                  isDraggingRef.current = true;
                }}
                onDragEnd={(e, info) => {
                  setTimeout(() => {
                    isDraggingRef.current = false;
                  }, 80);
                  if (info.offset.x > 70 || info.velocity.x > 250) {
                    handleNextPhoto(1);
                  } else if (info.offset.x < -70 || info.velocity.x < -250) {
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
                      
                      {/* Hint Balik Foto (Non-clickable visual cue) */}
                      <div className="mt-1 flex items-center justify-center gap-1 text-[10.5px] font-sans-ui text-[#7A6757] font-bold select-none pointer-events-none">
                        <RotateCcw className="w-2.5 h-2.5 text-[#8C3E2D]" />
                        <span>Ketuk foto untuk baca catatan ✍️</span>
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

                    {/* Tanda Tangan & Petunjuk Balik (Murni Visual Non-Clickable) */}
                    <div className="border-t border-[#E0D2C0] pt-2 flex items-center justify-between">
                      <span className="font-handwriting text-sm text-[#1E3A8A] font-bold">
                        — Tatwa ✨
                      </span>
                      <div className="flex items-center gap-1 text-[10.5px] font-sans-ui text-[#7A6757] font-bold select-none pointer-events-none">
                        <RotateCcw className="w-2.5 h-2.5 text-[#8C3E2D]" />
                        <span>Ketuk untuk balik ke foto</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. PANDUAN INTERAKSI FISIK SKEUOMORFIK (MURNI PANDUAN NON-CLICKABLE) */}
      {!hasFinishedAll && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="w-full max-w-[325px] flex flex-col items-center mt-2 mb-1 z-20 select-none pointer-events-none"
        >
          <div className="w-full bg-[#EFE4D6]/95 border border-[#D5C7B5] rounded-xl px-3 py-2 shadow-xs flex items-center justify-around text-[#3A281A] font-sans-ui text-[11px] sm:text-[11.5px] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">👆</span>
              <span>Ketuk foto untuk membalik</span>
            </div>
            <span className="text-[#B5A38E]">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">👉</span>
              <span>Geser untuk foto berikutnya</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
