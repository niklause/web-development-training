const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const domRouter = require("./routes/domRouter");
const port = 3008;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use("/dom", domRouter);

app.listen(port, () => {
  console.log("app is listening to the port ", port);
});
