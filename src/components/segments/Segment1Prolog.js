"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { scrapbookData } from "@/data/scrapbookData";
import { Sparkles, Heart, ArrowDown } from "lucide-react";
import { useAudio } from "@/components/audio/AudioProvider";

export function Segment1Prolog({ onComplete }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { startBgm, playSfx } = useAudio();

  // Memicu proses unboxing kado
  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // 1. Mainkan melodi pembuka kado (chime)
    playSfx("unboxing-chime");

    // 2. Mulai BGM mengalun lembut
    startBgm();

    // 3. Letupan partikel konfeti kertas & kelopak bunga
    try {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.58 },
        colors: ["#E8B4B8", "#E2C275", "#B8C4B8", "#FFFFFF", "#D98E7B"],
        disableForReducedMotion: true,
      });

      setTimeout(() => {
        confetti({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.6 },
          colors: ["#F4D08C", "#E8B4B8", "#FAF7F2"],
        });
        confetti({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.6 },
          colors: ["#F4D08C", "#E8B4B8", "#FAF7F2"],
        });
      }, 250);
    } catch (e) {
      console.log("Confetti trigger:", e);
    }

    // 4. Beri jeda estetik agar Adiba menikmati animasi bukaan kado sebelum pindah segmen
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-xs w-full flex flex-col items-center"
      >
        {/* Badge Header Scrapbook */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8B4B8]/25 border border-[#E8B4B8]/50 text-[#5C2B31] text-xs font-sans-ui font-medium mb-3.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C26D57]" />
          <span>The Scrapbook of Us</span>
        </motion.div>

        {/* Nama Penerima */}
        <h1 className="font-handwriting text-4xl sm:text-5xl text-[#2C2621] mb-1.5 font-bold tracking-wide">
          {scrapbookData.recipient.greeting}
        </h1>

        <p className="font-sans-ui text-xs text-[#6B6259] mb-8 leading-relaxed max-w-[280px]">
          {scrapbookData.recipient.boxSubtitle}
        </p>

        {/* KOTAK KADO 3D BERLAPIS */}
        <div className="relative w-56 h-56 flex items-center justify-center my-2">
          {/* Efek Pijar Cahaya dari Dalam Kado saat Terbuka */}
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1.4 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/40 via-rose-300/30 to-amber-200/40 blur-2xl -z-10"
              />
            )}
          </AnimatePresence>

          {/* Badan Kotak Kado (Gift Box Base) */}
          <div className="relative w-48 h-44 rounded-3xl bg-gradient-to-br from-[#D98E7B] via-[#C97660] to-[#B5614C] shadow-2xl border-2 border-white/30 overflow-hidden flex items-center justify-center paper-shadow-lifted">
            {/* Tekstur Halus Kertas Kado */}
            <div
              className="absolute inset-0 opacity-15 mix-blend-overlay"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Pita Emas Vertikal pada Badan Kado */}
            <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-md border-x border-[#B27D42]/30 flex items-center justify-center">
              <div className="w-0.5 h-full border-l border-dashed border-[#8C5824]/40" />
            </div>

            {/* Pita Emas Horisontal pada Badan Kado */}
            <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-md border-y border-[#B27D42]/30 flex items-center justify-center">
              <div className="h-0.5 w-full border-t border-dashed border-[#8C5824]/40" />
            </div>

            {/* Konten Dalam Kado (Terungkap saat Tutup Terbuka) */}
            <AnimatePresence>
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="z-20 flex flex-col items-center text-center p-3"
                >
                  <Heart className="w-8 h-8 text-rose-100 fill-rose-200 mb-1 drop-shadow animate-pulse" />
                  <span className="font-handwriting text-xl text-white font-bold drop-shadow">
                    Membuka Kenangan...
                  </span>
                  <span className="font-typewriter text-[10px] text-amber-100/90 tracking-wide mt-0.5">
                    Side A: Mixtape
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tutup Kotak Kado 3D (Gift Box Lid) */}
          <motion.div
            className="absolute top-2 w-52 h-14 rounded-2xl bg-gradient-to-b from-[#E29B89] to-[#C26D57] shadow-lg border-2 border-white/40 z-30 flex items-center justify-center"
            style={{ transformOrigin: "top center" }}
            animate={
              isOpened
                ? {
                    y: -110,
                    x: 18,
                    rotateX: -45,
                    rotateZ: 8,
                    scale: 1.08,
                    opacity: 0,
                  }
                : { y: 0, x: 0, rotateX: 0, rotateZ: 0, opacity: 1 }
            }
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pita Emas Vertikal pada Tutup */}
            <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow border-x border-[#B27D42]/30 flex items-center justify-center">
              <div className="w-0.5 h-full border-l border-dashed border-[#8C5824]/40" />
            </div>

            {/* Pita Emas Horisontal pada Tutup */}
            <div className="absolute left-0 right-0 h-6 bg-gradient-to-b from-[#DDA76A] via-[#FCE39E] to-[#C89254] shadow-inner border-y border-[#B27D42]/30" />
          </motion.div>

          {/* SIMPUL PITA INTERAKTIF (Draggable Ribbon Bow Knot) */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute z-40 cursor-grab active:cursor-grabbing flex flex-col items-center"
                style={{ top: "18px" }}
                drag
                dragConstraints={{ top: -10, bottom: 90, left: -40, right: 40 }}
                dragElastic={0.45}
                onDragStart={() => setIsDragging(true)}
                onDrag={(e, info) => {
                  // Jika ditarik lebih dari 65px ke bawah, buka kado otomatis
                  if (info.offset.y > 65 || Math.abs(info.offset.x) > 75) {
                    handleOpenGift();
                  }
                }}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  if (info.offset.y > 50 || Math.abs(info.offset.x) > 60) {
                    handleOpenGift();
                  }
                }}
                onClick={handleOpenGift}
                exit={{ scale: 0, opacity: 0, rotate: 45, transition: { duration: 0.4 } }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Visual Simpul Pita Satin (Bow Knot) */}
                <div className="relative flex items-center justify-center">
                  {/* Sayap Pita Kiri */}
                  <motion.div
                    className="w-8 h-6 rounded-full bg-gradient-to-tr from-[#C89254] via-[#FCE39E] to-[#E5B576] shadow-md -rotate-35 border border-[#B27D42]/40 -mr-2"
                    animate={{ rotate: isDragging ? -45 : -35 }}
                  />

                  {/* Simpul Tengah Pita */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFF0C2] via-[#E8B76E] to-[#AD7635] shadow-lg border-2 border-white/70 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-amber-200/80" />
                  </div>

                  {/* Sayap Pita Kanan */}
                  <motion.div
                    className="w-8 h-6 rounded-full bg-gradient-to-tl from-[#C89254] via-[#FCE39E] to-[#E5B576] shadow-md rotate-35 border border-[#B27D42]/40 -ml-2"
                    animate={{ rotate: isDragging ? 45 : 35 }}
                  />
                </div>

                {/* Ekor Pita Menguntai ke Bawah */}
                <div className="flex gap-2 -mt-1 pointer-events-none">
                  <motion.div
                    className="w-2.5 h-10 bg-gradient-to-b from-[#FCE39E] to-[#C89254] rounded-b -rotate-12 shadow-sm border border-[#B27D42]/30"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}
                    animate={{ rotate: isDragging ? -22 : -12 }}
                  />
                  <motion.div
                    className="w-2.5 h-12 bg-gradient-to-b from-[#FCE39E] to-[#C89254] rounded-b rotate-12 shadow-sm border border-[#B27D42]/30"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)" }}
                    animate={{ rotate: isDragging ? 22 : 12 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Petunjuk Interaksi / Call-to-Action */}
        <AnimatePresence>
          {!isOpened ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center mt-5 cursor-pointer"
              onClick={handleOpenGift}
            >
              <div className="flex items-center gap-1 text-[#C26D57] font-medium text-xs bg-white/70 backdrop-blur px-3 py-1.5 rounded-full border border-amber-900/10 shadow-sm active:scale-95 transition-all">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                <span>{scrapbookData.recipient.ribbonInstruction}</span>
              </div>
              <span className="text-[11px] font-sans-ui text-[#9E9489] mt-1.5">
                (Tarik ke bawah atau ketuk pita kado)
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 font-handwriting text-xl text-[#2C2621]"
            >
              Menyiapkan lembaran kenangan... ✨
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
