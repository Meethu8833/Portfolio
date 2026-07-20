import { experience } from '../../data/experience';
import Section from '../ui/Section';
import TimelineItem from '../ui/TimelineItem';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="03 · Career" title="Work Experience">
      {/* The timeline is just the list of items stacked vertically. Each item
          draws its own connector line; we pass `isLast` so the final one omits
          the trailing line. Constrained width keeps line-length readable. */}
      <div className="mx-auto max-w-3xl">
        {experience.map((exp, i) => (
          <TimelineItem
            key={`${exp.company}-${exp.role}`}
            exp={exp}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
