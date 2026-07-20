/* ---------------------------------------------------------------------------
   Maps the string `icon` keys in skills.js to actual react-icons components.
   Kept SEPARATE from skills.js so the data file stays plain, serialisable data
   (no JSX/imports) and this file owns all the icon wiring. Each icon also has a
   brand colour used for the icon tint and progress-bar accent.

   Brand icons come from Simple Icons (`si`); a couple of generic ones fall back
   to Feather (`fi`) where a brand icon isn't available in the package.
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
  sql:        { Icon: SiMysql,      color: '#4479A1' }, // generic SQL → MySQL mark
  fastapi:    { Icon: SiFastapi,    color: '#009688' },
  django:     { Icon: SiDjango,     color: '#092E20' },
  api:        { Icon: FiServer,     color: '#6366f1' }, // "REST APIs" → generic server
  sqlalchemy: { Icon: SiSqlalchemy, color: '#D71F00' },
  celery:     { Icon: SiCelery,     color: '#37814A' },
  react:      { Icon: SiReact,      color: '#61DAFB' },
  html:       { Icon: SiHtml5,      color: '#E34F26' },
  css:        { Icon: SiCss,        color: '#1572B6' },
  bootstrap:  { Icon: SiBootstrap,  color: '#7952B3' },
  mysql:      { Icon: SiMysql,      color: '#4479A1' },
  sqlite:     { Icon: SiSqlite,     color: '#003B57' },
  git:        { Icon: SiGit,        color: '#F05032' },
  github:     { Icon: SiGithub,     color: '#181717' },
  docker:     { Icon: SiDocker,     color: '#2496ED' },
  figma:      { Icon: SiFigma,      color: '#F24E1E' },
};
