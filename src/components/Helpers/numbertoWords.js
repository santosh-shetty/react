const numWords = require("num-words");

export function numberToWords(num) {
  let string = numWords(num);
  return string.charAt(0).toUpperCase() + string.slice(1) + " rupees";
}
