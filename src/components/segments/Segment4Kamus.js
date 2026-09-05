"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Coffee,
  Code,
  Smile,
  Heart,
  Highlighter,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment4Kamus({ onComplete }) {
  const { playSfx } = useAudio();
  const dictionary = scrapbookData.dictionary;

  // Halaman kata yang sedang dibuka (0, 1, 2)
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Status apakah kata saat ini telah distabilo / disorot dengan pena
  const [highlightedWords, setHighlightedWords] = useState({});

  // Catatan rahasia tambahan dari Tatwa untuk setiap entri saat distabilo
  const secretFootnotes = [
    "Catatan Tatwa: Tapi anehnya, kalau ditanya lagi 5 menit kemudian langsung ngaku kalau sebenarnya lagi pengen jajan es krim atau seblak pedas. 🍨",
    "Catatan Tatwa: Jangan pernah ragu sama kemampuanmu di Pilkom 25 ya Diba. Kamu jauh lebih cerdas dan gigih dari yang kamu kira. Laptopnya jangan dipeluk tidur! 💻",
    "Catatan Tatwa: Nada bicaramu pas bilang 'Dih!' itu khas banget. Salah satu ekspresi yang paling sering bikin kangen suasana waktu itu. ✨",
  ];

  // Efek coretan stabilo saat kartu diketuk
  const handleToggleHighlight = (idx) => {
    playSfx("pencil-scratch");
    setHighlightedWords((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Navigasi halaman buku saku (suara balik lembaran)
  const handleNextPage = () => {
    playSfx("page-turn");
    if (activeWordIndex + 1 < dictionary.length) {
      setActiveWordIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    playSfx("page-turn");
    if (activeWordIndex > 0) {
      setActiveWordIndex((prev) => prev - 1);
    }
  };

  // Transisi fisik ke Segmen 5: Mengetuk tiket stempel jendela kafe
  const handleProceedToFoggyGlass = () => {
    playSfx("paper-swoosh");
    onComplete();
  };

  const currentEntry = dictionary[activeWordIndex];
  const isHighlighted = !!highlightedWords[activeWordIndex];

  // Ikon doodle lucu untuk tiap kata
  const getDoodleIcon = (idx) => {
    switch (idx) {
      case 0:
        return <Coffee className="w-4 h-4 text-[#8C3E2D]" />;
      case 1:
        return <Code className="w-4 h-4 text-[#2E5B88]" />;
      case 2:
        return <Smile className="w-4 h-4 text-[#9E6528]" />;
      default:
        return <Heart className="w-4 h-4 text-[#8C3E2D]" />;
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-3.5 py-4 select-none relative overflow-hidden">
      
      {/* 1. HEADER SEGMEN: JUDUL BUKU SAKU & PITA PEMBATAS */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center mt-1 z-20">
        <div className="relative inline-block mb-1">
          <WashiTape color="mustard" angle={-1} className="absolute -top-3 left-1/2 -translate-x-1/2" />
          <h2 className="font-handwriting text-2xl sm:text-3xl text-[#140E0A] font-black tracking-wide pt-1">
            Kamus Bahasa Kita 📖
          </h2>
        </div>

        <p className="font-typewriter text-[11px] sm:text-xs text-[#5A4839] font-bold">
          Kosakata rahasia yang hanya kita berdua mengerti.
        </p>

        {/* Tab Penanda Halaman Buku Saku */}
        <div className="mt-2 flex items-center gap-1.5 bg-[#EFE4D6]/90 p-1 rounded-xl border border-[#D5C7B5] shadow-2xs">
          {dictionary.map((entry, idx) => (
            <button
              key={`tab-${idx}`}
              onClick={() => {
                playSfx("page-turn");
                setActiveWordIndex(idx);
              }}
              className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-black transition-all cursor-pointer ${
                activeWordIndex === idx
                  ? "bg-[#3D2513] text-[#FAF5EC] shadow-xs scale-102"
                  : "text-[#6E5844] hover:bg-[#E2D5C3]"
              }`}
            >
              Kata 0{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 2. BUKU SAKU FISIK REALISTIS DENGAN KERTAS BERGARIS & STABILO */}
      <motion.div
        layoutId="shared-pocket-book"
        className="w-full max-w-[325px] sm:max-w-[340px] h-[410px] sm:h-[430px] my-auto relative z-10"
      >
        {/* Bodi Buku Kulit Luar (Cover Leather Border) */}
        <div className="w-full h-full bg-[#422C1D] rounded-2xl p-2.5 sm:p-3 border-2 border-[#5E402B] shadow-[0_22px_55px_rgba(0,0,0,0.55)] relative flex flex-col justify-between overflow-hidden paper-shadow">
          
          {/* Tulang Buku Kiri (Spine Accent) */}
          <div className="absolute left-2.5 top-0 bottom-0 w-2.5 bg-black/35 border-r border-[#6B4931]/60" />

          {/* Pita Pembatas Buku Merah Menggantung di Atas */}
          <div className="absolute top-0 right-10 w-3.5 h-7 bg-[#A83226] shadow-sm rounded-b-xs pointer-events-none z-30" />

          {/* LEMBARAN KERTAS DALAM BUKU SAKU BERGARIS */}
          <div className="w-full h-full bg-[#FFFDF8] rounded-xl ml-1 p-3.5 sm:p-4 border border-[#D5C7B5] shadow-inner flex flex-col justify-between relative overflow-hidden text-left">
            
            {/* Header Lembaran: Edisi Kamus & Stempel */}
            <div className="flex items-center justify-between border-b border-[#E8DACB] pb-2">
              <div className="flex items-center gap-1.5">
                {getDoodleIcon(activeWordIndex)}
                <span className="font-mono text-[9px] text-[#8C3E2D] font-black uppercase tracking-wider bg-[#FAF0E6] px-1.5 py-0.5 rounded border border-[#E8DACB]">
                  ENTRY #{activeWordIndex + 1}
                </span>
              </div>
              <span className="font-typewriter text-[9px] text-[#8C7A6B] font-bold">
                EDISI KHUSUS KITA
              </span>
            </div>

            {/* KONTEN ENTRI KOSAKATA DENGAN ANIMASI HALAMAN BERPUTAR */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEntry.word}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                onClick={() => handleToggleHighlight(activeWordIndex)}
                className="flex-1 flex flex-col justify-center py-2 cursor-pointer group select-none"
              >
                {/* Judul Kata dengan Efek Stabilo Kuning Halus */}
                <div className="relative inline-block mb-1">
                  {/* Lapisan Stabilo saat diketuk */}
                  <motion.div
                    animate={
                      isHighlighted
                        ? { width: "100%", opacity: 0.55 }
                        : { width: "0%", opacity: 0 }
                    }
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-y-0.5 -left-1 bg-amber-300 rounded-sm -rotate-1 pointer-events-none"
                  />
                  <h3 className="relative font-sans-ui text-xl sm:text-2xl font-black text-[#140E0A] tracking-tight">
                    {currentEntry.word}
                  </h3>
                </div>

                {/* Fonetik Pengucapan & Kelas Kata */}
                <div className="flex items-center gap-2 mb-2 font-typewriter text-[10.5px] text-[#6E5844]">
                  <span className="font-bold text-[#8C3E2D]">{currentEntry.phonetic}</span>
                  <span>•</span>
                  <span className="italic">{currentEntry.type}</span>
                </div>

                {/* Garis Pembatas Lembaran Kamus */}
                <div className="w-full h-px bg-[#EFE4D6] mb-2" />

                {/* Definisi Resmi Versi Tatwa & Adiba */}
                <p className="font-sans-ui text-xs sm:text-[13px] text-[#2C2117] font-bold leading-relaxed mb-2.5">
                  {currentEntry.definition}
                </p>

                {/* Kotak Contoh Kalimat Nyata Percakapan */}
                <div className="bg-[#FAF4EA] border-l-2 border-[#8C3E2D] p-2 rounded-r-md text-[11px] sm:text-xs font-sans-ui font-semibold text-[#4A3828] italic">
                  "{currentEntry.example}"
                </div>

                {/* Catatan Rahasia Tambahan yang Muncul saat Distabilo */}
                <AnimatePresence>
                  {isHighlighted ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2.5 bg-[#FFF9E6] border border-amber-300/80 p-2 rounded-lg text-left"
                    >
                      <p className="font-handwriting text-sm sm:text-[15px] text-[#1E3A8A] font-bold leading-snug">
                        {secretFootnotes[activeWordIndex]}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ opacity: [0.5, 0.9, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mt-2 flex items-center gap-1 text-[10px] font-sans-ui text-[#8C7A6B] font-bold"
                    >
                      <Highlighter className="w-3 h-3 text-amber-600" />
                      <span>Ketuk kartu kata untuk menstabilo & membaca catatan tersembunyi ✍️</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Bagian Bawah Lembaran: Paginasi Halaman / Tiket Jendela Kafe */}
            <div className="border-t border-[#E8DACB] pt-2 flex items-center justify-between z-20">
              {/* Tombol Halaman Sebelumnya */}
              {activeWordIndex > 0 ? (
                <button
                  onClick={handlePrevPage}
                  className="h-8 px-2.5 rounded-lg bg-[#EFE6D8] hover:bg-[#E5D7C5] text-[#3D2E1F] font-sans-ui text-[10.5px] font-black flex items-center gap-1 border border-[#D5C7B5] cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>
              ) : (
                <span className="font-typewriter text-[10px] text-[#A8947E] font-bold pl-1">
                  Halaman 01
                </span>
              )}

              {/* JIKA DI HALAMAN TERAKHIR: TIKET KAFE UNTUK MENUJU KE SEGMEN 5 */}
              {activeWordIndex === dictionary.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleProceedToFoggyGlass}
                  className="h-9 px-3.5 rounded-xl bg-gradient-to-r from-[#2B3B4E] to-[#1E293B] text-amber-200 border border-[#485E78] font-sans-ui text-xs font-black shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ke Kaca Berembun 🌧️</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-200" />
                </motion.button>
              ) : (
                /* Tombol Halaman Berikutnya */
                <button
                  onClick={handleNextPage}
                  className="h-8 px-3 rounded-lg bg-[#8C3E2D] hover:bg-[#773324] text-white font-sans-ui text-[10.5px] font-black flex items-center gap-1 border border-[#6B281A] shadow-2xs cursor-pointer"
                >
                  <span>Kata Berikutnya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. TEKS PETUNJUK ORGANIK DI BAWAH BUKU */}
      <div className="w-full max-w-[340px] flex items-center justify-center gap-1.5 text-[#5A4839] font-sans-ui text-[10.5px] font-bold mb-1 z-20">
        <Sparkles className="w-3 h-3 text-[#8C3E2D]" />
        <span>Buka lembaran kamus atau ketuk kartu untuk menstabilo memori</span>
      </div>
    </section>
  );
}
