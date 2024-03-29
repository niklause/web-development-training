function getSquare(n) {
  return n * n;
}

function getCube(n) {
  return n * n * n;
}

// Normal Use
function getSumOfSquare(a, b) {
  const val1 = getSquare(a);
  const val2 = getSquare(b);
  return val1 + val2;
}

function getSumOfCubes(a, b) {
  const val1 = getCube(a);
  const val2 = getCube(b);
  return val1 + val2;
}

///Vs   CallBack-----------------------

function doOperation(a, b, fnToExecute) {
  const val1 = fnToExecute(a);
  const val2 = fnToExecute(b);
  return val1 + val2;
}
console.log(doOperation(2, 3, getCube));
console.log(doOperation(2, 3, getSquare));

/// Advantages-----------
//1. Redundant Code removed as both operations are getting done through only one function
//2. Code Becomes little clean & Modular
