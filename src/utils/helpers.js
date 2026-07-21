/* ---------------------------------------------------------------------------
   helpers — small, pure, framework-agnostic utility functions.

   No React, no side effects, no network — just logic that many parts of the
   app reuse. Keep functions here small and independently testable. Add more
   as needs arise (formatters, validators, guards).
--------------------------------------------------------------------------- */

/** Format an ISO date string for display. Tweak options as the UI needs. */
export function formatDate(input, locale = 'en-US') {
  const date = input instanceof Date ? input : new Date(input);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Debounce — returns a version of `fn` that only runs after `delay` ms of
 * quiet. Handy for search inputs / resize handlers.
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Basic email shape check (good enough for client-side UX; server validates too). */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

/** Truncate a string to `max` chars, appending an ellipsis when cut. */
export function truncate(text, max = 80) {
  const str = String(text);
  return str.length > max ? `${str.slice(0, max).trimEnd()}…` : str;
}
