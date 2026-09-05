"use client";

import React, { useState } from "react";
import { Wrench, ChevronRight, Lock, Unlock } from "lucide-react";

export function DevNavigator({ currentSegment, onSelectSegment, isStrictLock, onToggleStrictLock }) {
  const [isOpen, setIsOpen] = useState(false);

  const segments = [
    { num: 1, title: "1. Kado & Pita" },
    { num: 2, title: "2. Mixtape Lagu" },
    { num: 3, title: "3. Tumpukan Polaroid" },
    { num: 4, title: "4. Kamus Kita" },
    { num: 5, title: "5. Kaca Berembun" },
    { num: 6, title: "6. Voice Notes" },
    { num: 7, title: "7. Wishlist Kertas" },
    { num: 8, title: "8. Tiket Doa / Penutup" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans-ui text-xs">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 bg-[#2C2621]/90 hover:bg-[#2C2621] text-white px-3 py-2 rounded-full shadow-lg border border-amber-200/20 backdrop-blur transition-all active:scale-95"
          title="Buka Navigasi Dev Segmen"
        >
          <Wrench className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-medium">Dev Segmen: {currentSegment}</span>
        </button>
      ) : (
        <div className="bg-[#2C2621]/95 text-white p-3.5 rounded-2xl shadow-2xl border border-white/10 w-64 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <Wrench className="w-3.5 h-3.5" />
              <span>Dev Segment Navigator</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white px-1.5 py-0.5 rounded text-xs"
            >
              ✕
            </button>
          </div>

          <p className="text-[11px] text-white/70 mb-2 leading-relaxed">
            Lompat langsung ke segmen yang sedang direvisi:
          </p>

          <div className="grid grid-cols-1 gap-1 max-h-48 overflow-y-auto pr-1">
            {segments.map((s) => (
              <button
                key={s.num}
                onClick={() => {
                  onSelectSegment(s.num);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                  currentSegment === s.num
                    ? "bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30"
                    : "hover:bg-white/10 text-white/90"
                }`}
              >
                <span>{s.title}</span>
                {currentSegment === s.num && <ChevronRight className="w-3 h-3" />}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-white/60">Strict Storybook:</span>
            <button
              onClick={onToggleStrictLock}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                isStrictLock
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              }`}
            >
              {isStrictLock ? (
                <>
                  <Lock className="w-2.5 h-2.5" /> Terkunci
                </>
              ) : (
                <>
                  <Unlock className="w-2.5 h-2.5" /> Bebas Dev
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
