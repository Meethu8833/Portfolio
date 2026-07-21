/* ---------------------------------------------------------------------------
   MainLayout — the shell for standard (post-login / content) pages.

   Provides the persistent chrome — navbar + footer — around whatever page the
   router renders into the <Outlet />. Used by routes that opt into
   `layout: 'main'` in routes/index.jsx.

   Reuses the existing portfolio Navbar/Footer for now; swap for app-specific
   versions (with the authenticated nav) as the Todo app grows.
--------------------------------------------------------------------------- */

import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* Router renders the matched page here. */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
