// so there are two types of importing or exporting methods or syntax in node js that is Common js, and es6 module

//Common js
// const { generateRandomNum, double }= require('./utils');

// console.log(`Random num: ${generateRandomNum()}`);
// console.log(`double of 4 is ${double(4)}`);

//Module import

import { generateRandomNum, double } from "./utils.js";         // or we can export default then no need for destructuring

console.log(`Random num: ${generateRandomNum()}`);
console.log(`double of 4 is ${double(4)}`);