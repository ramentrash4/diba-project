"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AtmosphereBackdrop({ currentSegment }) {
  // Hanya Segmen 5 (Kaca Berembun) dan Segmen 6 (Voice Notes Chat) yang bernuansa malam (dark mode)
  // Segmen 7 (Wishlist Kertas) dan Segmen 8 (Tiket Doa & Surat) KEMBALI PENUH KE LIGHT MODE (kertas linen hangat)
  const isNight = currentSegment === 5 || currentSegment === 6;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ contain: "strict" }}>
      {/* 1. Latar Belakang Warna Dinamis yang Menyesuaikan Cerita Setiap Segmen */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isNight
            ? "radial-gradient(circle at 50% 35%, #182032 0%, #0E131E 100%)"
            : currentSegment === 7
            ? "radial-gradient(circle at 85% 20%, #FFFDF8 0%, #FAF3E6 50%, #F1E5D3 100%)"
            : currentSegment === 8
            ? "radial-gradient(circle at 50% 20%, #FFFDF8 0%, #FAF1E8 45%, #EFE1D2 100%)"
            : currentSegment === 4
            ? "radial-gradient(circle at 80% 20%, #FFFBF2 0%, #F5ECDD 45%, #ECDDC8 100%)"
            : "radial-gradient(circle at 85% 15%, #FFFDF5 0%, #FAF2E6 45%, #F2E4D2 100%)",
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* 2. Tekstur Serat Kertas Linen Lembut Organik */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#5C4731 0.9px, transparent 0.9px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* 3. Atmosfer Siang/Sore Hangat (Light Mode: Segmen 1, 2, 3, 4, 7, 8) */}
      <AnimatePresence>
        {!isNight && (
          <motion.div
            key="day-atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Berkas Cahaya Matahari Sore Hangat (Radial Gradient Hardware Accelerated) */}
            <div
              className="absolute -top-16 -right-16 w-[380px] h-[380px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,231,168,0.45) 0%, rgba(252,211,133,0.18) 40%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-1/3 -left-20 w-[320px] h-[320px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(232,180,184,0.25) 0%, rgba(232,180,184,0.06) 45%, transparent 70%)",
              }}
            />

            {/* Bayangan Dahan Dedaunan Jendela Kafe (Segmen 1 - 3) - Murni CSS Compositor */}
            {currentSegment <= 3 && (
              <div className="absolute -top-4 -left-6 w-80 h-80 opacity-20 pointer-events-none anim-leaf-sway">
                <svg viewBox="0 0 240 240" fill="#423120" className="w-full h-full opacity-85">
                  <path d="M10,20 Q60,70 110,110 Q160,150 220,180 Q160,165 110,125 Q60,85 10,20 Z" />
                  <path d="M50,55 Q95,45 140,25 Q125,60 80,75 Z" />
                  <circle cx="140" cy="25" r="14" />
                  <circle cx="115" cy="40" r="18" />
                  <path d="M90,95 Q145,85 185,65 Q160,105 115,115 Z" />
                  <circle cx="185" cy="65" r="16" />
                  <circle cx="150" cy="85" r="20" />
                  <path d="M130,125 Q180,130 215,110 Q185,150 145,150 Z" />
                  <circle cx="215" cy="110" r="18" />
                  <circle cx="175" cy="135" r="22" />
                  <path d="M70,75 Q40,115 25,160 Q55,130 85,100 Z" />
                  <circle cx="25" cy="160" r="15" />
                  <circle cx="45" cy="130" r="17" />
                </svg>
              </div>
            )}

            {/* Sorot Lampu Baca Meja Kayu (Segmen 4 Kamus) */}
            {currentSegment === 4 && (
              <div
                className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(253,230,138,0.22) 0%, rgba(253,230,138,0.06) 45%, transparent 75%)",
                }}
              />
            )}

            {/* Partikel Debu Cahaya Matahari (Golden Dust Motes) - Murni CSS Keyframes (0% JS CPU) */}
            <div
              className="absolute rounded-full bg-[#D4963B] anim-mote-1 pointer-events-none"
              style={{ width: "4px", height: "4px", top: "18%", left: "20%" }}
            />
            <div
              className="absolute rounded-full bg-[#D4963B] anim-mote-2 pointer-events-none"
              style={{ width: "3px", height: "3px", top: "38%", left: "65%" }}
            />
            <div
              className="absolute rounded-full bg-[#D4963B] anim-mote-3 pointer-events-none"
              style={{ width: "5px", height: "5px", top: "58%", left: "28%" }}
            />
            <div
              className="absolute rounded-full bg-[#D4963B] anim-mote-4 pointer-events-none"
              style={{ width: "3.5px", height: "3.5px", top: "75%", left: "70%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Efek Hujan & Malam Temaram (Khusus Segmen 5 Kaca Berembun & Segmen 6 Voice Notes) */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            key="night-ambience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Sorotan Lampu Hangat Meja Kafe Bebas Lag Blur */}
            <div
              className="absolute top-[26%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,170,90,0.24) 0%, rgba(255,170,90,0.08) 45%, transparent 75%)",
              }}
            />
            <div
              className="absolute top-[65%] left-1/3 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(59,91,136,0.25) 0%, rgba(59,91,136,0.06) 45%, transparent 75%)",
              }}
            />

            {/* Titik-titik Rintik Hujan Halus di Latar Belakang (Segmen 5) - Murni CSS Keyframes */}
            {currentSegment === 5 && (
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <div
                  className="absolute w-[1.5px] h-4 bg-gradient-to-b from-transparent via-cyan-200 to-transparent rounded-full anim-rain-1"
                  style={{ top: "-10%", left: "15%" }}
                />
                <div
                  className="absolute w-[1.5px] h-5 bg-gradient-to-b from-transparent via-cyan-200 to-transparent rounded-full anim-rain-2"
                  style={{ top: "-15%", left: "45%" }}
                />
                <div
                  className="absolute w-[1.5px] h-3.5 bg-gradient-to-b from-transparent via-cyan-200 to-transparent rounded-full anim-rain-3"
                  style={{ top: "-5%", left: "75%" }}
                />
              </div>
            )}

            {/* Pendaran Bokeh Malam Hari Menggunakan Radial Gradient Halus - Murni CSS */}
            <div
              className="absolute rounded-full pointer-events-none anim-bokeh-1"
              style={{
                width: "36px",
                height: "36px",
                top: "22%",
                left: "18%",
                background: "radial-gradient(circle, rgba(255,226,189,0.35) 0%, rgba(255,226,189,0.08) 50%, transparent 75%)",
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none anim-bokeh-2"
              style={{
                width: "48px",
                height: "48px",
                top: "55%",
                left: "62%",
                background: "radial-gradient(circle, rgba(255,226,189,0.35) 0%, rgba(255,226,189,0.08) 50%, transparent 75%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
