/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length === str2.length) {
    let decision = true;
    const str1Array = Array.from(str1.toLowerCase());
    str1Array.forEach((character) => {
      decision = decision && str2.toLowerCase().includes(character);
    });
    return decision;
  }
  return false;
}

module.exports = isAnagram;
