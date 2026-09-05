"use client";

import React from "react";
import { CheckSquare } from "lucide-react";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment7Wishlist({ onComplete }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-xs w-full bg-[#FAF5EC] p-6 rounded-2xl paper-shadow border border-amber-900/10 relative text-[#2C2621]">
        <WashiTape color="sage" angle={-2} className="absolute -top-2 left-6" />
        <div className="flex items-center justify-center gap-1.5 text-[#6B6259] mb-2">
          <CheckSquare className="w-4 h-4 text-emerald-700" />
          <span className="font-typewriter text-xs">Rencana Tertunda</span>
        </div>
        <h2 className="font-handwriting text-3xl font-bold mb-3">
          Wishlist Kita
        </h2>
        <p className="text-xs text-[#6B6259] mb-6">
          Hal-hal yang pernah ingin kita lakukan bersama.
        </p>

        <div className="space-y-2.5 text-left mb-6 font-sans-ui text-xs">
          <div className="flex items-start gap-2 text-[#6B6259]">
            <div className="w-4 h-4 rounded border border-amber-900/30 shrink-0 mt-0.5" />
            <span>Nonton konser bareng yang sempat kita rencanakan</span>
          </div>
          <div className="flex items-start gap-2 text-[#6B6259]">
            <div className="w-4 h-4 rounded border border-amber-900/30 shrink-0 mt-0.5" />
            <span>Keliling kota naik motor waktu sore hari</span>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full py-2 rounded-xl bg-[#C26D57] text-white font-semibold text-xs shadow hover:bg-[#B05B47] transition-all"
        >
          Buka Lembaran Terakhir 🕊️
        </button>
      </div>
    </section>
  );
}
