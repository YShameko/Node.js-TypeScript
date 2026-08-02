import reverseArray from './reverseArray'; 

const arr = [1, 2, 3];
console.log(arr);         // [1, 2, 3]
const reversedArr = reverseArray(arr);

console.log(reversedArr); // [3, 2, 1]
console.log(arr);         // [3, 2, 1]
console.log(reversedArr === arr); // true (це один і той самий об'єкт у пам'яті)