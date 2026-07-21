/* ---------------------------------------------------------------------------
   Route path constants — single source of truth for every URL in the app.

   Import these instead of hard-coding path strings ('/login') across the
   codebase. If a path ever changes, you edit it here once and every <Link>,
   <Navigate>, and router config updates automatically. Prevents typo-bugs
   like '/dashbord' that only surface at runtime.
--------------------------------------------------------------------------- */

export const ROUTES = {
  // Public / marketing
  HOME: '/',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Authenticated app (the Todo experience)
  DASHBOARD: '/dashboard',
  TASKS: '/tasks',

  // Fallback
  NOT_FOUND: '*',
};

export default ROUTES;
