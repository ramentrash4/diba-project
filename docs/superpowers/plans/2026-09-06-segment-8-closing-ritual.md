# Segment 8 Closing Ritual & Wax Seal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform Segment 8 (Penutup) into a sacred, multi-stage physical experience where the letter is revealed by pulling a tab beneath the Boarding Pass, and the final closure is achieved by dragging a brass wax stamp onto a red silk ribbon (Zero-Button Policy).

**Architecture:** Split Segment 8 into two progressive stages (`currentStage: 'ticket' | 'letter'`). Both stages remain optically centered (`my-auto`, `max-w-[345px] sm:max-w-[355px]`, ~400px height) without excessive empty space, maintaining high mobile readability and smooth Framer Motion transitions.

**Tech Stack:** Next.js 16 (App Router), React 19, Framer Motion, Tailwind CSS v4, Lucide React, Web Audio API via `AudioProvider`.

## Global Constraints
- Strict Zero-Button Policy: No `<button>` elements for interactions; all transitions use physical tactile drag/slide gestures.
- Strict No Web Verify: Do NOT invoke `browser_subagent` or automated browser interactions.
- Centered Optical Layout: Maintain `my-auto`, `max-w-[345px] sm:max-w-[355px]` with balanced breathing room above and below.
- Mobile Visibility: Minimum font size 8.5px for micro-mono labels, 12.5px–13px for body text, 15px–17px for handwriting notes.

---

### Task 1: Refactor Segment 8 Layout & Ticket-to-Letter Pull Gesture

**Files:**
- Modify: `src/components/segments/Segment8Closing.js`

**Interfaces:**
- Consumes: `scrapbookData.closing` (`ticket`, `letter`, `prayer`, `finalSignoff`), `useAudio` (`playSfx`)
- Produces: State `currentStage` (`"ticket"` | `"letter"`), `handlePullLetter` gesture handler

- [ ] **Step 1: Update component state and Stage 1 Ticket view**
  Add `currentStage` state defaulting to `"ticket"`. When in `"ticket"`, render only the Boarding Pass with its perforated top edge, airline styling, passenger details, and a bottom draggable letter tab (`drag="y"`).

- [ ] **Step 2: Implement letter drag gesture (`drag="y"`)**
  Configure Framer Motion `drag="y"` with `dragConstraints={{ top: 0, bottom: 80 }}`. On drag release past threshold (`info.offset.y > 35` or `info.velocity.y > 100`), trigger `handlePullLetter()` to play `paper-swoosh` and transition `currentStage` to `"letter"`.

- [ ] **Step 3: Verify build**
  Run `npm run build` to ensure no syntax errors in Stage 1 implementation.

---

### Task 2: Implement Heartfelt Letter Display & Wax Seal Closing Ritual

**Files:**
- Modify: `src/components/segments/Segment8Closing.js`

**Interfaces:**
- Consumes: `onFinalLock` prop from `src/app/page.js`
- Produces: State `isSealed`, `stampProgress`, `handleSealComplete` gesture handler

- [ ] **Step 1: Render Tatwa's handwritten letter in Stage 2**
  When `currentStage === "letter"`, animate letter parchment into the optical center with `AnimatePresence`. Render `closing.letter`, `closing.prayer`, and `closing.finalSignoff` with generous line-height and authentic ink styling.

- [ ] **Step 2: Build interactive Wax Seal Track (Zero Buttons)**
  Add a tactile wax sealing track below the letter:
  - Left: Draggable brass wax seal stamper (`drag="x"`, `dragConstraints={{ left: 0, right: 140 }}`).
  - Right: Crimson silk ribbon with melted warm wax circle.
  - Tracking: `onDrag` updates `stampProgress`. When dragged > 55%, snaps into place, sets `isSealed = true`, plays `clasp-open` and `tape-click`, and displays a gleaming golden seal.

- [ ] **Step 3: Trigger Final Whiteout Lock**
  After `isSealed` is triggered, pulse single guidance pill (`🔒 Lembaran tersegel abadi... Menutup kenangan.`), and after 750ms call `onFinalLock()` to activate the whiteout closure in `src/app/page.js`.

---

### Task 3: Build Verification & Commit

**Files:**
- Modify: `src/components/segments/Segment8Closing.js`
- Update: `walkthrough.md`

- [ ] **Step 1: Run production build**
  Execute `npm run build` in PowerShell. Verify exit code 0.

- [ ] **Step 2: Commit changes to git**
  Stage and commit with message `feat(segment-8): multi-stage letter pull and tactile wax seal closing ritual`.
