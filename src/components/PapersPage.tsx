import React, { useMemo, useState } from 'react';
import { AppView, PAPERS, PaperItem } from '../data/portfolioData';
import { FooterMarginalia } from './FooterMarginalia';
import { SubpageHeader } from './SubpageHeader';

interface PapersPageProps {
  onNavigate: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  goldenHour: boolean;
  onToggleGoldenHour: () => void;
  onSelectPaper: (paper: PaperItem, tab?: 'abstract' | 'cite' | 'code') => void;
  onOpenSocials: () => void;
  onOpenContact: () => void;
}

const YEARS = ['all', '2025', '2024', '2023', '2022'] as const;
const TOPICS = ['all', 'Spatial UI', 'Systems', 'Graphics', 'Tooling'] as const;

export const PapersPage: React.FC<PapersPageProps> = ({
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  goldenHour,
  onToggleGoldenHour,
  onSelectPaper,
  onOpenSocials,
  onOpenContact,
}) => {
  const [activeYear, setActiveYear] = useState<(typeof YEARS)[number]>('all');
  const [activeTopic, setActiveTopic] = useState<(typeof TOPICS)[number]>('all');

  const filteredPapers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PAPERS.filter((paper) => {
      const matchYear = activeYear === 'all' || paper.year === activeYear;
      const matchTopic = activeTopic === 'all' || paper.topic === activeTopic;
      const matchQuery =
        !q ||
        paper.title.toLowerCase().includes(q) ||
        paper.venue.toLowerCase().includes(q) ||
        paper.topic.toLowerCase().includes(q) ||
        paper.authors.some((a) => a.name.toLowerCase().includes(q));
      return matchYear && matchTopic && matchQuery;
    });
  }, [activeYear, activeTopic, searchQuery]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-light-surface text-light-on-surface">
      <SubpageHeader
        title="Papers & Publications"
        subtitle="Research notes, peer-reviewed papers, and open-source implementations on spatial interfaces."
        currentView="papers"
        onNavigate={onNavigate}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        goldenHour={goldenHour}
        onToggleGoldenHour={onToggleGoldenHour}
        onOpenAbout={() => onNavigate('about')}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-page-margin py-section">
        {/* Filter Chips Bar: Year + Topic */}
        <section aria-label="Filter publications" className="flex flex-col gap-gutter-md mb-gutter-xl">
          <div className="flex flex-wrap items-center gap-gutter-sm">
            <span className="font-label text-label-sm text-light-on-surface-variant mr-gutter-xs">
              Year:
            </span>
            {YEARS.map((year) => {
              const isActive = activeYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveYear(year)}
                  className={`rounded-full px-gutter-md py-1.5 font-label text-label-sm transition-colors duration-150 ease-out cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-light-primary text-light-on-primary'
                      : 'border border-light-outline-variant bg-light-surface-container-lowest text-light-on-surface hover:bg-light-surface-container'
                  }`}
                >
                  {year === 'all' ? 'All' : year}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-gutter-sm">
            <span className="font-label text-label-sm text-light-on-surface-variant mr-gutter-xs">
              Topic:
            </span>
            {TOPICS.map((topic) => {
              const isActive = activeTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTopic(topic)}
                  className={`rounded-full px-gutter-md py-1.5 font-label text-label-sm transition-colors duration-150 ease-out cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-light-secondary-container text-light-on-secondary-container'
                      : 'border border-light-outline-variant bg-light-surface-container-lowest text-light-on-surface hover:bg-light-surface-container'
                  }`}
                >
                  {topic === 'all' ? 'All topics' : topic}
                </button>
              );
            })}
          </div>
        </section>

        {/* Clean List Layout */}
        {filteredPapers.length === 0 ? (
          <div className="rounded-md border border-light-outline-variant bg-light-surface-container-lowest p-gutter-xl text-center">
            <p className="font-title text-title-md text-light-on-surface mb-2">
              No publications match the current filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveYear('all');
                setActiveTopic('all');
                onSearchChange('');
              }}
              className="font-label text-label-sm text-light-primary hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <section
            aria-label="Publications list"
            className="flex flex-col divide-y divide-light-outline-variant/60 border-y border-light-outline-variant/60"
          >
            {filteredPapers.map((paper) => (
              <article
                key={paper.id}
                className="py-gutter-lg flex flex-col md:flex-row md:items-center justify-between gap-gutter-lg"
              >
                <div className="flex flex-col gap-gutter-xs">
                  <div className="flex flex-wrap items-center gap-gutter-sm">
                    <span className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums">
                      {paper.year} · {paper.venue} · {paper.topic}
                    </span>
                  </div>
                  <h2 className="font-title text-title-md text-light-on-surface">
                    <button
                      type="button"
                      onClick={() => onSelectPaper(paper, 'abstract')}
                      className="text-left hover:text-light-primary transition-colors cursor-pointer"
                    >
                      {paper.title}
                    </button>
                  </h2>
                  <p className="font-body text-body-md text-light-on-surface-variant">
                    {paper.authors.map((author, idx) => (
                      <React.Fragment key={author.name}>
                        {idx > 0 && ', '}
                        <span
                          className={
                            author.isAzzah ? 'font-medium text-light-on-surface' : undefined
                          }
                        >
                          {author.name}
                        </span>
                      </React.Fragment>
                    ))}
                  </p>
                </div>

                <div className="flex items-center gap-gutter-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelectPaper(paper, 'abstract')}
                    className="inline-flex items-center gap-gutter-xs rounded-full border border-light-outline-variant bg-light-surface-container-lowest px-gutter-md py-1.5 font-label text-label-sm text-light-on-surface transition-colors duration-150 ease-out hover:bg-light-primary hover:text-light-on-primary hover:border-light-primary cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                      picture_as_pdf
                    </span>
                    <span>PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectPaper(paper, 'cite')}
                    className="inline-flex items-center gap-gutter-xs rounded-full border border-light-outline-variant bg-light-surface-container-lowest px-gutter-md py-1.5 font-label text-label-sm text-light-on-surface transition-colors duration-150 ease-out hover:bg-light-primary hover:text-light-on-primary hover:border-light-primary cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                      format_quote
                    </span>
                    <span>Cite</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectPaper(paper, 'code')}
                    className="inline-flex items-center gap-gutter-xs rounded-full border border-light-outline-variant bg-light-surface-container-lowest px-gutter-md py-1.5 font-label text-label-sm text-light-on-surface transition-colors duration-150 ease-out hover:bg-light-primary hover:text-light-on-primary hover:border-light-primary cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                      code
                    </span>
                    <span>Code</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <FooterMarginalia
        variant="surface"
        onOpenSocials={onOpenSocials}
        onOpenContact={onOpenContact}
      />
    </div>
  );
};
