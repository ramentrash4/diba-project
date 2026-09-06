"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";
import { AtmosphereBackdrop } from "@/components/common/AtmosphereBackdrop";

import { Segment1Prolog } from "@/components/segments/Segment1Prolog";
import { Segment2Soundtrack } from "@/components/segments/Segment2Soundtrack";
import { Segment3Polaroid } from "@/components/segments/Segment3Polaroid";
import { Segment4Kamus } from "@/components/segments/Segment4Kamus";
import { Segment5KacaEmbun } from "@/components/segments/Segment5KacaEmbun";
import { Segment6VoiceNotes } from "@/components/segments/Segment6VoiceNotes";
import { Segment7Wishlist } from "@/components/segments/Segment7Wishlist";
import { Segment8Closing } from "@/components/segments/Segment8Closing";

function ScrapbookApp() {
  const [currentSegment, setCurrentSegment] = useState(1);
  const [prevSegment, setPrevSegment] = useState(1);
  const [unlockedSegment, setUnlockedSegment] = useState(1);
  const [isWhiteoutLocked, setIsWhiteoutLocked] = useState(false);

  const { startBgm, fadeOutAll, playSfx, pauseTrack } = useAudio();

  // Transisi maju ke segmen berikutnya
  const goToNextSegment = (nextNum, isMorph = false) => {
    if (!isMorph) {
      playSfx("page-turn");
    }
    // Hentikan foreground audio (lagu mixtape / VN) saat berpindah segmen
    if (currentSegment !== nextNum) {
      pauseTrack();
    }
    setPrevSegment(currentSegment);
    if (nextNum > unlockedSegment) {
      setUnlockedSegment(nextNum);
    }
    setCurrentSegment(nextNum);
  };

  // Handler khusus Segmen 1 ke Segmen 2 (Morphing Alami tanpa rotasi buku)
  const handlePrologComplete = () => {
    goToNextSegment(2, true);
  };

  // Handler akhir: Tutup Lembaran (Segmen 8)
  const handleFinalClosure = () => {
    playSfx("tape-click");
    fadeOutAll(2500);
    setIsWhiteoutLocked(true);
  };

  const isDirectPaperTransition =
    (prevSegment === 6 && currentSegment === 7);

  const isDirectBoardingPassTransition =
    (prevSegment === 7 && currentSegment === 8);

  const isDirectSeamlessTransition =
    isDirectPaperTransition || isDirectBoardingPassTransition;

  const isMorphTransition =
    isDirectSeamlessTransition ||
    (prevSegment === 1 && currentSegment === 2) ||
    (prevSegment === 2 && currentSegment === 1) ||
    (prevSegment === 2 && currentSegment === 3) ||
    (prevSegment === 3 && currentSegment === 2) ||
    (prevSegment === 3 && currentSegment === 4) ||
    (prevSegment === 4 && currentSegment === 3);

  return (
    /* OUTER WRAPPER: Di Desktop bernuansa meja kafe kayu gelap hangat dengan sorotan lampu temaram */
    <div className="w-full h-[100dvh] max-h-[100dvh] flex justify-center items-center bg-gradient-to-b from-[#1C1612] via-[#140F0C] to-[#0D0A08] sm:p-4 sm:py-6 overflow-hidden selection:bg-rose-200 fixed inset-0 sm:static sm:h-screen">
      
      {/* STRICT MOBILE CANVAS: Di desktop terkunci dalam frame ponsel proporsional dengan latar kertas solid */}
      <div
        className="w-full max-w-[412px] h-[100dvh] max-h-[100dvh] sm:h-[min(840px,92vh)] sm:max-h-[92vh] sm:rounded-[38px] sm:shadow-[0_25px_90px_rgba(0,0,0,0.85),0_0_0_8px_#2B221A] relative flex flex-col justify-center overflow-hidden bg-[#FAF6EE] isolate"
        style={{ perspective: "1200px" }}
      >
        
        {/* Background Atmosfer Dinamis di dalam Frame Mobile (Bayangan Daun & Cahaya Sore) */}
        <AtmosphereBackdrop currentSegment={currentSegment} />

        {/* KONTEN SEGMEN AKTIF DENGAN TRANSISI ELEGAN TERAKSELERASI HARDWARE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`segment-${currentSegment}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.985,
              transition: {
                duration: 0.18,
                ease: "easeOut",
              },
            }}
            className="w-full h-full flex-1 flex flex-col justify-center items-center relative z-10 origin-center overflow-hidden"
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          >
            {currentSegment === 1 && (
              <Segment1Prolog onComplete={handlePrologComplete} />
            )}
            {currentSegment === 2 && (
              <Segment2Soundtrack onComplete={() => goToNextSegment(3, true)} />
            )}
            {currentSegment === 3 && (
              <Segment3Polaroid onComplete={() => goToNextSegment(4, true)} />
            )}
            {currentSegment === 4 && (
              <Segment4Kamus onComplete={() => goToNextSegment(5)} />
            )}
            {currentSegment === 5 && (
              <Segment5KacaEmbun onComplete={() => goToNextSegment(6)} />
            )}
            {currentSegment === 6 && (
              <Segment6VoiceNotes onComplete={() => goToNextSegment(7, true)} />
            )}
            {currentSegment === 7 && (
              <Segment7Wishlist onComplete={() => goToNextSegment(8, true)} />
            )}
            {currentSegment === 8 && (
              <Segment8Closing onFinalLock={handleFinalClosure} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Overlay Putih Mutlak Penutup Lembaran (Whiteout Closure) */}
        <AnimatePresence>
          {isWhiteoutLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 bg-[#FFFDF9] flex items-center justify-center z-50 text-center px-6"
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 1.5, ease: "easeOut" }}
                className="font-handwriting text-3xl sm:text-4xl text-[#140E0A] tracking-wide font-bold"
              >
                Berbahagialah. — Tatwa
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <AudioProvider>
      <ScrapbookApp />
    </AudioProvider>
  );
}
