import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  // The flagship project gets a wide, two-column showcase card at the top; the
  // rest fall into a normal grid beneath it. Falling back to the first entry
  // keeps the layout sane if nobody has set `featured` in projects.js.
  const featuredIndex = Math.max(projects.findIndex((p) => p.featured), 0);
  const showcase = projects[featuredIndex];
  const rest = projects.filter((_, i) => i !== featuredIndex);

  return (
    <Section
      id="projects"
      eyebrow="05 · Portfolio"
      title="Featured Projects"
      subtitle="Selected work — from an academic capstone to the production commission engine I build on today."
    >
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="space-y-6"
      >
        {/* ---- Showcase card (full width, media beside the copy on lg) ---- */}
        {showcase && <ProjectCard project={showcase} showcase />}

        {/* ---- Remaining projects: 1 col on mobile, 2 from md up ---- */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </motion.div>
    </Section>
  );
}
