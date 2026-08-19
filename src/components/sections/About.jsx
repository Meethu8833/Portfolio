import { motion } from 'framer-motion';
import { aboutIntro, aboutStats } from '../../data/about';
import { profile } from '../../data/profile';
import { fadeUp, scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import StatCard from '../ui/StatCard';

/**
 * About — a lead card alongside a cluster of stat cards.
 *
 * Layout (lg and up, 6 columns):
 *   ┌───────────────────────┬───────────────┐
 *   │ Professional profile  │  stat  stat   │  ← lead card spans 4, stats 2
 *   │        (lead)         │  stat  stat   │
 *   └───────────────────────┴───────────────┘
 */
export default function About() {
  // Only the first intro block is rendered here (as the lead card). The rest of
  // aboutIntro is kept in the data file but intentionally not rendered.
  const [lead] = aboutIntro;

  return (
    <Section
      id="about"
      label="About"
      title="I turn tangled business rules into systems that are readable, testable, and hard to break."
      subtitle="Most of my work lives where the domain is messiest — commissions, eligibility, payouts — and where being quietly wrong is expensive."
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
      </motion.div>
    </Section>
  );
}
