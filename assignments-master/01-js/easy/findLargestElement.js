/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let largestNumber;
  const data = numbers;

  largestNumber = data[0];

  for (let index = 0; index < data.length; index++) {
    if (largestNumber < data[index]) {
      largestNumber = data[index];
    }
  }
  return largestNumber;
}

module.exports = findLargestElement;
