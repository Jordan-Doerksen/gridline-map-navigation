# Architecture — Carto Field Trainer

## Flow

`data/training.json` supplies lesson copy and exercise coordinates → `app/page.tsx` owns the learner state and renders the map → Stagecraft layers establish the shared visual system → `app/trainer.css` composes only this product's map and lesson layout.

## Owned surfaces

| Path | Purpose | Safe changes |
|---|---|---|
| `data/training.json` | Exercise prompts, target coordinates, and lesson copy | Add or correct beginner exercises without changing UI logic |
| `app/page.tsx` | Practice state, answer checking, accessible map markup | Add interactions that serve an approved lesson |
| `app/trainer.css` | Product composition and map-specific presentation | Layout using existing Stagecraft tokens |
| `app/stagecraft/` | Owned Stagecraft v2 design-system copy | Sync deliberately from the source repo; preserve layer order and contracts |
| `app/globals.css` | CSS load order | Keep Stagecraft imports in documented order |
| `app/layout.tsx` | Site metadata and root document | Metadata and site-wide accessibility only |

## Constraints

- Four-figure references name a square by its left easting and bottom northing: read right, then up.
- North is always the top of the training map.
- Feedback is expressed in text and shape, never colour alone.
- The page remains usable without animation and at narrow widths.
- This is a fundamentals trainer, not a substitute for an official map, compass course, or field safety instruction.

## Validation

Run `npm run build`. Then exercise one wrong and one correct grid answer, toggle a map layer, answer the contour comparison, and confirm the page remains readable at a phone-width viewport.
