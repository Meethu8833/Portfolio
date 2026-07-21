/* ---------------------------------------------------------------------------
   cn — tiny className combiner.

   Joins conditional class names into one string, dropping falsy values so you
   can write:  cn('btn', isActive && 'btn--active', disabled && 'opacity-50')

   Dependency-free by design (no clsx/tailwind-merge yet). If class conflicts
   between Tailwind utilities become an issue later, swap the body for
   `twMerge(clsx(inputs))` — the call sites won't change.
--------------------------------------------------------------------------- */

export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default cn;
