"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudRain,
  Sparkles,
  Droplets,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Mic,
  Eye,
} from "lucide-react";
import { scrapbookData } from "@/data/scrapbookData";
import { useAudio } from "@/components/audio/AudioProvider";
import { WashiTape } from "@/components/common/WashiTape";

export function Segment5KacaEmbun({ onComplete }) {
  const { playSfx } = useAudio();
  const memories = scrapbookData.foggyGlass;

  // Jendela memori yang aktif saat ini (0, 1, 2)
  const [activeTab, setActiveTab] = useState(0);

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

    // Lapisan embun kaca dingin frosted tebal
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "rgba(200, 218, 240, 0.95)");
    grad.addColorStop(0.5, "rgba(180, 202, 230, 0.92)");
    grad.addColorStop(1, "rgba(160, 185, 215, 0.96)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Bintik-bintik butiran air embun dingin
    for (let i = 0; i < 70; i++) {
      const rx = (Math.sin(i * 99 + activeTab * 17) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 33 + activeTab * 11) * 0.5 + 0.5) * height;
      const radius = 1.5 + (i % 3);

      ctx.beginPath();
      ctx.arc(rx, ry, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
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

      if (percent >= 38 && !clearedTabs[activeTab]) {
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

  // Bersihkan langsung (Aksesibilitas / Fail-safe)
  const handleInstantClear = () => {
    playSfx("sparkle");
    setClearedTabs((prev) => ({ ...prev, [activeTab]: true }));
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setClearedPercent(100);
  };

  // Ganti tab hal kecil
  const handleSelectTab = (idx) => {
    playSfx("mist-wipe");
    setActiveTab(idx);
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-between items-center px-3.5 py-4 select-none relative overflow-hidden bg-gradient-to-b from-[#141B28] via-[#0E131E] to-[#080B12] text-white">
      
      {/* 1. HEADER SEGMEN: SUASANA MALAM BEREMBUN & HUJAN */}
      <div className="w-full max-w-[340px] flex flex-col items-center text-center mt-1 z-20">
        <div className="flex items-center gap-1.5 text-blue-300 font-mono text-[10px] font-black uppercase tracking-wider mb-1 bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-800/40">
          <CloudRain className="w-3.5 h-3.5 text-blue-400" />
          <span>Malam Dingin di Kafe • 14 Oktober</span>
        </div>

        <h2 className="font-handwriting text-2xl sm:text-3xl text-amber-200 font-black tracking-wide drop-shadow-md">
          Hal-hal Kecil Tentangmu ✨
        </h2>

        <p className="font-sans-ui text-[11px] text-blue-200/75 font-semibold mt-0.5">
          Usap embun di jendela kaca ini dengan jarimu...
        </p>

        {/* 3 Tab Pilihan Hal Kecil */}
        <div className="mt-2.5 flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 shadow-lg">
          {memories.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectTab(idx)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === idx
                  ? "bg-amber-400 text-slate-950 shadow-md scale-102"
                  : "text-white/70 hover:bg-white/10"
              }`}
            >
              <span>#{idx + 1}</span>
              {clearedTabs[idx] && <span className="text-[9px]">✨</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 2. BINGKAI JENDELA KACA BEREMBUN INTERAKTIF */}
      <div className="w-full max-w-[325px] sm:max-w-[340px] h-[370px] sm:h-[390px] my-auto relative z-10 flex flex-col items-center justify-center">
        
        {/* Frame Jendela Kayu Gelap Klasik */}
        <div className="w-full h-full bg-[#201812] rounded-2xl p-3 border-4 border-[#3D2E24] shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative flex flex-col justify-between overflow-hidden">
          
          {/* Siluet Tetesan Air Hujan di Luar Kaca */}
          <div className="absolute inset-0 bg-radial from-blue-900/20 via-transparent to-black/60 pointer-events-none z-0" />

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
            className={`absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] rounded-xl cursor-pointer z-20 transition-opacity duration-500 ${
              isCurrentCleared ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          />

          {/* Teks Bantuan Usap Berkedip di Atas Embun */}
          {!isCurrentCleared && (
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30 text-slate-800"
            >
              <div className="bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/50 shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                <span className="font-sans-ui text-xs font-black">
                  Usap dengan jari untuk menghapus embun 🌧️
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* 3. TOMBOL AKSI & TRANSISI KE SEGMEN 6 (VOICE NOTES) */}
      <div className="w-full max-w-[340px] flex flex-col items-center gap-2 mb-1 z-20">
        
        {/* Tombol Aksesibilitas Hapus Embun Cepat */}
        {!isCurrentCleared && (
          <button
            onClick={handleInstantClear}
            className="text-[11px] font-sans-ui text-blue-200/80 hover:text-white font-bold underline cursor-pointer"
          >
            Bersihkan embun langsung 🫧
          </button>
        )}

        {/* Jika Jendela Ini Sudah Bersih -> Tombol Lanjut ke Hal Berikutnya atau Voice Notes */}
        {isCurrentCleared && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex items-center justify-between gap-2 px-1"
          >
            {activeTab < memories.length - 1 ? (
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => handleSelectTab(activeTab + 1)}
                className="w-full h-11 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans-ui text-xs font-black shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Hal Kecil Berikutnya (#{activeTab + 2})</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              /* DI HAL KECIL TERAKHIR: TRANSISI FISIK KE SEGMEN 6 VOICE NOTES */
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-sans-ui text-xs sm:text-[13px] font-black shadow-xl flex items-center justify-center gap-2 border border-emerald-400/40 cursor-pointer"
              >
                <Mic className="w-4 h-4 text-emerald-200" />
                <span>Dengarkan Rekaman Voice Notes Kita 🎙️</span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
