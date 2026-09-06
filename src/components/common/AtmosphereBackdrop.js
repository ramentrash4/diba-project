"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AtmosphereBackdrop({ currentSegment }) {
  const isNight = currentSegment === 5 || currentSegment === 6;
  const isDusk = currentSegment === 7;
  const isMidnight = currentSegment === 8;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" style={{ contain: "strict" }}>
      {/* 1. Latar Belakang Warna Dinamis yang Menyesuaikan Cerita Setiap Segmen */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: isMidnight
            ? "radial-gradient(circle at 50% 30%, #151D2C 0%, #0A0F18 100%)"
            : isNight
            ? "radial-gradient(circle at 50% 35%, #182032 0%, #0E131E 100%)"
            : isDusk
            ? "radial-gradient(circle at 50% 40%, #283042 0%, #1A1F2B 100%)"
            : currentSegment === 4
            ? "radial-gradient(circle at 80% 20%, #FFFBF2 0%, #F5ECDD 45%, #ECDDC8 100%)"
            : "radial-gradient(circle at 85% 15%, #FFFDF5 0%, #FAF2E6 45%, #F2E4D2 100%)",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* 2. Tekstur Serat Kertas Linen Lembut Organik */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#5C4731 0.9px, transparent 0.9px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* 3. Atmosfer Siang/Sore Hangat (Segmen 1, 2, 3, 4) */}
      <AnimatePresence>
        {!isNight && !isDusk && !isMidnight && (
          <motion.div
            key="day-atmosphere"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Berkas Cahaya Matahari Sore Menggunakan Radial Gradient Berkinerja Tinggi (Bebas Lag Blur) */}
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

            {/* Bayangan Dahan Dedaunan Jendela Kafe (Segmen 1 - 3) */}
            {currentSegment <= 3 && (
              <motion.div
                className="absolute -top-4 -left-6 w-80 h-80 opacity-20 pointer-events-none"
                animate={{
                  rotate: [0, 2, 0, -1.5, 0],
                  x: [0, 4, 0, -3, 0],
                  y: [0, 2, 0, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                }}
                style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
              >
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
              </motion.div>
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

            {/* Partikel Debu Cahaya Matahari Berputar Lembut (Golden Dust Motes) - Hardware Accelerated */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`day-mote-${i}`}
                className="absolute rounded-full bg-[#D4963B]"
                style={{
                  width: `${3.5 + (i % 2) * 1.5}px`,
                  height: `${3.5 + (i % 2) * 1.5}px`,
                  top: `${15 + i * 18}%`,
                  left: `${15 + (i * 24) % 65}%`,
                  opacity: 0.28,
                  willChange: "transform, opacity",
                  transform: "translate3d(0,0,0)",
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, i % 2 === 0 ? 8 : -8, 0],
                  opacity: [0.15, 0.42, 0.15],
                  scale: [0.9, 1.12, 0.9],
                }}
                transition={{
                  duration: 5 + i * 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Efek Hujan & Malam Temaram (Segmen 5 Kaca Berembun & Segmen 6 Voice Notes) */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            key="night-ambience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
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

            {/* Titik-titik Rintik Hujan Halus di Latar Belakang (Segmen 5) */}
            {currentSegment === 5 && (
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`rain-${i}`}
                    className="absolute w-[1.5px] bg-gradient-to-b from-transparent via-cyan-200 to-transparent rounded-full"
                    style={{
                      height: `${14 + (i % 3) * 8}px`,
                      top: `${-20 + i * 14}%`,
                      left: `${8 + i * 15}%`,
                      willChange: "transform, opacity",
                      transform: "translate3d(0,0,0)",
                    }}
                    animate={{
                      y: [0, 750],
                      opacity: [0, 0.55, 0],
                    }}
                    transition={{
                      duration: 1.3 + (i % 3) * 0.4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Pendaran Bokeh Malam Hari Menggunakan Radial Gradient Halus */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`night-bokeh-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: `${24 + (i % 2) * 16}px`,
                  height: `${24 + (i % 2) * 16}px`,
                  top: `${20 + i * 16}%`,
                  left: `${15 + (i * 23) % 65}%`,
                  background: "radial-gradient(circle, rgba(255,226,189,0.35) 0%, rgba(255,226,189,0.08) 50%, transparent 75%)",
                  willChange: "transform, opacity",
                  transform: "translate3d(0,0,0)",
                }}
                animate={{
                  opacity: [0.15, 0.35, 0.15],
                  scale: [0.95, 1.15, 0.95],
                }}
                transition={{
                  duration: 4 + i * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Efek Senja Blue Hour (Segmen 7 Wishlist) */}
      <AnimatePresence>
        {isDusk && (
          <motion.div
            key="dusk-ambience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute top-[20%] right-[-10%] w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0.04) 50%, transparent 75%)",
              }}
            />
            <div
              className="absolute bottom-[20%] left-[-10%] w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(99,102,241,0.04) 50%, transparent 75%)",
              }}
            />
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`dusk-fairy-${i}`}
                className="absolute rounded-full bg-amber-200"
                style={{
                  width: "3.5px",
                  height: "3.5px",
                  top: `${18 + i * 18}%`,
                  left: `${18 + (i * 22) % 64}%`,
                  opacity: 0.35,
                  willChange: "transform, opacity",
                  transform: "translate3d(0,0,0)",
                }}
                animate={{
                  opacity: [0.2, 0.55, 0.2],
                  scale: [0.85, 1.2, 0.85],
                }}
                transition={{
                  duration: 3.5 + i * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Efek Midnight Starlight Berkah (Segmen 8 Closing) */}
      <AnimatePresence>
        {isMidnight && (
          <motion.div
            key="midnight-ambience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute top-[18%] left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(252,211,77,0.14) 0%, rgba(252,211,77,0.03) 50%, transparent 75%)",
              }}
            />
            <div
              className="absolute bottom-[10%] left-1/3 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(251,113,133,0.12) 0%, rgba(251,113,133,0.03) 50%, transparent 75%)",
              }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`starlight-${i}`}
                className="absolute rounded-full bg-[#FFF4DC]"
                style={{
                  width: `${2.5 + (i % 2)}px`,
                  height: `${2.5 + (i % 2)}px`,
                  top: `${12 + i * 15}%`,
                  left: `${10 + (i * 19) % 75}%`,
                  willChange: "transform, opacity",
                  transform: "translate3d(0,0,0)",
                }}
                animate={{
                  opacity: [0.15, 0.65, 0.15],
                  scale: [0.85, 1.25, 0.85],
                }}
                transition={{
                  duration: 3 + (i % 3) * 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
