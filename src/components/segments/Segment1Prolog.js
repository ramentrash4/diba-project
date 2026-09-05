"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowUp, ChevronRight } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment1Prolog({ onComplete }) {
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const { startBgm, playSfx } = useAudio();

  // Membuka segel lilin dan melipat tutup amplop ke atas
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

    // Setelah tutup amplop melipat ke atas selama 0.75s, surat meluncur keluar mengambil fokus penuh
    setTimeout(() => {
      setShowLetter(true);
    }, 750);
  };

  return (
    <section className="min-h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-hidden my-auto">
      <AnimatePresence mode="wait">
        {!showLetter ? (
          /* TAMPILAN 1: AMPLOP SURAT VINTAGE DENGAN TUTUP 3D & PRANGKO ASLI */
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="w-full max-w-[340px] flex flex-col items-center"
          >
            {/* Header Sapaan untuk Adiba - SANGAT TEGAS, STANDOUT & KONTRAS TINGGI */}
            <div className="text-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9EE] border border-[#CDB9A0] text-[#423223] font-bold text-[11px] font-sans-ui tracking-wide shadow-xs mb-1.5">
                The Scrapbook of Us
              </span>
              <h1 className="font-handwriting text-4xl sm:text-5xl text-[#120C08] font-bold tracking-wide leading-tight drop-shadow-xs">
                Untuk Askiyaa, Pilkom '25
              </h1>
              <p className="font-sans-ui text-xs text-[#3D3024] font-medium mt-1">
                Ada sepucuk surat kenangan yang disegel khusus untukmu.
              </p>
            </div>

            {/* WADAH AMPLOP SURAT DENGAN PERSPEKTIF 3D */}
            <div
              className="relative w-full h-[250px] bg-[#EADECE] rounded-2xl shadow-2xl border-2 border-[#CDB8A0] paper-shadow-lifted overflow-visible flex flex-col justify-between p-4"
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
                  {/* Cap Pos Tinta di atas Prangko */}
                  <div className="absolute -bottom-2 -left-3 w-10 h-10 rounded-full border border-black/35 border-dashed pointer-events-none rotate-45" />
                </div>
              </div>

              {/* Area Bawah: Tulisan Tangan Alamat (100% Bersih & Tinta Gelap Tajam) */}
              <div className="relative z-10 text-left font-handwriting pl-2 pb-1">
                <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#524132] font-bold block">
                  Penerima:
                </span>
                <span className="text-2xl sm:text-3xl text-[#120C08] font-bold block leading-tight">
                  Adiba (Askiyaa)
                </span>
                <span className="text-xs text-[#382C20] font-sans-ui font-semibold block mt-0.5">
                  Ilmu Komputer — Angkatan 2025
                </span>
                <span className="text-sm text-[#8C2318] font-bold block mt-1">
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
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
                      exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                    >
                      {/* Cap Lilin Merah Hati Monogram 'A' */}
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

            {/* TEKS BANTUAN BERADA RAPI DI LUAR AMPLOP (TIDAK MENUTUPI ALAMAT) */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="mt-5 px-4 py-2 rounded-full bg-[#1C1510] text-[#FDE39E] font-sans-ui text-xs font-bold shadow-md flex items-center gap-1.5 border border-amber-400/40 cursor-pointer hover:bg-black transition-colors"
              onClick={handleOpenEnvelope}
            >
              <ArrowUp className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>Sentuh atau geser segel lilin merah ke atas ✉️</span>
            </motion.div>
          </motion.div>
        ) : (
          /* TAMPILAN 2: SURAT PEMBUKA LENGKAP & LEGA (BEBAS DARI KADO, TIPOGRAFI STANDOUT) */
          <motion.div
            key="letter-view"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-[340px] bg-[#FFFDF8] rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#E5DACB] text-[#120C08] relative text-left paper-shadow-lifted my-auto"
          >
            {/* Washi Tape Nyata di Atas Surat */}
            <WashiTape color="rose" angle={-2} className="absolute -top-2.5 left-7" />
            <WashiTape color="sage" angle={2} className="absolute -top-2.5 right-7" />

            {/* Header Surat */}
            <div className="flex items-center justify-between border-b border-[#E8DCCF] pb-2.5 mb-4 pt-1">
              <span className="font-typewriter text-[11px] text-[#6B5A4B] tracking-widest uppercase font-bold">
                SURAT PEMBUKA
              </span>
              <span className="font-typewriter text-[11px] text-[#8C2318] font-bold">
                Lembar 01 / 08
              </span>
            </div>

            {/* Judul Sapaan Standout & Besar */}
            <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#120C08] mb-2 leading-tight">
              Untuk Adiba (Askiyaa),
            </h2>

            {/* Isi Surat Terbaca Sangat Jelas & Menyentuh */}
            <div className="space-y-3 font-sans-ui text-sm text-[#2D2319] leading-relaxed mb-6 font-medium">
              <p>
                Selamat datang di buku kenangan kecil kita.
              </p>
              <p>
                Setiap lembar di sini menyimpan lagu-lagu, tawa, obrolan, dan cerita yang pernah ada di antara kita. Buka perlahan dan nikmati perjalanannya ya.
              </p>
            </div>

            {/* Tanda Tangan Tatwa */}
            <div className="font-handwriting text-2xl font-bold text-[#8C2318] text-right mb-6">
              — Tatwa
            </div>

            {/* Tombol Lanjut ke Segmen 2 yang Jelas & Kontras */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1C1510] hover:bg-black text-[#FAF2E6] font-sans-ui text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
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
