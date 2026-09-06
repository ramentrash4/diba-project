"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowUp, Disc, Sparkles } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";
import { scrapbookData } from "@/data/scrapbookData";

export function Segment1Prolog({ onComplete }) {
  // isUnsealed: segel lilin terbuka & tutup amplop melipat ke atas 180 derajat
  const [isUnsealed, setIsUnsealed] = useState(false);
  // isExtracted: amplop meluncur turun dan surat pembuka muncul di tengah
  const [isExtracted, setIsExtracted] = useState(false);
  // isPeelingTape: animasi selotip washi terkelupas saat ditarik/diketuk & kaset mini terangkat
  const [isPeelingTape, setIsPeelingTape] = useState(false);

  const { startBgm, playSfx } = useAudio();

  // 1. Alur Membuka Segel Lilin & Transisi Ekstraksi Surat
  const handleOpenEnvelope = () => {
    if (isUnsealed) return;
    setIsUnsealed(true);

    playSfx("wax-crack");
    setTimeout(() => {
      playSfx("unboxing-chime");
    }, 110);
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

    // Beri waktu 500ms agar tutup amplop melipat ke atas penuh, lalu transisi amplop turun & surat naik
    setTimeout(() => {
      setIsExtracted(true);
      playSfx("paper-swoosh");
    }, 500);
  };

  // 2. Alur Transisi Opsi A: Gestur Kelupas Selotip Lakban Menuju Segmen 2
  const handlePeelTape = () => {
    if (isPeelingTape) return;
    setIsPeelingTape(true);

    playSfx("tape-peel");

    // Washi tape terkelupas 320ms, kaset terangkat, lalu beralih segmen memicu morph
    setTimeout(() => {
      onComplete();
    }, 360);
  };

  return (
    <section className="w-full h-full flex-1 flex flex-col items-center justify-center p-3 sm:p-5 select-none relative overflow-hidden">
      {/* WRAPPER UTAMA DEAD-CENTER TERPUSAT GEOMETRIS SECARA VERTIKAL & HORIZONTAL */}
      <div className="w-full max-w-[345px] flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {!isExtracted ? (
            /* ========================================================= */
            /* PAGE 1: AMPLOP TERTUTUP (TEPAT DI TENGAH LAYAR PONSEL)   */
            /* ========================================================= */
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                y: 280,
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
              }}
              className="w-full flex flex-col items-center"
            >
              {/* Header Sapaan Adiba */}
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
                    Adiba Askiyaa
                  </span>
                  <span className="text-xs text-[#382C20] font-sans-ui font-bold block mt-0.5">
                    KEMAKOM — Angkatan 2025
                  </span>
                  <span className="text-sm text-[#8C2318] font-black block mt-1">
                    Dari: {scrapbookData.recipient.sender}
                  </span>
                </div>

                {/* Tutup Segitiga Amplop 3D (Lid Flap) */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-28 z-20 flex items-start justify-center overflow-visible origin-top"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={
                    isUnsealed
                      ? { rotateX: -180, zIndex: 0 }
                      : { rotateX: 0, zIndex: 20 }
                  }
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                        exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                      >
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A83226] via-[#8C2318] to-[#63140C] shadow-xl border-2 border-[#C94A3C]/60 flex items-center justify-center select-none active:scale-95 transition-transform relative overflow-hidden">
                          {/* Kilau Halus Lilin Segel */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -rotate-45"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", repeatDelay: 1.5 }}
                          />
                          <div className="w-11 h-11 rounded-full border border-amber-200/50 flex items-center justify-center shadow-inner relative z-10">
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

              {/* Hint Buka Segel (Murni Petunjuk Visual, Tidak Bisa Diklik) */}
              {!isUnsealed && (
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="mt-5 px-4 py-2 rounded-full bg-[#1C1510]/95 text-[#FDE39E] font-sans-ui text-xs font-bold shadow-md flex items-center gap-1.5 border border-amber-400/30 select-none pointer-events-none"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                  <span>Sentuh atau geser segel lilin merah ke atas ✉️</span>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* ========================================================= */
            /* PAGE 2: SURAT PEMBUKA (TEPAT DI TENGAH LAYAR PONSEL)     */
            /* ========================================================= */
            <motion.div
              key="letter-stage"
              initial={{ y: 80, opacity: 0, scale: 0.9 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              }}
              className="w-full flex flex-col items-center pointer-events-auto"
            >
              <motion.div
                animate={isPeelingTape ? { y: 100, opacity: 0.15, scale: 0.94 } : { y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.38, ease: "easeInOut" }}
                className="w-full bg-[#FFFDF8] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#E5DACB] text-[#120C08] relative text-left paper-shadow-lifted z-30 flex flex-col pointer-events-auto"
              >
                {/* Washi Tape di Sudut Atas Kertas Surat */}
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

                {/* Sapaan Tangan Tatwa */}
                <h2 className="font-handwriting text-2xl sm:text-3xl font-black text-[#120C08] mb-2 leading-tight">
                  {scrapbookData.recipient.letterGreeting}
                </h2>

                {/* Isi Surat Terbaca Sangat Jelas & Menyentuh */}
                <div className="space-y-2 font-sans-ui text-xs sm:text-[13px] text-[#2D2319] leading-relaxed mb-3.5 font-medium">
                  <p>{scrapbookData.recipient.letterParagraphs[0]}</p>
                  <p>{scrapbookData.recipient.letterParagraphs[1]}</p>
                  <p className="font-handwriting text-base sm:text-lg text-[#8C2318] font-bold mt-1 leading-snug">
                    {scrapbookData.recipient.letterParagraphs[2]}
                  </p>
                </div>

                {/* Tanda Tangan Tatwa */}
                <div className="font-handwriting text-xl sm:text-2xl font-black text-[#8C2318] text-right mb-3">
                  — {scrapbookData.recipient.sender}
                </div>

                {/* ========================================================= */}
                {/* PEMUTAR KASET MINI DILAKBAN WASHI TAPE (OPSI A: PEEL)     */}
                {/* ========================================================= */}
                <div className="mt-1 pt-2.5 border-t border-dashed border-[#DAC9B4] flex flex-col items-center relative w-full pointer-events-auto">

                  {/* BODI PEMUTAR KASET MINI (SHARED ELEMENT MORPH) */}
                  <motion.div
                    layoutId="shared-tape-deck"
                    animate={
                      isPeelingTape
                        ? {
                          scale: 1.18,
                          y: -42,
                          boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
                          transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                        }
                        : { scale: 1, y: 0 }
                    }
                    className="relative w-full bg-[#201914] rounded-2xl p-3 border-2 border-[#483B30] shadow-xl flex items-center justify-between overflow-visible group select-none pointer-events-auto text-left"
                  >
                    {/* STRIP SELOTIP WASHI TAPE INTERAKTIF (GESTUR TARIK / KELUPAS) */}
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: 0, right: 120 }}
                      dragElastic={0.25}
                      onDragEnd={(e, info) => {
                        if (info.offset.x > 35 || info.velocity.x > 200) {
                          handlePeelTape();
                        }
                      }}
                      onClick={handlePeelTape}
                      animate={
                        isPeelingTape
                          ? {
                            x: 140,
                            rotateZ: 28,
                            opacity: 0,
                            scale: 1.15,
                            transition: { duration: 0.35, ease: "easeOut" },
                          }
                          : { x: 0, rotateZ: -1.5 }
                      }
                      whileHover={!isPeelingTape ? { scale: 1.02, y: -1 } : {}}
                      whileDrag={{ scale: 1.05, rotateZ: 4, zIndex: 999 }}
                      className="absolute -top-2.5 -left-3 -right-3 h-8 bg-[#E2C275]/92 border-y border-[#C5A24D]/70 shadow-md z-40 cursor-grab active:cursor-grabbing flex items-center justify-between px-3 select-none rounded-xs backdrop-blur-2xs"
                      style={{
                        clipPath: "polygon(0 0, 98% 3%, 100% 95%, 2% 100%)",
                      }}
                    >
                      {/* Tekstur Pola Selotip Transparan */}
                      <div className="flex items-center gap-1.5 pointer-events-none">
                        <Sparkles className="w-3.5 h-3.5 text-[#5C451D]" />
                        <span className="font-mono text-[9px] text-[#5C451D] font-black uppercase tracking-wider">
                          LAKBAN PEREKAT MEMORI
                        </span>
                      </div>

                      {/* Tab Lipatan Sudut Kanan: Indikator Tarik / Kelupas */}
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="flex items-center gap-1 bg-[#F5E6BE] px-2 py-0.5 rounded-sm border border-[#C5A24D] text-[#5C451D] shadow-xs pointer-events-none"
                      >
                        <span className="font-typewriter text-[8.5px] font-black tracking-tight">
                          Tarik Kelupas ➔
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* Spul Roda Mini Berputar Halus */}
                    <div className="flex items-center gap-1.5 shrink-0 pl-1 z-10 pointer-events-none">
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
                    <div className="flex-1 mx-2.5 bg-[#FAF5EC] border border-[#CBB69E] rounded px-2.5 py-1 shadow-xs flex flex-col justify-center text-left z-10 pointer-events-none">
                      <div className="flex items-center justify-between">
                        <span className="font-typewriter text-[7px] font-black uppercase text-[#8C3420] tracking-wider">
                          SIDE A • TAPE DECK
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <Disc className="w-3 h-3 text-[#A83226]" />
                        </div>
                      </div>
                      <span className="font-sans-ui text-xs font-black text-[#140E0A] leading-tight truncate">
                        Pemutar Kaset Perjalanan 🎵
                      </span>
                      <span className="font-typewriter text-[7.5px] text-[#635142] font-bold">
                        Kelupas lakban di atas untuk memutar
                      </span>
                    </div>

                    {/* Ikon Aksi Play Mini */}
                    <div className="pr-1 z-10 pointer-events-none">
                      <div className="w-6 h-6 rounded-full bg-[#8C3420] text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                        ▶
                      </div>
                    </div>
                  </motion.div>

                  {/* Teks Bantuan / Hint Berdenyut */}
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    className="mt-2.5 flex items-center gap-1.5 text-[#664C35] text-[10.5px] font-sans-ui font-bold pointer-events-none"
                  >
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Tarik / usap selotip lakban ke kanan untuk melepas pemutar </span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
