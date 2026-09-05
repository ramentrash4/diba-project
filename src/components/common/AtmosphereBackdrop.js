"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AtmosphereBackdrop({ currentSegment }) {
  const isNight = currentSegment === 5 || currentSegment === 6;
  const isDusk = currentSegment === 7;

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* 1. Latar Belakang Warna Dinamis yang Mulus */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: isNight
            ? "#121724"
            : isDusk
            ? "#262C3A"
            : "#FAF6EE",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* 2. Tekstur Kertas Linen Halus */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#2C2621 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* 3. Sorotan Pendaran Cahaya Matahari Sore (Warm Sunbeam / Vignette) */}
      <AnimatePresence>
        {!isNight && !isDusk && (
          <motion.div
            key="day-sunbeam"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Pendaran emas lembut di sudut atas */}
            <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-br from-[#FDE8B3]/50 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-[#E8B4B8]/25 to-transparent blur-3xl pointer-events-none" />

            {/* Bayangan Dahan Dedaunan Jendela Kafe yang Bergoyang Lembut (Botanical Window Shadow) */}
            <motion.div
              className="absolute -top-6 -left-8 w-64 h-64 opacity-[0.07] pointer-events-none"
              animate={{
                rotate: [0, 1.5, 0, -1, 0],
                x: [0, 4, 0, -3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 9,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 200 200" fill="#2C2621" className="w-full h-full">
                <path d="M40,20 Q60,60 100,80 Q140,100 180,110 Q140,115 100,100 Q60,85 40,20 Z" />
                <path d="M70,45 Q110,40 140,25 Q125,50 90,60 Z" />
                <path d="M100,75 Q145,70 175,55 Q155,85 120,95 Z" />
                <path d="M125,100 Q170,105 195,90 Q170,120 140,125 Z" />
                <path d="M50,70 Q90,95 120,130 Q90,120 60,95 Z" />
              </svg>
            </motion.div>

            {/* Partikel Debu Cahaya Melayang (Floating Warm Dust Motes) */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`mote-${i}`}
                className="absolute rounded-full bg-[#C99052] opacity-25 blur-[0.5px]"
                style={{
                  width: `${4 + (i % 3) * 2.5}px`,
                  height: `${4 + (i % 3) * 2.5}px`,
                  top: `${12 + i * 14}%`,
                  left: `${10 + (i * 17) % 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, (i % 2 === 0 ? 10 : -10), 0],
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{
                  duration: 5 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Efek Malam Temaram: Lampu Meja Hangat & Bokeh (Segmen 5 & 6) */}
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
            {/* Sorotan Lampu Belajar Hangat (Amber Glow) */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#FFAA5A]/15 blur-[90px]" />
            <div className="absolute top-[65%] left-1/3 w-64 h-64 rounded-full bg-[#3B5B88]/15 blur-[80px]" />

            {/* Lampu Bokeh Halus */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`bokeh-${i}`}
                className="absolute rounded-full bg-[#FFD4A3] opacity-20 blur-[10px]"
                style={{
                  width: `${20 + (i % 3) * 14}px`,
                  height: `${20 + (i % 3) * 14}px`,
                  top: `${20 + i * 15}%`,
                  left: `${15 + (i * 20) % 75}%`,
                }}
                animate={{
                  opacity: [0.1, 0.25, 0.1],
                  scale: [0.95, 1.1, 0.95],
                }}
                transition={{
                  duration: 4 + i,
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
