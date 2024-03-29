const fs = require("fs");

function readFromFile() {
  return new Promise(function (resolve, reject) {
    fs.readFile("a.text", "utf-8", (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function onDone(data) {
  console.log("Fetched Data from File ", data);
}

readFromFile()
  .then(onDone)
  .catch((err) => console.log("Failed with ", err));
