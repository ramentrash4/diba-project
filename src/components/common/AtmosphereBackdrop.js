"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AtmosphereBackdrop({ currentSegment }) {
  const isNight = currentSegment === 5 || currentSegment === 6;
  const isDusk = currentSegment === 7;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Latar Belakang Warna Dinamis yang Cerah, Hangat, & Bernuansa Kertas Linen Alami */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isNight
            ? "radial-gradient(circle at 50% 35%, #182032 0%, #0E131E 100%)"
            : isDusk
            ? "radial-gradient(circle at 50% 40%, #2E3647 0%, #1E2330 100%)"
            : "radial-gradient(circle at 85% 15%, #FFFDF5 0%, #FAF2E6 45%, #F2E4D2 100%)",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* 2. Tekstur Serat Kertas Linen Lembut */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#5C4731 0.9px, transparent 0.9px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* 3. Efek Siang Hari Sore (Warm Sunlight & Siluet Bayangan Daun Jendela yang Terlihat Jelas) */}
      <AnimatePresence>
        {!isNight && !isDusk && (
          <motion.div
            key="day-atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Berkas Cahaya Matahari Sore dari Kanan Atas (Visible Warm Sunbeam) */}
            <div className="absolute -top-12 -right-12 w-96 h-96 rounded-full bg-gradient-to-br from-[#FFE7A8]/50 via-[#FCD385]/25 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-[#E8B4B8]/30 to-transparent blur-3xl pointer-events-none" />

            {/* Bayangan Dahan Dedaunan Jendela Kafe yang Jelas Terlihat & Bergoyang Halus */}
            <motion.div
              className="absolute -top-4 -left-6 w-80 h-80 opacity-20 pointer-events-none"
              animate={{
                rotate: [0, 2, 0, -1.5, 0],
                x: [0, 5, 0, -3, 0],
                y: [0, 3, 0, -2, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 240 240" fill="#423120" className="w-full h-full filter blur-[1px]">
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
            </motion.div>

            {/* Partikel Debu Cahaya Matahari Berputar Lembut (Golden Dust Motes) */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`mote-${i}`}
                className="absolute rounded-full bg-[#D4963B]"
                style={{
                  width: `${4 + (i % 3) * 2.5}px`,
                  height: `${4 + (i % 3) * 2.5}px`,
                  top: `${10 + i * 11}%`,
                  left: `${8 + (i * 15) % 84}%`,
                  opacity: 0.3,
                  filter: "blur(0.5px)",
                }}
                animate={{
                  y: [0, -26, 0],
                  x: [0, (i % 2 === 0 ? 12 : -12), 0],
                  opacity: [0.15, 0.5, 0.15],
                  scale: [0.9, 1.2, 0.9],
                }}
                transition={{
                  duration: 4.5 + i * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Efek Malam Temaram: Sorot Lampu Belajar Hangat & Bokeh (Segmen 5 & 6) */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            key="night-ambience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#FFAA5A]/20 blur-[90px]" />
            <div className="absolute top-[68%] left-1/3 w-72 h-72 rounded-full bg-[#3B5B88]/20 blur-[85px]" />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`bokeh-${i}`}
                className="absolute rounded-full bg-[#FFE2BD] blur-[10px]"
                style={{
                  width: `${22 + (i % 3) * 16}px`,
                  height: `${22 + (i % 3) * 16}px`,
                  top: `${18 + i * 14}%`,
                  left: `${12 + (i * 19) % 76}%`,
                  opacity: 0.25,
                }}
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [0.95, 1.15, 0.95],
                }}
                transition={{
                  duration: 3.5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
