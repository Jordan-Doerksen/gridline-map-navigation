'use client';

import { Check, RotateCcw, Route, ScanSearch } from 'lucide-react';
import { SyntheticEvent, useState } from 'react';
import training from '@/data/training.json';

export function AuditLab() {
  const [checks, setChecks] = useState<boolean[]>(() => training.mapAudit.map(() => false));
  const complete = checks.filter(Boolean).length;
  return (
    <div className="trainer-audit-lab sc-card sc-card--raised">
      <div className="trainer-field-title"><div><p className="sc-label sc-label--rule">Active audit</p><h3>Find it on a real sheet.</h3></div><ScanSearch aria-hidden="true" /></div>
      <p className="sc-card-desc">Do not check from memory. Put a current topographic map beside the lesson and point to the information before marking each item.</p>
      <div className="trainer-progress-copy"><span className="sc-label">Margin groups found</span><strong>{complete} / {checks.length}</strong></div>
      <progress className="trainer-native-progress" aria-label="Map margin groups found" max={checks.length} value={complete}>{complete} of {checks.length}</progress>
      <ul className="trainer-audit-checks">
        {training.mapAudit.map((item, index) => <li key={item.label}><label aria-label={`Found ${item.label} information`}><input type="checkbox" checked={checks[index]} onChange={() => setChecks((values) => values.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span><strong>{item.label}</strong><small>{item.detail}</small></span></label></li>)}
      </ul>
      <button className="sc-btn sc-btn--ghost" type="button" onClick={() => setChecks(training.mapAudit.map(() => false))}><RotateCcw aria-hidden="true" /> Reset audit</button>
    </div>
  );
}

export function ScaleLab() {
  const [scaleValue, setScaleValue] = useState(50000);
  const [mapCentimetres, setMapCentimetres] = useState(2);
  const scale = training.scales.find((item) => item.value === scaleValue) ?? training.scales[0];
  const groundKilometres = mapCentimetres * scale.metresPerCm / 1000;

  return (
    <div className="trainer-scale-lab sc-card sc-card--raised">
      <div>
        <p className="sc-card-kicker">Distance converter</p>
        <h3 className="sc-card-title">Paper distance → ground distance</h3>
        <p className="sc-card-desc">Select the scale printed on the map, then measure the route. Measure bends in segments rather than treating a curved path as a straight line.</p>
      </div>
      <div className="trainer-scale-controls">
        <label><span>Map scale</span><select className="sc-input" value={scaleValue} onChange={(event) => setScaleValue(Number(event.target.value))}>{training.scales.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}</select></label>
        <label><span>Measured map distance</span><div className="trainer-unit-input"><input className="sc-input" type="number" min="0.1" max="50" step="0.1" value={mapCentimetres} onChange={(event) => setMapCentimetres(Math.max(0, Number(event.target.value)))} /><b>cm</b></div></label>
      </div>
      <output className="trainer-scale-result" aria-live="polite">
        <span>{mapCentimetres || 0} cm at {scale.label}</span>
        <strong>{groundKilometres.toLocaleString(undefined, { maximumFractionDigits: 2 })} km</strong>
        <small>{scale.label === '1:50 000' ? '1 cm = 500 m' : '1 cm = 2.5 km'}</small>
      </output>
    </div>
  );
}

export function ContourLab() {
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  function submit(event: SyntheticEvent<HTMLFormElement>) { event.preventDefault(); setChecked(true); }

  return (
    <form className="trainer-contour-card sc-card sc-card--raised" onSubmit={submit}>
      <fieldset>
        <legend><span className="sc-label">Quick check</span><strong>Which hillside is steeper?</strong></legend>
        <div className="trainer-contour-options">
          <ContourOption id="slope-a" label="Hillside A" spacing="wide" selected={answer === 'A'} onSelect={() => { setAnswer('A'); setChecked(false); }} />
          <ContourOption id="slope-b" label="Hillside B" spacing="tight" selected={answer === 'B'} onSelect={() => { setAnswer('B'); setChecked(false); }} />
        </div>
      </fieldset>
      <div className="trainer-contour-action">
        <button className="sc-btn sc-btn--primary" type="submit" disabled={!answer}>Check slope</button>
        <Feedback state={!checked ? 'idle' : answer === 'B' ? 'correct' : 'incorrect'}>{!checked ? 'Choose a hillside, then check your read.' : answer === 'B' ? 'Correct. With the same contour interval, the height change is compressed into less horizontal distance.' : 'Look at the gaps. Wider spacing spreads the same rise over more ground.'}</Feedback>
      </div>
    </form>
  );
}

export function BearingLab() {
  const [bearing, setBearing] = useState(65);
  const quadrant = bearing === 0 ? 'north' : bearing < 90 ? 'northeast' : bearing === 90 ? 'east' : bearing < 180 ? 'southeast' : bearing === 180 ? 'south' : bearing < 270 ? 'southwest' : bearing === 270 ? 'west' : 'northwest';
  return (
    <div className="trainer-bearing-lab sc-card sc-card--raised">
      <div className="trainer-bearing-copy">
        <p className="sc-card-kicker">Bearing trainer</p>
        <h3 className="sc-card-title">Clockwise from north</h3>
        <p className="sc-card-desc">A bearing is written with three figures from 000° to 359°. This dial practises reading a <strong>grid bearing</strong>; it does not perform a declination conversion.</p>
        <label className="trainer-bearing-control"><span>Set grid bearing</span><input type="range" min="0" max="359" value={bearing} aria-valuetext={`${String(bearing).padStart(3, '0')} degrees, ${quadrant}`} onChange={(event) => setBearing(Number(event.target.value))} /></label>
        <div className="trainer-bearing-readout" aria-live="polite"><strong>{String(bearing).padStart(3, '0')}°</strong><span>{quadrant}</span></div>
      </div>
      <figure className="trainer-compass">
        <svg viewBox="0 0 260 260" aria-hidden="true">
          <circle className="compass-ring" cx="130" cy="130" r="104" />
          {Array.from({ length: 12 }, (_, index) => <line className="compass-tick" key={index} x1="130" y1="26" x2="130" y2={index % 3 === 0 ? 42 : 34} transform={`rotate(${index * 30} 130 130)`} />)}
          <text x="130" y="20">GN</text><text x="244" y="136">090</text><text x="130" y="254">180</text><text x="16" y="136">270</text>
          <g className="compass-needle" style={{ transform: `rotate(${bearing}deg)`, transformOrigin: '130px 130px' }}><path d="M130 42 L143 135 L130 124 L117 135Z" /><circle cx="130" cy="130" r="7" /></g>
        </svg>
        <figcaption className="sr-only">Compass dial showing grid bearing {String(bearing).padStart(3, '0')} degrees</figcaption>
      </figure>
    </div>
  );
}

export function FieldCard() {
  const [checks, setChecks] = useState<boolean[]>(() => training.fieldRoutine.map(() => false));
  return (
    <div className="trainer-field-card sc-card sc-card--raised">
      <div className="trainer-field-title"><div><p className="sc-label sc-label--rule">Pocket routine</p><h3>Audit → orient → locate → plan → confirm.</h3></div><Route aria-hidden="true" /></div>
      <ol className="trainer-checklist">
        {training.fieldRoutine.map((item, index) => <li key={item}><label><input type="checkbox" checked={checks[index]} onChange={() => setChecks((items) => items.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span className="trainer-check-n">{String(index + 1).padStart(2, '0')}</span><span>{item}</span></label></li>)}
      </ol>
      <button className="sc-btn sc-btn--ghost" type="button" onClick={() => setChecks(training.fieldRoutine.map(() => false))}><RotateCcw aria-hidden="true" /> Reset field card</button>
    </div>
  );
}

export function FoundationCheck() {
  const [checks, setChecks] = useState<boolean[]>(() => training.foundationChecks.map(() => false));
  const complete = checks.filter(Boolean).length;
  return (
    <div className="trainer-foundation-check sc-card sc-card--raised">
      <div className="trainer-progress-copy"><span className="sc-label">Self-check</span><strong>{complete} / {checks.length}</strong></div>
      <progress className="trainer-native-progress" aria-label="Foundation items confirmed" max={checks.length} value={complete}>{complete} of {checks.length}</progress>
      <ul className="trainer-final-list">{training.foundationChecks.map((item, index) => <li key={item}><label><input type="checkbox" checked={checks[index]} onChange={() => setChecks((items) => items.map((value, itemIndex) => itemIndex === index ? !value : value))} /><span>{item}</span></label></li>)}</ul>
      <Feedback state={complete === checks.length ? 'correct' : 'idle'}>{complete === checks.length ? 'Foundation complete. The next step is coached practice, not harder website content.' : 'Check an item only when you can explain or demonstrate it without the prompt.'}</Feedback>
    </div>
  );
}

function ContourOption({ id, label, spacing, selected, onSelect }: { id: string; label: string; spacing: 'wide' | 'tight'; selected: boolean; onSelect: () => void; }) {
  const lines = spacing === 'wide' ? [42, 96, 150, 204] : [90, 112, 134, 156];
  return <label className="trainer-contour-option" htmlFor={id} aria-label={`${label}, ${spacing === 'wide' ? 'widely spaced lines' : 'closely spaced lines'}`}><input id={id} type="radio" name="slope" value={label} checked={selected} onChange={onSelect} /><span className="trainer-contour-figure" aria-hidden="true"><svg viewBox="0 0 320 240">{lines.map((y) => <path key={y} d={`M18 ${y} C82 ${y - 18} 122 ${y + 22} 176 ${y} S266 ${y - 16} 302 ${y + 4}`} />)}</svg></span><span className="trainer-contour-label"><strong>{label}</strong><small>{spacing === 'wide' ? 'Widely spaced lines' : 'Closely spaced lines'}</small></span></label>;
}

function Feedback({ state, children }: { state: 'idle' | 'correct' | 'incorrect'; children: string }) {
  return <output className={`trainer-feedback trainer-feedback--${state}`}>{state === 'correct' ? <Check aria-hidden="true" /> : <span aria-hidden="true">{state === 'incorrect' ? '×' : 'i'}</span>}<p>{children}</p></output>;
}
