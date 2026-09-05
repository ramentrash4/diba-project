"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudRain,
  Sparkles,
  Droplets,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";

export function Segment5KacaEmbun({ onComplete }) {
  const { playSfx } = useAudio();
  const memories = scrapbookData.foggyGlass;

  // Jendela memori yang aktif saat ini (0, 1, 2)
  const [activeTab, setActiveTab] = useState(0);

  // Arah perpindahan jendela ('next' | 'prev') untuk animasi geser
  const [slideDirection, setSlideDirection] = useState("next");

  // Status bersihnya embun untuk tiap jendela
  const [clearedTabs, setClearedTabs] = useState({ 0: false, 1: false, 2: false });

  // Persentase embun yang terhapus pada jendela saat ini
  const [clearedPercent, setClearedPercent] = useState(0);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);
  const wipeAudioCooldown = useRef(0);

  const currentItem = memories[activeTab];
  const isCurrentCleared = !!clearedTabs[activeTab];

  // Inisialisasi kanvas kaca berembun setiap kali berpindah tab
  const drawFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset transformasi dan ukuran
    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // Lapisan embun kaca dingin frosted tebal bernuansa malam kafe
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "rgba(205, 222, 242, 0.96)");
    grad.addColorStop(0.5, "rgba(182, 204, 232, 0.93)");
    grad.addColorStop(1, "rgba(162, 187, 218, 0.97)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Butiran-butiran air embun dingin realistis
    for (let i = 0; i < 75; i++) {
      const rx = (Math.sin(i * 99 + activeTab * 17) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 33 + activeTab * 11) * 0.5 + 0.5) * height;
      const radius = 1.5 + (i % 3);

      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fill();
    }

    setClearedPercent(0);
  }, [activeTab]);

  useEffect(() => {
    // Ukuran kanvas disesuaikan dengan pixel density
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(2, 2);
      drawFog();
    }
  }, [activeTab, drawFog]);

  // Hitung persentase embun yang terhapus
  const checkClearedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const sampleStep = 8;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let emptyPixels = 0;
      let totalSampled = 0;

      for (let i = 3; i < data.length; i += 4 * sampleStep) {
        totalSampled++;
        if (data[i] === 0) {
          emptyPixels++;
        }
      }

      const percent = Math.round((emptyPixels / totalSampled) * 100);
      setClearedPercent(percent);

      if (percent >= 35 && !clearedTabs[activeTab]) {
        playSfx("sparkle");
        setClearedTabs((prev) => ({ ...prev, [activeTab]: true }));
      }
    } catch {
      // Abaikan jika ada issue read pixel di browser tertentu
    }
  };

  // Logika mengusap kaca (Scratch / Wiper)
  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startWiping = (e) => {
    isDrawing.current = true;
    lastPoint.current = getCanvasCoordinates(e);
    wipe(e);
  };

  const stopWiping = () => {
    isDrawing.current = false;
    lastPoint.current = null;
    checkClearedPercentage();
  };

  const wipe = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPoint = getCanvasCoordinates(e);

    // Mainkan suara usapan kaca dengan cooldown
    const now = Date.now();
    if (now - wipeAudioCooldown.current > 180) {
      playSfx("mist-wipe");
      wipeAudioCooldown.current = now;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 46;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
    } else {
      ctx.arc(currentPoint.x, currentPoint.y, 23, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPoint.current = currentPoint;
  };

  // Navigasi geser kaca ke hal kecil berikutnya (Zero Buttons)
  const handleNextWindow = () => {
    if (activeTab + 1 < memories.length) {
      playSfx("mist-wipe");
      setSlideDirection("next");
      setActiveTab((prev) => prev + 1);
    } else {
      // Pada kaca terakhir, geser mengalirkan transisi ke Segmen 6 (Voice Notes)
      playSfx("paper-swoosh");
      onComplete();
    }
  };

  // Navigasi geser kaca ke hal kecil sebelumnya
  const handlePrevWindow = () => {
    if (activeTab > 0) {
      playSfx("mist-wipe");
      setSlideDirection("prev");
      setActiveTab((prev) => prev - 1);
    }
  };

  // Varian animasi pergantian jendela kaca
  const windowVariants = {
    enter: (dir) => ({
      x: dir === "next" ? 60 : -60,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      x: dir === "next" ? -60 : 60,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.28,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center px-4 py-2 sm:py-3 select-none relative overflow-hidden my-auto bg-gradient-to-b from-[#121A27] via-[#0D131E] to-[#070A10] text-white">
      {/* WRAPPER TENGAH LAYAR TERFOKUS: Merapatkan elemen agar seimbang secara visual di tengah */}
      <div className="w-full max-w-[340px] flex flex-col items-center justify-center gap-2.5 sm:gap-3 my-auto">
        
        {/* 1. HEADER SEGMEN: SUASANA MALAM DINGIN & INDIKATOR JENDELA (MURNI VISUAL, BEBAS TOMBOL) */}
        <div className="w-full flex flex-col items-center text-center z-20">
          <div className="flex items-center gap-1.5 text-blue-300 font-mono text-[9.5px] font-black uppercase tracking-wider mb-1 bg-blue-950/70 px-2.5 py-0.5 rounded-full border border-blue-800/40 shadow-xs">
            <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            <span>Malam Dingin di Kafe • 14 Oktober</span>
          </div>

          <h2 className="font-handwriting text-2xl sm:text-3xl text-amber-200 font-black tracking-wide drop-shadow-md">
            Hal-hal Kecil Tentangmu ✨
          </h2>

          {/* Indikator Posisi Jendela Kaca (Murni Visual Dots, Bukan Tombol) */}
          <div className="mt-1 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 shadow-xs">
            <span className="font-mono text-[10px] font-black text-blue-200/80">
              Kaca 0{activeTab + 1} / 0{memories.length}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {memories.map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === activeTab
                      ? "bg-amber-400 w-3"
                      : clearedTabs[i]
                      ? "bg-blue-400 w-1.5"
                      : "bg-white/20 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. BINGKAI JENDELA KACA BEREMBUN INTERAKTIF DENGAN DUKUNGAN SWIPE (ZERO BUTTONS) */}
        <div className="w-full max-w-[320px] sm:max-w-[335px] h-[375px] sm:h-[390px] relative z-10 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={`window-${activeTab}`}
              custom={slideDirection}
              variants={windowVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag={isCurrentCleared ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.35}
              onDragEnd={(e, info) => {
                if (info.offset.x < -35 || info.velocity.x < -120) {
                  handleNextWindow();
                } else if (info.offset.x > 35 || info.velocity.x > 120) {
                  handlePrevWindow();
                }
              }}
              className="w-full h-full bg-[#1F1711] rounded-2xl p-2.5 sm:p-3 border-4 border-[#3D2E24] shadow-[0_22px_55px_rgba(0,0,0,0.85)] relative flex flex-col justify-between overflow-hidden cursor-default select-none"
            >
              {/* Siluet Tetesan Air Hujan di Luar Kaca */}
              <div className="absolute inset-0 bg-radial from-blue-900/25 via-transparent to-black/60 pointer-events-none z-0" />

              {/* KONTEN TERSEMBUNYI DI BALIK KACA (TEKS MEMORI TULISAN TANGAN) */}
              <div className="w-full h-full bg-gradient-to-b from-[#1C2536] to-[#0F1622] rounded-xl p-4 sm:p-5 border border-white/15 flex flex-col justify-between text-center relative overflow-hidden z-10">
                {/* Header Mini di Balik Kaca */}
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[9px] text-amber-300 font-bold uppercase tracking-wider">
                    {currentItem.title}
                  </span>
                  <Droplets className="w-3.5 h-3.5 text-blue-300/80" />
                </div>

                {/* Pesan Manis yang Tersingkap */}
                <div className="my-auto px-1 py-3 flex flex-col items-center justify-center">
                  <p className="font-handwriting text-xl sm:text-2xl text-amber-100 font-bold leading-relaxed drop-shadow-sm">
                    "{currentItem.hiddenText}"
                  </p>
                  <span className="font-sans-ui text-[10.5px] text-amber-300/80 font-bold mt-2">
                    — Hal sederhana yang paling berkesan.
                  </span>
                </div>

                {/* Footer Mini di Balik Kaca */}
                <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9.5px] font-mono text-white/50">
                  <span>PILKOM 25 MEMORY</span>
                  <span>TATWA ARCHIVE</span>
                </div>
              </div>

              {/* LAPISAN CANVAS KACA BEREMBUN (DAPAT DIUSAP DENGAN JARI) */}
              <canvas
                ref={canvasRef}
                onMouseDown={startWiping}
                onMouseMove={wipe}
                onMouseUp={stopWiping}
                onMouseLeave={stopWiping}
                onTouchStart={startWiping}
                onTouchMove={wipe}
                onTouchEnd={stopWiping}
                className={`absolute inset-2.5 sm:inset-3 w-[calc(100%-20px)] sm:w-[calc(100%-24px)] h-[calc(100%-20px)] sm:h-[calc(100%-24px)] rounded-xl cursor-pointer z-20 transition-opacity duration-500 ${
                  isCurrentCleared ? "pointer-events-none opacity-0" : "opacity-100"
                }`}
              />

              {/* Teks Bantuan Usap Berkedip di Atas Embun */}
              {!isCurrentCleared && (
                <motion.div
                  animate={{ opacity: [0.65, 1, 0.65] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 text-slate-800"
                >
                  <div className="bg-white/85 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/50 shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                    <span className="font-sans-ui text-xs font-black">
                      Usap dengan jari untuk menghapus embun 🌧️
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Petunjuk Geser di Sudut Kanan Bawah saat Kaca Sudah Bersih */}
              {isCurrentCleared && (
                <div className="absolute bottom-4 right-4 pointer-events-none z-30 flex items-center gap-1 text-[9.5px] font-mono text-amber-300/80 bg-black/50 px-2 py-0.5 rounded-md border border-amber-400/20">
                  <span>👈 Geser kaca</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. PANDUAN INTERAKSI FISIK TUNGGAL (RINGKAS, TANGIBLE & BEBAS TOMBOL) */}
        <div className="w-full max-w-[325px] flex items-center justify-center z-20 pointer-events-none">
          {!isCurrentCleared ? (
            <div className="bg-[#182333]/90 border border-blue-400/30 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-blue-100 font-sans-ui text-[11px] font-bold text-center backdrop-blur-xs">
              <span>🌧️</span>
              <span>Usap kaca dengan jari untuk menghapus embun</span>
            </div>
          ) : activeTab === memories.length - 1 ? (
            <div className="bg-[#182333]/95 border border-amber-400/40 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-amber-200 font-sans-ui text-[10.5px] sm:text-[11px] font-bold text-center backdrop-blur-xs">
              <span>✨</span>
              <span className="font-black">👈 Geser kaca terakhir untuk dengarkan rekaman suara 🎙️</span>
            </div>
          ) : (
            <div className="bg-[#182333]/90 border border-blue-300/30 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-blue-100 font-sans-ui text-[10.5px] sm:text-[11px] font-bold text-center backdrop-blur-xs">
              <span>✨ Kaca bersih!</span>
              <span className="text-blue-300/40">•</span>
              <span>👈 Geser kaca ke kiri untuk hal berikutnya</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
