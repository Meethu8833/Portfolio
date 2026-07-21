/* ---------------------------------------------------------------------------
   Auth service — business logic for authentication against the FastAPI backend.

   Sits between the UI (useAuth / AuthContext) and the raw HTTP layer (api).
   Responsibilities (to implement in a later phase):
     - shape request payloads the way the API expects
     - normalise responses into the app's User shape
     - read/write the auth token (localStorage) — the ONE place token storage
       is centralised.

   No React here — pure async functions, so they're trivially testable.
--------------------------------------------------------------------------- */

import { api } from './api.js';

const TOKEN_KEY = 'auth_token';

/** POST /auth/login → returns { user, token }. */
export async function login(credentials) {
  // TODO: const data = await api.post('/auth/login', credentials);
  //       setToken(data.token); return data.user;
  return Promise.reject(new Error('authService.login not implemented'));
}

/** POST /auth/register → creates an account, then behaves like login. */
export async function register(details) {
  // TODO: return api.post('/auth/register', details);
  return Promise.reject(new Error('authService.register not implemented'));
}

/** Clear local session. Server-side logout (if any) goes here too. */
export function logout() {
  clearToken();
}

/** GET /auth/me → resolve the current user from a stored token (session restore). */
export async function getCurrentUser() {
  // TODO: return api.get('/auth/me');
  return Promise.resolve(null);
}

// --- Token helpers (single source of truth for where the token lives) -------
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export default { login, register, logout, getCurrentUser, getToken, setToken, clearToken };
