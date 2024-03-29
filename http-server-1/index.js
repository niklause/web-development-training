const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// create application/json parser
app.use(express.json());

// create application/x-www-form-urlencoded parser
var urlencodedParser = express.urlencoded({ extended: false });

const getFiles = async () => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(__dirname, "/files"), (err, files) => {
      if (files) {
        resolve({ fileList: files });
      } else {
        reject(err);
      }
    });
  });
};

const getContent = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

//Assignment- To fetch a list of files from a given folder
app.get("/files", async (req, res) => {
  try {
    const dataRes = await getFiles();
    const { fileList } = dataRes;
    if (fileList && fileList.length === 0) {
      res.status(400).send({
        status: "Failed",
        error: "No Files Present in the directory",
        code: "NO FILES PRESENT",
      });
    }
    if (fileList && fileList.length > 0) {
      res.status(200).send({
        status: "Success",
        fileList,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error: "Unkown Error Occurred",
      code: "UNKNOWN ERROR",
    });
  }
});

//Assignment- To fetch content of a file which is passed as a param
app.get("/file/:filename", async (req, res) => {
  try {
    const filepath = path.join(__dirname, "./files/", req.params.filename);
    const data = await getContent(filepath);
    if (data) {
      res.status(200).send({
        status: "Success",
        filepath: filepath,
        content: data,
      });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(400).send({
        status: "Failed",
        error: "File does not exist",
        code: "FILE UNAVAILABLE",
      });
    } else {
      res.status(500).send({
        status: "Failed",
        error: "Unkown Error Occurred",
        code: "UNKNOWN ERROR",
      });
    }
  }
});

app.listen(port, () => {
  console.log("App is running at the port ", port);
});
