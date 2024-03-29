// Looping
const countNumbers = (limit) => {
  let count = 0;
  for (let number = 0; number <= limit; number++) {
    count = count + number;
  }
  return `Count from 0 to ${limit} is ${count}`;
};
console.log(countNumbers(100));
