"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { scrapbookData } from "@/data/scrapbookData";
import { Sparkles, ArrowDown, ChevronRight, Heart } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment1Prolog({ onComplete }) {
  const [isOpened, setIsOpened] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const { startBgm, playSfx } = useAudio();

  // Memicu pembukaan kado saat pita ditarik melebihi ambang batas
  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Mainkan audio pembuka manis & aktifkan BGM
    playSfx("unboxing-chime");
    startBgm();

    // Letupan konfeti pastel lembut
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.52 },
        colors: ["#E8B4B8", "#E2C275", "#B8C4B8", "#FFFFFF", "#D98E7B"],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 60,
          origin: { x: 0.15, y: 0.55 },
          colors: ["#F4D08C", "#E8B4B8", "#FAF7F2"],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 60,
          origin: { x: 0.85, y: 0.55 },
          colors: ["#F4D08C", "#E8B4B8", "#FAF7F2"],
        });
      }, 250);
    } catch (e) {
      console.log("Confetti trigger:", e);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xs w-full flex flex-col items-center"
      >
        {/* Badge Header Scrapbook */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B4B8]/25 border border-[#E8B4B8]/60 text-[#5C2B31] text-xs font-sans-ui font-medium mb-3 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C26D57]" />
          <span>The Scrapbook of Us</span>
        </motion.div>

        {/* Judul & Sapaan untuk Adiba */}
        <h1 className="font-handwriting text-4xl sm:text-5xl text-[#2C2621] mb-1 font-bold tracking-wide drop-shadow-xs">
          {scrapbookData.recipient.greeting}
        </h1>

        <p className="font-sans-ui text-xs text-[#6B6259] mb-6 leading-relaxed max-w-[280px]">
          {scrapbookData.recipient.boxSubtitle}
        </p>

        {/* WADAH UTAMA KOTAK KADO DENGAN 3D PERSPECTIVE */}
        <div className="relative w-64 h-72 flex items-center justify-center">
          
          {/* Badan Kotak Kado (Gift Box Base) */}
          <motion.div
            className="absolute bottom-6 w-52 h-44 rounded-3xl bg-gradient-to-br from-[#D98E7B] via-[#C97660] to-[#AD5843] shadow-2xl border-2 border-white/40 overflow-hidden flex items-center justify-center paper-shadow-lifted"
            animate={isOpened ? { scale: 0.96, y: 15 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Tekstur Kertas Berpori */}
            <div
              className="absolute inset-0 opacity-15 mix-blend-overlay"
              style={{
                backgroundImage: "radial-gradient(#fff 1.2px, transparent 1.2px)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* Pita Emas Vertikal pada Badan Kado */}
            <div className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-md border-x border-[#B27D42]/40 flex items-center justify-center">
              <div className="w-0.5 h-full border-l border-dashed border-[#8C5824]/50" />
            </div>

            {/* Pita Emas Horisontal pada Badan Kado */}
            <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-md border-y border-[#B27D42]/40 flex items-center justify-center">
              <div className="h-0.5 w-full border-t border-dashed border-[#8C5824]/50" />
            </div>

            {/* Aksen Jahitan Emas Sudut Kado */}
            <div className="absolute inset-2 border border-white/20 rounded-2xl pointer-events-none" />
          </motion.div>

          {/* Tutup Kotak Kado 3D (Lid) yang Terangkat Naik ke Atas */}
          <motion.div
            className="absolute top-14 w-56 h-16 rounded-2xl bg-gradient-to-b from-[#E7A392] via-[#D5836E] to-[#BF6650] shadow-xl border-2 border-white/50 z-30 flex items-center justify-center"
            style={{ transformOrigin: "top center" }}
            animate={
              isOpened
                ? {
                    y: -140,
                    x: 20,
                    rotateX: -45,
                    rotateZ: 8,
                    scale: 1.05,
                    opacity: 0,
                  }
                : { y: 0, x: 0, rotateX: 0, rotateZ: 0, opacity: 1 }
            }
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pita Vertikal Tutup */}
            <div className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-inner border-x border-[#B27D42]/40 flex items-center justify-center">
              <div className="w-0.5 h-full border-l border-dashed border-[#8C5824]/50" />
            </div>
            {/* Pita Horisontal Tutup */}
            <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-inner border-y border-[#B27D42]/40" />

            {/* Tag Kado Vintage Gantung */}
            <div className="absolute -right-2 -bottom-3 bg-[#FAF3E8] border border-amber-800/30 text-[#4A3B32] px-2.5 py-0.5 rounded shadow-sm text-[10px] font-handwriting rotate-12 flex items-center gap-1 z-40">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-800/40" />
              <span>Untuk Diba ✨</span>
            </div>
          </motion.div>

          {/* PITA SATIN PANJANG DENGAN GESTUR DRAG MURNI (TANPA TOMBOL) */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute z-40 flex flex-col items-center cursor-grab active:cursor-grabbing"
                style={{ top: "82px" }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 130 }}
                dragElastic={0.25}
                onDrag={(e, info) => {
                  setDragProgress(Math.min(1, Math.max(0, info.offset.y / 75)));
                  if (info.offset.y > 75) {
                    handleOpenGift();
                  }
                }}
                onDragEnd={(e, info) => {
                  if (info.offset.y > 60) {
                    handleOpenGift();
                  }
                  setDragProgress(0);
                }}
                exit={{ scale: 0, opacity: 0, y: 30, transition: { duration: 0.35 } }}
              >
                {/* Simpul Pita Tengah */}
                <div className="relative flex items-center justify-center mb-1">
                  {/* Sayap Pita Kiri */}
                  <motion.div
                    className="w-9 h-7 rounded-full bg-gradient-to-tr from-[#C89254] via-[#FCE39E] to-[#E5B576] shadow-md -rotate-30 border border-[#B27D42]/40 -mr-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />

                  {/* Simpul Lingkar Tengah */}
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFF5D6] via-[#E8B76E] to-[#AD7635] shadow-lg border-2 border-white/80 z-10 flex items-center justify-center">
                    <Heart className="w-3 h-3 text-amber-900/60 fill-amber-900/30" />
                  </div>

                  {/* Sayap Pita Kanan */}
                  <motion.div
                    className="w-9 h-7 rounded-full bg-gradient-to-tl from-[#C89254] via-[#FCE39E] to-[#E5B576] shadow-md rotate-30 border border-[#B27D42]/40 -ml-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.2 }}
                  />
                </div>

                {/* Ekor Pita Menguntai Panjang yang Ditarik */}
                <div className="relative flex flex-col items-center">
                  <div className="flex gap-2">
                    <motion.div
                      className="w-3.5 h-16 bg-gradient-to-b from-[#FCE39E] via-[#E5B576] to-[#C89254] rounded-b shadow border border-[#B27D42]/30"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)" }}
                      animate={{ scaleY: 1 + dragProgress * 0.4 }}
                    />
                    <motion.div
                      className="w-3.5 h-20 bg-gradient-to-b from-[#FCE39E] via-[#E5B576] to-[#C89254] rounded-b shadow border border-[#B27D42]/30"
                      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)" }}
                      animate={{ scaleY: 1 + dragProgress * 0.4 }}
                    />
                  </div>

                  {/* Tag / Lingkar Tarik di Ujung Pita */}
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="mt-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-[#5C2B31] text-[11px] font-semibold shadow-md border border-white/80 flex items-center gap-1.5 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
                  >
                    <ArrowDown className="w-3 h-3 text-[#5C2B31] animate-bounce" />
                    <span>Tarik ke bawah</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* KARTU SURAT PERKAMEN (KELUAR DARI KADO - SANGAT KONTRAS & JELAS TERBACA) */}
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: -10, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="absolute z-50 w-[275px] bg-[#FFFDF9] p-5 rounded-2xl paper-shadow-lifted border border-amber-900/15 text-[#2C2621] text-left flex flex-col"
              >
                {/* Washi Tape Dekoratif di Bagian Atas Kartu */}
                <WashiTape color="rose" angle={-2} className="absolute -top-2 left-8" />

                <div className="flex items-center justify-between mb-1.5 pt-1">
                  <span className="font-typewriter text-[10px] uppercase tracking-wider text-amber-800 font-semibold">
                    Surat Pembuka
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                </div>

                <h2 className="font-handwriting text-2xl font-bold text-[#2C2621] mb-1.5 leading-snug">
                  Selamat datang di buku kenangan kecil kita.
                </h2>

                <p className="font-sans-ui text-xs text-[#4A423B] leading-relaxed mb-3 font-normal">
                  Setiap lembar di sini menyimpan lagu, tawa, obrolan, dan cerita yang pernah ada. Buka perlahan dan nikmati perjalanannya ya.
                </p>

                <div className="font-handwriting text-lg text-right text-[#C26D57] font-bold mb-4">
                  — Tatwa
                </div>

                {/* Tombol Melangkah ke Segmen Berikutnya (Adiba Mengendalikan Waktu Membaca) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onComplete}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#C26D57] to-[#B05B47] text-white font-sans-ui text-xs font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Mulai Jelajahi Lembaran (Mixtape)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Teks Bantuan Interaksi saat Kado Belum Terbuka */}
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center text-center mt-2"
          >
            <p className="text-xs font-sans-ui text-[#80756B] bg-white/70 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-amber-900/10 shadow-xs">
              Pegang simpul pita di atas, lalu <span className="text-[#C26D57] font-semibold">geser / tarik ke bawah</span> 🎀
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
