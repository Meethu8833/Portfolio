import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp — animates a number from 0 up to `target` once `active` becomes
 * true (typically when the card scrolls into view). Uses requestAnimationFrame
 * for a smooth, frame-synced count rather than setInterval.
 *
 * @param {number}  target    The final number to reach.
 * @param {boolean} active    Start counting when this flips to true.
 * @param {number}  duration  Total animation time in ms (default 1500).
 * @returns {number} the current (integer) value to display.
 */
export function useCountUp(target, active, duration = 1500) {
  const [value, setValue] = useState(0);
  const frameRef = useRef(null);

  // Reduced-motion users skip the animation and see the final number instantly.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    // We can't use Date.now() here; rAF's timestamp argument gives us elapsed
    // time relative to the first frame instead.
    let startTime = null;

    const tick = (now) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      // progress goes 0 → 1 over `duration`.
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic — fast start, gentle finish (feels natural for counters).
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    // Cancel the animation if the component unmounts or deps change.
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, active, duration, prefersReducedMotion]);

  return value;
}
