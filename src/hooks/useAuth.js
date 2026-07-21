/* ---------------------------------------------------------------------------
   useAuth — convenience hook for consuming AuthContext.

   Usage:  const { user, login, logout, isAuthenticated } = useAuth();
   Throws if used outside <AuthProvider> so wiring mistakes surface early —
   same guard pattern as the existing useTheme() hook.
--------------------------------------------------------------------------- */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
