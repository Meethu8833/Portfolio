/* ---------------------------------------------------------------------------
   Navigation links — single source of truth.
   The Navbar maps over this array, and the scroll-spy hook watches these same
   `id`s to decide which link is "active". Each `id` MUST match the id="" of the
   corresponding <section> that Phase-later section components will render.
   Add/remove/reorder a link here and the whole nav updates automatically.
--------------------------------------------------------------------------- */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
