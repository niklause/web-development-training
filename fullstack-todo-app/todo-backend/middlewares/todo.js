const { TodoSummary } = require("../db");

module.exports.isTodoExists = async (req, res, next) => {
  const username = req.username;
  const title = req.body.title;
  try {
    const data = await TodoSummary.findOne({ username: username });
    if (data) {
      const { username, todos } = data;
      const isTodoExist = todos.filter((todo) => {
        return todo.title === title ? true : false;
      });
      if (isTodoExist.length > 0) {
        res.status(400).send({
          status: "Todos already exist",
        });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    console.error("isTodoExists is failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.isAddTodoRecordExists = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const completed = req.body.completed;
  const username = req.username;
  try {
    const existingData = await TodoSummary.findOne({ username: username });
    if (existingData) {
      const transaction = await TodoSummary.updateOne(
        { username: username },
        {
          $push: {
            todos: {
              title: title,
              description: description,
              completed: completed,
            },
          },
        }
      );
      if (transaction) {
        res.status(200).send({
          status: "success",
          message: "Todos updated successfully",
        });
      } else {
        res.status(400).send({
          status: "error",
          message: "Todos Updating failed",
        });
      }
    } else {
      next();
    }
  } catch (error) {
    console.error("Todo Addition failed with ", error);
    res.status(400).send(error);
  }
};

module.exports.addTodo = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const completed = req.body.completed;
  const username = req.username;
  try {
    const data = TodoSummary({
      username: username,
      todos: [
        {
          title: title,
          description: description,
          completed: completed,
        },
      ],
    });
    const transaction = await data.save();
    if (transaction) {
      res.status(200).send({
        status: "success",
        message: "todo added successfully",
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "todo addition failed",
      });
    }
  } catch (error) {
    console.error("Todo Addition failed with ", error);
    res.status(400).send(error);
  }
};

module.exports.getTodos = async (req, res, next) => {
  const username = req.username;
  try {
    const data = await TodoSummary.findOne({ username: username });
    if (data) {
      const { username, todos } = data;

      res.status(200).send({
        status: "success",
        todos,
        username,
      });
    }
  } catch (error) {
    console.error("getTodos is failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.updateTodo = async (req, res, next) => {
  const username = req.username;
  const title = req.body.todotitle;
  const completed = req.body.completed;
  try {
    const transaction = await TodoSummary.findOneAndUpdate(
      { username: username, "todos.title": title },
      { $set: { "todos.$.completed": completed } }
    );
    if (transaction) {
      res.status(200).send({
        status: "success",
        message: "todo updated successfully",
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "todo updation failed",
      });
    }
  } catch (error) {
    console.error("updateTodo is failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.deleteTodo = async (req, res, next) => {
  const username = req.username;
  const title = req.body.todotitle;
  try {
    const transaction = await TodoSummary.findOneAndUpdate(
      { username: username, "todos.title": title },
      { $pull: { todos: { title: title } } }
    );

    if (transaction) {
      res.status(200).send({
        status: "success",
        message: "todo deleted successfully",
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "todo deletion failed",
      });
    }
  } catch (error) {
    console.error("deleteTodo is failed with ", error);
    res.status(500).send(error);
  }
};
