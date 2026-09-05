"use client";

import React from "react";
import { Camera } from "lucide-react";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment3Polaroid({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-xs w-full relative">
        <WashiTape color="mustard" angle={2} className="absolute -top-3 right-6" />
        <div className="bg-white p-4 pb-6 rounded-xl shadow-lg border border-amber-900/10 transform -rotate-2 mb-6">
          <div className="w-full h-44 bg-amber-100/60 rounded flex items-center justify-center text-amber-800/40 mb-3 border border-amber-900/5">
            <Camera className="w-10 h-10" />
          </div>
          <p className="font-handwriting text-xl text-[#2C2621]">
            "Aku suka baju yang kamu pakai di foto itu."
          </p>
          <span className="font-typewriter text-[10px] text-[#9E9489] block mt-1">14 Okt 2024</span>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-2 rounded-xl bg-amber-200 text-amber-900 font-semibold text-xs shadow hover:bg-amber-300 transition-all"
        >
          Buka Kamus Kita →
        </button>
      </div>
    </section>
  );
}
