import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ASSETS, HotspotId } from '../data/portfolioData';

interface AmbientLawnLayerProps {
  variant: 'desktop' | 'mobile';
  goldenHour: boolean;
  activeHotspot?: HotspotId | null;
  ballActive?: boolean;
  paused?: boolean;
}

interface PersonAmbientSpec {
  id: HotspotId;
  centerX: string;
  centerY: string;
  rx: string;
  ry: string;
  breathDuration: number;
  breathDelay: number;
  hasGuitarSway?: boolean;
}

const DESKTOP_PEOPLE: PersonAmbientSpec[] = [
  {
    id: 'sunbather',
    centerX: '24.2%',
    centerY: '23.8%',
    rx: '14.5%',
    ry: '19.0%',
    breathDuration: 3.7,
    breathDelay: 0.4,
  },
  {
    id: 'reader',
    centerX: '76.0%',
    centerY: '25.5%',
    rx: '15.2%',
    ry: '19.2%',
    breathDuration: 3.2,
    breathDelay: 1.3,
  },
  {
    id: 'sunhat',
    centerX: '19.0%',
    centerY: '65.0%',
    rx: '11.4%',
    ry: '15.5%',
    breathDuration: 3.9,
    breathDelay: 2.1,
  },
  {
    id: 'guitar',
    centerX: '49.5%',
    centerY: '54.0%',
    rx: '16.8%',
    ry: '19.5%',
    breathDuration: 3.4,
    breathDelay: 0.85,
    hasGuitarSway: true,
  },
  {
    id: 'notes',
    centerX: '81.5%',
    centerY: '73.5%',
    rx: '13.8%',
    ry: '18.8%',
    breathDuration: 3.55,
    breathDelay: 1.75,
  },
];

const MOBILE_PEOPLE: PersonAmbientSpec[] = [
  {
    id: 'sunbather',
    centerX: '25%',
    centerY: '24%',
    rx: '18%',
    ry: '13%',
    breathDuration: 3.8,
    breathDelay: 0.3,
  },
  {
    id: 'reader',
    centerX: '72%',
    centerY: '18%',
    rx: '19%',
    ry: '11%',
    breathDuration: 3.25,
    breathDelay: 1.4,
  },
  {
    id: 'sunhat',
    centerX: '80%',
    centerY: '40%',
    rx: '15.5%',
    ry: '9%',
    breathDuration: 3.95,
    breathDelay: 2.2,
  },
  {
    id: 'guitar',
    centerX: '48%',
    centerY: '53%',
    rx: '20%',
    ry: '11%',
    breathDuration: 3.45,
    breathDelay: 0.9,
    hasGuitarSway: true,
  },
  {
    id: 'notes',
    centerX: '75%',
    centerY: '75%',
    rx: '20%',
    ry: '11%',
    breathDuration: 3.6,
    breathDelay: 1.85,
  },
];

const FLOATING_NOTES = [
  { id: 'note-1', dx: -10, delay: 0, color: '#2E4200', single: true },
  { id: 'note-2', dx: 6, delay: 0.28, color: '#E3B23C', single: false },
  { id: 'note-3', dx: 18, delay: 0.56, color: '#FFFFFF', single: true },
];

const stepEase = (t: number): number => Math.floor(t * 6) / 6;

export const AmbientLawnLayer: React.FC<AmbientLawnLayerProps> = ({
  variant,
  goldenHour,
  activeHotspot = null,
  ballActive = false,
  paused = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion && !paused;
  const people = variant === 'desktop' ? DESKTOP_PEOPLE : MOBILE_PEOPLE;
  const imageSrc = variant === 'desktop' ? ASSETS.parkLawnHero : ASSETS.parkLawnMobile;
  const hasActiveFocus = activeHotspot !== null && !paused;

  const isDesktop = variant === 'desktop';

  const tailSpec = isDesktop
    ? { centerX: '74.4%', centerY: '76.6%', originX: '75.4%', originY: '76.6%', rx: '3.6%', ry: '3.4%' }
    : { centerX: '72.0%', centerY: '78.1%', originX: '70.8%', originY: '78.0%', rx: '5.2%', ry: '3.5%' };

  const guitarSpec = isDesktop
    ? {
        guitar: { centerX: '51.5%', centerY: '52.5%', originX: '50.0%', originY: '53.0%', rx: '8.2%', ry: '6.8%' },
        arm: { centerX: '47.5%', centerY: '51.5%', originX: '44.8%', originY: '48.5%', rx: '3.4%', ry: '3.6%' },
        notesPos: { left: '53%', top: '42%' },
      }
    : {
        guitar: { centerX: '50.5%', centerY: '52.5%', originX: '48.0%', originY: '53.0%', rx: '13.5%', ry: '4.5%' },
        arm: { centerX: '44.5%', centerY: '52.2%', originX: '42.0%', originY: '50.2%', rx: '5.0%', ry: '3.0%' },
        notesPos: { left: '50%', top: '46%' },
      };

  const readerSpec = isDesktop
    ? {
        leg: { centerX: '83.7%', centerY: '28.1%', originX: '82.4%', originY: '30.7%', rx: '3.2%', ry: '4.6%' },
        patch: { left: '82.7%', top: '24.7%', width: '3.7%', height: '4.8%', color: '#FBE9C4' },
      }
    : {
        leg: { centerX: '62.8%', centerY: '23.7%', originX: '66.7%', originY: '21.1%', rx: '5.2%', ry: '3.6%' },
        patch: { left: '59.5%', top: '23.2%', width: '5.5%', height: '3.2%', color: '#FDEECC' },
      };

  const sunhatHairSpec = isDesktop
    ? {
        hair: { centerX: '14.8%', centerY: '63.6%', originX: '15.2%', originY: '61.2%', rx: '2.5%', ry: '1.9%' },
        wispsPos: { left: '12.2%', top: '61.6%', width: '5.8%', height: '5.0%' },
      }
    : {
        hair: { centerX: '82.2%', centerY: '39.6%', originX: '83.2%', originY: '38.2%', rx: '3.4%', ry: '1.6%' },
        wispsPos: { left: '78.2%', top: '38.0%', width: '6.8%', height: '3.6%' },
      };

  const sunbatherMatSpec = isDesktop
    ? {
        cornerA: { centerX: '15.6%', centerY: '38.5%', originX: '17.2%', originY: '35.8%', rx: '3.2%', ry: '3.4%' },
        cornerB: { centerX: '35.4%', centerY: '22.0%', originX: '33.6%', originY: '20.5%', rx: '2.6%', ry: '3.0%' },
        glint: { left: '32.1%', top: '14.6%' },
      }
    : {
        cornerA: { centerX: '27.8%', centerY: '35.2%', originX: '26.2%', originY: '33.2%', rx: '4.4%', ry: '2.3%' },
        cornerB: { centerX: '24.8%', centerY: '16.4%', originX: '23.4%', originY: '18.0%', rx: '4.2%', ry: '1.9%' },
        glint: { left: '19.3%', top: '19.0%' },
      };

  const catSpec = isDesktop
    ? {
        head: { centerX: '75.8%', centerY: '71.0%', originX: '75.8%', originY: '72.8%', rx: '2.0%', ry: '2.2%' },
        heartPos: { left: '75.4%', top: '66.6%' },
      }
    : {
        head: { centerX: '69.4%', centerY: '75.4%', originX: '69.4%', originY: '76.7%', rx: '3.2%', ry: '2.1%' },
        heartPos: { left: '69.0%', top: '71.6%' },
      };

  const shouldBounceBall = shouldAnimate && (ballActive || activeHotspot === 'sunbather');

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1 & 2. Breathing people + Guitarist ±1.5° sway + Hover/Focus 1.06 lift, pause & unique hover reactions */}
      {people.map((person) => {
        const isActive = activeHotspot === person.id && !paused;
        const isDimmed = hasActiveFocus && !isActive;
        const animatePersonIdle = shouldAnimate && !isActive;
        const animatePersonHover = shouldAnimate && isActive;

        return (
          <motion.div
            key={person.id}
            className="absolute inset-0"
            animate={{
              scale: isActive ? 1.06 : 1,
              opacity: isDimmed ? 0 : 1,
            }}
            transition={{
              scale: { type: 'spring', stiffness: 300, damping: 24 },
              opacity: { duration: 0.18, ease: 'easeOut' },
            }}
            style={{
              transformOrigin: `${person.centerX} ${person.centerY}`,
              zIndex: isActive ? 12 : 4,
              filter: isActive ? 'drop-shadow(0 12px 22px rgba(46, 66, 0, 0.28))' : undefined,
              willChange: 'transform, opacity',
            }}
          >
            <motion.img
              src={imageSrc}
              alt=""
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover select-none golden-hour-surface ${
                goldenHour ? 'golden-hour-grade' : ''
              }`}
              style={{
                clipPath: `ellipse(${person.rx} ${person.ry} at ${person.centerX} ${person.centerY})`,
                WebkitMaskImage: `radial-gradient(ellipse ${person.rx} ${person.ry} at ${person.centerX} ${person.centerY}, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)`,
                maskImage: `radial-gradient(ellipse ${person.rx} ${person.ry} at ${person.centerX} ${person.centerY}, rgba(0,0,0,1) 78%, rgba(0,0,0,0) 100%)`,
                transformOrigin: `${person.centerX} ${person.centerY}`,
                willChange: 'transform',
              }}
              animate={
                animatePersonIdle
                  ? person.hasGuitarSway
                    ? {
                        scale: [1, 1.02, 1],
                        rotate: [-1.5, 1.5, -1.5],
                      }
                    : {
                        scale: [1, 1.02, 1],
                      }
                  : { scale: 1, rotate: 0 }
              }
              transition={
                animatePersonIdle
                  ? person.hasGuitarSway
                    ? {
                        scale: {
                          duration: person.breathDuration,
                          delay: person.breathDelay,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                        rotate: {
                          duration: 5.4,
                          delay: 0.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                    : {
                        scale: {
                          duration: person.breathDuration,
                          delay: person.breathDelay,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }
                  : { duration: 0.2, ease: 'easeOut' }
              }
            />

            {/* Guitar person hover reaction: guitar wiggle + strumming arm + 3 floating musical notes (< 1s loop) */}
            {person.id === 'guitar' && animatePersonHover && (
              <>
                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${guitarSpec.guitar.rx} ${guitarSpec.guitar.ry} at ${guitarSpec.guitar.centerX} ${guitarSpec.guitar.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${guitarSpec.guitar.rx} ${guitarSpec.guitar.ry} at ${guitarSpec.guitar.centerX} ${guitarSpec.guitar.centerY}, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${guitarSpec.guitar.rx} ${guitarSpec.guitar.ry} at ${guitarSpec.guitar.centerX} ${guitarSpec.guitar.centerY}, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${guitarSpec.guitar.originX} ${guitarSpec.guitar.originY}`,
                    willChange: 'transform',
                  }}
                  animate={{ rotate: [0, -2.2, 2.0, -1.6, 1.2, 0] }}
                  transition={{ duration: 0.72, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${guitarSpec.arm.rx} ${guitarSpec.arm.ry} at ${guitarSpec.arm.centerX} ${guitarSpec.arm.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${guitarSpec.arm.rx} ${guitarSpec.arm.ry} at ${guitarSpec.arm.centerX} ${guitarSpec.arm.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${guitarSpec.arm.rx} ${guitarSpec.arm.ry} at ${guitarSpec.arm.centerX} ${guitarSpec.arm.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${guitarSpec.arm.originX} ${guitarSpec.arm.originY}`,
                    willChange: 'transform',
                  }}
                  animate={{ rotate: [0, 8, -5, 7, 0], y: [0, 2, -1, 2, 0] }}
                  transition={{ duration: 0.52, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div
                  className="absolute"
                  style={{
                    left: guitarSpec.notesPos.left,
                    top: guitarSpec.notesPos.top,
                  }}
                >
                  {FLOATING_NOTES.map((note) => (
                    <motion.svg
                      key={note.id}
                      viewBox="0 0 24 24"
                      className="absolute w-4 h-4 overflow-visible"
                      style={{ willChange: 'transform, opacity' }}
                      initial={{ opacity: 0, y: 4, x: note.dx, scale: 0.65 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [4, -10, -22, -30],
                        x: [note.dx, note.dx - 3, note.dx + 4, note.dx + 2],
                        scale: [0.65, 1, 0.95, 0.8],
                      }}
                      transition={{
                        duration: 0.9,
                        delay: note.delay,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    >
                      {note.single ? (
                        <path
                          d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"
                          fill={note.color}
                          stroke="#2E4200"
                          strokeWidth="0.9"
                        />
                      ) : (
                        <path
                          d="M18 3v10.55a3.5 3.5 0 1 0 2 3.15V6.5l-9 1.8v7.25a3.5 3.5 0 1 0 2 3.15V5l5-2z"
                          fill={note.color}
                          stroke="#2E4200"
                          strokeWidth="0.9"
                        />
                      )}
                    </motion.svg>
                  ))}
                </div>
              </>
            )}

            {/* Reading person hover reaction: raised leg swings back and forth from the knee, seamlessly joined to her body */}
            {person.id === 'reader' && animatePersonHover && (
              <>
                <div
                  aria-hidden="true"
                  className={`absolute pointer-events-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    left: readerSpec.patch.left,
                    top: readerSpec.patch.top,
                    width: readerSpec.patch.width,
                    height: readerSpec.patch.height,
                    background: `radial-gradient(ellipse at center, ${readerSpec.patch.color} 62%, transparent 100%)`,
                  }}
                />
                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${readerSpec.leg.rx} ${readerSpec.leg.ry} at ${readerSpec.leg.centerX} ${readerSpec.leg.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${readerSpec.leg.rx} ${readerSpec.leg.ry} at ${readerSpec.leg.centerX} ${readerSpec.leg.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${readerSpec.leg.rx} ${readerSpec.leg.ry} at ${readerSpec.leg.centerX} ${readerSpec.leg.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${readerSpec.leg.originX} ${readerSpec.leg.originY}`,
                    willChange: 'transform',
                  }}
                  animate={{ rotate: [0, -7, 5, -6, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              </>
            )}

            {/* Sunhat person hover reaction: wind blows her hair under the brim (< 1s loop, intact body) */}
            {person.id === 'sunhat' && animatePersonHover && (
              <>
                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${sunhatHairSpec.hair.rx} ${sunhatHairSpec.hair.ry} at ${sunhatHairSpec.hair.centerX} ${sunhatHairSpec.hair.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${sunhatHairSpec.hair.rx} ${sunhatHairSpec.hair.ry} at ${sunhatHairSpec.hair.centerX} ${sunhatHairSpec.hair.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${sunhatHairSpec.hair.rx} ${sunhatHairSpec.hair.ry} at ${sunhatHairSpec.hair.centerX} ${sunhatHairSpec.hair.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${sunhatHairSpec.hair.originX} ${sunhatHairSpec.hair.originY}`,
                    willChange: 'transform',
                  }}
                  animate={{
                    rotate: [0, -4.5, 2.5, -4.0, 0],
                  }}
                  transition={{ duration: 0.78, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div
                  className="absolute overflow-visible"
                  style={{
                    left: sunhatHairSpec.wispsPos.left,
                    top: sunhatHairSpec.wispsPos.top,
                    width: sunhatHairSpec.wispsPos.width,
                    height: sunhatHairSpec.wispsPos.height,
                  }}
                >
                  <motion.svg
                    viewBox="0 0 80 48"
                    className="w-full h-full overflow-visible"
                    style={{ transformOrigin: '75% 20%', willChange: 'transform, opacity' }}
                    animate={{
                      rotate: [0, -10, 4, -8, 0],
                      x: [0, -3, 1, -2, 0],
                    }}
                    transition={{ duration: 0.78, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path
                      d="M52 10 C42 18, 28 19, 14 24"
                      fill="none"
                      stroke="#4E3524"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                    <path
                      d="M56 16 C44 25, 31 28, 18 33"
                      fill="none"
                      stroke="#5C402C"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      opacity="0.8"
                    />
                    <path
                      d="M60 22 C48 31, 36 35, 25 40"
                      fill="none"
                      stroke="#4E3524"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      opacity="0.7"
                    />
                  </motion.svg>
                  <motion.svg
                    viewBox="0 0 80 48"
                    className="absolute inset-0 w-full h-full overflow-visible"
                    style={{ willChange: 'transform, opacity' }}
                    animate={{
                      x: [4, -10, -18],
                      opacity: [0, 0.75, 0],
                    }}
                    transition={{ duration: 0.85, repeat: Infinity, ease: 'easeOut' }}
                  >
                    <path
                      d="M64 14 C50 11, 38 16, 22 14"
                      fill="none"
                      stroke="#FAFAEC"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M58 29 C44 27, 34 32, 20 30"
                      fill="none"
                      stroke="#FAFAEC"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </div>
              </>
            )}

            {/* Sunbather hover reaction: wind ruffles the striped mat corners + sunglasses glint (< 1s loop, body steady) */}
            {person.id === 'sunbather' && animatePersonHover && (
              <>
                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${sunbatherMatSpec.cornerA.rx} ${sunbatherMatSpec.cornerA.ry} at ${sunbatherMatSpec.cornerA.centerX} ${sunbatherMatSpec.cornerA.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${sunbatherMatSpec.cornerA.rx} ${sunbatherMatSpec.cornerA.ry} at ${sunbatherMatSpec.cornerA.centerX} ${sunbatherMatSpec.cornerA.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${sunbatherMatSpec.cornerA.rx} ${sunbatherMatSpec.cornerA.ry} at ${sunbatherMatSpec.cornerA.centerX} ${sunbatherMatSpec.cornerA.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${sunbatherMatSpec.cornerA.originX} ${sunbatherMatSpec.cornerA.originY}`,
                    willChange: 'transform',
                  }}
                  animate={{
                    rotate: [0, 3.2, -2.0, 2.8, 0],
                    scale: [1, 1.04, 0.98, 1.03, 1],
                  }}
                  transition={{ duration: 0.84, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${sunbatherMatSpec.cornerB.rx} ${sunbatherMatSpec.cornerB.ry} at ${sunbatherMatSpec.cornerB.centerX} ${sunbatherMatSpec.cornerB.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${sunbatherMatSpec.cornerB.rx} ${sunbatherMatSpec.cornerB.ry} at ${sunbatherMatSpec.cornerB.centerX} ${sunbatherMatSpec.cornerB.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${sunbatherMatSpec.cornerB.rx} ${sunbatherMatSpec.cornerB.ry} at ${sunbatherMatSpec.cornerB.centerX} ${sunbatherMatSpec.cornerB.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${sunbatherMatSpec.cornerB.originX} ${sunbatherMatSpec.cornerB.originY}`,
                    willChange: 'transform',
                  }}
                  animate={{
                    rotate: [0, -3.0, 2.2, -2.6, 0],
                    scale: [1, 1.03, 0.99, 1.02, 1],
                  }}
                  transition={{ duration: 0.84, delay: 0.14, repeat: Infinity, ease: 'easeInOut' }}
                />

                <motion.svg
                  viewBox="0 0 24 24"
                  className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: sunbatherMatSpec.glint.left,
                    top: sunbatherMatSpec.glint.top,
                    willChange: 'transform, opacity',
                  }}
                  animate={{
                    scale: [0.4, 1.15, 0.5, 1.05, 0.4],
                    rotate: [0, 25, 45, 65, 90],
                    opacity: [0, 1, 0.75, 1, 0],
                  }}
                  transition={{ duration: 0.88, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path
                    d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z"
                    fill="#FAFAEC"
                    stroke="#E3B23C"
                    strokeWidth="1"
                  />
                </motion.svg>
              </>
            )}

            {/* Cat person & Picnic group: idle tail wag + hover cat head lift & popping heart (no left-right body movement) */}
            {person.id === 'notes' && (
              <>
                <motion.img
                  src={imageSrc}
                  alt=""
                  referrerPolicy="no-referrer"
                  className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                    goldenHour ? 'golden-hour-grade' : ''
                  }`}
                  style={{
                    clipPath: `ellipse(${tailSpec.rx} ${tailSpec.ry} at ${tailSpec.centerX} ${tailSpec.centerY})`,
                    WebkitMaskImage: `radial-gradient(ellipse ${tailSpec.rx} ${tailSpec.ry} at ${tailSpec.centerX} ${tailSpec.centerY}, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)`,
                    maskImage: `radial-gradient(ellipse ${tailSpec.rx} ${tailSpec.ry} at ${tailSpec.centerX} ${tailSpec.centerY}, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)`,
                    transformOrigin: `${tailSpec.originX} ${tailSpec.originY}`,
                    willChange: 'transform',
                  }}
                  animate={
                    animatePersonHover
                      ? { rotate: [0, -3.2, 2.6, -2.2, 0] }
                      : animatePersonIdle
                        ? { rotate: [0, 0, -2.6, 2.0, -1.3, 0, 0] }
                        : { rotate: 0 }
                  }
                  transition={
                    animatePersonHover
                      ? { duration: 0.72, repeat: Infinity, ease: 'easeInOut' }
                      : animatePersonIdle
                        ? {
                            duration: 4.8,
                            times: [0, 0.72, 0.78, 0.84, 0.9, 0.96, 1],
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                        : { duration: 0.2, ease: 'easeOut' }
                  }
                />

                {animatePersonHover && (
                  <>
                    <motion.img
                      src={imageSrc}
                      alt=""
                      referrerPolicy="no-referrer"
                      className={`absolute inset-0 w-full h-full object-cover select-none golden-hour-surface ${
                        goldenHour ? 'golden-hour-grade' : ''
                      }`}
                      style={{
                        clipPath: `ellipse(${catSpec.head.rx} ${catSpec.head.ry} at ${catSpec.head.centerX} ${catSpec.head.centerY})`,
                        WebkitMaskImage: `radial-gradient(ellipse ${catSpec.head.rx} ${catSpec.head.ry} at ${catSpec.head.centerX} ${catSpec.head.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                        maskImage: `radial-gradient(ellipse ${catSpec.head.rx} ${catSpec.head.ry} at ${catSpec.head.centerX} ${catSpec.head.centerY}, rgba(0,0,0,1) 66%, rgba(0,0,0,0) 100%)`,
                        transformOrigin: `${catSpec.head.originX} ${catSpec.head.originY}`,
                        willChange: 'transform',
                      }}
                      animate={{
                        y: [0, -3.5, -1, -3.5, 0],
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <motion.svg
                      viewBox="0 0 24 24"
                      className="absolute w-4 h-4 overflow-visible"
                      style={{
                        left: catSpec.heartPos.left,
                        top: catSpec.heartPos.top,
                        willChange: 'transform, opacity',
                      }}
                      initial={{ opacity: 0, y: 4, scale: 0.35 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [4, -8, -16, -22],
                        scale: [0.35, 1.18, 1, 0.82],
                      }}
                      transition={{ duration: 0.88, repeat: Infinity, ease: 'easeOut' }}
                    >
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill="#EB7A5C"
                        stroke="#2E4200"
                        strokeWidth="1.1"
                      />
                    </motion.svg>
                  </>
                )}
              </>
            )}
          </motion.div>
        );
      })}

      {/* 4. Beach ball: rolls in a circle when idle; bounces with squash & stretch (< 1s loop) on hover */}
      <motion.div
        className="absolute"
        style={{
          left: variant === 'desktop' ? '34%' : '20%',
          top: variant === 'desktop' ? '74%' : '69%',
          width: variant === 'desktop' ? '44px' : '38px',
          height: variant === 'desktop' ? '44px' : '38px',
          zIndex: ballActive ? 13 : 5,
          willChange: 'transform, opacity',
        }}
        animate={
          shouldBounceBall
            ? {
                x: 0,
                y: 0,
                opacity: 1,
              }
            : shouldAnimate
              ? {
                  x: [0, 7.8, 11, 7.8, 0, -7.8, -11, -7.8, 0],
                  y: [-11, -7.8, 0, 7.8, 11, 7.8, 0, -7.8, -11],
                  opacity: hasActiveFocus ? 0.7 : 1,
                }
              : { x: 0, y: 0, opacity: hasActiveFocus ? 0.7 : 1 }
        }
        transition={{
          x: shouldBounceBall
            ? { duration: 0.18 }
            : shouldAnimate
              ? { duration: 14, repeat: Infinity, ease: 'linear' }
              : undefined,
          y: shouldBounceBall
            ? { duration: 0.18 }
            : shouldAnimate
              ? { duration: 14, repeat: Infinity, ease: 'linear' }
              : undefined,
          opacity: { duration: 0.18, ease: 'easeOut' },
        }}
      >
        <motion.div
          className="absolute left-1 top-2 w-full h-full rounded-full"
          style={{ backgroundColor: '#2E4200', willChange: 'transform, opacity' }}
          animate={
            shouldBounceBall
              ? {
                  scale: [1, 1.16, 0.7, 0.92, 1],
                  opacity: [0.25, 0.32, 0.14, 0.22, 0.25],
                }
              : { scale: 1, opacity: 0.25 }
          }
          transition={
            shouldBounceBall
              ? { duration: 0.76, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.18 }
          }
        />
        <motion.svg
          viewBox="0 0 48 48"
          className="relative w-full h-full overflow-visible"
          style={{ transformOrigin: '50% 90%', willChange: 'transform' }}
          animate={
            shouldBounceBall
              ? {
                  y: [0, 3, -24, -4, 0],
                  scaleX: [1, 1.18, 0.88, 1.05, 1],
                  scaleY: [1, 0.82, 1.15, 0.95, 1],
                  rotate: [0, -6, 8, -3, 0],
                }
              : shouldAnimate
                ? { rotate: [0, 360], y: 0, scaleX: 1, scaleY: 1 }
                : { rotate: 0, y: 0, scaleX: 1, scaleY: 1 }
          }
          transition={
            shouldBounceBall
              ? { duration: 0.76, repeat: Infinity, ease: 'easeInOut' }
              : shouldAnimate
                ? {
                    rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
                    y: { duration: 0.2 },
                    scaleX: { duration: 0.2 },
                    scaleY: { duration: 0.2 },
                  }
                : undefined
          }
        >
          <defs>
            <clipPath id={`beach-ball-clip-${variant}`}>
              <circle cx="24" cy="24" r="20" />
            </clipPath>
          </defs>
          <circle cx="24" cy="24" r="20" fill="#FAFAEC" />
          <g clipPath={`url(#beach-ball-clip-${variant})`}>
            <path d="M24 24 L24 2 A22 22 0 0 1 44 16 Z" fill="#EB7A5C" />
            <path d="M24 24 L44 32 A22 22 0 0 1 24 46 Z" fill="#E3B23C" />
            <path d="M24 24 L4 32 A22 22 0 0 1 4 16 Z" fill="#4A6FA5" />
            <path
              d="M24 4 C16 14, 16 34, 24 44 M24 4 C32 14, 32 34, 24 44 M4 24 C14 17, 34 17, 44 24"
              fill="none"
              stroke="#3A4A18"
              strokeWidth="1.2"
              strokeOpacity="0.65"
            />
          </g>
          <circle cx="24" cy="24" r="4" fill="#FAFAEC" stroke="#3A4A18" strokeWidth="1.2" />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="#3A4A18"
            strokeWidth="1.4"
            strokeOpacity="0.75"
          />
        </motion.svg>
      </motion.div>

      {/* 5. Tree shadow blobs drifting slowly (translate 10–20px over 12s, ease-in-out) and morphing slightly */}
      <motion.div
        className="absolute left-[10%] top-[34%] w-64 h-44 rounded-full blur-2xl"
        style={{
          backgroundColor: 'rgba(46, 66, 0, 0.14)',
          zIndex: 7,
          willChange: 'transform, opacity',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, 16, -6, 0],
                y: [0, 12, 18, 0],
                scaleX: [1, 1.09, 0.94, 1],
                scaleY: [1, 0.92, 1.07, 1],
                rotate: [0, 4, -3, 0],
                opacity: [0.55, 0.72, 0.5, 0.55],
              }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      />
      <motion.div
        className="absolute right-[14%] top-[44%] w-72 h-48 rounded-full blur-2xl"
        style={{
          backgroundColor: 'rgba(46, 66, 0, 0.13)',
          zIndex: 7,
          willChange: 'transform, opacity',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, -14, 10, 0],
                y: [0, 15, -8, 0],
                scaleX: [1, 0.93, 1.08, 1],
                scaleY: [1, 1.07, 0.94, 1],
                rotate: [0, -3, 5, 0],
                opacity: [0.5, 0.68, 0.48, 0.5],
              }
            : undefined
        }
        transition={
          shouldAnimate
            ? {
                duration: 12,
                delay: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      />

      {/* 6. Leaves in the top-right corner swaying gently in a breeze (rotate ±4°, staggered) */}
      <div className="absolute top-0 right-0 w-60 h-52 overflow-hidden" style={{ zIndex: 8 }}>
        <motion.svg
          viewBox="0 0 240 200"
          className="w-full h-full overflow-visible"
          style={{ transformOrigin: '230px 10px', willChange: 'transform' }}
          animate={shouldAnimate ? { rotate: [-4, 4, -4] } : { rotate: 0 }}
          transition={
            shouldAnimate
              ? { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }
              : undefined
          }
        >
          <path
            d="M242 8 C210 26, 178 46, 142 64"
            fill="none"
            stroke="#3C5412"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.55"
          />
          <ellipse cx="195" cy="34" rx="14" ry="7" transform="rotate(-24 195 34)" fill="#5E8A2B" opacity="0.82" />
          <ellipse cx="170" cy="48" rx="15" ry="7.5" transform="rotate(18 170 48)" fill="#4A6700" opacity="0.78" />
          <ellipse cx="148" cy="60" rx="13" ry="6.5" transform="rotate(-16 148 60)" fill="#6C9632" opacity="0.82" />
        </motion.svg>

        <motion.svg
          viewBox="0 0 240 200"
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ transformOrigin: '236px 28px', willChange: 'transform' }}
          animate={shouldAnimate ? { rotate: [4, -4, 4] } : { rotate: 0 }}
          transition={
            shouldAnimate
              ? { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }
              : undefined
          }
        >
          <path
            d="M242 26 C214 54, 192 78, 168 106"
            fill="none"
            stroke="#3C5412"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <ellipse cx="215" cy="54" rx="13" ry="6.5" transform="rotate(-48 215 54)" fill="#4A6700" opacity="0.75" />
          <ellipse cx="196" cy="76" rx="14" ry="7" transform="rotate(12 196 76)" fill="#5E8A2B" opacity="0.8" />
          <ellipse cx="174" cy="99" rx="12" ry="6" transform="rotate(-32 174 99)" fill="#6C9632" opacity="0.76" />
        </motion.svg>

        <motion.svg
          viewBox="0 0 240 200"
          className="absolute inset-0 w-full h-full overflow-visible"
          style={{ transformOrigin: '210px 4px', willChange: 'transform' }}
          animate={shouldAnimate ? { rotate: [-3.5, 3.8, -3.5] } : { rotate: 0 }}
          transition={
            shouldAnimate
              ? { duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 1.7 }
              : undefined
          }
        >
          <ellipse cx="152" cy="18" rx="12" ry="6" transform="rotate(20 152 18)" fill="#5E8A2B" opacity="0.72" />
          <ellipse cx="126" cy="28" rx="13" ry="6.5" transform="rotate(-14 126 28)" fill="#4A6700" opacity="0.7" />
          <ellipse cx="218" cy="96" rx="12" ry="6" transform="rotate(42 218 96)" fill="#5E8A2B" opacity="0.74" />
        </motion.svg>
      </div>

      {/* 7. Living paper-grain overlay shifting position in discrete steps */}
      <motion.div
        className="absolute -inset-8 mix-blend-overlay"
        style={{
          opacity: 0.16,
          zIndex: 9,
          willChange: 'transform',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        animate={
          shouldAnimate
            ? {
                x: [0, -16, 12, -10, 14, -6, 0],
                y: [0, 14, -12, 16, -8, 10, 0],
              }
            : { x: 0, y: 0 }
        }
        transition={
          shouldAnimate
            ? {
                duration: 2.1,
                repeat: Infinity,
                ease: stepEase,
              }
            : undefined
        }
      />
    </div>
  );
};
