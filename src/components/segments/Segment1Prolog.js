"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowUp, Disc, Sparkles } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment1Prolog({ onComplete }) {
  // isUnsealed: segel lilin terbuka & tutup amplop melipat ke atas 180 derajat
  const [isUnsealed, setIsUnsealed] = useState(false);
  // isExtracting: proses amplop meluncur turun dibarengi kertas meluncur naik ke tengah
  const [isExtracting, setIsExtracting] = useState(false);
  // isZoomingTape: animasi lakban terkelupas & pemutar kaset mini zoom membesar ke Segmen 2
  const [isZoomingTape, setIsZoomingTape] = useState(false);

  const { startBgm, playSfx } = useAudio();

  // 1. Alur Membuka Segel Lilin & Ekstraksi Surat yang Sangat Mulus
  const handleOpenEnvelope = () => {
    if (isUnsealed) return;
    setIsUnsealed(true);

    playSfx("unboxing-chime");
    startBgm();

    try {
      confetti({
        particleCount: 50,
        spread: 85,
        origin: { y: 0.48 },
        colors: ["#E8B4B8", "#E2C275", "#B8C4B8", "#FAF7F2", "#C26D57"],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.5 },
          colors: ["#E8B4B8", "#FAF7F2", "#E2C275"],
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.5 },
          colors: ["#E8B4B8", "#FAF7F2", "#E2C275"],
        });
      }, 200);
    } catch (e) {
      console.log("Confetti trigger:", e);
    }

    // Tunggu lipatan amplop terbuka penuh (450ms), lalu mulai pergerakan fisik berkesinambungan
    setTimeout(() => {
      setIsExtracting(true);
      playSfx("paper-swoosh");
    }, 450);
  };

  // 2. Alur Transisi Zoom Membesar: Lakban Terlepas & Kaset Membesar Menuju Segmen 2
  const handleTriggerZoomTransition = () => {
    if (isZoomingTape) return;
    setIsZoomingTape(true);

    playSfx("tape-click");
    playSfx("paper-swoosh");

    // Efek zoom sinematik 550ms sebelum membalik halaman ke Segmen 2
    setTimeout(() => {
      playSfx("page-turn");
      onComplete();
    }, 550);
  };

  return (
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center p-3 sm:p-5 select-none relative overflow-hidden my-auto">
      {/* KONTEN UTAMA YANG SELALU TERPUSAT PRESISI DI TENGAH LAYAR (DEAD CENTER) */}
      <div className="w-full max-w-[345px] relative flex flex-col items-center justify-center my-auto min-h-[460px]">
        
        {/* ========================================================= */}
        {/* TAHAP 1: AMPLOP SURAT VINTAGE (MELUNCUR TURUN SAAT TERBUKA) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ y: 0, opacity: 1, scale: 1 }}
          animate={
            isExtracting
              ? {
                  y: 340,
                  opacity: 0,
                  scale: 0.88,
                  pointerEvents: "none",
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                }
              : {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }
          }
          className={`w-full flex flex-col items-center ${
            isExtracting ? "absolute inset-0 pointer-events-none z-0" : "relative z-20"
          }`}
        >
          {/* Header Sapaan untuk Adiba */}
          <div className="text-center mb-3.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#CDB9A0] text-[#423223] font-black text-[11px] font-sans-ui tracking-wide shadow-xs mb-1">
              The Scrapbook of Us
            </span>
            <h1 className="font-handwriting text-4xl sm:text-5xl text-[#120C08] font-black tracking-wide leading-tight drop-shadow-xs">
              Untuk Askiyaa, Pilkom '25
            </h1>
            <p className="font-sans-ui text-xs text-[#3D3024] font-bold mt-1">
              Ada sepucuk surat kenangan yang disegel khusus untukmu.
            </p>
          </div>

          {/* Wadah Amplop 3D dengan Prangko & Stempel */}
          <div
            className="relative w-full h-[245px] bg-[#EADECE] rounded-2xl shadow-2xl border-2 border-[#CDB8A0] paper-shadow-lifted overflow-visible flex flex-col justify-between p-4"
            style={{ perspective: "1000px" }}
          >
            {/* Garis Tepian Pos Klasik */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #B8543D 0, #B8543D 10px, transparent 10px, transparent 18px, #3B5B88 18px, #3B5B88 28px, transparent 28px, transparent 36px)`,
                backgroundSize: "100% 6px",
                backgroundRepeat: "repeat-x",
                backgroundPosition: "top, bottom",
              }}
            />

            {/* Area Atas: Prangko Asli & Stempel Cap Pos */}
            <div className="flex items-start justify-between relative z-10">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#423223]/70 p-1 flex flex-col items-center justify-center -rotate-12 opacity-85 select-none">
                <span className="font-typewriter text-[7px] text-[#423223] uppercase font-bold tracking-tighter">
                  PILKOM '25
                </span>
                <div className="w-8 h-0.5 bg-[#423223]/50 my-0.5" />
                <span className="font-typewriter text-[7px] text-[#423223] font-bold">
                  ARCHIVE
                </span>
                <span className="font-typewriter text-[5px] text-[#423223]/80">BANDUNG</span>
              </div>

              {/* Prangko Asli */}
              <div className="relative group select-none">
                <img
                  src="/images/prangko.webp"
                  alt="Prangko Indonesia Vintage"
                  className="w-18 sm:w-20 object-contain rounded-xs shadow-md border-2 border-white/90 -rotate-2"
                />
                <div className="absolute -bottom-2 -left-3 w-10 h-10 rounded-full border border-black/35 border-dashed pointer-events-none rotate-45" />
              </div>
            </div>

            {/* Area Bawah: Tulisan Tangan Alamat */}
            <div className="relative z-10 text-left font-handwriting pl-2 pb-1">
              <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#524132] font-black block">
                Penerima:
              </span>
              <span className="text-2xl sm:text-3xl text-[#120C08] font-black block leading-tight">
                Adiba (Askiyaa)
              </span>
              <span className="text-xs text-[#382C20] font-sans-ui font-bold block mt-0.5">
                Ilmu Komputer — Angkatan 2025
              </span>
              <span className="text-sm text-[#8C2318] font-black block mt-1">
                Dari: Tatwa
              </span>
            </div>

            {/* Tutup Segitiga Amplop 3D (Lid Flap) */}
            <motion.div
              className="absolute inset-x-0 top-0 h-28 z-20 flex items-start justify-center overflow-visible"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              animate={
                isUnsealed
                  ? { rotateX: -180, zIndex: 0 }
                  : { rotateX: 0, zIndex: 20 }
              }
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-full h-24 bg-[#DAC9B3] shadow-md border-b-2 border-[#C4B19A] relative flex items-end justify-center pb-2"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />

              {/* Segel Lilin Merah Monogram A */}
              <AnimatePresence>
                {!isUnsealed && (
                  <motion.div
                    className="absolute bottom-0 translate-y-1/2 z-30 cursor-pointer"
                    drag="y"
                    dragConstraints={{ top: -75, bottom: 0 }}
                    dragElastic={0.25}
                    onDragEnd={(e, info) => {
                      if (info.offset.y < -35) {
                        handleOpenEnvelope();
                      }
                    }}
                    onClick={handleOpenEnvelope}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A83226] via-[#8C2318] to-[#63140C] shadow-xl border-2 border-[#C94A3C]/60 flex items-center justify-center select-none active:scale-95 transition-transform">
                      <div className="w-11 h-11 rounded-full border border-amber-200/50 flex items-center justify-center shadow-inner">
                        <span className="font-handwriting text-2xl font-bold text-amber-100 drop-shadow">
                          A
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Hint Buka Segel */}
          {!isUnsealed && (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="mt-5 px-4 py-2 rounded-full bg-[#1C1510] text-[#FDE39E] font-sans-ui text-xs font-bold shadow-md flex items-center gap-1.5 border border-amber-400/40 cursor-pointer hover:bg-black transition-colors"
              onClick={handleOpenEnvelope}
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>Sentuh atau geser segel lilin merah ke atas ✉️</span>
            </motion.div>
          )}
        </motion.div>

        {/* ========================================================= */}
        {/* TAHAP 2: SURAT PEMBUKA (MELUNCUR NAIK & TEPAT DI TENGAH) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ y: 90, opacity: 0, scale: 0.88 }}
          animate={
            isExtracting
              ? {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                }
              : {
                  y: 90,
                  opacity: 0,
                  scale: 0.88,
                  pointerEvents: "none",
                }
          }
          className={`w-full bg-[#FFFDF8] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#E5DACB] text-[#120C08] relative text-left paper-shadow-lifted z-30 flex flex-col my-auto ${
            isExtracting ? "relative" : "absolute pointer-events-none"
          }`}
        >
          {/* Washi Tape Nyata di Sudut Atas Kertas Surat */}
          <WashiTape color="rose" angle={-2} className="absolute -top-2.5 left-6" />
          <WashiTape color="sage" angle={2} className="absolute -top-2.5 right-6" />

          {/* Header Surat */}
          <div className="flex items-center justify-between border-b border-[#E8DCCF] pb-2 mb-3 pt-0.5">
            <span className="font-typewriter text-[10px] text-[#6B5A4B] tracking-widest uppercase font-black">
              SURAT PEMBUKA
            </span>
            <span className="font-typewriter text-[10px] text-[#8C2318] font-black">
              Lembar 01 / 08
            </span>
          </div>

          {/* Sapaan Tangan Adiba */}
          <h2 className="font-handwriting text-3xl sm:text-4xl font-black text-[#120C08] mb-2 leading-tight">
            Untuk Adiba (Askiyaa),
          </h2>

          {/* Isi Surat Terbaca Jelas & Menyentuh */}
          <div className="space-y-2.5 font-sans-ui text-xs sm:text-sm text-[#2D2319] leading-relaxed mb-3.5 font-semibold">
            <p>Selamat datang di buku kenangan kecil kita.</p>
            <p>
              Setiap lembar di sini menyimpan lagu-lagu, tawa, obrolan, dan cerita yang pernah ada di antara kita. Buka perlahan dan nikmati perjalanannya ya.
            </p>
          </div>

          {/* Tanda Tangan Tatwa */}
          <div className="font-handwriting text-2xl font-black text-[#8C2318] text-right mb-3">
            — Tatwa
          </div>

          {/* ========================================================= */}
          {/* TAHAP 3: PEMUTAR AUDIO / KASET MINI DILAKBAN WASHI TAPE  */}
          {/* ========================================================= */}
          <div className="mt-1 pt-2.5 border-t border-dashed border-[#DAC9B4] flex flex-col items-center relative">
            {/* UNIT PEMUTAR KASET MINI YANG DILAKBAN DI ATAS KERTAS */}
            <motion.div
              onClick={handleTriggerZoomTransition}
              whileHover={!isZoomingTape ? { scale: 1.03, y: -2 } : {}}
              whileTap={!isZoomingTape ? { scale: 0.96 } : {}}
              animate={
                isZoomingTape
                  ? {
                      scale: [1, 1.25, 2.6],
                      y: [0, -25, -60],
                      opacity: [1, 1, 0],
                      filter: ["brightness(1)", "brightness(1.15)", "brightness(1.3)"],
                      transition: { duration: 0.55, ease: "easeIn" },
                    }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              className="relative w-full bg-[#201914] rounded-xl p-2.5 border-2 border-[#4A3B2F] shadow-lg cursor-pointer flex items-center justify-between overflow-hidden group select-none"
            >
              {/* LAKBAN WASHI TAPE 1: SUDUT KIRI ATAS */}
              <motion.div
                animate={
                  isZoomingTape
                    ? { rotate: -45, x: -30, opacity: 0, scale: 1.2 }
                    : { rotate: -18, opacity: 0.9 }
                }
                transition={{ duration: 0.35 }}
                className="absolute -top-1.5 -left-3 w-14 h-4 bg-[#E2C275]/80 border-y border-amber-300/40 shadow-xs z-30 pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 95% 5%, 100% 90%, 5% 100%)",
                }}
              />

              {/* LAKBAN WASHI TAPE 2: SUDUT KANAN BAWAH */}
              <motion.div
                animate={
                  isZoomingTape
                    ? { rotate: 35, x: 30, opacity: 0, scale: 1.2 }
                    : { rotate: 16, opacity: 0.9 }
                }
                transition={{ duration: 0.35 }}
                className="absolute -bottom-1.5 -right-3 w-14 h-4 bg-[#E8B4B8]/80 border-y border-rose-300/40 shadow-xs z-30 pointer-events-none"
                style={{
                  clipPath: "polygon(5% 0, 100% 0, 95% 100%, 0 95%)",
                }}
              />

              {/* Spul Roda Mini Berputar Halus */}
              <div className="flex items-center gap-1.5 shrink-0 pl-1 z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="w-5 h-5 rounded-full bg-[#FAF5EC] border border-[#CBB69E] flex items-center justify-center shadow-xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2B231C]" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="w-5 h-5 rounded-full bg-[#FAF5EC] border border-[#CBB69E] flex items-center justify-center shadow-xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2B231C]" />
                </motion.div>
              </div>

              {/* Label Kertas Pemutar Mini */}
              <div className="flex-1 mx-2.5 bg-[#FAF5EC] border border-[#CBB69E] rounded px-2.5 py-1 shadow-xs flex flex-col justify-center text-left z-10">
                <div className="flex items-center justify-between">
                  <span className="font-typewriter text-[7px] font-black uppercase text-[#8C3420] tracking-wider">
                    SIDE A • MINI DECK
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <Disc className="w-3 h-3 text-[#A83226]" />
                  </div>
                </div>
                <span className="font-sans-ui text-xs font-black text-[#140E0A] leading-tight truncate">
                  Ketuk Pemutar Kaset Ini 🎵
                </span>
                <span className="font-typewriter text-[7.5px] text-[#635142] font-bold">
                  Buka Lembaran Mixtape Kita
                </span>
              </div>

              {/* Ikon Aksi Play Mini */}
              <div className="pr-1 z-10">
                <div className="w-6 h-6 rounded-full bg-[#8C3420] group-hover:bg-[#A83226] text-white flex items-center justify-center text-[10px] font-black shadow-xs transition-colors">
                  ▶
                </div>
              </div>
            </motion.div>

            {/* Teks Bantuan / Hint Berdenyut */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="mt-2 flex items-center gap-1 text-[#664C35] text-[10.5px] font-sans-ui font-bold"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Ketuk pemutar kaset yang dilakban ini untuk mulai memutar</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
