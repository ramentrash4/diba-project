"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment4Kamus({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-xs w-full bg-[#FAF0E4] p-6 rounded-2xl paper-shadow border border-amber-800/20 relative">
        <WashiTape color="rose" angle={-1} className="absolute -top-2 left-1/2 -translate-x-1/2" />
        <div className="flex items-center justify-center gap-1.5 text-amber-900/70 mb-2">
          <BookOpen className="w-4 h-4" />
          <span className="font-typewriter text-[11px] uppercase tracking-wider">Kamus Saku Kita</span>
        </div>
        <h2 className="font-handwriting text-3xl font-bold text-[#2C2621] mb-4">
          Kosakata Rahasia
        </h2>

        <div className="bg-white/80 p-3.5 rounded-xl text-left mb-6 border border-amber-900/10">
          <div className="font-bold text-sm text-[#2C2621]">Ngambek 'Y'</div>
          <div className="text-[10px] text-[#9E9489] font-typewriter italic mb-1.5">/ngam·bek way/ — ungkapan</div>
          <div className="text-xs text-[#6B6259]">
            Kondisi saat Adiba cuma membalas satu huruf 'Y' tanpa titik.
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-2 rounded-xl bg-[#2B3242] text-amber-200 font-semibold text-xs shadow hover:bg-[#1C2230] transition-all"
        >
          Masuk ke Malam Temaram 🌙
        </button>
      </div>
    </section>
  );
}
