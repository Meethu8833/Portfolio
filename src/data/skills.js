/* ---------------------------------------------------------------------------
   Skills — grouped exactly as on your resume:
     Languages · Backend · Frontend · Databases · Tools

   Skill NAMES are verbatim from the resume. Each has a short description and an
   `icon` key resolved to a component in skillIcons.js (so this data stays plain
   and serialisable). No proficiency percentages — cards show icon + name +
   description only.
--------------------------------------------------------------------------- */
export const skillGroups = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', icon: 'python', description: 'Primary language for backend & automation.' },
      { name: 'JavaScript', icon: 'javascript', description: 'Interactive UIs and browser logic.' },
      { name: 'SQL', icon: 'sql', description: 'Complex, recursive queries over relational data.' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'FastAPI', icon: 'fastapi', description: 'High-performance async REST APIs.' },
      { name: 'Django', icon: 'django', description: 'Full-stack MVT web applications.' },
      { name: 'REST APIs', icon: 'api', description: 'Secure, well-structured API design.' },
      { name: 'SQLAlchemy', icon: 'sqlalchemy', description: 'ORM data models & optimized queries.' },
      { name: 'Celery', icon: 'celery', description: 'Async & scheduled background jobs.' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: 'react', description: 'Component-based responsive interfaces.' },
      { name: 'HTML5', icon: 'html', description: 'Semantic, accessible markup.' },
      { name: 'CSS3', icon: 'css', description: 'Modern responsive styling.' },
      { name: 'Bootstrap', icon: 'bootstrap', description: 'Rapid responsive UI scaffolding.' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', icon: 'mysql', description: 'High-volume transactional data.' },
      { name: 'SQLite', icon: 'sqlite', description: 'Lightweight embedded storage & testing.' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', icon: 'git', description: 'Version control & collaboration.' },
      { name: 'GitHub', icon: 'github', description: 'Code reviews & CI workflows.' },
      { name: 'Docker', icon: 'docker', description: 'Containerized dev & production services.' },
      { name: 'Figma', icon: 'figma', description: 'UI design & prototyping.' },
    ],
  },
];
