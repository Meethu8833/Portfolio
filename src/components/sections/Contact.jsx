import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
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
    <Section id="contact" eyebrow="06 · Contact" title="Get In Touch">
      {/* Two-column grid: stacks on mobile, side-by-side from lg up. */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* ---- LEFT: contact information ---- */}
        <motion.div
          {...scrollReveal}
          variants={staggerContainer}
          className="flex flex-col"
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400"
          >
            Have a project in mind, an opportunity to discuss, or just want to
            say hi? I’m always open to connecting — reach out through any of the
            channels below or drop me a message.
          </motion.p>

          {/* Channel cards. Each is a glassmorphism tile that lifts on hover. */}
          <div className="space-y-3">
            {CONTACT_INFO.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                variants={slideInLeft}
                whileHover={{ x: 4 }}   // nudges right on hover
                className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white/60 p-4 backdrop-blur-md transition-colors hover:border-accent dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-accent-light"
              >
                {/* Icon in an accent-tinted square. */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform group-hover:scale-110 dark:text-accent-light">
                  <item.icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {item.label}
                  </p>
                  {/* truncate keeps long values on one line on narrow screens. */}
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* ---- RIGHT: glassmorphism form card ---- */}
        <motion.div
          {...scrollReveal}
          variants={slideInRight}
          /* Glassmorphism: translucent bg + backdrop blur + subtle border, with
             a faint accent gradient border via the p-px wrapper. */
          className="rounded-2xl bg-gradient-to-br from-accent/30 via-transparent to-accent-violet/30 p-px shadow-lg"
        >
          <div className="rounded-2xl bg-white/70 p-6 backdrop-blur-xl sm:p-8 dark:bg-slate-800/60">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
