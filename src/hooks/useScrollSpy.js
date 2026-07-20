import { useEffect, useState } from 'react';

/**
 * useScrollSpy — returns the id of the section currently in view.
 *
 * @param {string[]} ids   Section element ids to watch (e.g. ['home','about']).
 * @param {number}   offset  Pixels from the top to treat as the "trigger line",
 *                           roughly the navbar height, so a section counts as
 *                           active once it reaches just under the navbar.
 * @returns {string} the active section id.
 *
 * Uses IntersectionObserver (browser-native, runs off the main thread) instead
 * of a scroll listener — cheaper and smoother.
 */
export function useScrollSpy(ids, offset = 80) {
  // Start with the first id so a link is highlighted even before any scroll.
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    // Grab the actual DOM nodes for each id (skip any that aren't mounted yet).
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Of all sections currently intersecting the viewport band, pick the
        // one highest on the page — that's the section the user is "on".
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Shrink the observation box: `offset` px off the top (for the navbar)
        // and a large negative bottom margin so a section only becomes active
        // once its top third is near the top of the viewport, not the moment
        // its bottom edge peeks in.
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    // Clean up when ids/offset change or the component unmounts.
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
