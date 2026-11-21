import React from 'react';
import { AppView } from '../data/portfolioData';

interface TopNavBarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit?: (q: string) => void;
  listView?: boolean;
  onToggleListView?: () => void;
  goldenHour: boolean;
  onToggleGoldenHour: () => void;
  onOpenAbout: () => void;
  showListViewToggle?: boolean;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  listView = false,
  onToggleListView,
  goldenHour,
  onToggleGoldenHour,
  onOpenAbout,
  showListViewToggle = false,
}) => {
  const activeNav =
    currentView === 'projects'
      ? 'gallery'
      : currentView === 'timeline'
        ? 'timeline'
        : currentView === 'landing'
          ? 'home'
          : 'none';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="relative z-20 flex items-center justify-between gap-gutter-lg w-full">
      {/* Top-left: Logo + Thin geometric sans-serif nav */}
      <div className="flex items-center gap-6 md:gap-12 min-w-0">
        <button
          type="button"
          onClick={() => onNavigate('landing')}
          aria-label="Azzah home"
          className="font-display text-display-lg-mobile md:text-display-lg text-light-on-primary leading-none transition-opacity duration-150 ease-out hover:opacity-80 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-on-primary rounded"
        >
          A.
        </button>

        <nav aria-label="Primary navigation" className="flex items-center gap-6 md:gap-8">
          <button
            type="button"
            onClick={() => onNavigate('landing')}
            className={`font-label text-label-lg text-light-on-primary border-b pb-0.5 transition-opacity duration-150 ease-out hover:opacity-80 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-on-primary ${
              activeNav === 'home' ? 'border-light-on-primary' : 'border-transparent'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className={`font-label text-label-lg text-light-on-primary border-b pb-0.5 transition-opacity duration-150 ease-out hover:opacity-80 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-on-primary ${
              activeNav === 'gallery' ? 'border-light-on-primary' : 'border-transparent'
            }`}
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className={`font-label text-label-lg text-light-on-primary border-b pb-0.5 transition-opacity duration-150 ease-out hover:opacity-80 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-on-primary ${
              activeNav === 'timeline' ? 'border-light-on-primary' : 'border-transparent'
            }`}
          >
            Timeline
          </button>
        </nav>
      </div>

      {/* Top-right: Controls + creative developer chip + Search field */}
      <div className="flex items-center gap-gutter-sm md:gap-gutter-md shrink-0">
        {showListViewToggle && onToggleListView && (
          <button
            type="button"
            onClick={onToggleListView}
            aria-pressed={listView}
            aria-label="Toggle accessible list view"
            className={`inline-flex items-center gap-gutter-xs rounded-full border px-gutter-md py-1.5 font-label text-label-sm transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-light-on-primary ${
              listView
                ? 'border-light-on-primary bg-light-surface-container-lowest text-light-on-surface'
                : 'border-light-on-primary/35 bg-light-primary/90 text-light-on-primary hover:bg-light-primary'
            }`}
          >
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">
              {listView ? 'park' : 'format_list_bulleted'}
            </span>
            <span>{listView ? 'Lawn view' : 'List view'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onToggleGoldenHour}
          aria-pressed={goldenHour}
          title={goldenHour ? 'Switch to midday sun' : 'Switch to golden hour'}
          className={`inline-flex items-center gap-gutter-xs rounded-full border px-gutter-md py-1.5 font-label text-label-sm transition-colors duration-150 ease-out whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-light-on-primary ${
            goldenHour
              ? 'border-mustard-accent bg-mustard-accent text-light-on-surface'
              : 'border-light-on-primary/35 bg-light-primary/90 text-light-on-primary hover:bg-light-primary'
          }`}
        >
          <span className="material-symbols-outlined text-body-md" aria-hidden="true">
            {goldenHour ? 'wb_twilight' : 'wb_sunny'}
          </span>
          <span className="hidden lg:inline">{goldenHour ? 'Golden hour' : 'Daylight'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenAbout}
          className="hidden sm:inline-flex items-center justify-center rounded-full border border-light-on-primary/35 bg-light-primary/90 text-light-on-primary px-gutter-md py-1.5 font-label text-label-sm transition-colors duration-150 ease-out hover:bg-light-primary whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-light-on-primary"
        >
          creative developer
        </button>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="inline-flex items-center rounded-full border border-light-on-primary/35 bg-light-primary/90 px-gutter-md py-1.5 transition-colors duration-150 ease-out focus-within:bg-light-primary focus-within:border-light-on-primary shrink-0"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search portfolio"
            placeholder="Search..."
            className="w-28 lg:w-36 bg-transparent border-0 p-0 font-label text-label-sm text-light-on-primary placeholder:text-light-on-primary/80 focus:ring-0 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className="inline-flex items-center justify-center text-light-on-primary hover:opacity-80 ml-gutter-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">
              search
            </span>
          </button>
        </form>
      </div>
    </header>
  );
};
