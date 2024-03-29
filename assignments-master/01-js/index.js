function calculateSum(number) {
  let count = 0;
  for (let index = 1; index <= number; index++) {
    count = count + index;
  }
  return count;
}

const beforeTime = new Date();
const beforeTimems = beforeTime.getTime();

console.log(calculateSum(3000000000));

const afterTime = new Date();
const afterTimems = afterTime.getTime();

console.log(
  "Time Taken to complete ",
  new Date(afterTimems - beforeTimems).getSeconds()
);
