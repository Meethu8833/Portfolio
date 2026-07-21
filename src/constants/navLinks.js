/* ---------------------------------------------------------------------------
   Nav links — re-exported from the existing single source of truth.

   The portfolio's scroll-nav links already live in `src/data/navigation.js`
   (the Navbar and scroll-spy hook both consume them). To avoid two competing
   lists drifting apart, this file simply re-exports that array under the
   conventional `constants/` location the app architecture expects.

   As the app grows into the authenticated Todo experience, add ROUTE-based
   nav items (e.g. sidebar links keyed off constants/routes.js) here.
--------------------------------------------------------------------------- */

// Section-scroll links for the public portfolio page.
export { navLinks } from '../data/navigation.js';

import { ROUTES } from './routes.js';

// App (post-login) navigation — placeholder wiring for the Todo dashboard.
// Fill `to` from ROUTES so paths stay centralised.
export const appNavLinks = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard' },
  { to: ROUTES.TASKS, label: 'Tasks' },
];
