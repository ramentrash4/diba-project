"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioProvider, useAudio } from "@/components/audio/AudioProvider";
import { AtmosphereBackdrop } from "@/components/common/AtmosphereBackdrop";
import { DevNavigator } from "@/components/common/DevNavigator";

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
  const [unlockedSegment, setUnlockedSegment] = useState(1);
  const [isStrictLock, setIsStrictLock] = useState(false);
  const [isWhiteoutLocked, setIsWhiteoutLocked] = useState(false);

  const { startBgm, fadeOutAll, playSfx } = useAudio();

  // Transisi maju ke segmen berikutnya
  const goToNextSegment = (nextNum) => {
    if (nextNum > unlockedSegment) {
      setUnlockedSegment(nextNum);
    }
    setCurrentSegment(nextNum);
  };

  // Handler khusus Segmen 1 (Buka Kado/Amplop)
  const handlePrologComplete = () => {
    goToNextSegment(2);
  };

  // Handler akhir: Tutup Lembaran (Segmen 8)
  const handleFinalClosure = () => {
    playSfx("tape-click");
    fadeOutAll(2500);
    setIsWhiteoutLocked(true);
  };

  return (
    /* OUTER WRAPPER: Di Desktop bernuansa meja kafe kayu gelap hangat dengan sorotan lampu temaram */
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#1C1612] via-[#140F0C] to-[#0D0A08] sm:p-4 sm:py-6 overflow-hidden selection:bg-rose-200">
      
      {/* STRICT MOBILE CANVAS: Di desktop terkunci dalam frame ponsel proporsional dengan latar kertas solid */}
      <div className="w-full max-w-[412px] min-h-screen sm:min-h-[830px] sm:max-h-[92vh] sm:rounded-[38px] sm:shadow-[0_25px_90px_rgba(0,0,0,0.85),0_0_0_8px_#2B221A] relative flex flex-col justify-center overflow-hidden bg-[#FAF6EE] isolate">
        
        {/* Background Atmosfer Dinamis di dalam Frame Mobile (Bayangan Daun & Cahaya Sore) */}
        <AtmosphereBackdrop currentSegment={currentSegment} />

        {/* Konten Segmen Aktif */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`segment-${currentSegment}`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full flex-1 flex flex-col justify-center relative z-10"
          >
            {currentSegment === 1 && (
              <Segment1Prolog onComplete={handlePrologComplete} />
            )}
            {currentSegment === 2 && (
              <Segment2Soundtrack onComplete={() => goToNextSegment(3)} />
            )}
            {currentSegment === 3 && (
              <Segment3Polaroid onComplete={() => goToNextSegment(4)} />
            )}
            {currentSegment === 4 && (
              <Segment4Kamus onComplete={() => goToNextSegment(5)} />
            )}
            {currentSegment === 5 && (
              <Segment5KacaEmbun onComplete={() => goToNextSegment(6)} />
            )}
            {currentSegment === 6 && (
              <Segment6VoiceNotes onComplete={() => goToNextSegment(7)} />
            )}
            {currentSegment === 7 && (
              <Segment7Wishlist onComplete={() => goToNextSegment(8)} />
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
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 text-center select-none cursor-default pointer-events-auto"
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

      {/* Dev Segment Navigator (Mengambang di Luar Frame Mobile) */}
      {!isWhiteoutLocked && (
        <DevNavigator
          currentSegment={currentSegment}
          onSelectSegment={(num) => {
            if (isStrictLock && num > unlockedSegment) {
              alert(`Segmen ${num} masih terkunci. Selesaikan segmen sebelumnya.`);
              return;
            }
            setCurrentSegment(num);
          }}
          isStrictLock={isStrictLock}
          onToggleStrictLock={() => setIsStrictLock(!isStrictLock)}
        />
      )}
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
