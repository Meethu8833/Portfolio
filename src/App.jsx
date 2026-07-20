import { lazy, Suspense, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import LoadingScreen from './components/ui/LoadingScreen';
import ScrollProgress from './components/ui/ScrollProgress';
import MouseGlow from './components/ui/MouseGlow';
import FloatingBlobs from './components/ui/FloatingBlobs';
import AnimatedSection from './components/ui/AnimatedSection';

/**
 * Code splitting: Hero is above the fold and imported eagerly so it paints
 * immediately. Every below-the-fold section is lazy-loaded — each becomes its
 * own chunk that only downloads as the user scrolls near it, shrinking the
 * initial JS the browser must parse (better LCP / TBT → higher Performance).
 */
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Education = lazy(() => import('./components/sections/Education'));
const Contact = lazy(() => import('./components/sections/Contact'));

/**
 * App shell.
 *
 * Layering (bottom → top):
 *   FloatingBlobs (-z-10)  →  MouseGlow (z-0)  →  content  →  Navbar (z-50)
 *   →  ScrollProgress (z-60)  →  LoadingScreen (z-100, first ~1.2s only).
 */
export default function App() {
  const [loading, setLoading] = useState(true);

  // Dismiss the loading screen shortly after mount. Kept short so it reads as a
  // polished intro, not a wait. (No real work is being blocked on this.)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      {/* Skip link — first focusable element; lets keyboard/screen-reader users
          jump straight past the navbar to the content. Visually hidden until
          focused (see .skip-link in index.css). */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Loading overlay — present only until `loading` flips false. */}
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {/* Global ambient layers (fixed, behind content). */}
      <FloatingBlobs />
      <MouseGlow />

      {/* Top scroll-fill bar. */}
      <ScrollProgress />

      <Navbar />

      <main id="main-content">
        {/* Hero animates itself on load → render plain (no double reveal). */}
        <AnimatedSection plain>
          <Hero />
        </AnimatedSection>

        {/* Lazy sections. A null fallback avoids layout shift — AnimatedSection
            already reserves flow space, and each section fades in when ready. */}
        <Suspense fallback={null}>
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><Skills /></AnimatedSection>
          <AnimatedSection><Experience /></AnimatedSection>
          <AnimatedSection><Projects /></AnimatedSection>
          <AnimatedSection><Education /></AnimatedSection>
          <AnimatedSection><Contact /></AnimatedSection>
        </Suspense>
      </main>

      <Footer />
    </ThemeProvider>
  );
}
