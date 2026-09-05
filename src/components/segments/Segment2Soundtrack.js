"use client";

import React from "react";
import { Music, Play } from "lucide-react";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment2Soundtrack({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-xs w-full bg-white/70 backdrop-blur-sm p-6 rounded-2xl paper-shadow border border-amber-900/10 relative">
        <WashiTape color="sage" angle={-3} className="absolute -top-2.5 left-8" />
        <div className="flex items-center justify-center gap-2 mb-2 text-[#6B6259]">
          <Music className="w-4 h-4 text-emerald-600" />
          <span className="font-typewriter text-xs uppercase tracking-wider">Side A: Mixtape</span>
        </div>
        <h2 className="font-handwriting text-3xl font-bold text-[#2C2621] mb-3">
          Soundtrack Perjalanan
        </h2>
        <p className="text-xs font-sans-ui text-[#6B6259] mb-6">
          Lagu-lagu yang pernah menemani obrolan kita di sudut sore.
        </p>

        <div className="p-4 rounded-xl bg-[#2B2520] text-amber-100 flex items-center justify-between mb-6 shadow-inner">
          <div className="text-left font-typewriter text-xs">
            <div className="font-bold text-white">Lagu Sore Hari</div>
            <div className="text-[10px] text-amber-200/70">Nadin Amizah / Hindia</div>
          </div>
          <button className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center shadow">
            <Play className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-2 rounded-xl bg-[#E8B4B8] text-[#5C2B31] font-semibold text-xs shadow hover:bg-[#DE9FA4] transition-all"
        >
          Lanjut ke Polaroid →
        </button>
      </div>
    </section>
  );
}
