# Decisions

A running log of technical and product choices made during this project and why.

## Tech stack

**React + Vite**
Chosen over Create React App because Vite is faster, more modern, and better supported going forward. Intermediate-friendly and matches Kay's frontend background from Turing.

**Anthropic JS SDK**
Direct SDK calls from the frontend to start — no backend needed for local development. Keeps the project simple while still teaching real API usage patterns.

**No backend (Phase 1)**
API key stored in `.env` locally via `VITE_ANTHROPIC_API_KEY`. This is fine for a personal dev project. If this ever gets deployed publicly, a backend proxy would be needed to protect the key.

**No UI component library**
Keeping it plain React + CSS to start so the focus stays on the AI layer, not on learning a design system. Can add Tailwind or shadcn later.

## Product decisions

**Age range as a parent-selected input**
Rather than hardcoding age buckets, parents pick their child's age range (e.g. 1–2, 2–3, 3–4, 4–5). This makes both the activity generator and the world explorer more accurate and useful.

**Three separate tabs/modes**
Activity Generator, World Explorer, and Recipes are distinct enough in input and output that they work better as separate experiences than a single combined interface.

**World Explorer returns a story, not just an explanation**
A plain explanation is useful but a short personalized story is memorable and fun. The story wraps the explanation so kids can engage with it directly.

## Open questions

- Should the app remember the child's age range across sessions (localStorage) or ask every time?
- Should recipes take into account dietary restrictions? (probably yes in a later phase)
- Is there a phase 4? (saving favorites, sharing activities with other parents?)
