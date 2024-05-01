const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user");
const todoMiddleware = require("../middlewares/todo");

router
  .route("/add/todo")
  .post(
    userMiddleware.userVerification,
    todoMiddleware.isTodoExists,
    todoMiddleware.isAddTodoRecordExists,
    todoMiddleware.addTodo
  );

router
  .route("/get/todos")
  .get(userMiddleware.userVerification, todoMiddleware.getTodos);

router
  .route("/update/todo")
  .put(userMiddleware.userVerification, todoMiddleware.updateTodo);

router
  .route("/delete/todo")
  .put(userMiddleware.userVerification, todoMiddleware.deleteTodo);

module.exports = router;
