/* ---------------------------------------------------------------------------
   Auth context — app-wide authentication state (current user + auth actions).

   Mirrors the shape/patterns of the existing ThemeContext.jsx:
     - context defaults to null so a consumer outside the provider fails loudly
     - a useAuth() hook (see hooks/useAuth.js) is the public entry point
     - all real work is delegated to services/authService.js (no fetch here)

   Wrap the app (or just the authenticated route subtree) in <AuthProvider>.
   Business logic is intentionally stubbed — wire it up in a later phase.
--------------------------------------------------------------------------- */

import { createContext, useState } from 'react';
import * as authService from '../services/authService.js';

// Exported so the useAuth hook (in hooks/) can consume it.
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // null = logged out
  const [loading, setLoading] = useState(false); // in-flight auth request

  // Thin wrappers around the service. They own React state; the service owns
  // the network + token. Implement the bodies in the next phase.
  const login = async (credentials) => {
    // TODO: setLoading(true); const u = await authService.login(credentials);
    //       setUser(u); setLoading(false); return u;
  };

  const register = async (details) => {
    // TODO: await authService.register(details); then login(...)
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
