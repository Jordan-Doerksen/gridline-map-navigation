import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import glossary from '@/data/glossary.json';
import lessonTerms from '@/data/lesson-terms.json';

type GlossaryEntry = { id: string; term: string; abbreviation?: string; definition: string; modules: string[] };
type TermSection = { title: string; termIds: string[] };

export function TermWindow({ moduleSlug }: { moduleSlug: string }) {
  const entries = glossary as GlossaryEntry[];
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const sections = ((lessonTerms as Record<string, TermSection[]>)[moduleSlug] ?? []).map((section) => ({ ...section, terms: section.termIds.map((id) => byId.get(id)).filter((entry): entry is GlossaryEntry => Boolean(entry)) }));
  const termCount = sections.reduce((total, section) => total + section.terms.length, 0);

  return (
    <aside className="term-window" aria-label="Terms in this lesson">
      <details open>
        <summary><span><BookMarked aria-hidden="true" /><strong>Terms in this lesson</strong><small>{termCount} definitions</small></span><b aria-hidden="true">±</b></summary>
        <div className="term-window-sections">
          {sections.map((section) => <section key={section.title}><h2>{section.title}</h2><dl>{section.terms.map((entry) => <div key={entry.id}><dt>{entry.term}{entry.abbreviation && <abbr title={entry.term}>{entry.abbreviation}</abbr>}</dt><dd>{entry.definition}</dd></div>)}</dl></section>)}
        </div>
        <Link href="/glossary">Open the full glossary →</Link>
      </details>
    </aside>
  );
}
