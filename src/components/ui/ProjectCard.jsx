import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLock } from 'react-icons/fi';
import { fadeUp } from '../../lib/motion';

// Build initials from the title for the gradient image placeholder (e.g.
// "Identity Theft Detection System" → "IT").
function getInitials(title) {
  return title
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

/**
 * ProjectCard — a modern project tile.
 * Contains an image placeholder (with zoom-on-hover), title, description, tech
 * stack chips, and GitHub + Live Demo buttons. Buttons disable gracefully when
 * no link exists. `comingSoon` projects get a muted, dashed treatment.
 *
 * @param {object} project  One entry from projects.js.
 */
export default function ProjectCard({ project }) {
  const { title, description, tech, image, github, demo, featured, comingSoon } =
    project;

  return (
    <motion.article
      variants={fadeUp}                       // staggered fade-up entrance
      whileHover={comingSoon ? {} : { y: -8 }} // card elevation on hover
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-2xl hover:shadow-accent/10 dark:bg-slate-800/70 ${
        comingSoon
          ? 'border-dashed border-slate-300 dark:border-slate-600'   // muted placeholder
          : 'border-slate-200 dark:border-slate-700'
      } ${featured ? 'ring-1 ring-accent/30' : ''}`}
    >
      {/* ---- Image placeholder (with zoom on hover) ----
          `overflow-hidden` on the wrapper clips the inner layer as it scales,
          producing the classic image-zoom effect. */}
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${title} screenshot`}
            // Native lazy-loading: off-screen project images defer until near
            // the viewport. `decoding=async` keeps decode off the main thread.
            // Explicit width/height (16:9) reserves space → no layout shift (CLS).
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          // No screenshot → a branded gradient block with the initials.
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/80 via-accent to-accent-violet transition-transform duration-500 group-hover:scale-110">
            <span className="font-heading text-4xl font-bold text-white/90">
              {comingSoon ? '⋯' : getInitials(title)}
            </span>
          </div>
        )}

        {/* Featured ribbon, top-left. */}
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-accent shadow-sm dark:bg-slate-900/90 dark:text-accent-light">
            Featured
          </span>
        )}
      </div>

      {/* ---- Body ---- */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-heading text-lg font-bold">{title}</h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>

        {/* Tech stack chips (skipped for the empty coming-soon card). */}
        {tech.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent dark:text-accent-light"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ---- Buttons ----
            A shared renderer so GitHub and Demo behave identically: an active
            link when a URL exists, or a disabled "Coming soon" pill otherwise. */}
        <div className="mt-auto flex gap-3">
          <ProjectButton
            href={github}
            icon={FiGithub}
            label="GitHub"
            primary
          />
          <ProjectButton href={demo} icon={FiExternalLink} label="Live Demo" />
        </div>
      </div>
    </motion.article>
  );
}

/**
 * ProjectButton — active link when `href` is set; disabled "Coming soon"
 * otherwise. `whileHover/whileTap` animate the active state.
 */
function ProjectButton({ href, icon: Icon, label, primary }) {
  // No link → honest disabled state (no fake URLs, no dead clicks).
  if (!href) {
    return (
      <span
        className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-400 dark:border-slate-700 dark:text-slate-500"
        title="Link coming soon"
      >
        <FiLock size={14} />
        {label}
      </span>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}   // animated button
      whileTap={{ scale: 0.96 }}
      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
        primary
          ? 'bg-accent-gradient text-white shadow-md shadow-accent/25'
          : 'border border-slate-300 text-slate-700 hover:border-accent hover:text-accent dark:border-slate-600 dark:text-slate-200 dark:hover:border-accent-light dark:hover:text-accent-light'
      }`}
    >
      <Icon size={15} />
      {label}
    </motion.a>
  );
}
