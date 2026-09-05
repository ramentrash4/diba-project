"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Ticket,
  Plane,
  Sparkles,
  Heart,
  Lock,
  Stamp,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment8Closing({ onFinalLock }) {
  const { playSfx } = useAudio();
  const closing = scrapbookData.closing;
  const ticket = closing.ticket;

  // Status saat tombol Tutup Lembaran diklik
  const [isLocking, setIsLocking] = useState(false);

  const handleTriggerLock = () => {
    if (isLocking) return;
    setIsLocking(true);
    playSfx("tape-click");
    onFinalLock();
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-3.5 py-4 select-none relative overflow-hidden text-[#1E1712]">
      
      {/* 1. HEADER SEGMEN: TIKET DOA & PENUTUP */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center mt-1 z-20">
        <div className="relative inline-block mb-1">
          <WashiTape color="mustard" angle={1.5} className="absolute -top-3 left-1/2 -translate-x-1/2" />
          <h2 className="font-handwriting text-2xl sm:text-3xl text-[#140E0A] font-black tracking-wide pt-1">
            Tiket Doa & Penutup 🕊️
          </h2>
        </div>

        <p className="font-typewriter text-[11px] sm:text-xs text-[#5A4839] font-bold">
          Untuk lembaran barumu di masa depan.
        </p>
      </div>

      {/* 2. BOARDING PASS VINTAGE REALISTIS & SURAT PENUTUP */}
      <div className="w-full max-w-[335px] sm:max-w-[350px] my-auto space-y-3 z-10 py-1">
        
        {/* KARTU BOARDING PASS VINTAGE (AIRLINE TICKET STUB) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#D8C7B0] shadow-xl relative overflow-hidden paper-shadow"
        >
          {/* Header Tiket: Garis Aksen Emas & Maskapai Kehidupan */}
          <div className="bg-gradient-to-r from-[#8C3E2D] to-[#6E2E1F] text-white px-3.5 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-amber-300 rotate-45" />
              <span className="font-mono text-[9.5px] font-black tracking-widest uppercase text-amber-200">
                BOARDING PASS • FIRST CLASS
              </span>
            </div>
            <span className="font-mono text-[9px] text-white/80 font-bold">
              {ticket.flightNo}
            </span>
          </div>

          {/* Badan Tiket Utama */}
          <div className="p-3.5 sm:p-4 text-left space-y-2.5 relative">
            
            {/* Nama Penumpang */}
            <div>
              <span className="font-mono text-[8.5px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                PASSENGER NAME
              </span>
              <span className="font-sans-ui text-sm sm:text-base font-black text-[#140E0A] leading-tight">
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
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                  SEAT NO.
                </span>
                <span className="font-sans-ui text-[11px] font-black text-[#140E0A]">
                  {ticket.seat}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                  STATUS
                </span>
                <span className="font-mono text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  {ticket.validity}
                </span>
              </div>
            </div>

            {/* Barcode Garis Simbolis di Bawah Tiket */}
            <div className="border-t border-dashed border-[#D5C7B5] pt-2 flex items-center justify-between">
              <div className="flex items-center gap-0.5 h-4 text-[#8C7A6B] font-mono text-[11px] tracking-tighter select-none">
                || | |||| | || |||| | ||| || ||| | ||||
              </div>
              <span className="font-mono text-[8px] text-[#A8947E] font-bold">
                NO EXPIRATION DATE
              </span>
            </div>
          </div>
        </motion.div>

        {/* SURAT TULISAN TANGAN TERAKHIR TATWA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="w-full bg-[#FFFDF8] rounded-2xl p-4 sm:p-4.5 border border-[#EADBBD] shadow-md text-left space-y-2 relative paper-shadow"
        >
          <div className="flex items-center justify-between border-b border-[#F0E6CE] pb-1.5">
            <span className="font-typewriter text-[10px] font-black text-[#8C3E2D] uppercase tracking-wider">
              Surat Perpisahan & Doa ✍️
            </span>
            <Heart className="w-3.5 h-3.5 text-[#8C3E2D] fill-current" />
          </div>

          <p className="font-handwriting text-base sm:text-[17px] text-[#140E0A] font-bold leading-relaxed">
            "{closing.letter}"
          </p>

          <p className="font-handwriting text-sm sm:text-[15px] text-[#1E3A8A] font-bold leading-relaxed border-t border-[#F0E6CE] pt-2">
            "{closing.prayer}"
          </p>

          <div className="text-right pt-1">
            <span className="font-handwriting text-lg text-[#140E0A] font-black">
              {closing.finalSignoff}
            </span>
          </div>
        </motion.div>
      </div>

      {/* 3. RITUAL PAMUNGKAS: TOMBOL TUTUP LEMBARAN (WHITEOUT CLOSURE) */}
      <div className="w-full max-w-[340px] flex flex-col items-center gap-1.5 mb-1 z-20">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.94 }}
          onClick={handleTriggerLock}
          disabled={isLocking}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#2A1D16] via-[#3B281E] to-[#1C130E] text-[#F3E5AB] font-sans-ui text-xs sm:text-[13px] font-black shadow-2xl flex items-center justify-center gap-2 border-2 border-[#AA771C] cursor-pointer relative overflow-hidden"
        >
          {/* Efek Kilau Tombol Emas */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
            }}
          />
          <Lock className="w-4 h-4 text-[#D4AF37]" />
          <span>Tutup Lembaran (Selesai) 🔒</span>
        </motion.button>

        <span className="text-[10px] font-sans-ui text-[#8C7A6B] font-bold text-center">
          Menutup lembaran akan mengunci web ini dengan doa abadi.
        </span>
      </div>
    </section>
  );
}
