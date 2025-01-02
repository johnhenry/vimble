/**
 * @module vmb/src/wrap-async
 * @description Utility for wrapping code in an async IIFE (Immediately Invoked Function Expression)
 */

/**
 * Wraps code in an async IIFE to enable top-level await
 * @param {string} code - The code to wrap
 * @returns {string} The wrapped code
 */
const wrapAsync = (code) => `(async ()=>{
    await ${code}
})();`;
export { wrapAsync };
export default wrapAsync;