import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { navLinks } from '../../data/navigation';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import ThemeToggle from './ThemeToggle';

// Pre-compute the list of section ids once (stable array reference passed to
// the scroll-spy hook so its effect doesn't re-run every render).
const SECTION_IDS = navLinks.map((link) => link.id);

export default function Navbar() {
  // Has the user scrolled down at all? Drives the condensed "floating pill" look.
  const [scrolled, setScrolled] = useState(false);
  // Is the mobile slide-down menu open?
  const [menuOpen, setMenuOpen] = useState(false);
  // Which section is currently in view — highlights the matching link.
  const activeId = useScrollSpy(SECTION_IDS);

  // Condense the bar once the page is scrolled past 10px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // set correct state on first mount (e.g. reload mid-page)
    // `passive: true` tells the browser we won't preventDefault — smoother scroll.
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Smoothly scroll to a section and close the mobile menu.
   * Handled in JS (rather than relying only on CSS scroll-behavior) so we can
   * also close the menu in the same action.
   */
  const handleNavClick = (event, id) => {
    event.preventDefault(); // stop the browser's instant jump to the anchor
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false); // collapse the mobile menu after choosing a link
  };

  return (
    <motion.header
      // Slide the whole bar down on first load.
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      {/*
        The bar itself is an inset rounded container rather than a full-bleed
        strip — it reads as a floating control surface. When scrolled it gains
        a translucent glass fill; at the top of the page it stays invisible.
      */}
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5 ${
          scrolled
            ? 'border border-slate-200/70 bg-white/75 shadow-card backdrop-blur-xl dark:border-ink-700/80 dark:bg-ink-800/70'
            : 'border border-transparent bg-transparent'
        }`}
      >
        {/* ---- Brand / logo (clicking it scrolls back to Home) ---- */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-heading text-lg font-bold tracking-tight"
        >
          Meethu
        </a>

        {/* ---- Desktop links (hidden on mobile) ---- */}
        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  // `aria-current` exposes the active section to assistive tech.
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent-deep dark:text-accent-light'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {/*
                    Active-link pill. `layoutId` makes Framer Motion slide this
                    single element smoothly from the old active link to the new
                    one (shared-layout animation). Rendered BEFORE the label and
                    placed behind it with -z-10 so the text stays readable.
                  */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/10 dark:bg-accent-light/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ---- Right cluster: theme toggle + mobile hamburger ---- */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Hamburger only shows on mobile (hidden ≥ md). */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl
                       border border-slate-200 bg-white/70 text-slate-700
                       transition-colors hover:border-accent hover:text-accent md:hidden
                       dark:border-ink-700 dark:bg-ink-800/70 dark:text-slate-300
                       dark:hover:border-accent-light dark:hover:text-accent-light"
          >
            {/* Swap hamburger ↔ X depending on menu state. */}
            {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {/* ---- Mobile dropdown menu ---- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            // Collapse/expand height + fade. `overflow-hidden` hides content
            // during the height animation so nothing spills out.
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 shadow-card backdrop-blur-xl md:hidden dark:border-ink-700 dark:bg-ink-800/90"
          >
            <ul className="flex flex-col gap-1 p-3">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent dark:bg-accent-light/15 dark:text-accent-light'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-ink-700/60'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
