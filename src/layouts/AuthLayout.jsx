/* ---------------------------------------------------------------------------
   AuthLayout — the shell for authentication pages (login / register).

   Deliberately minimal: no app navbar/footer, just a centred container so auth
   forms sit on a clean, focused screen. Used by routes that opt into
   `layout: 'auth'` in routes/index.jsx. The router renders the matched page
   (LoginPage, RegisterPage) into <Outlet />.
--------------------------------------------------------------------------- */

import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Centred card slot — auth pages render here. */}
      <Outlet />
    </div>
  );
}

export default AuthLayout;
