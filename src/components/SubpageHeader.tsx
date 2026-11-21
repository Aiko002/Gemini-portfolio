import React from 'react';
import { AppView, ASSETS } from '../data/portfolioData';
import { TopNavBar } from './TopNavBar';

interface SubpageHeaderProps {
  title: string;
  subtitle: string;
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  goldenHour: boolean;
  onToggleGoldenHour: () => void;
  onOpenAbout: () => void;
}

export const SubpageHeader: React.FC<SubpageHeaderProps> = ({
  title,
  subtitle,
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  goldenHour,
  onToggleGoldenHour,
  onOpenAbout,
}) => {
  return (
    <header className="relative w-full overflow-hidden bg-lawn-green">
      <img
        src={ASSETS.lawnHeaderMascot}
        alt="Top-down lime-olive grass texture with a small illustrated person lying in the bottom-right corner"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none golden-hour-surface ${
          goldenHour ? 'golden-hour-grade' : ''
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-mustard-accent/25 via-transparent to-coral-accent/15 transition-opacity duration-500 ease-out ${
          goldenHour ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-light-on-primary-container/85 via-light-on-primary-container/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-light-on-primary-container/75 to-transparent"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-page-margin pt-gutter-xl pb-section flex flex-col gap-gutter-xl">
        <TopNavBar
          currentView={currentView}
          onNavigate={onNavigate}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
          goldenHour={goldenHour}
          onToggleGoldenHour={onToggleGoldenHour}
          onOpenAbout={onOpenAbout}
          showListViewToggle={false}
        />

        <div className="flex flex-col items-start gap-gutter-sm max-w-xl">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-gutter-xs rounded-full border border-light-on-primary/40 bg-light-primary/85 px-gutter-md py-1.5 font-label text-label-sm text-light-on-primary transition-colors duration-150 ease-out hover:bg-light-primary cursor-pointer focus-visible:outline-2 focus-visible:outline-light-on-primary"
          >
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">
              arrow_back
            </span>
            <span>Back to the lawn</span>
          </button>

          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-light-on-primary mt-gutter-xs text-balance">
            {title}
          </h1>
          <p className="font-body text-body-md text-light-on-primary">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};
