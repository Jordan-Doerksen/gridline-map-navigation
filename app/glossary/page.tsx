import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { GlossaryIndex } from '@/components/course/GlossaryIndex';

export const metadata: Metadata = {
  title: 'Course glossary — Gridline',
  description: 'Plain-language definitions for Gridline map-navigation terms and abbreviations.',
  alternates: { canonical: '/glossary' },
  openGraph: { title: 'Course glossary — Gridline', description: 'Plain-language map-navigation terminology.', images: [] },
  twitter: { card: 'summary', title: 'Course glossary — Gridline', description: 'Plain-language map-navigation terminology.', images: [] },
};

export default function GlossaryPage() {
  return (
    <>
      <a className="sc-skip" href="#glossary">Skip to glossary</a>
      <header className="sc-bar"><div className="sc-bar-in"><a className="sc-mark" href="/">Grid<b>line</b> / Foundations</a><nav className="sc-nav"><a href="/">Course door</a><a href="/modules/sheet-basics">Start course</a></nav></div></header>
      <main id="glossary">
        <section className="glossary-hero sc-wrap"><a className="module-back" href="/"><ArrowLeft aria-hidden="true" /> Course door</a><p className="sc-label sc-label--rule">Course reference</p><h1>Terms before speed.</h1><p>Use this index whenever a word or abbreviation is unclear. Each module also carries a smaller follow-along list containing only the terms used in that lesson.</p></section>
        <div className="sc-wrap"><GlossaryIndex /></div>
      </main>
      <footer className="sc-foot"><div className="sc-foot-grid"><div><p className="sc-mark">Grid<b>line</b></p><p className="sc-copy--muted">Map-navigation language in plain terms.</p></div><div><p className="sc-label">Reading order</p><p>Term. Meaning. Example.</p></div><div><p className="sc-label">Return</p><p><a href="/">Course door</a></p></div></div></footer>
    </>
  );
}
