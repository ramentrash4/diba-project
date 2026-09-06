"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { lofiEngine, playSfx as triggerSynthSfx } from "@/utils/audioSynth";
import { scrapbookData } from "@/data/scrapbookData";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [isBgmActive, setIsBgmActive] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(null);
  const [isForegroundPlaying, setIsForegroundPlaying] = useState(false);

  const bgmAudioRef = useRef(null);
  const foregroundAudioRef = useRef(null);
  const isBgmActiveRef = useRef(false);
  const rafIdRef = useRef(null);
  const timeUpdateCallbackRef = useRef(null);
  const onEndedCallbackRef = useRef(null);

  const stopSmoothProgress = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startSmoothProgress = useCallback(() => {
    stopSmoothProgress();
    const tick = () => {
      const audio = foregroundAudioRef.current;
      if (audio && !audio.paused && !audio.ended) {
        if (timeUpdateCallbackRef.current) {
          timeUpdateCallbackRef.current(
            audio.currentTime || 0,
            audio.duration || 0
          );
        }
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        stopSmoothProgress();
      }
    };
    rafIdRef.current = requestAnimationFrame(tick);
  }, [stopSmoothProgress]);

  useEffect(() => {
    isBgmActiveRef.current = isBgmActive;
  }, [isBgmActive]);

  // Mengembalikan volume BGM ke tingkat normal
  const restoreBgm = useCallback(() => {
    if (bgmAudioRef.current && isBgmActiveRef.current) {
      bgmAudioRef.current.volume = scrapbookData.bgm.defaultVolume;
    }
  }, []);

  // Inisialisasi Audio Element di browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const bgm = new Audio(scrapbookData.bgm.src);
      bgm.loop = true;
      bgm.volume = scrapbookData.bgm.defaultVolume;

      bgm.onerror = () => {
        // Fallback procedural engine aktif
      };
      bgmAudioRef.current = bgm;

      const fg = new Audio();
      fg.onended = () => {
        stopSmoothProgress();
        setIsForegroundPlaying(false);
        setActiveTrackId(null);
        restoreBgm();
      };
      foregroundAudioRef.current = fg;
    }

    return () => {
      stopSmoothProgress();
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
      if (foregroundAudioRef.current) {
        foregroundAudioRef.current.pause();
      }
      lofiEngine.stop();
    };
  }, [restoreBgm, stopSmoothProgress]);

  // Mulai memutar BGM lembut
  const startBgm = useCallback(() => {
    setIsBgmActive(true);
    if (bgmAudioRef.current) {
      bgmAudioRef.current
        .play()
        .catch(() => {
          lofiEngine.start();
        });
    } else {
      lofiEngine.start();
    }
  }, []);

  // Auto-ducking: meredakan volume BGM saat lagu / VN berbunyi
  const duckBgm = useCallback(() => {
    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = 0.08;
    }
  }, []);

  // Mengatur kecepatan putar audio foreground (1x / 2x)
  const setPlaybackRate = useCallback((rate = 1) => {
    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.playbackRate = rate;
    }
  }, []);

  // Menggeser posisi putar audio (Seek Forward / Backward)
  const seekTrack = useCallback((timeInSeconds) => {
    if (foregroundAudioRef.current) {
      try {
        foregroundAudioRef.current.currentTime = timeInSeconds;
      } catch (e) {
        console.log("Seek error:", e);
      }
    }
  }, []);

  const pauseTrack = useCallback(() => {
    stopSmoothProgress();
    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.pause();
    }
    setIsForegroundPlaying(false);
    restoreBgm();
  }, [restoreBgm, stopSmoothProgress]);

  const stopTrack = useCallback(() => {
    stopSmoothProgress();
    if (foregroundAudioRef.current) {
      foregroundAudioRef.current.pause();
      try {
        foregroundAudioRef.current.currentTime = 0;
      } catch (e) {}
    }
    setIsForegroundPlaying(false);
    setActiveTrackId(null);
    restoreBgm();
  }, [restoreBgm, stopSmoothProgress]);

  // Memutar audio foreground (Lagu Segmen 2 atau VN Segmen 6)
  const playTrack = useCallback(
    (
      trackId,
      src,
      onEndedCallback,
      playbackRate = 1,
      onTimeUpdateCallback,
      startTime = 0
    ) => {
      if (activeTrackId === trackId && isForegroundPlaying) {
        pauseTrack();
        return;
      }

      setActiveTrackId(trackId);
      setIsForegroundPlaying(true);
      duckBgm();

      timeUpdateCallbackRef.current = onTimeUpdateCallback;
      onEndedCallbackRef.current = onEndedCallback;

      if (foregroundAudioRef.current) {
        const audio = foregroundAudioRef.current;
        const isSameSrc =
          audio.src && (audio.src.endsWith(src) || audio.src === src);

        if (!isSameSrc) {
          audio.src = src;
          try {
            audio.load();
          } catch (e) {}
        }
        audio.defaultPlaybackRate = playbackRate;
        try {
          audio.playbackRate = playbackRate;
        } catch (e) {}

        if (startTime > 0) {
          try {
            audio.currentTime = startTime;
          } catch (e) {
            audio.onloadedmetadata = () => {
              try {
                audio.currentTime = startTime;
              } catch (err) {}
            };
          }
        }

        audio.ontimeupdate = () => {
          if (timeUpdateCallbackRef.current && foregroundAudioRef.current) {
            timeUpdateCallbackRef.current(
              foregroundAudioRef.current.currentTime || 0,
              foregroundAudioRef.current.duration || 0
            );
          }
        };

        audio.onended = () => {
          stopSmoothProgress();
          setIsForegroundPlaying(false);
          setActiveTrackId(null);
          restoreBgm();
          if (onEndedCallbackRef.current) onEndedCallbackRef.current();
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              startSmoothProgress();
            })
            .catch((err) => {
              stopSmoothProgress();
              if (err && err.name === "AbortError") return;
              console.warn(`Audio play error for track ${trackId}:`, err);
            });
        }
      }
    },
    [
      activeTrackId,
      isForegroundPlaying,
      duckBgm,
      restoreBgm,
      pauseTrack,
      startSmoothProgress,
      stopSmoothProgress,
    ]
  );

  // Memainkan SFX haptik
  const playSfx = useCallback((name) => {
    triggerSynthSfx(name);
  }, []);

  // Mereda ke hening mutlak (untuk Segmen 8 Penutup)
  const fadeOutAll = useCallback((durationMs = 2500) => {
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
  }, []);

  const value = useMemo(
    () => ({
      isBgmActive,
      activeTrackId,
      isForegroundPlaying,
      startBgm,
      playTrack,
      pauseTrack,
      stopTrack,
      seekTrack,
      setPlaybackRate,
      duckBgm,
      restoreBgm,
      playSfx,
      fadeOutAll,
    }),
    [
      isBgmActive,
      activeTrackId,
      isForegroundPlaying,
      startBgm,
      playTrack,
      pauseTrack,
      stopTrack,
      seekTrack,
      setPlaybackRate,
      duckBgm,
      restoreBgm,
      playSfx,
      fadeOutAll,
    ]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

