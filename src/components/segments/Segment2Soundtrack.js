"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Disc, ChevronRight } from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment2Soundtrack({ onComplete }) {
  const { playTrack, pauseTrack, activeTrackId, isForegroundPlaying, playSfx } = useAudio();
  
  // Lagu aktif yang dipilih (default lagu pertama)
  const [selectedSong, setSelectedSong] = useState(scrapbookData.soundtrack[0]);
  const [hasPlayedAny, setHasPlayedAny] = useState(false);

  // State untuk efek ketikan mesin tik (typewriter reveal)
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Status apakah lagu yang sedang dipilih adalah yang aktif berbunyi
  const isCurrentSongPlaying = isForegroundPlaying && activeTrackId === selectedSong.id;

  // Efek ketikan mesin tik setiap kali selectedSong berubah
  useEffect(() => {
    setTypedText("");
    setIsTyping(true);
    let index = 0;
    const fullText = selectedSong.memoryText;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [selectedSong]);

  // Handler klik tombol play/pause pada lagu
  const handleTogglePlay = (song) => {
    playSfx("tape-click");
    setSelectedSong(song);
    setHasPlayedAny(true);

    if (isForegroundPlaying && activeTrackId === song.id) {
      pauseTrack();
    } else {
      playTrack(song.id, song.src);
    }
  };

  return (
    <section className="min-h-full flex flex-col items-center justify-center p-4 sm:p-5 select-none relative overflow-hidden my-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="w-full max-w-[345px] flex flex-col items-center"
      >
        {/* Header Segmen 2 Standout */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF9EE] border border-[#CDB9A0] text-[#524132] font-bold text-[10px] font-sans-ui tracking-wider uppercase shadow-xs mb-1">
            <Disc className="w-3 h-3 text-[#A83226]" />
            <span>Side A: Mixtape Kenangan</span>
          </span>
          <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#120C08] tracking-wide">
            Soundtrack Perjalanan
          </h2>
          <p className="font-sans-ui text-xs text-[#4A3D30] font-medium mt-0.5">
            Lagu-lagu yang pernah mengiringi obrolan sore kita.
          </p>
        </div>

        {/* 1. UNIT KASET PITA ANALOG 90-AN (CASSETTE TAPE PLAYER) */}
        <div className="relative w-full h-[185px] bg-gradient-to-b from-[#3A332C] to-[#26211C] rounded-2xl p-3 shadow-2xl border-2 border-[#52473D] paper-shadow-lifted flex flex-col justify-between overflow-hidden">
          {/* 4 Sekrup Sudut Kaset Retro */}
          <div className="absolute top-2 left-2.5 w-2 h-2 rounded-full bg-[#6B5D4F] border border-black/50 flex items-center justify-center text-[6px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#6B5D4F] border border-black/50 flex items-center justify-center text-[6px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute bottom-2 left-2.5 w-2 h-2 rounded-full bg-[#6B5D4F] border border-black/50 flex items-center justify-center text-[6px] text-[#A8947E] font-mono">✕</div>
          <div className="absolute bottom-2 right-2.5 w-2 h-2 rounded-full bg-[#6B5D4F] border border-black/50 flex items-center justify-center text-[6px] text-[#A8947E] font-mono">✕</div>

          {/* Stiker Label Kertas Selotip di Badan Kaset */}
          <div className="relative z-10 w-[92%] mx-auto bg-[#FBF6EC] border border-[#D1BFA8] rounded px-3 py-1.5 shadow-sm flex items-center justify-between">
            <div className="flex flex-col text-left overflow-hidden mr-2">
              <span className="font-typewriter text-[8px] uppercase tracking-wider text-[#8C7A68] font-bold">
                SIDE A • {selectedSong.duration}
              </span>
              <span className="font-handwriting text-base font-bold text-[#1E1915] truncate">
                {selectedSong.title} — {selectedSong.artist}
              </span>
            </div>
            <span className="font-typewriter text-[7px] bg-[#E8DCCF] text-[#4A3B2C] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter shrink-0">
              STEREO
            </span>
          </div>

          {/* Jendela Mika Transparan Kaset dengan 2 Roda Gerigi Berputar */}
          <div className="relative w-[88%] mx-auto h-[74px] bg-[#120F0C]/90 rounded-lg border border-white/15 p-2 flex items-center justify-between px-5 overflow-hidden shadow-inner">
            {/* Pita Magnetik Cokelat Tua Melintang */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-3.5 bg-[#4A2D16] border-y border-[#6B4222] opacity-85 z-0" />

            {/* Roda Gerigi Kiri (Left Reel Spoke) */}
            <motion.div
              className="w-11 h-11 rounded-full bg-[#FAF5EC] border-2 border-[#CBB69E] relative z-10 flex items-center justify-center shadow-md"
              animate={isCurrentSongPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            >
              {/* Gerigi 6 Sisi Kaset */}
              <div className="w-4 h-4 rounded-full bg-[#26211C] border border-[#CBB69E] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EC]" />
              </div>
              <div className="absolute w-full h-0.5 bg-[#CBB69E]" />
              <div className="absolute h-full w-0.5 bg-[#CBB69E]" />
              <div className="absolute w-full h-0.5 bg-[#CBB69E] rotate-45" />
              <div className="absolute w-full h-0.5 bg-[#CBB69E] -rotate-45" />
            </motion.div>

            {/* Indikator Visual Gelombang Suara (Mini Equalizer) */}
            <div className="flex items-end gap-0.5 h-6 z-10 opacity-75">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`eq-${i}`}
                  className="w-1 bg-amber-400 rounded-xs"
                  animate={
                    isCurrentSongPlaying
                      ? { height: ["20%", "90%", "40%", "100%", "30%"] }
                      : { height: "20%" }
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Roda Gerigi Kanan (Right Reel Spoke) */}
            <motion.div
              className="w-11 h-11 rounded-full bg-[#FAF5EC] border-2 border-[#CBB69E] relative z-10 flex items-center justify-center shadow-md"
              animate={isCurrentSongPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
            >
              <div className="w-4 h-4 rounded-full bg-[#26211C] border border-[#CBB69E] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FAF5EC]" />
              </div>
              <div className="absolute w-full h-0.5 bg-[#CBB69E]" />
              <div className="absolute h-full w-0.5 bg-[#CBB69E]" />
              <div className="absolute w-full h-0.5 bg-[#CBB69E] rotate-45" />
              <div className="absolute w-full h-0.5 bg-[#CBB69E] -rotate-45" />
            </motion.div>
          </div>

          {/* Garis Dasar Kaset Analog */}
          <div className="w-[75%] mx-auto h-2 bg-[#2B241E] rounded-full border-t border-white/10 flex items-center justify-around px-4">
            <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
          </div>
        </div>

        {/* 2. KARTU MEMO KENANGAN TATWA (EFEK KETIKAN MESIN TIK OTENTIK) */}
        <div className="w-full mt-3 bg-[#FFFDF8] border border-[#E5DACB] p-3.5 rounded-xl shadow-md text-left relative paper-shadow">
          <WashiTape color="mustard" angle={-1.5} className="absolute -top-2 left-6" />
          
          <div className="flex items-center justify-between mb-1 pt-0.5">
            <span className="font-typewriter text-[9px] uppercase tracking-wider text-[#8C3E2D] font-bold">
              Catatan Memori ✍️
            </span>
            <span className="font-typewriter text-[9px] text-[#7A6B5C]">
              {selectedSong.duration}
            </span>
          </div>

          {/* Teks Ketikan Mesin Tik Huruf Demi Huruf */}
          <p className="font-typewriter text-xs text-[#1E1915] leading-relaxed min-h-[36px]">
            "{typedText}"
            {isTyping && (
              <span className="inline-block w-1.5 h-3 bg-[#8C3E2D] ml-0.5 animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* 3. DAFTAR LAGU (TRACKLIST KERTAS BINDER VINTAGE) */}
        <div className="w-full mt-3 space-y-1.5">
          {scrapbookData.soundtrack.map((song, idx) => {
            const isThisPlaying = isForegroundPlaying && activeTrackId === song.id;
            const isThisSelected = selectedSong.id === song.id;

            return (
              <motion.div
                key={song.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTogglePlay(song)}
                className={`w-full p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  isThisSelected
                    ? "bg-[#FFF9EE] border-[#CBB69E] shadow-sm"
                    : "bg-[#FFFDF8]/80 hover:bg-[#FFF9EE] border-[#E8DCCF]"
                }`}
              >
                {/* Info Lagu */}
                <div className="flex items-center gap-2.5 text-left overflow-hidden">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isThisPlaying
                        ? "bg-[#8C3E2D] text-amber-100 shadow"
                        : "bg-[#EFE3CF] text-[#4A3B2C]"
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-current" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                    )}
                  </div>

                  <div className="overflow-hidden">
                    <div className="font-sans-ui text-xs font-bold text-[#1E1915] truncate">
                      {idx + 1}. {song.title}
                    </div>
                    <div className="font-typewriter text-[10px] text-[#7A6B5C] truncate">
                      {song.artist}
                    </div>
                  </div>
                </div>

                {/* Durasi */}
                <span className="font-typewriter text-[10px] text-[#8C7A68] shrink-0 pl-2">
                  {song.duration}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* 4. TOMBOL LANJUT KE SEGMEN 3 (MUNCUL SETELAH MINIMAL 1 LAGU DIPUTAR) */}
        <AnimatePresence>
          {hasPlayedAny ? (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onComplete}
                className="w-full py-3 px-4 rounded-xl bg-[#1C1510] hover:bg-black text-[#F4EDE2] font-sans-ui text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer border border-amber-300/20"
              >
                <span>Lanjut ke Tumpukan Polaroid (Foto Kita)</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-sans-ui text-[11px] text-[#7A6B5C] mt-3 italic"
            >
              (Putar salah satu lagu di atas untuk membuka lembaran berikutnya 🎵)
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
