'use client';

import { Check, Compass, Layers3, Map, RotateCcw } from 'lucide-react';
import { SyntheticEvent, useMemo, useState } from 'react';
import training from '@/data/training.json';
import { LayerKey, TopoMap } from './TopoMap';

export function GridLab() {
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [easting, setEasting] = useState('');
  const [northing, setNorthing] = useState('');
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [completed, setCompleted] = useState<string[]>([]);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({ contours: true, water: true, trail: true });
  const exercise = training.gridExercises[exerciseIndex];
  const answer = `${exercise.easting}${exercise.northing}`;
  const statusText = useMemo(() => {
    if (feedback === 'correct') return `Correct — ${answer}. Right ${exercise.easting}, then up ${exercise.northing}.`;
    if (feedback === 'incorrect') return 'Not yet. Read the numbered vertical line on the left, then the numbered horizontal line below.';
    return 'Enter the two numbers that name the target square.';
  }, [answer, exercise.easting, exercise.northing, feedback]);

  function checkAnswer(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const correct = easting.trim() === exercise.easting && northing.trim() === exercise.northing;
    setFeedback(correct ? 'correct' : 'incorrect');
    if (correct) setCompleted((items) => items.includes(exercise.id) ? items : [...items, exercise.id]);
  }

  function nextTarget() {
    setExerciseIndex((index) => (index + 1) % training.gridExercises.length);
    setEasting('');
    setNorthing('');
    setFeedback('idle');
  }

  return (
    <section id="practice" className="trainer-practice sc-wrap" aria-labelledby="practice-title">
      <div className="trainer-map-panel sc-card sc-card--raised">
        <div className="trainer-map-head">
          <div>
            <p className="sc-card-kicker">Exercise {exerciseIndex + 1} / {training.gridExercises.length}</p>
            <h2 id="practice-title" className="sc-card-title">Locate: {exercise.label}</h2>
          </div>
          <div className="trainer-north" aria-label="Grid north is at the top of this training map"><Compass aria-hidden="true" /><span>GN</span></div>
        </div>

        <div className="trainer-layer-bar" aria-label="Map layers">
          <span className="sc-label"><Layers3 aria-hidden="true" /> Layers</span>
          {(['contours', 'water', 'trail'] as LayerKey[]).map((layer) => (
            <button className="sc-chip" type="button" aria-pressed={layers[layer]} onClick={() => setLayers((current) => ({ ...current, [layer]: !current[layer] }))} key={layer}>
              {layer}
            </button>
          ))}
        </div>

        <TopoMap layers={layers} target={exercise} />
        <p className="trainer-map-caption"><Map aria-hidden="true" /> Synthetic sheet MT-01 · grid north at top · grid interval: 1 km</p>
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
              <label><span>Easting / right</span><input className="sc-input" inputMode="numeric" maxLength={2} pattern="[0-9]{2}" value={easting} onChange={(event) => setEasting(event.target.value.replace(/\D/g, ''))} aria-describedby="answer-status" placeholder="00" /></label>
              <span className="trainer-join" aria-hidden="true">→</span>
              <label><span>Northing / up</span><input className="sc-input" inputMode="numeric" maxLength={2} pattern="[0-9]{2}" value={northing} onChange={(event) => setNorthing(event.target.value.replace(/\D/g, ''))} aria-describedby="answer-status" placeholder="00" /></label>
            </div>
          </fieldset>
          <output className={`trainer-feedback trainer-feedback--${feedback}`} id="answer-status">
            {feedback === 'correct' ? <Check aria-hidden="true" /> : <span aria-hidden="true">{feedback === 'incorrect' ? '×' : 'i'}</span>}<p>{statusText}</p>
          </output>
          <div className="trainer-actions">
            <button className="sc-btn sc-btn--primary" type="submit">Check reference</button>
            <button className="sc-btn sc-btn--outline" type="button" onClick={nextTarget}><RotateCcw aria-hidden="true" /> Next target</button>
          </div>
        </form>
        <div className="trainer-progress">
          <div className="trainer-progress-copy"><span className="sc-label">Grid drill</span><strong>{completed.length} / {training.gridExercises.length}</strong></div>
          <progress className="trainer-native-progress" aria-label="Grid exercises completed" max={training.gridExercises.length} value={completed.length}>{completed.length} of {training.gridExercises.length}</progress>
        </div>
        <p className="trainer-accuracy-note"><strong>Precision note:</strong> a four-figure reference identifies a square. It does not describe an exact point.</p>
      </aside>
    </section>
  );
}
