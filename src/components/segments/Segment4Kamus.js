"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
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

  // Status apakah cover buku saku telah dibuka
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  // Status animasi membuka cover dalam 3D
  const [isOpeningCover, setIsOpeningCover] = useState(false);

  // Halaman kata yang sedang dibuka (0, 1, 2)
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  // Arah membalik lembaran ('next' | 'prev') untuk 3D page turn
  const [turnDirection, setTurnDirection] = useState("next");

  // Status apakah kata saat ini telah distabilo
  const [highlightedWords, setHighlightedWords] = useState({});

  // Ref untuk mendeteksi apakah sedang melakukan swipe / drag agar tidak memicu stabilo
  const isDraggingRef = useRef(false);

  // Catatan rahasia tambahan dari Tatwa untuk setiap entri saat distabilo
  const secretFootnotes = [
    "Catatan Tatwa: Tapi anehnya, kalau ditanya lagi 5 menit kemudian langsung ngaku kalau sebenarnya lagi pengen jajan es krim atau seblak pedas. 🍨",
    "Catatan Tatwa: Jangan pernah ragu sama kemampuanmu di Pilkom 25 ya Diba. Kamu jauh lebih cerdas dan gigih dari yang kamu kira. Laptopnya jangan dipeluk tidur! 💻",
    "Catatan Tatwa: Nada bicaramu pas bilang 'Dih!' itu khas banget. Salah satu ekspresi yang paling sering bikin kangen suasana waktu itu. ✨",
  ];

  // Efek coretan stabilo saat kartu diketuk (hanya jika tidak sedang dragging)
  const handleToggleHighlight = (idx) => {
    if (isDraggingRef.current) return;
    playSfx("pencil-scratch");
    setHighlightedWords((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  // Handler membuka cover buku saku dengan gestur kancing geser
  const handleOpenCover = () => {
    if (isOpeningCover) return;
    setIsOpeningCover(true);
    playSfx("clasp-open");

    setTimeout(() => {
      playSfx("page-turn");
    }, 140);

    setTimeout(() => {
      setIsCoverOpen(true);
      setIsOpeningCover(false);
    }, 600);
  };

  // Navigasi fisik membalik lembaran kata ke depan (3D Page Turn)
  const handleFlipNext = () => {
    if (activeWordIndex + 1 < dictionary.length) {
      playSfx("page-turn");
      setTurnDirection("next");
      setActiveWordIndex((prev) => prev + 1);
    } else {
      // Halaman terakhir (Kata 3) dibalik -> bertransisi ke Segmen 5 (Kaca Berembun)
      playSfx("page-turn");
      setTurnDirection("next");
      setTimeout(() => {
        playSfx("paper-swoosh");
        onComplete();
      }, 350);
    }
  };

  // Navigasi fisik membalik lembaran kata ke belakang (3D Page Turn)
  const handleFlipPrev = () => {
    if (activeWordIndex > 0) {
      playSfx("page-turn");
      setTurnDirection("prev");
      setActiveWordIndex((prev) => prev - 1);
    }
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

  // Varian animasi membalik lembaran kertas fisik 3D mengitari tulang buku di sebelah kiri
  const pageFlipVariants = {
    enter: (dir) => ({
      rotateY: dir === "next" ? 75 : -75,
      opacity: 0,
      filter: "brightness(0.92)",
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      filter: "brightness(1)",
      transition: {
        duration: 0.42,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      rotateY: dir === "next" ? -85 : 85,
      opacity: [1, 0.7, 0],
      filter: "brightness(0.72)",
      transition: {
        duration: 0.36,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-4 py-2 sm:py-3 select-none relative overflow-hidden my-auto">
      {/* WRAPPER TENGAH LAYAR TERFOKUS: Merapatkan elemen agar seimbang secara visual di tengah */}
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center gap-2.5 sm:gap-3 my-auto">
        
        {/* 1. HEADER SEGMEN: JUDUL BUKU SAKU & INDIKATOR LEMBARAN (BEBAS TOMBOL) */}
        <div className="w-full flex flex-col items-center text-center z-20">
          <div className="relative inline-block mb-1">
            <WashiTape color="mustard" angle={-1} className="absolute -top-3 left-1/2 -translate-x-1/2" />
            <h2 className="font-handwriting text-2xl sm:text-3xl text-[#140E0A] font-black tracking-wide pt-1">
              Kamus Bahasa Kita 📖
            </h2>
          </div>

          {/* Indikator Posisi Lembaran (Murni Visual, Tanpa Tombol) */}
          {isCoverOpen ? (
            <div className="mt-1 flex items-center gap-1.5 bg-[#EFE4D6]/90 px-3 py-1 rounded-full border border-[#D5C7B5] shadow-2xs">
              <span className="font-mono text-[10px] font-black text-[#6E5844]">
                Lembaran 0{activeWordIndex + 1} / 0{dictionary.length}
              </span>
              <div className="flex items-center gap-1 ml-1">
                {dictionary.map((_, i) => (
                  <div
                    key={`indicator-${i}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeWordIndex
                        ? "bg-[#8C3E2D] w-3"
                        : i < activeWordIndex
                        ? "bg-[#A8947E] w-1.5"
                        : "bg-[#D5C7B5] w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <span className="font-mono text-[9.5px] text-[#8C3E2D] font-black uppercase tracking-wider bg-[#FAF0E6] px-2.5 py-0.5 rounded-full border border-[#E8DACB]">
              Buku Saku Rahasia • Pilkom 25
            </span>
          )}
        </div>

        {/* 2. BUKU SAKU FISIK REALISTIS (3D PERSPECTIVE CONTAINER) */}
        <div
          className="w-full max-w-[320px] sm:max-w-[335px] h-[375px] sm:h-[390px] relative z-10"
          style={{ perspective: "1200px" }}
        >
          {/* Bodi Buku Kulit Luar (Cover Leather Border & Stack) */}
          <div className="w-full h-full bg-[#422C1D] rounded-2xl p-2.5 sm:p-3 border-2 border-[#5E402B] shadow-[0_22px_55px_rgba(0,0,0,0.55)] relative flex flex-col justify-between overflow-hidden paper-shadow">
            
            {/* Tulang Buku Kiri (Spine Accent) */}
            <div className="absolute left-2.5 top-0 bottom-0 w-2.5 bg-black/35 border-r border-[#6B4931]/60 z-10" />

            {/* Pita Pembatas Buku Merah Menggantung di Atas */}
            <div className="absolute top-0 right-10 w-3.5 h-7 bg-[#A83226] shadow-sm rounded-b-xs pointer-events-none z-30" />

            {/* LEMBARAN KERTAS DALAM BUKU SAKU BERGARIS (SUDAH STANDBY DI BAWAH COVER) */}
            <div
              className="w-full h-full bg-[#FFFDF8] rounded-xl ml-1 p-3.5 sm:p-4 border border-[#D5C7B5] shadow-inner flex flex-col justify-between relative overflow-hidden text-left"
              style={{ perspective: "1000px" }}
            >
              {/* Header Lembaran: Edisi Kamus & Stempel */}
              <div className="flex items-center justify-between border-b border-[#E8DACB] pb-1.5 z-10">
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

              {/* KONTEN ENTRI KOSAKATA DENGAN ANIMASI MEMBALIK LEMBARAN KERTAS 3D MURNI & SWIPE (ZERO BUTTONS) */}
              <div className="flex-1 relative flex flex-col justify-center overflow-hidden py-1">
                <AnimatePresence mode="wait" custom={turnDirection}>
                  <motion.div
                    key={currentEntry.word}
                    custom={turnDirection}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    style={{
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                    }}
                    drag={isCoverOpen ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.35}
                    onDragStart={() => {
                      isDraggingRef.current = true;
                    }}
                    onDragEnd={(e, info) => {
                      setTimeout(() => {
                        isDraggingRef.current = false;
                      }, 100);

                      if (info.offset.x < -35 || info.velocity.x < -120) {
                        handleFlipNext();
                      } else if (info.offset.x > 35 || info.velocity.x > 120) {
                        handleFlipPrev();
                      }
                    }}
                    onClick={() => handleToggleHighlight(activeWordIndex)}
                    className="w-full h-full flex flex-col justify-center cursor-pointer select-none relative"
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
                      <h3 className="relative font-sans-ui text-lg sm:text-xl font-black text-[#140E0A] tracking-tight">
                        {currentEntry.word}
                      </h3>
                    </div>

                    {/* Fonetik Pengucapan & Kelas Kata */}
                    <div className="flex items-center gap-1.5 mb-1.5 font-typewriter text-[10px] text-[#6E5844]">
                      <span className="font-bold text-[#8C3E2D]">{currentEntry.phonetic}</span>
                      <span>•</span>
                      <span className="italic">{currentEntry.type}</span>
                    </div>

                    {/* Garis Pembatas Lembaran Kamus */}
                    <div className="w-full h-px bg-[#EFE4D6] mb-1.5" />

                    {/* Definisi Resmi Versi Tatwa & Adiba */}
                    <p className="font-sans-ui text-[11.5px] sm:text-xs text-[#2C2117] font-bold leading-relaxed mb-2">
                      {currentEntry.definition}
                    </p>

                    {/* Kotak Contoh Kalimat Nyata Percakapan */}
                    <div className="bg-[#FAF4EA] border-l-2 border-[#8C3E2D] p-1.5 rounded-r-md text-[10.5px] sm:text-[11px] font-sans-ui font-semibold text-[#4A3828] italic">
                      "{currentEntry.example}"
                    </div>

                    {/* Catatan Rahasia Tambahan yang Muncul saat Distabilo */}
                    <AnimatePresence>
                      {isHighlighted ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 bg-[#FFF9E6] border border-amber-300/80 p-2 rounded-lg text-left shadow-2xs"
                        >
                          <p className="font-handwriting text-[13px] sm:text-[14px] text-[#1E3A8A] font-bold leading-snug">
                            {secretFootnotes[activeWordIndex]}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ opacity: [0.55, 0.95, 0.55] }}
                          transition={{ repeat: Infinity, duration: 2.2 }}
                          className="mt-2 flex items-center gap-1 text-[9.5px] font-sans-ui text-[#8C7A6B] font-bold"
                        >
                          <Highlighter className="w-3 h-3 text-amber-600" />
                          <span>Ketuk teks untuk menstabilo catatan rahasia ✍️</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Affordance Sudut Lembaran Kertas Terlipat (Dog-Ear Corner) di Pojok Kanan Bawah */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 overflow-hidden pointer-events-none opacity-85">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#EAE0D3] via-[#DACBC0] to-[#BFAFA0] -rotate-45 transform origin-bottom-right shadow-sm border-t border-l border-[#AFA08E]/70" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bagian Bawah Lembaran: Posisi Halaman (Murni Teks, Tanpa Tombol Apapun) */}
              <div className="border-t border-[#E8DACB] pt-1.5 flex items-center justify-between z-10">
                <span className="font-typewriter text-[9px] text-[#A8947E] font-bold">
                  Halaman 0{activeWordIndex + 1} dari 0{dictionary.length}
                </span>

                {/* Petunjuk Arah Lembaran Halus */}
                <span className="font-mono text-[8.5px] text-[#8C6D53] font-semibold flex items-center gap-1">
                  <span>👈 Geser lembaran</span>
                </span>
              </div>
            </div>

            {/* 3. COVER DEPAN BUKU SAKU KULIT FISIK (BERPUTAR MEMBUKA 3D SAAT KANCING DIBUKA) */}
            <AnimatePresence>
              {!isCoverOpen && (
                <motion.div
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotate: 0, rotateY: 0, scale: 1 }}
                  animate={
                    isOpeningCover
                      ? {
                          rotate: 0,
                          rotateY: -140,
                          opacity: [1, 1, 0.25, 0],
                          scale: 1.02,
                          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                        }
                      : {
                          rotate: 0,
                          rotateY: 0,
                          scale: 1,
                          opacity: 1,
                        }
                  }
                  exit={{ opacity: 0, display: "none" }}
                  className="absolute inset-0 bg-gradient-to-b from-[#4A3222] via-[#3B2516] to-[#2B190D] rounded-2xl p-4 sm:p-5 border-4 border-[#6E4B33] shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between paper-shadow select-none z-40"
                >
                  {/* Tekstur Jahitan Buku Kulit (Stitching) */}
                  <div className="absolute inset-2 rounded-xl border border-dashed border-[#8C6549]/50 pointer-events-none z-10" />

                  {/* Tulang Buku Kiri (Spine) */}
                  <div className="absolute left-3.5 top-0 bottom-0 w-3 bg-black/25 border-r border-[#6E4B33] z-10" />

                  {/* Pita Pembatas Buku Merah Terjulur Lurus di Bawah */}
                  <div className="absolute -bottom-5 right-8 w-4 h-8 bg-[#A83226] shadow-md rounded-b-xs pointer-events-none z-30 flex items-end justify-center pb-1">
                    <div className="w-2 h-2 border-b-2 border-r-2 border-[#FFE8E8]/70 transform rotate-45 mb-0.5" />
                  </div>

                  {/* Bagian Atas Sampul: Stempel Emas Pos */}
                  <div className="flex items-center justify-between pl-4 z-10">
                    <span className="font-mono text-[9px] text-[#F3D39B] font-black uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded border border-[#C59F60]/40">
                      LIMITED EDITION • 01/01
                    </span>
                    <BookOpen className="w-4 h-4 text-[#F3D39B]" />
                  </div>

                  {/* Bagian Tengah Sampul: Judul Emboss Emas Mewah */}
                  <div className="text-center pl-4 my-auto z-10 space-y-1">
                    <span className="font-typewriter text-[10.5px] uppercase tracking-widest text-[#D4AF7A] font-black block">
                      Buku Saku
                    </span>
                    <h3 className="font-handwriting text-3xl sm:text-4xl text-[#FFF6E5] font-black tracking-wide leading-tight drop-shadow-md">
                      Kamus Bahasa Kita 📖
                    </h3>
                    <p className="font-sans-ui text-[11px] text-[#D8C2A7] font-bold leading-relaxed pt-1 max-w-[220px] mx-auto">
                      Hanya kita berdua yang tahu arti setiap kata di dalamnya.
                    </p>
                  </div>

                  {/* Tali Pengunci dengan Kancing Kuningan Geser Fisik (Satu-satunya elemen yang dapat di-drag) */}
                  <div className="w-full flex flex-col items-center pl-4 z-20">
                    <div className="w-full max-w-[240px] h-11 bg-black/45 rounded-full p-1 border border-[#8C6D1F]/60 shadow-inner relative flex items-center justify-between">
                      {/* Label Jalur Geser Kancing */}
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-[#D4AF7A]/85 font-black tracking-wider pointer-events-none pl-6">
                        Geser Kancing ➔
                      </span>

                      {/* Kancing Kuningan Fisik yang Dapat Di-drag ke Kanan */}
                      <motion.div
                        drag={isOpeningCover ? false : "x"}
                        dragConstraints={{ left: 0, right: 140 }}
                        dragElastic={0.15}
                        dragSnapToOrigin={!isOpeningCover}
                        onDragEnd={(e, info) => {
                          if (info.offset.x > 50 || info.velocity.x > 140) {
                            handleOpenCover();
                          }
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA771C] border-2 border-white/70 shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center z-30"
                      >
                        <div className="w-3.5 h-3.5 rounded-full bg-[#3D2513] border border-white/70 shadow-inner flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 3. PANDUAN INTERAKSI FISIK TUNGGAL (RINGKAS, TANGIBLE & NON-REDUNDAN) */}
        <div className="w-full max-w-[325px] flex items-center justify-center z-20 pointer-events-none">
          {!isCoverOpen ? (
            <div className="bg-[#EFE4D6]/95 border border-[#D5C7B5] rounded-full px-4 py-2 shadow-2xs flex items-center justify-center gap-2 text-[#3A281A] font-sans-ui text-[11px] sm:text-[11.5px] font-bold text-center">
              <span>🔓</span>
              <span>Geser kancing ke kanan untuk membuka kamus</span>
            </div>
          ) : activeWordIndex === dictionary.length - 1 ? (
            <div className="bg-[#EFE4D6]/95 border border-[#D5C7B5] rounded-full px-3.5 py-1.5 shadow-2xs flex items-center justify-center gap-2 text-[#3A281A] font-sans-ui text-[10px] sm:text-[10.5px] font-bold text-center">
              <span>👆 Ketuk untuk stabilo</span>
              <span className="text-[#B5A38E]">•</span>
              <span className="text-[#8C3E2D] font-black">👈 Geser lembaran terakhir untuk ke jendela kafe 🌧️</span>
            </div>
          ) : (
            <div className="bg-[#EFE4D6]/95 border border-[#D5C7B5] rounded-full px-3.5 py-1.5 shadow-2xs flex items-center justify-center gap-2 text-[#3A281A] font-sans-ui text-[10.5px] sm:text-[11px] font-bold text-center">
              <span>👆 Ketuk untuk stabilo</span>
              <span className="text-[#B5A38E]">•</span>
              <span>👈 Geser lembaran untuk kata berikutnya</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
