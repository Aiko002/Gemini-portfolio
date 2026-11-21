import React, { useMemo } from 'react';
import { AppView, PROJECTS, ProjectItem } from '../data/portfolioData';
import { FooterMarginalia } from './FooterMarginalia';
import { SubpageHeader } from './SubpageHeader';

interface ProjectsPageProps {
  onNavigate: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  goldenHour: boolean;
  onToggleGoldenHour: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenSocials: () => void;
  onOpenContact: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  goldenHour,
  onToggleGoldenHour,
  onSelectProject,
  onOpenSocials,
  onOpenContact,
}) => {
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.year.includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-light-surface text-light-on-surface">
      <SubpageHeader
        title="Projects"
        subtitle="Selected web tools, playful experiments, and sunny interfaces crafted between 2023 and 2026."
        currentView="projects"
        onNavigate={onNavigate}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        goldenHour={goldenHour}
        onToggleGoldenHour={onToggleGoldenHour}
        onOpenAbout={() => onNavigate('about')}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-page-margin py-section">
        {filteredProjects.length === 0 ? (
          <div className="rounded-md border border-light-outline-variant bg-light-surface-container-lowest p-gutter-xl text-center">
            <p className="font-title text-title-md text-light-on-surface mb-2">
              No projects match "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="font-label text-label-sm text-light-primary hover:underline cursor-pointer"
            >
              Clear search filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg items-stretch">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col h-full rounded-md border border-light-outline-variant bg-light-surface-container-lowest overflow-hidden transition-transform duration-150 ease-out hover:-translate-y-0.5"
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="flex flex-col h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-light-primary"
                >
                  <div className="w-full h-48 bg-light-surface-container-low border-b border-light-outline-variant/50 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-250 ease-out hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-gutter-lg flex flex-col flex-1 justify-between gap-gutter-md w-full">
                    <div className="flex flex-col gap-gutter-xs">
                      <div className="flex items-baseline justify-between gap-gutter-sm">
                        <h2 className="font-title text-title-md text-light-on-surface">
                          {project.title}
                        </h2>
                        <span className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums shrink-0">
                          {project.year}
                        </span>
                      </div>
                      <p className="font-body text-label-sm text-light-on-surface-variant line-clamp-2">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-gutter-xs">
                      {project.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          {idx > 0 && (
                            <span aria-hidden="true" className="text-light-outline text-label-sm">
                              ·
                            </span>
                          )}
                          <span className="font-label text-label-sm text-light-on-secondary-container">
                            {tag}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
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
