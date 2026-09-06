"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Camera,
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

  // Arah lemparan kartu saat di-drag keluar (-1: lempar ke kiri, 1: lempar ke kanan)
  const [exitX, setExitX] = useState(0);

  // Arah perpindahan foto ('next' | 'prev') untuk animasi transisi masuk
  const [slideDirection, setSlideDirection] = useState("next");

  // Ref untuk mendeteksi apakah pengguna sedang men-drag foto (mencegah flip tidak sengaja)
  const isDraggingRef = useRef(false);

  // Indikator visual real-time saat kartu sedang di-drag ('next' | 'prev' | null)
  const [dragCue, setDragCue] = useState(null);

  // Mengambil sumber gambar polaroid nyata
  const getPhotoSrc = (photo, idx) => {
    if (photo && photo.src) return photo.src;
    return `/polaroids/${idx + 1}.webp`;
  };

  // Toggle 3D flip card (eksklusif ketukan foto, bukan saat drag)
  const handleToggleFlip = (e) => {
    if (e) e.stopPropagation();
    if (isDraggingRef.current) return;
    playSfx("card-flip");
    setIsFlipped((prev) => !prev);
  };

  // Geser ke foto berikutnya (lempar kartu ke tumpukan kiri)
  const handleNextPhoto = (direction = -1) => {
    playSfx("paper-swoosh");
    setSlideDirection("next");
    setExitX(direction * 380);
    setIsFlipped(false);

    setTimeout(() => {
      setExitX(0);
      if (currentIndex + 1 < polaroids.length) {
        setCurrentIndex((prev) => prev + 1);
        playSfx("camera-shutter");
      } else {
        // Selesai melihat seluruh foto polaroid, transisi mulus ke Segmen 4 (Kamus Bahasa Kita)
        onComplete();
      }
    }, 220);
  };

  // Tarik kembali foto sebelumnya (interaktif tanpa tombol)
  const handlePrevPhoto = () => {
    if (currentIndex <= 0) return;
    playSfx("paper-swoosh");
    setSlideDirection("prev");
    setIsFlipped(false);
    setExitX(0);
    setCurrentIndex((prev) => prev - 1);
    playSfx("camera-shutter");
  };

  const currentPhoto = polaroids[currentIndex];

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-4 py-2 sm:py-3 select-none relative overflow-hidden my-auto">
      {/* WRAPPER TENGAH LAYAR TERFOKUS: Merapatkan elemen agar seimbang secara visual di tengah */}
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center gap-3 sm:gap-3.5 my-auto">
        
        {/* 1. HEADER SEGMEN: JUDUL & COUNTER BADGE KOMPAK (BEBAS REDUNDANSI) */}
        <div className="w-full flex flex-col items-center text-center z-20">
          <div className="relative inline-block mb-1">
            <WashiTape
              color="sage"
              angle={-1.5}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            />
            <h2 className="font-handwriting text-2xl sm:text-3xl text-[#140E0A] font-black tracking-wide pt-1">
              Tumpukan Memori 📸
            </h2>
          </div>

          {/* Counter Badge Pill & Dots saat foto aktif */}
          <div className="mt-1 flex items-center gap-2 bg-[#EFE4D6]/90 px-3 py-1 rounded-full border border-[#D5C7B5] shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#8C3E2D]" />
            <span className="font-mono text-[10.5px] font-black text-[#2E2016]">
              Foto 0{currentIndex + 1} / 0{polaroids.length}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {polaroids.map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-[#8C3E2D] w-3"
                      : i < currentIndex
                      ? "bg-[#A8947E] w-1.5"
                      : "bg-[#D5C7B5] w-1.5"
                  }`}
                  title={`Foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. TUMPUKAN KARTU POLAROID FISIK REALISTIS */}
        <div className="w-full max-w-[325px] sm:max-w-[340px] h-[360px] sm:h-[375px] relative flex items-center justify-center z-10">
          <div className="w-full h-full relative flex items-center justify-center">
              
              {/* LAYER TUMPUKAN FOTO LAMA DI KIRI (JIKA ADA LEBIH DARI 1 FOTO TERLEWAT) */}
              {currentIndex > 1 && (
                <div
                  style={{
                    transform: "translateX(-48px) translateY(8px) rotate(-13deg) scale(0.91)",
                  }}
                  className="absolute -left-2 sm:-left-3 w-[265px] sm:w-[280px] h-[335px] sm:h-[350px] bg-[#F7F2E7] rounded-sm border border-[#DACBB8] shadow-md pointer-events-none opacity-70 z-5"
                />
              )}

              {/* TUMPUKAN FOTO SEBELUMNYA DI KIRI (INTERAKTIF: KETUK ATAU TARIK UNTUK MELIHAT KEMBALI) */}
              {currentIndex > 0 && (
                <motion.div
                  initial={{ x: -70, opacity: 0, rotate: -14 }}
                  animate={{
                    x: -36,
                    y: 4,
                    rotate: -8,
                    opacity: 0.95,
                    scale: 0.94,
                  }}
                  exit={{ x: -70, opacity: 0 }}
                  whileHover={{ x: -44, rotate: -10, scale: 0.97 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevPhoto();
                  }}
                  drag="x"
                  dragConstraints={{ left: -50, right: 60 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 25 || info.velocity.x > 120) {
                      handlePrevPhoto();
                    }
                  }}
                  className="absolute -left-2 sm:-left-3 w-[265px] sm:w-[280px] h-[335px] sm:h-[350px] bg-[#FFFDF8] rounded-sm p-2.5 border border-[#D5C7B5] shadow-xl cursor-pointer z-10 select-none group transition-shadow hover:shadow-2xl"
                  title="Ketuk atau tarik untuk melihat foto sebelumnya"
                >
                  <WashiTape
                    color="rose"
                    angle={-8}
                    className="absolute -top-2.5 left-4 z-20 pointer-events-none"
                  />

                  {/* Thumbnail foto lama dengan efek sepia / pudar lembut */}
                  <div className="w-full h-full bg-[#FAF5EE] rounded-xs border border-[#EADBCC] flex flex-col justify-between p-1.5 pointer-events-none">
                    <div className="w-full h-[200px] sm:h-[215px] bg-[#1E1712]/15 rounded-xs relative overflow-hidden">
                      <Image
                        src={getPhotoSrc(polaroids[currentIndex - 1], currentIndex - 1)}
                        alt="Foto sebelumnya"
                        fill
                        className="object-cover opacity-65 filter grayscale-25"
                        sizes="260px"
                      />
                      <div className="absolute inset-0 bg-[#2E2016]/10" />
                    </div>

                    {/* Label interaktif halus skeuomorfik */}
                    <div className="flex items-center justify-between px-1 pt-1 text-[#8C3E2D]">
                      <span className="font-mono text-[9px] font-black tracking-wider flex items-center gap-1">
                        <span>👉</span>
                        <span>Foto 0{currentIndex}</span>
                      </span>
                      <span className="font-handwriting text-xs text-[#5A4839] font-bold">
                        tarik kanan ✨
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Foto-foto di Bawah Stack Kanan (Cascade Entrance & Shadow Stack) */}
              {polaroids.slice(currentIndex + 1, currentIndex + 3).map((subPhoto, subIdx) => {
                const depth = subIdx + 1;
                const subOrigIdx = currentIndex + depth;
                return (
                  <motion.div
                    key={`sub-${subPhoto.id}`}
                    initial={{ y: 70, opacity: 0, scale: 0.92, rotate: 0 }}
                    animate={{
                      y: depth * 6,
                      scale: 1 - depth * 0.04,
                      rotate: subPhoto.rotation * 0.8,
                      opacity: 0.9,
                    }}
                    transition={{
                      delay: depth * 0.12,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ zIndex: 10 - depth }}
                    className="absolute w-[275px] sm:w-[290px] h-[345px] sm:h-[360px] bg-[#FFFDF8] rounded-sm p-3 border border-[#D5C7B5] shadow-lg pointer-events-none flex flex-col justify-between"
                  >
                    <div className="w-full h-[215px] sm:h-[225px] bg-[#1E1712]/15 rounded-xs relative overflow-hidden border border-black/10">
                      <Image
                        src={getPhotoSrc(subPhoto, subOrigIdx)}
                        alt={subPhoto.frontCaption || "Polaroid"}
                        fill
                        className="object-cover opacity-45 filter blur-[0.5px]"
                        sizes="290px"
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-center text-center px-1 pt-1 opacity-50">
                      <span className="font-handwriting text-base text-[#140E0A] font-bold truncate">
                        "{subPhoto.frontCaption || subPhoto.title}"
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* FOTO TERATAS AKTIF (DAPAT DI-SWIPE KIRI-KANAN & DI-FLIP LANGSUNG) */}
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
                  onDrag={(e, info) => {
                    const nextCue = info.offset.x < -30 ? "next" : info.offset.x > 30 ? "prev" : null;
                    setDragCue((prev) => (prev !== nextCue ? nextCue : prev));
                  }}
                  onDragEnd={(e, info) => {
                    setDragCue(null);
                    // Deteksi jika hanya sentuhan ringan (tap) bukan drag
                    if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
                      isDraggingRef.current = true;
                    }
                    setTimeout(() => {
                      isDraggingRef.current = false;
                    }, 100);

                    // Geser ke KIRI -> Foto Berikutnya (lempar ke tumpukan kiri)
                    if (info.offset.x < -60 || info.velocity.x < -200) {
                      handleNextPhoto(-1);
                    }
                    // Geser ke KANAN -> Foto Sebelumnya (jika ada)
                    else if (info.offset.x > 60 || info.velocity.x > 200) {
                      if (currentIndex > 0) {
                        handlePrevPhoto();
                      }
                    }
                  }}
                  initial={
                    slideDirection === "prev"
                      ? { x: -240, opacity: 0.6, rotate: -10, scale: 0.95 }
                      : false
                  }
                  animate={{
                    x: exitX,
                    rotate: isFlipped ? 0 : currentPhoto.rotation,
                    opacity: exitX !== 0 ? 0 : 1,
                    scale: 1,
                  }}
                  exit={{
                    x: exitX,
                    opacity: 0,
                    rotate: exitX < 0 ? -18 : 18,
                    transition: { duration: 0.22, ease: "easeOut" },
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="absolute w-[275px] sm:w-[290px] h-[345px] sm:h-[360px] cursor-grab active:cursor-grabbing z-20"
                  style={{ perspective: "1000px" }}
                >
                  {/* INDIKATOR STAMP ARAH GESER REAL-TIME SAAT DRAG */}
                  <AnimatePresence>
                    {dragCue === "next" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
                        animate={{ opacity: 1, scale: 1, rotate: 6 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="absolute top-5 right-5 z-40 bg-[#8C3E2D]/95 text-[#FFF7ED] font-mono text-[10.5px] font-black px-3 py-1 rounded-md shadow-xl border border-white/40 pointer-events-none tracking-wider flex items-center gap-1.5"
                      >
                        <span>👈</span>
                        <span>
                          {currentIndex === polaroids.length - 1
                            ? "BUKA KAMUS 📖"
                            : "FOTO BERIKUTNYA"}
                        </span>
                      </motion.div>
                    )}
                    {dragCue === "prev" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                        animate={{ opacity: 1, scale: 1, rotate: -6 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="absolute top-5 left-5 z-40 bg-[#2A180B]/95 text-[#F3E5AB] font-mono text-[10.5px] font-black px-3 py-1 rounded-md shadow-xl border border-[#D4AF37]/50 pointer-events-none tracking-wider flex items-center gap-1.5"
                      >
                        <span>👉</span>
                        <span>{currentIndex > 0 ? `FOTO 0${currentIndex}` : "FOTO PERTAMA"}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                      className="absolute inset-0 bg-[#FFFDF8] rounded-sm p-3 pb-3 border border-[#D5C7B5] shadow-2xl flex flex-col justify-between select-none"
                    >
                      {/* Washi Tape di Pojok Atas */}
                      <WashiTape
                        color={currentIndex % 2 === 0 ? "mustard" : "rose"}
                        angle={currentIndex % 2 === 0 ? -2 : 2}
                        className="absolute -top-3 left-6 z-30 pointer-events-none"
                      />

                      {/* Area Foto Polaroid Glossy */}
                      <div className="w-full h-[220px] sm:h-[230px] bg-[#1E1712] rounded-xs relative overflow-hidden border border-black/20 shadow-inner">
                        <Image
                          src={getPhotoSrc(currentPhoto, currentIndex)}
                          alt={currentPhoto.frontCaption || currentPhoto.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 412px) 280px, 300px"
                          priority={currentIndex === 0}
                        />

                        {/* Kilau Permukaan Foto Glossy */}
                        <motion.div
                          key={`polaroid-sheen-${currentIndex}`}
                          initial={{ x: "-100%", opacity: 0.35 }}
                          animate={{ x: "200%", opacity: 0 }}
                          transition={{ duration: 1.1, ease: "easeOut" }}
                          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/25 to-transparent -rotate-12 z-10"
                        />
                        <div
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                          }}
                        />

                        {/* Stempel Tanggal Vintage di Sudut Foto (jika ada) */}
                        {currentPhoto.date && (
                          <span className="absolute bottom-1.5 right-1.5 font-typewriter text-[9.5px] font-bold text-[#FAF5EC] bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded shadow">
                            {currentPhoto.date}
                          </span>
                        )}
                      </div>

                      {/* Bagian Bawah Kertas Polaroid: Tulisan Tangan Caption Bersih & Otentik */}
                      <div className="flex-1 flex items-center justify-center text-center px-1 pt-1.5 pb-0.5">
                        <p className="font-handwriting text-lg sm:text-[21px] text-[#140E0A] font-black leading-tight tracking-wide">
                          "{currentPhoto.frontCaption || currentPhoto.title}"
                        </p>
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
                      className="absolute inset-0 bg-[#FDF7EB] rounded-sm p-3.5 sm:p-4 border-2 border-[#D8C7B0] shadow-2xl flex flex-col justify-between select-none"
                    >
                      {/* Header Sisi Belakang: Hangat & Personal */}
                      <div className="flex items-center justify-between border-b border-[#E0D2C0] pb-1.5">
                        <div className="flex items-center gap-1.5 text-[#8C3E2D]">
                          <Paperclip className="w-3.5 h-3.5 text-amber-700" />
                          <span className="font-mono text-[9.5px] font-black uppercase tracking-wider">
                            Catatan Tatwa ✨
                          </span>
                        </div>
                        {currentPhoto.date ? (
                          <span className="font-typewriter text-[9.5px] text-[#5A4839] font-bold">
                            {currentPhoto.date}
                          </span>
                        ) : (
                          <span className="font-mono text-[9px] bg-[#EAE0D2] text-[#5A4839] font-bold px-1.5 py-0.5 rounded">
                            Foto 0{currentIndex + 1}
                          </span>
                        )}
                      </div>

                      {/* Pesan Tulisan Tangan Tinta Biru Pulpen Tatwa */}
                      <div className="flex-1 flex flex-col justify-center py-2 text-left overflow-y-auto">
                        <p className="font-handwriting text-base sm:text-[17.5px] text-[#1E3A8A] font-black leading-relaxed">
                          "{currentPhoto.backNote}"
                        </p>
                      </div>

                      {/* Tanda Tangan Tatwa Rapi & Bersih */}
                      <div className="border-t border-[#E0D2C0] pt-1.5 flex items-center justify-between">
                        <span className="font-handwriting text-sm text-[#1E3A8A] font-bold">
                          — Tatwa ✨
                        </span>
                        <span className="font-mono text-[9px] text-[#8C6D53] font-semibold">
                          0{currentIndex + 1} / 0{polaroids.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
        </div>

        {/* 3. PANDUAN INTERAKSI FISIK SKEUOMORFIK TUNGGAL (JELAS, TEGAS, KONTEKSTUAL) */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="z-20 select-none pointer-events-none w-full max-w-[325px]"
        >
          <div className="bg-[#EFE4D6]/95 border border-[#D5C7B5] rounded-2xl px-3.5 py-1.5 shadow-2xs flex flex-col items-center gap-0.5 text-[#3A281A] font-sans-ui text-[11px] font-bold text-center">
            {/* Baris 1: Petunjuk Membalik Kartu */}
            <div className="flex items-center gap-1.5 text-[#2E2016]">
              <span>👆</span>
              <span>Ketuk foto untuk membalik catatan</span>
            </div>

            {/* Baris 2: Petunjuk Arah Geser yang Gamblang & Kontekstual */}
            <div className="flex items-center justify-center gap-2 text-[10.5px] border-t border-[#D5C7B5]/60 pt-0.5 w-full">
              {currentIndex > 0 ? (
                <>
                  <span className="text-[#8C3E2D] font-black flex items-center gap-1">
                    <span>👉</span>
                    <span>Geser kanan: Foto 0{currentIndex}</span>
                  </span>
                  <span className="text-[#B5A38E]">•</span>
                  <span className="text-[#1E3A8A] font-black flex items-center gap-1">
                    <span>👈</span>
                    <span>
                      {currentIndex === polaroids.length - 1
                        ? "Geser kiri: Buka Kamus 📖"
                        : "Geser kiri: Lanjut"}
                    </span>
                  </span>
                </>
              ) : (
                <span className="text-[#1E3A8A] font-black flex items-center gap-1">
                  <span>👈</span>
                  <span>Geser kartu ke kiri untuk foto berikutnya</span>
                </span>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

