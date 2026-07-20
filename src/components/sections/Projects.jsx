import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { scrollReveal, staggerContainer } from '../../lib/motion';
import Section from '../ui/Section';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  return (
    <Section id="projects" eyebrow="05 · Portfolio" title="Featured Projects">
      {/* Responsive grid: 1 column on mobile, 2 on md, 3 on lg. staggerContainer
          + each card's fadeUp reveal the cards in sequence as they scroll in. */}
      <motion.div
        {...scrollReveal}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </motion.div>
    </Section>
  );
}
