import { BookOpen, Compass, ExternalLink, Flag, Grid3X3, Map, MapPinned, Mountain, Navigation, Ruler, Route, ShieldCheck } from 'lucide-react';
import { BearingLab, ContourLab, FieldCard, FoundationCheck, ScaleLab } from '@/components/course/CourseLabs';
import { ElevationProfile, PrecisionChart } from '@/components/course/CourseVisuals';
import { GridLab } from '@/components/course/GridLab';
import training from '@/data/training.json';

export default function Home() {
  return (
    <>
      <a className="sc-skip" href="#brief">Skip to course</a>
      <header className="sc-bar">
        <div className="sc-bar-in">
          <a className="sc-mark" href="#top">Grid<b>line</b> / Foundations</a>
          <nav className="sc-nav" aria-label="Course navigation"><a href="#brief">Start</a><a href="#route">Route</a><a href="#sources">Sources</a></nav>
        </div>
      </header>

      <main id="top">
        <section id="brief" className="trainer-intro trainer-intro--course sc-wrap" aria-labelledby="page-title">
          <div>
            <p className="sc-label sc-label--rule">Map navigation / complete beginner foundation</p>
            <h1 id="page-title">Read the map.<br /><span>Think in terrain.</span></h1>
            <p className="trainer-course-deck">Eight compact modules from sheet basics to a safe field rehearsal. Learn the language, practise the decisions, then take it outside under proper instruction.</p>
          </div>
          <aside className="trainer-course-brief sc-card">
            <div className="trainer-course-stat"><span className="sc-label">Course load</span><strong>2 h 45</strong><small>at your own pace</small></div>
            <div className="trainer-course-stat"><span className="sc-label">Modules</span><strong>08</strong><small>basics only</small></div>
            <p><strong>First habit:</strong> never read a map body before its margins. Confirm the sheet, date, scale, legend, grid or datum, contour interval, and declination information.</p>
          </aside>
        </section>

        <nav className="trainer-module-rail sc-wrap" aria-label="Course modules">
          {training.modules.map((module) => <a href={`#${module.id}`} key={module.id}><span>{module.number}</span><strong>{module.short}</strong><small>{module.duration}</small></a>)}
        </nav>

        <section className="trainer-sheet-audit sc-wrap" aria-labelledby="audit-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">00 / Read the whole sheet</p><h2 id="audit-title">The margin is part of the map.</h2></div>
            <p className="sc-lede">A symbol, distance, coordinate, or bearing is only meaningful inside the map’s own reference system.</p>
          </div>
          <div className="trainer-audit-grid">
            {training.mapAudit.map((item, index) => <article className="sc-card" key={item.label}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.label}</h3><p>{item.detail}</p></article>)}
          </div>
          <div className="sc-attention trainer-audit-note"><p className="sc-label">Live-map rule</p><p>Use the legend and marginal information printed on the map in front of you. Do not carry a remembered scale, symbol meaning, datum, or declination value from another sheet.</p></div>
        </section>

        <GridLab />

        <section className="trainer-module-section sc-wrap" aria-labelledby="precision-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">01 / Grid references</p><h2 id="precision-title">Right, then up. Add precision evenly.</h2></div>
            <p className="sc-lede">Split the digits in half: the first half is easting, the second is northing. Within a grid square, estimate right first and then up.</p>
          </div>
          <div className="trainer-two-col trainer-two-col--viz">
            <PrecisionChart />
            <aside className="trainer-rule-stack">
              <article className="sc-card"><Grid3X3 aria-hidden="true" /><h3>Four figures</h3><p>Name the 1 km square using the lines on its left and below.</p></article>
              <article className="sc-card"><MapPinned aria-hidden="true" /><h3>Six and eight</h3><p>Estimate tenths inside the square. Add one easting digit and one northing digit at each precision step.</p></article>
              <article className="sc-attention"><p className="sc-label">Coordinate context</p><p>A complete reference may also need its grid zone and 100 km square designators. The numeric examples here practise only the local digits shown on a printed training sheet.</p></article>
            </aside>
          </div>
        </section>

        <section id="scale" className="trainer-module-section sc-wrap" aria-labelledby="scale-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">02 / Scale and distance</p><h2 id="scale-title">Measure the route you will actually walk.</h2></div>
            <p className="sc-lede">At 1:50 000, 1 cm on paper equals 500 m on the ground. At 1:250 000, 1 cm equals 2.5 km.</p>
          </div>
          <div className="trainer-two-col">
            <ScaleLab />
            <div className="trainer-rule-stack">
              <article className="sc-card"><Ruler aria-hidden="true" /><h3>Straight line</h3><p>Useful for comparison, but usually shorter than the route around bends, obstacles, and relief.</p></article>
              <article className="sc-card"><Route aria-hidden="true" /><h3>Route distance</h3><p>Break curves into short segments, add them, then include a sensible planning margin.</p></article>
              <article className="sc-card"><Flag aria-hidden="true" /><h3>Field calibration</h3><p>Learn your own pace count over a measured 100 m on more than one surface. Fatigue, slope, load, and vegetation change it.</p></article>
            </div>
          </div>
        </section>

        <section id="contours" className="trainer-module-section sc-wrap" aria-labelledby="contours-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">03 / Contours and landforms</p><h2 id="contours-title">Contours turn lines into land.</h2></div>
            <p className="sc-lede"><strong>Each contour joins equal elevation.</strong> With one contour interval, close spacing means steeper ground; wide spacing means gentler ground.</p>
          </div>
          <ContourLab />
          <div className="trainer-terrain-grid">
            {training.terrainFeatures.map((feature) => <article className="sc-card" key={feature.name}><Mountain aria-hidden="true" /><h3>{feature.name}</h3><p>{feature.read}</p></article>)}
          </div>
          <p className="trainer-inline-note">Read the entire contour pattern, not one isolated V or U. A valley and a spur can look similar until you check which side is higher and how nearby features connect.</p>
        </section>

        <section id="north" className="trainer-module-section sc-wrap" aria-labelledby="north-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">04 / Direction and compass</p><h2 id="north-title">There is more than one north.</h2></div>
            <p className="sc-lede">A compass needle points toward magnetic north. Map grid lines point toward grid north. True north is the geographic direction to the pole.</p>
          </div>
          <div className="trainer-north-grid">
            <article className="sc-card"><span className="trainer-north-mark">TN</span><h3>True north</h3><p>The geographic reference used for meridians and latitude/longitude.</p></article>
            <article className="sc-card"><span className="trainer-north-mark">GN</span><h3>Grid north</h3><p>The direction of the map’s vertical grid lines; bearings measured on the grid use this north.</p></article>
            <article className="sc-card"><span className="trainer-north-mark">MN</span><h3>Magnetic north</h3><p>The direction indicated by a magnetic compass. Its relation to grid north varies by place and time.</p></article>
          </div>
          <BearingLab />
          <div className="sc-attention trainer-declination-note"><Compass aria-hidden="true" /><div><p className="sc-label">Declination check</p><p>Use the dated declination diagram or current official geomagnetic information for the location. The drawn angles in a map-margin diagram may be exaggerated—use the stated values, not the picture’s apparent angle.</p></div></div>
        </section>

        <section id="route" className="trainer-module-section sc-wrap" aria-labelledby="route-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">05 / Build a route</p><h2 id="route-title">Plan confirmation into every leg.</h2></div>
            <p className="sc-lede">A good beginner route favours features you can recognize and recover from, not a fragile straight line through featureless terrain.</p>
          </div>
          <div className="trainer-route-sequence">
            {training.routeSequence.map((item, index) => <article className="sc-card" key={item.term}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.term}</h3><p>{item.use}</p></article>)}
          </div>
          <ElevationProfile />
          <div className="trainer-route-questions">
            <p className="sc-label">Before moving, answer</p>
            <ul><li>What feature keeps me organized?</li><li>What confirms each leg?</li><li>Where does the final approach begin?</li><li>What tells me I have gone too far?</li><li>What is my stop or turnaround condition?</li></ul>
          </div>
        </section>

        <section id="field" className="trainer-module-section sc-wrap" aria-labelledby="field-title">
          <div className="trainer-section-heading">
            <div><p className="sc-label sc-label--rule">06 / Safe field rehearsal</p><h2 id="field-title">Build difficulty in three controlled steps.</h2></div>
            <p className="sc-lede">Practise one new variable at a time. Familiar ground first; bearings and pace work later under qualified instruction.</p>
          </div>
          <div className="trainer-practice-ladder">
            {training.practiceLadder.map((item, index) => <article className="sc-card" key={item.level}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.level}</h3><p>{item.task}</p></article>)}
          </div>
          <div className="trainer-field-layout">
            <FieldCard />
            <aside className="sc-attention"><ShieldCheck aria-hidden="true" /><p className="sc-label">Training limit</p><p>This course teaches concepts. It does not replace current authoritative maps, local permissions and safety planning, suitable equipment, or qualified navigation instruction.</p></aside>
          </div>
        </section>

        <section id="check" className="trainer-module-section sc-wrap" aria-labelledby="check-title">
          <div className="trainer-section-heading"><div><p className="sc-label sc-label--rule">07 / Foundation check</p><h2 id="check-title">Explain it. Plot it. Walk it safely.</h2></div><p className="sc-lede">Completion means the vocabulary is familiar and the basic decisions are rehearsed—not that field competence has been certified.</p></div>
          <FoundationCheck />
        </section>

        <section id="sources" className="trainer-sources sc-wrap" aria-labelledby="sources-title">
          <div><p className="sc-label sc-label--rule">Source desk</p><h2 id="sources-title">Continue with Canadian primary material.</h2><p>Course claims about NTS scales, symbols, contours, orientation, and compass bearings were checked against Natural Resources Canada. Links open the current official guidance.</p></div>
          <div className="trainer-source-links">
            <a href="https://natural-resources.canada.ca/maps-tools-publications/maps/topographic-maps/topographic-maps-tips-hints" target="_blank" rel="noreferrer"><BookOpen aria-hidden="true" /><span><strong>Topographic maps: tips and hints</strong><small>Scale, symbols, contours, orientation, declination</small></span><ExternalLink aria-hidden="true" /></a>
            <a href="https://natural-resources.canada.ca/maps-tools-publications/maps/topographic-maps/national-topographic-system-maps" target="_blank" rel="noreferrer"><Map aria-hidden="true" /><span><strong>National Topographic System maps</strong><small>Canadian map scales, coverage, and colour conventions</small></span><ExternalLink aria-hidden="true" /></a>
            <a href="https://natural-resources.canada.ca/maps-tools-publications/maps/topographic-maps/orienting-topographic-map" target="_blank" rel="noreferrer"><Navigation aria-hidden="true" /><span><strong>Orienting a topographic map</strong><small>Ground correspondence and the declination diagram</small></span><ExternalLink aria-hidden="true" /></a>
            <a href="https://natural-resources.canada.ca/maps-tools-publications/maps/topographic-maps/compass-bearings" target="_blank" rel="noreferrer"><Compass aria-hidden="true" /><span><strong>Compass bearings</strong><small>Grid and magnetic bearings; following a direction</small></span><ExternalLink aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer className="sc-foot">
        <div className="sc-foot-grid"><div><p className="sc-mark">Grid<b>line</b></p><p className="sc-copy--muted">Map navigation foundations, built for deliberate practice.</p></div><div><p className="sc-label">Core mnemonic</p><p>Right, then up.</p></div><div><p className="sc-label">Course boundary</p><p>Foundation before field qualification.</p></div></div>
        <div className="sc-colophon"><span>08 modules</span><span>Maps · grids · terrain · compass · route</span></div>
      </footer>
    </>
  );
}
