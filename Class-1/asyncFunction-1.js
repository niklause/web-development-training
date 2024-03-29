console.log("Hello World");
function getPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello Vinayak");
    }, 10000);
  });
}
function getData(data) {
  console.log("Data========>", data);
}
getPromise().then(getData);
console.log("At laaaaaaaaaaaast");
