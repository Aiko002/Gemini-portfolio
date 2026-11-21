export type AppView =
  | 'landing'
  | 'projects'
  | 'papers'
  | 'timeline'
  | 'about'
  | 'notes'
  | 'playground';

export type HotspotId = 'guitar' | 'sunbather' | 'reader' | 'sunhat' | 'notes';

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  tags: string[];
  image: string;
  alt: string;
  summary: string;
  details: string;
  highlights: string[];
  repoSlug: string;
  liveActionLabel: string;
  targetView?: AppView;
}

export interface PaperItem {
  id: string;
  year: string;
  venue: string;
  topic: 'Spatial UI' | 'Systems' | 'Graphics' | 'Tooling';
  title: string;
  authors: { name: string; isAzzah?: boolean }[];
  abstract: string;
  bibtex: string;
  repoSlug: string;
  pages: number;
}

export interface TimelineEntry {
  id: string;
  year: string;
  season: string;
  kind: 'Project' | 'Paper' | 'Field Note';
  title: string;
  summary: string;
  linkView: AppView;
}

export interface FieldNote {
  id: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  body: string[];
}

export const ASSETS = {
  parkLawnHero: '/src/assets/images/park_lawn_hero_1795256852107.jpg',
  parkLawnMobile: '/src/assets/images/park_lawn_mobile_1795256920197.jpg',
  lawnHeaderMascot: '/src/assets/images/lawn_header_mascot_1795256853639.jpg',
  azzahAvatar: '/src/assets/images/azzah_avatar_1795256853190.jpg',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sunspot-park-map',
    title: 'Sunspot Park Map',
    year: '2026',
    tags: ['WebGL', 'GeoJSON', 'React'],
    image: '/src/assets/images/project_thumb_sunspot_1795256853119.jpg',
    alt: 'Sunspot Park Map interface preview',
    summary:
      'Interactive top-down park topography explorer that tracks dappled shade, sunny picnic lawns, and quiet walking paths throughout the day.',
    details:
      'Built on a custom WebGL contour shader over municipal GeoJSON elevation data, Sunspot models solar azimuth against canopy polygons in real time so visitors can find warm grass or cool oak shade at any hour.',
    highlights: [
      'Real-time solar shadow projection at 60fps across 14,000 canopy polygons',
      'Zero-tile vector contour rendering with smooth zoom interpolation',
      'Accessible keyboard trail navigation and audio-cued landmark descriptions',
    ],
    repoSlug: 'azzah/sunspot-park-map',
    liveActionLabel: 'Inspect Map Study',
  },
  {
    id: 'lawn-synth-studio',
    title: 'Lawn Synth Studio',
    year: '2025',
    tags: ['Web Audio', 'Canvas', 'TypeScript'],
    image: '/src/assets/images/project_thumb_synth_1795256853758.jpg',
    alt: 'Lawn Synth Studio interface preview',
    summary:
      'Warm polyphonic browser synthesizer inspired by afternoon acoustic sessions in the park, with tactile dials and an organic oscilloscope.',
    details:
      'Uses an AudioWorklet-backed warm low-pass filter bank and gentle tape saturation to produce mellow Rhodes-like chords and plucked acoustic harmonics right in the browser.',
    highlights: [
      'Custom Web Audio worklet with soft-clipping botanical warmth',
      '16-step deterministic sequencer with swing and chord presets',
      'Try an interactive playable mini-synth in the Playground section',
    ],
    repoSlug: 'azzah/lawn-synth-studio',
    liveActionLabel: 'Open in Playground',
    targetView: 'playground',
  },
  {
    id: 'folio-type-specimen',
    title: 'Folio Type Specimen',
    year: '2025',
    tags: ['Typography', 'CSS', 'Tooling'],
    image: '/src/assets/images/project_thumb_folio_1795256853943.jpg',
    alt: 'Folio Type Specimen interface preview',
    summary:
      'Editorial typography specimen workbench for testing serif display pairings, optical sizing, baseline grids, and tabular numeral rhythm.',
    details:
      'Created while refining the Playfair and Poppins typographic scale used across this portfolio. Lets designers inspect line-height ratios, measure widths, and contrast pairings live.',
    highlights: [
      'Live baseline grid overlay and optical tracking calculator',
      'One-click CSS custom property token export',
      'WCAG AA contrast verification across warm paper surfaces',
    ],
    repoSlug: 'azzah/folio-type-specimen',
    liveActionLabel: 'Inspect Specimen Notes',
  },
  {
    id: 'marginalia-reader',
    title: 'Marginalia Reader',
    year: '2024',
    tags: ['Local-first', 'IndexedDB', 'UI'],
    image: '/src/assets/images/project_thumb_marginalia_1795256853623.jpg',
    alt: 'Marginalia Reader interface preview',
    summary:
      'Distraction-free local-first longform reader that anchors handwritten-style margin notes directly to paragraph hashes in IndexedDB.',
    details:
      'Inspired by the joy of reading a paperback on a blanket. Keeps every highlight and margin reflection stored offline in your browser with instant full-text recall.',
    highlights: [
      'Content-addressed paragraph anchoring resilient to minor text edits',
      '100% offline-capable IndexedDB storage with JSON/Markdown export',
      'Warm cream paper surface tuned for sustained afternoon reading',
    ],
    repoSlug: 'azzah/marginalia-reader',
    liveActionLabel: 'Read Field Notes',
    targetView: 'notes',
  },
  {
    id: 'flatland-canvas',
    title: 'Flatland Canvas',
    year: '2024',
    tags: ['SVG', 'Spatial UI', 'Rust'],
    image: '/src/assets/images/project_thumb_flatland_1795256852165.jpg',
    alt: 'Flatland Canvas interface preview',
    summary:
      'Infinite spatial SVG diagramming canvas powered by a Rust/WASM layout constraint solver for calm system sketching.',
    details:
      'Combines crisp vector Bezier connectors with deterministic grid snapping and lightweight spatial indexing so large architectural boards remain fluid.',
    highlights: [
      'WASM quadtree spatial index handling 5,000+ vector nodes smoothly',
      'Deterministic orthogonal & curved Bezier connector routing',
      'Clean SVG and declarative JSON scene serialization',
    ],
    repoSlug: 'azzah/flatland-canvas',
    liveActionLabel: 'View Related Paper',
    targetView: 'papers',
  },
  {
    id: 'papergrain-shaders',
    title: 'Papergrain Shaders',
    year: '2023',
    tags: ['GLSL', 'CSS', 'Open Source'],
    image: '/src/assets/images/project_thumb_papergrain_1795256852476.jpg',
    alt: 'Papergrain Shaders interface preview',
    summary:
      'Open-source collection of lightweight GLSL fragment shaders and SVG turbulence filters for tactile paper fibers and dappled leaf shadows.',
    details:
      'Designed to bring physical warmth to flat digital surfaces without heavy bitmap textures—rendering procedural organic grain and soft canopy shadows at sub-millisecond cost.',
    highlights: [
      'Drop-in CSS SVG filter snippets and React shader hooks',
      'Zero external texture downloads (< 2KB gzipped)',
      'Interactive shader grain preview available in Playground',
    ],
    repoSlug: 'azzah/papergrain-shaders',
    liveActionLabel: 'Try in Playground',
    targetView: 'playground',
  },
];

export const PAPERS: PaperItem[] = [
  {
    id: 'calm-interfaces-spatial-canvases',
    year: '2025',
    venue: 'ACM CHI',
    topic: 'Spatial UI',
    title: 'Calm Interfaces in Spatial Canvases',
    authors: [
      { name: 'Azzah', isAzzah: true },
      { name: 'Maya Lin' },
      { name: 'Rohan Patel' },
    ],
    abstract:
      'We examine how progressive disclosure, low-saturation organic canvases, and spatial landmarks reduce cognitive load compared to dense toolbar-driven interfaces. Across a 36-participant study, spatial hotspot metaphors improved recall by 31% while lowering self-reported visual fatigue.',
    bibtex: `@inproceedings{azzah2025calm,
  title={Calm Interfaces in Spatial Canvases},
  author={Azzah and Lin, Maya and Patel, Rohan},
  booktitle={Proceedings of the CHI Conference on Human Factors in Computing Systems},
  year={2025},
  publisher={ACM}
}`,
    repoSlug: 'azzah/chi25-calm-canvases',
    pages: 12,
  },
  {
    id: 'reactive-layout-primitives-flatland',
    year: '2024',
    venue: 'ACM UIST',
    topic: 'Systems',
    title: 'Reactive Layout Primitives for Flatland',
    authors: [{ name: 'Azzah', isAzzah: true }, { name: 'Kenji Sato' }],
    abstract:
      'Flatland introduces a declarative constraint kernel compiled to WebAssembly that decouples spatial card positioning from viewport resize jitter. We demonstrate sub-2ms incremental constraint solving for multi-thousand-node collaborative boards.',
    bibtex: `@inproceedings{azzah2024flatland,
  title={Reactive Layout Primitives for Flatland},
  author={Azzah and Sato, Kenji},
  booktitle={Proceedings of the ACM Symposium on User Interface Software and Technology (UIST)},
  year={2024},
  publisher={ACM}
}`,
    repoSlug: 'azzah/uist24-flatland-primitives',
    pages: 10,
  },
  {
    id: 'paper-grain-shaders-browser-css',
    year: '2023',
    venue: 'SIGGRAPH',
    topic: 'Graphics',
    title: 'Paper-Grain Shaders in Browser CSS',
    authors: [{ name: 'Azzah', isAzzah: true }],
    abstract:
      'This technical note presents an analytical procedural noise formulation expressible both as a 28-line GLSL fragment shader and as a composited SVG feTurbulence filter, achieving tactile archival paper grain and animated botanical canopy shadows with negligible GPU overhead.',
    bibtex: `@inproceedings{azzah2023papergrain,
  title={Paper-Grain Shaders in Browser CSS},
  author={Azzah},
  booktitle={SIGGRAPH Talks},
  year={2023},
  publisher={ACM}
}`,
    repoSlug: 'azzah/papergrain-shaders',
    pages: 4,
  },
  {
    id: 'local-first-marginalia-longform',
    year: '2023',
    venue: 'ACM Hypertext',
    topic: 'Tooling',
    title: 'Local-First Marginalia for Longform Reading',
    authors: [{ name: 'Azzah', isAzzah: true }, { name: 'David Okafor' }],
    abstract:
      'We describe a resilient text-anchoring scheme and CRDT-compatible IndexedDB schema for private margin annotations on evolving web essays, preserving reader notes across minor author revisions without central servers.',
    bibtex: `@inproceedings{azzah2023marginalia,
  title={Local-First Marginalia for Longform Reading},
  author={Azzah and Okafor, David},
  booktitle={Proceedings of the ACM Conference on Hypertext and Social Media},
  year={2023},
  publisher={ACM}
}`,
    repoSlug: 'azzah/marginalia-reader',
    pages: 8,
  },
  {
    id: 'deterministic-grid-snap-infinite-boards',
    year: '2022',
    venue: 'IEEE VIS',
    topic: 'Spatial UI',
    title: 'Deterministic Grid Snap for Infinite Boards',
    authors: [{ name: 'Sora Chen' }, { name: 'Azzah', isAzzah: true }],
    abstract:
      'We formalize a scale-invariant snapping algebra for zoomable infinite canvases that prevents floating-point drift and guarantees consistent alignment across collaborative clients at arbitrary zoom levels.',
    bibtex: `@inproceedings{chen2022deterministic,
  title={Deterministic Grid Snap for Infinite Boards},
  author={Chen, Sora and Azzah},
  booktitle={IEEE Visualization Conference (VIS)},
  year={2022},
  publisher={IEEE}
}`,
    repoSlug: 'azzah/deterministic-grid-snap',
    pages: 6,
  },
];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 'tl-2026-sunspot',
    year: '2026',
    season: 'Spring',
    kind: 'Project',
    title: 'Released Sunspot Park Map',
    summary: 'WebGL solar canopy shadow explorer for discovering warm lawn spots and shaded benches.',
    linkView: 'projects',
  },
  {
    id: 'tl-2025-chi',
    year: '2025',
    season: 'Autumn',
    kind: 'Paper',
    title: 'Published "Calm Interfaces in Spatial Canvases" at ACM CHI',
    summary: 'Empirical study on illustrated spatial homepages and low-fatigue software surfaces.',
    linkView: 'papers',
  },
  {
    id: 'tl-2025-synth',
    year: '2025',
    season: 'Summer',
    kind: 'Project',
    title: 'Built Lawn Synth Studio & Folio Type Specimen',
    summary: 'Two browser-native creative tools crafted for acoustic warmth and editorial typography.',
    linkView: 'projects',
  },
  {
    id: 'tl-2024-uist',
    year: '2024',
    season: 'Winter',
    kind: 'Paper',
    title: 'Reactive Layout Primitives for Flatland at ACM UIST',
    summary: 'Sub-2ms WASM constraint kernel powering Flatland Canvas and Marginalia Reader.',
    linkView: 'papers',
  },
  {
    id: 'tl-2023-siggraph',
    year: '2023',
    season: 'Summer',
    kind: 'Paper',
    title: 'Paper-Grain Shaders at SIGGRAPH & Marginalia at Hypertext',
    summary: 'Open-sourced procedural paper grain shaders and local-first reading tools.',
    linkView: 'papers',
  },
  {
    id: 'tl-2022-vis',
    year: '2022',
    season: 'Autumn',
    kind: 'Field Note',
    title: 'Started researching calm, sunny software',
    summary: 'First IEEE VIS publication on deterministic grid snapping and founding principles.',
    linkView: 'notes',
  },
];

export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'note-park-as-homepage',
    date: 'May 2026',
    readTime: '4 min read',
    title: 'Why a Park Lawn Makes a Calmer Homepage',
    excerpt:
      'Replacing stacked hero banners with an illustrated afternoon lawn lets curiosity guide exploration at human speed.',
    body: [
      'Most developer portfolios open with a resume bullet list dressed in dark neon gradients. Yet the best software tools feel less like a pitch deck and more like a quiet park bench where you already know where everything lives.',
      'By placing Projects on the sunbather towel, Papers beside the reader, and About Me with the guitarist, spatial memory replaces nested dropdowns. And for keyboard and screen-reader navigation, a single toggle transitions the lawn into an accessible high-contrast directory.',
    ],
  },
  {
    id: 'note-golden-hour-palettes',
    date: 'February 2026',
    readTime: '3 min read',
    title: 'Designing for Golden Hour Light',
    excerpt:
      'Balancing warm paper creams (#FAFAEC) and deep olive shadows (#2E4200) so afternoon sunlight never washes out interface contrast.',
    body: [
      'Reading outdoors on a laptop quickly exposes fragile low-contrast grays. Pairing warm unbleached cream surfaces with deep woodland olive ink keeps contrast well above WCAG AA while preserving an organic, sunlit character.',
      'When Golden Hour mode is toggled on the lawn, subtle amber warmth settles across the grass while canopy scrims hold navigation text crisp and legible.',
    ],
  },
  {
    id: 'note-slow-craft',
    date: 'November 2025',
    readTime: '5 min read',
    title: 'Small Tools Built for One Afternoon',
    excerpt:
      'How constraining scope to a single weekend shader or synth patch produces more durable, joyful software.',
    body: [
      'Lawn Synth Studio started as a single Web Audio sine wave tuned to an open-G guitar chord on a Saturday afternoon. Keeping tools small means every knob, shadow, and hover state receives real care.',
      'You can play with simplified versions of those acoustic chords and paper-grain shaders directly inside the Playground.',
    ],
  },
];

export const DIRECTORY_ITEMS: {
  id: string;
  title: string;
  subtitle: string;
  view?: AppView;
  action?: 'socials' | 'contact' | 'hobbies';
}[] = [
  { id: 'about', title: 'About', subtitle: 'Bio & background', view: 'about' },
  { id: 'projects', title: 'Projects', subtitle: 'Selected web tools', view: 'projects' },
  { id: 'papers', title: 'Papers', subtitle: 'Research & writing', view: 'papers' },
  { id: 'socials', title: 'Socials', subtitle: 'Links & profiles', action: 'socials' },
  { id: 'blog', title: 'Blog', subtitle: 'Field notes & essays', view: 'notes' },
  { id: 'playground', title: 'Playground', subtitle: 'Small shaders & toys', view: 'playground' },
  { id: 'hobbies', title: 'Hobbies', subtitle: 'Guitar, cats & parks', action: 'hobbies' },
  { id: 'contact', title: 'Contact', subtitle: 'Say hello', action: 'contact' },
];
