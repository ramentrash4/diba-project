"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Play,
  Pause,
  Sparkles,
  ChevronRight,
  MessageCircle,
  FileText,
  Volume2,
  Headphones,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment6VoiceNotes({ onComplete }) {
  const { playTrack, pauseTrack, isForegroundPlaying, activeTrackId, playSfx } = useAudio();
  const vns = scrapbookData.voiceNotes;

  // Indeks VN yang sedang diputar (null jika tidak ada)
  const [playingVnId, setPlayingVnId] = useState(null);

  // Progres waktu VN aktif (detik)
  const [playProgress, setPlayProgress] = useState(0);

  // Status VN mana saja yang sudah selesai didengar
  const [completedVns, setCompletedVns] = useState({ "vn-1": false, "vn-2": false, "vn-3": false });

  // Status animasi "Tatwa sedang mengetik..."
  const [isTypingFor, setIsTypingFor] = useState(null);

  // Status balasan Tatwa yang sudah muncul
  const [revealedReplies, setRevealedReplies] = useState({});

  // Timer interval untuk simulasi playback audio jika file MP3 belum ada
  const progressTimer = useRef(null);

  // Durasi simulasi dalam detik untuk setiap VN
  const durations = { "vn-1": 8, "vn-2": 10, "vn-3": 9 };

  // Putar atau Jeda Voice Note
  const handleToggleVn = (vn) => {
    if (playingVnId === vn.id) {
      // Pause
      pauseTrack();
      setPlayingVnId(null);
      if (progressTimer.current) clearInterval(progressTimer.current);
    } else {
      // Play
      playSfx("btn-toggle");
      setPlayingVnId(vn.id);
      setPlayProgress(0);
      playTrack(vn.id, vn.src);

      if (progressTimer.current) clearInterval(progressTimer.current);

      const targetDuration = durations[vn.id] || 8;
      progressTimer.current = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= targetDuration) {
            clearInterval(progressTimer.current);
            handleVnFinished(vn);
            return targetDuration;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Saat VN selesai diputar -> Muncul animasi typing -> Pop balasan Tatwa
  const handleVnFinished = (vn) => {
    pauseTrack();
    setPlayingVnId(null);
    setCompletedVns((prev) => ({ ...prev, [vn.id]: true }));

    // Jika belum pernah dijawab, jalankan urutan ketikan Tatwa
    if (!revealedReplies[vn.id]) {
      setIsTypingFor(vn.id);
      setTimeout(() => {
        setIsTypingFor(null);
        playSfx("bubble-pop");
        setRevealedReplies((prev) => ({ ...prev, [vn.id]: true }));
      }, 1400);
    }
  };

  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  const allVnsRevealed = revealedReplies["vn-1"] && revealedReplies["vn-2"] && revealedReplies["vn-3"];

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-3.5 py-4 select-none relative overflow-hidden bg-gradient-to-b from-[#161E2E] via-[#101622] to-[#0A0E17] text-white">
      
      {/* 1. HEADER SEGMEN: REKAMAN SUARA & TAWA */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center mt-1 z-20">
        {/* Indikator Kesinambungan Jack Earphone yang Tersambung dari Segmen 5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider mb-2 bg-[#0F1824]/90 px-3 py-1 rounded-full border border-emerald-500/30 shadow-xs"
        >
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <span>Jack 3.5mm Terhubung • Audio Live</span>
          <Headphones className="w-3 h-3 text-emerald-400 ml-0.5" />
        </motion.div>

        <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[10px] font-black uppercase tracking-wider mb-1 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
          <Mic className="w-3.5 h-3.5 text-emerald-400" />
          <span>Voice Archive • Pilkom '25</span>
        </div>

        <h2 className="font-handwriting text-2xl sm:text-3xl text-amber-200 font-black tracking-wide drop-shadow-md">
          Rekaman Tawa & Tanya 🎙️
        </h2>

        <p className="font-sans-ui text-[11px] text-slate-300/80 font-semibold mt-0.5">
          Dengarkan suara asli Adiba & balasan obrolan khas Tatwa.
        </p>
      </div>

      {/* 2. DAFTAR PEMUTAR VOICE NOTES & CHAT BUBBLES BERUNTUN */}
      <div className="w-full max-w-[335px] sm:max-w-[350px] my-auto space-y-3 z-10 py-2">
        {vns.map((vn, idx) => {
          const isPlaying = playingVnId === vn.id;
          const isCompleted = completedVns[vn.id];
          const isUnlocked = idx === 0 || revealedReplies[vns[idx - 1].id];
          const isTyping = isTypingFor === vn.id;
          const isReplied = revealedReplies[vn.id];

          return (
            <div
              key={vn.id}
              className={`transition-all duration-400 ${
                isUnlocked ? "opacity-100 scale-100" : "opacity-40 pointer-events-none scale-98"
              }`}
            >
              {/* KARTU VOICE NOTE (ADIBA) */}
              <div
                className={`w-full rounded-2xl p-3 sm:p-3.5 border transition-all ${
                  isPlaying
                    ? "bg-[#1F2B3E] border-emerald-400/60 shadow-[0_10px_25px_rgba(16,185,129,0.2)]"
                    : "bg-[#182232] border-white/10 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-xs font-black">
                      A
                    </div>
                    <span className="font-sans-ui text-xs font-black text-[#F3F4F6]">
                      {vn.audioPreviewLabel}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-300 font-bold bg-black/40 px-1.5 py-0.5 rounded">
                    {isPlaying ? `0:0${playProgress}` : vn.duration}
                  </span>
                </div>

                {/* GELOMBANG AUDIO REALISTIS (WAVEFORM BARS) & TOMBOL PLAY */}
                <div className="flex items-center gap-2.5 mt-2">
                  <button
                    onClick={() => handleToggleVn(vn)}
                    disabled={!isUnlocked}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0 ${
                      isPlaying
                        ? "bg-emerald-500 text-slate-950 scale-105"
                        : "bg-emerald-700/80 hover:bg-emerald-600 text-white"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  {/* 18 Bar Gelombang Suara Berdenyut */}
                  <div className="flex-1 flex items-center gap-1 h-8 bg-black/30 px-2 rounded-lg border border-white/5 overflow-hidden">
                    {[...Array(16)].map((_, barIdx) => {
                      const heights = [30, 60, 45, 80, 50, 90, 70, 40, 85, 65, 95, 55, 40, 75, 50, 30];
                      const h = heights[barIdx % heights.length];
                      return (
                        <motion.div
                          key={`bar-${vn.id}-${barIdx}`}
                          animate={
                            isPlaying
                              ? { height: ["20%", `${h}%`, "20%"] }
                              : { height: `${Math.max(20, h * 0.4)}%` }
                          }
                          transition={{
                            repeat: isPlaying ? Infinity : 0,
                            duration: 0.4 + (barIdx % 4) * 0.1,
                            ease: "easeInOut",
                          }}
                          className={`flex-1 rounded-xs ${
                            isPlaying
                              ? "bg-emerald-400"
                              : isCompleted
                              ? "bg-emerald-600/60"
                              : "bg-slate-600"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* INDIKATOR: TATWA SEDANG MENGETIK... */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-1.5 ml-3 flex items-center gap-2 text-slate-400 text-[10.5px] font-sans-ui font-bold"
                  >
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                    <span>Tatwa sedang mengetik balasan...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* BUBBLE CHAT BALASAN TATWA (SPRING POP-IN) */}
              <AnimatePresence>
                {isReplied && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="mt-2 ml-4 bg-gradient-to-r from-[#2A3548] to-[#1E2736] p-3 rounded-2xl rounded-tl-xs border border-amber-400/25 shadow-md flex items-start gap-2.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-xs font-black shrink-0 mt-0.5">
                      T
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-sans-ui text-[10.5px] font-black text-amber-300">
                          Tatwa
                        </span>
                        <span className="font-mono text-[9px] text-slate-400">Baru saja</span>
                      </div>
                      <p className="font-handwriting text-base sm:text-[17px] text-[#FAF5EC] font-bold leading-snug">
                        "{vn.tatwaReply}"
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 3. TOMBOL TRANSISI KE SEGMEN 7 (WISHLIST KERTAS ROBEK) */}
      <div className="w-full max-w-[340px] flex flex-col items-center gap-1.5 mb-1 z-20">
        {allVnsRevealed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full"
          >
            {/* TIKET KERTAS ROBEK KUNING TERSELIP DI BAWAH CHAT */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playSfx("paper-swoosh");
                onComplete();
              }}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#D4A373] via-[#E2B788] to-[#C29363] text-[#24170F] font-sans-ui text-xs sm:text-[13px] font-black shadow-xl flex items-center justify-center gap-2 border-2 border-[#FFE3BA] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#7A4B23]" />
              <span>Buka Rencana Tertunda (Wishlist Kita) 📝 ➔</span>
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-400 font-sans-ui text-[10.5px] font-bold">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Dengarkan rekaman suara untuk melihat balasan Tatwa</span>
          </div>
        )}
      </div>
    </section>
  );
}
