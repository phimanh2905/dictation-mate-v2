# DICTATION-MATE-V2 (AI STUDIO REFERENCE) - AGENTS.md

**Generated:** 2026-06-09
**Commit:** eeb9006 | **Branch:** main

## OVERVIEW
AI Studio reference UI for production frontend (fe-v2/). Source of truth for UI components, synced via `npm run sync-from-v2`.

## STRUCTURE
```
dictation-mate-v2/
├── src/
│   ├── components/         # UI components (React)
│   ├── pages/              # Page-level components
│   ├── services/           # API service layer
│   ├── stores/             # Zustand stores
│   ├── hooks/              # Custom hooks
│   ├── utils/              # Utilities
│   └── types/              # TypeScript types
├── index.html              # Entry HTML
└── vite.config.ts          # Vite config
```

## WHERE TO LOOK
| Task | Location |
|------|----------|
| UI Components | `src/components/` |
| Pages | `src/pages/` |
| State | `src/stores/` |
| API | `src/services/` |

## CONVENTIONS
- **React + Vite**: Same stack as fe-v2 (React 19, Vite 6)
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Components**: Pure presentational components
- **No routing**: This is a component library, not a full app

## ANTI-PATTERNS (V2)
- NEVER add routing — this is a component reference
- NEVER add backend integration — components only
- NEVER commit built output — source only
- NEVER modify synced files directly — edit here, sync to fe-v2

## SYNC WORKFLOW
```bash
# In fe-v2/
npm run check-v2-updates    # Check what's new
npm run sync-from-v2        # Interactive sync from this directory
```

## NOTES
- **Source of truth**: UI designs created in AI Studio, exported here
- **One-way sync**: v2 → fe-v2 (never reverse)
- **fe-v2 is production**: This is reference only
- **Components**: Designed for copy-paste into fe-v2