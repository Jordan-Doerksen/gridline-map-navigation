# Architecture — Carto Field Trainer

## Flow

`data/training.json` supplies lesson copy, examples, reference values, and exercise coordinates → focused client components own one exercise domain each → `app/page.tsx` composes the course → Stagecraft layers establish the shared visual system → `app/trainer.css` composes only this product's map, course, and visualization layout.

## Owned surfaces

| Path | Purpose | Safe changes |
|---|---|---|
| `data/training.json` | Exercise prompts, target coordinates, and lesson copy | Add or correct beginner exercises without changing UI logic |
| `app/page.tsx` | Course order, navigation, static lesson composition | Reorder or add approved beginner modules |
| `components/course/GridLab.tsx` | Four-figure grid practice state and answer checking | Add grid targets or feedback paths |
| `components/course/CourseLabs.tsx` | Contour, scale, compass, and field-card interactions | Add small exercises within the approved syllabus |
| `components/course/CourseVisuals.tsx` | Precision and elevation/effort charts with text summaries | Adjust verified synthetic datasets or chart annotations |
| `components/course/TopoMap.tsx` | Accessible synthetic map SVG and its layers | Change the training sheet geometry while preserving answer coordinates |
| `app/trainer.css` | Original grid, contour, and field-card composition | Maintain the exercise surfaces using existing Stagecraft tokens |
| `app/trainer-course.css` | Expanded course, chart, module, and responsive composition | Maintain foundation-course layout using existing Stagecraft tokens |
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

Run `npm run build`. Then exercise one wrong and one correct grid answer, toggle a map layer, answer the contour comparison, verify both scale conversions, change the bearing control, complete/reset the field card, inspect both charts without hover, and confirm the page remains readable at a phone-width viewport.
