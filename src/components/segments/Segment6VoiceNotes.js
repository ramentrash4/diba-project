"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Sparkles,
  Headphones,
  CheckCheck,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment6VoiceNotes({ onComplete }) {
  const { playTrack, pauseTrack, seekTrack, setPlaybackRate, playSfx } = useAudio();
  const vns = scrapbookData.voiceNotes;

  // ID VN yang sedang aktif berputar
  const [playingVnId, setPlayingVnId] = useState(null);

  // Progres waktu putar per-VN dalam detik: { "vn-1": 3.2, ... }
  const [vnProgress, setVnProgress] = useState({});

  // Kecepatan putar per-VN (1x atau 2x): { "vn-1": 1, ... }
  const [vnSpeed, setVnSpeed] = useState({});

  // Status VN mana saja yang sudah pernah selesai didengar
  const [completedVns, setCompletedVns] = useState({});

  // Status animasi "Tatwa sedang mengetik..." untuk VN tertentu
  const [isTypingFor, setIsTypingFor] = useState(null);

  // Status balasan Tatwa yang sudah muncul: { "vn-1": true, ... }
  const [revealedReplies, setRevealedReplies] = useState({});

  // Status transisi menuju Segmen 7 (Wishlist)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const progressTimer = useRef(null);
  const chatBottomRef = useRef(null);
  const isScrubbingRef = useRef(false);

  // Auto-scroll ke bawah saat ada pesan baru atau animasi mengetik
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isTypingFor, revealedReplies]);

  // Mengatur kecepatan putar (1x ↔ 2x)
  const handleToggleSpeed = (vnId, e) => {
    if (e) e.stopPropagation();
    playSfx("btn-toggle");
    const currentSpeed = vnSpeed[vnId] || 1;
    const nextSpeed = currentSpeed === 1 ? 2 : 1;
    setVnSpeed((prev) => ({ ...prev, [vnId]: nextSpeed }));

    if (playingVnId === vnId && setPlaybackRate) {
      setPlaybackRate(nextSpeed);
    }
  };

  // Geser posisi audio maju/mundur (Scrubbing seperti WhatsApp asli)
  const handleSeek = (vn, newTime) => {
    const clampedTime = Math.max(0, Math.min(newTime, vn.durationSeconds || 7));
    setVnProgress((prev) => ({ ...prev, [vn.id]: clampedTime }));
    if (seekTrack) {
      seekTrack(clampedTime);
    }
  };

  // Putar atau Jeda Voice Note
  const handleToggleVn = (vn) => {
    const speed = vnSpeed[vn.id] || 1;

    if (playingVnId === vn.id) {
      pauseTrack();
      setPlayingVnId(null);
      if (progressTimer.current) clearInterval(progressTimer.current);
    } else {
      playSfx("btn-toggle");
      setPlayingVnId(vn.id);
      const startAt = vnProgress[vn.id] || 0;

      playTrack(
        vn.id,
        vn.src,
        () => handleVnFinished(vn),
        speed,
        (currTime) => {
          if (!isScrubbingRef.current) {
            setVnProgress((prev) => ({ ...prev, [vn.id]: currTime }));
          }
        },
        startAt
      );

      if (progressTimer.current) clearInterval(progressTimer.current);

      const targetDuration = vn.durationSeconds || 7;

      // Timer pendamping untuk kelancaran animasi waveform
      progressTimer.current = setInterval(() => {
        if (isScrubbingRef.current) return;
        setVnProgress((prev) => {
          const current = (prev[vn.id] || 0) + 0.1 * speed;
          if (current >= targetDuration) {
            clearInterval(progressTimer.current);
            handleVnFinished(vn);
            return { ...prev, [vn.id]: targetDuration };
          }
          return { ...prev, [vn.id]: current };
        });
      }, 100);
    }
  };

  // Saat VN selesai diputar -> Muncul animasi typing -> Pop balasan Tatwa
  const handleVnFinished = (vn) => {
    pauseTrack();
    setPlayingVnId(null);
    setCompletedVns((prev) => ({ ...prev, [vn.id]: true }));

    if (!revealedReplies[vn.id]) {
      setIsTypingFor(vn.id);
      setTimeout(() => {
        setIsTypingFor(null);
        playSfx("bubble-pop");
        setRevealedReplies((prev) => ({ ...prev, [vn.id]: true }));
      }, 1200);
    }
  };

  // Transisi Tarik Kertas Wishlist ke Segmen 7
  const handlePullWishlist = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    pauseTrack();
    playSfx("ticket-tear");
    setTimeout(() => {
      playSfx("paper-swoosh");
    }, 150);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const pauseTrackRef = useRef(pauseTrack);
  useEffect(() => {
    pauseTrackRef.current = pauseTrack;
  });

  useEffect(() => {
    return () => {
      if (progressTimer.current) clearInterval(progressTimer.current);
      pauseTrackRef.current?.();
    };
  }, []);

  // Format detik menjadi 0:00
  const formatTime = (sec) => {
    const s = Math.floor(sec || 0);
    const m = Math.floor(s / 60);
    const remainder = s % 60;
    return `${m}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  // 16 Bar waveform acak realistis untuk VN
  const generateWaveBars = (id) => {
    const seed = id.charCodeAt(id.length - 1) || 5;
    return [30, 65, 45, 90, 55, 95, 75, 45, 85, 60, 95, 55, 40, 75, 50, 65].map(
      (base, i) => Math.min(100, Math.max(25, base + ((seed * (i + 1)) % 25) - 10))
    );
  };

  const allVnsRevealed =
    vns.every((vn) => revealedReplies[vn.id]) ||
    (revealedReplies["vn-7"] && Object.keys(revealedReplies).length >= 4);

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-3 py-2 select-none relative overflow-hidden my-auto bg-gradient-to-b from-[#101722] via-[#0A1017] to-[#05080E] text-white">
      {/* WRAPPER TENGAH LAYAR TERFOKUS (ROOM CHAT CONTAINER) */}
      <div className="w-full max-w-[365px] sm:max-w-[380px] flex flex-col items-center justify-center gap-2 my-auto">

        {/* INDIKATOR KONEKSI AUDIO DARI SEGMEN 5 */}
        <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[9px] font-bold uppercase tracking-wider bg-[#101F20]/90 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Jack 3.5mm Terhubung • Roomchat Live</span>
          <Headphones className="w-3 h-3 text-emerald-400 ml-0.5" />
        </div>

        {/* BINGKAI ROOMCHAT WHATSAPP REALISTIS */}
        <div className="w-full h-[470px] sm:h-[490px] bg-[#0B141A] rounded-2xl border border-[#202C33] shadow-[0_16px_45px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative">

          {/* 1. HEADER ROOMCHAT WA */}
          <div className="h-13 bg-[#1F2C34] border-b border-[#2A3942] px-3 flex items-center justify-between z-20 shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-slate-300 cursor-pointer" />
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-400 border border-white/20 flex items-center justify-center text-white font-sans-ui text-xs font-black shadow-xs">
                  A
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1F2C34] rounded-full" />
              </div>
              <div className="text-left">
                <span className="font-sans-ui text-xs sm:text-[13px] font-bold text-[#E9EDEF] block leading-tight">
                  askiyaaachuuu
                </span>
                <span className="font-sans-ui text-[10px] block leading-none pt-0.5">
                  {isTypingFor ? (
                    <span className="text-emerald-400 font-bold animate-pulse">
                      Tatwa sedang mengetik...
                    </span>
                  ) : (
                    <span className="text-slate-400 font-medium">online</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#AEBAC1]">
              <Video className="w-4 h-4 cursor-pointer hover:text-white" />
              <Phone className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
              <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* 2. CHAT STREAM / FEED (SCROLLABLE, BEBAS TRANSLATE, SCRUBBABLE VN & BALASAN) */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-white/10">
            {/* Latar Belakang Subtle Pattern Wallpaper Chat */}
            <div className="absolute inset-0 bg-[radial-gradient(#1F2C34_1px,transparent_1px)] [background-size:16px_16px] opacity-35 pointer-events-none" />

            {/* DAFTAR BUBBLE CHAT TERUNGKAP SATU PER SATU */}
            {vns.map((vn, idx) => {
              const isUnlocked = idx === 0 || revealedReplies[vns[idx - 1].id];
              if (!isUnlocked) return null;

              const isPlaying = playingVnId === vn.id;
              const isCompleted = completedVns[vn.id];
              const isTyping = isTypingFor === vn.id;
              const isReplied = revealedReplies[vn.id];
              const currentProgress = vnProgress[vn.id] || 0;
              const targetDuration = vn.durationSeconds || 7;
              const currentSpeed = vnSpeed[vn.id] || 1;
              const waveBars = generateWaveBars(vn.id);

              return (
                <div key={vn.id} className="space-y-2 relative z-10">
                  {/* BUBBLE VN ADIBA (SISI KIRI - WHATSAPP STYLE, BEBAS TRANSLATE, SCRUBBABLE) */}
                  <div className="flex justify-start w-full">
                    <div className="w-[95%] sm:w-[92%] bg-[#202C33] rounded-2xl rounded-tl-xs px-3 py-2.5 border border-[#2A3942] shadow-md flex flex-col gap-1.5 text-left relative">

                      {/* Bar Pemutar VN: Play Button, Waveform Scrubber & Speed Badge */}
                      <div className="flex items-center gap-2.5 w-full">
                        {/* Tombol Play / Pause */}
                        <button
                          onClick={() => handleToggleVn(vn)}
                          aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
                          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer shrink-0 ${isPlaying
                            ? "bg-emerald-400 text-slate-950 scale-105 shadow-emerald-500/20"
                            : "bg-[#00A884] hover:bg-[#02906f] text-white"
                            }`}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>

                        {/* WAVEFORM SCRUBBER (DAPAT DI-SLIDE / DIKLIK MAJU-MUNDUR SEPERTI WA ASLI) */}
                        <div className="relative flex-1 flex items-center h-8 cursor-pointer select-none group touch-none">
                          {/* Visual Waveform Bars */}
                          <div className="flex items-center gap-[2px] w-full h-full pointer-events-none px-0.5">
                            {waveBars.map((h, bIdx) => {
                              const barProgress =
                                (bIdx / (waveBars.length - 1)) * targetDuration;
                              const isPassed = currentProgress >= barProgress;
                              return (
                                <div
                                  key={bIdx}
                                  className={`flex-1 rounded-full transition-all duration-150 ${
                                    isPassed
                                      ? isPlaying
                                        ? "bg-emerald-400 shadow-[0_0_5px_#34D399]"
                                        : "bg-[#00A884]"
                                      : "bg-[#8696A0]/45"
                                  }`}
                                  style={{ height: `${Math.max(20, h)}%` }}
                                />
                              );
                            })}
                          </div>

                          {/* Scrubber Knob / Dot seperti WhatsApp asli */}
                          <div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#00A884] border-2 border-[#202C33] shadow-md pointer-events-none transition-[left] duration-75 z-10"
                            style={{
                              left: `${Math.min(
                                99,
                                Math.max(
                                  1,
                                  (currentProgress / targetDuration) * 100
                                )
                              )}%`,
                            }}
                          />

                          {/* Native Range Slider Transparan di Atas Waveform untuk Scrubbing Sentuh Mulus Maju-Mundur */}
                          <input
                            type="range"
                            min={0}
                            max={targetDuration}
                            step={0.05}
                            value={currentProgress}
                            onPointerDown={() => {
                              isScrubbingRef.current = true;
                            }}
                            onTouchStart={() => {
                              isScrubbingRef.current = true;
                            }}
                            onPointerUp={() => {
                              isScrubbingRef.current = false;
                            }}
                            onTouchEnd={() => {
                              isScrubbingRef.current = false;
                            }}
                            onChange={(e) =>
                              handleSeek(vn, parseFloat(e.target.value))
                            }
                            onInput={(e) =>
                              handleSeek(vn, parseFloat(e.target.value))
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20 touch-none"
                            aria-label="Maju mundurkan voice note"
                          />
                        </div>

                        {/* Tombol Speed 1x / 2x di Dalam Bubble VN */}
                        <button
                          onClick={(e) => handleToggleSpeed(vn.id, e)}
                          title="Ubah kecepatan putar"
                          className={`h-6.5 px-2 rounded-full font-mono text-[10px] font-bold border transition-all cursor-pointer shrink-0 flex items-center justify-center ${currentSpeed === 2
                            ? "bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow-xs"
                            : "bg-[#111B21] text-slate-300 border-white/15 hover:text-white hover:border-white/30"
                            }`}
                        >
                          {currentSpeed}x
                        </button>
                      </div>

                      {/* Baris Informasi Bawah: Durasi & Timestamp (Jelas, Berjarak Aman, & Tidak Bertabrakan) */}
                      <div className="flex items-center justify-between pl-11.5 pr-1 pt-0.5 text-[10px] font-mono text-[#8696A0]">
                        <span className="font-semibold text-slate-300 tracking-tight">
                          {isPlaying || currentProgress > 0
                            ? formatTime(currentProgress)
                            : vn.duration}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-[#8696A0]">20:4{idx + 1}</span>
                          <CheckCheck className="w-3.5 h-3.5 text-[#53BDEB]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INDIKATOR TYPING TATWA */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex justify-end w-full"
                      >
                        <div className="bg-[#005C4B]/80 text-emerald-100 rounded-2xl rounded-tr-xs px-3 py-1.5 border border-emerald-500/20 shadow-sm flex items-center gap-1.5">
                          <span className="font-sans-ui text-[10.5px] font-semibold">
                            Tatwa sedang mengetik
                          </span>
                          <div className="flex items-center gap-0.5 pt-1">
                            <span className="w-1 h-1 rounded-full bg-white animate-bounce" />
                            <span className="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1 h-1 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* BUBBLE BALASAN TATWA (SISI KANAN - WHATSAPP OUTGOING BUBBLE) */}
                  <AnimatePresence>
                    {isReplied && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 22 }}
                        className="flex justify-end w-full"
                      >
                        <div className="max-w-[86%] sm:max-w-[82%] bg-[#005C4B] rounded-2xl rounded-tr-xs px-3 py-2 border border-[#02735E] shadow-md text-left relative">
                          <p className="font-sans-ui text-[12.5px] sm:text-[13px] text-[#E9EDEF] font-medium leading-relaxed">
                            "{vn.tatwaReply}"
                          </p>
                          <div className="flex items-center justify-end gap-1 mt-0.5 text-[9px] font-mono text-emerald-200/70">
                            <span>20:4{idx + 1}</span>
                            <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            <div ref={chatBottomRef} className="h-2" />
          </div>
        </div>

        {/* 3. TRANSISI TANGIBLE KE SEGMEN 7: SOBEKAN KERTAS WISHLIST (MUNCUL SETELAH VN TERBUKA) */}
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
              className="absolute top-0 w-full max-w-[360px] sm:max-w-[375px] cursor-grab active:cursor-grabbing touch-none select-none z-30 flex flex-col items-center"
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

        {/* 4. PANDUAN INTERAKSI RINGKAS */}
        <div className="w-full max-w-[350px] flex items-center justify-center z-20 pointer-events-none">
          {!allVnsRevealed ? (
            <div className="bg-[#182333]/90 border border-emerald-400/30 rounded-full px-3.5 py-1 shadow-md flex items-center justify-center gap-2 text-emerald-200 font-sans-ui text-[10px] sm:text-[10.5px] font-bold text-center backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Putar atau geser rekaman suara di dalam chat</span>
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
