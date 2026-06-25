# Toddler Toolkit — Project Context for Claude

When I say "I want to work on toddler-toolkit", read this file first, then read the other files in this `_context` folder before doing anything else.

## What this project is

A React + Vite app for busy parents of toddlers. Three features powered by the Anthropic Claude API:
1. Activity Generator — suggests age-appropriate activities based on energy, time, supplies, location
2. World Explorer — identifies things in photos and explains them in toddler-friendly language with a story
3. Kid-Friendly Recipes — suggests meals based on what's in the fridge

Full details in `VISION.md`.

## Tech stack
- React + Vite
- Anthropic JS SDK (`@anthropic-ai/sdk`)
- No backend — API key via `.env` (`VITE_ANTHROPIC_API_KEY`)
- No UI component library (plain React + CSS)

## Project structure
```
toddler-toolkit/
  _context/           ← you are here
  src/
    App.jsx           ← tab switcher
    components/
      ActivityGenerator.jsx
      WorldExplorer.jsx
      Recipes.jsx
    lib/
      claude.js       ← all Anthropic API calls
  .env                ← API key (never committed)
  .gitignore
```

## Current status
Check `ROADMAP.md` for what's done and what's up next.

## Important decisions already made
Check `DECISIONS.md` before suggesting tech or product changes — some things have already been decided and reasoned through.

## How to help
- Always check current phase status in `PHASES.md` before writing code
- Keep API calls in `src/lib/claude.js` — not inline in components
- Prompts should request JSON output so components can map data cleanly to UI
- Never hardcode the API key — always use `import.meta.env.VITE_ANTHROPIC_API_KEY`
- When in doubt, keep it simple — this is a learning project as much as a product
