import React, { useEffect, useRef, useState } from 'react';
import {
  AppView,
  ASSETS,
  FIELD_NOTES,
  FieldNote,
  TIMELINE_ENTRIES,
} from '../data/portfolioData';
import { FooterMarginalia } from './FooterMarginalia';
import { SubpageHeader } from './SubpageHeader';

interface SecondaryViewSharedProps {
  onNavigate: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (q: string) => void;
  goldenHour: boolean;
  onToggleGoldenHour: () => void;
  onOpenSocials: () => void;
  onOpenContact: () => void;
}

/* ==================== TIMELINE VIEW ==================== */
export const TimelinePage: React.FC<SecondaryViewSharedProps> = (props) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-light-surface text-light-on-surface">
      <SubpageHeader
        title="Timeline"
        subtitle="A chronological log of sunny web tools, research publications, and quiet essays from 2022 to 2026."
        currentView="timeline"
        onOpenAbout={() => props.onNavigate('about')}
        {...props}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-page-margin py-section">
        <div className="flex flex-col divide-y divide-light-outline-variant/60 border-y border-light-outline-variant/60">
          {TIMELINE_ENTRIES.map((entry) => (
            <article
              key={entry.id}
              className="py-gutter-lg grid grid-cols-1 md:grid-cols-12 gap-gutter-md items-baseline"
            >
              <div className="md:col-span-3 font-mono text-mono-sm text-light-on-surface-variant tabular-nums">
                {entry.year} · {entry.season} · {entry.kind}
              </div>
              <div className="md:col-span-7 flex flex-col gap-gutter-xs">
                <h2 className="font-title text-title-md text-light-on-surface">{entry.title}</h2>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  {entry.summary}
                </p>
              </div>
              <div className="md:col-span-2 flex md:justify-end">
                <button
                  type="button"
                  onClick={() => props.onNavigate(entry.linkView)}
                  className="inline-flex items-center gap-gutter-xs font-label text-label-sm text-light-primary hover:opacity-75 transition-opacity cursor-pointer whitespace-nowrap"
                >
                  <span>Explore</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <FooterMarginalia
        variant="surface"
        onOpenSocials={props.onOpenSocials}
        onOpenContact={props.onOpenContact}
      />
    </div>
  );
};

/* ==================== ABOUT VIEW ==================== */
export const AboutPage: React.FC<SecondaryViewSharedProps> = (props) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-light-surface text-light-on-surface">
      <SubpageHeader
        title="About Azzah"
        subtitle="Full-stack creative developer crafting calm, sunlit software tools and spatial interfaces."
        currentView="about"
        onOpenAbout={() => props.onNavigate('about')}
        {...props}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-page-margin py-section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-xl items-start">
          <div className="md:col-span-4">
            <div className="rounded-md border border-light-outline-variant bg-light-surface-container-lowest overflow-hidden">
              <img
                src={ASSETS.azzahAvatar}
                alt="Portrait of Azzah at a sunlit wooden desk"
                referrerPolicy="no-referrer"
                className="w-full aspect-square object-cover"
              />
              <div className="p-gutter-lg border-t border-light-outline-variant/60 flex flex-col gap-gutter-xs">
                <span className="font-title text-title-md text-light-on-surface">Azzah</span>
                <span className="font-body text-label-sm text-light-on-surface-variant">
                  Creative Developer &amp; Spatial UI Researcher
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 flex flex-col gap-gutter-lg">
            <section className="flex flex-col gap-gutter-md">
              <h2 className="font-display text-3xl text-light-on-surface">
                Building calm, sunny software
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant leading-relaxed">
                I design and engineer browser-native tools that feel tactile, legible, and unhurried. My work sits at the intersection of spatial interfaces, WebGL/SVG graphics, and local-first reading environments.
              </p>
              <p className="font-body text-body-md text-light-on-surface-variant leading-relaxed">
                Whether sketching infinite canvas primitives in Rust/WASM, tuning procedural paper-grain shaders, or writing mellow acoustic patches in Web Audio, I care deeply about warm contrast, deterministic interaction, and interfaces that leave room to breathe.
              </p>
            </section>

            <section className="border-t border-light-outline-variant/60 pt-gutter-lg grid grid-cols-1 sm:grid-cols-2 gap-gutter-lg">
              <div>
                <h3 className="font-title text-title-md text-light-on-surface mb-gutter-xs">
                  Areas of focus
                </h3>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  Spatial canvases, Web Audio synthesis, typography tooling, local-first IndexedDB storage, and procedural shaders.
                </p>
              </div>
              <div>
                <h3 className="font-title text-title-md text-light-on-surface mb-gutter-xs">
                  Outside the editor
                </h3>
                <p className="font-body text-body-md text-light-on-surface-variant">
                  Playing fingerstyle acoustic guitar on sunlit lawns, sketching UI ideas in paper notebooks, and befriending neighborhood cats.
                </p>
              </div>
            </section>

            <div className="flex flex-wrap items-center gap-gutter-md pt-gutter-sm">
              <button
                type="button"
                onClick={() => props.onNavigate('projects')}
                className="inline-flex items-center gap-gutter-xs rounded-full bg-light-primary text-light-on-primary px-gutter-lg py-2 font-label text-label-sm hover:opacity-90 transition-opacity cursor-pointer"
              >
                <span>Browse Projects</span>
                <span className="material-symbols-outlined text-body-md">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => props.onNavigate('papers')}
                className="inline-flex items-center gap-gutter-xs rounded-full border border-light-outline-variant bg-light-surface-container-lowest px-gutter-lg py-2 font-label text-label-sm text-light-on-surface hover:bg-light-surface-container transition-colors cursor-pointer"
              >
                <span>Read Papers</span>
              </button>
              <button
                type="button"
                onClick={props.onOpenContact}
                className="inline-flex items-center gap-gutter-xs rounded-full border border-light-outline-variant bg-light-surface-container-lowest px-gutter-lg py-2 font-label text-label-sm text-light-on-surface hover:bg-light-surface-container transition-colors cursor-pointer"
              >
                <span>Say hello</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <FooterMarginalia
        variant="surface"
        onOpenSocials={props.onOpenSocials}
        onOpenContact={props.onOpenContact}
      />
    </div>
  );
};

/* ==================== FIELD NOTES (BLOG) VIEW ==================== */
export const FieldNotesPage: React.FC<SecondaryViewSharedProps> = (props) => {
  const [selectedNote, setSelectedNote] = useState<FieldNote>(FIELD_NOTES[0]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-light-surface text-light-on-surface">
      <SubpageHeader
        title="Field Notes"
        subtitle="Short essays on software craft, sunny walks, golden hour palettes, and building slowly."
        currentView="notes"
        onOpenAbout={() => props.onNavigate('about')}
        {...props}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-page-margin py-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-xl">
          <div className="lg:col-span-5 flex flex-col divide-y divide-light-outline-variant/60 border-y border-light-outline-variant/60">
            {FIELD_NOTES.map((note) => {
              const isSelected = selectedNote.id === note.id;
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => setSelectedNote(note)}
                  className={`py-gutter-lg px-gutter-md text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-light-surface-container-low'
                      : 'hover:bg-light-surface-container-low/50'
                  }`}
                >
                  <div className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums mb-1">
                    {note.date} · {note.readTime}
                  </div>
                  <h2 className="font-title text-title-md text-light-on-surface mb-1">
                    {note.title}
                  </h2>
                  <p className="font-body text-label-sm text-light-on-surface-variant">
                    {note.excerpt}
                  </p>
                </button>
              );
            })}
          </div>

          <article className="lg:col-span-7 rounded-md border border-light-outline-variant bg-light-surface-container-lowest p-gutter-xl">
            <div className="font-mono text-mono-sm text-light-on-surface-variant tabular-nums mb-2">
              {selectedNote.date} · {selectedNote.readTime}
            </div>
            <h2 className="font-display text-3xl text-light-on-surface mb-gutter-lg">
              {selectedNote.title}
            </h2>
            <div className="flex flex-col gap-gutter-md">
              {selectedNote.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-body-md text-light-on-surface-variant leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </main>

      <FooterMarginalia
        variant="surface"
        onOpenSocials={props.onOpenSocials}
        onOpenContact={props.onOpenContact}
      />
    </div>
  );
};

/* ==================== PLAYGROUND VIEW ==================== */
const CHORDS: { label: string; notes: number[]; description: string }[] = [
  { label: 'Cmaj7', notes: [261.63, 329.63, 392.0, 493.88], description: 'Warm noon grass' },
  { label: 'Fmaj7', notes: [174.61, 220.0, 261.63, 329.63], description: 'Dappled oak shade' },
  { label: 'Am7', notes: [220.0, 261.63, 329.63, 392.0], description: 'Acoustic afternoon' },
  { label: 'G6', notes: [196.0, 246.94, 293.66, 329.63], description: 'Golden hour breeze' },
];

export const PlaygroundPage: React.FC<SecondaryViewSharedProps> = (props) => {
  const [activeChord, setActiveChord] = useState<string | null>(null);
  const [sunAngle, setSunAngle] = useState(34);
  const [grainIntensity, setGrainIntensity] = useState(45);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const playChord = (chord: (typeof CHORDS)[number]) => {
    setActiveChord(chord.label);
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      chord.notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.045);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1150, now);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.045);
        gain.gain.exponentialRampToValueAtTime(0.075, now + idx * 0.045 + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.045 + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.045);
        osc.stop(now + idx * 0.045 + 1.55);
      });
    } catch {
      // Audio playback gracefully skipped if blocked
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-light-surface text-light-on-surface">
      <SubpageHeader
        title="Playground"
        subtitle="Small interactive toys from Lawn Synth Studio and Papergrain Shaders."
        currentView="playground"
        onOpenAbout={() => props.onNavigate('about')}
        {...props}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 md:px-page-margin py-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-xl">
          {/* Toy 1: Acoustic Lawn Synth */}
          <section className="rounded-md border border-light-outline-variant bg-light-surface-container-lowest p-gutter-xl flex flex-col justify-between gap-gutter-lg">
            <div>
              <div className="font-mono text-mono-sm text-light-on-surface-variant mb-1">
                Web Audio · Polyphonic Pad
              </div>
              <h2 className="font-title text-title-md text-light-on-surface mb-2">
                Mini Lawn Synth
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant">
                Tap a chord pad below to strum a warm filtered triangle-wave arpeggio inspired by Lawn Synth Studio.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-gutter-md">
              {CHORDS.map((chord) => {
                const isActive = activeChord === chord.label;
                return (
                  <button
                    key={chord.label}
                    type="button"
                    onClick={() => playChord(chord)}
                    className={`rounded-md border p-gutter-md text-left transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'border-light-primary bg-light-secondary-container text-light-on-secondary-container'
                        : 'border-light-outline-variant bg-light-surface hover:bg-light-surface-container-low text-light-on-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display text-xl">{chord.label}</span>
                      <span className="material-symbols-outlined text-body-md">music_note</span>
                    </div>
                    <div className="font-body text-label-sm opacity-80">{chord.description}</div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Toy 2: Papergrain & Canopy Light Study */}
          <section className="rounded-md border border-light-outline-variant bg-light-surface-container-lowest p-gutter-xl flex flex-col justify-between gap-gutter-lg">
            <div>
              <div className="font-mono text-mono-sm text-light-on-surface-variant mb-1">
                SVG Turbulence · Canopy Shadow Study
              </div>
              <h2 className="font-title text-title-md text-light-on-surface mb-2">
                Papergrain &amp; Sun Angle
              </h2>
              <p className="font-body text-body-md text-light-on-surface-variant">
                Adjust afternoon sun angle and paper fiber density across warm cream and olive swatches.
              </p>
            </div>

            <div className="relative h-44 rounded-md border border-light-outline-variant overflow-hidden grid grid-cols-2">
              <div className="bg-light-surface p-gutter-md flex items-end">
                <span className="font-mono text-mono-sm text-light-on-surface-variant relative z-10">
                  Cream #FAFAEC
                </span>
              </div>
              <div className="bg-lawn-green p-gutter-md flex items-end">
                <span className="font-mono text-mono-sm text-light-on-primary relative z-10">
                  Olive #8DB33F
                </span>
              </div>

              {/* Dynamic diagonal sunbeam & leaf canopy shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-transform duration-150"
                style={{
                  background: `linear-gradient(${sunAngle}deg, rgba(46, 66, 0, 0.28) 0%, rgba(46, 66, 0, 0.08) 42%, rgba(255, 255, 255, 0.16) 70%, rgba(46, 66, 0, 0.22) 100%)`,
                }}
              />
              {/* Procedural SVG paper grain */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-full h-full mix-blend-multiply"
                style={{ opacity: grainIntensity / 100 }}
              >
                <filter id="paper-grain-filter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.8"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-grain-filter)" />
              </svg>
            </div>

            <div className="flex flex-col gap-gutter-sm">
              <label className="flex items-center justify-between gap-gutter-md font-mono text-mono-sm text-light-on-surface-variant">
                <span>Sun angle ({sunAngle} deg)</span>
                <input
                  type="range"
                  min={0}
                  max={180}
                  value={sunAngle}
                  onChange={(e) => setSunAngle(Number(e.target.value))}
                  className="w-48 accent-light-primary cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between gap-gutter-md font-mono text-mono-sm text-light-on-surface-variant">
                <span>Grain intensity ({grainIntensity}%)</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={grainIntensity}
                  onChange={(e) => setGrainIntensity(Number(e.target.value))}
                  className="w-48 accent-light-primary cursor-pointer"
                />
              </label>
            </div>
          </section>
        </div>
      </main>

      <FooterMarginalia
        variant="surface"
        onOpenSocials={props.onOpenSocials}
        onOpenContact={props.onOpenContact}
      />
    </div>
  );
};
