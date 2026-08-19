import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import { fadeUp } from '../../lib/motion';

/**
 * ProjectCard — a project tile.
 *
 * The media panel is a browser-chrome frame: a title bar with three dots over a
 * dotted placeholder canvas, so an empty slot reads as "screenshot pending"
 * rather than decoration. Set `image` on the project to swap the canvas for a
 * real screenshot, or `label` to print the project's name there instead — for
 * closed-source work that will never have one. Status (live / in progress)
 * sits top-right as a labelled dot.
 *
 * @param {object}  project   One entry from projects.js.
 * @param {boolean} showcase  Render the wide, two-column "featured" layout.
 */
export default function ProjectCard({ project, showcase = false }) {
  const { title, description, tech, image, label, github, demo, featured, comingSoon } =
    project;

  // A card is "live" only when it actually links somewhere public.
  const isLive = Boolean(demo || github);

  return (
    <motion.article
      variants={fadeUp}                        // staggered fade-up entrance
      whileHover={comingSoon ? {} : { y: -4 }} // card elevation on hover
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group flex overflow-hidden rounded-md border border-slate-200 bg-white transition-colors duration-300 hover:border-accent/40 hover:shadow-card-hover dark:border-ink-700 dark:bg-ink-800 dark:hover:border-accent/40 ${
        showcase ? 'flex-col lg:flex-row' : 'flex-col'
      } ${comingSoon ? 'opacity-90' : ''}`}
    >
      {/* ---- Media panel: browser-chrome frame ---- */}
      <div
        className={`relative shrink-0 border-b border-slate-200 bg-slate-50 dark:border-ink-700 dark:bg-ink-900 ${
          showcase
            ? 'aspect-video lg:aspect-auto lg:min-h-[280px] lg:w-5/12 lg:border-b-0 lg:border-r'
            : 'aspect-video'
        }`}
      >
        {/* Title bar — three inert dots, purely a framing device. */}
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5 border-b border-slate-200 px-3.5 py-2.5 dark:border-ink-700"
        >
          <span className="h-[7px] w-[7px] rounded-full bg-slate-300 dark:bg-ink-600" />
          <span className="h-[7px] w-[7px] rounded-full bg-slate-300 dark:bg-ink-600" />
          <span className="h-[7px] w-[7px] rounded-full bg-slate-300 dark:bg-ink-600" />
        </div>

        {/* Status pill — real signal, not decoration. */}
        <div
          className={`absolute right-3.5 top-2.5 flex items-center gap-1.5 font-mono text-[10px] tracking-wide ${
            isLive ? 'text-emerald-600 dark:text-[#7CBF8C]' : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isLive
                ? 'bg-emerald-600 shadow-[0_0_0_3px_rgba(124,191,140,0.15)] dark:bg-[#7CBF8C]'
                : 'bg-slate-400 shadow-[0_0_0_3px_rgba(142,138,128,0.12)] dark:bg-slate-500'
            }`}
          />
          {isLive ? 'LIVE' : 'IN PROGRESS'}
        </div>

        {/* Canvas — the screenshot, or a dotted placeholder awaiting one. */}
        <div className="absolute inset-x-3.5 bottom-3.5 top-[38px] overflow-hidden rounded">
          {image ? (
            <img
              src={image}
              alt={`${title} screenshot`}
              // Native lazy-loading: off-screen project images defer until near
              // the viewport. `decoding=async` keeps decode off the main thread.
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
              className="h-full w-full rounded object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded border border-dashed border-accent/25"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(199,154,92,0.18) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            >
              {label ? (
                // A named canvas: the project's own wordmark, for closed-source
                // work that will never have a public screenshot.
                <span
                  className={`max-w-[85%] text-balance px-4 text-center font-display font-semibold tracking-tight text-slate-500 dark:text-slate-400 ${
                    showcase ? 'text-xl lg:text-2xl' : 'text-lg'
                  }`}
                >
                  {label}
                </span>
              ) : (
                <span className="font-mono text-[11px] tracking-wide text-slate-400 dark:text-slate-500">
                  project screenshot
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ---- Body ---- */}
      <div className={`flex flex-1 flex-col ${showcase ? 'p-7' : 'p-6'}`}>
        {/* Featured marker — a mono eyebrow rather than a ribbon on the media. */}
        {featured && (
          <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[0.1em] text-accent dark:text-accent-light">
            ★ Featured
          </span>
        )}

        <h3
          className={`mb-2.5 flex items-start gap-2 font-display font-semibold tracking-tight ${
            showcase ? 'text-2xl' : 'text-xl'
          }`}
        >
          {title}
          {/* Arrow nudges out on hover — a small "this is interactive" cue. */}
          {!comingSoon && (
            <FiArrowUpRight
              className="mt-1.5 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent dark:text-ink-600 dark:group-hover:text-accent-light"
              size={showcase ? 19 : 16}
            />
          )}
        </h3>

        <p
          className={`mb-[18px] flex-1 leading-[1.65] text-slate-600 dark:text-slate-400 ${
            showcase ? 'text-[15px]' : 'text-[13.5px]'
          }`}
        >
          {description}
        </p>

        {/* Tech stack — monospace outline tags (skipped on the empty card). */}
        {tech.length > 0 && (
          <div className="mb-[22px] flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="rounded-[3px] border border-slate-200 px-[9px] py-1 font-mono text-[10.5px] text-slate-500 dark:border-ink-700 dark:text-slate-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ---- Buttons ----
            A shared renderer so GitHub and Demo behave identically: an active
            link when a URL exists, or a disabled state otherwise. */}
        <div className="mt-auto flex gap-2.5">
          <ProjectButton href={github} icon={FiGithub} label="GitHub" />
          <ProjectButton href={demo} icon={FiExternalLink} label="Live demo" primary />
        </div>
      </div>
    </motion.article>
  );
}

/**
 * ProjectButton — ghost/outline button. Active link when `href` is set,
 * honestly disabled otherwise (no fake URLs, no dead clicks).
 */
function ProjectButton({ href, icon: Icon, label, primary }) {
  const base =
    'inline-flex flex-1 items-center justify-center gap-2 rounded border px-3 py-2.5 text-[12.5px] font-medium transition-colors duration-200';

  if (!href) {
    return (
      <span
        className={`${base} cursor-not-allowed border-slate-200 text-slate-400 dark:border-ink-700 dark:text-slate-600`}
        title="Link coming soon"
      >
        <Icon size={14} />
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} hover:border-accent hover:text-accent dark:hover:border-accent-light dark:hover:text-accent-light ${
        primary
          ? 'border-accent/40 text-accent dark:border-accent-light/40 dark:text-accent-light'
          : 'border-slate-200 text-slate-600 dark:border-ink-700 dark:text-slate-400'
      }`}
    >
      <Icon size={14} />
      {label}
    </a>
  );
}
