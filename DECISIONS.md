# Decisions — Carto Field Trainer

## D-001 — Foundation scope

The course now covers the complete beginner layer: sheet anatomy, four-/six-/eight-figure numeric grid precision, scale and distance, contours and terrain forms, the three norths, bearing concepts, route building, and safe rehearsal. It deliberately stops before advanced navigation, timed assessments, night movement, coordinate-system conversion, GPS workflows, and remote-travel qualification.

**Change rule:** advanced or safety-critical instruction requires a separately reviewed lesson, not another paragraph on this page.

## D-002 — Practice before exposition

The first viewport is a working map exercise. Explanations stay beside the action and reveal the rule needed for the current task.

**Change rule:** a new concept needs an observable learner action and feedback state; prose alone is not a lesson.

## D-003 — Stagecraft v2 is the visual source

The tool carries an owned copy of `C:\projects\reference\stagecraft-v2\styles`. Its Drafting Paper palette, local fonts, namespaced components, and motion rules remain intact. Product-specific layout lives in `app/trainer.css` and uses Stagecraft tokens.

**Change rule:** colour, duration, radius, and shadow values stay in the Stagecraft token layer. No silent fork of the donor styles.

## D-004 — Local progress only

Practice state is held in the page session. There is no account, cloud storage, or personal-location data.

**Change rule:** persistence or identity is a capability expansion and must be explicitly approved.

## D-005 — Canadian primary-source baseline

Claims about NTS map scales, colours, contours, orientation, grids, and magnetic declination are checked against Natural Resources Canada. Illustrated sheets and values are explicitly synthetic; the course links to the current official material.

**Change rule:** do not add a fixed local declination, universal symbol meaning, or field-safety claim without source review and a dated scope decision.

## D-006 — Visualizations teach a decision

The course uses compact visualizations for nominal grid precision and terrain effort. Each has an adjacent text conclusion and accessible summary; neither is used as decoration or as a substitute for the underlying rule.

**Change rule:** new charts need a named learning question and must work without hover.

## D-007 — Doorway plus deep module pages

The root route is a fast orientation surface, not the complete textbook. Eight stable `/modules/...` routes own the deeper instruction, exercises, examples, mistakes, drills, and forward path. A shared module shell keeps navigation and metadata consistent while each lesson retains its own teaching surface.

**Change rule:** substantial lesson content belongs to its module route. Keep the doorway concise and do not duplicate full explanations across routes.

## D-008 — Spoken grid references preserve the two halves

Numeric grid references are written as one even-length string and spoken one digit at a time, with a brief cadence break between the easting and northing halves. The lesson shows one fully worked, speakable cabin answer before asking for an unprompted answer. Formal radio procedure is outside this foundation explanation.

**Change rule:** keep the example focused on the answer shape. Add formal radio procedure only as a separately sourced lesson when explicitly needed.

## D-009 — Terminology follows the learner

Every lesson owns a short, authored sequence of term groups that appears in a collapsible follow-along window. The full glossary is alphabetical, searchable, and expands abbreviations. Definitions are written once in `data/glossary.json`; lesson-specific grouping and order live in `data/lesson-terms.json`, so lesson help and the index cannot silently disagree.

**Change rule:** define a new technical term in the glossary before using it in instructional content. Keep the lesson window short enough to function as a reference, not a second lesson.

## Change log

- 2026-08-31 — Initial Day 1 lesson architecture and Stagecraft v2 adoption recorded before implementation.
- 2026-08-31 — Reworded one nested comment in the owned `base.css` copy so the Sites PostCSS pipeline can parse it. No selector or rendered behaviour changed.
- 2026-08-31 — Routed the owned Stagecraft fonts through `/public/fonts` because PostCSS flattens the imported stylesheet. This preserves the self-hosted type decision in the Sites build.
- 2026-08-31 — Added a site-wide social card and bound its metadata to the verified production origin after the initial private deployment resolved that URL.
- 2026-08-31 — Expanded Day 1 into an eight-module beginner foundation; corrected the orientation lesson to distinguish grid, true, and magnetic north; added Canadian primary-source links, two teaching visualizations, scale/distance practice, terrain forms, bearing concepts, route construction, and a progressive field-practice plan.
- 2026-08-31 — Added a public-repository README so the validated course can be cloned and run independently of the temporary local preview.
- 2026-08-31 — Refactored the long course into a lightweight doorway and eight deeper, independently addressable module pages with shared navigation and lesson metadata.
- 2026-08-31 — Added a fully worked cabin answer, digit-by-digit speaking cadence, and visible four-, six-, and eight-figure answer shapes before the grid exercise.
- 2026-08-31 — Replaced overlapping hill contours with a valid connected lower contour and separate higher contours, added per-lesson collapsible term windows, and added the searchable course glossary.
- 2026-09-01 — Replaced framework-intercepted internal course links with native document navigation after the hosted runtime rendered destinations correctly but failed to follow clicks; disabled the conflicting framework-link lint rule for this intentional compatibility choice.
