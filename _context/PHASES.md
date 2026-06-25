# Phases

## Phase 1 — Activity Generator
**Status: up next**

The first thing to build. Teaches dynamic prompt construction and structured output.

### Inputs
- Child's age range (1-2, 2-3, 3-4, 4-5)
- Energy level (wild / medium / calm)
- Time available (15 min / 30 min / 1 hour / we've got all day)
- Indoor or outdoor
- Supplies available (freeform text — "we have paper, markers, a cardboard box")
- Solo or needs a parent

### Output
3 activity ideas, each with:
- Name
- Simple step-by-step instructions
- Why it's good for this age/energy level

### What you'll learn
How to take form inputs, inject them into a prompt template, and get Claude to return consistent structured output (JSON) that you can map to UI components.

---

## Phase 2 — World Explorer (What is THAT?)
**Status: planned**

Teaches multimodal input — sending an image + text to Claude and handling the response.

### Inputs
- Photo upload (or camera capture on mobile)
- Child's age range (carried over or re-selected)

### Output
- What the thing is (plain language identification)
- Age-appropriate explanation
- A short personalized story about it
- 3 follow-up questions to ask your toddler

### What you'll learn
How to convert an image to base64, include it in an API call alongside text, and work with Claude's vision capabilities. This is a meaningfully different pattern from Phase 1.

---

## Phase 3 — Kid-Friendly Recipes
**Status: planned**

Teaches context-aware generation — Claude reasons about constraints (what's available, toddler-friendly) to produce practical output.

### Inputs
- What's in the fridge / pantry (freeform text)
- How much time (quick / normal / I can actually cook tonight)
- Toddler mood (will eat anything / being picky today)

### Output
3 meal ideas, each with:
- Name
- Ingredients needed
- Simple instructions
- Toddler-friendly tip (how to serve it, how to involve them in making it)

### What you'll learn
How to write prompts that reason under constraints, and how output format instructions shape what Claude returns.
