'use client';

import { Check, Compass, Layers3, Map, Mountain, Navigation, RotateCcw, Ruler, Route } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import training from '@/data/training.json';

type LayerKey = 'contours' | 'water' | 'trail';

const eastings = ['31', '32', '33', '34', '35', '36', '37'];
const northings = ['54', '53', '52', '51', '50', '49', '48'];

export default function Home() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [easting, setEasting] = useState('');
  const [northing, setNorthing] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [completed, setCompleted] = useState<string[]>([]);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    contours: true,
    water: true,
    trail: true,
  });
  const [contourAnswer, setContourAnswer] = useState('');
  const [contourChecked, setContourChecked] = useState(false);
  const [routineChecks, setRoutineChecks] = useState<boolean[]>(
    () => training.fieldRoutine.map(() => false),
  );

  const exercise = training.gridExercises[exerciseIndex];
  const progress = Math.round((completed.length / training.gridExercises.length) * 100);
  const answer = `${exercise.easting}${exercise.northing}`;
  const statusText = useMemo(() => {
    if (feedback === 'correct') return `Correct — ${answer}. Right ${exercise.easting}, then up ${exercise.northing}.`;
    if (feedback === 'incorrect') return 'Not yet. Start at the left edge: easting first, northing second.';
    return 'Enter the two numbers that name the target square.';
  }, [answer, exercise.easting, exercise.northing, feedback]);

  function checkAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const correct = easting.trim() === exercise.easting && northing.trim() === exercise.northing;
    setFeedback(correct ? 'correct' : 'incorrect');
    if (correct) setCompleted((items) => (items.includes(exercise.id) ? items : [...items, exercise.id]));
  }

  function nextTarget() {
    setExerciseIndex((index) => (index + 1) % training.gridExercises.length);
    setEasting('');
    setNorthing('');
    setFeedback('idle');
  }

  function toggleLayer(layer: LayerKey) {
    setLayers((current) => ({ ...current, [layer]: !current[layer] }));
  }

  function checkContours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContourChecked(true);
  }

  function toggleRoutine(index: number) {
    setRoutineChecks((items) => items.map((item, itemIndex) => (itemIndex === index ? !item : item)));
  }

  return (
    <>
      <a className="sc-skip" href="#practice">Skip to practice</a>
      <header className="sc-bar">
        <div className="sc-bar-in">
          <a className="sc-mark" href="#top">Grid<b>line</b> / Day 01</a>
          <nav className="sc-nav" aria-label="Lesson sections">
            <a href="#practice">Grid</a>
            <a href="#contours">Contours</a>
            <a href="#field">Field card</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="trainer-intro sc-wrap" aria-labelledby="page-title">
          <div>
            <p className="sc-label sc-label--rule">Map navigation / first principles</p>
            <h1 id="page-title">Read the ground.<br /><span>Find your square.</span></h1>
          </div>
          <div className="trainer-intro-note sc-copy sc-copy--muted">
            <p><strong>Today’s rule:</strong> read grid references right, then up. Four figures identify one square—not an exact point.</p>
          </div>
        </section>

        <section id="practice" className="trainer-practice sc-wrap" aria-labelledby="practice-title">
          <div className="trainer-map-panel sc-card sc-card--raised">
            <div className="trainer-map-head">
              <div>
                <p className="sc-card-kicker">Exercise {exerciseIndex + 1} / {training.gridExercises.length}</p>
                <h2 id="practice-title" className="sc-card-title">Locate: {exercise.label}</h2>
              </div>
              <div className="trainer-north" aria-label="North is at the top of the map">
                <Compass aria-hidden="true" />
                <span>N</span>
              </div>
            </div>

            <div className="trainer-layer-bar" aria-label="Map layers">
              <span className="sc-label"><Layers3 aria-hidden="true" /> Layers</span>
              {(['contours', 'water', 'trail'] as LayerKey[]).map((layer) => (
                <button
                  className="sc-chip"
                  type="button"
                  aria-pressed={layers[layer]}
                  onClick={() => toggleLayer(layer)}
                  key={layer}
                >
                  {layer}
                </button>
              ))}
            </div>

            <TopoMap layers={layers} target={exercise} />
            <p className="trainer-map-caption"><Map aria-hidden="true" /> Training sheet MT-01 · north at top · grid interval: 1 km</p>
          </div>

          <aside className="trainer-answer sc-card" aria-label="Grid reference answer">
            <p className="sc-label sc-label--rule">Your fix</p>
            <div className="trainer-target-mark" aria-hidden="true">{exercise.symbol}</div>
            <h3>{exercise.label}</h3>
            <p className="sc-copy--muted">{exercise.clue}</p>

            <form onSubmit={checkAnswer} className="trainer-form">
              <fieldset>
                <legend className="sc-input-label">Four-figure reference</legend>
                <div className="trainer-coordinate-inputs">
                  <label>
                    <span>Easting / right</span>
                    <input
                      className="sc-input"
                      inputMode="numeric"
                      maxLength={2}
                      pattern="[0-9]{2}"
                      value={easting}
                      onChange={(event) => setEasting(event.target.value.replace(/\D/g, ''))}
                      aria-describedby="answer-status"
                      placeholder="00"
                    />
                  </label>
                  <span className="trainer-join" aria-hidden="true">→</span>
                  <label>
                    <span>Northing / up</span>
                    <input
                      className="sc-input"
                      inputMode="numeric"
                      maxLength={2}
                      pattern="[0-9]{2}"
                      value={northing}
                      onChange={(event) => setNorthing(event.target.value.replace(/\D/g, ''))}
                      aria-describedby="answer-status"
                      placeholder="00"
                    />
                  </label>
                </div>
              </fieldset>

              <div className={`trainer-feedback trainer-feedback--${feedback}`} id="answer-status" role="status">
                {feedback === 'correct' ? <Check aria-hidden="true" /> : <span aria-hidden="true">{feedback === 'incorrect' ? '×' : 'i'}</span>}
                <p>{statusText}</p>
              </div>

              <div className="trainer-actions">
                <button className="sc-btn sc-btn--primary" type="submit">Check reference</button>
                <button className="sc-btn sc-btn--outline" type="button" onClick={nextTarget}>
                  <RotateCcw aria-hidden="true" /> Next target
                </button>
              </div>
            </form>

            <div className="trainer-progress">
              <div className="trainer-progress-copy">
                <span className="sc-label">Day 1 progress</span>
                <strong>{completed.length} / {training.gridExercises.length}</strong>
              </div>
              <div className="sc-meter" role="progressbar" aria-label="Grid exercises completed" aria-valuemin={0} aria-valuemax={training.gridExercises.length} aria-valuenow={completed.length}>
                <span className="sc-meter-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </aside>
        </section>

        <section id="contours" className="trainer-chapter sc-wrap" aria-labelledby="contours-title">
          <div className="trainer-chapter-head">
            <div>
              <p className="sc-label sc-label--rule">02 / Read relief</p>
              <h2 id="contours-title">Contours turn lines into land.</h2>
            </div>
            <p className="sc-lede"><strong>Close lines = steep ground.</strong> Wide spacing = a gentler slope. Each line joins points at the same height.</p>
          </div>

          <form className="trainer-contour-card sc-card sc-card--raised" onSubmit={checkContours}>
            <fieldset>
              <legend>
                <span className="sc-label">Quick check</span>
                <strong>Which hillside is steeper?</strong>
              </legend>
              <div className="trainer-contour-options">
                <ContourOption
                  id="slope-a"
                  label="Hillside A"
                  spacing="wide"
                  selected={contourAnswer === 'A'}
                  onSelect={() => { setContourAnswer('A'); setContourChecked(false); }}
                />
                <ContourOption
                  id="slope-b"
                  label="Hillside B"
                  spacing="tight"
                  selected={contourAnswer === 'B'}
                  onSelect={() => { setContourAnswer('B'); setContourChecked(false); }}
                />
              </div>
            </fieldset>
            <div className="trainer-contour-action">
              <button className="sc-btn sc-btn--primary" type="submit" disabled={!contourAnswer}>Check slope</button>
              <div className={`trainer-feedback trainer-feedback--${!contourChecked ? 'idle' : contourAnswer === 'B' ? 'correct' : 'incorrect'}`} role="status">
                {!contourChecked ? <span aria-hidden="true">i</span> : contourAnswer === 'B' ? <Check aria-hidden="true" /> : <span aria-hidden="true">×</span>}
                <p>{!contourChecked ? 'Choose a hillside, then check your read.' : contourAnswer === 'B' ? 'Correct. The same height change is compressed into less horizontal distance.' : 'Look again at the gaps. Wider spacing means the rise is spread over more ground.'}</p>
              </div>
            </div>
          </form>
        </section>

        <section className="trainer-carto sc-wrap" aria-labelledby="carto-title">
          <div className="trainer-carto-copy">
            <p className="sc-label sc-label--rule">03 / Read the sheet</p>
            <h2 id="carto-title">Cartography is a visual language.</h2>
            <p className="sc-lede">Before planning a route, locate the map’s scale, north arrow, grid, legend, and contour interval. Symbols only mean what that map’s legend says they mean.</p>
          </div>
          <div className="trainer-principles">
            <article className="sc-card">
              <Ruler aria-hidden="true" />
              <p className="sc-card-kicker">Scale</p>
              <h3 className="sc-card-title">Distance on paper</h3>
              <p className="sc-card-desc">A 1 km grid square gives you a known distance. Curving paths are longer than straight-line measurements.</p>
            </article>
            <article className="sc-card">
              <Navigation aria-hidden="true" />
              <p className="sc-card-kicker">Orientation</p>
              <h3 className="sc-card-title">Map north to ground north</h3>
              <p className="sc-card-desc">Rotate the map, not your mental picture. Features should line up with what you can actually see.</p>
            </article>
            <article className="sc-card">
              <Mountain aria-hidden="true" />
              <p className="sc-card-kicker">Relief</p>
              <h3 className="sc-card-title">Shape before route</h3>
              <p className="sc-card-desc">Closed rings suggest hills; V-shapes often point uphill in valleys. Spacing tells you the slope.</p>
            </article>
          </div>
        </section>

        <section id="field" className="trainer-field sc-wrap" aria-labelledby="field-title">
          <div className="trainer-field-card sc-card sc-card--raised">
            <div className="trainer-field-title">
              <div>
                <p className="sc-label sc-label--rule">04 / Pocket routine</p>
                <h2 id="field-title">Orient → locate → plan → confirm.</h2>
              </div>
              <Route aria-hidden="true" />
            </div>
            <p className="sc-lede">Use this five-step rehearsal on a familiar, safe route with an appropriate current map.</p>
            <ol className="trainer-checklist">
              {training.fieldRoutine.map((item, index) => (
                <li key={item}>
                  <label>
                    <input type="checkbox" checked={routineChecks[index]} onChange={() => toggleRoutine(index)} />
                    <span className="trainer-check-n">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ol>
            <button className="sc-btn sc-btn--ghost" type="button" onClick={() => setRoutineChecks(training.fieldRoutine.map(() => false))}>
              <RotateCcw aria-hidden="true" /> Reset field card
            </button>
          </div>
          <aside className="sc-attention">
            <p className="sc-label">Training limit</p>
            <p>This Day 1 tool teaches map-reading concepts. It does not replace an official navigation course, local safety advice, or a current authoritative map.</p>
          </aside>
        </section>
      </main>

      <footer className="sc-foot">
        <div className="sc-foot-grid">
          <div>
            <p className="sc-mark">Grid<b>line</b></p>
            <p className="sc-copy--muted">A first-session map-reading trainer built on Stagecraft v2.</p>
          </div>
          <div>
            <p className="sc-label">Mnemonic</p>
            <p>Right, then up.</p>
          </div>
          <div>
            <p className="sc-label">Session goal</p>
            <p>Four clean grid fixes.</p>
          </div>
        </div>
        <div className="sc-colophon"><span>Day 01</span><span>Topography · grids · cartography</span></div>
      </footer>
    </>
  );
}

function ContourOption({
  id,
  label,
  spacing,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  spacing: 'wide' | 'tight';
  selected: boolean;
  onSelect: () => void;
}) {
  const lines = spacing === 'wide' ? [42, 96, 150, 204] : [90, 112, 134, 156];
  return (
    <label className="trainer-contour-option" htmlFor={id}>
      <input id={id} type="radio" name="slope" value={label} checked={selected} onChange={onSelect} />
      <span className="trainer-contour-figure" aria-hidden="true">
        <svg viewBox="0 0 320 240">
          {lines.map((y, index) => (
            <path key={y} d={`M18 ${y} C82 ${y - 18} 122 ${y + 22} 176 ${y} S266 ${y - 16} 302 ${y + 4}`} />
          ))}
        </svg>
      </span>
      <span className="trainer-contour-label"><strong>{label}</strong><small>{spacing === 'wide' ? 'Widely spaced lines' : 'Closely spaced lines'}</small></span>
    </label>
  );
}

function TopoMap({
  layers,
  target,
}: {
  layers: Record<LayerKey, boolean>;
  target: (typeof training.gridExercises)[number];
}) {
  return (
    <div className="trainer-map-wrap">
      <svg className="trainer-map" viewBox="0 0 720 640" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Topographic grid practice map</title>
        <desc id="map-desc">A six by six map grid with contour lines, a stream, a trail, and a red target marking the current feature.</desc>
        <rect className="map-paper" x="70" y="40" width="540" height="540" />

        {layers.contours && (
          <g className="map-contours" aria-label="Contour lines">
            <ellipse cx="215" cy="135" rx="118" ry="82" />
            <ellipse cx="215" cy="135" rx="88" ry="60" />
            <ellipse cx="215" cy="135" rx="54" ry="36" />
            <path d="M87 486 C160 420 236 434 287 475 S401 545 482 498 S574 392 598 335" />
            <path d="M86 526 C177 463 240 485 302 521 S420 574 508 526 S586 426 602 390" />
            <path d="M336 82 C400 55 511 72 572 128 S616 258 555 285 S416 280 372 229 S294 101 336 82Z" />
            <path d="M373 113 C432 86 512 103 548 150 S571 225 528 249 S431 245 399 207 S339 132 373 113Z" />
          </g>
        )}

        {layers.water && (
          <g className="map-water" aria-label="Watercourse">
            <path d="M505 42 C470 116 528 154 492 224 S515 344 461 405 S428 522 386 578" />
            <path d="M468 283 C430 291 414 315 399 348" />
          </g>
        )}

        {layers.trail && (
          <g className="map-trail" aria-label="Trail">
            <path d="M82 427 C179 394 246 374 318 326 S420 226 493 196 S566 172 604 148" />
          </g>
        )}

        <g className="map-grid" aria-hidden="true">
          {Array.from({ length: 7 }, (_, index) => (
            <line key={`v-${index}`} x1={70 + index * 90} y1="40" x2={70 + index * 90} y2="580" />
          ))}
          {Array.from({ length: 7 }, (_, index) => (
            <line key={`h-${index}`} x1="70" y1={40 + index * 90} x2="610" y2={40 + index * 90} />
          ))}
        </g>

        <g className="map-labels" aria-hidden="true">
          {eastings.map((value, index) => <text key={value} x={70 + index * 90} y="610">{value}</text>)}
          {northings.map((value, index) => <text key={value} x="42" y={45 + index * 90}>{value}</text>)}
          <text className="map-axis-label" x="640" y="610">E →</text>
          <text className="map-axis-label" x="20" y="24">N ↑</text>
        </g>

        <g className="map-target" transform={`translate(${target.mapX} ${target.mapY})`} aria-label={`${target.label} target`}>
          <circle r="21" />
          <path d="M-30 0 H30 M0 -30 V30" />
          <text y="5">{target.symbol}</text>
        </g>
      </svg>
    </div>
  );
}
