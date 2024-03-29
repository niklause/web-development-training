function getString() {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello Vinayak");
    }, 3000);
  });
  return p;
}
function shoData(data) {
  console.log("Data=================", data);
}
getString().then(shoData);
