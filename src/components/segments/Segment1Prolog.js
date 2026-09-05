"use client";

import React from "react";
import { motion } from "framer-motion";
import { scrapbookData } from "@/data/scrapbookData";
import { Sparkles, Gift } from "lucide-react";

export function Segment1Prolog({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xs w-full"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B4B8]/30 border border-[#E8B4B8]/50 text-[#6B3A40] text-xs font-medium mb-3">
          <Sparkles className="w-3 h-3 text-[#B05B66]" />
          <span>The Scrapbook of Us</span>
        </div>

        <h1 className="font-handwriting text-4xl sm:text-5xl text-[#2C2621] mb-1 font-bold">
          {scrapbookData.recipient.greeting}
        </h1>

        <p className="font-sans-ui text-xs text-[#6B6259] mb-8 leading-relaxed">
          {scrapbookData.recipient.boxSubtitle}
        </p>

        {/* Kotak Kado Placeholder Awal (Akan kita poles habis di Tahap 1) */}
        <div className="relative mx-auto w-48 h-48 bg-gradient-to-br from-[#D98E7B] to-[#C26D57] rounded-3xl shadow-xl flex flex-col items-center justify-center text-white border-2 border-white/40 p-4">
          <Gift className="w-16 h-16 text-white/90 mb-2 drop-shadow" />
          <span className="text-xs font-handwriting text-2xl text-amber-100 font-bold">
            Buka Kado
          </span>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="mt-3 px-4 py-1.5 rounded-full bg-white text-[#C26D57] font-semibold text-xs shadow-md hover:bg-amber-50 active:scale-95 transition-all"
          >
            Tarik Pita
          </motion.button>
        </div>

        <p className="font-handwriting text-base text-[#9E9489] mt-6 italic">
          "{scrapbookData.recipient.ribbonInstruction}"
        </p>
      </motion.div>
    </section>
  );
}
