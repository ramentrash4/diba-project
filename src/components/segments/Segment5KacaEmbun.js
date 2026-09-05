"use client";

import React from "react";
import { CloudRain } from "lucide-react";

export function Segment5KacaEmbun({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none text-white">
      <div className="max-w-xs w-full bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 night-card-glow">
        <div className="flex items-center justify-center gap-1.5 text-blue-200/80 mb-2">
          <CloudRain className="w-4 h-4" />
          <span className="font-typewriter text-xs">Malam Berembun</span>
        </div>
        <h2 className="font-handwriting text-3xl font-bold text-amber-200 mb-3">
          Hal-hal Kecil
        </h2>
        <p className="text-xs text-white/70 mb-6 leading-relaxed">
          Usap embun di kaca ini untuk melihat kebiasaan kecil yang selalu diingat.
        </p>

        <div className="h-36 rounded-xl bg-white/15 border border-dashed border-white/30 flex items-center justify-center text-sm font-handwriting text-white/80 mb-6">
          [ Area Usap Kaca Berembun ]
        </div>

        <button
          onClick={onComplete}
          className="w-full py-2 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs shadow hover:bg-amber-300 transition-all"
        >
          Dengarkan Voice Notes →
        </button>
      </div>
    </section>
  );
}
