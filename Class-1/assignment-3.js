//Array
const numbers = [21, 222, 23, 24, 25];
const evenNumbers = [];

const getEvenNumbers = () => {
  numbers.forEach((number) => {
    if (number && number % 2 === 0) {
      evenNumbers.push(number);
    }
  });
};
getEvenNumbers();
console.log(evenNumbers);

const getLargestNumber = () => {
  let largestNumber = numbers[0];
  numbers.forEach((number) => {
    if (number && number > largestNumber) {
      largestNumber = number;
    }
  });
  return largestNumber;
};
console.log(getLargestNumber());
