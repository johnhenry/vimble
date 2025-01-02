const wrapAsync = (code) => `(async ()=>{
    await ${code}
})();`;
export { wrapAsync };
export default wrapAsync;