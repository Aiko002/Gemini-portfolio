import React, { useEffect, useState } from 'react';
import {
  AppView,
  ASSETS,
  FIELD_NOTES,
  FieldNote,
  PAPERS,
  PaperItem,
  PROJECTS,
  ProjectItem,
} from '../data/portfolioData';

export type ModalState =
  | { type: 'none' }
  | { type: 'project'; project: ProjectItem }
  | { type: 'paper'; paper: PaperItem; tab: 'abstract' | 'cite' | 'code' }
  | { type: 'socials' }
  | { type: 'contact' }
  | { type: 'hobbies' }
  | { type: 'search'; query: string };

interface PortfolioModalsProps {
  modal: ModalState;
  onClose: () => void;
  onNavigate: (view: AppView) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPaper: (paper: PaperItem, tab?: 'abstract' | 'cite' | 'code') => void;
}

export const PortfolioModals: React.FC<PortfolioModalsProps> = ({
  modal,
  onClose,
  onNavigate,
  onSelectProject,
  onSelectPaper,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [paperTab, setPaperTab] = useState<'abstract' | 'cite' | 'code'>('abstract');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (modal.type === 'paper') {
      setPaperTab(modal.tab);
    }
    setCopiedKey(null);
    setContactSent(false);
  }, [modal]);

  useEffect(() => {
    if (modal.type === 'none') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modal.type, onClose]);

  if (modal.type === 'none') return null;

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard fallback ignored in restricted frames
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 2000);
  };

  const renderSearchResults = (query: string) => {
    const q = query.trim().toLowerCase();
    const matchedProjects = PROJECTS.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    const matchedPapers = PAPERS.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q) ||
        p.authors.some((a) => a.name.toLowerCase().includes(q))
    );
    const matchedNotes: FieldNote[] = FIELD_NOTES.filter(
      (n) =>
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q)
    );

    const total = matchedProjects.length + matchedPapers.length + matchedNotes.length;

    return (
      <div className="flex flex-col gap-gutter-lg max-h-[70vh] overflow-y-auto pr-1">
        <div className="flex items-baseline justify-between border-b border-light-outline-variant/60 pb-gutter-sm">
          <div>
            <h2 className="font-display text-2xl text-light-on-surface">
              {q ? `Search: "${query}"` : 'Explore Portfolio'}
            </h2>
            <p className="font-body text-body-md text-light-on-surface-variant">
              {total} {total === 1 ? 'result' : 'results'} across projects, papers, and field notes
            </p>
          </div>
        </div>

        {total === 0 ? (
          <div className="py-gutter-xl text-center">
            <p className="font-body text-body-md text-light-on-surface-variant">
              No matches found for "{query}". Try searching for "WebGL", "CHI", "Spatial", or "Synth".
            </p>
          </div>
        ) : (
          <>
            {matchedProjects.length > 0 && (
              <div>
                <h3 className="font-label text-label-sm text-light-on-surface-variant mb-gutter-sm">
                  Projects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-sm">
                  {matchedProjects.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => onSelectProject(proj)}
                      className="flex items-center gap-gutter-md p-gutter-sm rounded-md border border-light-outline-variant/70 bg-light-surface-container-low/60 hover:bg-light-surface-container text-left transition-colors cursor-pointer"
                    >
                      <img
                        src={proj.image}
                        alt={proj.alt}
                        referrerPolicy="no-referrer"
                        className="w-14 h-12 rounded object-cover shrink-0 border border-light-outline-variant/50"
                      />
                      <div className="min-w-0">
                        <div className="font-title text-body-md font-medium text-light-on-surface truncate">
                          {proj.title}
                        </div>
                        <div className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums">
                          {proj.year} · {proj.tags[0]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedPapers.length > 0 && (
              <div>
                <h3 className="font-label text-label-sm text-light-on-surface-variant mb-gutter-sm">
                  Papers & Publications
                </h3>
                <div className="flex flex-col divide-y divide-light-outline-variant/50 border-y border-light-outline-variant/50">
                  {matchedPapers.map((paper) => (
                    <button
                      key={paper.id}
                      type="button"
                      onClick={() => onSelectPaper(paper, 'abstract')}
                      className="py-gutter-sm text-left hover:bg-light-surface-container-low/70 px-gutter-sm transition-colors cursor-pointer flex items-center justify-between gap-gutter-md"
                    >
                      <div>
                        <div className="font-title text-body-md font-medium text-light-on-surface">
                          {paper.title}
                        </div>
                        <div className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums">
                          {paper.year} · {paper.venue} · {paper.topic}
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-body-md text-light-primary shrink-0">
                        arrow_forward
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {matchedNotes.length > 0 && (
              <div>
                <h3 className="font-label text-label-sm text-light-on-surface-variant mb-gutter-sm">
                  Field Notes
                </h3>
                <div className="flex flex-col gap-gutter-sm">
                  {matchedNotes.map((note) => (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigate('notes');
                      }}
                      className="p-gutter-sm rounded-md border border-light-outline-variant/60 bg-light-surface-container-low/60 hover:bg-light-surface-container text-left transition-colors cursor-pointer"
                    >
                      <div className="font-title text-body-md font-medium text-light-on-surface">
                        {note.title}
                      </div>
                      <div className="font-body text-label-sm text-light-on-surface-variant">
                        {note.date} · {note.readTime}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-light-on-primary-container/55 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl rounded-lg border border-light-outline-variant bg-light-surface-container-lowest p-gutter-lg md:p-gutter-xl text-light-on-surface lawn-glass-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 inline-flex items-center justify-center w-9 h-9 rounded-full border border-light-outline-variant/60 text-light-on-surface-variant hover:bg-light-surface-container hover:text-light-on-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-title-md" aria-hidden="true">
            close
          </span>
        </button>

        {modal.type === 'project' && (
          <div className="flex flex-col gap-gutter-md">
            <div className="overflow-hidden rounded-md border border-light-outline-variant/70 bg-light-surface-container-low">
              <img
                src={modal.project.image}
                alt={modal.project.alt}
                referrerPolicy="no-referrer"
                className="w-full h-56 md:h-64 object-cover"
              />
            </div>

            <div className="flex items-baseline justify-between gap-gutter-md pr-8">
              <h2 className="font-display text-2xl md:text-3xl text-light-on-surface">
                {modal.project.title}
              </h2>
              <span className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums">
                {modal.project.year}
              </span>
            </div>

            <div className="flex items-center gap-2 text-label-sm text-light-on-surface-variant">
              {modal.project.tags.map((tag, idx) => (
                <React.Fragment key={tag}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <span>{tag}</span>
                </React.Fragment>
              ))}
              <span aria-hidden="true">·</span>
              <span className="font-mono text-mono-sm">{modal.project.repoSlug}</span>
            </div>

            <p className="font-body text-body-md text-light-on-surface">
              {modal.project.details}
            </p>

            <ul className="flex flex-col gap-gutter-xs border-t border-light-outline-variant/50 pt-gutter-md">
              {modal.project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-gutter-sm font-body text-body-md text-light-on-surface-variant"
                >
                  <span className="material-symbols-outlined text-body-md text-light-primary mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-gutter-md pt-gutter-sm">
              <button
                type="button"
                onClick={() => copyText('repo', `https://github.com/${modal.project.repoSlug}`)}
                className="inline-flex items-center gap-gutter-xs rounded-full border border-light-outline-variant px-gutter-md py-2 font-label text-label-sm text-light-on-surface hover:bg-light-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-body-md">code</span>
                <span>{copiedKey === 'repo' ? 'Repository URL copied' : 'Copy GitHub URL'}</span>
              </button>

              {modal.project.targetView ? (
                <button
                  type="button"
                  onClick={() => {
                    const target = modal.project.targetView!;
                    onClose();
                    onNavigate(target);
                  }}
                  className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-lg py-2 font-label text-label-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span>{modal.project.liveActionLabel}</span>
                  <span className="material-symbols-outlined text-body-md">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-lg py-2 font-label text-label-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span>Done reading</span>
                </button>
              )}
            </div>
          </div>
        )}

        {modal.type === 'paper' && (
          <div className="flex flex-col gap-gutter-md">
            <div className="pr-10">
              <div className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums mb-1">
                {modal.paper.year} · {modal.paper.venue} · {modal.paper.topic} · {modal.paper.pages} pages
              </div>
              <h2 className="font-display text-2xl text-light-on-surface">
                {modal.paper.title}
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant mt-1">
                {modal.paper.authors.map((a, idx) => (
                  <React.Fragment key={a.name}>
                    {idx > 0 && ', '}
                    <span className={a.isAzzah ? 'font-medium text-light-on-surface' : ''}>
                      {a.name}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            </div>

            <div className="flex items-center gap-2 border-b border-light-outline-variant/60 pb-gutter-sm">
              {(['abstract', 'cite', 'code'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setPaperTab(t)}
                  className={`rounded-full px-gutter-md py-1.5 font-label text-label-sm transition-colors cursor-pointer ${
                    paperTab === t
                      ? 'bg-light-primary text-light-on-primary'
                      : 'bg-light-surface-container-low text-light-on-surface hover:bg-light-surface-container'
                  }`}
                >
                  {t === 'abstract' ? 'PDF Abstract' : t === 'cite' ? 'BibTeX Cite' : 'Code & Artifact'}
                </button>
              ))}
            </div>

            {paperTab === 'abstract' && (
              <div className="flex flex-col gap-gutter-md">
                <div className="rounded-md border border-light-outline-variant/60 bg-light-surface p-gutter-md">
                  <p className="font-body text-body-md text-light-on-surface leading-relaxed">
                    {modal.paper.abstract}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-mono-sm text-light-on-surface-variant">
                    Preprint PDF · {modal.paper.pages} pp.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        'paper-summary',
                        `${modal.paper.title} (${modal.paper.year}, ${modal.paper.venue})\n\n${modal.paper.abstract}`
                      )
                    }
                    className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-md py-2 font-label text-label-sm cursor-pointer hover:opacity-90"
                  >
                    <span className="material-symbols-outlined text-body-md">content_copy</span>
                    <span>{copiedKey === 'paper-summary' ? 'Copied summary' : 'Copy citation note'}</span>
                  </button>
                </div>
              </div>
            )}

            {paperTab === 'cite' && (
              <div className="flex flex-col gap-gutter-md">
                <pre className="rounded-md border border-light-outline-variant bg-light-surface-container-low p-gutter-md font-mono text-mono-sm text-light-on-surface overflow-x-auto leading-relaxed">
                  {modal.paper.bibtex}
                </pre>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => copyText('bibtex', modal.paper.bibtex)}
                    className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-md py-2 font-label text-label-sm cursor-pointer hover:opacity-90"
                  >
                    <span className="material-symbols-outlined text-body-md">format_quote</span>
                    <span>{copiedKey === 'bibtex' ? 'BibTeX copied!' : 'Copy BibTeX'}</span>
                  </button>
                </div>
              </div>
            )}

            {paperTab === 'code' && (
              <div className="flex flex-col gap-gutter-md">
                <div className="rounded-md border border-light-outline-variant/70 bg-light-surface-container-low p-gutter-md flex flex-col gap-gutter-sm">
                  <div className="font-mono text-mono-sm text-light-primary">
                    github.com/{modal.paper.repoSlug}
                  </div>
                  <p className="font-body text-body-md text-light-on-surface-variant">
                    Includes reproducible TypeScript/GLSL reference implementation, benchmark scripts, and specimen demos supporting "{modal.paper.title}".
                  </p>
                </div>
                <div className="flex justify-end gap-gutter-sm">
                  <button
                    type="button"
                    onClick={() =>
                      copyText('clone', `git clone https://github.com/${modal.paper.repoSlug}.git`)
                    }
                    className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-md py-2 font-label text-label-sm cursor-pointer hover:opacity-90"
                  >
                    <span className="material-symbols-outlined text-body-md">terminal</span>
                    <span>{copiedKey === 'clone' ? 'Clone command copied!' : 'Copy git clone'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {modal.type === 'socials' && (
          <div className="flex flex-col gap-gutter-md">
            <h2 className="font-display text-2xl text-light-on-surface pr-8">Socials & Links</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">
              Find me around the web—sharing open-source tools, typography studies, and quiet park notes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-sm">
              {[
                { name: 'GitHub', handle: '@azzah-dev', url: 'https://github.com/azzah-dev' },
                { name: 'LinkedIn', handle: 'in/azzah-creative-dev', url: 'https://linkedin.com/in/azzah-creative-dev' },
                { name: 'X / Twitter', handle: '@azzah_builds', url: 'https://x.com/azzah_builds' },
                { name: 'Instagram', handle: '@azzah.sketchbook', url: 'https://instagram.com/azzah.sketchbook' },
              ].map((social) => (
                <button
                  key={social.name}
                  type="button"
                  onClick={() => copyText(social.name, social.url)}
                  className="flex items-center justify-between p-gutter-md rounded-md border border-light-outline-variant/70 bg-light-surface-container-low/70 hover:bg-light-surface-container transition-colors text-left cursor-pointer"
                >
                  <div>
                    <div className="font-title text-body-md font-medium text-light-on-surface">
                      {social.name}
                    </div>
                    <div className="font-mono text-mono-sm text-light-on-surface-variant">
                      {social.handle}
                    </div>
                  </div>
                  <span className="font-label text-label-sm text-light-primary">
                    {copiedKey === social.name ? 'Copied' : 'Copy link'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {modal.type === 'hobbies' && (
          <div className="flex flex-col gap-gutter-md">
            <div className="flex items-center gap-gutter-md pr-8">
              <img
                src={ASSETS.azzahAvatar}
                alt="Portrait of Azzah"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border border-light-outline-variant shrink-0"
              />
              <div>
                <h2 className="font-display text-2xl text-light-on-surface">Away from the keyboard</h2>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  Guitar, neighborhood cats, and sunny afternoon parks
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter-md pt-gutter-xs">
              <div className="rounded-md border border-light-outline-variant/70 bg-light-surface-container-low/70 p-gutter-md">
                <span className="material-symbols-outlined text-light-primary mb-2">music_note</span>
                <h3 className="font-title text-body-md font-medium text-light-on-surface mb-1">
                  Fingerstyle Guitar
                </h3>
                <p className="font-body text-label-sm text-light-on-surface-variant">
                  Open-tuning acoustic sketches recorded on portable field mics and turned into synth patches.
                </p>
              </div>
              <div className="rounded-md border border-light-outline-variant/70 bg-light-surface-container-low/70 p-gutter-md">
                <span className="material-symbols-outlined text-light-primary mb-2">pets</span>
                <h3 className="font-title text-body-md font-medium text-light-on-surface mb-1">
                  Park Cats
                </h3>
                <p className="font-body text-label-sm text-light-on-surface-variant">
                  Befriending neighborhood ginger tabbies on sunlit picnic blankets while sketching UI layouts.
                </p>
              </div>
              <div className="rounded-md border border-light-outline-variant/70 bg-light-surface-container-low/70 p-gutter-md">
                <span className="material-symbols-outlined text-light-primary mb-2">park</span>
                <h3 className="font-title text-body-md font-medium text-light-on-surface mb-1">
                  Botanical Walks
                </h3>
                <p className="font-body text-label-sm text-light-on-surface-variant">
                  Collecting leaf shadow studies and warm olive color palettes that inspire calm software.
                </p>
              </div>
            </div>
          </div>
        )}

        {modal.type === 'contact' && (
          <div className="flex flex-col gap-gutter-md">
            <h2 className="font-display text-2xl text-light-on-surface pr-8">Say hello</h2>
            <p className="font-body text-body-md text-light-on-surface-variant">
              Open for creative engineering collaborations, spatial UI research, and calm web tools.
            </p>

            <div className="flex items-center justify-between rounded-md border border-light-outline-variant bg-light-surface-container-low px-gutter-md py-gutter-sm">
              <span className="font-mono text-mono-sm text-light-on-surface">
                hello@azzah.studio
              </span>
              <button
                type="button"
                onClick={() => copyText('email', 'hello@azzah.studio')}
                className="font-label text-label-sm text-light-primary hover:underline cursor-pointer"
              >
                {copiedKey === 'email' ? 'Copied!' : 'Copy email'}
              </button>
            </div>

            {contactSent ? (
              <div className="rounded-md border border-light-primary/30 bg-light-secondary-container/50 p-gutter-md text-light-on-surface">
                <p className="font-title text-body-md font-medium">Note tucked into the mailbox</p>
                <p className="font-body text-label-sm text-light-on-surface-variant mt-1">
                  Thanks, {contactForm.name || 'friend'}. Your message is ready to send to hello@azzah.studio.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSent(true);
                }}
                className="flex flex-col gap-gutter-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-sm">
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                    className="rounded-md border border-light-outline-variant bg-light-surface px-gutter-md py-2 font-body text-body-md text-light-on-surface focus:border-light-primary focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                    className="rounded-md border border-light-outline-variant bg-light-surface px-gutter-md py-2 font-body text-body-md text-light-on-surface focus:border-light-primary focus:outline-none"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  placeholder="Write a calm note..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                  className="rounded-md border border-light-outline-variant bg-light-surface px-gutter-md py-2 font-body text-body-md text-light-on-surface focus:border-light-primary focus:outline-none resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-lg py-2 font-label text-label-sm hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span>Send note</span>
                    <span className="material-symbols-outlined text-body-md">arrow_forward</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {modal.type === 'search' && renderSearchResults(modal.query)}
      </div>
    </div>
  );
};
