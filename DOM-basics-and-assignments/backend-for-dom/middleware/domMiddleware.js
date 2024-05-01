module.exports.getSum = async function (req, res, next) {
  const digit1 = parseInt(req.query.digit1);
  const digit2 = parseInt(req.query.digit2);
  const sum = digit1 + digit2;
  res.status(200).send({
    sum,
  });
};

module.exports.getTodos = async function (req, res, next) {
  res.send({
    todos: [
      {
        id: 4,
        title: "Todo 4",
        description: "This is todo 4",
        completed: false,
      },
    ],
  });
};
