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

## Change log

- 2026-08-31 — Initial Day 1 lesson architecture and Stagecraft v2 adoption recorded before implementation.
- 2026-08-31 — Reworded one nested comment in the owned `base.css` copy so the Sites PostCSS pipeline can parse it. No selector or rendered behaviour changed.
- 2026-08-31 — Routed the owned Stagecraft fonts through `/public/fonts` because PostCSS flattens the imported stylesheet. This preserves the self-hosted type decision in the Sites build.
- 2026-08-31 — Added a site-wide social card and bound its metadata to the verified production origin after the initial private deployment resolved that URL.
- 2026-08-31 — Expanded Day 1 into an eight-module beginner foundation; corrected the orientation lesson to distinguish grid, true, and magnetic north; added Canadian primary-source links, two teaching visualizations, scale/distance practice, terrain forms, bearing concepts, route construction, and a progressive field-practice plan.
- 2026-08-31 — Added a public-repository README so the validated course can be cloned and run independently of the temporary local preview.
