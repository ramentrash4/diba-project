"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowUp, Disc, Music, Sparkles } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment1Prolog({ onComplete }) {
  // isUnsealed: segel lilin terbuka & tutup amplop melipat ke atas
  const [isUnsealed, setIsUnsealed] = useState(false);
  // isEnvelopeSlidingDown: amplop bergerak turun & kertas surat meluncur naik
  const [isEnvelopeSlidingDown, setIsEnvelopeSlidingDown] = useState(false);
  // isLetterActive: surat sudah sepenuhnya berada di tengah dan siap dibaca
  const [isLetterActive, setIsLetterActive] = useState(false);

  const { startBgm, playSfx } = useAudio();

  // Membuka segel lilin dan memulai koreografi fisik
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

    // Setelah tutup amplop melipat ke atas (450ms), amplop turun ke bawah dibarengi kertas meluncur naik
    setTimeout(() => {
      setIsEnvelopeSlidingDown(true);
      playSfx("paper-swoosh");
    }, 550);

    // Surat sepenuhnya stabil di tengah panggung
    setTimeout(() => {
      setIsLetterActive(true);
    }, 1250);
  };

  // Transisi ke Segmen 2 saat kaset yang mengintip ditarik / diketuk
  const handleProceedToMixtape = () => {
    playSfx("page-turn");
    onComplete();
  };

  return (
    <section className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden my-auto">
      <div className="w-full max-w-[345px] relative flex flex-col items-center">
        {/* HEADER SAPAAN UNTUK ADIBA (Hanya tampil saat amplop masih ada di layar) */}
        <AnimatePresence>
          {!isEnvelopeSlidingDown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              className="text-center mb-3.5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#CDB9A0] text-[#423223] font-black text-[11px] font-sans-ui tracking-wide shadow-xs mb-1">
                The Scrapbook of Us
              </span>
              <h1 className="font-handwriting text-4xl sm:text-5xl text-[#120C08] font-black tracking-wide leading-tight drop-shadow-xs">
                Untuk Askiyaa, Pilkom '25
              </h1>
              <p className="font-sans-ui text-xs text-[#3D3024] font-bold mt-1">
                Ada sepucuk surat kenangan yang disegel khusus untukmu.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AREA PANGGUNG FISIK: AMPLOP DAN SURAT BERKOORDINASI */}
        <div className="relative w-full flex flex-col items-center justify-center min-h-[380px]">
          {/* 1. AMPLOP SURAT VINTAGE DENGAN PRANGKO ASLI & TUTUP 3D */}
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={
              isEnvelopeSlidingDown
                ? { y: 280, opacity: 0, scale: 0.92, pointerEvents: "none" }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
            className={`relative w-full h-[245px] bg-[#EADECE] rounded-2xl shadow-2xl border-2 border-[#CDB8A0] paper-shadow-lifted overflow-visible flex flex-col justify-between p-4 ${
              isEnvelopeSlidingDown ? "pointer-events-none absolute z-0" : "z-20"
            }`}
            style={{ perspective: "1000px" }}
          >
            {/* Garis Tepian Pos Klasik (Airmail Striping) */}
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
              {/* Cap Stempel Bundar Pos Bandung */}
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

              {/* GAMBAR PRANGKO ASLI DARI USER (public/images/prangko.webp) */}
              <div className="relative group select-none">
                <img
                  src="/images/prangko.webp"
                  alt="Prangko Indonesia Vintage"
                  className="w-18 sm:w-20 object-contain rounded-xs shadow-md border-2 border-white/90 -rotate-2"
                />
                <div className="absolute -bottom-2 -left-3 w-10 h-10 rounded-full border border-black/35 border-dashed pointer-events-none rotate-45" />
              </div>
            </div>

            {/* Area Bawah: Tulisan Tangan Alamat Penerima */}
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

            {/* TUTUP SEGITIGA AMPLOP 3D (LID FLAP) YANG MELIPAT KE ATAS 180 DERAJAT */}
            <motion.div
              className="absolute inset-x-0 top-0 h-28 z-20 flex items-start justify-center overflow-visible"
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              animate={
                isUnsealed
                  ? {
                      rotateX: -180,
                      zIndex: 0,
                    }
                  : {
                      rotateX: 0,
                      zIndex: 20,
                    }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Segitiga Lipatan Amplop */}
              <div
                className="w-full h-24 bg-[#DAC9B3] shadow-md border-b-2 border-[#C4B19A] relative flex items-end justify-center pb-2"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />

              {/* CAP SEGEL LILIN MERAH (WAX SEAL) DI UJUNG SEGITIGA */}
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
          </motion.div>

          {/* TEKS BANTUAN BUKA SEGEL LILIN (Hanya tampil saat amplop belum dibuka) */}
          <AnimatePresence>
            {!isUnsealed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
                className="mt-5 px-4 py-2 rounded-full bg-[#1C1510] text-[#FDE39E] font-sans-ui text-xs font-bold shadow-md flex items-center gap-1.5 border border-amber-400/40 cursor-pointer hover:bg-black transition-colors"
                onClick={handleOpenEnvelope}
              >
                <ArrowUp className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                <span>Sentuh atau geser segel lilin merah ke atas ✉️</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. SURAT PEMBUKA YANG MELUNCUR NAIK DARI DALAM AMPLOP */}
          {isEnvelopeSlidingDown && (
            <motion.div
              initial={{ y: 90, opacity: 0, scale: 0.88 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="w-full bg-[#FFFDF8] rounded-3xl p-5 sm:p-6 shadow-2xl border border-[#E5DACB] text-[#120C08] relative text-left paper-shadow-lifted z-30 flex flex-col"
            >
              {/* Washi Tape Nyata di Atas Kertas Surat */}
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

              {/* Isi Surat */}
              <div className="space-y-2.5 font-sans-ui text-xs sm:text-sm text-[#2D2319] leading-relaxed mb-4 font-semibold">
                <p>Selamat datang di buku kenangan kecil kita.</p>
                <p>
                  Setiap lembar di sini menyimpan lagu-lagu, tawa, obrolan, dan cerita yang pernah ada di antara kita. Buka perlahan dan nikmati perjalanannya ya.
                </p>
              </div>

              {/* Tanda Tangan Tatwa */}
              <div className="font-handwriting text-2xl font-black text-[#8C2318] text-right mb-4">
                — Tatwa
              </div>

              {/* 3. PENGGANTI TOMBOL: KASET PITA MENGINTIP SEBAGAI TRANSISI KE SEGMEN 2 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-1 pt-3 border-t border-dashed border-[#DAC9B4] flex flex-col items-center"
              >
                {/* Visual Kaset Pita Mini yang Terselip di Bawah Surat */}
                <motion.div
                  drag="y"
                  dragConstraints={{ top: -60, bottom: 0 }}
                  dragElastic={0.2}
                  dragSnapToOrigin={true}
                  onDragEnd={(e, info) => {
                    if (info.offset.y < -30) {
                      handleProceedToMixtape();
                    }
                  }}
                  onClick={handleProceedToMixtape}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#EAD8C7] rounded-xl p-2.5 border-2 border-[#A85848] shadow-md flex items-center justify-between cursor-pointer hover:shadow-lg transition-all relative overflow-hidden group"
                >
                  {/* Pita Magnetik Dekoratif */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#4A2D16] opacity-70" />

                  {/* Dua Roda Lubang Mini Kaset */}
                  <div className="flex items-center gap-1.5 shrink-0 pl-1">
                    <div className="w-5 h-5 rounded-full bg-white border border-[#3D2E1C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#3D2E1C]" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white border border-[#3D2E1C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#3D2E1C]" />
                    </div>
                  </div>

                  {/* Label Kertas Mixtape */}
                  <div className="flex-1 mx-2.5 bg-[#FFFDF8] border border-[#CBB69E] rounded px-2.5 py-1 shadow-xs flex flex-col justify-center text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-typewriter text-[7px] font-black uppercase text-[#8C3420] tracking-wider">
                        SIDE A • SOUNDTRACK
                      </span>
                      <Disc className="w-3 h-3 text-[#A83226] animate-spin-slow" />
                    </div>
                    <span className="font-sans-ui text-xs font-black text-[#140E0A] leading-tight truncate">
                      Buka Pemutar Mixtape Kenangan 🎵
                    </span>
                  </div>

                  {/* Panah Indikator Aksi */}
                  <div className="pr-1">
                    <div className="w-6 h-6 rounded-full bg-[#8C3420] text-white flex items-center justify-center text-xs font-black shadow-xs group-hover:-translate-y-0.5 transition-transform">
                      ↑
                    </div>
                  </div>
                </motion.div>

                {/* Teks Bantuan / Hint yang Jelas & Berdenyut Lembut */}
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="mt-2 flex items-center gap-1 text-[#664C35] text-[10.5px] font-sans-ui font-bold"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Tarik kaset ke atas atau ketuk untuk membuka tape deck</span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
