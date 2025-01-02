export const simple = "console.log(1 + 2);";
export const withFetch = `
let text = "hello";
try{
    const response = await fetch("http://127.0.0.1:8080/demo.html");
    text = await response.text();
    console.log(text);
}catch(e){
    console.log(e);
};`