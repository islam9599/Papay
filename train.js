//I-Task: arrayning ichidagi 0 index qiymatni arrayning oxiriga qoyib return qilsin

let arr = [];

function reverseArr(array) {
  arr = array;

  return array.reverse();
}

const result = reverseArr(["apple", "mango", "grape", "ananas"]);
console.log(result);
