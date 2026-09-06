"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { lofiEngine, playSfx as triggerSynthSfx, playSyntheticNote } from "@/utils/audioSynth";
import { scrapbookData } from "@/data/scrapbookData";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isBgmActive, setIsBgmActive] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isForegroundPlaying, setIsForegroundPlaying] = useState(false);

  const bgmAudioRef = useRef(null);
  const foregroundAudioRef = useRef(null);

  // Inisialisasi Audio Element di browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bgm = new Audio(scrapbookData.bgm.src);
      bgm.loop = true;
      bgm.volume = scrapbookData.bgm.defaultVolume;

      // Handle error jika file MP3 belum ada, gunakan synthesizer lofi sebagai fallback
      bgm.onerror = () => {
        // Fallback procedural engine aktif
      };
      bgmAudioRef.current = bgm;

      const fg = new Audio();
      fg.onended = () => {
        setIsForegroundPlaying(false);
        setActiveTrackId(null);
        restoreBgm();
      };
      foregroundAudioRef.current = fg;
    }

    return () => {
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
      if (foregroundAudioRef.current) {
        foregroundAudioRef.current.pause();
      }
      lofiEngine.stop();
    };
  }, []);

  // Mulai memutar BGM lembut
  const startBgm = () => {
    setIsBgmActive(true);
    if (bgmAudioRef.current) {
      bgmAudioRef.current
        .play()
        .catch(() => {
          // Jika file lokal tidak ditemukan, aktifkan procedural lofi ambient
          lofiEngine.start();
        });
    } else {
      lofiEngine.start();
    }
  };

  // Auto-ducking: meredakan volume BGM saat lagu / VN berbunyi
  const duckBgm = () => {
    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = 0.08;
    }
  };

  // Mengembalikan volume BGM ke tingkat normal
  const restoreBgm = () => {
    if (bgmAudioRef.current && isBgmActive) {
      bgmAudioRef.current.volume = scrapbookData.bgm.defaultVolume;
    }
  };

  // Mengatur kecepatan putar audio foreground (1x / 2x)
  const setPlaybackRate = (rate = 1) => {
    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.playbackRate = rate;
    }
  };

  // Memutar audio foreground (Lagu Segmen 2 atau VN Segmen 6)
  const playTrack = (trackId, src, onEndedCallback, playbackRate = 1) => {
    if (activeTrackId === trackId && isForegroundPlaying) {
      pauseTrack();
      return;
    }

    setActiveTrackId(trackId);
    setIsForegroundPlaying(true);
    duckBgm();

    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.src = src;
      foregroundAudioRef.current.playbackRate = playbackRate;
      foregroundAudioRef.current.onended = () => {
        setIsForegroundPlaying(false);
        setActiveTrackId(null);
        restoreBgm();
        if (onEndedCallback) onEndedCallback();
      };

      foregroundAudioRef.current
        .play()
        .catch(() => {
          // Fallback jika file audio demo belum dimasukkan: simulasikan durasi bunyi 5 detik
          console.log(`Audio fallback for track ${trackId}`);
          playSyntheticNote(330, 2.0, "triangle", 0.15);
          setTimeout(() => {
            playSyntheticNote(392, 2.0, "triangle", 0.15);
          }, 1200);
          setTimeout(() => {
            setIsForegroundPlaying(false);
            setActiveTrackId(null);
            restoreBgm();
            if (onEndedCallback) onEndedCallback();
          }, 4000);
        });
    }
  };

  const pauseTrack = () => {
    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.pause();
    }
    setIsForegroundPlaying(false);
    setActiveTrackId(null);
    restoreBgm();
  };

  // Memainkan SFX haptik
  const playSfx = (name) => {
    triggerSynthSfx(name);
  };

  // Mereda ke hening mutlak (untuk Segmen 8 Penutup)
  const fadeOutAll = (durationMs = 2500) => {
    lofiEngine.stop();
    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.pause();
    }
    if (bgmAudioRef.current) {
      const stepTime = 50;
      const steps = durationMs / stepTime;
      const volStep = bgmAudioRef.current.volume / steps;

      const fadeInterval = setInterval(() => {
        if (bgmAudioRef.current && bgmAudioRef.current.volume > volStep) {
          bgmAudioRef.current.volume -= volStep;
        } else {
          if (bgmAudioRef.current) {
            bgmAudioRef.current.pause();
            bgmAudioRef.current.volume = 0;
          }
          clearInterval(fadeInterval);
        }
      }, stepTime);
    }
    setIsBgmActive(false);
  };

  return (
    <AudioContext.Provider
      value={{
        isBgmActive,
        activeTrackId,
        isForegroundPlaying,
        startBgm,
        playTrack,
        pauseTrack,
        setPlaybackRate,
        duckBgm,
        restoreBgm,
        playSfx,
        fadeOutAll,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
