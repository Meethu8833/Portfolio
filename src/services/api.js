/* ---------------------------------------------------------------------------
   Services entry to the HTTP client.

   The actual fetch plumbing lives one layer down in `api/client.js` (the
   network layer). This file re-exports it so services can import a stable
   `./api` sibling, and so `services/api.js` — the conventional path — resolves.

   Layering:  component/hook  →  service (authService, taskService)  →  api  →  api/client  →  network
--------------------------------------------------------------------------- */

export { api, request } from '../api/client.js';
export { default } from '../api/client.js';
