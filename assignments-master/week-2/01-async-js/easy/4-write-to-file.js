const fs = require("fs");
const writeContentToTheFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile("testFile.txt", "This is a new Line", "utf-8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Content has been written");
      }
    });
  });
};

const callWriteFile = (data) => {
  console.log(data);
};

writeContentToTheFile()
  .then((data) => {
    callWriteFile(data);
  })
  .catch((err) => {
    console.error("Write content to the file failed with ", err);
  });
