---
name: "LexaMate"
category: Brands
surface: web
colors:
  background: "#f8fafc"
  surface: "#ffffff"
  foreground: "#0f172a"
  muted: "#64748b"
  border: "#e2e8f0"
  accent: "#2563eb"
  accent-secondary: "#3080ff"
---

# LexaMate

> Category: Brands

> Surface: web

Master English through YouTube videos with dictation, shadowing, speaking practice, and vocabulary building. Light up your English with Lexa.

## Color Palette

| Role | Name | Hex | Usage |
| --- | --- | --- | --- |
| background | Background (Light) | `#f8fafc` | Page canvas / app foundation (`bg-slate-50`) |
| surface | Surface | `#ffffff` | Cards, practice workspace, raised surfaces (`bg-white`) |
| foreground | Foreground | `#0f172a` | Primary body text, headings, scores (`text-slate-900`) |
| muted | Muted | `#64748b` | Secondary text, metadata, inactive stepper items (`text-slate-500`) |
| border | Border | `#e2e8f0` | Column dividers, container outlines (`border-slate-200`) |
| border-subtle | Border subtle | `#f1f5f9` | Card inner borders, divider lines (`border-slate-100`) |
| accent | Accent | `#2563eb` | Primary brand color, CTA buttons, active state (`blue-600`) |
| accent-secondary | Accent secondary | `#3080ff` | Secondary brand color, links, active pills (`blue-500`) |
| accent-soft | Accent soft | `#eff6ff` | Active sentence background, subtle tags (`blue-50`) |
| success | Success / Passed | `#10b981` | Completed sentence checkmarks (`✓`), accurate words (`emerald-500`) |
| danger | Danger / Error | `#ef4444` | Recording status indicator, mispronounced words (`✕`) (`rose-500`) |
| warning | Warning / Alert | `#f59e0b` | Needs practice alert badge (`!`), review items (`amber-500`) |
| ai-coach | AI Coach / Equalizer | `#6366f1` | Live microphone waveform, AI phonetic tips (`indigo-500`) |
| media-canvas | Media Canvas | `#000000` | Video player container, zero letterbox media canvas |

## Dark Mode Palette

Applied via `dark:` variant (Tailwind v4). Surface uses the slate scale.
Accent brightens one step (`blue-600` → `blue-400`) so it clears WCAG AA on
dark backgrounds. Muted text uses the gray scale (not slate) to match actual
codebase usage.

| Role | Name | Hex | Usage |
| --- | --- | --- | --- |
| background | Background (Dark) | `#0f172a` | page canvas (`dark:bg-slate-900`) |
| surface | Surface (Dark) | `#1e293b` | cards, practice workspace (`dark:bg-slate-800`) |
| surface-raised | Surface raised (Dark) | `#334155` | elevated cards (`dark:bg-slate-700`) |
| foreground | Foreground (Dark) | `#ffffff` | primary body text, headings (`dark:text-white`) |
| muted | Muted (Dark) | `#9ca3af` | secondary text, metadata (`dark:text-gray-400`) |
| border | Border (Dark) | `#334155` | column dividers, container outlines (`dark:border-slate-700`) |
| border-subtle | Border subtle (Dark) | `#1e293b` | card inner borders, divider lines (`dark:border-slate-800`) |
| accent | Accent (Dark) | `#3b82f6` | links, active pills, secondary actions (`dark:text-blue-400`) |
| accent-soft | Accent soft (Dark) | `#1e3a8a` | active sentence background, subtle highlights (`dark:bg-blue-900`) |
| success | Success / Passed (Dark) | `#34d399` | completed sentence checkmarks, accurate words (`dark:text-emerald-400`) |
| danger | Danger / Error (Dark) | `#fb7185` | recording indicator, mispronounced words (`dark:text-rose-400`) |
| warning | Warning / Alert (Dark) | `#fbbf24` | needs-practice alert badge (`dark:text-amber-400`) |

## Typography
- **Display:** Be Vietnam Pro — weights 400, 600, 700 — fallbacks: Inter, system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif
- **Body:** Be Vietnam Pro — weights 400, 500, 600, 700 — fallbacks: Inter, system-ui, -apple-system, Segoe UI, Helvetica Neue, Arial, sans-serif
- **Monospace:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace — weights 400, 700 (for IPA phonetic transcriptions, audio timestamps, and waveforms)

### Typographic Hierarchy
1. **Target Sentence Headline**: `text-xl` to `text-2xl`, `font-bold`, `leading-tight`, `text-slate-900`
2. **Section Titles / Mode Tabs**: `text-xs` to `text-sm`, `font-bold` / `font-black`, `text-slate-900`
3. **Card Body**: `text-xs` to `text-sm`, `font-medium`, `leading-relaxed`
4. **Micro-Labels & Status**: `text-[9px]` to `text-[10px]`, `font-black`, `uppercase`, `tracking-widest`
5. **IPA Transcription**: `font-mono`, `text-[10px]` to `text-[11px]`, `font-bold`
6. **Translation**: `italic`, `text-xs`, `text-slate-500`

## Voice & Tone

- **Adjectives:** Encouraging, Methodical, Focused, Distraction-free, Precise, High-Efficiency
- **Tone:** A friendly, objective, and supportive AI language coach. Clear, concise, and actionable feedback without condescending hype or unnecessary friction.

### Messaging pillars
- **Active Listening & Shadowing**: Master spoken English step-by-step through real YouTube video chunks and native acoustic imitation.
- **Granular Acoustic Feedback**: Micro-feedback with word-level accuracy diffs, target IPA notations, and personalized AI coaching tips.
- **Frictionless Keyboard Ergonomics**: Keep hands on the keyboard and eyes on the video (`Space` to record/stop/retry, `Enter` to advance).

### Vocabulary
- **Use:** Shadowing, Dictation, Chunk, Target Sentence, Native Speaker, Accuracy, IPA, Pronunciation, Practice, Loop, Try Again.
- **Avoid:** Supercharge, Revolutionary, Gamified points jargon, Exam cramming, Overwhelming theoretical grammar.

## Imagery

- **Style:** Clean, minimal, modern EdTech UI with high-contrast typography and deliberate micro-interactions.
- **Subjects:** YouTube video lessons, live sound waveforms, phonetic IPA badges, circular score gauges.
- **Treatment:** 1px hairline borders (`border-slate-100` / `border-slate-200`), smooth scale and fade transitions (`motion/react`), soft elevation shadows (`shadow-sm`, `shadow-lg shadow-blue-100`).
- **Avoid:** Cluttered cartoon illustrations, arbitrary glowing neon shadows, low-contrast text.

## Layout

- **Radius:** 16px (cards, target sentence box), 12px (buttons, inputs), 8px (stepper pills, tool buttons), 9999px (circular recording triggers, badges)
- **Border weight:** 1px
- **Spacing:** 8px baseline grid (4px, 8px, 12px, 16px, 24px, 32px, 48px)

### Posture rules
- **Zero Global Scroll (`100vh`)**: Strict viewport height containment on desktop (optimized for MacBook 13–14" screens); outer window scrollbars are strictly eliminated (`overflow-hidden`).
- **2-Column Split Architecture**: 42% left column (Video player & synchronized transcript) / 58% right column (Interactive practice workspace).
- **Sticky Non-Overlapping Action Bar**: 56px (`h-14`) fixed footer at the bottom of the workspace; flex layout prevents any overlap with dynamic workspace results.
- **Isolated Overflow Scroll**: Internal scroll containers only (transcript list and word-by-word diffs) using hidden scrollbars (`no-scrollbar`).

---

## Screen Layout Specification

```
+-------------------------------------------------------------------------------+
|  TOP NAVIGATION BAR (Height: 48px / h-12)                                     |
|  [<-] A1 English Practice - Money    [Shadowing | Dictation | Summary]  [63%] |
+---------------------------------------+---------------------------------------+
|  LEFT COLUMN (42% Width)              |  RIGHT COLUMN (58% Width)             |
|  Source & Video Context               |  Interactive Practice Workspace       |
|                                       |                                       |
|  +---------------------------------+  |  +---------------------------------+  |
|  | VIDEO PLAYER (max-h: 220px)     |  |  | 1. TOOLBAR & STEPPER (~68px)    |  |
|  | 16:9, Speed & Loop Overlays     |  |  |    Sentence 2/60 [1✓](2)[3✓][4!]|  |
|  +---------------------------------+  |  +---------------------------------+  |
|  | TRANSCRIPT PANE (Scrollable)    |  |  | 2. TARGET SENTENCE CARD (~110px)|  |
|  | - AUTO-SCROLL ON Indicator      |  |  |    "Welcome to this lesson..." [🔊]|
|  | - Inactive lines (dimmed)       |  |  +---------------------------------+  |
|  | - Active card (blue border,     |  |  | 3. DYNAMIC WORKSPACE (min:230px)|  |
|  |   wave indicator, IPA, trans)   |  |  |    [Result Card OR Live Record] |  |
|  |                                 |  |  +---------------------------------+  |
|  |                                 |  |  | 4. STICKY ACTION BAR (56px)     |  |
|  |                                 |  |  |    [↺ Try Again]  [Next Step →] |  |
+---------------------------------------+---------------------------------------+
```

---

## Detailed Section Breakdown

### 1. Top Navigation Bar (`48px` / `h-12`)
- **Left**:
  - Compact rounded back button (`p-1.5`, hover transition).
  - Lesson Title (`text-xs font-black text-slate-900`) + Mode Indicator (`text-[9px] uppercase tracking-widest text-slate-400` with status dot).
- **Center**:
  - `ModeTabs`: Compact segmented pill container switching between **Shadowing**, **Dictation**, and **Summary**.
- **Right**:
  - Accuracy Pill: High-contrast `bg-blue-600 text-white` badge showing cumulative accuracy (`63% Accuracy`).
  - Settings Icon: Quick trigger for shortcut mappings and audio preferences.

### 2. Left Column: Video Context & Synchronized Transcript (42% Width)
- **Video Player Container**:
  - 16:9 native ratio with `max-h-[220px]`.
  - Media Canvas: Pure black background (`bg-black`), zero letterbox bars.
  - Floating controls: Speed selector pills (`0.75x`, `1x`) and `A-B LOOP` trigger.
- **Transcript Feed (`TranscriptPane`)**:
  - Header: Status badge showing `AUTO-SCROLL ON`.
  - Inactive Lines: `opacity-50`, subtle hover state (`hover:bg-slate-50`), timestamp pill (`text-[10px] font-mono text-slate-400`).
  - Active Line Card (Sentence 2): Highlighted border (`border-blue-500`), soft blue fill (`bg-blue-50`), animated 3-bar audio wave indicator, speaker icon (`Volume2`), IPA pronunciation guide, Vietnamese translation, and `[▶ Listen to chunk]` button.

### 3. Right Column: Interactive Practice Workspace (58% Width)
- **Section 1: Header Toolbar & Number Stepper (~68px)**:
  - Contextual title: `Shadowing (Sentence 2/60)`.
  - Utility cluster: `[⇄ LOOP (5)]`, `[SPEED 1X ▾]`, `[🔊 Audio Chunk]`.
  - Number Stepper: Horizontal scrolling row of compact numbered pills (`h-7 min-w-[28px]`):
    - `[1 ✓]`: Passed (`bg-emerald-50 text-emerald-600 border-emerald-100`).
    - `( 2 )`: Current Active (`bg-blue-600 text-white shadow-md`).
    - `[3 ✓]`: Passed (`bg-emerald-50 text-emerald-600 border-emerald-100`).
    - `[4 !]`: Needs Practice (`bg-amber-50 text-amber-600 border-amber-100`).
    - `[5] ... [60]`: Unvisited (`bg-slate-100 text-slate-400 border-slate-200`).
- **Section 2: Compact Target Sentence Card (~110px)**:
  - Prominent `text-xl font-bold text-slate-900 leading-tight`.
  - Top-right utilities: Native Replay `[🔊]`, Blind Shadowing text toggle `[👁]`, Phonetic Details `[Aa]`.
- **Section 3: Dynamic Workspace Area (Min-Height: `230px`)**:
  - **Evaluation & Result View**:
    - Row 1: SVG Circular Progress Ring (63% Accuracy) + side-by-side audio controls (`[▶ Native]` vs. `[▶ User Audio: 12-bar mini equalizer | 0:08]`).
    - Row 2: Word-by-word accuracy chips (Emerald for correct, Rose for mispronounced with hover IPA tooltip).
    - Row 3: Subtle AI coaching tip banner (`bg-blue-50/30 text-xs text-slate-600` with sparkle icon).
  - **Active Recording View**:
    - Status header: Blinking rose dot with timer (`● RECORDING... 0:04 / 0:10`).
    - Live 40-bar responsive audio waveform animated in vibrant indigo.
    - Large 80px circular rose stop button (`bg-rose-500 shadow-2xl shadow-rose-200`) with pulsing animation.
- **Section 4: Sticky Bottom Action Bar (56px / `h-14`)**:
  - Left: Secondary outline button `↺ Try Again (Space)` (enabled in Result state).
  - Right: Primary filled button `Next Sentence (Enter ↵) →` (`bg-blue-600 shadow-lg shadow-blue-100`).

---

## Keyboard Shortcuts

| Shortcut Key | Action | Context |
|--------------|--------|---------|
| `Space` | Start Recording / Stop Recording / Try Again | Global Practice |
| `Enter ↵` | Advance to Next Sentence | Evaluation View |
| `Ctrl + Space` / `Cmd + Space` | Replay Native Audio Chunk | Workspace |
| `←` / `→` | Navigate Sentence Stepper | Practice Workspace |

---

## Animation & Motion Tokens (`motion/react`)

- **State Transitions**: `AnimatePresence mode="wait"` with subtle scale (`scale: 0.95 -> 1`) and opacity fades (`duration: 0.2s`).
- **Score Progress Ring**: Spring/ease-out SVG stroke animation (`duration: 1.5s`).
- **Live Recording Waveform**: Dynamic randomized bar height interpolation (`12px` to `92px`, `duration: 0.4s - 0.8s`).
- **Pulsing Badges**: CSS `@keyframes pulse` applied to recording dots and microphone active rings.
- **Button Micro-Interactions**: Active press scaling (`active:scale-95`).

---

## Coding & Sync Rules (From `AGENTS.md`)

- **Component Reference Library**: Never add page router libraries (`react-router`) or heavy backend servers to this workspace.
- **Tailwind Version**: Tailwind CSS v4 (`@tailwindcss/vite`). Use utility classes directly.
- **State Management**: Local React state / Zustand stores (`src/stores/`).
- **Icon Library**: Exclusively `lucide-react`. Custom inline SVG icons are prohibited.
- **One-Way Production Sync**: Changes in this repository are pulled into `fe-v2` via `npm run sync-from-v2`.
