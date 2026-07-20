import { useEffect, useRef, useState } from 'react';

/**
 * useTypingEffect — cycles through phrases with a typewriter effect:
 * types a phrase out, pauses, deletes it, then moves to the next (looping).
 *
 * @param {string[]} phrases      Strings to cycle through.
 * @param {object}   opts
 * @param {number}   opts.typeSpeed    ms per character while typing (default 90).
 * @param {number}   opts.deleteSpeed  ms per character while deleting (default 45).
 * @param {number}   opts.pauseTime    ms to hold a fully-typed phrase (default 1500).
 * @returns {string} the current partial text to render.
 */
export function useTypingEffect(
  phrases,
  { typeSpeed = 90, deleteSpeed = 45, pauseTime = 1500 } = {},
) {
  // The text currently shown.
  const [text, setText] = useState('');
  // Which phrase in the array we're on.
  const [phraseIndex, setPhraseIndex] = useState(0);
  // Are we deleting (true) or typing (false)?
  const [isDeleting, setIsDeleting] = useState(false);
  // Holds the setTimeout id so we can clear it on cleanup.
  const timeoutRef = useRef(null);

  // Accessibility: users who prefer reduced motion get the full text with no
  // animation at all.
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Reduced-motion path: just show the first phrase, statically.
    if (prefersReducedMotion) {
      setText(phrases[0]);
      return;
    }

    const currentPhrase = phrases[phraseIndex];

    // Decide the next text state (one char more or one char less).
    const updateText = () => {
      setText((prev) => {
        if (isDeleting) {
          return currentPhrase.substring(0, prev.length - 1);
        }
        return currentPhrase.substring(0, prev.length + 1);
      });
    };

    // When a phrase is fully typed → pause, then start deleting.
    if (!isDeleting && text === currentPhrase) {
      timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
      return () => clearTimeout(timeoutRef.current);
    }

    // When a phrase is fully deleted → advance to the next phrase and type again.
    if (isDeleting && text === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length); // wrap around
      return;
    }

    // Otherwise keep typing/deleting at the appropriate speed.
    timeoutRef.current = setTimeout(
      updateText,
      isDeleting ? deleteSpeed : typeSpeed,
    );

    // Clear the pending timeout if any dependency changes mid-flight.
    return () => clearTimeout(timeoutRef.current);
  }, [
    text,
    isDeleting,
    phraseIndex,
    phrases,
    typeSpeed,
    deleteSpeed,
    pauseTime,
    prefersReducedMotion,
  ]);

  return text;
}
