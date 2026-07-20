/* ---------------------------------------------------------------------------
   EmailJS configuration.
   Pulls the three credentials from Vite env vars (VITE_ prefix = exposed to the
   browser). Keys live in a gitignored `.env` — never hard-coded here.

   `isEmailjsConfigured` lets the form detect missing keys and show a friendly
   "not configured yet" message instead of throwing at runtime.
--------------------------------------------------------------------------- */
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// True only when all three values are present (and not the placeholder text).
export const isEmailjsConfigured = Boolean(
  emailjsConfig.serviceId &&
    emailjsConfig.templateId &&
    emailjsConfig.publicKey &&
    !emailjsConfig.serviceId.startsWith('your_'),
);
