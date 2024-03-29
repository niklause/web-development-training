const fs = require("fs");
const getFileContent = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile("testfile.txt", "utf-8", (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
};

const printFileContent = (data) => {
  console.log("File content read using fs is ", data);
};

getFileContent()
  .then((data) => {
    printFileContent(data);
  })
  .catch((err) => {
    console.error("Reading file content failed with ", err);
  });
