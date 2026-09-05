"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudRain,
  Droplets,
  Wind,
  Sparkles,
  Headphones,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";

export function Segment5KacaEmbun({ onComplete }) {
  const { playSfx } = useAudio();
  const memories = scrapbookData.foggyGlass;

  // Jendela memori yang aktif saat ini (0, 1, 2)
  const [activeTab, setActiveTab] = useState(0);

  // Status bersihnya embun untuk tiap jendela
  const [clearedTabs, setClearedTabs] = useState({ 0: false, 1: false, 2: false });

  // Persentase embun yang terhapus pada jendela saat ini
  const [clearedPercent, setClearedPercent] = useState(0);

  // Status transisi uap dingin mengembun kembali (Re-Frosting)
  const [isReFrosting, setIsReFrosting] = useState(false);

  // Status transisi penyelesaian ke Segmen 6
  const [isFinishing, setIsFinishing] = useState(false);

  // Status interaksi colokan jack earphone (Kaca #3)
  const [isPluggedIn, setIsPluggedIn] = useState(false);
  const [jackDragX, setJackDragX] = useState(0);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);
  const wipeAudioCooldown = useRef(0);
  const totalWipeDistance = useRef(0);
  const lastWipeEndTime = useRef(0);

  const currentItem = memories[activeTab];
  const isCurrentCleared = !!clearedTabs[activeTab];

  // Transisi Re-Frosting: Mengalirkan uap dingin ke jendela berikutnya (HANYA via interaksi pengguna)
  const handleProceedNext = useCallback(() => {
    if (isReFrosting || isFinishing) return;

    if (activeTab + 1 < memories.length) {
      // Masih ada kaca berikutnya -> Uap dingin mengembun kembali
      setIsReFrosting(true);
      playSfx("mist-wipe");

      // Setengah jalan saat uap menutup kaca: ganti memori
      setTimeout(() => {
        totalWipeDistance.current = 0;
        setActiveTab((prev) => prev + 1);
      }, 350);

      // Selesaikan animasi uap mengembun
      setTimeout(() => {
        setIsReFrosting(false);
      }, 700);
    }
  }, [activeTab, isReFrosting, isFinishing, memories.length, playSfx]);

  // Interaksi Menancapkan Colokan Jack Audio ke Port (Kaca #3)
  const handlePlugIn = useCallback(() => {
    if (isPluggedIn || isFinishing) return;
    setIsPluggedIn(true);
    playSfx("clasp-open");

    // Efek audio desis statis radio lembut
    setTimeout(() => {
      playSfx("mist-wipe");
    }, 200);

    // Buka jendela ke Segmen 6
    setTimeout(() => {
      setIsFinishing(true);
      playSfx("paper-swoosh");
    }, 850);

    setTimeout(() => {
      onComplete();
    }, 1800);
  }, [isPluggedIn, isFinishing, onComplete, playSfx]);

  // Inisialisasi kanvas kaca berembun setiap kali berpindah tab
  const drawFog = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    for (let i = 0; i < 85; i++) {
      const rx = (Math.sin(i * 99 + activeTab * 17) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 33 + activeTab * 11) * 0.5 + 0.5) * height;
      const radius = 1.5 + (i % 3);

      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.48)";
      ctx.fill();
    }

    setClearedPercent(0);
    totalWipeDistance.current = 0;
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

  // Hitung persentase embun yang terhapus (HANYA dievaluasi saat jari diangkat)
  const checkClearedPercentage = useCallback(() => {
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
        // Hitung pixel yang sudah terhapus transparan atau semi-transparan
        if (data[i] < 120) {
          emptyPixels++;
        }
      }

      const percent = Math.round((emptyPixels / totalSampled) * 100);
      setClearedPercent(percent);

      // Cukup 10% atau jarak usap > 150px untuk membuka pesan saat jari diangkat
      const isWipedEnough = percent >= 10 || totalWipeDistance.current > 150;

      if (isWipedEnough && !clearedTabs[activeTab]) {
        playSfx("sparkle");
        setClearedTabs((prev) => ({ ...prev, [activeTab]: true }));
      }
    } catch {
      // Fallback jika getImageData gagal: gunakan total distance
      if (totalWipeDistance.current > 150 && !clearedTabs[activeTab]) {
        playSfx("sparkle");
        setClearedTabs((prev) => ({ ...prev, [activeTab]: true }));
      }
    }
  }, [activeTab, clearedTabs, playSfx]);

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
    if (isCurrentCleared || isReFrosting || isFinishing) return;
    isDrawing.current = true;
    lastPoint.current = getCanvasCoordinates(e);
    wipe(e);
  };

  const stopWiping = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPoint.current = null;
    lastWipeEndTime.current = Date.now();
    // Kaca HANYA dievaluasi ketika jari diangkat, bukan saat sedang aktif mengusap
    checkClearedPercentage();
  };

  const wipe = (e) => {
    if (!isDrawing.current || isCurrentCleared || isReFrosting || isFinishing) return;
    if (e && e.cancelable && e.type === "touchmove") {
      e.preventDefault();
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const currentPoint = getCanvasCoordinates(e);

    // Akumulasi jarak usapan jari
    if (lastPoint.current) {
      const dx = currentPoint.x - lastPoint.current.x;
      const dy = currentPoint.y - lastPoint.current.y;
      totalWipeDistance.current += Math.sqrt(dx * dx + dy * dy);
    }

    // Mainkan suara usapan kaca dengan cooldown
    const now = Date.now();
    if (now - wipeAudioCooldown.current > 180) {
      playSfx("mist-wipe");
      wipeAudioCooldown.current = now;
    }

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 48;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
    } else {
      ctx.arc(currentPoint.x, currentPoint.y, 24, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPoint.current = currentPoint;
  };

  // Ketukan pada kaca yang sudah bersih untuk beralih ke jendela berikutnya (Hanya Kaca #1 & #2)
  const handleTapGlass = () => {
    // Kaca #3 transisi HANYA lewat colokan jack earphone!
    if (activeTab === memories.length - 1) return;
    if (Date.now() - lastWipeEndTime.current < 500) return;
    if (!isCurrentCleared || isReFrosting || isFinishing) return;
    handleProceedNext();
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

          {/* Indikator Posisi Kaca Memori (Murni Visual Dots, Bukan Tombol) */}
          <div className="mt-1 flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-white/10 shadow-xs">
            <span className="font-mono text-[10px] font-black text-blue-200/80">
              Kaca 0{activeTab + 1} / 0{memories.length}
            </span>
            <div className="flex items-center gap-1 ml-1">
              {memories.map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
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

        {/* 2. BINGKAI JENDELA KACA BEREMBUN (KOKOH DI TENGAH, BEBAS GESER KARTU, RE-FROSTING TACTILE) */}
        <div
          onClick={handleTapGlass}
          className={`w-full max-w-[320px] sm:max-w-[335px] h-[375px] sm:h-[390px] relative z-10 flex flex-col items-center justify-center bg-[#1F1711] rounded-2xl p-2.5 sm:p-3 border-4 border-[#3D2E24] shadow-[0_22px_55px_rgba(0,0,0,0.85)] select-none transition-all duration-300 ${
            isCurrentCleared && activeTab < memories.length - 1
              ? "cursor-pointer ring-2 ring-amber-400/40"
              : "cursor-default"
          }`}
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
            <div className="my-auto px-2 py-3 flex flex-col items-center justify-center">
              <p className="font-handwriting text-xl sm:text-2xl text-amber-100 font-bold leading-relaxed drop-shadow-sm">
                "{currentItem.hiddenText}"
              </p>
            </div>

            {/* JIKA KACA #3 (TERAKHIR) & SUDAH BERSIH: DOCK COLOKAN AUDIO JACK INTERAKTIF */}
            {activeTab === memories.length - 1 && isCurrentCleared ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full pt-2 border-t border-white/15 flex flex-col items-center"
              >
                <div className="w-full h-12 bg-[#0F1724]/90 rounded-xl border border-amber-400/30 p-2 relative flex items-center justify-between overflow-hidden shadow-inner">
                  {/* Garis Kabel Fleksibel SVG */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <path
                      d={`M 15 24 C 40 24, ${35 + jackDragX * 0.4} ${24 + Math.sin(jackDragX * 0.1) * 6}, ${50 + jackDragX} 24`}
                      fill="none"
                      stroke="#4B5563"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Ujung Jack Audio 3.5mm yang Dapat Diseret */}
                  <div className="relative z-10 flex items-center">
                    <motion.div
                      drag={!isPluggedIn ? "x" : false}
                      dragConstraints={{ left: 0, right: 130 }}
                      dragElastic={0.08}
                      animate={isPluggedIn ? { x: 130 } : undefined}
                      onDrag={(e, info) => {
                        setJackDragX(Math.max(0, info.offset.x));
                      }}
                      onDragEnd={(e, info) => {
                        if (info.offset.x >= 85 || info.velocity.x > 120) {
                          setJackDragX(130);
                          handlePlugIn();
                        } else {
                          setJackDragX(0);
                        }
                      }}
                      className={`flex items-center cursor-grab active:cursor-grabbing select-none touch-none ${
                        isPluggedIn ? "pointer-events-none" : ""
                      }`}
                    >
                      {/* Bodi Jack Logika Logam */}
                      <div className="flex items-center shadow-md">
                        {/* Kabel strain relief */}
                        <div className="w-2.5 h-3 bg-slate-800 rounded-l-xs border-y border-l border-slate-600" />
                        {/* Bodi kuningan pegangan */}
                        <div className="px-2 py-0.5 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-xs border border-amber-400/60 flex items-center gap-1 shadow-xs">
                          <Headphones className="w-2.5 h-2.5 text-amber-200" />
                          <span className="font-mono text-[8.5px] font-black text-amber-100 uppercase tracking-tighter">
                            Audio
                          </span>
                        </div>
                        {/* Pin Colokan Jack 3.5mm Emas dengan Garis Isolator */}
                        <div className="w-5 h-2 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-400 rounded-r-xs border border-amber-500 flex items-center justify-evenly">
                          <span className="w-0.5 h-full bg-slate-900" />
                          <span className="w-0.5 h-full bg-slate-900" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Lubang Port Audio 3.5mm di Sebelah Kanan */}
                  <div className="relative z-10 flex items-center gap-1.5 mr-1">
                    <span className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-wider">
                      Port In
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isPluggedIn
                          ? "border-emerald-400 bg-emerald-950 shadow-[0_0_12px_rgba(52,211,153,0.8)] scale-105"
                          : "border-amber-400/80 bg-slate-950 shadow-[0_0_8px_rgba(251,191,36,0.3)] animate-pulse"
                      }`}
                    >
                      {/* Lubang Jack */}
                      <div
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          isPluggedIn ? "bg-emerald-400" : "bg-black"
                        }`}
                      />
                      {/* Riak Gelombang saat Dicolokkan */}
                      {isPluggedIn && (
                        <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Footer Mini Standar di Balik Kaca untuk Kaca #1 dan #2 */
              <div className="flex items-center justify-center border-t border-white/10 pt-2 text-[10px] font-sans-ui text-blue-200/60 font-medium">
                <span>Kafe Malam • Hujan Reda</span>
              </div>
            )}
          </div>

          {/* LAPISAN KANVAS KACA BEREMBUN (DAPAT DIUSAP DENGAN JARI) */}
          <canvas
            ref={canvasRef}
            onMouseDown={startWiping}
            onMouseMove={wipe}
            onMouseUp={stopWiping}
            onMouseLeave={stopWiping}
            onTouchStart={startWiping}
            onTouchMove={wipe}
            onTouchEnd={stopWiping}
            className={`absolute inset-2.5 sm:inset-3 w-[calc(100%-20px)] sm:w-[calc(100%-24px)] h-[calc(100%-20px)] sm:h-[calc(100%-24px)] rounded-xl z-20 transition-opacity duration-500 ${
              isCurrentCleared ? "pointer-events-none opacity-0" : "opacity-100 cursor-pointer"
            }`}
          />

          {/* OVERLAY UAP DINGIN MENGEMBUN KEMBALI (RE-FROSTING MIST ANIMATION) */}
          <AnimatePresence>
            {isReFrosting && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-2.5 sm:inset-3 rounded-xl bg-gradient-to-b from-[#BED3EB]/95 via-[#ACC8E8]/90 to-[#99BEDF]/95 backdrop-blur-md flex flex-col items-center justify-center z-30 pointer-events-none text-blue-950 shadow-inner px-4 text-center"
              >
                <Wind className="w-7 h-7 text-blue-700 animate-pulse mb-1.5" />
                <span className="font-sans-ui text-xs font-bold tracking-wide text-blue-950">
                  Uap dingin mengembun kembali... ❄️
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OVERLAY SELESAI MENUJU SEGMEN 6 (VOICE NOTES) */}
          <AnimatePresence>
            {isFinishing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-2xl bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-40 text-center p-5 text-white pointer-events-none"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                  <Headphones className="w-6 h-6 text-emerald-300 animate-bounce" />
                </div>
                <h4 className="font-handwriting text-2xl text-amber-200 font-black mb-1">
                  Audio Jack Terhubung 🎧
                </h4>
                <p className="font-sans-ui text-xs text-emerald-200/90 font-medium">
                  Menyalakan rekaman suara voice notes kita...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. PANDUAN INTERAKSI TUNGGAL (RINGKAS, TANGIBLE & BEBAS REDUNDANSI) */}
        <div className="w-full max-w-[325px] flex items-center justify-center z-20 pointer-events-none">
          {!isCurrentCleared ? (
            <div className="bg-[#182333]/90 border border-blue-400/30 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-blue-100 font-sans-ui text-xs font-bold text-center backdrop-blur-xs">
              <span>🌧️</span>
              <span>Usap kaca untuk menghapus embun</span>
            </div>
          ) : activeTab === memories.length - 1 ? (
            isPluggedIn ? (
              <div className="bg-[#182333]/95 border border-emerald-400/40 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-emerald-200 font-sans-ui text-xs font-bold text-center backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>Audio terhubung! Menyalakan rekaman suara...</span>
              </div>
            ) : (
              <div className="bg-[#182333]/95 border border-amber-400/40 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-amber-200 font-sans-ui text-xs font-bold text-center backdrop-blur-xs">
                <span>🎧</span>
                <span>Tarik colokan jack ke port audio di kanan ➔</span>
              </div>
            )
          ) : (
            <div className="bg-[#182333]/90 border border-blue-300/30 rounded-full px-4 py-1.5 shadow-md flex items-center justify-center gap-2 text-blue-100 font-sans-ui text-xs font-bold text-center backdrop-blur-xs">
              <span>❄️</span>
              <span>Ketuk kaca untuk memori berikutnya</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

