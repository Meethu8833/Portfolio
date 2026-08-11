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
 *
 * IMPORTANT — lazy sections:
 * Every section below the hero is `React.lazy`, so on first run only `#home`
 * exists in the DOM; the rest mount later as their chunks resolve. Observing
 * once on mount would therefore watch a single element and leave the navbar
 * stuck on "Home" forever. We re-scan whenever new sections appear, driven by a
 * MutationObserver on <main>, and observe only ids we haven't already attached.
 */
export function useScrollSpy(ids, offset = 80) {
  // Start with the first id so a link is highlighted even before any scroll.
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    // Tracks which ids are already being observed, so re-scans are idempotent.
    const observed = new Set();

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

    // Attach the observer to any watched section that has appeared since the
    // last scan. Safe to call repeatedly.
    const attachNewSections = () => {
      for (const id of ids) {
        if (observed.has(id)) continue;
        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observed.add(id);
        }
      }
    };

    attachNewSections(); // catch whatever is already mounted (at minimum #home)

    // Watch for the lazy sections arriving, then attach them too. Scoped to
    // <main> (falling back to <body>) to keep the callback cheap.
    const root = document.getElementById('main-content') ?? document.body;
    const mutationObserver = new MutationObserver(() => {
      attachNewSections();
      // Once every section is attached there's nothing left to watch.
      if (observed.size === ids.length) mutationObserver.disconnect();
    });
    mutationObserver.observe(root, { childList: true, subtree: true });

    // Clean up when ids/offset change or the component unmounts.
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [ids, offset]);

  return activeId;
}
