# Decisions — Carto Field Trainer

## D-001 — Day-one scope

The first release teaches four-figure grid references, contour spacing, map orientation, and a basic route-check routine. It does not teach six- or eight-figure references, magnetic declination calculations, GPS workflows, or backcountry safety certification.

**Change rule:** advanced precision or safety-critical instruction requires a separately reviewed lesson, not another paragraph on this page.

## D-002 — Practice before exposition

The first viewport is a working map exercise. Explanations stay beside the action and reveal the rule needed for the current task.

**Change rule:** a new concept needs an observable learner action and feedback state; prose alone is not a lesson.

## D-003 — Stagecraft v2 is the visual source

The tool carries an owned copy of `C:\projects\reference\stagecraft-v2\styles`. Its Drafting Paper palette, local fonts, namespaced components, and motion rules remain intact. Product-specific layout lives in `app/trainer.css` and uses Stagecraft tokens.

**Change rule:** colour, duration, radius, and shadow values stay in the Stagecraft token layer. No silent fork of the donor styles.

## D-004 — Local progress only

Practice state is held in the page session. There is no account, cloud storage, or personal-location data.

**Change rule:** persistence or identity is a capability expansion and must be explicitly approved.

## Change log

- 2026-08-31 — Initial Day 1 lesson architecture and Stagecraft v2 adoption recorded before implementation.
- 2026-08-31 — Reworded one nested comment in the owned `base.css` copy so the Sites PostCSS pipeline can parse it. No selector or rendered behaviour changed.
- 2026-08-31 — Routed the owned Stagecraft fonts through `/public/fonts` because PostCSS flattens the imported stylesheet. This preserves the self-hosted type decision in the Sites build.
