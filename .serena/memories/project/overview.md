---
name: project/overview.md
description: Dictation Mate 2.0 - English learning platform with AI-powered practice modes
type: project
---

# Dictation Mate 2.0

## Project Purpose
A comprehensive English learning platform with:
- Topic-based content organization
- Virtual study rooms
- AI-powered practice modes (Dictation, Shadowing, Speaking)
- YouTube video integration for learning

## Tech Stack
- **Frontend**: React 19 + TypeScript + Vite 6
- **Styling**: TailwindCSS 4.1 with @tailwindcss/vite plugin
- **Animation**: Motion (Framer Motion successor)
- **Icons**: Lucide React
- **AI**: Google GenAI SDK (@google/genai)
- **Layout**: react-resizable-panels

## Project Structure
```
src/
├── components/
│   ├── library/        # Library page components (FolderSidebar, FilterTabs, VideoCards)
│   ├── practice/       # Practice mode components (Dictation, Shadowing, Speaking panels)
│   ├── create/         # Add video form components
│   ├── *.tsx           # Main page components (Home, Explore, Profile, etc.)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions (youtube.ts)
├── types.ts            # TypeScript type definitions
├── constants.ts        # Application constants
├── mockLibrary.ts      # Mock data for development
├── App.tsx             # Main application component
└── main.tsx            # Entry point
```

## Key Features
1. **Library Management**: Folder-based organization, filtering, sorting
2. **Practice Modes**:
   - Dictation: Type what you hear
   - Shadowing: Repeat after the video
   - Speaking: AI-powered speaking practice
3. **Study Room**: Virtual room for focused learning
4. **Statistics & Leaderboard**: Track progress and compete
5. **Video Management**: Add YouTube videos with CEFR level and topic tagging

## Development Commands
- `npm run dev` - Start dev server on port 3000
- `npm run build` - Production build
- `npm run lint` - TypeScript type checking (tsc --noEmit)
- `npm run clean` - Remove dist folder

## Important Notes
- Uses path alias `@/` pointing to root
- TailwindCSS 4 with new @tailwindcss/vite plugin
- HMR disabled in AI Studio environment (DISABLE_HMR)
- Requires GEMINI_API_KEY in environment
- Request microphone permissions for speaking mode
