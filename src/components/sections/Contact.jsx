import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowUpRight } from 'react-icons/fi';
import { profile } from '../../data/profile';
import { fadeUp, scrollReveal, slideInLeft, slideInRight, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import ContactForm from '../ui/ContactForm';

// Contact channels for the left column, built from profile.js. Each has an
// icon, a display value, and a link (mailto / external profile / map).
const CONTACT_INFO = [
  {
    icon: FiMail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/Meethu8833',
    href: profile.socials.github,
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/meethu-prasanth',
    href: profile.socials.linkedin,
  },
  {
    icon: FiMapPin,
    label: 'Location',
    value: profile.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(profile.location)}`,
  },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      label="Contact"
      title="Got something you need built properly?"
      subtitle="A project, an opportunity, or just a question about something above — any channel below works, or send a message directly."
    >
      {/* Asymmetric split: channels take 2 of 5 columns, the form takes 3, so
          the form reads as the primary action rather than an equal sibling. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* ---- LEFT: contact channels ---- */}
        <motion.div
          {...scrollReveal}
          variants={staggerContainer}
          className="flex flex-col lg:col-span-2 lg:max-w-sm"
        >
          {/* Availability — a plain block, not a card. The form to the right is
              the only surface in this section, so it reads as the one thing to
              act on rather than one tile among six. */}
          <motion.div variants={fadeUp} className="pb-2">
            <div className="mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <p className="font-heading text-sm font-semibold">
                Currently open to opportunities
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              I usually reply within a day or two. For anything urgent, email is
              the fastest route.
            </p>
          </motion.div>

          {/* Channel rows — hairline-divided, no boxes. The icon keeps its
              accent tint so the row is still scannable without a border. */}
          <div className="divide-y divide-slate-200 border-t border-slate-200 dark:divide-ink-700 dark:border-ink-700">
            {CONTACT_INFO.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                variants={slideInLeft}
                whileHover={{ x: 4 }}   // nudges right on hover
                className="group flex items-center gap-4 py-4"
              >
                <item.icon
                  className="shrink-0 text-accent transition-transform group-hover:scale-110 dark:text-accent-light"
                  size={18}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {item.label}
                  </p>
                  {/* truncate keeps long values on one line on narrow screens. */}
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {item.value}
                  </p>
                </div>
                {/* Affordance arrow — fades in on hover. */}
                <FiArrowUpRight
                  className="shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-ink-600"
                  size={16}
                />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ---- RIGHT: the form, in a gradient-hairline glass card ---- */}
        <motion.div
          {...scrollReveal}
          variants={slideInRight}
          className="card-frame shadow-card lg:col-span-3"
        >
          <div className="rounded-2xl bg-white/75 p-6 backdrop-blur-xl sm:p-8 dark:bg-ink-800/70">
            <h3 className="mb-1 font-heading text-xl font-bold">Send a message</h3>
            <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
              Fill in the form and it lands straight in my inbox.
            </p>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
