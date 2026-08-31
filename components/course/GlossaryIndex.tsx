'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import glossary from '@/data/glossary.json';

type GlossaryEntry = { id: string; term: string; abbreviation?: string; definition: string; modules: string[] };
const entries = glossary as GlossaryEntry[];

export function GlossaryIndex() {
  const [query, setQuery] = useState('');
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = needle ? entries.filter((entry) => `${entry.term} ${entry.abbreviation ?? ''} ${entry.definition}`.toLowerCase().includes(needle)) : entries;
    return [...filtered].sort((a, b) => a.term.localeCompare(b.term));
  }, [query]);

  return (
    <section className="glossary-index" aria-labelledby="glossary-results-title">
      <label className="glossary-search"><span className="sc-input-label">Search terms and abbreviations</span><div><Search aria-hidden="true" /><input className="sc-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: easting, CI, saddle…" /></div></label>
      <div className="glossary-result-head"><h2 id="glossary-results-title">{matches.length} {matches.length === 1 ? 'term' : 'terms'}</h2><button type="button" className="sc-btn sc-btn--ghost" onClick={() => setQuery('')} disabled={!query}>Clear search</button></div>
      <dl className="glossary-grid">
        {matches.map((entry) => <div className="sc-card" id={entry.id} key={entry.id}><dt>{entry.term}{entry.abbreviation && <abbr title={entry.term}>{entry.abbreviation}</abbr>}</dt><dd>{entry.definition}</dd></div>)}
      </dl>
      {matches.length === 0 && <p className="glossary-empty">No term matches that search. Try a shorter word or abbreviation.</p>}
    </section>
  );
}
