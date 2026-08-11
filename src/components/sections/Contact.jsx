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
      eyebrow="06 · Contact"
      title="Get In Touch"
      subtitle="Have a project in mind, an opportunity to discuss, or just want to say hi? Reach out through any channel below — or send a message directly."
    >
      {/* Asymmetric split: channels take 2 of 5 columns, the form takes 3, so
          the form reads as the primary action rather than an equal sibling. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* ---- LEFT: contact channels ---- */}
        <motion.div
          {...scrollReveal}
          variants={staggerContainer}
          className="flex flex-col gap-3 lg:col-span-2"
        >
          {/* Availability card — sets expectations before the form. */}
          <motion.div
            variants={fadeUp}
            className="card-glass p-5"
          >
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

          {/* Channel cards. Each lifts and reveals an arrow on hover. */}
          {CONTACT_INFO.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.label === 'Email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              variants={slideInLeft}
              whileHover={{ x: 4 }}   // nudges right on hover
              className="card-glass group flex items-center gap-4 p-4 transition-colors hover:border-accent dark:hover:border-accent-light"
            >
              {/* Icon in an accent-tinted square. */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform group-hover:scale-110 dark:bg-accent-light/10 dark:text-accent-light">
                <item.icon size={20} />
              </div>
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
