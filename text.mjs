const LOCATION = typeof window === 'undefined' ? 'http://www.example.com' : window.location.href;
export const simple = "console.log(1 + 2);";
export const withFetch = `
let text = "hello";
try{
    const response = await fetch("${LOCATION}");
    text = await response.text();
    console.log(text);
}catch(e){
    console.log(e);
};`