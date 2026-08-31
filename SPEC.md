# Specification — Gridline Map Navigation Foundations

## Purpose

Turn the existing Day 1 grid-reference trainer into a complete beginner foundation for Canadian topographic map reading and introductory land navigation. The course should prepare a learner to arrive at formal instruction already fluent in the vocabulary, basic map operations, and safe practice habits.

## Learner outcome

After completing the course, a learner should be able to:

1. audit a map sheet for title/date, scale, legend, datum/grid, contour interval, and declination information;
2. read four-, six-, and eight-figure numeric grid references as square, 100 m, and 10 m precision respectively, speak them digit by digit in equal easting/northing halves, and avoid claiming survey accuracy;
3. convert common 1:50 000 and 1:250 000 paper distances to ground distance;
4. identify hills, depressions, valleys, spurs, ridges, saddles, and slope steepness from contours;
5. distinguish true, grid, and magnetic north and know that the map's current declination information governs conversion;
6. read and follow a bearing with a baseplate compass at a conceptual level;
7. build a simple route from handrails, checkpoints, an attack point, and a catching feature;
8. rehearse on a familiar safe route while checking position and conditions often.

## Course shape

- A lightweight course doorway introduces the sequence and links to eight independently addressable module pages.
- Each module page has a clear outcome, deeper explanation, worked example or visualization, learner action, common-error review, and next-module path.
- Each module page presents an authored, learning-order sequence of active terminology in a collapsible follow-along window; a robust alphabetical and searchable course glossary expands every abbreviation and consolidates the definitions.
- Lessons favour a rule, a visual explanation, and a quick learner action over uninterrupted long prose.
- Two or more compact data visualizations explain coordinate precision and terrain/route effort.
- Progress is session-local only; no account, location collection, or persistence.

## Accuracy sources

Primary Canadian references:

- Natural Resources Canada, **Topographic Maps: The Basics** — NTS scales, symbols, UTM grids, contours, and map distance.
- Natural Resources Canada, **National Topographic System Maps** — Canadian map conventions and colour meanings.
- Natural Resources Canada, **Orienting a Topographic Map** — orientation and the map-margin declination diagram.
- Natural Resources Canada, **Compass Bearings** — grid/magnetic distinction, bearings, and landmark-to-landmark following.

The page must link to these sources and clearly identify all illustrated sheets, terrain profiles, coordinates, and route metrics as synthetic training examples.

## Safety boundary

This is preparation, not qualification. It must not imply that a learner can safely navigate remote terrain from the website alone. Magnetic declination must never be hard-coded as a timeless local value. The learner must be directed to the current map margin or NRCan geomagnetic information, and field practice must begin on a familiar, permitted route with a companion and normal outdoor safety planning.

## Acceptance checks

- All eight outcomes above have a corresponding module or exercise.
- The root page remains a concise orientation surface; full lessons live at stable `/modules/...` routes.
- Every module route has distinct title/description metadata and previous/next navigation.
- Existing grid answers remain correct for the illustrated 1 km squares.
- The course states “right, then up” and distinguishes square identification from point precision.
- Spoken examples use individual digits with a brief easting/northing pause, and the learner sees one complete worked answer before the unprompted exercise.
- 1:50 000 is shown as 1 cm = 500 m; 1:250 000 as 1 cm = 2.5 km.
- Contours are described as equal-elevation lines; closer spacing means a steeper slope for the same contour interval.
- Synthetic contour drawings do not cross or overlap invalidly; adjacent rises use a connected outer contour and separated higher contours to show a saddle.
- Grid, true, and magnetic north are visually distinct and no fixed declination conversion is presented as universal.
- At least two visualizations have text equivalents.
- Keyboard, narrow-screen, reduced-motion, correct-answer, and incorrect-answer paths remain usable.
- A production build succeeds and the published course's main exercises are verified.
- The root route plus representative early, middle, and final module routes render successfully.

## Adversarial gap review

| Risk | Failure mode | Required guardrail |
|---|---|---|
| Precision overclaim | “Eight figures means I am accurate to 10 m” | Describe nominal grid-square precision, not measurement or device accuracy. |
| North confusion | Learner aligns a compass needle to grid lines without declination | Separate the three norths and point to current marginal data before conversion. |
| Scale confusion | Learner transfers 1:50 000 arithmetic to another scale | Put the scale beside every worked distance and make the calculator scale-selectable. |
| Symbol overgeneralization | Learner assumes synthetic symbols are universal | Repeat that the active map legend controls meaning. |
| Terrain oversimplification | V-shape rule is applied to every contour bend | Pair valley and spur explanations and treat shape plus surrounding relief as the evidence. |
| Unsafe transfer | Learner treats completion as field readiness | Keep the training-limit panel, safe-practice ladder, and official-source links visible. |
| Decorative charts | Visuals look impressive but teach nothing | Every chart must answer one course question and include an adjacent plain-language conclusion. |
