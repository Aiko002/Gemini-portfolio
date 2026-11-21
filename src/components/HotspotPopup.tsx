import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AppView, ASSETS, HotspotId } from '../data/portfolioData';

type PlacementSide = 'right' | 'left' | 'bottom' | 'top';

interface HotspotPopupProps {
  hotspotId: HotspotId;
  anchorRect: DOMRect;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onNavigate: (view: AppView) => void;
  onOpenSocials: () => void;
  onOpenContact: () => void;
}

const PREFERRED_SIDE: Record<HotspotId, PlacementSide[]> = {
  guitar: ['right', 'left', 'top', 'bottom'],
  sunbather: ['right', 'bottom', 'left', 'top'],
  reader: ['left', 'bottom', 'right', 'top'],
  sunhat: ['right', 'top', 'bottom', 'left'],
  notes: ['left', 'top', 'right', 'bottom'],
};

export const POPUP_COPY: Record<
  Exclude<HotspotId, 'sunhat'>,
  {
    title: string;
    description: string;
    ctaLabel: string;
    targetView: AppView;
    avatar?: string;
  }
> = {
  guitar: {
    title: 'About Me',
    description: 'Crafting calm, playful web tools in the sun.',
    ctaLabel: 'Read more',
    targetView: 'about',
    avatar: ASSETS.azzahAvatar,
  },
  sunbather: {
    title: 'Projects',
    description: 'Interactive maps, synths, and spatial toys.',
    ctaLabel: 'See all projects',
    targetView: 'projects',
  },
  reader: {
    title: 'Papers & Publications',
    description: 'Research on spatial UI and paper shaders.',
    ctaLabel: 'View all',
    targetView: 'papers',
  },
  notes: {
    title: 'Field Notes',
    description: 'Short essays on craft and sunny walks.',
    ctaLabel: 'Browse notes',
    targetView: 'notes',
  },
};

interface SocialButtonsRowProps {
  onOpenSocials: () => void;
  onOpenContact: () => void;
}

export const SocialButtonsRow: React.FC<SocialButtonsRowProps> = ({
  onOpenSocials,
  onOpenContact,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const items = [
    {
      label: 'GitHub',
      onClick: onOpenSocials,
      path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    },
    {
      label: 'LinkedIn',
      onClick: onOpenSocials,
      path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
    },
    {
      label: 'X',
      onClick: onOpenSocials,
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    },
    {
      label: 'Instagram',
      onClick: onOpenSocials,
      path: 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z',
    },
    {
      label: 'Email',
      onClick: onOpenContact,
      path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
    },
  ];

  return (
    <div className="flex items-center gap-gutter-sm">
      {items.map((item) => (
        <motion.button
          key={item.label}
          type="button"
          onClick={item.onClick}
          aria-label={item.label}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.16 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-light-surface-container-low text-light-on-surface transition-colors duration-150 ease-out hover:bg-light-primary hover:text-light-on-primary cursor-pointer"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d={item.path} />
          </svg>
        </motion.button>
      ))}
    </div>
  );
};

export const HotspotPopup: React.FC<HotspotPopupProps> = ({
  hotspotId,
  anchorRect,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onNavigate,
  onOpenSocials,
  onOpenContact,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{
    left: number;
    top: number;
    side: PlacementSide;
    arrowOffset: number;
  }>({
    left: anchorRect.right + 14,
    top: anchorRect.top,
    side: 'right',
    arrowOffset: 24,
  });

  useLayoutEffect(() => {
    const el = cardRef.current;
    const cardW = el ? el.offsetWidth : 320;
    const cardH = el ? el.offsetHeight : 144;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 16;
    const topSafe = 88;
    const bottomSafe = 64;
    const gap = 14;

    const anchorCx = anchorRect.left + anchorRect.width / 2;
    const anchorCy = anchorRect.top + anchorRect.height / 2;

    const fits = (side: PlacementSide): boolean => {
      if (side === 'right') return anchorRect.right + gap + cardW <= vw - margin;
      if (side === 'left') return anchorRect.left - gap - cardW >= margin;
      if (side === 'bottom') return anchorRect.bottom + gap + cardH <= vh - bottomSafe;
      return anchorRect.top - gap - cardH >= topSafe;
    };

    const availableSpace = (side: PlacementSide): number => {
      if (side === 'right') return vw - margin - (anchorRect.right + gap);
      if (side === 'left') return anchorRect.left - gap - margin;
      if (side === 'bottom') return vh - bottomSafe - (anchorRect.bottom + gap);
      return anchorRect.top - gap - topSafe;
    };

    const order = PREFERRED_SIDE[hotspotId];
    const chosenSide =
      order.find(fits) ??
      [...order].sort((a, b) => availableSpace(b) - availableSpace(a))[0];

    let left = 0;
    let top = 0;

    if (chosenSide === 'right') {
      left = Math.min(vw - cardW - margin, Math.max(margin, anchorRect.right + gap));
      top = Math.min(
        vh - cardH - bottomSafe,
        Math.max(topSafe, anchorCy - cardH / 2)
      );
    } else if (chosenSide === 'left') {
      left = Math.max(margin, Math.min(vw - cardW - margin, anchorRect.left - gap - cardW));
      top = Math.min(
        vh - cardH - bottomSafe,
        Math.max(topSafe, anchorCy - cardH / 2)
      );
    } else if (chosenSide === 'bottom') {
      left = Math.min(vw - cardW - margin, Math.max(margin, anchorCx - cardW / 2));
      top = Math.min(vh - cardH - bottomSafe, Math.max(topSafe, anchorRect.bottom + gap));
    } else {
      left = Math.min(vw - cardW - margin, Math.max(margin, anchorCx - cardW / 2));
      top = Math.max(topSafe, Math.min(vh - cardH - bottomSafe, anchorRect.top - gap - cardH));
    }

    const arrowOffset =
      chosenSide === 'right' || chosenSide === 'left'
        ? Math.min(cardH - 22, Math.max(22, anchorCy - top))
        : Math.min(cardW - 22, Math.max(22, anchorCx - left));

    setCoords({ left, top, side: chosenSide, arrowOffset });
  }, [hotspotId, anchorRect]);

  const originBySide: Record<PlacementSide, string> = {
    right: '0% 50%',
    left: '100% 50%',
    bottom: '50% 0%',
    top: '50% 100%',
  };

  return (
    <motion.section
      ref={cardRef}
      aria-label={hotspotId === 'sunhat' ? 'Socials' : POPUP_COPY[hotspotId].title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={(e) => e.stopPropagation()}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      transition={
        prefersReducedMotion
          ? { duration: 0.12 }
          : { type: 'spring', stiffness: 300, damping: 22 }
      }
      style={{
        position: 'fixed',
        left: `${coords.left}px`,
        top: `${coords.top}px`,
        transformOrigin: originBySide[coords.side],
        borderRadius: '12px',
        zIndex: 35,
      }}
      className="pointer-events-auto w-80 bg-white/80 backdrop-blur-md border border-white/75 p-gutter-lg lawn-glass-shadow"
    >
      {/* Edge-flush directional pointer arrow (zero double-alpha overlap inside card) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bg-white/80 backdrop-blur-md"
        style={
          coords.side === 'right'
            ? {
                left: '-8px',
                top: `${coords.arrowOffset - 7}px`,
                width: '8px',
                height: '14px',
                clipPath: 'polygon(100% 0, 0 50%, 100% 100%)',
              }
            : coords.side === 'left'
              ? {
                  right: '-8px',
                  top: `${coords.arrowOffset - 7}px`,
                  width: '8px',
                  height: '14px',
                  clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
                }
              : coords.side === 'bottom'
                ? {
                    top: '-8px',
                    left: `${coords.arrowOffset - 7}px`,
                    width: '14px',
                    height: '8px',
                    clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
                  }
                : {
                    bottom: '-8px',
                    left: `${coords.arrowOffset - 7}px`,
                    width: '14px',
                    height: '8px',
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  }
        }
      />

      {hotspotId === 'sunhat' ? (
        <>
          <div className="flex flex-col gap-gutter-xs mb-gutter-md">
            <h2 className="font-title text-title-md text-light-on-surface">Socials</h2>
            <p className="font-body text-body-md text-light-on-surface-variant whitespace-nowrap">
              Find me around the web.
            </p>
          </div>
          <SocialButtonsRow onOpenSocials={onOpenSocials} onOpenContact={onOpenContact} />
        </>
      ) : (
        <>
          <div className="flex items-center gap-gutter-md mb-gutter-xs">
            {POPUP_COPY[hotspotId].avatar && (
              <img
                src={POPUP_COPY[hotspotId].avatar}
                alt="Portrait of Azzah"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-light-outline-variant"
              />
            )}
            <h2 className="font-title text-title-md text-light-on-surface">
              {POPUP_COPY[hotspotId].title}
            </h2>
          </div>

          <p className="font-body text-body-md text-light-on-surface-variant mb-gutter-md whitespace-nowrap">
            {POPUP_COPY[hotspotId].description}
          </p>

          <button
            type="button"
            onClick={() => onNavigate(POPUP_COPY[hotspotId].targetView)}
            className="inline-flex items-center gap-gutter-xs font-label text-label-sm text-light-primary transition-opacity duration-150 ease-out hover:opacity-75 cursor-pointer"
          >
            <span>{POPUP_COPY[hotspotId].ctaLabel}</span>
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </>
      )}
    </motion.section>
  );
};
