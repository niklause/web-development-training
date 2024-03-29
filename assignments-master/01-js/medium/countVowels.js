/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const inputString = str.toLowerCase();
  const vowelArray = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (let index = 0; index < inputString.length; index++) {
    if (vowelArray.includes(inputString[index])) {
      count++;
    }
  }
  return count;
}

module.exports = countVowels;
