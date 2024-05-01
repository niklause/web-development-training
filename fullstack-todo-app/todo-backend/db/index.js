const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mahadikvinayak75:G5s9KGPTdYfXGJLT@cluster0.0wt0wpv.mongodb.net/todo"
  )
  .then(() => {
    console.log("mongo connection established successfully");
  })
  .catch((error) => {
    console.error(
      "Issues occurred in connecting with mongo db with error ",
      error
    );
  });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const todoSummarySchema = new mongoose.Schema({
  username: String,
  todos: [
    {
      title: String,
      description: String,
      completed: Boolean,
    },
  ],
});

const User = mongoose.model("User", userSchema);
const TodoSummary = mongoose.model("TodoSummary", todoSummarySchema);

module.exports = {
  User,
  TodoSummary,
};
