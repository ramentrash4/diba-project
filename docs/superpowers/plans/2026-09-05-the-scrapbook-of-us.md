# The Scrapbook of Us Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-oriented, highly interactive, emotional single-page digital scrapbook website ("The Scrapbook of Us") with 8 sequential segments as a farewell gift from Tatwa to Adiba, featuring rich animations, dynamic environmental atmosphere, canvas scratch-cards, physical polaroid swipe/flip, retro cassette audio player with auto-ducking, and a peaceful whiteout finale.

**Architecture:** Next.js (App Router) with client-side interactive components orchestrated by a sequential storybook state machine in `src/app/page.js`. Framer Motion handles physics-based gestures (ribbon pull, 3D unboxing, polaroid throw/flip), HTML5 Canvas powers the foggy glass wiper, a dedicated Audio Engine handles BGM crossfading and auto-ducking for soundtracks and voice notes, and `AtmosphereBackdrop` drives smooth cinematic color shifts across segments.

**Tech Stack:** Next.js 14/15, React, Tailwind CSS, Framer Motion, Canvas Confetti, Lucide React, Web Audio API / HTML5 Audio, Google Fonts (`Caveat`, `Courier Prime`, `Plus Jakarta Sans`).

## Global Constraints

- Platform: Mobile-first responsive design, optimized for screen widths 360px - 430px, while looking elegant on desktop centered view.
- Visual Aesthetics: Warm handcrafted scrapbook (linen/kraft paper textures, washi tape) meets lo-fi analog cassette tape.
- Navigation Gating: Strict storybook flow; each segment is locked until its prerequisite interaction is completed.
- Audio Autoplay Compliance: Background music only starts upon explicit user gesture (pulling the ribbon in Segment 1).
- Content Isolation: All copy, audio paths, photo paths, and inside joke texts are centralized in `src/data/scrapbookData.js` with clear documentation for Tatwa to swap files.

---

### Task 1: Project Scaffolding & Core Dependencies

**Files:**
- Create: `package.json`, `tailwind.config.js`, `next.config.mjs`, `src/app/layout.js`, `src/app/globals.css`
- Modify: `.gitignore`

**Interfaces:**
- Produces: Working Next.js development environment with Tailwind CSS, Google Fonts (`Caveat`, `Courier Prime`, `Plus Jakarta Sans`), and installed libraries (`framer-motion`, `canvas-confetti`, `lucide-react`).

- [ ] **Step 1: Initialize Next.js in workspace**
Run:
```bash
npx create-next-app@latest ./ --js --tailwind --app --src-dir --use-npm --disable-git --import-alias "@/*" --yes
```

- [ ] **Step 2: Install interactive packages**
Run:
```bash
npm install framer-motion canvas-confetti lucide-react
```

- [ ] **Step 3: Configure Google Fonts and metadata in layout.js**
Setup fonts `Caveat`, `Courier_Prime`, and `Plus_Jakarta_Sans` in `src/app/layout.js` and assign CSS variables `--font-handwriting`, `--font-typewriter`, `--font-sans`. Set page title: "The Scrapbook of Us — Untuk Askiyaa".

- [ ] **Step 4: Configure CSS custom tokens in globals.css**
Define paper textures, shadows, colors (`--paper-cream`, `--paper-kraft`, `--night-bg`, `--ink-primary`), and mobile container utilities.

- [ ] **Step 5: Verify dev server runs cleanly**
Run: `npm run build` or start dev server to ensure clean compilation without warnings.

- [ ] **Step 6: Commit**
```bash
git add package.json package-lock.json next.config.* tailwind.config.* src/app/
git commit -m "feat: setup Next.js project with Tailwind, Framer Motion, and typography"
```

---

### Task 2: Centralized Data Contract & Asset Structure

**Files:**
- Create: `src/data/scrapbookData.js`
- Create: Directories `public/audio/bgm/`, `public/audio/songs/`, `public/audio/vn/`, `public/audio/sfx/`, `public/images/polaroids/`, `public/textures/`
- Create: `src/utils/audioSynth.js` (Helper to generate pleasant synthetic Web Audio fallback tones so music & voice notes play instantly even before Tatwa adds real MP3s)

**Interfaces:**
- Produces: `scrapbookData` containing structured data for all 8 segments (`recipient`, `bgm`, `soundtrack`, `polaroids`, `dictionary`, `foggyGlass`, `voiceNotes`, `wishlist`, `closing`).

- [ ] **Step 1: Create public asset directory tree**
Create folders for audio channels, textures, and polaroids.

- [ ] **Step 2: Create audioSynth.js**
Write an audio synthesizer helper using Web Audio API that creates warm lofi acoustic piano chimes and speech simulation tones as a zero-dependency fallback when local MP3s are loading or absent.

- [ ] **Step 3: Create src/data/scrapbookData.js**
Populate comprehensive, deeply personal sample data tailored for Tatwa & Adiba (Askiyaa, Pilkom 25) with detailed comments showing how to drop in custom files.

- [ ] **Step 4: Verify data export**
Create a quick test or verify import in `src/app/page.js`.

- [ ] **Step 5: Commit**
```bash
git add src/data/ src/utils/ public/
git commit -m "feat: add centralized scrapbook data contract and audio synth fallback"
```

---

### Task 3: Audio Engine & Cassette Player Component

**Files:**
- Create: `src/components/audio/AudioProvider.js`
- Create: `src/components/audio/CassetteTape.js`

**Interfaces:**
- Consumes: `scrapbookData.bgm`, `scrapbookData.soundtrack`
- Produces:
  - `useAudio()` hook: `{ isBgmPlaying, startBgm, playTrack, pauseTrack, activeTrackId, duckBgm, restoreBgm, fadeOutAll, playSfx }`
  - `<CassetteTape isPlaying={boolean} label={string} title={string} />`

- [ ] **Step 1: Implement AudioProvider.js**
Build audio manager context supporting:
- BGM ambient loop with smooth volume transitions.
- Foreground audio tracking with automatic ducking (lowering BGM from 35% to 8% when track/VN plays).
- SFX triggers for ribbon pull, paper rustle, cassette button click.
- `fadeOutAll(duration)` for the final closure sequence.

- [ ] **Step 2: Implement CassetteTape.js**
Create vintage 90s cassette design with:
- Dual rotating tape reels using Framer Motion rotation.
- Realistic plastic shell, tape window, screws, and handwritten label tape.
- Mini equalizer/waveform bars that dance when playing.

- [ ] **Step 3: Verify audio transitions and cassette rendering**
Test playback toggling, ducking logic, and cassette reel rotation.

- [ ] **Step 4: Commit**
```bash
git add src/components/audio/
git commit -m "feat: implement dual-channel audio engine with auto-ducking and animated cassette player"
```

---

### Task 4: Dynamic Atmosphere & Common Scrapbook UI

**Files:**
- Create: `src/components/common/AtmosphereBackdrop.js`
- Create: `src/components/common/WashiTape.js`
- Create: `src/components/common/PaperSheet.js`
- Create: `src/components/common/TypingIndicator.js`

**Interfaces:**
- Consumes: `activeSegment` (1 to 8)
- Produces:
  - `<AtmosphereBackdrop currentSegment={activeSegment} />` (Transitions from Daylight Golden Hour to Midnight Rainy Slate to Dawn and Pure White)
  - `<WashiTape color="rose|sage|mustard" angle={number} />`
  - `<PaperSheet variant="kraft|linen|torn|notebook">`
  - `<TypingIndicator name="Tatwa" />`

- [ ] **Step 1: Implement AtmosphereBackdrop.js**
Smooth background color interpolation using Framer Motion `motion.div`, floating dust particles for daytime, subtle bokeh lights and rain mist for midnight segments.

- [ ] **Step 2: Implement WashiTape.js and PaperSheet.js**
Craft realistic translucent washi tape strips with serrated edges and textured paper cards with subtle dropshadows.

- [ ] **Step 3: Implement TypingIndicator.js**
Create cute bouncing 3-dot indicator with text: "Tatwa sedang mengetik...".

- [ ] **Step 4: Commit**
```bash
git add src/components/common/
git commit -m "feat: add dynamic atmosphere backdrop and scrapbook UI tokens"
```

---

### Task 5: Segments 1 & 2 (Prolog Unboxing & Mixtape Player)

**Files:**
- Create: `src/components/segments/Segment1Prolog.js`
- Create: `src/components/segments/Segment2Soundtrack.js`

**Interfaces:**
- Consumes: `scrapbookData.recipient`, `scrapbookData.soundtrack`, `useAudio`
- Produces:
  - `<Segment1Prolog onComplete={() => void} />`
  - `<Segment2Soundtrack onComplete={() => void} />`

- [ ] **Step 1: Implement Segment1Prolog.js**
- Gift box illustration with satin ribbon knot.
- Draggable ribbon node (`framer-motion` drag constraint).
- Trigger: Ribbon unfastens -> lid lifts with 3D spring -> confetti bursts (`canvas-confetti`) -> BGM starts -> triggers `onComplete()` which unlocks and smooth-scrolls to Segment 2.

- [ ] **Step 2: Implement Segment2Soundtrack.js**
- Embed `<CassetteTape />`.
- Tracklist with Play/Pause button, title, artist, and duration.
- Memory text displayed with typewriter letter-by-letter reveal.
- Completion gate: Playing at least 1 song reveals the stamp button: *"Lanjut Membaca..."*, triggering `onComplete()`.

- [ ] **Step 3: Verify Segment 1 to 2 transition and audio handover**
Test ribbon pull, unboxing confetti, BGM start, and track playback with ducking.

- [ ] **Step 4: Commit**
```bash
git add src/components/segments/Segment1Prolog.js src/components/segments/Segment2Soundtrack.js
git commit -m "feat: implement Segment 1 Prolog unboxing and Segment 2 Mixtape player"
```

---

### Task 6: Segments 3 & 4 (Polaroid Stack & Kamus Bahasa Kita)

**Files:**
- Create: `src/components/segments/Segment3Polaroid.js`
- Create: `src/components/segments/Segment4Kamus.js`

**Interfaces:**
- Consumes: `scrapbookData.polaroids`, `scrapbookData.dictionary`, `useAudio`
- Produces:
  - `<Segment3Polaroid onComplete={() => void} />`
  - `<Segment4Kamus onComplete={() => void} />`

- [ ] **Step 1: Implement Segment3Polaroid.js**
- 3D Flip Card: Tap to rotate 180° revealing handwriting note on back (`preserve-3d`).
- Drag-to-throw: Drag card horizontally with velocity threshold; slides out with paper swoosh SFX.
- Counter and dynamic front caption below the stack.
- Completion gate: Swiping all polaroids reveals button *"Buka Kamus Rahasia..."*.

- [ ] **Step 2: Implement Segment4Kamus.js**
- Mini vintage pocket dictionary styling.
- Expandable definition cards with phonetic pronunciation, word class, and humorous real-life examples.
- Playful doodle stamps.
- Completion gate: Button *"Melangkah ke Malam..."* triggers transition to midnight atmosphere and unlocks Segment 5.

- [ ] **Step 3: Verify polaroid flip/swipe physics and dictionary interaction**
Verify 3D flip card works on touch devices and dictionary cards expand smoothly.

- [ ] **Step 4: Commit**
```bash
git add src/components/segments/Segment3Polaroid.js src/components/segments/Segment4Kamus.js
git commit -m "feat: implement Segment 3 3D Polaroid stack and Segment 4 Pocket Dictionary"
```

---

### Task 7: Segments 5 & 6 (Foggy Glass Scratch & Voice Notes Sequencer)

**Files:**
- Create: `src/components/segments/Segment5KacaEmbun.js`
- Create: `src/components/segments/Segment6VoiceNotes.js`

**Interfaces:**
- Consumes: `scrapbookData.foggyGlass`, `scrapbookData.voiceNotes`, `useAudio`
- Produces:
  - `<Segment5KacaEmbun onComplete={() => void} />`
  - `<Segment6VoiceNotes onComplete={() => void} />`

- [ ] **Step 1: Implement Segment5KacaEmbun.js**
- HTML5 Canvas overlay with foggy glass condensation texture and droplet streaks.
- Touch/mouse drag draws with `destination-out` composite mode to wipe away condensation.
- Calculates wiped pixel percentage. When >50% cleared, animates full clarity with sparkle particle bursts.
- Revealing all 3 foggy memories unlocks Segment 6.

- [ ] **Step 2: Implement Segment6VoiceNotes.js**
- Voice note audio player with waveform visualizer and scrubber.
- Sequential rule: VN 1 plays (real Adiba voice) -> on finish -> 1s pause -> `<TypingIndicator />` shows -> Tatwa's playful banter bubble pops in with spring bounce -> VN 2 unlocks.
- Once all VNs are heard and replied to, button *"Menyusuri Rencana..."* unlocks Segment 7.

- [ ] **Step 3: Verify canvas wipe performance (60fps) and sequential VN logic**
Test touch drag on mobile view and check that VN 2 remains locked until VN 1 finishes.

- [ ] **Step 4: Commit**
```bash
git add src/components/segments/Segment5KacaEmbun.js src/components/segments/Segment6VoiceNotes.js
git commit -m "feat: implement Segment 5 Foggy Glass scratch canvas and Segment 6 Sequential Voice Notes"
```

---

### Task 8: Segments 7 & 8 (Wishlist, Boarding Pass Tiket Doa, & Whiteout Finale)

**Files:**
- Create: `src/components/segments/Segment7Wishlist.js`
- Create: `src/components/segments/Segment8Closing.js`

**Interfaces:**
- Consumes: `scrapbookData.wishlist`, `scrapbookData.closing`, `useAudio`
- Produces:
  - `<Segment7Wishlist onComplete={() => void} />`
  - `<Segment8Closing onFinalLock={() => void} />`

- [ ] **Step 1: Implement Segment7Wishlist.js**
- Torn paper yellow lined pad visual with torn top edge and masking tape.
- Unchecked boxes with subtle handwritten notes ("Mungkin di semesta lain...").
- Gentle reflective pacing with *"Buka Lembaran Terakhir"* button unlocking Segment 8.

- [ ] **Step 2: Implement Segment8Closing.js**
- Heartfelt gratitude letter.
- Vintage Boarding Pass / Tiket Doa Masa Depan (perforated coupon edge, barcode, flight PILKOM-2025, destination: Happiness, valid forever).
- Sacred button: **"Tutup Lembaran"**.
- Final Closure Sequence:
  - Click sound -> BGM and media smoothly fade out to absolute silence over 2.5s.
  - Screen dissolves into pure whiteout overlay (`#FFFFFF`).
  - Centered minimalist handwritten text appears: *"Berbahagialah. — Tatwa"*.
  - Full interaction lock (`pointer-events: none` & `overflow: hidden`).

- [ ] **Step 3: Verify closure transition, audio fade, and permanent freeze**
Test that audio fades completely to 0 and page cannot be scrolled or clicked further.

- [ ] **Step 4: Commit**
```bash
git add src/components/segments/Segment7Wishlist.js src/components/segments/Segment8Closing.js
git commit -m "feat: implement Segment 7 Wishlist and Segment 8 Tiket Doa with Whiteout closure"
```

---

### Task 9: Main Page Orchestrator & End-to-End Verification

**Files:**
- Modify: `src/app/page.js`
- Modify: `src/app/globals.css`

**Interfaces:**
- Integrates: `AtmosphereBackdrop`, `AudioProvider`, and all 8 segments into one responsive, mobile-first storybook.

- [ ] **Step 1: Implement page.js Orchestrator**
- Wire `unlockedSegment` (1 to 8), `activeSegment`, and `isPageLocked`.
- Intersection Observer / scroll-snap helper to update `activeSegment` for dynamic atmosphere transitions.
- Render segments inside a mobile-friendly phone container (max-w-md mx-auto).

- [ ] **Step 2: Test complete user journey end-to-end**
Run through the entire experience:
1. Ribbon pull & 3D box unboxing.
2. Mixtape song play with auto-ducking.
3. Polaroid 3D card flip & drag throw.
4. Dictionary inside jokes read.
5. Foggy glass wiping on canvas.
6. Voice note listening with Tatwa banter pop-ins.
7. Wishlist reflection.
8. Tiket Doa boarding pass & "Tutup Lembaran" whiteout finale.

- [ ] **Step 3: Verify build and production bundle**
Run: `npm run build`
Ensure 0 build errors, valid metadata, and clean hydration.

- [ ] **Step 4: Final Commit**
```bash
git add src/app/page.js src/app/globals.css
git commit -m "feat: complete end-to-end integration of The Scrapbook of Us application"
```

---

## Plan Self-Review Checklist
- [x] Spec coverage: All 8 segments from PRD and Design Spec are assigned to dedicated tasks.
- [x] No placeholders: Complete file paths, interfaces, and concrete step instructions provided.
- [x] Sequential gating: Strict unlock logic accounted for in every task.
- [x] Dynamic atmosphere: Integrated in Task 4 and Task 9.
- [x] Audio ducking: Handled in Task 3 and verified across media segments.
