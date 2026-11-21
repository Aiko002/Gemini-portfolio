import { useCallback, useEffect, useState } from 'react';
import { LawnLanding } from './components/LawnLanding';
import { PapersPage } from './components/PapersPage';
import { ModalState, PortfolioModals } from './components/PortfolioModals';
import { ProjectsPage } from './components/ProjectsPage';
import {
  AboutPage,
  FieldNotesPage,
  PlaygroundPage,
  TimelinePage,
} from './components/SecondaryViews';
import { AppView, PaperItem, ProjectItem } from './data/portfolioData';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [goldenHour, setGoldenHour] = useState(false);
  const [listView, setListView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modal, setModal] = useState<ModalState>({ type: 'none' });

  const handleNavigate = useCallback((view: AppView) => {
    setCurrentView(view);
    if (view !== 'landing') {
      setListView(false);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchSubmit = useCallback((q: string) => {
    setModal({ type: 'search', query: q });
  }, []);

  const handleSelectProject = useCallback((project: ProjectItem) => {
    setModal({ type: 'project', project });
  }, []);

  const handleSelectPaper = useCallback(
    (paper: PaperItem, tab: 'abstract' | 'cite' | 'code' = 'abstract') => {
      setModal({ type: 'paper', paper, tab });
    },
    []
  );

  // Sync keyboard shortcut 'l' for toggling List View on landing when not typing in an input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable;
      if (isInput) return;

      if (e.key.toLowerCase() === 'l' && currentView === 'landing' && modal.type === 'none') {
        setListView((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentView, modal.type]);

  const sharedSubpageProps = {
    onNavigate: handleNavigate,
    searchQuery,
    onSearchChange: setSearchQuery,
    onSearchSubmit: handleSearchSubmit,
    goldenHour,
    onToggleGoldenHour: () => setGoldenHour((prev) => !prev),
    onOpenSocials: () => setModal({ type: 'socials' }),
    onOpenContact: () => setModal({ type: 'contact' }),
  };

  return (
    <div
      data-golden-hour={goldenHour ? 'true' : 'false'}
      className="min-h-screen w-full transition-[background-color,color] duration-500 ease-out"
    >
      {currentView === 'landing' && (
        <LawnLanding
          goldenHour={goldenHour}
          onToggleGoldenHour={() => setGoldenHour((prev) => !prev)}
          listView={listView}
          onToggleListView={() => setListView((prev) => !prev)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onNavigate={handleNavigate}
          onSelectProject={handleSelectProject}
          onSelectPaper={handleSelectPaper}
          onOpenSocials={() => setModal({ type: 'socials' })}
          onOpenContact={() => setModal({ type: 'contact' })}
          onOpenHobbies={() => setModal({ type: 'hobbies' })}
        />
      )}

      {currentView === 'projects' && (
        <ProjectsPage {...sharedSubpageProps} onSelectProject={handleSelectProject} />
      )}

      {currentView === 'papers' && (
        <PapersPage {...sharedSubpageProps} onSelectPaper={handleSelectPaper} />
      )}

      {currentView === 'timeline' && <TimelinePage {...sharedSubpageProps} />}

      {currentView === 'about' && <AboutPage {...sharedSubpageProps} />}

      {currentView === 'notes' && <FieldNotesPage {...sharedSubpageProps} />}

      {currentView === 'playground' && <PlaygroundPage {...sharedSubpageProps} />}

      <PortfolioModals
        modal={modal}
        onClose={() => setModal({ type: 'none' })}
        onNavigate={handleNavigate}
        onSelectProject={handleSelectProject}
        onSelectPaper={handleSelectPaper}
      />
    </div>
  );
}
