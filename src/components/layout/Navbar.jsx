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
  // Has the user scrolled down at all? Drives the blur/shadow "condensed" look.
  const [scrolled, setScrolled] = useState(false);
  // Is the mobile slide-down menu open?
  const [menuOpen, setMenuOpen] = useState(false);
  // Which section is currently in view — highlights the matching link.
  const activeId = useScrollSpy(SECTION_IDS);

  // Add a subtle background blur + shadow once the page is scrolled past 10px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll(); // set correct state on first mount (e.g. reload mid-page)
    // `passive: true` tells the browser we won't preventDefault — smoother scroll.
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /**
   * Smoothly scroll to a section and close the mobile menu.
   * We handle it in JS (rather than relying only on CSS scroll-behavior) so we
   * can also close the menu and update focus in the same action.
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
      // Sticky at the top across all scrolling; high z-index keeps it above content.
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? // Scrolled: translucent + backdrop blur + border + shadow.
            'border-b border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/70'
          : // Top of page: fully transparent, no border.
            'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* ---- Brand / logo (clicking it scrolls back to Home) ---- */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="font-heading text-lg font-bold tracking-tight"
        >
          {/* Monospace angle-brackets give it a subtle "developer" feel. */}
          <span className="font-mono text-accent dark:text-accent-light">&lt;</span>
          Meethu
          <span className="font-mono text-accent dark:text-accent-light">/&gt;</span>
        </a>

        {/* ---- Desktop links (hidden on mobile) ---- */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  // `aria-current` exposes the active section to assistive tech.
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-accent dark:text-accent-light'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  {link.label}
                  {/*
                    Animated underline for the active link. `layoutId` makes
                    Framer Motion slide this single pill smoothly from the old
                    active link to the new one (shared-layout animation).
                  */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-accent-gradient"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
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
            className="flex h-9 w-9 items-center justify-center rounded-lg
                       border border-slate-200 bg-white text-slate-700
                       transition-colors hover:text-accent md:hidden
                       dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
            className="overflow-hidden border-b border-slate-200/60 bg-white/95 backdrop-blur-lg md:hidden dark:border-slate-700/60 dark:bg-slate-900/95"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent dark:text-accent-light'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
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
