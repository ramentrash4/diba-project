"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AtmosphereBackdrop({ currentSegment }) {
  // Menentukan tema visual berdasarkan nomor segmen
  const isNight = currentSegment === 5 || currentSegment === 6;
  const isDusk = currentSegment === 7;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-colors duration-1000">
      {/* Background Gradient Dinamis */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: isNight
            ? "#141B2B"
            : isDusk
            ? "#2B3242"
            : "#FAF7F2",
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Tekstur Kertas Halus / Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Partikel Siang Hari (Floating Warm Dust Motes) */}
      <AnimatePresence>
        {!isNight && !isDusk && (
          <motion.div
            key="day-motes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`mote-${i}`}
                className="absolute rounded-full bg-[#D4A373] opacity-20 blur-[1px]"
                style={{
                  width: `${6 + (i % 4) * 3}px`,
                  height: `${6 + (i % 4) * 3}px`,
                  top: `${10 + (i * 12)}%`,
                  left: `${8 + (i * 11)}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, (i % 2 === 0 ? 15 : -15), 0],
                  opacity: [0.15, 0.45, 0.15],
                }}
                transition={{
                  duration: 6 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Efek Malam Temaram: Bokeh Cahaya Lampu & Rintik Embun (Segmen 5 & 6) */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            key="night-bokeh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0"
          >
            {/* Sorotan Lampu Meja Hangat (Warm Amber Glow) */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[#FFAA5A] opacity-15 blur-[90px]" />
            <div className="absolute top-[65%] left-1/4 w-[280px] h-[280px] rounded-full bg-[#4A7BB0] opacity-10 blur-[80px]" />

            {/* Lampu Bokeh Kota di Kejauhan */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`bokeh-${i}`}
                className="absolute rounded-full bg-[#FFD199] opacity-25 blur-[12px]"
                style={{
                  width: `${24 + (i % 3) * 18}px`,
                  height: `${24 + (i % 3) * 18}px`,
                  top: `${15 + i * 14}%`,
                  left: `${(i * 17) % 85}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  duration: 4 + i * 1.2,
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
