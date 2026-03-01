# System Design

## Architecture Philosophy

The app is a **data capture layer and workflow executor**. It does not contain
AI. Instead, it tracks what happens — what was planned, what was actually eaten,
what got prepped, what didn't, what groceries were bought, what went to waste.

Periodically, that data gets analyzed offline (in Claude Code sessions or
similar) to identify patterns, friction points, and opportunities. The findings
get translated into updated workflows, adjusted defaults, and new suggestions
that are pushed back into the app.

This means the app stays simple and fast to build, while the system as a whole
gets smarter over time through a human-in-the-loop feedback cycle.

```
  +------------------+       +---------------------+
  |     App          |       |  Offline Analysis   |
  |                  |       |  (Claude sessions)  |
  |  - Track meals   | ----> |                     |
  |  - Track prep    |  data |  - Spot patterns    |
  |  - Track grocery |       |  - Find friction    |
  |  - Run workflows |       |  - Design changes   |
  |  - Surface plans | <---- |                     |
  |                  | config|                     |
  +------------------+       +---------------------+
```

## What the App Tracks

### Meal Log
- What was eaten (selected from plan or logged ad hoc)
- Meal source: home-cooked, brought to office, Cava, dad's cooking, other
- Simple satisfaction rating (would eat again / fine / not great)
- Optional notes

### Prep Log
- What was prepped and when
- Time spent
- What format: batch session, quick daily cook, smoothie, assembly only
- What was actually used vs what went to waste

### Grocery Log
- What was bought and when
- Store (for pattern recognition — Costco vs local grocery, etc.)
- What ran out before next shop
- What expired/was wasted

### Plan Adherence
- What the plan suggested vs what actually happened
- Not as a guilt metric — as signal for adjusting the plans to be more
  realistic

## What the App Executes

### Weekly Plan
- A default meal plan for the week, generated from the current set of meal
  archetypes and recipes
- Editable — swap meals, skip days, override anything
- Generates a grocery list from the plan

### Daily View
- Today's meals at a glance
- Prep steps if anything needs doing tonight for tomorrow
- Quick-log buttons for tracking

### Grocery List
- Derived from the weekly plan
- Addable manually
- Checkable while shopping
- Tracks pantry staples separately (things to keep stocked always)

### Recipes / Meal Archetypes
- A library of meals that fit the philosophy
- Tagged by attributes: prep time, one-pot, portable, batch-friendly, etc.
- Configurable — new ones get added as we discover what works

## Evolution Model

The system improves through a deliberate cycle:

1. **Use the app for a period** (1-2 weeks minimum to get real data)
2. **Export/review the data** in an offline session
3. **Identify what's working and what's not**
   - "You planned dal 3 times but only made it once — is the recipe too long?"
   - "You brought lunch Mon/Tue but not Wed-Fri — what changed mid-week?"
   - "Grocery trips happened every 10 days but food ran out by day 6"
4. **Adjust the system** — update meal archetypes, change default plans, tweak
   prep workflows, adjust grocery list templates
5. **Push changes into the app** as updated config/data
6. **Repeat**

No single iteration needs to be perfect. The system earns trust by getting
incrementally better at matching reality.
