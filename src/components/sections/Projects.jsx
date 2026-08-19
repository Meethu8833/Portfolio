import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  // Every project renders in the same wide, two-column layout — media beside
  // the copy — so the section reads as one consistent stack rather than a
  // flagship card followed by narrower ones.
  // The "coming soon" placeholder is skipped — each card now carries its own
  // live / in-progress status, so a whole card of filler adds nothing.
  const real = projects.filter((p) => !p.comingSoon);

  return (
    <Section
      id="projects"
      label="Selected Work"
      title="Things I have built and still maintain."
      subtitle="From a RAG app you can try right now to the production commission engine I work on today."
    >
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="space-y-6"
      >
        {real.map((project) => (
          <ProjectCard key={project.title} project={project} showcase />
        ))}
      </motion.div>
    </Section>
  );
}
