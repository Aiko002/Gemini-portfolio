import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AppView,
  ASSETS,
  DIRECTORY_ITEMS,
  HotspotId,
  PaperItem,
  ProjectItem,
} from '../data/portfolioData';
import { AmbientLawnLayer } from './AmbientLawnLayer';
import { FooterMarginalia } from './FooterMarginalia';
import { HotspotPopup, POPUP_COPY, SocialButtonsRow } from './HotspotPopup';
import { TopNavBar } from './TopNavBar';

interface LawnLandingProps {
  goldenHour: boolean;
  onToggleGoldenHour: () => void;
  listView: boolean;
  onToggleListView: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  onNavigate: (view: AppView) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectPaper: (paper: PaperItem, tab?: 'abstract' | 'cite' | 'code') => void;
  onOpenSocials: () => void;
  onOpenContact: () => void;
  onOpenHobbies: () => void;
}

interface DesktopHotspotMeta {
  id: HotspotId;
  label: string;
  centerX: string;
  centerY: string;
  rx: string;
  ry: string;
  scale: number;
  hitClass: string;
}

const DESKTOP_HOTSPOTS: DesktopHotspotMeta[] = [
  {
    id: 'guitar',
    label: 'About Me — central guitarist',
    centerX: '50%',
    centerY: '53%',
    rx: '13%',
    ry: '19%',
    scale: 1.09,
    hitClass: 'left-[37%] top-[34%] w-[26%] h-[38%]',
  },
  {
    id: 'sunbather',
    label: 'Projects — sunbathing person',
    centerX: '24.5%',
    centerY: '24%',
    rx: '12%',
    ry: '16%',
    scale: 1.11,
    hitClass: 'left-[11%] top-[7%] w-[27%] h-[34%]',
  },
  {
    id: 'reader',
    label: 'Papers and Publications — reading person',
    centerX: '76%',
    centerY: '25.5%',
    rx: '13%',
    ry: '16%',
    scale: 1.11,
    hitClass: 'left-[62%] top-[8%] w-[28%] h-[35%]',
  },
  {
    id: 'sunhat',
    label: 'Socials — person in sunhat',
    centerX: '19%',
    centerY: '65%',
    rx: '9.5%',
    ry: '14%',
    scale: 1.12,
    hitClass: 'left-[9%] top-[50%] w-[20%] h-[30%]',
  },
  {
    id: 'notes',
    label: 'Field Notes — picnicking with cat',
    centerX: '79%',
    centerY: '73%',
    rx: '11%',
    ry: '16%',
    scale: 1.11,
    hitClass: 'left-[67%] top-[56%] w-[24%] h-[34%]',
  },
];

const MOBILE_SHEET_DATA: Record<
  HotspotId,
  {
    title: string;
    desc: string;
    linkLabel: string;
    action: 'projects' | 'papers' | 'about' | 'notes' | 'socials';
  }
> = {
  guitar: {
    title: 'About Me',
    desc: 'Full-stack developer crafting calm, playful web tools in the sun.',
    linkLabel: 'Read more',
    action: 'about',
  },
  sunhat: {
    title: 'Socials',
    desc: 'Find me on GitHub, LinkedIn, X, Instagram, or drop an email.',
    linkLabel: 'Say hello',
    action: 'socials',
  },
  sunbather: {
    title: 'Projects',
    desc: 'Sunspot Park Map, Lawn Synth Studio, and four more web experiments.',
    linkLabel: 'See all projects',
    action: 'projects',
  },
  reader: {
    title: 'Papers & Publications',
    desc: 'Research on spatial canvases, reactive layout, and paper-grain shaders.',
    linkLabel: 'View all',
    action: 'papers',
  },
  notes: {
    title: 'Field Notes',
    desc: 'Short essays on software craft, sunny walks, and building slowly.',
    linkLabel: 'Browse notes',
    action: 'notes',
  },
};

export const LawnLanding: React.FC<LawnLandingProps> = ({
  goldenHour,
  onToggleGoldenHour,
  listView,
  onToggleListView,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onNavigate,
  onSelectProject: _onSelectProject,
  onSelectPaper: _onSelectPaper,
  onOpenSocials,
  onOpenContact,
  onOpenHobbies,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredHotspot, setHoveredHotspot] = useState<HotspotId | null>(null);
  const [focusedHotspot, setFocusedHotspot] = useState<HotspotId | null>(null);
  const [pinnedHotspot, setPinnedHotspot] = useState<HotspotId | null>(null);
  const [touchSheetHotspot, setTouchSheetHotspot] = useState<HotspotId | null>(null);
  const [ballActive, setBallActive] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const closeTimerRef = useRef<number | null>(null);
  const focusTimerRef = useRef<number | null>(null);
  const lastPointerTypeRef = useRef<string>('mouse');
  const hotspotRefs = useRef<Partial<Record<HotspotId, HTMLButtonElement | null>>>({});

  // Mobile state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileHotspot, setMobileHotspot] = useState<HotspotId | null>('guitar');

  const activeDesktopHotspot =
    hoveredHotspot ?? focusedHotspot ?? pinnedHotspot ?? touchSheetHotspot;
  const activePopupHotspot =
    !touchSheetHotspot ? (hoveredHotspot ?? focusedHotspot ?? pinnedHotspot) : null;

  const updateAnchorRect = useCallback((id: HotspotId | null) => {
    if (!id) {
      setAnchorRect(null);
      return;
    }
    const el = hotspotRefs.current[id];
    if (el) {
      setAnchorRect(el.getBoundingClientRect());
    }
  }, []);

  useLayoutEffect(() => {
    updateAnchorRect(activePopupHotspot);
  }, [activePopupHotspot, listView, updateAnchorRect]);

  useEffect(() => {
    if (!activePopupHotspot) return;
    const handleReposition = () => updateAnchorRect(activePopupHotspot);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [activePopupHotspot, updateAnchorRect]);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const clearFocusTimer = () => {
    if (focusTimerRef.current !== null) {
      window.clearTimeout(focusTimerRef.current);
      focusTimerRef.current = null;
    }
  };

  const scheduleHoverClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setHoveredHotspot(null);
    }, 150);
  };

  const scheduleFocusBlur = () => {
    clearFocusTimer();
    focusTimerRef.current = window.setTimeout(() => {
      setFocusedHotspot(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      clearCloseTimer();
      clearFocusTimer();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearCloseTimer();
        clearFocusTimer();
        setPinnedHotspot(null);
        setHoveredHotspot(null);
        setFocusedHotspot(null);
        setTouchSheetHotspot(null);
        setBallActive(false);
        setMobileHotspot(null);
        setMobileMenuOpen(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleDirectoryClick = (item: (typeof DIRECTORY_ITEMS)[number]) => {
    if (item.view) {
      onNavigate(item.view);
    } else if (item.action === 'socials') {
      onOpenSocials();
    } else if (item.action === 'contact') {
      onOpenContact();
    } else if (item.action === 'hobbies') {
      onOpenHobbies();
    }
  };

  const mobileSheet = mobileHotspot ? MOBILE_SHEET_DATA[mobileHotspot] : null;
  const touchSheetCopy =
    touchSheetHotspot && touchSheetHotspot !== 'sunhat' ? POPUP_COPY[touchSheetHotspot] : null;

  return (
    <>
      {/* ================= DESKTOP EXPERIENCE (>= md) ================= */}
      <div
        className="hidden md:flex relative min-h-screen w-full overflow-hidden bg-lawn-green flex-col justify-between"
        onClick={() => {
          setPinnedHotspot(null);
          setTouchSheetHotspot(null);
        }}
      >
        {/* Aspect-locked 16:9 lawn stage so illustrated figures & lift masks never drift across aspect ratios */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`relative w-full h-full min-w-full min-h-full transition-[filter,transform] duration-300 ease-out ${
                listView ? 'blur-md scale-105' : ''
              }`}
              style={{
                width: 'max(100vw, calc(100vh * 16 / 9))',
                height: 'max(100vh, calc(100vw * 9 / 16))',
              }}
            >
              <motion.img
                src={ASSETS.parkLawnHero}
                alt="Top-down flat vector illustration of a sunny lime-olive park lawn with small figures playing guitar, sunbathing, reading, wearing a sunhat, and picnicking with a cat"
                referrerPolicy="no-referrer"
                animate={{
                  opacity: !listView && activeDesktopHotspot ? 0.7 : 1,
                }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className={`w-full h-full object-cover select-none golden-hour-surface ${
                  goldenHour ? 'golden-hour-grade' : ''
                }`}
              />

              {/* Ambient breathing, guitar sway, beach ball roll/bounce, cat tail flick, breeze leaves, drifting shadows, and stepped paper grain */}
              <AmbientLawnLayer
                variant="desktop"
                goldenHour={goldenHour}
                activeHotspot={!listView ? activeDesktopHotspot : null}
                ballActive={!listView && ballActive}
                paused={listView}
              />

              {/* Interactive invisible hotspot hit-areas anchored directly to the 5 illustrated figures */}
              {!listView && (
                <div className="pointer-events-auto absolute inset-0 z-15">
                  {DESKTOP_HOTSPOTS.map((spot) => {
                    const isActive = activeDesktopHotspot === spot.id;
                    return (
                      <button
                        key={spot.id}
                        ref={(el) => {
                          hotspotRefs.current[spot.id] = el;
                        }}
                        type="button"
                        aria-label={spot.label}
                        aria-expanded={isActive}
                        onPointerDown={(e) => {
                          lastPointerTypeRef.current = e.pointerType;
                          if (e.pointerType === 'touch') {
                            clearCloseTimer();
                            setHoveredHotspot(null);
                            setFocusedHotspot(null);
                            setPinnedHotspot(null);
                          } else {
                            setTouchSheetHotspot(null);
                          }
                        }}
                        onMouseEnter={() => {
                          if (lastPointerTypeRef.current === 'touch') return;
                          clearCloseTimer();
                          setTouchSheetHotspot(null);
                          setHoveredHotspot(spot.id);
                        }}
                        onMouseLeave={scheduleHoverClose}
                        onFocus={() => {
                          if (lastPointerTypeRef.current === 'touch') return;
                          clearFocusTimer();
                          setFocusedHotspot(spot.id);
                        }}
                        onBlur={scheduleFocusBlur}
                        onClick={(e) => {
                          e.stopPropagation();
                          const isCoarse =
                            lastPointerTypeRef.current === 'touch' ||
                            (typeof window !== 'undefined' &&
                              window.matchMedia('(pointer: coarse)').matches);
                          if (isCoarse) {
                            setHoveredHotspot(null);
                            setFocusedHotspot(null);
                            setPinnedHotspot(null);
                            setTouchSheetHotspot((prev) => (prev === spot.id ? null : spot.id));
                          } else {
                            setTouchSheetHotspot(null);
                            setPinnedHotspot((prev) => (prev === spot.id ? null : spot.id));
                          }
                        }}
                        className={`absolute ${spot.hitClass} rounded-full cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-light-on-primary/90`}
                      />
                    );
                  })}
                  <button
                    type="button"
                    aria-label="Beach ball"
                    onMouseEnter={() => setBallActive(true)}
                    onMouseLeave={() => setBallActive(false)}
                    onFocus={() => setBallActive(true)}
                    onBlur={() => setBallActive(false)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBallActive((prev) => !prev);
                    }}
                    className="absolute left-[32%] top-[71%] w-[7%] h-[11%] rounded-full cursor-pointer bg-transparent focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-light-on-primary/90"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Golden Hour warm amber directional overlay */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-mustard-accent/25 via-transparent to-coral-accent/20 transition-opacity duration-500 ease-out ${
            goldenHour ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Accessible dark-olive scrim over blurred lawn when List View is active */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-light-on-primary-container/65 transition-opacity duration-250 ${
            listView ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle top canopy shade scrim for crisp white nav legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-light-on-primary-container/90 via-light-on-primary-container/65 to-transparent"
        />

        {/* Subtle bottom canopy shade scrim for crisp white marginalia legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-light-on-primary-container/90 via-light-on-primary-container/65 to-transparent"
        />

        {/* Top Navigation Bar */}
        <div className="relative z-20 px-page-margin pt-gutter-xl pb-gutter-md">
          <TopNavBar
            currentView="landing"
            onNavigate={onNavigate}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onSearchSubmit={onSearchSubmit}
            listView={listView}
            onToggleListView={onToggleListView}
            goldenHour={goldenHour}
            onToggleGoldenHour={onToggleGoldenHour}
            onOpenAbout={() => onNavigate('about')}
            showListViewToggle={true}
          />
        </div>

        {/* Center Main Stage: Either Accessible List View OR Lawn with Interactive Hover Popups */}
        {listView ? (
          <main
            aria-label="Portfolio sections directory"
            className="relative z-20 flex-1 flex items-center justify-center px-page-margin py-gutter-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <nav aria-label="All portfolio sections" className="w-full max-w-3xl">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-section gap-y-gutter-md">
                {DIRECTORY_ITEMS.map((item) => (
                  <li key={item.id} className="border-b border-light-on-primary/30 pb-gutter-sm">
                    <button
                      type="button"
                      onClick={() => handleDirectoryClick(item)}
                      className="w-full group flex items-center justify-between gap-gutter-md py-gutter-xs rounded text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-light-on-primary"
                    >
                      <span className="font-headline text-headline-lg text-light-on-primary transition-transform duration-150 ease-out group-hover:translate-x-1">
                        {item.title}
                      </span>
                      <span className="font-label text-label-sm text-light-on-primary/85 whitespace-nowrap">
                        {item.subtitle}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </main>
        ) : (
          <main className="relative z-20 flex-1 pointer-events-none" aria-label="Sunny park lawn illustration">
            <AnimatePresence>
              {activePopupHotspot && anchorRect && (
                <HotspotPopup
                  key={activePopupHotspot}
                  hotspotId={activePopupHotspot}
                  anchorRect={anchorRect}
                  onMouseEnter={() => {
                    clearCloseTimer();
                    clearFocusTimer();
                  }}
                  onMouseLeave={scheduleHoverClose}
                  onFocus={clearFocusTimer}
                  onBlur={scheduleFocusBlur}
                  onNavigate={onNavigate}
                  onOpenSocials={onOpenSocials}
                  onOpenContact={onOpenContact}
                />
              )}
            </AnimatePresence>

            {/* Touch-device bottom sheet when tapping a person on >= md touchscreens */}
            <AnimatePresence>
              {touchSheetHotspot && (
                <motion.aside
                  key={`touch-sheet-${touchSheetHotspot}`}
                  role="dialog"
                  aria-label="Character details"
                  onClick={(e) => e.stopPropagation()}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '100%' }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '100%' }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.14 }
                      : { type: 'spring', stiffness: 300, damping: 26 }
                  }
                  style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
                  className="pointer-events-auto fixed bottom-0 inset-x-0 z-40 border-t border-white/75 bg-white/80 backdrop-blur-md px-gutter-lg pt-gutter-sm pb-gutter-lg sheet-shadow"
                >
                  <div className="w-10 h-1 rounded-full bg-light-outline-variant mx-auto mb-gutter-md" />
                  <div className="max-w-lg mx-auto">
                    <div className="flex items-start justify-between gap-gutter-md mb-gutter-xs">
                      <h2 className="font-title text-title-md text-light-on-surface">
                        {touchSheetHotspot === 'sunhat' ? 'Socials' : touchSheetCopy?.title}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setTouchSheetHotspot(null)}
                        aria-label="Close sheet"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-light-on-surface-variant hover:bg-light-surface-container cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                          close
                        </span>
                      </button>
                    </div>
                    <p className="font-body text-body-md text-light-on-surface-variant mb-gutter-md">
                      {touchSheetHotspot === 'sunhat'
                        ? 'Find me around the web.'
                        : touchSheetCopy?.description}
                    </p>
                    {touchSheetHotspot === 'sunhat' ? (
                      <SocialButtonsRow
                        onOpenSocials={onOpenSocials}
                        onOpenContact={onOpenContact}
                      />
                    ) : (
                      touchSheetCopy && (
                        <button
                          type="button"
                          onClick={() => onNavigate(touchSheetCopy.targetView)}
                          className="inline-flex items-center gap-gutter-xs font-label text-label-sm text-light-primary transition-opacity duration-150 ease-out hover:opacity-75 cursor-pointer"
                        >
                          <span>{touchSheetCopy.ctaLabel}</span>
                          <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                            arrow_forward
                          </span>
                        </button>
                      )
                    )}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>
          </main>
        )}

        {/* Bottom Marginalia Bar */}
        <FooterMarginalia
          variant="lawn"
          onOpenSocials={onOpenSocials}
          onOpenContact={onOpenContact}
        />
      </div>

      {/* ================= MOBILE EXPERIENCE (< md) ================= */}
      <div className="md:hidden relative min-h-screen w-full bg-lawn-green overflow-x-hidden">
        {/* Simplified Fixed Top Bar: Logo + Menu Icon */}
        <header className="fixed top-0 inset-x-0 z-30">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-light-on-primary-container/90 via-light-on-primary-container/55 to-transparent"
          />
          <div className="relative flex items-center justify-between px-gutter-lg py-gutter-md">
            <button
              type="button"
              onClick={() => {
                onNavigate('landing');
                setMobileMenuOpen(false);
              }}
              aria-label="Azzah home"
              className="font-display text-display-lg-mobile text-light-on-primary leading-none cursor-pointer"
            >
              A.
            </button>

            <div className="flex items-center gap-gutter-sm">
              <button
                type="button"
                onClick={onToggleGoldenHour}
                aria-label="Toggle golden hour lighting"
                className={`inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors cursor-pointer ${
                  goldenHour
                    ? 'border-mustard-accent bg-mustard-accent text-light-on-surface'
                    : 'border-light-on-primary/40 bg-light-primary/90 text-light-on-primary'
                }`}
              >
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  {goldenHour ? 'wb_twilight' : 'wb_sunny'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-light-on-primary/40 bg-light-primary/90 text-light-on-primary transition-colors duration-150 ease-out hover:bg-light-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>

          {/* Collapsible Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <nav
              aria-label="Mobile navigation"
              className="mx-gutter-lg rounded-md border border-light-on-primary/60 bg-light-surface-container-lowest/95 backdrop-blur-md p-gutter-md shadow-lg"
            >
              <div className="flex flex-col gap-gutter-sm">
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('landing');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-label text-label-lg text-light-primary py-1.5 cursor-pointer"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('projects');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-label text-label-lg text-light-on-surface py-1.5 cursor-pointer"
                >
                  Gallery
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('papers');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-label text-label-lg text-light-on-surface py-1.5 cursor-pointer"
                >
                  Papers &amp; Publications
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('timeline');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-label text-label-lg text-light-on-surface py-1.5 cursor-pointer"
                >
                  Timeline
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('notes');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-label text-label-lg text-light-on-surface py-1.5 cursor-pointer"
                >
                  Field Notes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onNavigate('playground');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left font-label text-label-lg text-light-on-surface py-1.5 cursor-pointer"
                >
                  Playground
                </button>
                <div className="border-t border-light-outline-variant/60 pt-2 mt-1 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleListView();
                      setMobileMenuOpen(false);
                    }}
                    className="font-label text-label-sm text-light-primary py-1 cursor-pointer"
                  >
                    {listView ? 'Switch to Lawn view' : 'Switch to List view'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSearchSubmit('');
                    }}
                    className="inline-flex items-center gap-1 font-label text-label-sm text-light-on-surface-variant py-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-body-md">search</span>
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </nav>
          )}
        </header>

        {listView ? (
          <main
            aria-label="Mobile accessible directory"
            className="relative min-h-screen px-6 pt-24 pb-12 bg-light-on-primary-container/90"
          >
            <ul className="flex flex-col gap-gutter-md">
              {DIRECTORY_ITEMS.map((item) => (
                <li key={item.id} className="border-b border-light-on-primary/30 pb-gutter-sm">
                  <button
                    type="button"
                    onClick={() => handleDirectoryClick(item)}
                    className="w-full flex items-center justify-between gap-gutter-md py-1 text-left cursor-pointer"
                  >
                    <span className="font-headline text-headline-lg text-light-on-primary">
                      {item.title}
                    </span>
                    <span className="font-label text-label-sm text-light-on-primary/80">
                      {item.subtitle}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </main>
        ) : (
          /* Vertically Scrollable Park Lawn */
          <main
            className="relative w-full h-[920px] overflow-hidden bg-lawn-green"
            aria-label="Scrollable park lawn with interactive hotspots"
          >
            <motion.img
              src={ASSETS.parkLawnMobile}
              alt="Vertical top-down flat vector illustration of a sunny park lawn with people sunbathing, reading, playing guitar, wearing a sunhat, and picnicking with a cat"
              referrerPolicy="no-referrer"
              animate={{
                opacity: !listView && mobileHotspot ? 0.7 : 1,
              }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className={`w-full h-full object-cover object-center select-none pointer-events-none golden-hour-surface ${
                goldenHour ? 'golden-hour-grade' : ''
              }`}
            />
            <AmbientLawnLayer
              variant="mobile"
              goldenHour={goldenHour}
              activeHotspot={mobileHotspot}
              paused={listView}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-mustard-accent/25 via-transparent to-coral-accent/20 transition-opacity duration-500 ease-out ${
                goldenHour ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Hotspot 1: Sunbather (Projects) */}
            <button
              type="button"
              onClick={() => setMobileHotspot('sunbather')}
              aria-label="Projects — sunbathing person"
              className={`absolute left-[22%] top-[22%] w-11 h-11 rounded-full border-2 border-light-on-primary flex items-center justify-center transition-transform duration-150 ease-out cursor-pointer ${
                mobileHotspot === 'sunbather'
                  ? 'bg-mustard-accent text-light-on-surface shadow-lg scale-110'
                  : 'bg-light-primary/85 text-light-on-primary shadow-md hover:scale-110'
              }`}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                wb_sunny
              </span>
            </button>

            {/* Hotspot 2: Reader (Papers & Publications) */}
            <button
              type="button"
              onClick={() => setMobileHotspot('reader')}
              aria-label="Papers and Publications — reading person"
              className={`absolute left-[68%] top-[18%] w-11 h-11 rounded-full border-2 border-light-on-primary flex items-center justify-center transition-transform duration-150 ease-out cursor-pointer ${
                mobileHotspot === 'reader'
                  ? 'bg-mustard-accent text-light-on-surface shadow-lg scale-110'
                  : 'bg-light-primary/85 text-light-on-primary shadow-md hover:scale-110'
              }`}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                menu_book
              </span>
            </button>

            {/* Hotspot 3: Sunhat (Socials) */}
            <button
              type="button"
              onClick={() => setMobileHotspot('sunhat')}
              aria-label="Socials — person in sunhat"
              className={`absolute left-[75%] top-[40%] w-11 h-11 rounded-full border-2 border-light-on-primary flex items-center justify-center transition-transform duration-150 ease-out cursor-pointer ${
                mobileHotspot === 'sunhat'
                  ? 'bg-mustard-accent text-light-on-surface shadow-lg scale-110'
                  : 'bg-light-primary/85 text-light-on-primary shadow-md hover:scale-110'
              }`}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                alternate_email
              </span>
            </button>

            {/* Hotspot 4: Guitarist (About Me) */}
            <button
              type="button"
              onClick={() => setMobileHotspot('guitar')}
              aria-label="About Me — person with guitar"
              className={`absolute left-[45%] top-[52%] w-11 h-11 rounded-full border-2 border-light-on-primary flex items-center justify-center transition-transform duration-150 ease-out cursor-pointer ${
                mobileHotspot === 'guitar'
                  ? 'bg-mustard-accent text-light-on-surface shadow-lg scale-110'
                  : 'bg-light-primary/85 text-light-on-primary shadow-md hover:scale-110'
              }`}
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                music_note
              </span>
            </button>

            {/* Hotspot 5: Person with Cat (Field Notes) */}
            <button
              type="button"
              onClick={() => setMobileHotspot('notes')}
              aria-label="Field Notes — person with cat"
              className={`absolute left-[72%] top-[74%] w-11 h-11 rounded-full border-2 border-light-on-primary flex items-center justify-center transition-transform duration-150 ease-out cursor-pointer ${
                mobileHotspot === 'notes'
                  ? 'bg-mustard-accent text-light-on-surface shadow-lg scale-110'
                  : 'bg-light-primary/85 text-light-on-primary shadow-md hover:scale-110'
              }`}
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                pets
              </span>
            </button>
          </main>
        )}

        {/* Mobile Bottom Sheet */}
        <AnimatePresence>
          {!listView && mobileSheet && mobileHotspot && (
            <motion.aside
              key={`mobile-sheet-${mobileHotspot}`}
              role="dialog"
              aria-label="Character details"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '100%' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: '100%' }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.14 }
                  : { type: 'spring', stiffness: 300, damping: 26 }
              }
              style={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
              className="fixed bottom-0 inset-x-0 z-30 border-t border-white/75 bg-white/80 backdrop-blur-md px-gutter-lg pt-gutter-sm pb-gutter-lg sheet-shadow"
            >
              <div className="w-10 h-1 rounded-full bg-light-outline-variant mx-auto mb-gutter-md" />

              <div className="flex items-start justify-between gap-gutter-md mb-gutter-xs">
                <h2 className="font-title text-title-md text-light-on-surface">{mobileSheet.title}</h2>
                <button
                  type="button"
                  onClick={() => setMobileHotspot(null)}
                  aria-label="Close sheet"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-light-on-surface-variant hover:bg-light-surface-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    close
                  </span>
                </button>
              </div>

              <p className="font-body text-body-md text-light-on-surface-variant mb-gutter-md">
                {mobileSheet.desc}
              </p>

              {mobileHotspot === 'sunhat' ? (
                <SocialButtonsRow onOpenSocials={onOpenSocials} onOpenContact={onOpenContact} />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (mobileSheet.action === 'socials') onOpenSocials();
                    else onNavigate(mobileSheet.action);
                  }}
                  className="inline-flex items-center gap-gutter-xs font-label text-label-sm text-light-primary transition-opacity duration-150 ease-out hover:opacity-75 cursor-pointer"
                >
                  <span>{mobileSheet.linkLabel}</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              )}
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
