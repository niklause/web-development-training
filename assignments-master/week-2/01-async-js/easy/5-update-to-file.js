const fs = require("fs");
const fileName = "testFile.txt";
const NewContent = ". This is a new line.";

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
        resolve(`${newData} has been apended successfully.`);
      }
    });
  });
};

const apendFunction = (prevData, newData) => {
  return new Promise((resolve, reject) => {
    resolve(prevData + newData);
  });
};

const logResult = (data) => {
  console.log(data);
};

readFile()
  .then((data) => {
    apendFunction(data, NewContent).then((data) => {
      writeFile(data).then((data) => {
        logResult(data);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
