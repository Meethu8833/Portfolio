import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { fadeUp, staggerContainer } from '../../lib/motion';

// Map the socials in profile.js to icons + accessible labels, so the JSX below
// stays a simple loop. Add a platform in profile.js + a row here and it appears.
const SOCIAL_ICONS = [
  { key: 'github', href: profile.socials.github, icon: FiGithub, label: 'GitHub' },
  { key: 'linkedin', href: profile.socials.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'email', href: profile.socials.email, icon: FiMail, label: 'Email' },
];

export default function Hero() {
  // The rotating job titles for the typewriter line.
  const typedRole = useTypingEffect(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ---------------------------------------------------------------
          Animated gradient background.
          Two large, blurred accent-colored blobs that slowly drift and
          pulse. `pointer-events-none` so they never block clicks; low
          opacity keeps text readable in both themes.
      --------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/30 blur-3xl dark:bg-accent/20"
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-accent-violet/30 blur-3xl dark:bg-accent-violet/20"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ---------------------------------------------------------------
          Foreground content. staggerContainer reveals each child (via the
          fadeUp variant) one after another for a polished entrance.
      --------------------------------------------------------------- */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center"
      >
        {/* Greeting eyebrow */}
        <motion.p
          variants={fadeUp}
          className="mb-4 font-mono text-sm text-accent dark:text-accent-light"
        >
          Hi, my name is
        </motion.p>

        {/* Name — the big gradient headline */}
        <motion.h1
          variants={fadeUp}
          className="bg-accent-gradient bg-clip-text font-heading text-5xl font-bold leading-tight text-transparent sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>

        {/* Typewriter role line. The trailing bar is a blinking cursor. */}
        <motion.h2
          variants={fadeUp}
          className="mt-4 flex min-h-[2.5rem] items-center font-heading text-2xl font-semibold text-slate-700 sm:text-3xl dark:text-slate-200"
        >
          <span>{typedRole}</span>
          {/* Blinking cursor: a thin bar that fades in/out forever. */}
          <motion.span
            aria-hidden="true"
            className="ml-1 inline-block h-7 w-[3px] rounded-full bg-accent dark:bg-accent-light sm:h-8"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
          />
        </motion.h2>

        {/* Summary — verbatim from the resume */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
        >
          {profile.summary}
        </motion.p>

        {/* ---- Call-to-action buttons ---- */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          {/* Resume download. `download` prompts a save; the file lives in /public. */}
          <a
            href={profile.resumeUrl}
            download
            className="group inline-flex items-center gap-2 rounded-lg bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-105 active:scale-95"
          >
            <FiDownload className="transition-transform group-hover:translate-y-0.5" />
            Download Resume
          </a>

          {/* View Projects — smooth-scrolls to the #projects section. */}
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent hover:text-accent dark:border-slate-600 dark:text-slate-200 dark:hover:border-accent-light dark:hover:text-accent-light"
          >
            View Projects
          </a>
        </motion.div>

        {/* ---- Social icons ---- */}
        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
          {SOCIAL_ICONS.map(({ key, href, icon: Icon, label }) => (
            <a
              key={key}
              href={href}
              // External links open in a new tab; rel prevents tab-nabbing.
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-600 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent hover:text-accent dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-accent-light dark:hover:text-accent-light"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* ---------------------------------------------------------------
          Scroll indicator — a bouncing arrow that links to the About
          section. Fades in after the hero content, then bobs forever.
      --------------------------------------------------------------- */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.span
          className="block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiArrowDown size={24} />
        </motion.span>
      </motion.a>
    </section>
  );
}
