import { motion } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiEye,
  FiArrowDown,
  FiMapPin,
  FiTerminal,
} from 'react-icons/fi';
import { profile } from '../../data/profile';
import { aboutStats } from '../../data/about';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { useLocalTime } from '../../hooks/useLocalTime';
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

export default function Hero() {
  // The rotating job titles for the typewriter line.
  const typedRole = useTypingEffect(profile.roles);

  // My local time, ticking. Pairs with the location line below the summary so
  // the profile reads as a person in a place, not just a résumé.
  const { time, zone } = useLocalTime(profile.timeZone);

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

          {/* Greeting — written the way I'd actually introduce myself, so the
              page opens in a human voice before the big display name lands. */}
          <motion.p
            variants={fadeUp}
            className="mb-4 max-w-lg text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
          >
            Hey there — I&rsquo;m 
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

          {/* Location + live local time. The clock re-renders once a minute, so
              a visitor can see whether I'm likely awake before they write. */}
          <motion.p
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-slate-500 lg:justify-start dark:text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <FiMapPin size={14} /> {profile.location}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-ink-600">
              &bull;
            </span>
            {/* <time> carries no machine-readable datetime because this is a
                recurring wall-clock reading, not a specific instant. */}
            <span className="font-mono text-[13px] tabular-nums">
              {time} {zone}
            </span>
          </motion.p>

          {/* ---- Call-to-action buttons ---- */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            {/* Read the resume in the browser's built-in PDF viewer. No
                `download` attribute, so the file renders instead of saving. */}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary group"
            >
              <FiEye className="transition-transform group-hover:scale-110" />
              View Resume
            </a>

            {/* Same file, but `download` prompts a save for anyone who wants a copy. */}
            <a href={profile.resumeUrl} download className="btn-ghost group">
              <FiDownload className="transition-transform group-hover:translate-y-0.5" />
              Download
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
              A static gradient glow sits behind a glass disc holding a terminal
              glyph. No motion — the disc is decorative, not attention-seeking. */}
          <motion.div variants={fadeUp} className="relative">
            {/* Soft gradient glow around the disc. */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full opacity-60 blur-xl
                         bg-[conic-gradient(from_0deg,#C79A5C,#B07E4A,#D9B27C,#C79A5C)]"
            />
            {/* Crisp gradient hairline directly around the disc. */}
            <div className="relative rounded-full bg-gradient-to-br from-accent via-accent-warm to-accent-light p-[2px]">
              <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white/80 backdrop-blur-xl dark:bg-ink-800/90 sm:h-64 sm:w-64">
                <FiTerminal
                  aria-hidden="true"
                  className="h-20 w-20 text-accent dark:text-accent-light sm:h-24 sm:w-24"
                  strokeWidth={1.5}
                />
              </div>
            </div>
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
