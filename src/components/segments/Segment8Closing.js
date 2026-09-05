"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Heart,
  Mail,
  Sparkles,
  Lock,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment8Closing({ onFinalLock }) {
  const { playSfx } = useAudio();
  const closing = scrapbookData.closing;
  const ticket = closing.ticket;

  // Status tahapan: 'ticket' (fokus Boarding Pass) -> 'letter' (surat terbuka & ritual segel lilin)
  const [currentStage, setCurrentStage] = useState("ticket");

  // Status segel lilin penutup
  const [isSealed, setIsSealed] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  // Handler membuka surat dengan menarik tab amplop ke bawah
  const handlePullLetter = () => {
    if (currentStage === "letter") return;
    playSfx("paper-swoosh");
    setCurrentStage("letter");
  };

  // Handler ritual mengecap segel lilin (Tutup Lembaran tanpa tombol)
  const handleSealComplete = () => {
    if (isSealed || isLocking) return;
    setIsSealed(true);
    setIsLocking(true);
    playSfx("clasp-open");

    setTimeout(() => {
      playSfx("tape-click");
    }, 160);

    setTimeout(() => {
      onFinalLock();
    }, 850);
  };

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-3 select-none relative overflow-hidden my-auto text-[#1E1712]">
      {/* WRAPPER TERFOKUS TEPAT DI TENGAH OPTIKAL LAYAR DENGAN PROPORSI SEIMBANG */}
      <div className="w-full max-w-[345px] sm:max-w-[355px] flex flex-col items-center justify-center gap-2.5 my-auto z-10">
        
        {/* 1. HEADER SEGMEN: TIKET DOA & PENUTUP */}
        <div className="w-full flex flex-col items-center text-center relative z-20">
          <div className="relative inline-block mb-1">
            <WashiTape color="mustard" angle={1.5} className="absolute -top-3 left-1/2 -translate-x-1/2 scale-90" />
            <h2 className="font-handwriting text-2xl sm:text-[26px] text-[#140E0A] font-black tracking-wide pt-1 leading-tight">
              Tiket Doa & Penutup 🕊️
            </h2>
          </div>

          <p className="font-typewriter text-[11px] text-[#5A4839] font-bold">
            Untuk lembaran barumu di masa depan.
          </p>
        </div>

        {/* 2. ARTEFAK KONTEN BERTAHAP (ANIMEPRESENCE: TIKET -> SURAT) */}
        <div className="w-full relative min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentStage === "ticket" ? (
              <motion.div
                key="stage-ticket"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -35, scale: 0.96, transition: { duration: 0.35, ease: "easeInOut" } }}
                className="w-full flex flex-col items-center"
              >
                {/* KARTU BOARDING PASS DENGAN TAB LIPATAN SURAT DI BAWAH */}
                <div className="w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#D8C7B0] shadow-xl relative overflow-hidden paper-shadow">
                  {/* Tepian Atas Bergerigi Tanda Bekas Sobekan Perforasi dari Segmen 7 */}
                  <div className="w-full h-2.5 bg-[#702B1E] flex items-center justify-between px-2 overflow-hidden">
                    <div className="w-full border-t-2 border-dashed border-amber-200/40" />
                  </div>

                  {/* Header Maskapai First Class */}
                  <div className="bg-gradient-to-r from-[#8C3E2D] via-[#9B3A28] to-[#6E2E1F] text-white px-3.5 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Plane className="w-3.5 h-3.5 text-amber-300 rotate-45" />
                      <span className="font-mono text-[9px] font-black tracking-widest uppercase text-amber-200">
                        BOARDING PASS • FIRST CLASS
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] text-amber-100 font-bold bg-black/25 px-1.5 py-0.5 rounded">
                      {ticket.flightNo}
                    </span>
                  </div>

                  {/* Badan Tiket Utama */}
                  <div className="p-3.5 sm:p-4 text-left space-y-2.5 relative">
                    {/* Nama Penumpang */}
                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                        PASSENGER NAME
                      </span>
                      <span className="font-sans-ui text-sm sm:text-[15px] font-black text-[#140E0A] leading-tight">
                        {ticket.passenger}
                      </span>
                    </div>

                    {/* Rute Penerbangan: PILKOM 25 -> MASA DEPAN BAHAGIA */}
                    <div className="grid grid-cols-2 gap-2 bg-[#F9F3EA] p-2.5 rounded-xl border border-[#EADBBD]">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                          DEPARTURE
                        </span>
                        <span className="font-sans-ui text-xs font-black text-[#8C3E2D] leading-tight">
                          PILKOM '25
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                          DESTINATION
                        </span>
                        <span className="font-sans-ui text-xs font-black text-[#1B4D3E] leading-tight">
                          Masa Depan Bahagia ✨
                        </span>
                      </div>
                    </div>

                    {/* Kursi & Status Tiket */}
                    <div className="flex items-center justify-between pt-0.5">
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                          SEAT NO.
                        </span>
                        <span className="font-sans-ui text-[11.5px] font-black text-[#140E0A]">
                          {ticket.seat}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                          STATUS
                        </span>
                        <span className="font-mono text-[9.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                          {ticket.validity}
                        </span>
                      </div>
                    </div>

                    {/* Barcode Garis Simbolis */}
                    <div className="border-t border-dashed border-[#D5C7B5] pt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-0.5 h-3.5 text-[#8C7A6B] font-mono text-[10.5px] tracking-tighter select-none">
                        || | |||| | || |||| | ||| || ||| | ||||
                      </div>
                      <span className="font-mono text-[8px] text-[#A8947E] font-bold uppercase tracking-wider">
                        NO EXPIRATION DATE
                      </span>
                    </div>
                  </div>

                  {/* TAB LIPATAN SURAT TERSEMBUNYI DI KAKI TIKET (DRAGGABLE Y) */}
                  <motion.div
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 60 }}
                    dragElastic={0.12}
                    dragSnapToOrigin
                    onDragEnd={(e, info) => {
                      if (info.offset.y > 28 || info.velocity.y > 80) {
                        handlePullLetter();
                      }
                    }}
                    whileHover={{ y: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#F5ECE0] border-t-2 border-dashed border-[#8C6D4F]/40 p-2 sm:p-2.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none touch-none hover:bg-[#EFE4D4] transition-colors"
                  >
                    <div className="flex items-center gap-1.5 text-[#8C3E2D]">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="font-mono text-[9px] font-black uppercase tracking-wider">
                        Lipatan Surat Tatwa
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#8C3E2D] text-white px-2 py-0.5 rounded-full text-[9px] font-bold shadow-xs">
                      <span>Tarik ke bawah</span>
                      <span className="text-amber-200 animate-bounce">⬇️</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="stage-letter"
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                className="w-full flex flex-col items-center"
              >
                {/* SURAT TULISAN TANGAN TERAKHIR TATWA */}
                <div className="w-full bg-[#FFFDF8] rounded-2xl p-4 sm:p-4.5 border-2 border-[#EADBBD] shadow-xl text-left space-y-2.5 relative paper-shadow">
                  <div className="flex items-center justify-between border-b border-[#F0E6CE] pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#8C3E2D] fill-current" />
                      <span className="font-typewriter text-[10px] font-black text-[#8C3E2D] uppercase tracking-wider">
                        Surat Perpisahan & Doa ✍️
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] text-[#8C7A6B] font-bold">
                      Untuk Askiyaa
                    </span>
                  </div>

                  {/* Isi Surat Refleksi */}
                  <p className="font-handwriting text-[15.5px] sm:text-[16.5px] text-[#140E0A] font-bold leading-relaxed">
                    "{closing.letter}"
                  </p>

                  {/* Doa Kelancaran Kuliah di Pilkom 25 */}
                  <p className="font-handwriting text-[14.5px] sm:text-[15.5px] text-[#1E3A8A] font-bold leading-relaxed border-t border-[#F0E6CE] pt-2">
                    "{closing.prayer}"
                  </p>

                  {/* Tanda Tangan Penutup */}
                  <div className="text-right pt-0.5">
                    <span className="font-handwriting text-lg text-[#140E0A] font-black">
                      {closing.finalSignoff}
                    </span>
                  </div>

                  {/* RITUAL TUTUP LEMBARAN: DOCK CAP SEGEL LILIN (ZERO BUTTONS) */}
                  <div className="border-t-2 border-dashed border-[#E0D3C1] pt-2 mt-1">
                    <div className="w-full h-13 bg-[#F5ECE0] rounded-xl border border-[#D8C7B0] px-2.5 py-1.5 relative flex items-center justify-between overflow-hidden shadow-inner">
                      {/* GAGANG CAP STEMPEL KUNINGAN (DRAGGABLE X) */}
                      <motion.div
                        drag={!isSealed ? "x" : false}
                        dragConstraints={{ left: 0, right: 180 }}
                        dragElastic={0.08}
                        dragSnapToOrigin={!isSealed}
                        onDragEnd={(e, info) => {
                          if (info.offset.x > 85 || info.velocity.x > 140) {
                            handleSealComplete();
                          }
                        }}
                        animate={isSealed ? { x: 180 } : undefined}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-30 cursor-grab active:cursor-grabbing touch-none select-none"
                      >
                        <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-white rounded-lg px-2.5 py-1.5 shadow-md flex items-center gap-1.5 border border-amber-300">
                          <span className="text-xs">👑</span>
                          <span className="font-mono text-[9px] font-black uppercase tracking-wider text-amber-100">
                            Cap Segel
                          </span>
                          <span className="text-[9px] font-bold text-amber-200">➔</span>
                        </div>
                      </motion.div>

                      {/* TRACK PANDUAN TITIK-TITIK */}
                      <div className="absolute inset-x-16 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 opacity-40 pointer-events-none">
                        <span className="text-[10px] text-[#8C6D4F]">••••••••••</span>
                      </div>

                      {/* BULATAN SEGEL LILIN & PITA MERAH */}
                      <div className="relative z-20 flex items-center justify-center">
                        {/* Pita Sutra Merah */}
                        <div className="w-12 h-3.5 bg-[#8C2418] -rotate-12 absolute -z-10 shadow-2xs rounded-2xs" />
                        
                        {/* Bulatan Lilin Merah Hangat (Sebelum Cap) / Segel Emas (Setelah Cap) */}
                        {!isSealed ? (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-900 to-[#5C140D] border-2 border-dashed border-amber-300/60 shadow-inner flex items-center justify-center">
                            <span className="text-[10px] text-amber-300/80 animate-pulse">⭕</span>
                          </div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 border-2 border-amber-200 shadow-md flex items-center justify-center text-amber-950 font-black text-xs"
                          >
                            ✨
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. PANDUAN SENTUH TUNGGAL (DYNAMIC & RINGKAS) */}
        <div className="w-full max-w-[340px] flex items-center justify-center z-20 pointer-events-none mt-1">
          {currentStage === "ticket" ? (
            <div className="bg-[#1C1612]/85 border border-[#8C6D4F]/35 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-100 font-sans-ui text-[11px] font-medium text-center backdrop-blur-xs">
              <span>💌</span>
              <span>Tarik tab surat ke bawah untuk membuka pesan terakhir Tatwa</span>
            </div>
          ) : !isSealed ? (
            <div className="bg-[#1C1612]/85 border border-[#8C6D4F]/35 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-100 font-sans-ui text-[11px] font-medium text-center backdrop-blur-xs">
              <span>🔒</span>
              <span>Seret cap stempel ke kanan ke atas pita untuk menyegel scrapbook</span>
            </div>
          ) : (
            <div className="bg-[#1C1612]/90 border border-amber-400/40 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-200 font-sans-ui text-[11px] font-bold text-center backdrop-blur-xs animate-pulse">
              <span>✨</span>
              <span>Lembaran tersegel abadi... Menutup kenangan.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
