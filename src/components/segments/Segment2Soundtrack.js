"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Disc,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Sparkles,
  Music,
} from "lucide-react";
import Image from "next/image";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment2Soundtrack({ onComplete }) {
  const { playTrack, pauseTrack, activeTrackId, isForegroundPlaying, playSfx } = useAudio();

  // Kaset yang sedang berada di dalam player (null jika kosong/ejected)
  const [insertedTape, setInsertedTape] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedAny, setHasPlayedAny] = useState(false);

  // Counter analog 3-digit retro (misal 042 -> 043 -> 044...)
  const [tapeCounter, setTapeCounter] = useState(42);

  // Status visual saat kaset sedang di-drag mendekati pemutar
  const [isDropTargetActive, setIsDropTargetActive] = useState(false);

  // Efek ketikan mesin tik catatan memori
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Ref untuk mendeteksi posisi drop zone pemutar tape deck
  const dropZoneRef = useRef(null);

  // Masukkan kaset ke dalam player (menimpa kaset lama jika ada)
  const handleInsertTape = (tape) => {
    playSfx("tape-insert");
    setInsertedTape(tape);
    setIsPlaying(true);
    setHasPlayedAny(true);
    setIsDropTargetActive(false);
    playTrack(tape.id, tape.src);
  };

  // Keluarkan kaset (Eject) -> kembali ke rak
  const handleEjectTape = () => {
    playSfx("tape-eject");
    pauseTrack();
    setIsPlaying(false);
    setInsertedTape(null);
    setIsDropTargetActive(false);
  };

  // Toggle Play / Pause mekanik
  const handleTogglePlay = () => {
    playSfx("btn-toggle");
    if (isPlaying) {
      pauseTrack();
      setIsPlaying(false);
    } else {
      if (insertedTape) {
        playTrack(insertedTape.id, insertedTape.src);
        setIsPlaying(true);
      }
    }
  };

  // Fast Forward / Rewind simulasi
  const handleFastForward = () => {
    playSfx("tape-rewind");
    setTapeCounter((prev) => prev + 8);
  };

  const handleRewind = () => {
    playSfx("tape-rewind");
    setTapeCounter((prev) => Math.max(0, prev - 8));
  };

  // Counter analog bertambah setiap detik saat bermain
  useEffect(() => {
    let interval = null;
    if (insertedTape && isPlaying) {
      interval = setInterval(() => {
        setTapeCounter((prev) => (prev >= 999 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [insertedTape, isPlaying]);

  // Efek ketikan mesin tik untuk memori kaset
  useEffect(() => {
    if (!insertedTape) {
      setTypedText("");
      return;
    }

    setTypedText("");
    setIsTyping(true);
    let index = 0;
    const fullText = insertedTape.memoryText;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [insertedTape]);

  const isCurrentActive = insertedTape && isPlaying;

  // Format 3 digit untuk counter analog (contoh: 042)
  const counterFormatted = String(tapeCounter).padStart(3, "0");

  return (
    <section className="min-h-full flex flex-col items-center justify-center p-3 sm:p-5 select-none relative overflow-hidden my-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[345px] flex flex-col items-center"
      >
        {/* Header Segmen 2 Standout */}
        <div className="text-center mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF9EE] border border-[#CDB9A0] text-[#524132] font-black text-[10px] font-sans-ui tracking-wider uppercase shadow-xs mb-1">
            <Disc className="w-3.5 h-3.5 text-[#A83226] animate-spin-slow" />
            <span>Side A: Mixtape Kenangan</span>
          </span>
          <h2 className="font-handwriting text-3xl sm:text-4xl font-black text-[#120C08] tracking-wide">
            Soundtrack Perjalanan
          </h2>
          <p className="font-sans-ui text-xs text-[#423425] font-semibold mt-0.5">
            {insertedTape
              ? "Kaset sedang berputar di dalam player 🎵"
              : "Tarik kaset ke pemutar di atas atau ketuk untuk memutar 👇"}
          </p>
        </div>

        {/* 1. TAPE DECK STEREO RETRO (CASSETTE PLAYER) */}
        <motion.div
          layoutId="shared-tape-deck"
          ref={dropZoneRef}
          className={`relative w-full rounded-2xl p-3 shadow-2xl border-2 transition-colors duration-300 paper-shadow-lifted flex flex-col justify-between overflow-hidden ${
            isDropTargetActive
              ? "bg-[#2D221A] border-amber-400 ring-4 ring-amber-400/40"
              : "bg-[#201914] border-[#483B30]"
          }`}
        >
          {/* Sekrup Sudut Mekanik */}
          <div className="absolute top-2 left-2.5 w-2 h-2 rounded-full bg-[#4D3F33] border border-black/70 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#4D3F33] border border-black/70 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute bottom-2 left-2.5 w-2 h-2 rounded-full bg-[#4D3F33] border border-black/70 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute bottom-2 right-2.5 w-2 h-2 rounded-full bg-[#4D3F33] border border-black/70 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>

          {/* Panel Atas: Merek Deck, Counter Analog 3-Digit & LED Status */}
          <div className="flex items-center justify-between px-1.5 pb-2 border-b border-[#3D3227] z-10">
            {/* Branding Retro */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] font-black text-amber-200/90 tracking-widest uppercase">
                DIBA DECK • T-25
              </span>
              {/* LED Power/Play */}
              <div className="flex items-center gap-1 ml-1">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isCurrentActive
                      ? "bg-emerald-400 shadow-[0_0_8px_#34D399]"
                      : insertedTape
                      ? "bg-amber-400 animate-pulse shadow-[0_0_6px_#FBBF24]"
                      : "bg-[#524133]"
                  }`}
                />
                <span className="font-typewriter text-[7px] text-[#A8947E] font-extrabold uppercase">
                  {isCurrentActive ? "RUN" : insertedTape ? "PAUSE" : "EMPTY"}
                </span>
              </div>
            </div>

            {/* Counter Analog 3-Digit Realistis */}
            <div className="flex items-center gap-1 bg-[#100D0A] px-2 py-0.5 rounded border border-[#3E3228] shadow-inner">
              <span className="font-typewriter text-[7px] text-[#7A6959] font-bold uppercase mr-0.5">
                TAPE
              </span>
              <div className="flex gap-0.5 font-mono text-[10px] font-black text-amber-300 tracking-wider">
                <span className="bg-[#221B15] px-1 py-0.2 rounded-xs border border-black/80">{counterFormatted[0]}</span>
                <span className="bg-[#221B15] px-1 py-0.2 rounded-xs border border-black/80">{counterFormatted[1]}</span>
                <span className="bg-[#221B15] px-1 py-0.2 rounded-xs border border-black/80">{counterFormatted[2]}</span>
              </div>
            </div>
          </div>

          {/* 2. JENDELA MIKA KASET (CASSETTE BAY) */}
          <div className="relative w-full h-[142px] my-2 rounded-xl border-2 border-[#382E25] bg-[#0F0C09] p-2 flex items-center justify-center overflow-hidden">
            {/* Partikel Notasi Musik Melayang Saat Lagu Berputar */}
            <AnimatePresence>
              {isCurrentActive && (
                <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`note-${i}`}
                      initial={{ opacity: 0, y: 30, x: 50 + i * 50, scale: 0.7 }}
                      animate={{
                        opacity: [0, 0.9, 0],
                        y: -40,
                        x: 50 + i * 50 + (i % 2 === 0 ? 15 : -15),
                        scale: 1.1,
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: i * 0.55,
                        ease: "easeOut",
                      }}
                      className="absolute bottom-4 text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    >
                      {i % 2 === 0 ? <Music className="w-3.5 h-3.5" /> : <Sparkles className="w-3 h-3" />}
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {insertedTape ? (
              /* KONDISI A: KASET BERADA DI DALAM PEMUTAR & BERPUTAR */
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full rounded-lg bg-gradient-to-b from-[#2B231C] to-[#171310] border border-[#4F4134] p-2 flex flex-col justify-between overflow-hidden shadow-inner"
              >
                {/* Header Label Kaset Aktif dengan Cover Album Mini & Judul Tebal */}
                <div className="w-full bg-[#FAF5EC] border border-[#CBB69E] rounded-md px-2 py-1 shadow-sm flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 overflow-hidden mr-1">
                    {/* Cover Album Thumbnail di Player */}
                    <div className="w-8 h-8 rounded shrink-0 overflow-hidden border border-[#BFA78E] relative shadow-xs">
                      <Image
                        src={insertedTape.coverImage}
                        alt={insertedTape.title}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="font-typewriter text-[7px] uppercase tracking-wider text-[#73604E] font-black">
                        {insertedTape.tag} • {insertedTape.duration}
                      </span>
                      <span className="font-sans-ui text-xs font-black text-[#140E0A] truncate leading-tight">
                        {insertedTape.title}
                      </span>
                      <span className="font-typewriter text-[8px] text-[#5A4839] font-bold truncate">
                        {insertedTape.artist}
                      </span>
                    </div>
                  </div>

                  {/* Stereo Badge */}
                  <span className="font-mono text-[7px] bg-[#E8DCCF] text-[#3D2E1C] font-black px-1.5 py-0.5 rounded uppercase shrink-0">
                    STEREO
                  </span>
                </div>

                {/* Jendela Pita Magnetik & 2 Roda Gerigi Berputar */}
                <div className="relative w-full mx-auto h-[62px] bg-black/90 rounded-md border border-white/15 px-3 flex items-center justify-between overflow-hidden">
                  {/* Pita Magnetik Cokelat */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3.5 bg-[#4A2D16] border-y border-[#6B4222] opacity-85 z-0" />

                  {/* Roda Gerigi Kiri */}
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#FAF5EC] border-2 border-[#CBB69E] relative z-10 flex items-center justify-center shadow"
                    animate={isCurrentActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#26211C] border border-[#CBB69E] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EC]" />
                    </div>
                    <div className="absolute w-full h-0.5 bg-[#CBB69E]" />
                    <div className="absolute h-full w-0.5 bg-[#CBB69E]" />
                  </motion.div>

                  {/* Visualizer Stereo VU Meter Realistis (2 Saluran L & R) */}
                  <div className="flex flex-col gap-1 items-center z-10">
                    <div className="flex items-center gap-0.5 h-4">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={`vu-l-${i}`}
                          className={`w-1 rounded-xs ${
                            i < 3 ? "bg-emerald-400" : i < 5 ? "bg-amber-400" : "bg-red-500"
                          }`}
                          animate={
                            isCurrentActive
                              ? { height: ["20%", `${40 + ((i * 15) % 60)}%`, "20%"] }
                              : { height: "20%" }
                          }
                          transition={{
                            repeat: Infinity,
                            duration: 0.35 + i * 0.08,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[6px] text-amber-300/80 font-bold uppercase tracking-widest">
                      VU LEVEL
                    </span>
                  </div>

                  {/* Roda Gerigi Kanan */}
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#FAF5EC] border-2 border-[#CBB69E] relative z-10 flex items-center justify-center shadow"
                    animate={isCurrentActive ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#26211C] border border-[#CBB69E] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EC]" />
                    </div>
                    <div className="absolute w-full h-0.5 bg-[#CBB69E]" />
                    <div className="absolute h-full w-0.5 bg-[#CBB69E]" />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* KONDISI B: SLOT KOSONG - DROP TARGET YANG MENGUNDANG */
              <div
                className={`w-full h-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-2 text-center transition-all ${
                  isDropTargetActive
                    ? "border-amber-400 bg-amber-500/15"
                    : "border-[#524233] bg-[#16120E]/70"
                }`}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <Disc className="w-8 h-8 text-amber-300/80 mb-1" />
                  <span className="font-mono text-[10px] text-amber-200 font-black uppercase tracking-wider">
                    {isDropTargetActive ? "LEPASKAN KASET DI SINI" : "SLOT KASET KOSONG"}
                  </span>
                  <span className="font-sans-ui text-[9px] text-[#B59F89] font-bold mt-0.5">
                    Tarik kaset ke sini atau ketuk kaset di rak bawah
                  </span>
                </motion.div>
              </div>
            )}
          </div>

          {/* 3. PANEL TOMBOL KONTROL MEKANIK FISIK (TAPE DECK CONTROLS) */}
          <div className="flex items-center justify-between px-1 pt-1 z-10">
            {/* Tombol Play / Pause & FFWD */}
            <div className="flex items-center gap-1.5">
              {/* Tombol Play / Pause */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleTogglePlay}
                disabled={!insertedTape}
                className={`h-7 px-2.5 rounded-md font-sans-ui text-[10px] font-bold shadow flex items-center gap-1 border transition-colors cursor-pointer ${
                  !insertedTape
                    ? "bg-[#2A211B] text-[#6E5C4E] border-[#3D3027] cursor-not-allowed opacity-50"
                    : isPlaying
                    ? "bg-[#3D2E1C] text-amber-300 border-amber-500/40 hover:bg-[#4E3B24]"
                    : "bg-emerald-800 text-emerald-100 border-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Play</span>
                  </>
                )}
              </motion.button>

              {/* Tombol Rewind & Fast Forward */}
              <div className="flex items-center gap-0.5">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleRewind}
                  disabled={!insertedTape}
                  title="Rewind"
                  className="w-6 h-7 rounded bg-[#2A211B] hover:bg-[#3B3026] text-[#A8947E] border border-[#3E3228] flex items-center justify-center cursor-pointer disabled:opacity-40"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFastForward}
                  disabled={!insertedTape}
                  title="Fast Forward"
                  className="w-6 h-7 rounded bg-[#2A211B] hover:bg-[#3B3026] text-[#A8947E] border border-[#3E3228] flex items-center justify-center cursor-pointer disabled:opacity-40"
                >
                  <FastForward className="w-2.5 h-2.5" />
                </motion.button>
              </div>
            </div>

            {/* Tombol Eject Mekanik Berwarna Oranye/Amber */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleEjectTape}
              disabled={!insertedTape}
              className={`h-7 px-3 rounded-md font-sans-ui text-[10px] font-black shadow flex items-center gap-1.5 border transition-all cursor-pointer ${
                insertedTape
                  ? "bg-[#A83226] hover:bg-[#BD3B2E] text-white border-[#87251B] shadow-md"
                  : "bg-[#281F19] text-[#6E5C4E] border-[#3D3027] cursor-not-allowed opacity-40"
              }`}
            >
              <span>EJECT</span>
              <span className="text-xs font-black">⏏</span>
            </motion.button>
          </div>
        </motion.div>

        {/* 4. KARTU CATATAN MEMORI MESIN TIK (MUNCUL SAAT KASET DIMASUKKAN) */}
        <AnimatePresence>
          {insertedTape && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="w-full mt-2.5 bg-[#FFFDF8] border border-[#E5DACB] p-3 rounded-xl shadow-sm text-left relative paper-shadow"
            >
              <WashiTape color="mustard" angle={-1.5} className="absolute -top-2 left-6" />
              <div className="flex items-center justify-between mb-1 pt-0.5">
                <span className="font-typewriter text-[9.5px] uppercase tracking-wider text-[#8C3E2D] font-black">
                  Catatan Memori ✍️
                </span>
                <span className="font-typewriter text-[9px] text-[#6B5A4B] font-bold">
                  {insertedTape.duration}
                </span>
              </div>
              <p className="font-typewriter text-xs text-[#140E0A] font-bold leading-relaxed min-h-[34px]">
                "{typedText}"
                {isTyping && (
                  <span className="inline-block w-1.5 h-3 bg-[#8C3E2D] ml-0.5 animate-pulse align-middle" />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. RAK KASET FISIK (3 SLOT TETAP DENGAN COVER ALBUM & DRAG SNAP TO ORIGIN) */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="w-full mt-3"
        >
          <div className="text-left mb-1.5 px-1 flex items-center justify-between">
            <span className="font-typewriter text-[9.5px] uppercase tracking-wider text-[#4E3F32] font-black">
              Rak Kaset Fisik:
            </span>
            <span className="font-sans-ui text-[9px] text-[#786450] font-bold italic">
              (Tarik kaset ke pemutar atau ketuk)
            </span>
          </div>

          {/* 3 SLOT RAK KASET */}
          <div className="space-y-2 relative">
            {scrapbookData.soundtrack.map((tape, idx) => {
              const isLoadedInPlayer = insertedTape && insertedTape.id === tape.id;

              // Skema warna retro kaset
              const tapeStyles = [
                {
                  bg: "bg-[#D88A78]",
                  border: "border-[#A85848]",
                  labelBg: "bg-[#FFF9EE]",
                  accent: "#8C3420",
                },
                {
                  bg: "bg-[#C47D8A]",
                  border: "border-[#9E5361]",
                  labelBg: "bg-[#FDF5F6]",
                  accent: "#7A3440",
                },
                {
                  bg: "bg-[#7AA089]",
                  border: "border-[#537A62]",
                  labelBg: "bg-[#F5F9F6]",
                  accent: "#385944",
                },
              ];

              const style = tapeStyles[idx % tapeStyles.length];

              return (
                <div
                  key={tape.id}
                  className="relative w-full h-[62px] rounded-xl"
                >
                  {/* TAMPILAN KETIKA KASET SEDANG DI DALAM PEMUTAR: CERUK RAK KOSONG */}
                  {isLoadedInPlayer ? (
                    <div className="w-full h-full rounded-xl border-2 border-dashed border-[#C5B49E] bg-[#EFE6D8]/60 flex items-center justify-between px-3.5 shadow-inner">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-dashed border-[#BBA790] flex items-center justify-center text-amber-700/60 font-mono text-[9px]">
                          0{idx + 1}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-typewriter text-[8px] font-black uppercase text-[#8C7A68]">
                            SLOT 0{idx + 1} KOSONG
                          </span>
                          <span className="font-sans-ui text-[10px] font-bold text-[#4E3F32]">
                            "{tape.title}" sedang di dalam pemutar 🎵
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleEjectTape}
                        className="px-2 py-1 rounded bg-[#E4D8C6] hover:bg-[#D8C7B0] text-[#4E3F32] font-sans-ui text-[9px] font-black border border-[#C5B49E] shadow-xs cursor-pointer"
                      >
                        Kembalikan ⏏
                      </button>
                    </div>
                  ) : (
                    /* TAMPILAN KASET FISIK DI RAK: BISA DI-DRAG ATAU DI-TAP */
                    <motion.div
                      drag
                      dragSnapToOrigin={true}
                      dragElastic={0.15}
                      onDrag={(e, info) => {
                        // Cek jika ditarik mendekati arah pemutar
                        if (info.offset.y < -50) {
                          setIsDropTargetActive(true);
                        } else {
                          setIsDropTargetActive(false);
                        }
                      }}
                      onDragEnd={(e, info) => {
                        setIsDropTargetActive(false);
                        // Jika ditarik ke atas melewati batas player (offset.y < -70)
                        if (info.offset.y < -70) {
                          handleInsertTape(tape);
                        }
                      }}
                      onClick={() => handleInsertTape(tape)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      whileDrag={{
                        scale: 1.05,
                        zIndex: 9999,
                        rotate: -1.5,
                        boxShadow: "0 18px 28px rgba(0,0,0,0.3)",
                      }}
                      className={`relative w-full h-full rounded-xl p-2 border-2 shadow-md cursor-grab active:cursor-grabbing transition-shadow flex items-center justify-between overflow-hidden ${
                        style.bg
                      } ${style.border}`}
                    >
                      {/* Cover Album Realistis */}
                      <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 border border-black/20 shadow relative bg-white">
                        <Image
                          src={tape.coverImage}
                          alt={tape.title}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>

                      {/* Label Kertas Tengah dengan Judul Extra Bold */}
                      <div
                        className={`flex-1 mx-2 h-[44px] rounded px-2 py-0.5 border border-[#CBB69E] shadow-xs flex flex-col justify-center text-left ${style.labelBg}`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="font-typewriter text-[7px] font-black uppercase tracking-wider"
                            style={{ color: style.accent }}
                          >
                            TRACK 0{idx + 1} • {tape.duration}
                          </span>
                          <span className="font-mono text-[6.5px] bg-[#E5D7C7] text-[#4E3F32] font-black px-1 rounded">
                            {tape.tag}
                          </span>
                        </div>
                        <span className="font-sans-ui text-xs font-black text-[#140E0A] truncate leading-tight">
                          {tape.title}
                        </span>
                        <span className="font-typewriter text-[8px] text-[#4A3B2E] font-bold truncate">
                          {tape.artist}
                        </span>
                      </div>

                      {/* Dua Lubang Roda Kaset Mini & Panah Dorong */}
                      <div className="flex items-center gap-1.5 shrink-0 pr-0.5">
                        <div className="w-4 h-4 rounded-full bg-white border border-[#3D2E1C] flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3D2E1C]" />
                        </div>
                        <div className="w-5 h-5 rounded-full bg-black/25 text-white flex items-center justify-center text-[10px] font-black shadow-xs">
                          ↑
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 6. TOMBOL LANJUT KE SEGMEN 3 DENGAN TRANSISI MEMBALIK LEMBARAN */}
        <AnimatePresence>
          {hasPlayedAny && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playSfx("page-turn");
                  onComplete();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1C1510] hover:bg-black text-[#FAF2E6] font-sans-ui text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-amber-300/30"
              >
                <span>Lanjut ke Tumpukan Polaroid (Foto Kita)</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
