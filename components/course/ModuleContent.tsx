import { Compass, Flag, Grid3X3, MapPinned, Mountain, Navigation, Ruler, Route, ShieldCheck } from 'lucide-react';
import { AuditLab, BearingLab, ContourLab, FieldCard, FoundationCheck, ScaleLab } from './CourseLabs';
import { ElevationProfile, PrecisionChart } from './CourseVisuals';
import { GridLab } from './GridLab';
import training from '@/data/training.json';

export function ModuleContent({ slug }: { slug: string }) {
  switch (slug) {
    case 'sheet-basics': return <SheetPractice />;
    case 'grid-references': return <GridPractice />;
    case 'scale-distance': return <ScalePractice />;
    case 'contours-terrain': return <TerrainPractice />;
    case 'north-compass': return <NorthPractice />;
    case 'route-planning': return <RoutePractice />;
    case 'field-practice': return <FieldPractice />;
    case 'foundation-check': return <CheckPractice />;
    default: return null;
  }
}

function PracticeHeading({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <div className="module-practice-heading"><p className="sc-label sc-label--rule">{label}</p><h2>{title}</h2><p>{copy}</p></div>;
}

function SheetPractice() {
  return <><PracticeHeading label="Practice surface" title="Audit before interpretation." copy="Use a real map for this exercise. The skill is locating the controlling information quickly, not memorizing where one publisher happened to place it." /><AuditLab /></>;
}

function GridPractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Build accuracy from the square outward." copy="Complete the four-figure fixes first, then use the precision visualization to refine the same square without changing the reading order." />
    <GridLab />
    <div className="module-practice-gap"><PrecisionChart /></div>
  </>;
}

function ScalePractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Make three estimates agree." copy="Use the converter, then compare ruler, grid-square, and route-segment estimates. A large disagreement signals a scale or unit error." />
    <div className="trainer-two-col">
      <ScaleLab />
      <div className="trainer-rule-stack">
        <article className="sc-card"><Ruler aria-hidden="true" /><h3>Ruler</h3><p>Best for straight segments and exact paper measurements.</p></article>
        <article className="sc-card"><Grid3X3 aria-hidden="true" /><h3>Grid squares</h3><p>Fast reasonableness check when the grid interval is known.</p></article>
        <article className="sc-card"><Route aria-hidden="true" /><h3>Segmented line</h3><p>Best representation of a curved travelled route.</p></article>
      </div>
    </div>
    <div className="module-method-card"><p className="sc-label">Pace calibration record</p><div><span>Surface</span><span>Trial 1</span><span>Trial 2</span><span>Trial 3</span><span>Average</span></div><div><strong>Measured 100 m</strong><span>____</span><span>____</span><span>____</span><span>____</span></div><p>Use one consistent counting method. Repeat the record for level path, slope, and rough ground.</p></div>
  </>;
}

function TerrainPractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Read slope, then identify shape." copy="Answer the spacing check before naming landforms. Slope and height relationships are the evidence that makes a shape recognizable." />
    <ContourLab />
    <div className="trainer-terrain-grid module-practice-gap">
      {training.terrainFeatures.map((feature) => <article className="sc-card" key={feature.name}><Mountain aria-hidden="true" /><h3>{feature.name}</h3><p>{feature.read}</p></article>)}
    </div>
    <p className="trainer-inline-note">Trace a finger from low to high around each pattern. If the direction of rising ground is unclear, the landform name is not yet supported.</p>
  </>;
}

function NorthPractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Name the reference before the angle." copy="Use the three cards to identify the north reference, then practise reading the grid-bearing dial. Conversion to magnetic belongs to current map data and the approved method." />
    <div className="trainer-north-grid">
      <article className="sc-card"><span className="trainer-north-mark">TN</span><h3>True north</h3><p>Geographic reference toward the pole.</p></article>
      <article className="sc-card"><span className="trainer-north-mark">GN</span><h3>Grid north</h3><p>Direction of the map’s vertical grid lines.</p></article>
      <article className="sc-card"><span className="trainer-north-mark">MN</span><h3>Magnetic north</h3><p>Direction indicated by a magnetic compass.</p></article>
    </div>
    <BearingLab />
    <div className="sc-attention trainer-declination-note"><Compass aria-hidden="true" /><div><p className="sc-label">Conversion gate</p><p>Do not convert or follow the displayed grid bearing until the dated grid-to-magnetic relationship for the map and location has been identified.</p></div></div>
  </>;
}

function RoutePractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Build a chain of confirmation." copy="The sequence below makes every leg observable. Use the terrain profile to challenge the assumption that the shortest line is automatically best." />
    <div className="trainer-route-sequence">
      {training.routeSequence.map((item, index) => <article className="sc-card" key={item.term}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.term}</h3><p>{item.use}</p></article>)}
    </div>
    <ElevationProfile />
    <div className="module-route-card sc-card">
      <div><p className="sc-label sc-label--rule">Blank route card</p><h3>One leg, fully briefed</h3></div>
      <dl><div><dt>Start → end feature</dt><dd>____________________</dd></div><div><dt>Grid bearing</dt><dd>_____°</dd></div><div><dt>Route distance</dt><dd>________ m</dd></div><div><dt>Expected time</dt><dd>________ min</dd></div><div><dt>Terrain sequence</dt><dd>____________________</dd></div><div><dt>Attack point</dt><dd>____________________</dd></div><div><dt>Catching feature</dt><dd>____________________</dd></div><div><dt>Stop condition</dt><dd>____________________</dd></div></dl>
    </div>
  </>;
}

function FieldPractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Rehearse the routine on controlled ground." copy="Use the progression cards to choose the right difficulty, then run the pocket routine before every leg." />
    <div className="trainer-practice-ladder">
      {training.practiceLadder.map((item, index) => <article className="sc-card" key={item.level}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.level}</h3><p>{item.task}</p></article>)}
    </div>
    <div className="trainer-field-layout"><FieldCard /><aside className="sc-attention"><ShieldCheck aria-hidden="true" /><p className="sc-label">Practice boundary</p><p>Use a familiar, permitted route, current map, suitable conditions and equipment, and a companion for early field sessions.</p></aside></div>
  </>;
}

function CheckPractice() {
  return <>
    <PracticeHeading label="Practice surface" title="Check demonstration, not recognition." copy="Mark an item only after you can explain it or apply it to a fresh example without being led through the steps." />
    <FoundationCheck />
    <div className="module-next-study">
      <article className="sc-card"><MapPinned aria-hidden="true" /><h3>Weak map frame?</h3><p>Return to sheet basics, grids, or scale before adding field speed.</p></article>
      <article className="sc-card"><Navigation aria-hidden="true" /><h3>Weak movement frame?</h3><p>Return to contours, north, and route planning before a longer course.</p></article>
      <article className="sc-card"><Flag aria-hidden="true" /><h3>Clean foundation?</h3><p>Bring the checklist to coached field practice and let the instructor refine technique.</p></article>
    </div>
  </>;
}
