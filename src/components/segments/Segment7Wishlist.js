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

  const handleToggleItem = (idx) => {
    playSfx("pencil-scratch");
    setRevealedNotes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleProceedToClosing = () => {
    playSfx("ticket-tear");
    onComplete();
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-3.5 py-4 select-none relative overflow-hidden">
      
      {/* 1. HEADER SEGMEN: JUDUL KERTAS ROBEK */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center mt-1 z-20">
        <div className="relative inline-block mb-1">
          <WashiTape color="mustard" angle={-1.5} className="absolute -top-3 left-1/2 -translate-x-1/2" />
          <h2 className="font-handwriting text-2xl sm:text-3xl text-[#140E0A] font-black tracking-wide pt-1">
            Rencana Tertunda 📝
          </h2>
        </div>

        <p className="font-typewriter text-[11px] sm:text-xs text-[#5A4839] font-bold">
          Hal-hal yang belum sempat kita lakukan bersama.
        </p>
      </div>

      {/* 2. LEMBARAN KERTAS KUNING ROBEK BERGARIS (YELLOW LEGAL PAD) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[325px] sm:max-w-[340px] my-auto relative z-10"
      >
        <div className="w-full bg-[#FEFCE8] rounded-b-xl border border-[#EADBBD] shadow-[0_20px_45px_rgba(0,0,0,0.18)] relative flex flex-col overflow-hidden text-left paper-shadow pb-3">
          
          {/* Efek Sobekan Kertas Kasar di Tepi Atas (Torn Paper Edge SVG) */}
          <div className="w-full h-4 bg-[#EDE3C8] relative overflow-hidden flex items-end">
            <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-3 text-[#FEFCE8] fill-current">
              <path d="M0,0 L15,15 L30,3 L45,18 L60,2 L75,16 L90,4 L105,17 L120,3 L135,18 L150,2 L165,16 L180,4 L195,17 L210,3 L225,18 L240,2 L255,16 L270,4 L285,17 L300,3 L315,18 L330,2 L345,16 L360,4 L375,17 L390,3 L400,15 L400,20 L0,20 Z" />
            </svg>
          </div>

          {/* Isolasi Kertas Perekat di Bagian Atas */}
          <WashiTape color="sage" angle={1} className="absolute top-1 right-8 z-30 pointer-events-none" />

          {/* Garis Margin Merah Buku Kiri */}
          <div className="absolute left-9 top-4 bottom-0 w-px bg-rose-300 pointer-events-none" />

          {/* KONTEN DAFTAR WISHLIST */}
          <div className="p-3.5 sm:p-4 pt-3 pl-11 space-y-3.5 relative z-10">
            {wishlist.map((item, idx) => {
              const isRevealed = !!revealedNotes[idx];

              return (
                <div
                  key={`wish-${idx}`}
                  onClick={() => handleToggleItem(idx)}
                  className="cursor-pointer group select-none border-b border-[#F0E6CE] pb-2.5 last:border-0"
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
                      <span className="font-sans-ui text-xs sm:text-[13px] font-black text-[#261B12] leading-snug block">
                        {item.text}
                      </span>

                      {/* Catatan Refleksi Tulisan Tangan Tatwa */}
                      <AnimatePresence>
                        {isRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-1"
                          >
                            <p className="font-handwriting text-[15px] sm:text-[16px] text-[#1E3A8A] font-bold leading-relaxed">
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
          <div className="px-4 text-center mt-1">
            <span className="font-sans-ui text-[10px] text-[#8C755E] font-bold">
              💡 Ketuk tiap rencana untuk membaca catatan refleksi di baliknya
            </span>
          </div>
        </div>
      </motion.div>

      {/* 3. TIKET BOARDING PASS TERSELIP (TRANSISI KE SEGMEN 8) */}
      <div className="w-full max-w-[340px] flex flex-col items-center gap-1.5 mb-1 z-20">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleProceedToClosing}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#A83226] via-[#BD3D30] to-[#8F2318] text-white font-sans-ui text-xs sm:text-[13px] font-black shadow-xl flex items-center justify-center gap-2 border-2 border-[#E5A89E] cursor-pointer"
        >
          <Plane className="w-4 h-4 text-rose-200" />
          <span>Buka Tiket Doa Masa Depan & Penutup 🕊️ ➔</span>
        </motion.button>
      </div>
    </section>
  );
}
