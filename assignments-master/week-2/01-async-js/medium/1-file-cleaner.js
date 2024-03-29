const fs = require("fs");
const fileName = "testFile.txt";
const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const writeFile = (newData) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, newData, "utf-8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${newData} has been cleaned successfully.`);
      }
    });
  });
};

const performOperation = (data) => {
  return new Promise((resolve, reject) => {
    resolve(data.replace(/\s+/g, " ").trim());
  });
};

const logResult = (data) => {
  console.log(data);
};

readFile()
  .then((data) => {
    performOperation(data).then((data) => {
      writeFile(data).then((data) => {
        logResult(data);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
