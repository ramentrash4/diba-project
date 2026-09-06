"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment8Closing({ onFinalLock }) {
  const { playSfx } = useAudio();
  const closing = scrapbookData.closing;
  const ticket = closing.ticket;

  // Status tahapan: 'ticket' (fokus Boarding Pass) -> 'letter' (surat terbuka & ritual segel lilin)
  const [currentStage, setCurrentStage] = useState("ticket");

  // Status saat menarik lembaran surat di balik tiket
  const [isPullingLetter, setIsPullingLetter] = useState(false);
  const [letterDragY, setLetterDragY] = useState(0);

  // Status segel lilin penutup
  const [isSealed, setIsSealed] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [stampDragX, setStampDragX] = useState(0);

  // Handler membuka surat saat lembaran surat ditarik ke bawah
  const handlePullLetter = () => {
    if (currentStage === "letter") return;
    playSfx("paper-swoosh");
    setCurrentStage("letter");
  };

  // Handler ritual mengecap stempel lilin ke genangan lilin merah
  const handleSealComplete = () => {
    if (isSealed || isLocking) return;
    setIsSealed(true);
    setIsLocking(true);
    playSfx("stamp-thud");

    setTimeout(() => {
      playSfx("wax-crack");
    }, 120);

    setTimeout(() => {
      playSfx("tape-click");
    }, 280);

    setTimeout(() => {
      onFinalLock();
    }, 950);
  };

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-3 sm:px-4 py-3 select-none relative overflow-hidden my-auto text-[#1E1712]">
      {/* WRAPPER TERFOKUS TEPAT DI TENGAH OPTIKAL LAYAR DENGAN PROPORSI SEIMBANG */}
      <div className="w-full max-w-[355px] sm:max-w-[370px] flex flex-col items-center justify-center gap-2.5 my-auto z-10">
        
        {/* 1. HEADER SEGMEN: TIKET DOA & PENUTUP */}
        <div className="w-full flex flex-col items-center text-center relative z-20">
          <div className="relative inline-block mb-1">
            <WashiTape color="mustard" angle={1.5} className="absolute -top-3 left-1/2 -translate-x-1/2 scale-90" />
            <h2 className="font-handwriting text-2xl sm:text-[26px] text-[#140E0A] font-black tracking-wide pt-1 leading-tight">
              Tiket Doa & Penutup 🕊️
            </h2>
          </div>

          <p className="font-typewriter text-[11px] text-[#5A4839] font-bold">
            Untuk lembaran barumu di masa depan.
          </p>
        </div>

        {/* 2. ARTEFAK KONTEN BERTAHAP (TIKET -> SURAT) */}
        <div className="w-full relative min-h-[360px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {currentStage === "ticket" ? (
              <motion.div
                key="stage-ticket"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -35, scale: 0.96, transition: { duration: 0.35, ease: "easeInOut" } }}
                className="w-full flex flex-col items-center"
              >
                {/* WADAH TIKET & LEMBARAN SURAT NYATA YANG TERSELIP DI BELAKANGNYA */}
                <div className="w-full relative flex flex-col items-center">
                  
                  {/* KARTU BOARDING PASS UTAMA (DI DEPAN) */}
                  <motion.div
                    animate={
                      isPullingLetter
                        ? { y: -12, scale: 0.985, opacity: 0.92 }
                        : { y: 0, scale: 1, opacity: 1 }
                    }
                    transition={{ duration: 0.2 }}
                    className="w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#D8C7B0] shadow-xl relative overflow-hidden paper-shadow z-20"
                  >
                    {/* Tepian Atas Bergerigi Tanda Bekas Sobekan Perforasi dari Segmen 7 */}
                    <div className="w-full h-2.5 bg-[#702B1E] flex items-center justify-between px-2 overflow-hidden">
                      <div className="w-full border-t-2 border-dashed border-amber-200/40" />
                    </div>

                    {/* Header Maskapai First Class */}
                    <div className="bg-gradient-to-r from-[#8C3E2D] via-[#9B3A28] to-[#6E2E1F] text-white px-3.5 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-amber-300 rotate-45" />
                        <span className="font-mono text-[9px] font-black tracking-widest uppercase text-amber-200">
                          BOARDING PASS • FIRST CLASS
                        </span>
                      </div>
                      <span className="font-mono text-[8.5px] text-amber-100 font-bold bg-black/25 px-1.5 py-0.5 rounded">
                        {ticket.flightNo}
                      </span>
                    </div>

                    {/* Badan Tiket Utama */}
                    <div className="p-3.5 sm:p-4 text-left space-y-2.5 relative bg-[#FFFDF8]">
                      {/* Nama Penumpang */}
                      <div>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                          PASSENGER NAME
                        </span>
                        <span className="font-sans-ui text-sm sm:text-[15px] font-black text-[#140E0A] leading-tight">
                          {ticket.passenger}
                        </span>
                      </div>

                      {/* Rute Penerbangan: PILKOM 25 -> MASA DEPAN BAHAGIA */}
                      <div className="grid grid-cols-2 gap-2 bg-[#F9F3EA] p-2.5 rounded-xl border border-[#EADBBD]">
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                            DEPARTURE
                          </span>
                          <span className="font-sans-ui text-xs font-black text-[#8C3E2D] leading-tight">
                            PILKOM '25
                          </span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                            DESTINATION
                          </span>
                          <span className="font-sans-ui text-xs font-black text-[#1B4D3E] leading-tight">
                            Masa Depan Bahagia ✨
                          </span>
                        </div>
                      </div>

                      {/* Kursi & Status Tiket */}
                      <div className="flex items-center justify-between pt-0.5">
                        <div>
                          <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                            SEAT NO.
                          </span>
                          <span className="font-sans-ui text-[11.5px] font-black text-[#140E0A]">
                            {ticket.seat}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C7A6B] font-bold block">
                            STATUS
                          </span>
                          <span className="font-mono text-[9.5px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            {ticket.validity}
                          </span>
                        </div>
                      </div>

                      {/* Barcode Garis Simbolis */}
                      <div className="border-t border-dashed border-[#D5C7B5] pt-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-0.5 h-3.5 text-[#8C7A6B] font-mono text-[10.5px] tracking-tighter select-none">
                          || | |||| | || |||| | ||| || ||| | ||||
                        </div>
                        <span className="font-mono text-[8px] text-[#A8947E] font-bold uppercase tracking-wider">
                          NO EXPIRATION DATE
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* LEMBARAN SURAT LENGKAP YANG TERSELIP NYATA DI BALIK TIKET (DRAGGABLE Y) */}
                  <motion.div
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 120 }}
                    dragElastic={0.16}
                    dragSnapToOrigin
                    onDragStart={() => setIsPullingLetter(true)}
                    onDrag={(e, info) => {
                      setLetterDragY(Math.max(0, info.offset.y));
                    }}
                    onDragEnd={(e, info) => {
                      setIsPullingLetter(false);
                      if (info.offset.y > 40 || info.velocity.y > 100) {
                        handlePullLetter();
                      } else {
                        setLetterDragY(0);
                      }
                    }}
                    whileHover={{ y: 3 }}
                    className="w-[94%] -mt-6 bg-[#FEFDF9] rounded-b-2xl border-x-2 border-b-2 border-[#E5D7C3] shadow-lg relative z-10 pt-8 pb-3 px-3 cursor-grab active:cursor-grabbing select-none touch-none paper-shadow group hover:shadow-xl transition-shadow"
                  >
                    {/* Cuplikan Fisik Lembaran Surat Tulisan Tangan Tatwa */}
                    <div
                      onClick={handlePullLetter}
                      className="w-full border-t border-dashed border-[#8C6D4F]/35 pt-1.5 flex flex-col items-center text-center cursor-pointer"
                    >
                      <div className="w-full px-2.5 py-1.5 bg-[#FAF6EE] rounded-xl border border-[#EADBBD] text-left hover:border-[#8C3E2D]/50 transition-colors">
                        <div className="flex items-center justify-between pb-1 border-b border-[#F0E6CE]">
                          <div className="flex items-center gap-1.5 text-[#8C3E2D]">
                            <Mail className="w-3.5 h-3.5" />
                            <span className="font-typewriter text-[9.5px] font-bold uppercase tracking-wider">
                              Surat Terakhir dari Tatwa
                            </span>
                          </div>
                          <span className="font-mono text-[8px] text-[#A8947E]">Terselip di balik tiket</span>
                        </div>
                        {/* Teks tulisan tangan asli yang mengintip di balik tiket */}
                        <p className="font-handwriting text-xs sm:text-[13px] text-[#1E1712]/85 font-bold italic line-clamp-2 mt-1 leading-snug">
                          "{typeof closing.letter === "object" ? closing.letter.previewText || closing.letter.greeting : closing.letter.slice(0, 80)}..."
                        </p>
                      </div>

                      {/* Petunjuk Tarik / Ketuk Lembaran Surat */}
                      <div className="mt-2 flex items-center justify-center gap-1.5 text-[#8C3E2D] font-sans-ui text-[11px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#8C2318] animate-ping" />
                        <span>Tarik atau ketuk surat ini ke bawah</span>
                        <span className="text-amber-600 animate-bounce">⬇️</span>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            ) : (
              <motion.div
                key="stage-letter"
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
                className="w-full flex flex-col items-center"
              >
                {/* SURAT TULISAN TANGAN TERAKHIR TATWA (DESAIN ERGONOMIS & MUAT DI MOBILE) */}
                <div className="w-full bg-[#FFFDF8] rounded-2xl border-2 border-[#EADBBD] shadow-2xl text-left relative paper-shadow flex flex-col overflow-hidden">
                  {/* Washi tape sudut kanan */}
                  <WashiTape color="rose" angle={-2} className="absolute -top-2.5 right-6 z-20 pointer-events-none scale-90" />

                  {/* Header Surat (Fixed di Puncak Lembaran Kertas) */}
                  <div className="flex items-center justify-between border-b border-[#F0E6CE] px-4 pt-3.5 pb-2 bg-[#FFFDF8] z-10">
                    <div className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#8C3E2D] fill-current" />
                      <span className="font-typewriter text-[10px] sm:text-[10.5px] font-black text-[#8C3E2D] uppercase tracking-wider">
                        Surat Terakhir & Doa ✍️
                      </span>
                    </div>
                    <span className="font-mono text-[8.5px] text-[#8C7A6B] font-bold bg-[#8C5D1E]/10 px-2 py-0.5 rounded-full border border-[#8C5D1E]/20">
                      Untuk Adiba
                    </span>
                  </div>

                  {/* Area Isi Surat yang Dapat Di-scroll Halus (Preserving Intimacy & No Overflow) */}
                  <div className="max-h-[320px] sm:max-h-[350px] overflow-y-auto px-4 py-3 space-y-3 relative text-left scrollbar-thin scrollbar-thumb-[#D8C2A7]/60">
                    
                    {/* Pembuka / Sapaan Hangat */}
                    <div className="space-y-0.5 pb-1">
                      <h3 className="font-handwriting text-2xl text-[#8C2318] font-black leading-tight">
                        Haiii lagiii... Cantikkkk
                      </h3>
                      <p className="font-handwriting text-[15px] sm:text-[16px] text-[#1E1712] font-bold leading-snug">
                        Lucu yaaa perjalananyaaa...
                      </p>
                      <p className="font-handwriting text-[14px] sm:text-[15px] text-[#5A4839] font-bold leading-snug">
                        Okeeee dari semuaaa itu ada 2 kata terakhir dari akuuu dibb
                      </p>
                    </div>

                    {/* BUTIR 1: MAKASIH */}
                    <div className="bg-[#FAF5ED] rounded-xl p-3 border border-[#EADBBD] shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8C2318]" />
                        <h4 className="font-handwriting text-lg text-[#8C2318] font-black">
                          1. Makasih
                        </h4>
                      </div>
                      <p className="font-sans-ui text-xs sm:text-[12.5px] text-[#2D2319] leading-relaxed font-medium pl-3.5">
                        makasihhh atas semuaa kesempatan yg kamu kasih buat akuu, makasih atas waktu kamu pada saat kita masih barenggg, makasih atas hati kamuuu yg pada saat itu tulus di dekat akuuu dan aku rasakan ituuu🤍
                      </p>
                    </div>

                    {/* BUTIR 2: MAAF */}
                    <div className="bg-[#FAF5ED] rounded-xl p-3 border border-[#EADBBD] shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8C2318]" />
                        <h4 className="font-handwriting text-lg text-[#8C2318] font-black">
                          2. Maaf
                        </h4>
                      </div>
                      <p className="font-sans-ui text-xs sm:text-[12.5px] text-[#2D2319] leading-relaxed font-medium pl-3.5">
                        Maafin awa dib atas segala sifattt kekanak kanakn nyaaa😔, maafin awa kalo kerjaannya mengeluh ke kamu dan ngeluarin sifat² clingy yg mungkin menyebalkan bagi kamuu🤕 dan maafin Tatwaaa yg terkadang tiba tiba serius membahas hubungann padahal waktunya ga tepattt.
                      </p>
                      <p className="font-handwriting text-sm text-[#7A5524] font-bold italic pt-1 pl-3.5">
                        Oiyaaa satu kata lagi nih ya tambahan hehe... 🙃
                      </p>
                    </div>

                    {/* BUTIR 3: TOLONG */}
                    <div className="bg-[#FAF5ED] rounded-xl p-3 border border-[#EADBBD] shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8C2318]" />
                        <h4 className="font-handwriting text-lg text-[#8C2318] font-black">
                          3. Tolong
                        </h4>
                      </div>
                      <p className="font-sans-ui text-xs sm:text-[12.5px] text-[#2D2319] leading-relaxed font-medium pl-3.5">
                        Tolonggg jangan lupain aku ya adibaa, aku tauu temen kamu banyakkk... irpan, dipdut, bpkb, naju, ara, key, musang², bestie telkom dll, tapi please sisain sedikit ruang dihati kamuuu untuk akuu entah apapun itu statusnyaaa... aku masih sanggup dengerin omelan kamu tentang dunia kemakom dan perkuliahan aku masih sanggup dimintain anter jemput dimanapun itu dan aku masih sanggup nemenin makan kamuu...
                      </p>
                      <div className="border-t border-[#EADBBD]/80 pt-1.5 pl-3.5 space-y-1">
                        <p className="font-sans-ui text-[11.5px] text-[#7A5524] italic font-medium">
                          Dah ah panjang² kaya bikin puisi ajee...
                        </p>
                        <p className="font-sans-ui text-xs sm:text-[12.5px] text-[#140E0A] font-semibold leading-relaxed">
                          Akuuu selalu berharap kamu dikelilingi orang² baik orang² tulus, orang² yg membahagiakan kamuuu... meskipun sekarang aku udah gada di dalamnya... 🫶🏼
                        </p>
                      </div>
                    </div>

                    {/* KUTIPAN SPESIAL BAHASA INGGRIS DUKUNPOLBAN */}
                    <div className="bg-[#FAF6EE] rounded-xl p-3 border border-[#D8C7B0] border-l-4 border-l-[#8C2318] shadow-2xs text-left my-2 relative">
                      <p className="font-serif italic text-xs sm:text-[12px] text-[#2D2118] leading-relaxed">
                        "I'll love you forever, with all my heart. i still remember the feeling i got when i first started talking to you, i was so excited, i don't even know how to tell you how much you mean to me, I'm so glad youre mine, i love you more than anything in this world, i can't believe i was able to find my love and best friend at the same, i love you so deeply, and I'l love you forever With all my heart.."
                      </p>
                      <span className="font-handwriting text-[15px] sm:text-[16px] font-black text-[#8C2318] block text-right mt-1.5">
                        -DukunPolban
                      </span>
                    </div>

                    {/* Doa Kelancaran Kuliah di Pilkom 25 */}
                    <div className="border-t border-[#F0E6CE] pt-2">
                      <p className="font-handwriting text-[14.5px] sm:text-[15.5px] text-[#1E3A8A] font-bold leading-relaxed">
                        "{closing.prayer}"
                      </p>
                    </div>

                    {/* Tanda Tangan Penutup */}
                    <div className="text-right pt-1 pb-1">
                      <span className="font-handwriting text-xl sm:text-2xl text-[#140E0A] font-black block">
                        {closing.finalSignoff}
                      </span>
                    </div>
                  </div>

                  {/* ======================================================== */}
                  {/* RITUAL TUTUP LEMBARAN: DOCK STEMPEL LILIN VINTAGE REALISTIS */}
                  {/* ======================================================== */}
                  <div className="border-t-2 border-dashed border-[#E0D3C1] pt-2 pb-2 px-3 bg-[#FAF6EE] z-10">
                    <div className="w-full h-17 bg-[#F4EDE2] rounded-xl border border-[#D8C7B0] px-3 py-1 relative flex items-center justify-between overflow-hidden shadow-inner">
                      
                      {/* GAGANG STEMPEL LILIN KUNINGAN ANTIK (DRAGGABLE X & TAP FRIENDLY) */}
                      <motion.div
                        drag={!isSealed ? "x" : false}
                        dragConstraints={{ left: 0, right: 180 }}
                        dragElastic={0.08}
                        dragSnapToOrigin={!isSealed}
                        onDrag={(e, info) => {
                          setStampDragX(info.offset.x);
                        }}
                        onDragEnd={(e, info) => {
                          if (info.offset.x > 85 || info.velocity.x > 130) {
                            handleSealComplete();
                          }
                        }}
                        onClick={handleSealComplete}
                        animate={isSealed ? { x: 180, opacity: 0, transition: { delay: 0.35, duration: 0.3 } } : undefined}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-30 cursor-grab active:cursor-grabbing touch-none select-none flex items-center gap-1.5"
                      >
                        {/* SVG Stempel Kuningan Antik dengan Pegangan Kayu Mahoni Realistis */}
                        <div className="relative filter drop-shadow-md">
                          <svg viewBox="0 0 54 68" className="w-10 h-14">
                            <defs>
                              <linearGradient id="stampWood" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2A140A" />
                                <stop offset="25%" stopColor="#5E331A" />
                                <stop offset="55%" stopColor="#8C4E2C" />
                                <stop offset="85%" stopColor="#542E18" />
                                <stop offset="100%" stopColor="#220F06" />
                              </linearGradient>
                              <linearGradient id="stampBrass" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#7A560E" />
                                <stop offset="30%" stopColor="#D4AF37" />
                                <stop offset="60%" stopColor="#FFF3B0" />
                                <stop offset="85%" stopColor="#B89125" />
                                <stop offset="100%" stopColor="#5C3F08" />
                              </linearGradient>
                            </defs>
                            {/* Pegangan Kayu Bubut Antik */}
                            <path d="M22 4 C22 1, 32 1, 32 4 C32 9, 30 14, 30 22 C33 29, 36 34, 36 39 C36 43, 18 43, 18 39 C18 34, 21 29, 24 22 C24 14, 22 9, 22 4 Z" fill="url(#stampWood)" />
                            {/* Cincin Logam Kuningan */}
                            <rect x="16" y="43" width="22" height="5" rx="1.5" fill="url(#stampBrass)" />
                            <rect x="18" y="48" width="18" height="2" fill="#5C3F08" />
                            {/* Pelat Matriks Stempel Kuningan Bawah */}
                            <path d="M12 50 C12 49, 42 49, 42 50 L44 60 C44 62, 10 62, 10 60 Z" fill="url(#stampBrass)" />
                            <ellipse cx="27" cy="61" rx="17" ry="4" fill="#B89125" stroke="#5C3F08" strokeWidth="0.8" />
                          </svg>
                        </div>

                        {/* Tag Label Stempel */}
                        {!isSealed && (
                          <div className="flex flex-col text-left">
                            <span className="font-mono text-[8px] uppercase tracking-wider text-[#8C6D4F] font-black">
                              STEMPEL LILIN
                            </span>
                            <span className="font-mono text-[9px] text-[#8C3E2D] font-black flex items-center gap-0.5">
                              <span>Seret</span>
                              <span className="text-amber-600 animate-pulse">➔</span>
                            </span>
                          </div>
                        )}
                      </motion.div>

                      {/* TRACK PANDUAN TITIK-TITIK KE LILIN */}
                      <div className="absolute inset-x-24 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 opacity-45 pointer-events-none">
                        <span className="text-[11px] text-[#8C6D4F] tracking-widest">• • • • •</span>
                      </div>

                      {/* BULATAN LILIN CAIR & PITA SUTRA MERAH (ATAU SEGEL EMAS TERSTEMPEL) */}
                      <div className="relative z-20 flex items-center justify-center pr-1">
                        {!isSealed ? (
                          /* 1. Genangan Lilin Merah Hangat & Pita Sutra (Sebelum Dicap) */
                          <div className="relative flex items-center justify-center">
                            {/* Pita Sutra Merah dengan Ujung Ekor Burung */}
                            <div className="w-14 h-4 bg-gradient-to-r from-[#8C1814] via-[#A8241E] to-[#73120E] -rotate-12 absolute -z-10 shadow-sm rounded-xs" />
                            
                            {/* Genangan Lilin Cair Organik Realistis */}
                            <svg viewBox="0 0 60 60" className="w-13 h-13 filter drop-shadow">
                              <defs>
                                <radialGradient id="meltedWax" cx="45%" cy="40%" r="55%">
                                  <stop offset="0%" stopColor="#C92A20" />
                                  <stop offset="60%" stopColor="#8C1814" />
                                  <stop offset="100%" stopColor="#4A0805" />
                                </radialGradient>
                              </defs>
                              {/* Tetesan Lelehan Lilin Alami */}
                              <path
                                d="M30 8 C40 7, 51 13, 53 23 C55 33, 49 44, 41 50 C33 56, 21 54, 14 47 C6 40, 7 29, 12 19 C17 9, 21 9, 30 8 Z"
                                fill="url(#meltedWax)"
                              />
                              {/* Pantulan Cahaya di Permukaan Cair */}
                              <path d="M22 15 C30 12, 40 13, 44 18 C39 17, 27 16, 20 20 Z" fill="white" opacity="0.4" />
                              {/* Target Lingkaran Tekanan Stempel */}
                              <circle cx="30" cy="30" r="13" fill="none" stroke="#FFA726" strokeDasharray="3 3" opacity="0.65" />
                            </svg>
                          </div>
                        ) : (
                          /* 2. Cap Segel Lilin Bangsawan 3D Embossed (Setelah Dicap) */
                          <motion.div
                            initial={{ scale: 0.2, rotate: -20, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 380, damping: 14 }}
                            className="relative flex items-center justify-center filter drop-shadow-lg"
                          >
                            {/* Pita Sutra Merah */}
                            <div className="w-16 h-4 bg-gradient-to-r from-[#73120E] via-[#8C1814] to-[#590C09] -rotate-12 absolute -z-10 shadow-md rounded-xs" />

                            {/* Segel Lilin 3D Hasil Stempel */}
                            <svg viewBox="0 0 68 68" className="w-14 h-14">
                              <defs>
                                <radialGradient id="stampedWax" cx="40%" cy="35%" r="60%">
                                  <stop offset="0%" stopColor="#B3241C" />
                                  <stop offset="55%" stopColor="#801511" />
                                  <stop offset="100%" stopColor="#4A0805" />
                                </radialGradient>
                                <linearGradient id="goldEmboss" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FFF3B0" />
                                  <stop offset="50%" stopColor="#D4AF37" />
                                  <stop offset="100%" stopColor="#8A6818" />
                                </linearGradient>
                              </defs>
                              
                              {/* Pinggiran Lilin Tertekan Organik */}
                              <path
                                d="M34 5 C47 4, 61 12, 63 25 C65 38, 59 52, 47 60 C35 68, 20 66, 11 56 C2 46, 3 31, 9 19 C15 7, 21 6, 34 5 Z"
                                fill="url(#stampedWax)"
                              />
                              {/* Cincin Lingkaran Cekung Bekas Tekanan Stempel */}
                              <circle cx="34" cy="34" r="20" fill="#6A100C" stroke="#A92620" strokeWidth="2" />
                              <circle cx="34" cy="34" r="16.5" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="1.5 2" opacity="0.8" />
                              
                              {/* Relief Burung Merpati Pembawa Doa 🕊️ & Monogram T & A Bersepuh Emas */}
                              <g fill="url(#goldEmboss)" stroke="#6A4E0E" strokeWidth="0.3">
                                {/* Siluet Burung Merpati */}
                                <path d="M34 24 C32 27, 27 28, 24 26 C25 30, 29 32, 31 33 C28 35, 25 37, 26 40 C29 39, 32 37, 34 35 C36 37, 39 39, 42 40 C43 37, 40 35, 37 33 C39 32, 43 30, 44 26 C41 28, 36 27, 34 24 Z" />
                                <circle cx="34" cy="25" r="1.8" />
                                {/* Monogram T & A */}
                                <text x="34" y="44" textAnchor="middle" fontSize="5.5" fontFamily="Georgia, serif" fontWeight="bold" fill="#FFE082" letterSpacing="0.8">
                                  T &amp; A
                                </text>
                              </g>
                              {/* Highlight pantulan cahaya atas */}
                              <path d="M20 20 A 18 18 0 0 1 48 20" fill="none" stroke="white" strokeWidth="1" opacity="0.45" strokeLinecap="round" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. PANDUAN SENTUH TUNGGAL (DYNAMIC & RINGKAS) */}
        <div className="w-full max-w-[350px] flex items-center justify-center z-20 pointer-events-none mt-1">
          {currentStage === "ticket" ? (
            <div className="bg-[#1C1612]/85 border border-[#8C6D4F]/35 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-100 font-sans-ui text-[10.5px] sm:text-[11px] font-medium text-center backdrop-blur-xs">
              <span>💌</span>
              <span>Tarik atau ketuk surat di balik tiket untuk membaca</span>
            </div>
          ) : !isSealed ? (
            <div className="bg-[#1C1612]/85 border border-[#8C6D4F]/35 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-100 font-sans-ui text-[10.5px] sm:text-[11px] font-medium text-center backdrop-blur-xs">
              <span>🕯️</span>
              <span>Geser atau ketuk stempel kuningan untuk menyegel ➔</span>
            </div>
          ) : (
            <div className="bg-[#1C1612]/90 border border-amber-400/40 rounded-full px-3.5 py-1.5 shadow-xs flex items-center justify-center gap-1.5 text-amber-200 font-sans-ui text-[10.5px] sm:text-[11px] font-bold text-center backdrop-blur-xs animate-pulse">
              <span>✨</span>
              <span>Lembaran tersegel abadi... Menutup kenangan.</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
