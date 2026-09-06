/**
 * Web Audio API Synthesizer & Procedural Sound Engine
 * Digunakan sebagai penghasil efek suara (SFX) dan fallback musik lo-fi merdu
 * sebelum file MP3 asli dimasukkan oleh Tatwa.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Memainkan nada instrumen lembut (piano/kalimba chimes)
 */
export function playSyntheticNote(freq = 440, duration = 0.8, type = "sine", gainLevel = 0.15) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope (attack & gentle decay)
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainLevel, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn("Web Audio Note error:", err);
  }
}

/**
 * Efek Suara Haptik (SFX)
 */
export function playSfx(name) {
  const ctx = getAudioContext();
  if (!ctx) return;

  switch (name) {
    case "tape-click":
      // Suara klik tombol kaset mekanik
      playSyntheticNote(240, 0.08, "triangle", 0.2);
      setTimeout(() => playSyntheticNote(180, 0.05, "sine", 0.1), 40);
      break;

    case "paper-swoosh":
      // Suara lembar foto / kertas bergeser
      playSyntheticNote(320, 0.12, "sine", 0.08);
      break;

    case "card-flip":
      // Suara membalik kartu foto polaroid (sentuhan kertas tebal)
      playSyntheticNote(380, 0.07, "triangle", 0.14);
      setTimeout(() => playSyntheticNote(460, 0.05, "sine", 0.1), 35);
      break;

    case "unboxing-chime":
      // Melodi pembuka kado: nada C5 -> E5 -> G5 -> B5 -> C6
      [523.25, 659.25, 783.99, 987.77, 1046.5].forEach((freq, idx) => {
        setTimeout(() => {
          playSyntheticNote(freq, 1.2, "sine", 0.12);
        }, idx * 110);
      });
      break;

    case "sparkle":
      // Suara kilauan saat embun kaca terhapus
      [880, 1100, 1320, 1760].forEach((freq, idx) => {
        setTimeout(() => {
          playSyntheticNote(freq, 0.3, "triangle", 0.06);
        }, idx * 60);
      });
      break;

    case "bubble-pop":
      // Suara chat bubble Tatwa muncul
      playSyntheticNote(600, 0.09, "sine", 0.18);
      setTimeout(() => playSyntheticNote(850, 0.12, "sine", 0.15), 50);
      break;

    case "tape-insert":
      // Suara mechanical clack/snap kaset masuk ke dalam deck
      playSyntheticNote(160, 0.09, "triangle", 0.35);
      setTimeout(() => playSyntheticNote(340, 0.06, "sine", 0.22), 35);
      setTimeout(() => playSyntheticNote(220, 0.08, "triangle", 0.18), 70);
      break;

    case "tape-eject":
      // Suara pegas mekanik kaset keluar dari deck
      playSyntheticNote(320, 0.08, "sine", 0.2);
      setTimeout(() => playSyntheticNote(180, 0.12, "triangle", 0.25), 45);
      break;

    case "page-turn":
      // Suara gesekan membalik lembaran kertas scrapbook
      playSyntheticNote(280, 0.18, "sine", 0.12);
      setTimeout(() => playSyntheticNote(350, 0.15, "triangle", 0.08), 50);
      break;

    case "btn-toggle":
      // Suara klik pegas tombol play/pause mekanik
      playSyntheticNote(480, 0.04, "triangle", 0.18);
      setTimeout(() => playSyntheticNote(280, 0.06, "sine", 0.15), 30);
      break;

    case "tape-rewind":
      // Suara desing roda pita berputar cepat (ffwd/rewind)
      [300, 380, 460, 540, 620].forEach((freq, idx) => {
        setTimeout(() => playSyntheticNote(freq, 0.05, "triangle", 0.08), idx * 25);
      });
      break;

    case "mist-wipe":
      // Suara gesekan lembut jari menghapus embun kaca dingin
      playSyntheticNote(520, 0.14, "sine", 0.06);
      setTimeout(() => playSyntheticNote(420, 0.1, "triangle", 0.05), 30);
      break;

    case "pencil-scratch":
      // Suara goresan pensil / stabilo di atas kertas
      playSyntheticNote(340, 0.06, "triangle", 0.1);
      setTimeout(() => playSyntheticNote(290, 0.05, "sine", 0.08), 25);
      break;

    case "clasp-open":
      // Suara kancing kuningan buku saku terlepas
      playSyntheticNote(580, 0.07, "triangle", 0.2);
      setTimeout(() => playSyntheticNote(740, 0.09, "sine", 0.15), 35);
      break;

    case "ticket-tear":
      // Suara sobekan perforasi tiket kertas
      [320, 400, 360, 480].forEach((freq, idx) => {
        setTimeout(() => playSyntheticNote(freq, 0.06, "triangle", 0.09), idx * 20);
      });
      break;

    case "wax-crack":
      // Suara retakan segel lilin tradisional yang pecah
      playSyntheticNote(620, 0.05, "triangle", 0.22);
      setTimeout(() => playSyntheticNote(840, 0.04, "sine", 0.18), 18);
      setTimeout(() => playSyntheticNote(320, 0.08, "triangle", 0.12), 40);
      break;

    case "camera-shutter":
      // Suara klik mekanis rana kamera polaroid
      playSyntheticNote(480, 0.04, "triangle", 0.25);
      setTimeout(() => playSyntheticNote(180, 0.06, "sine", 0.2), 25);
      setTimeout(() => playSyntheticNote(720, 0.05, "triangle", 0.12), 70);
      break;

    case "highlighter-glide":
      // Suara gesekan spidol stabilo pastel di atas kertas
      playSyntheticNote(520, 0.09, "sine", 0.08);
      setTimeout(() => playSyntheticNote(640, 0.07, "triangle", 0.06), 35);
      setTimeout(() => playSyntheticNote(480, 0.06, "sine", 0.05), 80);
      break;

    case "aux-snap":
      // Suara colokan jack earphone 3.5mm kuningan mengunci ke dalam port
      playSyntheticNote(240, 0.06, "triangle", 0.3);
      setTimeout(() => playSyntheticNote(680, 0.05, "sine", 0.22), 20);
      setTimeout(() => playSyntheticNote(940, 0.04, "triangle", 0.15), 45);
      break;

    case "pencil-check":
      // Suara goresan pensil centang pada kertas wishlist
      playSyntheticNote(380, 0.05, "triangle", 0.15);
      setTimeout(() => playSyntheticNote(540, 0.07, "sine", 0.12), 30);
      break;

    case "stamp-thud":
      // Suara debum stempel kuningan berat menekan segel lilin hangat
      playSyntheticNote(95, 0.16, "triangle", 0.4);
      setTimeout(() => playSyntheticNote(160, 0.12, "sine", 0.25), 25);
      setTimeout(() => playSyntheticNote(280, 0.08, "triangle", 0.15), 60);
      break;

    case "tape-peel":
      // Suara gesekan adesif selotip terkelupas dari kertas bertekstur
      [240, 380, 520, 680].forEach((freq, idx) => {
        setTimeout(() => playSyntheticNote(freq, 0.07, "triangle", 0.12), idx * 22);
      });
      setTimeout(() => playSyntheticNote(840, 0.05, "sine", 0.08), 85);
      break;

    default:
      playSyntheticNote(440, 0.15, "sine", 0.1);
  }
}

/**
 * Generator Melodi Lo-Fi Ambient yang Hangat & Puitis untuk BGM
 */
class LofiAmbientEngine {
  constructor() {
    this.isPlaying = false;
    this.intervalId = null;
    // Progresi akord lo-fi jazz romantis hangat: Cmaj9 -> Am9 -> Fmaj7(9) -> G13sus
    this.chords = [
      [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
      [220.0, 261.63, 329.63, 392.0, 493.88],  // Am9
      [174.61, 220.0, 261.63, 329.63, 392.0],  // Fmaj7(9)
      [196.0, 246.94, 293.66, 392.0, 440.0],   // G13sus
    ];
    this.chordIndex = 0;
  }

  start() {
    const ctx = getAudioContext();
    if (!ctx || this.isPlaying) return;

    this.isPlaying = true;

    const playChordStep = () => {
      if (!this.isPlaying) return;
      const currentChord = this.chords[this.chordIndex % this.chords.length];

      // Petikan arpeggio lembut berfrekuensi hangat
      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          if (this.isPlaying) {
            playSyntheticNote(freq, 2.6, "sine", 0.038);
            // Tambahkan harmonik atas lonceng lembut pada nada tertinggi
            if (i === currentChord.length - 1) {
              setTimeout(() => {
                if (this.isPlaying) {
                  playSyntheticNote(freq * 1.5, 1.8, "triangle", 0.015);
                }
              }, 120);
            }
          }
        }, i * 360);
      });

      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    };

    playChordStep();
    this.intervalId = setInterval(playChordStep, 3400);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const lofiEngine = new LofiAmbientEngine();
