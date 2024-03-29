//Callback Functions Example
function sum(num1, num2, fnTocall) {
  const result = num1 + num2;
  fnTocall(result);
}

function displayResults(data) {
  console.log("Result of the sum is ", data);
}

function displayResultsPassive(data) {
  console.log("sum is ", data);
}

sum(1, 2, displayResults);
sum(4, 5, displayResultsPassive);
