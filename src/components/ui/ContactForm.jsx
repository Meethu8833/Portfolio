import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { emailjsConfig, isEmailjsConfigured } from '../../lib/emailjs';

// Empty form shape — reused for initial state and post-success reset.
const EMPTY = { name: '', email: '', subject: '', message: '' };

/**
 * ContactForm — a validated, EmailJS-powered contact form.
 * Handles four submit states: idle → loading → success | error, each with a
 * matching notification and button animation.
 */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);       // field values
  const [errors, setErrors] = useState({});      // per-field validation messages
  const [status, setStatus] = useState('idle');  // idle | loading | success | error

  // Update one field and clear its error as the user types (live feedback).
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /**
   * Client-side validation. Returns an errors object; empty = valid.
   * Kept simple and honest: required fields + a basic email pattern.
   */
  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) next.subject = 'Please enter a subject.';
    if (!form.message.trim()) {
      next.message = 'Please enter a message.';
    } else if (form.message.trim().length < 10) {
      next.message = 'Message should be at least 10 characters.';
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Validate first — bail early and show errors if anything's wrong.
    const found = validate();
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    // 2) Guard: if keys aren't set up yet, tell the user rather than fail silently.
    if (!isEmailjsConfigured) {
      setStatus('error');
      return;
    }

    // 3) Send via EmailJS. The `templateParams` keys must match the variables
    //    used in your EmailJS email template (see setup notes in the section).
    setStatus('loading');
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: emailjsConfig.publicKey },
      );
      setStatus('success');
      setForm(EMPTY);                       // clear the form on success
      setTimeout(() => setStatus('idle'), 5000); // auto-dismiss the banner
    } catch (err) {
      // Surface the failure; keep the user's input so they can retry.
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const isLoading = status === 'loading';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name + Email side by side on larger screens, stacked on mobile. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="What's this about?"
      />

      {/* Message — a textarea variant of the same field styling. */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or opportunity..."
          className={`w-full resize-none rounded-xl border bg-white/60 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-ink-900/40 dark:focus:border-accent-light dark:focus:ring-accent-light/20 ${
            errors.message
              ? 'border-red-400 dark:border-red-500'
              : 'border-slate-300 dark:border-ink-600'
          }`}
        />
        {errors.message && <FieldError>{errors.message}</FieldError>}
      </div>

      {/* ---- Submit button with loading animation ---- */}
      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}  // button animation
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-70"
      >
        {isLoading ? (
          <>
            {/* Spinner: the loader icon rotates continuously while sending. */}
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="flex"
            >
              <FiLoader size={16} />
            </motion.span>
            Sending...
          </>
        ) : (
          <>
            <FiSend size={16} />
            Send Message
          </>
        )}
      </motion.button>

      {/* ---- Success / error notifications ----
          AnimatePresence lets the banner slide/fade in and out. */}
      <AnimatePresence mode="wait">
        {status === 'success' && (
          <Notification key="success" type="success">
            <FiCheckCircle size={18} />
            Thanks! Your message has been sent — I'll get back to you soon.
          </Notification>
        )}
        {status === 'error' && (
          <Notification key="error" type="error">
            <FiAlertCircle size={18} />
            {isEmailjsConfigured
              ? 'Something went wrong. Please try again or email me directly.'
              : 'The contact form isn’t configured yet. Please email me directly.'}
          </Notification>
        )}
      </AnimatePresence>
    </form>
  );
}

/* --- Small building blocks kept in-file since they're form-specific --- */

// A labelled text input with error styling.
function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white/60 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:bg-ink-900/40 dark:focus:border-accent-light dark:focus:ring-accent-light/20 ${
          error ? 'border-red-400 dark:border-red-500' : 'border-slate-300 dark:border-ink-600'
        }`}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

// Inline validation message under a field.
function FieldError({ children }) {
  return (
    <p className="mt-1 text-xs text-red-500 dark:text-red-400">{children}</p>
  );
}

// Animated success/error banner.
function Notification({ type, children }) {
  const styles =
    type === 'success'
      ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400'
      : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center gap-2 rounded-xl p-3 text-sm ${styles}`}
    >
      {children}
    </motion.div>
  );
}
