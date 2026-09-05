"use client";

import React from "react";
import { Ticket } from "lucide-react";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment8Closing({ onFinalLock }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none text-[#2C2621]">
      <div className="max-w-xs w-full bg-white p-6 rounded-2xl paper-shadow border border-amber-900/10 relative">
        <WashiTape color="mustard" angle={1} className="absolute -top-2 right-8" />
        <div className="flex items-center justify-center gap-1.5 text-amber-800 mb-2">
          <Ticket className="w-4 h-4" />
          <span className="font-typewriter text-xs uppercase tracking-wider">Tiket Doa</span>
        </div>
        <h2 className="font-handwriting text-3xl font-bold mb-3">
          Untuk Masa Depanmu
        </h2>

        {/* Boarding Pass Mockup */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-dashed border-amber-800/30 text-left mb-6 font-typewriter text-xs">
          <div className="text-[10px] text-amber-800/60 uppercase">Nama Penumpang</div>
          <div className="font-bold text-sm text-[#2C2621] mb-2">Adiba (Askiyaa) — Pilkom '25</div>

          <div className="text-[10px] text-amber-800/60 uppercase">Tujuan</div>
          <div className="font-semibold text-xs text-[#2C2621] mb-2">Masa Depan yang Bahagia</div>

          <div className="text-[10px] text-amber-800/60 uppercase">Status</div>
          <div className="text-xs text-emerald-700 font-bold">Valid Selamanya ✨</div>
        </div>

        <p className="font-handwriting text-base text-[#6B6259] leading-relaxed mb-6">
          "Terima kasih untuk semua tawa dan waktu yang pernah ada. Tidak ada penyesalan, hanya doa tulus untukmu."
        </p>

        <button
          onClick={onFinalLock}
          className="w-full py-2.5 rounded-full bg-[#2C2621] text-amber-200 font-semibold text-xs shadow-lg hover:bg-black active:scale-95 transition-all"
        >
          Tutup Lembaran
        </button>
      </div>
    </section>
  );
}
