"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Play,
  Pause,
  Sparkles,
  Headphones,
  Check,
  FastForward,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment6VoiceNotes({ onComplete }) {
  const { playTrack, pauseTrack, setPlaybackRate, playSfx } = useAudio();
  const vns = scrapbookData.voiceNotes;

  // Indeks VN aktif yang sedang ditampilkan (0 s/d 6)
  const [activeIndex, setActiveIndex] = useState(0);

  // Indeks VN yang sedang diputar suaranya (null jika sedang pause)
  const [playingVnId, setPlayingVnId] = useState(null);

  // Kecepatan putar audio (1x atau 2x)
  const [playbackSpeed, setPlaybackSpeedState] = useState(1);

  // Progres waktu VN aktif (detik)
  const [playProgress, setPlayProgress] = useState(0);

  // Status VN mana saja yang sudah selesai didengar
  const [completedVns, setCompletedVns] = useState({});

  // Status animasi "Tatwa sedang mengetik..."
  const [isTypingFor, setIsTypingFor] = useState(null);

  // Status balasan Tatwa yang sudah pernah muncul untuk tiap VN
  const [revealedReplies, setRevealedReplies] = useState({});

  // Status transisi menuju Segmen 7 (Tarik Wishlist)
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Timer interval untuk simulasi progres audio
  const progressTimer = useRef(null);

  const currentVn = vns[activeIndex];
  const isPlayingCurrent = playingVnId === currentVn.id;
  const isCurrentCompleted = !!completedVns[currentVn.id];
  const isTypingCurrent = isTypingFor === currentVn.id;
  const isCurrentReplied = !!revealedReplies[currentVn.id];

  // Toggle kecepatan putar antara 1x dan 2x
  const togglePlaybackSpeed = () => {
    playSfx("btn-toggle");
    const newSpeed = playbackSpeed === 1 ? 2 : 1;
    setPlaybackSpeedState(newSpeed);
    if (setPlaybackRate) {
      setPlaybackRate(newSpeed);
    }
  };

  // Berpindah ke VN lain (Pesan otomatis berganti, tidak menumpuk)
  const handleSelectVn = (index) => {
    if (index === activeIndex) return;
    playSfx("pencil-scratch");

    // Jika ada VN yang sedang berputar, hentikan dulu
    if (playingVnId) {
      pauseTrack();
      setPlayingVnId(null);
      if (progressTimer.current) clearInterval(progressTimer.current);
    }

    setPlayProgress(0);
    setActiveIndex(index);
  };

  // Putar atau Jeda Voice Note Aktif
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

      playTrack(
        vn.id,
        vn.src,
        () => handleVnFinished(vn),
        playbackSpeed
      );

      if (progressTimer.current) clearInterval(progressTimer.current);

      const targetDuration = vn.durationSeconds || 7;
      const intervalMs = Math.round(1000 / playbackSpeed);

      progressTimer.current = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= targetDuration) {
            clearInterval(progressTimer.current);
            handleVnFinished(vn);
            return targetDuration;
          }
          return prev + 1;
        });
      }, intervalMs);
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
      }, 1100);
    }
  };

  // Transisi Tarik Kertas Wishlist ke Segmen 7 (Zero Buttons & Menyambung Mulus)
  const handlePullWishlist = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    playSfx("ticket-tear");
    setTimeout(() => {
      playSfx("paper-swoosh");
    }, 150);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, []);

  // Semua 7 VN sudah selesai didengarkan atau VN ke-7 sudah terbuka balasannya
  const allVnsRevealed =
    vns.every((vn) => revealedReplies[vn.id]) ||
    (revealedReplies["vn-7"] && Object.keys(revealedReplies).length >= 4);

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

        {/* 2. STRIP NAVIGASI 7 VN (KOMPAK, RAPI, BERSIH DARI JUDUL) */}
        <div className="w-full flex items-center justify-between gap-1 px-1 bg-black/40 p-1.5 rounded-xl border border-white/10 shadow-inner z-10">
          {vns.map((vn, idx) => {
            const isActive = activeIndex === idx;
            const isPlaying = playingVnId === vn.id;
            const isCompleted = completedVns[vn.id];

            return (
              <button
                key={vn.id}
                onClick={() => handleSelectVn(idx)}
                aria-label={`Pilih rekaman suara 0${idx + 1}`}
                className={`flex-1 h-8 rounded-lg flex items-center justify-center font-mono text-[10.5px] font-black transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-500 text-slate-950 shadow-md scale-105"
                    : isCompleted
                    ? "bg-[#1C2838] text-emerald-300 border border-emerald-500/30 hover:bg-[#25364B]"
                    : "bg-[#141B26] text-slate-400 border border-white/5 hover:text-white"
                }`}
              >
                {isPlaying ? (
                  <div className="flex items-center gap-0.5 h-3">
                    <span className="w-0.5 h-full bg-slate-950 animate-pulse" />
                    <span className="w-0.5 h-2 bg-slate-950 animate-pulse [animation-delay:0.2s]" />
                    <span className="w-0.5 h-full bg-slate-950 animate-pulse [animation-delay:0.4s]" />
                  </div>
                ) : isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : (
                  <span>0{idx + 1}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. KARTU VOICE NOTE AKTIF (TANPA JUDUL VN, TAMPILAN TERFOKUS DENGAN SPEED 1X/2X) */}
        <div className="w-full bg-[#182333] rounded-2xl p-3 sm:p-3.5 border border-white/15 shadow-xl flex flex-col gap-2.5 relative overflow-hidden z-10">
          
          {/* Header Kartu: Profil Adiba & Tombol Kecepatan 1x / 2x */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 border border-emerald-300/40 flex items-center justify-center text-white font-sans-ui text-xs font-black shadow-xs">
                A
              </div>
              <div className="text-left">
                <span className="font-sans-ui text-xs font-black text-white block leading-tight">
                  Adiba Askiyaa
                </span>
                <span className="font-mono text-[9px] text-emerald-400 font-bold">
                  Pesan Suara 0{activeIndex + 1} dari 0{vns.length}
                </span>
              </div>
            </div>

            {/* Tombol Pengatur Kecepatan Putar (1x / 2x) */}
            <button
              onClick={togglePlaybackSpeed}
              title="Ubah kecepatan putar audio"
              className={`h-6.5 px-2.5 rounded-full font-mono text-[10px] font-black tracking-wider border transition-all cursor-pointer flex items-center gap-1 shadow-xs ${
                playbackSpeed === 2
                  ? "bg-amber-400 text-slate-950 border-amber-300 font-extrabold scale-105"
                  : "bg-[#0E1520] text-slate-300 border-white/20 hover:text-white"
              }`}
            >
              <FastForward className="w-3 h-3" />
              <span>{playbackSpeed}x</span>
            </button>
          </div>

          {/* Bar Kontrol Pemutar: Play/Pause Besar, 18 Bar Gelombang Suara & Waktu */}
          <div className="flex items-center gap-2.5 bg-[#0D141F] p-2 sm:p-2.5 rounded-xl border border-white/10 shadow-inner">
            {/* Tombol Play / Pause */}
            <button
              onClick={() => handleToggleVn(currentVn)}
              aria-label={isPlayingCurrent ? "Jeda suara" : "Putar suara"}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0 ${
                isPlayingCurrent
                  ? "bg-emerald-400 text-slate-950 scale-105 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white"
              }`}
            >
              {isPlayingCurrent ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* 18 Bar Gelombang Suara Berdenyut */}
            <div className="flex-1 flex items-center gap-1 h-7 sm:h-8 px-1 overflow-hidden">
              {[...Array(18)].map((_, barIdx) => {
                const heights = [30, 65, 45, 85, 55, 95, 75, 45, 90, 65, 95, 55, 45, 70, 85, 40, 60, 50];
                const h = heights[barIdx % heights.length];
                return (
                  <motion.div
                    key={`bar-${currentVn.id}-${barIdx}`}
                    animate={
                      isPlayingCurrent
                        ? { height: ["20%", `${h}%`, "20%"] }
                        : { height: `${Math.max(20, h * 0.4)}%` }
                    }
                    transition={{
                      repeat: isPlayingCurrent ? Infinity : 0,
                      duration: (0.35 + (barIdx % 4) * 0.08) / playbackSpeed,
                      ease: "easeInOut",
                    }}
                    className={`flex-1 rounded-xs ${
                      isPlayingCurrent
                        ? "bg-emerald-400"
                        : isCurrentCompleted
                        ? "bg-emerald-600/70"
                        : "bg-slate-600"
                    }`}
                  />
                );
              })}
            </div>

            {/* Durasi Audio */}
            <span className="font-mono text-[9.5px] sm:text-[10px] text-emerald-300 font-black bg-black/60 px-2 py-1 rounded-md shrink-0 border border-emerald-500/20">
              {isPlayingCurrent ? `0:0${playProgress}` : currentVn.duration}
            </span>
          </div>

          {/* Transkrip Kata-kata Asli Adiba (Tanpa Judul, Murni Suara Asli) */}
          <div className="bg-[#121B27] p-2.5 rounded-xl border border-white/10 text-left">
            <div className="flex items-center gap-1 text-slate-400 text-[9px] font-mono mb-1">
              <Mic className="w-3 h-3 text-emerald-400" />
              <span className="uppercase tracking-wider font-bold">Transkrip Suara:</span>
            </div>
            <p className="font-handwriting text-[14.5px] sm:text-[15.5px] text-emerald-100 font-bold leading-snug">
              "{currentVn.transcript}"
            </p>
          </div>

          {/* Balasan Tatwa (Pesan Keluar Dinamis saat VN Ini Selesai / Ganti VN = Ganti Pesan) */}
          <div className="min-h-[66px] relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isTypingCurrent ? (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-slate-400 text-[10.5px] font-sans-ui font-bold p-2 bg-black/30 rounded-xl border border-white/5"
                >
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                  <span>Tatwa sedang mengetik balasan...</span>
                </motion.div>
              ) : isCurrentReplied ? (
                <motion.div
                  key={`reply-${currentVn.id}`}
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="bg-gradient-to-r from-[#2A231C] to-[#1C1713] p-2.5 rounded-xl border border-amber-400/30 shadow-md flex items-start gap-2 text-left"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-[10px] font-black shrink-0 mt-0.5">
                    T
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-sans-ui text-[10.5px] font-black text-amber-300">
                        Tatwa Sukma
                      </span>
                      <span className="font-mono text-[8.5px] text-amber-200/50">Balasan</span>
                    </div>
                    <p className="font-handwriting text-[14px] sm:text-[15px] text-[#FFF6E9] font-bold leading-snug">
                      "{currentVn.tatwaReply}"
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="cue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-1.5 flex items-center justify-center gap-1.5 text-[10.5px] font-sans-ui text-slate-400 font-medium text-center"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                  <span>Putar rekaman suara di atas untuk mendengar suara Diba ✨</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. INTERAKSI TRANSISI TANGIBLE KE SEGMEN 7: TARIK LEMBARAN KERTAS WISHLIST */}
        {allVnsRevealed && (
          <div className="relative w-full h-[75px] mt-1 z-30 flex justify-center">
            {/* Latar Belakang Redup saat Kertas Ditarik Naik */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0.8 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -inset-x-6 -inset-y-[450px] bg-black/80 z-20 pointer-events-none"
            />

            {/* Kertas Kuning Legal Pad Utuh yang Terulur & Bergerak Naik ke Tengah Menjadi Segmen 7 */}
            <motion.div
              drag={!isTransitioning ? "y" : false}
              dragConstraints={{ top: -330, bottom: 0 }}
              dragElastic={0.1}
              dragSnapToOrigin={!isTransitioning}
              onDragEnd={(e, info) => {
                if (info.offset.y < -45 || info.velocity.y < -120) {
                  handlePullWishlist();
                }
              }}
              animate={
                isTransitioning
                  ? {
                      y: -330,
                      scale: 1,
                      transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
                    }
                  : { y: 0 }
              }
              className="absolute top-0 w-full max-w-[335px] sm:max-w-[340px] cursor-grab active:cursor-grabbing touch-none select-none z-30 flex flex-col items-center"
            >
              {/* Selotip Washi Tape Kuning */}
              <div className="w-20 h-3.5 bg-amber-200/70 -rotate-1 shadow-xs border border-amber-300/40 rounded-xs z-30 mb-[-6px] pointer-events-none" />

              {/* LEMBARAN KERTAS KUNING ROBEK BERGARIS (YELLOW LEGAL PAD) */}
              <div className="w-full bg-[#FEFCE8] rounded-b-xl border border-[#EADBBD] shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative flex flex-col overflow-hidden text-left paper-shadow pb-3">
                {/* Efek Sobekan Kertas Kasar di Tepi Atas (Torn Paper Edge SVG) */}
                <div className="w-full h-4 bg-[#EDE3C8] relative overflow-hidden flex items-end">
                  <svg viewBox="0 0 400 20" preserveAspectRatio="none" className="w-full h-3 text-[#FEFCE8] fill-current">
                    <path d="M0,0 L15,15 L30,3 L45,18 L60,2 L75,16 L90,4 L105,17 L120,3 L135,18 L150,2 L165,16 L180,4 L195,17 L210,3 L225,18 L240,2 L255,16 L270,4 L285,17 L300,3 L315,18 L330,2 L345,16 L360,4 L375,17 L390,3 L400,15 L400,20 L0,20 Z" />
                  </svg>
                </div>

                {/* Isolasi Kertas Sage Perekat di Bagian Atas */}
                <WashiTape color="sage" angle={1} className="absolute top-1 right-8 z-30 pointer-events-none" />

                {/* Garis Margin Merah Buku Kiri */}
                <div className="absolute left-9 top-4 bottom-0 w-px bg-rose-300 pointer-events-none" />

                {/* HEADER TERPASANG DI KERTAS */}
                <div className="px-3.5 pt-1.5 pb-1 flex flex-col text-left pl-11">
                  <div className="flex items-center justify-between">
                    <h3 className="font-handwriting text-xl sm:text-2xl text-[#140E0A] font-black tracking-wide leading-tight">
                      Rencana Tertunda 📝
                    </h3>
                    <span className="font-mono text-[8.5px] text-[#7A5524] font-bold bg-[#8C5D1E]/10 px-1.5 py-0.5 rounded">
                      Sobekan Wishlist
                    </span>
                  </div>
                  <p className="font-typewriter text-[10px] text-[#5A4839] font-bold">
                    Hal-hal yang belum sempat kita lakukan bersama.
                  </p>
                </div>

                {/* HANDLE / TAB INDIKATOR TARIK KE ATAS */}
                <div className="mx-3.5 my-1 py-1 px-3 bg-[#8C5D1E]/10 border border-[#8C5D1E]/25 rounded-full flex items-center justify-center gap-1.5 text-[#5C3A12] font-sans-ui text-[10px] font-black animate-pulse">
                  <span>⬆️ Tarik kertas ke atas untuk membuka rencana kita ⬆️</span>
                </div>

                {/* PREVIEW KONTEN DAFTAR WISHLIST */}
                <div className="p-3.5 pt-1 pl-11 space-y-2.5 relative z-10">
                  {scrapbookData.wishlist.map((item, idx) => (
                    <div key={`preview-wish-${idx}`} className="border-b border-[#F0E6CE] pb-2 last:border-0">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5 w-4 h-4 rounded border-2 border-[#8C6D4F] flex items-center justify-center shrink-0 bg-white shadow-2xs">
                          {idx === 0 ? (
                            <span className="text-[#8C3E2D] font-black text-xs">✓</span>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-xs bg-[#D8C2A7] opacity-40" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className="font-sans-ui text-xs font-black text-[#261B12] leading-snug block">
                            {item.text}
                          </span>
                          {idx === 0 && (
                            <p className="font-handwriting text-[14px] text-[#1E3A8A] font-bold mt-0.5">
                              "{item.note}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Teks Petunjuk Sentuh di Bawah Kertas */}
                <div className="px-4 text-center mt-0.5">
                  <span className="font-sans-ui text-[9.5px] text-[#8C755E] font-bold">
                    💡 Ketuk tiap rencana untuk membaca catatan refleksi di baliknya
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 5. PANDUAN INTERAKSI TUNGGAL (RINGKAS & TIDAK REDUNDAN) */}
        <div className="w-full max-w-[325px] flex items-center justify-center z-20 pointer-events-none">
          {!allVnsRevealed ? (
            <div className="bg-[#182333]/90 border border-emerald-400/30 rounded-full px-3.5 py-1 shadow-md flex items-center justify-center gap-2 text-emerald-200 font-sans-ui text-[10px] sm:text-[10.5px] font-bold text-center backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Dengarkan suara & pilih nomor VN di atas</span>
            </div>
          ) : (
            <div className="bg-[#182333]/90 border border-amber-400/30 rounded-full px-3.5 py-1 shadow-md flex items-center justify-center gap-2 text-amber-200 font-sans-ui text-[10px] sm:text-[10.5px] font-bold text-center backdrop-blur-xs">
              <span>📝</span>
              <span>Tarik kertas kuning ke atas untuk membuka rencana kita</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
