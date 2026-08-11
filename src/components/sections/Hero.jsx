import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown, FiMapPin } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { aboutStats } from '../../data/about';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { fadeUp, staggerContainer } from '../../lib/motion';

// Map the socials in profile.js to icons + accessible labels, so the JSX below
// stays a simple loop. Add a platform in profile.js + a row here and it appears.
const SOCIAL_ICONS = [
  { key: 'github', href: profile.socials.github, icon: FiGithub, label: 'GitHub' },
  { key: 'linkedin', href: profile.socials.linkedin, icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'email', href: profile.socials.email, icon: FiMail, label: 'Email' },
];

// The three numeric stats double as hero credibility markers, so we reuse the
// same source of truth rather than duplicating the numbers here.
const HERO_STATS = aboutStats.filter((s) => typeof s.value === 'number');

// Initials for the portrait medallion, derived from the name in profile.js.
const INITIALS = profile.name
  .split(' ')
  .slice(0, 2)
  .map((w) => w[0])
  .join('');

export default function Hero() {
  // The rotating job titles for the typewriter line.
  const typedRole = useTypingEffect(profile.roles);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-8">
        {/* =====================================================================
            LEFT — copy, CTAs, socials. staggerContainer reveals each child
            (via the fadeUp variant) one after another for a polished entrance.
        ===================================================================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left"
        >
          {/* Availability badge — a live "open to work" signal with a pulsing dot. */}
          <motion.div variants={fadeUp} className="eyebrow mb-6">
            <span className="relative flex h-2 w-2">
              {/* Expanding halo behind a solid dot = the classic "live" pulse. */}
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to opportunities
          </motion.div>

          {/* Greeting eyebrow */}
          <motion.p
            variants={fadeUp}
            className="mb-3 font-mono text-sm text-accent-deep dark:text-accent-light"
          >
            Hi, my name is
          </motion.p>

          {/* Name — the big display headline. Solid ink with a gradient last
              name keeps it legible while still feeling designed. */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-ink-900 dark:text-slate-50">Meethu</span>{' '}
            <span className="text-gradient">Prasanth</span>
          </motion.h1>

          {/* Typewriter role line. The trailing bar is a blinking cursor. */}
          <motion.h2
            variants={fadeUp}
            className="mt-4 flex min-h-[2.5rem] items-center justify-center font-heading text-xl font-semibold text-slate-600 dark:text-slate-300 sm:text-2xl lg:justify-start"
          >
            <span>{typedRole}</span>
            {/* Blinking cursor: a thin bar that fades in/out forever. */}
            <motion.span
              aria-hidden="true"
              className="ml-1 inline-block h-6 w-[3px] rounded-full bg-accent dark:bg-accent-light sm:h-7"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            />
          </motion.h2>

          {/* Summary — verbatim from the resume */}
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {profile.summary}
          </motion.p>

          {/* Location line — small, muted, grounds the profile geographically. */}
          <motion.p
            variants={fadeUp}
            className="mt-4 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500"
          >
            <FiMapPin size={14} /> {profile.location}
          </motion.p>

          {/* ---- Call-to-action buttons ---- */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            {/* Resume download. `download` prompts a save; the file lives in /public. */}
            <a href={profile.resumeUrl} download className="btn-primary group">
              <FiDownload className="transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>

            {/* View Projects — smooth-scrolls to the #projects section. */}
            <a href="#projects" className="btn-ghost">
              View Projects
            </a>
          </motion.div>

          {/* ---- Social icons ---- */}
          <motion.div variants={fadeUp} className="mt-7 flex items-center gap-3">
            {SOCIAL_ICONS.map(({ key, href, icon: Icon, label }) => (
              <a
                key={key}
                href={href}
                // External links open in a new tab; rel prevents tab-nabbing.
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/60 text-slate-600 backdrop-blur transition-all hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-glow dark:border-ink-700 dark:bg-ink-800/60 dark:text-slate-400 dark:hover:border-accent-light dark:hover:text-accent-light"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* =====================================================================
            RIGHT — portrait medallion + stat strip. Hidden below lg only for
            the medallion's decorative ring; the stats stay on every size.
        ===================================================================== */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8 lg:col-span-5"
        >
          {/* ---- Portrait medallion ----
              A conic-gradient ring rotates slowly behind a glass disc holding
              the initials. Pure CSS rotation on a single element — cheap. */}
          <motion.div variants={fadeUp} className="relative">
            {/* Rotating conic ring. `blur` softens it into a glow. */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 animate-spin-slow rounded-full opacity-70 blur-xl
                         bg-[conic-gradient(from_0deg,#0d9488,#06b6d4,#2dd4bf,#0d9488)]"
            />
            {/* Crisp gradient hairline directly around the disc. */}
            <div className="relative rounded-full bg-gradient-to-br from-accent via-accent-cyan to-accent-light p-[2px]">
              <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white/80 backdrop-blur-xl dark:bg-ink-800/90 sm:h-64 sm:w-64">
                <span className="text-gradient font-heading text-6xl font-bold sm:text-7xl">
                  {INITIALS}
                </span>
              </div>
            </div>

            {/* Floating tech badges pinned around the medallion. Each bobs on a
                slightly different cycle so the cluster feels alive. */}
            {[
              { label: 'Python', className: 'left-0 top-4 sm:-left-6 sm:top-6', delay: 0 },
              { label: 'FastAPI', className: 'right-0 top-1/3 sm:-right-8', delay: 0.6 },
              { label: 'Django', className: 'left-0 bottom-10 sm:-left-10', delay: 1.2 },
              { label: 'React', className: 'right-0 bottom-4 sm:-right-4', delay: 1.8 },
            ].map((badge) => (
              <motion.span
                key={badge.label}
                aria-hidden="true"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: badge.delay,
                }}
                className={`absolute ${badge.className} rounded-full border border-slate-200 bg-white/90 px-3 py-1 font-mono text-xs font-medium text-slate-700 shadow-card backdrop-blur dark:border-ink-700 dark:bg-ink-800/90 dark:text-slate-300`}
              >
                {badge.label}
              </motion.span>
            ))}
          </motion.div>

          {/* ---- Stat strip ----
              Three compact numbers under the portrait. Reuses aboutStats so the
              figures can never drift from the About section. */}
          <motion.div
            variants={fadeUp}
            className="grid w-full max-w-sm grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white/60 py-4 backdrop-blur-xl dark:divide-ink-700 dark:border-ink-700 dark:bg-ink-800/50"
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="px-2 text-center">
                <p className="text-gradient font-heading text-2xl font-bold">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ---------------------------------------------------------------
          Scroll indicator — a bouncing arrow that links to the About
          section. Fades in after the hero content, then bobs forever.
      --------------------------------------------------------------- */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-slate-400 transition-colors hover:text-accent dark:text-slate-500 dark:hover:text-accent-light sm:block"
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
