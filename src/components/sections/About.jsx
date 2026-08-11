import { motion } from 'framer-motion';
import { FiClock, FiLayers, FiFolder, FiBriefcase } from 'react-icons/fi';
import { aboutIntro, aboutStats } from '../../data/about';
import { profile } from '../../data/profile';
import { fadeUp, popIn, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import StatCard from '../ui/StatCard';

// Icons for the highlight tiles, keyed by their position in aboutIntro so the
// data file stays plain prose (no component references in data).
const INTRO_ICONS = [FiBriefcase, FiLayers, FiFolder, FiClock];

/**
 * About — a bento grid rather than a two-column split.
 *
 * Layout (lg and up, 6 columns):
 *   ┌───────────────────────┬───────────────┐
 *   │ Professional profile  │  stat  stat   │  ← lead card spans 4, stats 2
 *   │        (lead)         │  stat  stat   │
 *   ├───────┬───────┬───────┴───────────────┤
 *   │ tile  │ tile  │ tile                  │  ← three supporting tiles
 *   └───────┴───────┴───────────────────────┘
 */
export default function About() {
  // The first intro block is the "lead" card; the rest become smaller tiles.
  const [lead, ...supporting] = aboutIntro;

  return (
    <Section
      id="about"
      eyebrow="01 · Introduction"
      title="About Me"
      subtitle="A backend-leaning engineer who likes turning tangled business rules into systems that are readable, testable, and hard to break."
    >
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
      >
        {/* ---- LEAD CARD (spans 4 of 6 on lg) ---- */}
        <motion.article
          variants={fadeUp}
          className="card-glass group relative overflow-hidden p-7 sm:col-span-2 lg:col-span-4"
        >
          {/* Corner aura that brightens on hover — keeps the big card from
              feeling static without animating anything expensive. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100 dark:bg-accent-light/10"
          />

          <div className="relative">
            <span className="chip mb-4 inline-block">Profile</span>
            <h3 className="font-heading text-2xl font-bold">{lead.heading}</h3>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
              {lead.body}
            </p>

            {/* Quick facts row — scannable at a glance for recruiters. */}
            <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5 dark:border-ink-700">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Based in
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {profile.location}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Focus
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Backend &amp; APIs
                </dd>
              </div>
            </dl>
          </div>
        </motion.article>

        {/* ---- STAT CLUSTER (2 of 6 on lg — a 2×2 grid of small cards) ---- */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-2 gap-4 sm:col-span-2 lg:col-span-2"
        >
          {aboutStats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </motion.div>

        {/* ---- SUPPORTING TILES (each spans 2 of 6 → a row of three) ---- */}
        {supporting.map((item, i) => {
          const Icon = INTRO_ICONS[i + 1] ?? FiLayers;
          return (
            <motion.article
              key={item.heading}
              variants={popIn}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="card-glass group p-6 transition-shadow hover:shadow-card-hover lg:col-span-2"
            >
              {/* Icon chip — tinted square, scales gently on card hover. */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110 dark:bg-accent-light/10 dark:text-accent-light">
                <Icon size={20} />
              </div>
              <h3 className="font-heading text-base font-semibold">{item.heading}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.body}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </Section>
  );
}
