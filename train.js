// let arr = [];

// function reverseArr(array) {
//   arr = array;

//   return array.reverse();
// }

// const result = reverseArr(["apple", "mango", "grape", "ananas"]);
// console.log(result);

//I-Task: arrayning ichidagi 0 index qiymatni arrayning oxiriga qoyib return qilsin

function reverserZeroIndex(arr) {
  if (arr.length > 0) {
    const arrZeroIndex = arr.shift();
    arr.push(arrZeroIndex);
  }
  return arr;
}

const originalArray = ["apple", "mango", "grape", "grante", "peach"];
const modifiedArray = reverserZeroIndex(originalArray);

console.log(modifiedArray);
