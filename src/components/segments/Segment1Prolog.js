"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { scrapbookData } from "@/data/scrapbookData";
import { ArrowDown, ChevronRight, Stamp } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment1Prolog({ onComplete }) {
  const [isOpened, setIsOpened] = useState(false);
  const [dragY, setDragY] = useState(0);
  const { startBgm, playSfx } = useAudio();

  // Memicu pembukaan kado saat pita ditarik lepas
  const handleOpenParcel = () => {
    if (isOpened) return;
    setIsOpened(true);

    playSfx("unboxing-chime");
    startBgm();

    try {
      confetti({
        particleCount: 50,
        spread: 85,
        origin: { y: 0.5 },
        colors: ["#E8B4B8", "#E2C275", "#B8C4B8", "#FAF7F2", "#C26D57"],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 35,
          angle: 60,
          spread: 65,
          origin: { x: 0.15, y: 0.55 },
          colors: ["#E8B4B8", "#FAF7F2", "#D4A373"],
        });
        confetti({
          particleCount: 35,
          angle: 120,
          spread: 65,
          origin: { x: 0.85, y: 0.55 },
          colors: ["#E8B4B8", "#FAF7F2", "#D4A373"],
        });
      }, 250);
    } catch (e) {
      console.log("Confetti trigger:", e);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* TAMPILAN 1: PAKET POS KERTAS KRAFT VINTAGE (HUMANIS & ANTI-AI SLOP) */
          <motion.div
            key="parcel-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }}
            className="w-full max-w-sm flex flex-col items-center"
          >
            {/* Judul Scrapbook Standout & Terbaca Jelas */}
            <div className="text-center mb-5">
              <span className="font-typewriter text-xs tracking-widest text-[#8A7968] uppercase font-bold block mb-1">
                The Scrapbook of Us
              </span>
              <h1 className="font-handwriting text-4xl sm:text-5xl text-[#1E1915] font-bold tracking-wide">
                Untuk Askiyaa, Pilkom '25
              </h1>
              <p className="font-sans-ui text-xs text-[#6B5E52] mt-1">
                Ada sebuah paket kecil yang baru saja sampai untukmu.
              </p>
            </div>

            {/* PAKET KERTAS KRAFT NYATA (HANDCRAFTED PARCEL) */}
            <div className="relative w-full max-w-[320px] bg-[#E3D3BE] rounded-2xl p-5 shadow-2xl border-2 border-[#CBB69E] paper-shadow-lifted overflow-visible">
              {/* Tekstur Lipatan Kertas Kraft Alami */}
              <div
                className="absolute inset-0 opacity-10 rounded-2xl pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#5C4731 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                }}
              />

              {/* Header Paket: Prangko Pos Vintage & Cap Stempel Pos Lingkaran */}
              <div className="flex items-start justify-between relative z-10 mb-4 pb-2 border-b border-[#C7B299]/60">
                {/* Cap Stempel Pos Lingkaran Hitam Vintage */}
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#524436]/50 p-1 flex flex-col items-center justify-center -rotate-12 select-none opacity-80">
                  <span className="font-typewriter text-[7px] text-[#524436] tracking-tighter uppercase font-bold">
                    PILKOM '25
                  </span>
                  <div className="w-10 h-0.5 bg-[#524436]/40 my-0.5" />
                  <span className="font-typewriter text-[8px] text-[#524436] font-bold">
                    ARCHIVE
                  </span>
                  <span className="font-typewriter text-[6px] text-[#524436]/80">BANDUNG</span>
                </div>

                {/* Prangko Pos Vintage Bergerigi (Serrated Stamp) */}
                <div className="relative bg-[#F4EDE2] border-2 border-dashed border-[#A8947E] p-1.5 rounded-sm shadow-sm rotate-6 flex flex-col items-center">
                  <div className="w-11 h-12 bg-[#8C6D58] rounded-xs flex flex-col items-center justify-center text-[#F4EDE2] p-1">
                    <span className="text-[14px]">🕊️</span>
                    <span className="font-typewriter text-[7px] font-bold mt-0.5 tracking-tighter">
                      Rp 250,-
                    </span>
                  </div>
                  <span className="font-typewriter text-[6px] text-[#7A6652] tracking-tight mt-0.5 uppercase">
                    Pos Kenangan
                  </span>
                </div>
              </div>

              {/* Tulisan Tangan Alamat Nyata di Paket */}
              <div className="relative z-10 space-y-2 mb-6 font-handwriting text-left pl-2">
                <div>
                  <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#736354] block">
                    Penerima:
                  </span>
                  <span className="text-2xl sm:text-3xl text-[#1E1915] font-bold block leading-tight">
                    Adiba (Askiyaa)
                  </span>
                  <span className="text-sm text-[#594B3D] block font-sans-ui">
                    Ilmu Komputer — Angkatan 2025
                  </span>
                </div>

                <div className="pt-1">
                  <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#736354] block">
                    Pengirim:
                  </span>
                  <span className="text-xl text-[#8C3E2D] font-bold block">
                    Tatwa
                  </span>
                </div>
              </div>

              {/* Tali Pita Ikat yang Menguntai (Draggable Ribbon) */}
              <div className="relative z-20 flex flex-col items-center justify-center pt-2">
                <motion.div
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 120 }}
                  dragElastic={0.2}
                  onDrag={(e, info) => {
                    setDragY(info.offset.y);
                    if (info.offset.y > 65) {
                      handleOpenParcel();
                    }
                  }}
                  onDragEnd={(e, info) => {
                    if (info.offset.y > 50) {
                      handleOpenParcel();
                    }
                    setDragY(0);
                  }}
                  className="cursor-grab active:cursor-grabbing flex flex-col items-center"
                >
                  {/* Simpul Pita Tengah */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-5 rounded-full bg-[#B8543D] -rotate-25 shadow-sm -mr-2 border border-[#8C3420]" />
                    <div className="w-6 h-6 rounded-full bg-[#8C3420] text-amber-100 flex items-center justify-center font-typewriter text-[9px] font-bold shadow-md z-10 border border-amber-200/50">
                      🎀
                    </div>
                    <div className="w-8 h-5 rounded-full bg-[#B8543D] rotate-25 shadow-sm -ml-2 border border-[#8C3420]" />
                  </div>

                  {/* Tali Pita yang Menguntai ke Bawah */}
                  <div className="flex gap-1.5 -mt-0.5">
                    <motion.div
                      className="w-2.5 bg-[#B8543D] rounded-b shadow-sm"
                      style={{ height: `${48 + dragY * 0.4}px` }}
                    />
                    <motion.div
                      className="w-2.5 bg-[#8C3420] rounded-b shadow-sm"
                      style={{ height: `${58 + dragY * 0.4}px` }}
                    />
                  </div>

                  {/* Panduan Tarik Pita Berkelap-kelip Nyata */}
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="mt-1.5 px-3.5 py-1.5 rounded-full bg-[#1E1915] text-amber-200 font-sans-ui text-xs font-bold shadow-lg flex items-center gap-1.5 border border-amber-300/30"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                    <span>Tarik pita ke bawah</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            {/* Bantuan Petunjuk di Bawah Paket */}
            <p className="font-sans-ui text-xs text-[#7A6B5C] mt-4">
              Pegang simpul pita merah di atas, lalu tarik ke bawah untuk membuka paket ✉️
            </p>
          </motion.div>
        ) : (
          /* TAMPILAN 2: SURAT KENANGAN LENGKAP (KONTEN LEGA, TIPOGRAFI STANDOUT, TANPA OVERLAPPING) */
          <motion.div
            key="letter-view"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-sm bg-[#FFFDF8] rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#E5DACB] text-[#1E1915] relative text-left paper-shadow-lifted my-auto"
          >
            {/* Washi Tape Nyata di Atas Surat */}
            <WashiTape color="rose" angle={-1.5} className="absolute -top-2.5 left-8" />
            <WashiTape color="sage" angle={2} className="absolute -top-2.5 right-8" />

            {/* Header Surat */}
            <div className="flex items-center justify-between border-b border-[#E8DCCF] pb-2.5 mb-4">
              <span className="font-typewriter text-xs text-[#8C7A68] tracking-widest uppercase font-bold">
                SURAT PEMBUKA
              </span>
              <span className="font-typewriter text-xs text-[#B8543D] font-semibold">
                Lembar 01 / 08
              </span>
            </div>

            {/* Judul Surat Standout & Besar */}
            <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#1E1915] mb-2 leading-tight">
              Untuk Adiba (Askiyaa),
            </h2>

            {/* Isi Surat Terbaca Jelas & Menyentuh */}
            <div className="space-y-3 font-sans-ui text-sm sm:text-base text-[#382F26] leading-relaxed mb-6 font-normal">
              <p>
                Selamat datang di buku kenangan kecil kita.
              </p>
              <p>
                Setiap lembar di sini menyimpan lagu-lagu, tawa, obrolan, dan cerita yang pernah ada di antara kita. Buka perlahan dan nikmati perjalanannya ya.
              </p>
            </div>

            {/* Tanda Tangan Tatwa Besar */}
            <div className="font-handwriting text-2xl sm:text-3xl font-bold text-[#B8543D] text-right mb-6">
              — Tatwa
            </div>

            {/* Tombol Lanjut yang Jelas & Kontras Tinggi */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1E1915] hover:bg-black text-[#F4EDE2] font-sans-ui text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Mulai Buka Lembaran Pertama (Mixtape Kita)</span>
              <ChevronRight className="w-4 h-4 text-amber-300" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
