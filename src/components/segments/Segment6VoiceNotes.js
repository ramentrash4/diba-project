"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Play,
  Pause,
  Sparkles,
  FileText,
  Headphones,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";

export function Segment6VoiceNotes({ onComplete }) {
  const { playTrack, pauseTrack, playSfx } = useAudio();
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

  // Status transisi menuju Segmen 7
  const [isTransitioning, setIsTransitioning] = useState(false);

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
      }, 1200);
    }
  };

  // Transisi Tarik Kertas Wishlist ke Segmen 7 (Zero Buttons)
  const handlePullWishlist = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    playSfx("ticket-tear");
    setTimeout(() => {
      playSfx("paper-swoosh");
    }, 200);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  const allVnsRevealed = revealedReplies["vn-1"] && revealedReplies["vn-2"] && revealedReplies["vn-3"];

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-3.5 py-2 sm:py-3 select-none relative overflow-hidden my-auto bg-gradient-to-b from-[#161E2E] via-[#101622] to-[#0A0E17] text-white">
      {/* WRAPPER TENGAH LAYAR TERFOKUS: Merapatkan elemen agar seimbang secara visual di tengah */}
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center gap-2 sm:gap-2.5 my-auto">
        
        {/* 1. HEADER SEGMEN: INDIKATOR KONEKSI AUDIO DARI SEGMEN 5 & JUDUL */}
        <div className="w-full flex flex-col items-center text-center z-20">
          {/* Indikator Kesinambungan Colokan Jack 3.5mm dari Segmen 5 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider mb-1 bg-[#0F1824]/90 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-xs"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span>Jack 3.5mm Terhubung • Audio Live</span>
            <Headphones className="w-3 h-3 text-emerald-400 ml-0.5" />
          </motion.div>

          <h2 className="font-handwriting text-2xl sm:text-3xl text-amber-200 font-black tracking-wide drop-shadow-md">
            Rekaman Tawa & Tanya 🎙️
          </h2>

          <p className="font-sans-ui text-[10.5px] text-slate-300/80 font-medium mt-0.5">
            Dengarkan suara asli Adiba & balasan obrolan khas Tatwa.
          </p>
        </div>

        {/* 2. DAFTAR PEMUTAR VOICE NOTES & CHAT BUBBLES BERUNTUN (KOMPAK & RAMPING) */}
        <div className="w-full space-y-2 py-0.5 z-10">
          {vns.map((vn, idx) => {
            const isPlaying = playingVnId === vn.id;
            const isCompleted = completedVns[vn.id];
            const isUnlocked = idx === 0 || revealedReplies[vns[idx - 1].id];
            const isTyping = isTypingFor === vn.id;
            const isReplied = revealedReplies[vn.id];

            return (
              <div
                key={vn.id}
                className={`transition-all duration-300 ${
                  isUnlocked ? "opacity-100 scale-100" : "opacity-35 pointer-events-none scale-98"
                }`}
              >
                {/* KARTU VOICE NOTE (ADIBA) */}
                <div
                  className={`w-full rounded-xl p-2.5 border transition-all ${
                    isPlaying
                      ? "bg-[#1F2B3E] border-emerald-400/60 shadow-[0_6px_18px_rgba(16,185,129,0.2)]"
                      : "bg-[#182232] border-white/10 shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-[10px] font-black">
                        A
                      </div>
                      <span className="font-sans-ui text-[11.5px] font-bold text-[#F3F4F6]">
                        {vn.audioPreviewLabel}
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] text-emerald-300 font-bold bg-black/40 px-1.5 py-0.5 rounded">
                      {isPlaying ? `0:0${playProgress}` : vn.duration}
                    </span>
                  </div>

                  {/* GELOMBANG AUDIO & TOMBOL PLAY (SATU-SATUNYA TOMBOL YANG DIIZINKAN) */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleVn(vn)}
                      disabled={!isUnlocked}
                      aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0 ${
                        isPlaying
                          ? "bg-emerald-500 text-slate-950 scale-105"
                          : "bg-emerald-700/80 hover:bg-emerald-600 text-white"
                      }`}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>

                    {/* 14 Bar Gelombang Suara Berdenyut */}
                    <div className="flex-1 flex items-center gap-1 h-7 bg-black/35 px-2 rounded-md border border-white/5 overflow-hidden">
                      {[...Array(14)].map((_, barIdx) => {
                        const heights = [35, 65, 45, 85, 55, 95, 75, 45, 90, 65, 95, 55, 45, 70];
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
                              duration: 0.38 + (barIdx % 3) * 0.1,
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
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1 ml-3 flex items-center gap-1.5 text-slate-400 text-[10px] font-sans-ui font-bold"
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
                      initial={{ opacity: 0, scale: 0.92, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 280, damping: 22 }}
                      className="mt-1.5 ml-3 bg-gradient-to-r from-[#243042] to-[#1A2332] p-2.5 rounded-xl rounded-tl-xs border border-amber-400/25 shadow-md flex items-start gap-2"
                    >
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-[10px] font-black shrink-0 mt-0.5">
                        T
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-sans-ui text-[10px] font-black text-amber-300">
                            Tatwa
                          </span>
                          <span className="font-mono text-[8.5px] text-slate-400">Baru saja</span>
                        </div>
                        <p className="font-handwriting text-[14.5px] sm:text-[15.5px] text-[#FAF5EC] font-bold leading-snug">
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

        {/* 3. INTERAKSI TRANSISI KE SEGMEN 7: TARIK KERTAS WISHLIST (ZERO BUTTONS) */}
        {allVnsRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center mt-1 z-20"
          >
            {/* TAB LEMBARAN KERTAS WISHLIST (KERTAS KUNING ROBEK DENGAN WASHI TAPE) */}
            <div className="w-full relative flex flex-col items-center">
              {/* Selotip Washi Tape Kuning */}
              <div className="w-20 h-3.5 bg-amber-200/70 -rotate-1 shadow-xs border border-amber-300/40 rounded-xs z-20 mb-[-6px] pointer-events-none" />

              {/* Kertas Kuning yang Dapat Ditarik ke Atas (Drag Up) */}
              <motion.div
                drag="y"
                dragConstraints={{ top: -70, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  if (info.offset.y <= -30 || info.velocity.y < -100) {
                    handlePullWishlist();
                  }
                }}
                whileHover={{ y: -2 }}
                className="w-full bg-gradient-to-b from-[#FFF6D6] via-[#FEF0B8] to-[#FCE89C] text-[#2D2013] rounded-t-xl px-3 py-2 border-t-2 border-x-2 border-dashed border-[#DEB853] shadow-[0_-6px_18px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing select-none relative z-10 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8C5D1E]" />
                  <div className="flex flex-col text-left">
                    <span className="font-handwriting text-base text-[#24170F] font-black leading-none">
                      Rencana Tertunda Kita 📝
                    </span>
                    <span className="font-mono text-[9px] text-[#7A5524] font-bold">
                      Sobekan Wishlist Bersama
                    </span>
                  </div>
                </div>

                {/* Indikator Tarik ke Atas */}
                <div className="flex items-center gap-1 bg-[#8C5D1E]/15 px-2 py-0.5 rounded-full border border-[#8C5D1E]/30 text-[#4D310C] font-sans-ui text-[10px] font-black animate-pulse">
                  <span>Tarik ke atas ⬆️</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* 4. PANDUAN INTERAKSI TUNGGAL (RINGKAS & TIDAK REDUNDAN) */}
        <div className="w-full max-w-[325px] flex items-center justify-center z-20 pointer-events-none">
          {!allVnsRevealed ? (
            <div className="bg-[#182333]/90 border border-emerald-400/30 rounded-full px-3.5 py-1 shadow-md flex items-center justify-center gap-2 text-emerald-200 font-sans-ui text-[10.5px] font-bold text-center backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Putar rekaman suara untuk membaca balasan Tatwa</span>
            </div>
          ) : (
            <div className="bg-[#182333]/90 border border-amber-400/30 rounded-full px-3.5 py-1 shadow-md flex items-center justify-center gap-2 text-amber-200 font-sans-ui text-[10.5px] font-bold text-center backdrop-blur-xs">
              <span>📝</span>
              <span>Tarik kertas kuning ke atas untuk membuka rencana kita</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

