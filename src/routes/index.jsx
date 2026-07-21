/* ---------------------------------------------------------------------------
   Route table — declarative list of the app's routes.

   Keeping routes as data (not JSX) makes them easy to iterate over, guard, and
   reason about. AppRoutes.jsx renders this into <Route> elements. Pages are
   lazy-loaded so each becomes its own chunk (matches the app's existing code-
   splitting strategy in App.jsx).

   Pages referenced here are placeholders to be created under src/pages/.
--------------------------------------------------------------------------- */

import { lazy } from 'react';
import { ROUTES } from '../constants/routes.js';

// Lazy page imports. Create these files under src/pages/ in a later phase.
// const HomePage = lazy(() => import('../pages/HomePage.jsx'));
// const LoginPage = lazy(() => import('../pages/LoginPage.jsx'));
// const DashboardPage = lazy(() => import('../pages/DashboardPage.jsx'));
// const NotFoundPage = lazy(() => import('../pages/NotFoundPage.jsx'));

/**
 * Each entry: { path, element, layout?, protected? }
 *   - layout:    'main' | 'auth'  (which layout shell wraps the page)
 *   - protected: true → requires an authenticated user
 *
 * Left as an empty array for now; add entries as pages are built.
 */
export const routeConfig = [
  // { path: ROUTES.HOME,      element: <HomePage />,      layout: 'main' },
  // { path: ROUTES.LOGIN,     element: <LoginPage />,     layout: 'auth' },
  // { path: ROUTES.DASHBOARD, element: <DashboardPage />, layout: 'main', protected: true },
  // { path: ROUTES.NOT_FOUND, element: <NotFoundPage />, layout: 'main' },
];

export default routeConfig;
