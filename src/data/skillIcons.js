/* ---------------------------------------------------------------------------
   Maps the string `icon` keys in skills.js to actual react-icons components.
   Kept SEPARATE from skills.js so the data file stays plain, serialisable data
   (no JSX/imports) and this file owns all the icon wiring. Each icon also has a
   brand colour used for the icon tint and progress-bar accent.

   Brand icons come from Simple Icons (`si`); a couple of generic ones fall back
   to Feather (`fi`) where a brand icon isn't available in the package.

   `color` is the true brand colour, used in light mode. A few brands are almost
   black (Django, SQLite, GitHub) and disappear against the dark navy ground, so
   those carry an optional `darkColor` — a lightened tint of the SAME hue that
   stays recognisably on-brand while meeting contrast. Components resolve it via
   `resolveSkillColor(entry, isDark)`.
--------------------------------------------------------------------------- */
import {
  SiPython, SiJavascript, SiMysql, SiSqlite, SiFastapi, SiDjango,
  SiSqlalchemy, SiCelery, SiReact, SiHtml5, SiCss, SiBootstrap,
  SiGit, SiGithub, SiDocker, SiFigma,
} from 'react-icons/si';
import { FiServer } from 'react-icons/fi';

export const skillIcons = {
  python:     { Icon: SiPython,     color: '#3776AB' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  sql:        { Icon: SiMysql,      color: '#4479A1', darkColor: '#6BA7CE' }, // generic SQL → MySQL mark
  fastapi:    { Icon: SiFastapi,    color: '#009688' },
  django:     { Icon: SiDjango,     color: '#092E20', darkColor: '#44B78B' }, // near-black → Django green
  api:        { Icon: FiServer,     color: '#0d9488' }, // "REST APIs" → generic server (accent)
  sqlalchemy: { Icon: SiSqlalchemy, color: '#D71F00' },
  celery:     { Icon: SiCelery,     color: '#37814A' },
  react:      { Icon: SiReact,      color: '#61DAFB' },
  html:       { Icon: SiHtml5,      color: '#E34F26' },
  css:        { Icon: SiCss,        color: '#1572B6' },
  bootstrap:  { Icon: SiBootstrap,  color: '#7952B3' },
  mysql:      { Icon: SiMysql,      color: '#4479A1', darkColor: '#6BA7CE' },
  sqlite:     { Icon: SiSqlite,     color: '#003B57', darkColor: '#5AA9D6' }, // near-black → lighter blue
  git:        { Icon: SiGit,        color: '#F05032' },
  github:     { Icon: SiGithub,     color: '#181717', darkColor: '#E6E6E6' }, // near-black → near-white
  docker:     { Icon: SiDocker,     color: '#2496ED' },
  figma:      { Icon: SiFigma,      color: '#F24E1E' },
};

/**
 * Pick the right colour for the current theme.
 * Falls back to the accent if the key is missing so a typo can never render an
 * invisible icon.
 *
 * @param {string}  key     A key of `skillIcons`.
 * @param {boolean} isDark  Whether dark mode is active.
 */
export function resolveSkillColor(key, isDark) {
  const entry = skillIcons[key];
  if (!entry) return '#0d9488';
  return isDark && entry.darkColor ? entry.darkColor : entry.color;
}
