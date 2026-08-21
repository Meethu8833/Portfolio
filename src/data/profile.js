/* ---------------------------------------------------------------------------
   Profile — the single source of truth for personal info.
   Every value here is taken verbatim from your resume. Edit this one file to
   update your name, contact details, or links anywhere they appear on the site.
--------------------------------------------------------------------------- */
export const profile = {
  name: 'Meethu Prasanth K K',
  title: 'Software Engineer',

  // The hero's typing effect cycles through these phrases (drawn from your
  // resume summary/skills). Add or reorder freely — the effect adapts.
  roles: [
    'Software Engineer',
    'Backend Developer',
    'Python & FastAPI Developer',
    'Full-Stack Developer',
  ],

  // Resume summary, verbatim.
  summary:
    'Software Engineer with hands-on experience building backend and full-stack web applications using Python, FastAPI, and Django. Skilled in designing REST APIs, relational data models, authentication systems, and asynchronous processing pipelines. Proven track record of optimizing database performance, improving execution speed, and delivering scalable, well-tested applications in production environments.',

  location: 'Kozhikode, Kerala',

  // IANA zone for the live clock in the hero (see hooks/useLocalTime.js).
  // Kept next to `location` so the two can never drift apart.
  timeZone: 'Asia/Kolkata',
  email: 'meethuprasanthkk@gmail.com',
  phone: '+91 90371 68833',

  // Path to the downloadable résumé (lives in /public — see note in the Hero).
  resumeUrl: '/resume.pdf',

  // External profiles from your resume header.
  socials: {
    github: 'https://github.com/Meethu8833',
    linkedin: 'https://www.linkedin.com/in/meethu-prasanth',
    email: 'mailto:meethuprasanthkk@gmail.com',
  },
};
