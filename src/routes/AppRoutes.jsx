/* ---------------------------------------------------------------------------
   AppRoutes — renders the application's <Routes> tree.

   This is where React Router v7's <Routes>/<Route> live. It consumes the
   declarative table in routes/index.jsx and wraps each page in the layout it
   asked for. <BrowserRouter> is already mounted at the app root (main.jsx), so
   this component only defines the route→element mapping.

   Kept minimal on purpose: the current app is still the single-page portfolio
   (rendered by App.jsx). As pages are added to routeConfig, this tree fills in.
--------------------------------------------------------------------------- */

import { Routes, Route } from 'react-router-dom';
// import { Suspense } from 'react';
// import { routeConfig } from './index.jsx';
// import MainLayout from '../layouts/MainLayout.jsx';
// import AuthLayout from '../layouts/AuthLayout.jsx';

export function AppRoutes() {
  return (
    <Routes>
      {/*
        Placeholder. Next phase: map routeConfig → <Route>, choosing the layout
        per entry and wrapping protected routes in a guard, e.g.

        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>
      */}
    </Routes>
  );
}

export default AppRoutes;
