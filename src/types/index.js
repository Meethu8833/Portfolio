/* ---------------------------------------------------------------------------
   Shared type definitions.

   This is a JavaScript project, so "types" are expressed as JSDoc @typedefs.
   Import them for editor autocomplete/checking via:
     @param {import('../types').Task} task

   If the project later migrates to TypeScript, these become .ts interfaces and
   the import sites stay almost identical.
--------------------------------------------------------------------------- */

/**
 * @typedef {Object} User
 * @property {number|string} id
 * @property {string} email
 * @property {string} [name]
 */

/**
 * @typedef {Object} Task
 * @property {number|string} id
 * @property {string} title
 * @property {string} [description]
 * @property {boolean} done
 * @property {string} [createdAt]  ISO date string
 */

// No runtime exports — this module exists purely for the typedefs above.
export {};
