/* ---------------------------------------------------------------------------
   Shared Framer Motion variants.
   Centralising these keeps every animation consistent and makes global tweaks
   a one-file change. Import what you need in a component:

     import { fadeUp, staggerContainer } from '../lib/motion';
     <motion.div variants={fadeUp} initial="hidden" whileInView="visible" />
--------------------------------------------------------------------------- */

// Standard easing curve reused across variants (a smooth "ease-out-quart").
const EASE = [0.25, 0.4, 0.25, 1];

/** Fade in while rising from 20px below. The workhorse entrance. */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/** Simple opacity fade — for backgrounds/overlays where movement isn't wanted. */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Slide in from the left (e.g. timeline items on one side). */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Slide in from the right (timeline items on the other side). */
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Pop in with a slight scale — for badges, chips, icons. */
export const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
};

/**
 * Parent container that staggers its children's entrances.
 * Pair with any child variant above:
 *   <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible">
 *     <motion.li variants={fadeUp} />  // each child animates in sequence
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/**
 * Default props for scroll-triggered reveals. Spread onto a motion component
 * so you don't repeat these everywhere:
 *   <motion.section {...scrollReveal} variants={fadeUp}>
 * `once: true` means it animates a single time; `amount` = how much must be
 * visible before it fires.
 */
export const scrollReveal = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
};
