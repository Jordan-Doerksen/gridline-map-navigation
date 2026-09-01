import { ArrowRight, BookOpen, CheckCircle2, Compass, Map, MousePointer2, ShieldCheck } from 'lucide-react';
import training from '@/data/training.json';

export default function Home() {
  return (
    <>
      <a className="sc-skip" href="#course">Skip to course</a>
      <header className="sc-bar">
        <div className="sc-bar-in">
          <a className="sc-mark" href="#top">Grid<b>line</b> / Foundations</a>
          <nav className="sc-nav" aria-label="Course navigation"><a href="#course">Modules</a><a href="#method">Method</a><a href="/glossary">Glossary</a></nav>
        </div>
      </header>

      <main id="top">
        <section className="door-hero sc-wrap" aria-labelledby="page-title">
          <div className="door-hero-copy">
            <p className="sc-label sc-label--rule">Map navigation / beginner foundation</p>
            <h1 id="page-title">Learn the map.<br /><span>Then read the ground.</span></h1>
            <p>Eight focused lessons build the basic language of topographic maps, grids, terrain, direction, and deliberate route planning.</p>
            <div className="door-actions">
              <a className="sc-btn sc-btn--primary" href="/modules/sheet-basics">Begin module 00 <ArrowRight aria-hidden="true" /></a>
              <a className="sc-btn sc-btn--secondary" href="#course">See the course</a>
            </div>
          </div>
          <aside className="door-brief sc-card sc-card--raised" aria-label="Course brief">
            <div className="door-brief-mark"><Map aria-hidden="true" /><span>GRID / 08</span></div>
            <dl>
              <div><dt>Depth</dt><dd>Foundation</dd></div>
              <div><dt>Lessons</dt><dd>08</dd></div>
              <div><dt>Study time</dt><dd>3 h 55</dd></div>
              <div><dt>Format</dt><dd>Read + practise</dd></div>
            </dl>
            <p>Start indoors with a real topographic map. Move outside only on familiar, permitted ground with suitable preparation.</p>
          </aside>
        </section>

        <section id="course" className="door-course sc-wrap" aria-labelledby="course-title">
          <div className="door-section-heading">
            <div><p className="sc-label sc-label--rule">Course map</p><h2 id="course-title">The light door. Deeper lessons behind it.</h2></div>
            <p>Take the modules in order the first time. Each page adds explanation, examples, an active exercise, common errors, and a closed-notes drill.</p>
          </div>
          <ol className="door-module-grid">
            {training.modules.map((module) => (
              <li key={module.slug}>
                <a href={`/modules/${module.slug}`}>
                  <div className="door-module-meta"><span>{module.number}</span><small>{module.duration}</small></div>
                  <h3>{module.title}</h3>
                  <p>{module.summary}</p>
                  <strong>Open lesson <ArrowRight aria-hidden="true" /></strong>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section id="method" className="door-method sc-wrap" aria-labelledby="method-title">
          <div className="door-section-heading">
            <div><p className="sc-label sc-label--rule">Course method</p><h2 id="method-title">Build the skill in three passes.</h2></div>
            <p>Recognition is useful, but demonstration is the goal. Slow, repeatable decisions come before speed.</p>
          </div>
          <div className="door-method-grid">
            <article className="sc-card"><BookOpen aria-hidden="true" /><span>01</span><h3>Learn</h3><p>Read the concept and connect each term to a visible feature on a real map.</p></article>
            <article className="sc-card"><MousePointer2 aria-hidden="true" /><span>02</span><h3>Practise</h3><p>Use the interactive lab or worked surface until the sequence feels deliberate.</p></article>
            <article className="sc-card"><CheckCircle2 aria-hidden="true" /><span>03</span><h3>Demonstrate</h3><p>Complete the final drill without prompts and explain how you checked the answer.</p></article>
          </div>
        </section>

        <section id="start" className="door-start sc-wrap" aria-labelledby="start-title">
          <div>
            <p className="sc-label sc-label--rule">Start here</p>
            <h2 id="start-title">First habit: read the margin before the map.</h2>
            <p>The sheet identity, date, scale, legend, contour interval, grid or datum, and declination information control everything that follows.</p>
          </div>
          <a className="door-start-link" href="/modules/sheet-basics"><span><small>Module 00</small><strong>Read the whole sheet</strong></span><ArrowRight aria-hidden="true" /></a>
        </section>

        <aside className="door-boundary sc-wrap sc-attention">
          <ShieldCheck aria-hidden="true" />
          <div><p className="sc-label">Training boundary</p><p>This course builds a sound beginner foundation. It does not replace current authoritative maps, local safety planning, suitable equipment, permissions, or qualified field instruction.</p></div>
        </aside>
      </main>

      <footer className="sc-foot">
        <div className="sc-foot-grid"><div><p className="sc-mark">Grid<b>line</b></p><p className="sc-copy--muted">Map navigation foundations, built for deliberate practice.</p></div><div><p className="sc-label">Core mnemonic</p><p>Right, then up.</p></div><div><p className="sc-label">Course path</p><p>Explain it. Plot it. Demonstrate it.</p></div></div>
        <div className="sc-colophon"><span>08 modules</span><span><Compass aria-hidden="true" /> Maps · grids · terrain · direction · route</span></div>
      </footer>
    </>
  );
}
