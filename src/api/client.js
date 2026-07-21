/* ---------------------------------------------------------------------------
   HTTP client — the single low-level gateway to the FastAPI backend.

   This is the ONLY place that knows about fetch/base URL/headers. Services
   (services/*.js) call these helpers; components never touch the network
   directly. Swap fetch for axios here later and nothing above changes.

   No business logic lives here — just request plumbing and error shaping.
--------------------------------------------------------------------------- */

// Vite exposes only vars prefixed with VITE_. Set VITE_API_URL in `.env`.
// Falls back to the local FastAPI dev server default.
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

/**
 * Core request wrapper.
 * @param {string} path    - endpoint path, e.g. '/tasks'
 * @param {object} options - fetch options (method, body, headers, ...)
 * @returns {Promise<any>} - parsed JSON payload
 *
 * TODO (next phase): attach auth token, handle 401 refresh, parse errors.
 */
export async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    // Placeholder error shape — real error normalisation comes later.
    throw new Error(`Request failed: ${response.status}`);
  }

  // 204 No Content → nothing to parse.
  return response.status === 204 ? null : response.json();
}

// Thin verb helpers so services read cleanly (api.get('/tasks'), etc.).
export const api = {
  get: (path, options) => request(path, { method: 'GET', ...options }),
  post: (path, body, options) =>
    request(path, { method: 'POST', body: JSON.stringify(body), ...options }),
  put: (path, body, options) =>
    request(path, { method: 'PUT', body: JSON.stringify(body), ...options }),
  patch: (path, body, options) =>
    request(path, { method: 'PATCH', body: JSON.stringify(body), ...options }),
  delete: (path, options) => request(path, { method: 'DELETE', ...options }),
};

export default api;
