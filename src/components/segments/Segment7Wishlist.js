"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckSquare,
  Square,
  Sparkles,
  ChevronRight,
  Heart,
  Plane,
  FileText,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment7Wishlist({ onComplete }) {
  const { playSfx } = useAudio();
  const wishlist = scrapbookData.wishlist;

  // Status catatan refleksi yang sedang terbuka (default: item 0 terbuka sebagai petunjuk visual interaksi)
  const [revealedNotes, setRevealedNotes] = useState({ 0: true });

  // Status persentase sobekan garis perforasi (0 - 100)
  const [tearProgress, setTearProgress] = useState(0);
  const [isTorn, setIsTorn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggleItem = (idx) => {
    playSfx("pencil-scratch");
    setRevealedNotes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Interaksi Robek Tiket Boarding Pass Selesai (Zero Buttons)
  const handleTearComplete = () => {
    if (isTorn || isTransitioning) return;
    setIsTorn(true);
    setIsTransitioning(true);
    playSfx("ticket-tear");

    setTimeout(() => {
      playSfx("paper-swoosh");
    }, 180);

    setTimeout(() => {
      onComplete();
    }, 550);
  };

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-3 select-none relative overflow-hidden my-auto text-[#1E1712]">
      {/* WRAPPER TERFOKUS TEPAT DI TENGAH OPTIKAL LAYAR DENGAN PROPORSI SEIMBANG */}
      <div className="w-full max-w-[345px] sm:max-w-[360px] flex flex-col items-center justify-center gap-2.5 my-auto z-10">

        {/* SATU ARTEFAK UTUH: KERTAS LEGAL PAD KUNING DENGAN STUB TIKET DI PERFORASI BAWAH */}
        <motion.div
          animate={
            isTransitioning
              ? {
                  y: -180,
                  opacity: 0.1,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }
              : { y: 0, opacity: 1 }
          }
          className="w-full relative flex flex-col items-center"
        >
          {/* Selotip Washi Tape Kuning di Puncak Kertas */}
          <div className="w-20 h-3.5 bg-amber-200/80 -rotate-1 shadow-xs border border-amber-300/50 rounded-xs z-30 mb-[-6px] pointer-events-none" />

          {/* BADAN LEMBARAN LEGAL PAD KUNING */}
          <div className="w-full bg-[#FEFCE8] rounded-t-2xl border-x-2 border-t-2 border-[#EADBBD] shadow-[0_14px_40px_rgba(0,0,0,0.16)] relative flex flex-col overflow-hidden text-left paper-shadow">
            
            {/* Tepian Robekan Kertas Kasar di Paling Atas */}
            <div className="w-full h-3.5 bg-[#EDE3C8] relative overflow-hidden flex items-end">
              <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-3 text-[#FEFCE8] fill-current">
                <path d="M0,0 L15,15 L30,3 L45,18 L60,2 L75,16 L90,4 L105,17 L120,3 L135,18 L150,2 L165,16 L180,4 L195,17 L210,3 L225,18 L240,2 L255,16 L270,4 L285,17 L300,3 L315,18 L330,2 L345,16 L360,4 L375,17 L390,3 L400,15 L400,20 L0,20 Z" />
              </svg>
            </div>

            {/* Isolasi Sage Mini di Sudut Kanan */}
            <WashiTape color="sage" angle={2} className="absolute top-1 right-6 z-30 pointer-events-none scale-85" />

            {/* Garis Margin Merah Buku Kiri */}
            <div className="absolute left-7 top-3.5 bottom-0 w-px bg-rose-300/80 pointer-events-none" />

            {/* HEADER KERTAS TERINTEGRASI */}
            <div className="pt-2.5 pb-2 px-3 pl-9 flex items-center justify-between border-b border-[#EADBBD]/80">
              <div>
                <h2 className="font-handwriting text-xl sm:text-2xl text-[#140E0A] font-black tracking-wide leading-tight">
                  Rencana Tertunda 📝
                </h2>
                <p className="font-typewriter text-[10.5px] sm:text-[11px] text-[#5A4839] font-bold mt-0.5">
                  Hal-hal yang belum sempat kita lakukan bersama.
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#7A5524] font-bold bg-[#8C5D1E]/10 px-2 py-0.5 rounded-full border border-[#8C5D1E]/20 shrink-0">
                Wishlist
              </span>
            </div>

            {/* KONTEN DAFTAR WISHLIST */}
            <div className="py-2.5 px-3 pl-9 space-y-2 relative z-10">
              {wishlist.map((item, idx) => {
                const isRevealed = !!revealedNotes[idx];

                return (
                  <div
                    key={`wish-${idx}`}
                    onClick={() => handleToggleItem(idx)}
                    className="cursor-pointer group select-none py-1.5 border-b border-[#F0E6CE]/70 last:border-0"
                  >
                    <div className="flex items-start gap-2.5">
                      {/* Kotak Centang Sentuh Ramah Jari */}
                      <div className="mt-0.5 w-4.5 h-4.5 rounded-xs border-2 border-[#8C6D4F] flex items-center justify-center shrink-0 bg-white shadow-2xs group-hover:border-[#8C3E2D] transition-colors">
                        {isRevealed ? (
                          <span className="text-[#8C3E2D] font-black text-xs leading-none">✓</span>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-2xs bg-[#D8C2A7] opacity-45" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Judul Wishlist (Teks Penuh, Tidak Terpotong) */}
                        <span className="font-sans-ui text-xs sm:text-[13px] font-bold text-[#261B12] leading-snug block group-hover:text-[#8C3E2D] transition-colors">
                          {item.text}
                        </span>

                        {/* Catatan Refleksi Tulisan Tangan Tatwa */}
                        <AnimatePresence>
                          {isRevealed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="mt-1 pl-2 border-l-2 border-[#1D3557]/40"
                            >
                              <p className="font-handwriting text-[15px] sm:text-[16px] text-[#1D3557] font-bold leading-snug">
                                "{item.note}"
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Petunjuk Halus di Kaki Legal Pad */}
            <div className="px-3 pb-2 pl-9 text-left">
              <span className="font-sans-ui text-[9.5px] text-[#8C755E] font-medium">
                💡 Ketuk rencana untuk membuka catatan refleksi
              </span>
            </div>
          </div>

          {/* 2. JALUR PERFORASI SOBEK TIKET LANGSUNG DI BAWAH KERTAS LEGAL PAD */}
          <div className="w-full h-8.5 relative flex items-center justify-between px-2 bg-[#FEFCE8] border-x-2 border-[#EADBBD] overflow-hidden">
            {/* Lekukan Tiket Berlubang di Sisi Kiri & Kanan (Perforation Notches) */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FAF6EE] border border-[#D8C7B0] z-20 pointer-events-none" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FAF6EE] border border-[#D8C7B0] z-20 pointer-events-none" />

            {/* Titik-titik Garis Perforasi Realistis */}
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#8C6D4F]/40 flex items-center justify-between pointer-events-none">
              {[...Array(18)].map((_, dotIdx) => (
                <span
                  key={`perf-dot-${dotIdx}`}
                  className={`w-1 h-1 rounded-full transition-colors duration-150 ${
                    tearProgress > (dotIdx / 18) * 100
                      ? "bg-transparent"
                      : "bg-[#7A5524]/40"
                  }`}
                />
              ))}
            </div>

            {/* TAB SLIDER ROBEK BERGERIGI (DRAGGABLE X - TOUCH FRIENDLY & TAP FRIENDLY) */}
            <motion.div
              drag={!isTorn ? "x" : false}
              dragConstraints={{ left: 0, right: 235 }}
              dragElastic={0.06}
              dragSnapToOrigin={!isTorn}
              onDrag={(e, info) => {
                const progress = Math.min(100, Math.max(0, (info.offset.x / 235) * 100));
                setTearProgress(progress);
              }}
              onDragEnd={(e, info) => {
                const progress = (info.offset.x / 235) * 100;
                if (progress >= 55 || info.velocity.x > 100) {
                  handleTearComplete();
                } else {
                  setTearProgress(0);
                }
              }}
              onClick={handleTearComplete}
              animate={isTorn ? { x: 235 } : undefined}
              whileTap={{ scale: 0.95 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 cursor-grab active:cursor-grabbing touch-none select-none"
            >
              <div className="flex items-center gap-1.5 bg-[#8C3E2D] hover:bg-[#783426] text-white px-2.5 py-1 rounded-full border border-amber-300 shadow-md">
                <span className="text-xs">✂️</span>
                <span className="font-mono text-[9px] font-black uppercase tracking-wider">
                  Sobek
                </span>
                <span className="text-[9.5px] font-bold text-amber-200">➔</span>
              </div>
            </motion.div>

            {/* Label Jalur Perforasi */}
            <span className="ml-auto pr-2 font-mono text-[8.5px] font-bold text-[#8C6D4F]/75 uppercase tracking-wider pointer-events-none">
              Tear Line
            </span>
          </div>

          {/* 3. STUB BOARDING PASS TERPASANG DI BAWAH PERFORASI */}
          <motion.div
            animate={
              isTransitioning
                ? {
                    y: -140,
                    scale: 1.05,
                    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                  }
                : {
                    rotate: tearProgress * 0.04,
                    y: tearProgress * 0.03,
                  }
            }
            className="w-full bg-[#FFFDF8] rounded-b-2xl border-x-2 border-b-2 border-[#D8C7B0] shadow-md overflow-hidden relative"
          >
            {/* Header Boarding Pass Mini */}
            <div className="bg-gradient-to-r from-[#8C3E2D] via-[#9B3A28] to-[#6E2E1F] text-white px-3 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Plane className="w-3 h-3 text-amber-300 rotate-45" />
                <span className="font-mono text-[9px] font-black tracking-widest uppercase text-amber-200">
                  BOARDING PASS • FLIGHT TO FUTURE
                </span>
              </div>
              <span className="font-mono text-[8.5px] text-amber-100 font-bold bg-black/25 px-1.5 py-0.5 rounded">
                PILKOM-25
              </span>
            </div>

            {/* Isi Ringkas Tiket yang Jelas dan Terbaca di Mobile */}
            <div className="px-3.5 py-2 flex items-center justify-between bg-[#FAF6EE]">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold">
                  PASSENGER
                </span>
                <span className="font-sans-ui text-xs sm:text-[12.5px] font-black text-[#140E0A] leading-tight">
                  Askiyaa Adiba
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold">
                  DESTINATION
                </span>
                <span className="font-sans-ui text-xs sm:text-[12.5px] font-black text-[#1B4D3E] leading-tight">
                  Masa Depan Bahagia ✨
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 4. PETUNJUK TUNGGAL (RINGKAS, DINAMIS & ANTI-REDUNDAN) */}
        <div className="w-full max-w-[340px] flex items-center justify-center z-20 pointer-events-none mt-1">
          {!isTorn ? (
            <div className="bg-[#1C1612]/85 border border-[#8C6D4F]/35 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-100 font-sans-ui text-[10.5px] sm:text-[11px] font-medium text-center backdrop-blur-xs">
              <span>✂️</span>
              <span>Geser atau ketuk gunting untuk merobek tiket penerbangan</span>
            </div>
          ) : (
            <div className="bg-[#1C1612]/90 border border-emerald-400/40 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-emerald-200 font-sans-ui text-[10.5px] sm:text-[11px] font-bold text-center backdrop-blur-xs animate-pulse">
              <span>✈️</span>
              <span>Tiket terobek! Menuju doa masa depan...</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
