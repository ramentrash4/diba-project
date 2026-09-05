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

  // Status item yang telah diketuk untuk melihat catatan refleksi Tatwa
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
    <section className="w-full flex-1 flex flex-col items-center justify-center px-3.5 py-2 sm:py-3 select-none relative overflow-hidden my-auto">
      {/* WRAPPER TENGAH TERFOKUS DENGAN KERAPATAN MOBILE OPTIMAL */}
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center gap-2 sm:gap-2.5 my-auto">

        {/* LEMBARAN KERTAS KUNING ROBEK BERGARIS (YELLOW LEGAL PAD - IDENTIK DENGAN KERTAS DARI SEGMEN 6) */}
        <motion.div
          animate={
            isTransitioning
              ? {
                  y: -220,
                  opacity: 0.15,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }
              : { y: 0, opacity: 1 }
          }
          className="w-full max-w-[335px] sm:max-w-[340px] relative z-10 flex flex-col items-center"
        >
          {/* Selotip Washi Tape Kuning */}
          <div className="w-20 h-3.5 bg-amber-200/70 -rotate-1 shadow-xs border border-amber-300/40 rounded-xs z-30 mb-[-6px] pointer-events-none" />

          <div className="w-full bg-[#FEFCE8] rounded-b-xl border border-[#EADBBD] shadow-[0_15px_40px_rgba(0,0,0,0.18)] relative flex flex-col overflow-hidden text-left paper-shadow pb-3">
            {/* Efek Sobekan Kertas Kasar di Tepi Atas (Torn Paper Edge SVG) */}
            <div className="w-full h-4 bg-[#EDE3C8] relative overflow-hidden flex items-end">
              <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-3 text-[#FEFCE8] fill-current">
                <path d="M0,0 L15,15 L30,3 L45,18 L60,2 L75,16 L90,4 L105,17 L120,3 L135,18 L150,2 L165,16 L180,4 L195,17 L210,3 L225,18 L240,2 L255,16 L270,4 L285,17 L300,3 L315,18 L330,2 L345,16 L360,4 L375,17 L390,3 L400,15 L400,20 L0,20 Z" />
              </svg>
            </div>

            {/* Isolasi Kertas Sage Perekat di Bagian Atas */}
            <WashiTape color="sage" angle={1} className="absolute top-1 right-8 z-30 pointer-events-none" />

            {/* Garis Margin Merah Buku Kiri */}
            <div className="absolute left-9 top-4 bottom-0 w-px bg-rose-300 pointer-events-none" />

            {/* HEADER TERPASANG DI KERTAS */}
            <div className="px-3.5 pt-1.5 pb-1 flex flex-col text-left pl-11">
              <div className="flex items-center justify-between">
                <h2 className="font-handwriting text-xl sm:text-2xl text-[#140E0A] font-black tracking-wide leading-tight">
                  Rencana Tertunda 📝
                </h2>
                <span className="font-mono text-[8.5px] text-[#7A5524] font-bold bg-[#8C5D1E]/10 px-1.5 py-0.5 rounded">
                  Sobekan Wishlist
                </span>
              </div>
              <p className="font-typewriter text-[10px] text-[#5A4839] font-bold">
                Hal-hal yang belum sempat kita lakukan bersama.
              </p>
            </div>

            {/* KONTEN DAFTAR WISHLIST */}
            <div className="p-3.5 pt-2 pl-11 space-y-2.5 relative z-10">
              {wishlist.map((item, idx) => {
                const isRevealed = !!revealedNotes[idx];

                return (
                  <div
                    key={`wish-${idx}`}
                    onClick={() => handleToggleItem(idx)}
                    className="cursor-pointer group select-none border-b border-[#F0E6CE] pb-2 last:border-0"
                  >
                    <div className="flex items-start gap-2">
                      {/* Kotak Centang Sentuh */}
                      <div className="mt-0.5 w-4 h-4 rounded border-2 border-[#8C6D4F] flex items-center justify-center shrink-0 bg-white shadow-2xs group-hover:border-[#8C3E2D]">
                        {isRevealed ? (
                          <span className="text-[#8C3E2D] font-black text-xs">✓</span>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-xs bg-[#D8C2A7] opacity-40" />
                        )}
                      </div>

                      <div className="flex-1">
                        <span className="font-sans-ui text-xs font-black text-[#261B12] leading-snug block">
                          {item.text}
                        </span>

                        {/* Catatan Refleksi Tulisan Tangan Tatwa */}
                        <AnimatePresence>
                          {isRevealed && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-0.5"
                            >
                              <p className="font-handwriting text-[14.5px] sm:text-[15.5px] text-[#1E3A8A] font-bold leading-relaxed">
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

            {/* Teks Petunjuk Sentuh di Bawah Kertas */}
            <div className="px-4 text-center mt-0.5">
              <span className="font-sans-ui text-[9.5px] text-[#8C755E] font-bold">
                💡 Ketuk tiap rencana untuk membaca catatan refleksi di baliknya
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. GARIS PERFORASI DAN STUB TIKET BOARDING PASS TERPASANG DI BAWAH WISHLIST */}
        <div className="w-full max-w-[335px] sm:max-w-[340px] relative z-20 flex flex-col items-center">
          
          {/* JALUR GARIS PERFORASI PUTUS-PUTUS & SLIDER SOBEK */}
          <div className="w-full h-7 relative flex items-center justify-between px-2 overflow-hidden my-0.5">
            {/* Garis Perforasi Bergerigi SVG */}
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-[#8C6D4F]/60 flex items-center justify-between pointer-events-none">
              {[...Array(18)].map((_, dotIdx) => (
                <span
                  key={`perf-dot-${dotIdx}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors duration-150 ${
                    tearProgress > (dotIdx / 18) * 100
                      ? "bg-transparent"
                      : "bg-[#7A5524]/40"
                  }`}
                />
              ))}
            </div>

            {/* TAB SLIDER ROBEK BERGERIGI (DRAGGABLE X) */}
            <motion.div
              drag={!isTorn ? "x" : false}
              dragConstraints={{ left: 0, right: 230 }}
              dragElastic={0.08}
              dragSnapToOrigin={!isTorn}
              onDrag={(e, info) => {
                const progress = Math.min(100, Math.max(0, (info.offset.x / 230) * 100));
                setTearProgress(progress);
              }}
              onDragEnd={(e, info) => {
                const progress = (info.offset.x / 230) * 100;
                if (progress >= 70 || info.velocity.x > 150) {
                  handleTearComplete();
                } else {
                  setTearProgress(0);
                }
              }}
              animate={isTorn ? { x: 230 } : undefined}
              whileTap={{ scale: 0.96 }}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-30 cursor-grab active:cursor-grabbing touch-none select-none"
            >
              <div className="flex items-center gap-1 bg-[#8C3E2D] text-white px-2 py-0.5 rounded-full border border-amber-300/80 shadow-md shadow-amber-950/20">
                <span className="text-xs">✂️</span>
                <span className="font-mono text-[9px] font-black uppercase tracking-tight">
                  Sobek
                </span>
                <span className="text-[9px] font-bold text-amber-200 animate-pulse">➔</span>
              </div>
            </motion.div>

            {/* Label Panduan Garis Perforasi di Sisi Kanan */}
            <span className="ml-auto font-mono text-[8px] font-bold text-[#8C6D4F] uppercase tracking-wider pointer-events-none">
              Tear Along Line
            </span>
          </div>

          {/* STUB TIKET BOARDING PASS MERAH-MARUN DI BAWAH PERFORASI */}
          <motion.div
            animate={
              isTransitioning
                ? {
                    y: -160,
                    scale: 1.04,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  }
                : {
                    rotate: tearProgress * 0.05,
                    y: tearProgress * 0.04,
                  }
            }
            className="w-full bg-[#FFFDF8] rounded-xl border-2 border-[#D8C7B0] shadow-md overflow-hidden relative"
          >
            {/* Header Boarding Pass Mini */}
            <div className="bg-gradient-to-r from-[#8C3E2D] to-[#6E2E1F] text-white px-3 py-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Plane className="w-3 h-3 text-amber-300 rotate-45" />
                <span className="font-mono text-[8.5px] font-black tracking-widest uppercase text-amber-200">
                  BOARDING PASS • FLIGHT TO FUTURE
                </span>
              </div>
              <span className="font-mono text-[8px] text-white/80 font-bold">
                PILKOM-25
              </span>
            </div>

            {/* Isi Ringkas Tiket yang Akan Disobek */}
            <div className="px-3 py-1.5 flex items-center justify-between bg-[#FAF6EE]">
              <div className="flex flex-col text-left">
                <span className="font-mono text-[7px] uppercase tracking-wider text-[#8C7A6B] font-bold">
                  PASSENGER
                </span>
                <span className="font-sans-ui text-[11px] font-black text-[#140E0A] leading-tight">
                  Askiyaa Adiba
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="font-mono text-[7px] uppercase tracking-wider text-[#8C7A6B] font-bold">
                  DESTINATION
                </span>
                <span className="font-sans-ui text-[11px] font-black text-[#1B4D3E] leading-tight">
                  Masa Depan Bahagia ✨
                </span>
              </div>
            </div>
          </motion.div>

          {/* TEKS PETUNJUK GESTUR SOBEK TIKET (BEBAS TOMBOL) */}
          <div className="mt-1 text-center pointer-events-none">
            {!isTorn ? (
              <span className="font-sans-ui text-[10px] text-[#8C6D4F] font-extrabold flex items-center justify-center gap-1">
                <span>✂️</span>
                <span>Geser tab gunting dari kiri ke kanan untuk merobek tiket penerbangan</span>
              </span>
            ) : (
              <span className="font-sans-ui text-[10px] text-emerald-800 font-extrabold flex items-center justify-center gap-1 animate-pulse">
                <span>✈️</span>
                <span>Tiket terobek! Menuju doa masa depan...</span>
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
