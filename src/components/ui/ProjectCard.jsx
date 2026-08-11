import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLock, FiArrowUpRight } from 'react-icons/fi';
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
 * ProjectCard — a project tile.
 * Contains a media panel (screenshot or branded initials block), title,
 * description, tech chips, and GitHub + Live Demo buttons. Buttons disable
 * gracefully when no link exists; `comingSoon` gets a muted dashed treatment.
 *
 * @param {object}  project   One entry from projects.js.
 * @param {boolean} showcase  Render the wide, two-column "featured" layout.
 */
export default function ProjectCard({ project, showcase = false }) {
  const { title, description, tech, image, github, demo, featured, comingSoon } =
    project;

  return (
    <motion.article
      variants={fadeUp}                        // staggered fade-up entrance
      whileHover={comingSoon ? {} : { y: -6 }} // card elevation on hover
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`card-glass group flex overflow-hidden transition-shadow hover:shadow-card-hover ${
        showcase ? 'flex-col lg:flex-row' : 'flex-col'
      } ${comingSoon ? 'border-dashed opacity-90' : ''} ${
        featured ? 'ring-1 ring-accent/25 dark:ring-accent-light/25' : ''
      }`}
    >
      {/* ---- Media panel ----
          `overflow-hidden` on the wrapper clips the inner layer as it scales,
          producing the classic image-zoom effect. On the showcase card it
          becomes a tall left column instead of a 16:9 banner. */}
      <div
        className={`relative overflow-hidden ${
          showcase ? 'aspect-video lg:aspect-auto lg:w-5/12 lg:shrink-0' : 'aspect-video'
        }`}
      >
        {image ? (
          <img
            src={image}
            alt={`${title} screenshot`}
            // Native lazy-loading: off-screen project images defer until near
            // the viewport. `decoding=async` keeps decode off the main thread.
            // Explicit width/height (16:9) reserves space → no layout shift.
            loading="lazy"
            decoding="async"
            width="1280"
            height="720"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // No screenshot → a branded gradient block with the initials, over a
          // faint grid so it reads as a designed panel rather than a blank fill.
          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-accent via-accent-cyan to-accent-light transition-transform duration-500 group-hover:scale-105">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <span className="relative font-heading text-5xl font-bold text-white/95 drop-shadow">
              {comingSoon ? '⋯' : getInitials(title)}
            </span>
          </div>
        )}

        {/* Featured ribbon, top-left. */}
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-semibold text-accent-deep shadow-sm dark:bg-ink-900/90 dark:text-accent-light">
            ★ Featured
          </span>
        )}
      </div>

      {/* ---- Body ---- */}
      <div className={`flex flex-1 flex-col ${showcase ? 'p-7' : 'p-5'}`}>
        <h3
          className={`mb-2 flex items-start gap-2 font-heading font-bold ${
            showcase ? 'text-2xl' : 'text-lg'
          }`}
        >
          {title}
          {/* Arrow nudges out on hover — a small "this is interactive" cue. */}
          {!comingSoon && (
            <FiArrowUpRight
              className="mt-1 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent dark:text-ink-600 dark:group-hover:text-accent-light"
              size={showcase ? 20 : 16}
            />
          )}
        </h3>

        <p
          className={`mb-4 flex-1 leading-relaxed text-slate-600 dark:text-slate-400 ${
            showcase ? 'text-base' : 'text-sm'
          }`}
        >
          {description}
        </p>

        {/* Tech stack chips (skipped for the empty coming-soon card). */}
        {tech.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ---- Buttons ----
            A shared renderer so GitHub and Demo behave identically: an active
            link when a URL exists, or a disabled "Coming soon" pill otherwise. */}
        <div className="mt-auto flex gap-3">
          <ProjectButton href={github} icon={FiGithub} label="GitHub" primary />
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
        className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-400 dark:border-ink-700 dark:text-slate-500"
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
      whileHover={{ scale: 1.03 }}   // animated button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
        primary
          ? 'bg-accent-gradient text-white shadow-glow'
          : 'border border-slate-300 text-slate-700 hover:border-accent hover:text-accent dark:border-ink-600 dark:text-slate-200 dark:hover:border-accent-light dark:hover:text-accent-light'
      }`}
    >
      <Icon size={15} />
      {label}
    </motion.a>
  );
}
