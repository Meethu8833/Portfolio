# styles/

Global styles for the app.

> ⚠️ **The canonical, active stylesheet is `src/index.css`** — it is imported by
> `src/main.jsx` and holds the `@fontsource` imports, Tailwind layers, and the
> theme CSS variables. It was **not moved here** to avoid breaking the working
> import chain.

Put **new, modular** style partials in this folder (e.g. `animations.css`,
`utilities.css`) and `@import` them from `src/index.css`. Keep one entry point
(`index.css`) so Tailwind's layer ordering stays predictable.

As the app grows, a reasonable convention:

```
styles/
├── animations.css   → keyframes / motion helpers
├── utilities.css    → project-specific @layer utilities
└── variables.css    → extracted :root / .dark tokens (optional)
```
