/**
 * @module vimble/src/injected-console
 * @description Provides a custom console implementation for capturing output in isolated contexts
 */

/**
 * Custom console implementation that captures output and errors
 * @class
 */
const InjectedConsole = class {
  constructor(){
    // Reflect.setPrototypeOf(this, console);
  }

  /** @type {string[]} Array to store standard output messages */
  #output = [];
  get output(){
    return this.#output.map(messages => messages.join(" ")).join("\n");
  }
  /** @type {string[]} Array to store error messages */
  #errors = [];
  get errors(){
    return this.#errors.map(messages => messages.join(" ")).join("\n");
  }
  /**
   * Logs a message to the output buffer
   * @param {...any} output - Items to log
   */
  log(...output){
    this.#output.push(output);
  }

  /**
   * Logs an info message (alias for log)
   * @param {...any} output - Items to log
   */
  info(...output){
    this.log(...output);
  }

  /**
   * Logs a warning message (alias for log)
   * @param {...any} output - Items to log
   */
  warn (...output){
    this.log(...output);
  }

  /**
   * Logs an error message to the error buffer
   * @param {...any} output - Items to log as error
   */
  error(...output){
    this.#errors.push(output);
  }
  /**
   * Resets output and error buffers
   */
  reset(){
    this.#output = [];
    this.#errors = [];
  }
  /**
   * Gets the combined output, prioritizing errors if present
   * @returns {string} Combined output messages or error messages
   */
  get result(){
    if(this.#errors.length > 0){
      return this.errors;
    }
    return this.output;
  }
  /**
   * Gets information about console including error and output counts
   * @returns {object} Object containing error and output counts
   */
  get info(){
    return {
      errors: this.#errors.length,
      output: this.#output.length
    }
  }
};

export { InjectedConsole };
export default InjectedConsole;
