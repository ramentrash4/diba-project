"use client";

import React from "react";
import { Mic, MessageSquare } from "lucide-react";

export function Segment6VoiceNotes({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none text-white">
      <div className="max-w-xs w-full bg-[#182030]/90 backdrop-blur-md p-6 rounded-2xl border border-white/15 shadow-2xl">
        <div className="flex items-center justify-center gap-1.5 text-amber-300 mb-2">
          <Mic className="w-4 h-4" />
          <span className="font-typewriter text-xs">Rekaman Suara</span>
        </div>
        <h2 className="font-handwriting text-3xl font-bold text-white mb-2">
          Tawa & Tanya
        </h2>
        <p className="text-xs text-white/70 mb-6">
          Suara asli Adiba & balasan obrolan khas Tatwa.
        </p>

        <div className="p-3 bg-white/10 rounded-xl mb-6 text-left text-xs border border-white/10">
          <div className="text-amber-200 font-typewriter text-[10px] mb-1">VN 1: "Tatwaaa..." (0:14)</div>
          <div className="p-2 bg-white/10 rounded text-white/90">
            <span className="text-amber-300 font-bold">Tatwa:</span> "kenapa sii panggil panggil..."
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-2 rounded-xl bg-amber-400 text-slate-900 font-semibold text-xs shadow hover:bg-amber-300 transition-all"
        >
          Lihat Wishlist →
        </button>
      </div>
    </section>
  );
}
