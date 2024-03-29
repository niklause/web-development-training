//Simple Operations and boolean values
let firstName = "Vivek";

//normal boolean returned false
let isMarried = false;
console.log(firstName, " is ", isMarried ? "married." : "not married.");

//normal boolean returned true
isMarried = true;
console.log(firstName, " is ", isMarried ? "married." : "not married.");

//a non empty string returs a truthy value
isMarried = "test";
console.log(firstName, " is ", isMarried ? "married." : "not married.");

//am empty string returs a falsy value
isMarried = "";
console.log(firstName, " is ", isMarried ? "married." : "not married.");

//am empty string returs a falsy value
isMarried = " ";
console.log(firstName, " is ", isMarried.trim() ? "married." : "not married.");

//a non empty string returs a truthy value
isMarried = " ";
console.log(firstName, " is ", isMarried ? "married." : "not married.");
