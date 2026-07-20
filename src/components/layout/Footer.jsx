import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { navLinks } from '../../data/navigation';

// Social channels for the footer, built from profile.js.
const SOCIALS = [
  { icon: FiGithub, href: profile.socials.github, label: 'GitHub' },
  { icon: FiLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: FiMail, href: profile.socials.email, label: 'Email' },
];

export default function Footer() {
  // Current year for the copyright line. Computed at render in the browser —
  // safe here (unlike workflow scripts), and keeps the year always up to date.
  const year = new Date().getFullYear();

  // Show the scroll-to-top button only after the user scrolls down a bit, so it
  // doesn't clutter the hero at the top of the page.
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll(); // set correct state on mount (e.g. reload mid-page)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth-scroll back to the very top (used by the scroll-to-top button and
  // the logo). Matches the smooth-scroll behaviour used in the navbar.
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
      {/* ---- Animated gradient divider ----
          A thin bar at the very top of the footer whose gradient position
          shifts left↔right forever, giving a subtle "flowing" accent line.
          `backgroundSize: 200%` + animating backgroundPosition creates the flow. */}
      <motion.div
        className="h-0.5 w-full"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, #6366f1, #8b5cf6, transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Main grid: brand block (wider) + quick links. Stacks on mobile,
            2-col from sm, with the brand taking more room on lg. */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* ---- Brand / logo + short intro (spans 2 cols on lg) ---- */}
          <div className="lg:col-span-2">
            {/* Logo — same mark as the navbar, clickable to scroll to top. */}
            <button
              type="button"
              onClick={scrollToTop}
              className="font-heading text-xl font-bold tracking-tight"
            >
              <span className="font-mono text-accent dark:text-accent-light">&lt;</span>
              Meethu
              <span className="font-mono text-accent dark:text-accent-light">/&gt;</span>
            </button>

            {/* Short introduction. */}
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Software engineer building secure, scalable backends and full-stack
              applications with Python, FastAPI, and Django. Always open to new
              opportunities and interesting problems.
            </p>

            {/* Social icons — lift + accent on hover. */}
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}   // lift on hover
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-accent hover:text-accent dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-accent-light dark:hover:text-accent-light"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* ---- Quick navigation links ---- */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  {/* Anchor link — relies on the global smooth-scroll CSS. The
                      arrow slides in on hover for a premium micro-interaction. */}
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-center text-sm text-slate-600 transition-colors hover:text-accent dark:text-slate-400 dark:hover:text-accent-light"
                  >
                    <span className="mr-0 w-0 overflow-hidden text-accent opacity-0 transition-all duration-200 group-hover:mr-1.5 group-hover:w-3 group-hover:opacity-100">
                      →
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Get in touch shortcut ---- */}
          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-200">
              Get In Touch
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="text-sm text-slate-600 transition-colors hover:text-accent dark:text-slate-400 dark:hover:text-accent-light"
            >
              {profile.email}
            </a>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
              {profile.location}
            </p>
          </div>
        </div>

        {/* ---- Bottom bar: copyright ---- */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 sm:flex-row">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* ---- Scroll-to-top button ----
          Fixed to the bottom-right of the viewport. Fades/scales in once the
          user has scrolled past 400px (AnimatePresence handles the exit too).
          A gradient circle that scales on hover and bobs its arrow. */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent-gradient text-white shadow-lg shadow-accent/30"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FiArrowUp size={20} />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
