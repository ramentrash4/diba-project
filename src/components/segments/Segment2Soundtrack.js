"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, ChevronRight, Volume2, Sparkles } from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment2Soundtrack({ onComplete }) {
  const { playTrack, pauseTrack, activeTrackId, isForegroundPlaying, playSfx } = useAudio();

  // Kaset yang sedang dimasukkan ke dalam player (null jika kosong/ejected)
  const [insertedTape, setInsertedTape] = useState(null);
  const [hasPlayedAny, setHasPlayedAny] = useState(false);

  // Efek ketikan mesin tik
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Masukkan kaset ke dalam player
  const handleInsertTape = (tape) => {
    playSfx("tape-insert");
    setInsertedTape(tape);
    setHasPlayedAny(true);
    playTrack(tape.id, tape.src);
  };

  // Keluarkan kaset (Eject)
  const handleEjectTape = () => {
    playSfx("tape-eject");
    pauseTrack();
    setInsertedTape(null);
  };

  // Efek ketikan mesin tik saat kaset dimasukkan
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
    }, 25);

    return () => clearInterval(timer);
  }, [insertedTape]);

  const isCurrentPlaying = isForegroundPlaying && insertedTape && activeTrackId === insertedTape.id;

  return (
    <section className="min-h-full flex flex-col items-center justify-center p-3 sm:p-5 select-none relative overflow-hidden my-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="w-full max-w-[345px] flex flex-col items-center"
      >
        {/* Header Segmen 2 Standout */}
        <div className="text-center mb-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF9EE] border border-[#CDB9A0] text-[#524132] font-extrabold text-[10px] font-sans-ui tracking-wider uppercase shadow-xs mb-1">
            <Disc className="w-3 h-3 text-[#A83226]" />
            <span>Side A: Mixtape Kenangan</span>
          </span>
          <h2 className="font-handwriting text-3xl sm:text-4xl font-extrabold text-[#120C08] tracking-wide">
            Soundtrack Perjalanan
          </h2>
          <p className="font-sans-ui text-xs text-[#423425] font-semibold mt-0.5">
            {insertedTape
              ? "Kaset sedang berputar di dalam player 🎵"
              : "Tarik atau ketuk kaset di bawah untuk memasukkannya ke player 👇"}
          </p>
        </div>

        {/* 1. PEMUTAR TAPE DECK RETRO (CASSETTE DECK PLAYER) */}
        <div className="relative w-full h-[195px] bg-[#221C17] rounded-2xl p-3 shadow-2xl border-2 border-[#453A30] paper-shadow-lifted flex flex-col justify-between overflow-hidden">
          {/* Bezel & Lubang Sekrup Sudut */}
          <div className="absolute top-2 left-2.5 w-2 h-2 rounded-full bg-[#524436] border border-black/60 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#524436] border border-black/60 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute bottom-2 left-2.5 w-2 h-2 rounded-full bg-[#524436] border border-black/60 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute bottom-2 right-2.5 w-2 h-2 rounded-full bg-[#524436] border border-black/60 flex items-center justify-center text-[5px] text-[#A8947E] font-mono">✕</div>

          {/* Panel Kontrol Atas: LED Indikator & Tombol Eject */}
          <div className="flex items-center justify-between px-2 pt-0.5 z-10">
            <div className="flex items-center gap-2">
              {/* LED Power */}
              <div className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isCurrentPlaying
                      ? "bg-emerald-400 shadow-[0_0_8px_#34D399]"
                      : "bg-[#5C4D3E]"
                  }`}
                />
                <span className="font-typewriter text-[8px] text-[#9E8B77] font-extrabold uppercase">
                  {isCurrentPlaying ? "PLAYING" : "STANDBY"}
                </span>
              </div>
            </div>

            {/* Tombol Eject Mekanik */}
            {insertedTape && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEjectTape}
                className="px-2.5 py-0.5 rounded bg-[#3B3128] hover:bg-[#4D4034] text-amber-200 border border-[#5E4F41] font-sans-ui text-[10px] font-bold shadow flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Eject</span>
                <span className="text-amber-400 font-extrabold">⏏</span>
              </motion.button>
            )}
          </div>

          {/* SLOT KANTUNG KASET (CASSETTE BAY DOOR) */}
          <div className="relative w-full h-[130px] rounded-xl border-2 border-[#3D3329] bg-[#120F0C] p-2 flex items-center justify-center overflow-hidden">
            {insertedTape ? (
              /* KONDISI A: KASET BERADA DI DALAM DECK & BERPUTAR */
              <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full h-full rounded-lg bg-gradient-to-b from-[#332A22] to-[#1E1813] border border-[#524436] p-2 flex flex-col justify-between overflow-hidden shadow-inner"
              >
                {/* Stiker Label Kaset Aktif - EXTRA BOLD FONT */}
                <div className="w-full bg-[#FAF3E8] border border-[#CBB69E] rounded px-2 py-1 shadow-sm flex items-center justify-between z-10">
                  <div className="flex flex-col text-left overflow-hidden mr-1">
                    <span className="font-typewriter text-[7.5px] uppercase tracking-wider text-[#73604E] font-extrabold">
                      SIDE A • {insertedTape.duration}
                    </span>
                    <span className="font-handwriting text-base font-extrabold text-[#120C08] truncate">
                      {insertedTape.title} — {insertedTape.artist}
                    </span>
                  </div>
                  <span className="font-typewriter text-[7px] bg-[#E8DCCF] text-[#3D2E1C] font-extrabold px-1 py-0.5 rounded uppercase">
                    STEREO
                  </span>
                </div>

                {/* Jendela Mika dengan 2 Roda Gerigi Berputar */}
                <div className="relative w-[90%] mx-auto h-[58px] bg-black/85 rounded-md border border-white/15 px-4 flex items-center justify-between overflow-hidden">
                  {/* Pita Magnetik Cokelat */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-3 bg-[#4A2D16] border-y border-[#6B4222] opacity-80 z-0" />

                  {/* Roda Gerigi Kiri Berputar */}
                  <motion.div
                    className="w-9 h-9 rounded-full bg-[#FAF5EC] border-2 border-[#CBB69E] relative z-10 flex items-center justify-center shadow"
                    animate={isCurrentPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#26211C] border border-[#CBB69E] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EC]" />
                    </div>
                    <div className="absolute w-full h-0.5 bg-[#CBB69E]" />
                    <div className="absolute h-full w-0.5 bg-[#CBB69E]" />
                  </motion.div>

                  {/* Mini Visualizer Equalizer */}
                  <div className="flex items-end gap-0.5 h-5 z-10">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`eq-${i}`}
                        className="w-1 bg-amber-400 rounded-xs"
                        animate={
                          isCurrentPlaying
                            ? { height: ["25%", "95%", "45%", "100%", "30%"] }
                            : { height: "25%" }
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 0.5 + i * 0.12,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Roda Gerigi Kanan Berputar */}
                  <motion.div
                    className="w-9 h-9 rounded-full bg-[#FAF5EC] border-2 border-[#CBB69E] relative z-10 flex items-center justify-center shadow"
                    animate={isCurrentPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-[#26211C] border border-[#CBB69E] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EC]" />
                    </div>
                    <div className="absolute w-full h-0.5 bg-[#CBB69E]" />
                    <div className="absolute h-full w-0.5 bg-[#CBB69E]" />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* KONDISI B: SLOT KOSONG - DROP TARGET YANG MENGUNDANG */
              <div className="w-full h-full border-2 border-dashed border-[#5C4C3E] rounded-lg flex flex-col items-center justify-center p-2 text-center bg-[#181410]/60">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <Disc className="w-7 h-7 text-amber-300/70 mb-1" />
                  <span className="font-typewriter text-[10px] text-amber-200/90 font-extrabold uppercase tracking-wider">
                    SLOT KASET KOSONG
                  </span>
                  <span className="font-sans-ui text-[9px] text-[#A8947E] font-semibold mt-0.5">
                    Tarik kaset ke sini atau ketuk kaset di bawah
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* 2. KARTU CATATAN MEMORI MESIN TIK (MUNCUL SAAT KASET DIMASUKKAN) */}
        <AnimatePresence>
          {insertedTape && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full mt-2.5 bg-[#FFFDF8] border border-[#E5DACB] p-3 rounded-xl shadow-sm text-left relative paper-shadow"
            >
              <WashiTape color="mustard" angle={-1.5} className="absolute -top-2 left-6" />
              <div className="flex items-center justify-between mb-1 pt-0.5">
                <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#8C3E2D] font-extrabold">
                  Catatan Memori ✍️
                </span>
                <span className="font-typewriter text-[9px] text-[#6B5A4B] font-bold">
                  {insertedTape.duration}
                </span>
              </div>
              <p className="font-typewriter text-xs text-[#140E0A] font-medium leading-relaxed min-h-[34px]">
                "{typedText}"
                {isTyping && (
                  <span className="inline-block w-1.5 h-3 bg-[#8C3E2D] ml-0.5 animate-pulse align-middle" />
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. TIGA KASET PITA FISIK BERWARNA (DRAGGABLE CARTRIDGES) */}
        <div className="w-full mt-3">
          <div className="text-left mb-1.5 px-1 flex items-center justify-between">
            <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#6B5A4B] font-extrabold">
              Koleksi Kaset Pita:
            </span>
            <span className="font-sans-ui text-[9px] text-[#8C7A68] italic">
              (Geser ke atas atau ketuk untuk memutar)
            </span>
          </div>

          <div className="space-y-2">
            {scrapbookData.soundtrack.map((tape, idx) => {
              const isLoaded = insertedTape && insertedTape.id === tape.id;

              // Skema warna retro untuk tiap kaset fisik
              const tapeStyles = [
                {
                  bg: "bg-[#D88A78]",
                  border: "border-[#B56755]",
                  labelBg: "bg-[#FFF9EE]",
                  accent: "#8C3420",
                },
                {
                  bg: "bg-[#C47D8A]",
                  border: "border-[#A85E6B]",
                  labelBg: "bg-[#FDF5F6]",
                  accent: "#7A3440",
                },
                {
                  bg: "bg-[#7AA089]",
                  border: "border-[#5E826C]",
                  labelBg: "bg-[#F5F9F6]",
                  accent: "#385944",
                },
              ];

              const style = tapeStyles[idx % tapeStyles.length];

              return (
                <motion.div
                  key={tape.id}
                  drag="y"
                  dragConstraints={{ top: -200, bottom: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(e, info) => {
                    // Jika ditarik ke atas lebih dari 70px, masukkan ke player
                    if (info.offset.y < -70) {
                      handleInsertTape(tape);
                    }
                  }}
                  onClick={() => handleInsertTape(tape)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-full h-[58px] rounded-xl p-2 border-2 shadow-md cursor-grab active:cursor-grabbing transition-all flex items-center justify-between overflow-hidden ${
                    style.bg
                  } ${style.border} ${
                    isLoaded ? "ring-2 ring-amber-400 opacity-60 pointer-events-none" : "hover:shadow-lg"
                  }`}
                >
                  {/* Dua Roda Lubang Mini Kaset */}
                  <div className="flex items-center gap-1.5 shrink-0 pl-1 z-10">
                    <div className="w-5 h-5 rounded-full bg-white border border-[#3D2E1C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#3D2E1C]" />
                    </div>
                    <div className="w-5 h-5 rounded-full bg-white border border-[#3D2E1C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#3D2E1C]" />
                    </div>
                  </div>

                  {/* Label Kertas Tengah dengan Judul Lagu EXTRA BOLD */}
                  <div className={`flex-1 mx-2.5 h-[40px] rounded px-2.5 py-0.5 border border-[#CBB69E] shadow-inner flex flex-col justify-center text-left ${style.labelBg}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-typewriter text-[7px] font-extrabold uppercase" style={{ color: style.accent }}>
                        TRACK 0{idx + 1} • {tape.duration}
                      </span>
                      {isLoaded && (
                        <span className="font-sans-ui text-[7.5px] bg-amber-400 text-black font-extrabold px-1 rounded">
                          DIMUAT
                        </span>
                      )}
                    </div>
                    <span className="font-sans-ui text-xs font-black text-[#140E0A] truncate leading-tight">
                      {tape.title}
                    </span>
                    <span className="font-typewriter text-[8px] text-[#524132] font-bold truncate">
                      {tape.artist}
                    </span>
                  </div>

                  {/* Ikon Aksi */}
                  <div className="pr-1 z-10">
                    <div className="w-6 h-6 rounded-full bg-black/30 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ↑
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. TOMBOL LANJUT KE SEGMEN 3 DENGAN TRANSISI MEMBALIK LEMBARAN */}
        <AnimatePresence>
          {hasPlayedAny && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
