"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { scrapbookData } from "@/data/scrapbookData";
import { ArrowUp, ChevronRight } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment1Prolog({ onComplete }) {
  const [isOpened, setIsOpened] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);
  const { startBgm, playSfx } = useAudio();

  // Membuka segel lilin amplop
  const handleUnsealEnvelope = () => {
    if (isOpened) return;
    setIsOpened(true);

    playSfx("unboxing-chime");
    startBgm();

    try {
      confetti({
        particleCount: 45,
        spread: 80,
        origin: { y: 0.52 },
        colors: ["#E8B4B8", "#E2C275", "#B8C4B8", "#FAF7F2", "#C26D57"],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.55 },
          colors: ["#E8B4B8", "#FAF7F2", "#E2C275"],
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.55 },
          colors: ["#E8B4B8", "#FAF7F2", "#E2C275"],
        });
      }, 250);
    } catch (e) {
      console.log("Confetti trigger:", e);
    }
  };

  return (
    <section className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden my-auto">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* TAMPILAN 1: AMPLOP SURAT VINTAGE DENGAN CAP SEGEL LILIN (WAX SEAL STAMP) */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -25, transition: { duration: 0.55, ease: "easeInOut" } }}
            className="w-full max-w-[340px] flex flex-col items-center"
          >
            {/* Header Judul Manis & Standout */}
            <div className="text-center mb-5">
              <span className="font-typewriter text-[11px] tracking-widest text-[#7D6B5A] uppercase font-bold block mb-1">
                The Scrapbook of Us
              </span>
              <h1 className="font-handwriting text-4xl sm:text-5xl text-[#1E1915] font-bold tracking-wide">
                Untuk Askiyaa, Pilkom '25
              </h1>
              <p className="font-sans-ui text-xs text-[#6B5E52] mt-1.5">
                Ada sepucuk surat kenangan yang disegel khusus untukmu.
              </p>
            </div>

            {/* BENTUK AMPLOP SURAT KRAFT DENGAN DETAIL VINTAGE AIRMAIL */}
            <div className="relative w-full h-[230px] bg-[#E5D7C3] rounded-2xl shadow-2xl border-2 border-[#D1BFAB] paper-shadow-lifted overflow-hidden flex flex-col justify-between p-4">
              {/* Garis Tepian Pos Klasik (Airmail Striping di Tepi Amplop) */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #B8543D 0, #B8543D 10px, transparent 10px, transparent 18px, #3B5B88 18px, #3B5B88 28px, transparent 28px, transparent 36px)`,
                  backgroundSize: "100% 6px",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "top, bottom",
                }}
              />

              {/* Bagian Atas Amplop: Prangko Pos & Stempel Cap Tanggal */}
              <div className="flex items-start justify-between relative z-10">
                {/* Cap Stempel Bundar Pos Bandung */}
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#5C4C3E]/60 p-1 flex flex-col items-center justify-center -rotate-12 opacity-85 select-none">
                  <span className="font-typewriter text-[7px] text-[#5C4C3E] uppercase font-bold tracking-tighter">
                    PILKOM '25
                  </span>
                  <div className="w-8 h-0.5 bg-[#5C4C3E]/40 my-0.5" />
                  <span className="font-typewriter text-[7px] text-[#5C4C3E] font-bold">
                    ARCHIVE
                  </span>
                  <span className="font-typewriter text-[5px] text-[#5C4C3E]/80">BANDUNG</span>
                </div>

                {/* Prangko Pos Vintage */}
                <div className="bg-[#FAF5EC] border border-dashed border-[#A8947E] p-1 rounded shadow-xs rotate-3 flex flex-col items-center">
                  <div className="w-9 h-10 bg-[#8C6D58] rounded-xs flex flex-col items-center justify-center text-[#FAF5EC]">
                    <span className="text-xs">🕊️</span>
                    <span className="font-typewriter text-[6px] font-bold mt-0.5">Rp 250</span>
                  </div>
                </div>
              </div>

              {/* Tulisan Tangan Alamat Penerima & Pengirim di Atas Amplop */}
              <div className="relative z-10 text-left font-handwriting pl-2 -mt-2">
                <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#736354] block">
                  Penerima:
                </span>
                <span className="text-2xl text-[#1E1915] font-bold block leading-tight">
                  Adiba (Askiyaa)
                </span>
                <span className="text-xs text-[#594B3D] block font-sans-ui mb-1">
                  Ilmu Komputer '25
                </span>
                <span className="text-sm text-[#8C3E2D] font-bold block">
                  Dari: Tatwa
                </span>
              </div>

              {/* LIPATAN TUTUP AMPLOP SEGITIGA DENGAN CAP LILIN MERAH (WAX SEAL STAMP) */}
              <div className="absolute inset-x-0 top-0 h-28 pointer-events-none flex items-center justify-center">
                {/* Visual Segitiga Lipatan Amplop */}
                <div
                  className="w-full h-24 bg-[#DAC9B3] shadow-md border-b border-[#C4B19A]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />
              </div>

              {/* CAP SEGEL LILIN MERAH (WAX SEAL) YANG DAPAT DIGESER KE ATAS */}
              <div className="absolute left-1/2 -translate-x-1/2 top-16 z-30 flex flex-col items-center">
                <motion.div
                  drag="y"
                  dragConstraints={{ top: -75, bottom: 0 }}
                  dragElastic={0.25}
                  onDrag={(e, info) => {
                    setDragProgress(Math.min(1, Math.max(0, -info.offset.y / 55)));
                    if (info.offset.y < -55) {
                      handleUnsealEnvelope();
                    }
                  }}
                  onDragEnd={(e, info) => {
                    if (info.offset.y < -40) {
                      handleUnsealEnvelope();
                    }
                    setDragProgress(0);
                  }}
                  onClick={handleUnsealEnvelope}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#A83226] via-[#8C2318] to-[#63140C] shadow-xl border-2 border-[#C94A3C]/40 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95 transition-transform"
                  whileHover={{ scale: 1.06 }}
                >
                  {/* Pinggiran Lelehan Lilin Alami */}
                  <div className="w-11 h-11 rounded-full border border-amber-200/40 flex items-center justify-center shadow-inner">
                    {/* Monogram Huruf 'A' Timbul Emas */}
                    <span className="font-handwriting text-2xl font-bold text-amber-100 drop-shadow">
                      A
                    </span>
                  </div>
                </motion.div>

                {/* Indikator Animasi Geser ke Atas */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="mt-2.5 px-3 py-1 rounded-full bg-[#1E1915] text-amber-200 font-sans-ui text-[11px] font-bold shadow-md flex items-center gap-1 border border-amber-300/30 whitespace-nowrap cursor-pointer pointer-events-auto"
                  onClick={handleUnsealEnvelope}
                >
                  <ArrowUp className="w-3 h-3 text-amber-300 animate-bounce" />
                  <span>Buka Segel Lilin</span>
                </motion.div>
              </div>
            </div>

            {/* Petunjuk Tambahan di Bawah */}
            <p className="font-sans-ui text-xs text-[#7A6B5C] mt-4">
              Sentuh atau <span className="text-[#A83226] font-bold">geser segel lilin merah ke atas</span> untuk membuka ✉️
            </p>
          </motion.div>
        ) : (
          /* TAMPILAN 2: SURAT PEMBUKA LEGA (TIPOGRAFI BESAR, STANDOUT, BEBAS OVERLAPPING) */
          <motion.div
            key="letter-view"
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="w-full max-w-[340px] bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E5DACB] text-[#1E1915] relative text-left paper-shadow-lifted my-auto"
          >
            {/* Washi Tape Nyata di Atas Surat */}
            <WashiTape color="rose" angle={-2} className="absolute -top-2.5 left-7" />
            <WashiTape color="sage" angle={2} className="absolute -top-2.5 right-7" />

            {/* Header Surat */}
            <div className="flex items-center justify-between border-b border-[#E8DCCF] pb-2.5 mb-4 pt-1">
              <span className="font-typewriter text-[11px] text-[#8C7A68] tracking-widest uppercase font-bold">
                SURAT PEMBUKA
              </span>
              <span className="font-typewriter text-[11px] text-[#A83226] font-bold">
                Lembar 01 / 08
              </span>
            </div>

            {/* Judul Sapaan Besar & Standout */}
            <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#1E1915] mb-2 leading-tight">
              Untuk Adiba (Askiyaa),
            </h2>

            {/* Isi Surat Terbaca Jelas & Hangat */}
            <div className="space-y-3 font-sans-ui text-sm text-[#382F26] leading-relaxed mb-6 font-normal">
              <p>
                Selamat datang di buku kenangan kecil kita.
              </p>
              <p>
                Setiap lembar di sini menyimpan lagu-lagu, tawa, obrolan, dan cerita yang pernah ada di antara kita. Buka perlahan dan nikmati perjalanannya ya.
              </p>
            </div>

            {/* Tanda Tangan Tatwa */}
            <div className="font-handwriting text-2xl font-bold text-[#A83226] text-right mb-6">
              — Tatwa
            </div>

            {/* Tombol Lanjut ke Segmen 2 yang Jelas & Kontras */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1E1915] hover:bg-black text-[#F4EDE2] font-sans-ui text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Mulai Buka Lembaran Pertama (Mixtape)</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
