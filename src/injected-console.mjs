
const InjectedConsole = class {
  constructor(){
    // Reflect.setPrototypeOf(this, console);
  }
  #output = [];
  #errors = [];
  log(...output){
    this.#errors.push(output.join(" "));
  }
  info(...output){
    this.log(...output);
  }
  warn (...output){
    this.log(...output);
  }
  error(...output){
    this.#errors.push(output.join(" "));
  }
  get result(){
    if(this.#errors.length > 0){
      return this.#errors.join("\n");
    }
    return this.#output.join("\n");
  }
};
export { InjectedConsole };
export default InjectedConsole;