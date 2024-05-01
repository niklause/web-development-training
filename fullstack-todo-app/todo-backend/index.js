const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const todo = require("./routes/todo");
const user = require("./routes/user");

const app = express();
const PORT = 3010;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/todo", todo);

app.use("/user", user);

app.listen(PORT, () => {
  console.log("app is listening to the ", PORT);
});
