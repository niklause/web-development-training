/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  const inputString = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  let reverseVersion = [];
  for (let index = inputString.length - 1; index >= 0; index--) {
    reverseVersion.push(inputString[index]);
  }
  const reverseString = reverseVersion.join("").replace(/[^a-zA-Z0-9]/g, "");
  if (
    inputString.length === reverseString.length &&
    inputString === reverseString
  ) {
    return true;
  }
  return false;
}

module.exports = isPalindrome;
