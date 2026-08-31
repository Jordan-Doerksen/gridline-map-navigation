import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock3, ExternalLink, Target } from 'lucide-react';
import training from '@/data/training.json';
import lessons from '@/data/module-lessons.json';

type CourseModule = (typeof training.modules)[number];
type Lesson = (typeof lessons)[keyof typeof lessons];

export function ModuleShell({ module, lesson, children }: { module: CourseModule; lesson: Lesson; children: React.ReactNode }) {
  const index = training.modules.findIndex((item) => item.slug === module.slug);
  const previous = index > 0 ? training.modules[index - 1] : null;
  const next = index < training.modules.length - 1 ? training.modules[index + 1] : null;

  return (
    <>
      <a className="sc-skip" href="#lesson">Skip to lesson</a>
      <header className="sc-bar">
        <div className="sc-bar-in">
          <Link className="sc-mark" href="/">Grid<b>line</b> / Foundations</Link>
          <nav className="sc-nav" aria-label="Module navigation"><Link href="/">Course door</Link><a href="#drill">Drill</a><a href="#sources">Sources</a></nav>
        </div>
      </header>

      <main id="lesson">
        <section className="module-hero sc-wrap" aria-labelledby="module-title">
          <Link className="module-back" href="/"><ArrowLeft aria-hidden="true" /> All modules</Link>
          <div className="module-hero-grid">
            <div>
              <p className="sc-label sc-label--rule">Module {module.number} / {module.short}</p>
              <h1 id="module-title">{module.title}</h1>
              <p className="module-summary">{module.summary}</p>
            </div>
            <aside className="module-meta sc-card">
              <div><Clock3 aria-hidden="true" /><span>Study time</span><strong>{module.duration}</strong></div>
              <div><Target aria-hidden="true" /><span>Outcomes</span><strong>{lesson.outcomes.length}</strong></div>
              <p>Read deliberately, complete the active exercise, then finish with the closed-notes drill.</p>
            </aside>
          </div>
        </section>

        <nav className="module-rail sc-wrap" aria-label="All course modules">
          {training.modules.map((item) => <Link className={item.slug === module.slug ? 'is-current' : ''} aria-current={item.slug === module.slug ? 'page' : undefined} href={`/modules/${item.slug}`} key={item.slug}><span>{item.number}</span><strong>{item.short}</strong></Link>)}
        </nav>

        <section className="module-outcomes sc-wrap" aria-labelledby="outcomes-title">
          <div><p className="sc-label sc-label--rule">Lesson target</p><h2 id="outcomes-title">By the end, you can…</h2></div>
          <ol>{lesson.outcomes.map((outcome, itemIndex) => <li key={outcome}><span>{String(itemIndex + 1).padStart(2, '0')}</span><p>{outcome}</p></li>)}</ol>
        </section>

        <div className="module-reading sc-wrap">
          {lesson.sections.map((section, sectionIndex) => (
            <section className="module-reading-section" aria-labelledby={`${module.slug}-section-${sectionIndex}`} key={section.title}>
              <div className="module-reading-head"><p className="sc-label sc-label--rule">{String(sectionIndex + 1).padStart(2, '0')} / {section.kicker}</p><h2 id={`${module.slug}-section-${sectionIndex}`}>{section.title}</h2></div>
              <div className="module-reading-copy">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets.length > 0 && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </div>
            </section>
          ))}
        </div>

        <section className="module-practice sc-wrap" aria-label={`${module.title} practice`}>{children}</section>

        <section className="module-mistakes sc-wrap" aria-labelledby="mistakes-title">
          <div><p className="sc-label sc-label--rule">Error check</p><h2 id="mistakes-title">Three mistakes to catch early</h2></div>
          <div>{lesson.mistakes.map((mistake, mistakeIndex) => <article className="sc-card" key={mistake.title}><span>{String(mistakeIndex + 1).padStart(2, '0')}</span><h3>{mistake.title}</h3><p>{mistake.fix}</p></article>)}</div>
        </section>

        <section id="drill" className="module-drill sc-wrap" aria-labelledby="drill-title">
          <div className="module-drill-card sc-card sc-card--raised">
            <div><p className="sc-label sc-label--rule">Closed-notes drill</p><h2 id="drill-title">{lesson.drill.title}</h2></div>
            <ol>{lesson.drill.steps.map((step, stepIndex) => <li key={step}><span>{String(stepIndex + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
            <p className="module-drill-finish"><strong>Finish standard:</strong> {lesson.drill.finish}</p>
          </div>
        </section>

        <section id="sources" className="module-sources sc-wrap" aria-labelledby="module-sources-title">
          <div><p className="sc-label sc-label--rule">Primary references</p><h2 id="module-sources-title">Keep an official source beside the practice.</h2></div>
          <div>
            <a href="https://natural-resources.canada.ca/maps-tools-publications/maps/topographic-maps/topographic-maps-tips-hints" target="_blank" rel="noreferrer"><BookOpen aria-hidden="true" /><span><strong>Topographic maps: tips and hints</strong><small>Scale, symbols, contours, orientation, and declination</small></span><ExternalLink aria-hidden="true" /></a>
            <a href="https://natural-resources.canada.ca/maps-tools-publications/maps/topographic-maps/compass-bearings" target="_blank" rel="noreferrer"><BookOpen aria-hidden="true" /><span><strong>Compass bearings</strong><small>Grid and magnetic bearings; following a direction</small></span><ExternalLink aria-hidden="true" /></a>
          </div>
        </section>

        <nav className="module-next sc-wrap" aria-label="Continue course">
          {previous ? <Link href={`/modules/${previous.slug}`}><ArrowLeft aria-hidden="true" /><span><small>Previous</small><strong>{previous.title}</strong></span></Link> : <Link href="/"><ArrowLeft aria-hidden="true" /><span><small>Back to</small><strong>Course door</strong></span></Link>}
          {next ? <Link className="module-next-forward" href={`/modules/${next.slug}`}><span><small>Next module</small><strong>{next.title}</strong></span><ArrowRight aria-hidden="true" /></Link> : <Link className="module-next-forward" href="/"><span><small>Complete</small><strong>Return to course door</strong></span><ArrowRight aria-hidden="true" /></Link>}
        </nav>
      </main>

      <footer className="sc-foot"><div className="sc-foot-grid"><div><p className="sc-mark">Grid<b>line</b></p><p className="sc-copy--muted">Module {module.number} of {training.modules.length}</p></div><div><p className="sc-label">Method</p><p>Explain it. Plot it. Demonstrate it.</p></div><div><p className="sc-label">Boundary</p><p>Preparation before field qualification.</p></div></div></footer>
    </>
  );
}
