# Architecture — Carto Field Trainer

## Flow

`data/training.json` supplies course navigation, exercise values, and reusable examples while `data/module-lessons.json` owns deeper lesson copy → `app/page.tsx` renders the lightweight doorway → `app/modules/[slug]/page.tsx` resolves a lesson and metadata → the shared module shell composes narrative and domain-specific exercise components → Stagecraft layers establish the visual system.

## Owned surfaces

| Path | Purpose | Safe changes |
|---|---|---|
| `data/training.json` | Exercise prompts, target coordinates, and lesson copy | Add or correct beginner exercises without changing UI logic |
| `data/module-lessons.json` | Per-module objectives, explanations, mistakes, drills, and summaries | Deepen an approved lesson without changing route logic |
| `app/page.tsx` | Lightweight course doorway and module discovery | Keep orientation concise; link rather than duplicate lessons |
| `app/modules/[slug]/page.tsx` | Dynamic module routing and per-page metadata | Resolve approved slugs and preserve social metadata boundaries |
| `components/course/ModuleShell.tsx` | Shared module header, rail, narrative, and previous/next navigation | Improve every lesson's structure consistently |
| `components/course/ModuleContent.tsx` | Domain-specific diagrams, exercises, and examples per module | Change one module's teaching surface without affecting others |
| `components/course/GridLab.tsx` | Four-figure grid practice state and answer checking | Add grid targets or feedback paths |
| `components/course/CourseLabs.tsx` | Contour, scale, compass, and field-card interactions | Add small exercises within the approved syllabus |
| `components/course/CourseVisuals.tsx` | Precision and elevation/effort charts with text summaries | Adjust verified synthetic datasets or chart annotations |
| `components/course/TopoMap.tsx` | Accessible synthetic map SVG and its layers | Change the training sheet geometry while preserving answer coordinates |
| `app/trainer.css` | Original grid, contour, and field-card composition | Maintain the exercise surfaces using existing Stagecraft tokens |
| `app/trainer-course.css` | Expanded course, chart, module, and responsive composition | Maintain foundation-course layout using existing Stagecraft tokens |
| `app/module.css` | Shared doorway and deeper module-page composition | Maintain route-level layout and responsive reading flow |
| `app/stagecraft/` | Owned Stagecraft v2 design-system copy | Sync deliberately from the source repo; preserve layer order and contracts |
| `app/globals.css` | CSS load order | Keep Stagecraft imports in documented order |
| `app/layout.tsx` | Site metadata and root document | Metadata and site-wide accessibility only |

## Constraints

- Four-figure references name a square by its left easting and bottom northing: read right, then up.
- North is at the top of the synthetic training map; the course distinguishes grid, true, and magnetic north for compass work.
- Numeric precision examples are nominal grid-square sizes, not a claim of survey or device accuracy.
- Scale, declination, datum/grid, contour interval, sheet date, and legend are treated as map-specific marginal information.
- Feedback is expressed in text and shape, never colour alone.
- The page remains usable without animation and at narrow widths.
- This is a fundamentals trainer, not a substitute for an official map, compass course, or field safety instruction.

## Validation

Run `npm run build`. Verify `/`, `/modules/grid-references`, `/modules/north-compass`, and `/modules/foundation-check`; then exercise one wrong and one correct grid answer, toggle a map layer, answer the contour comparison, verify both scale conversions, change the bearing control, complete/reset the field card, inspect both charts without hover, and confirm module navigation remains readable at phone width.
