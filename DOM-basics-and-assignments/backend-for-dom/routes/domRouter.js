const { Router } = require("express");
const domMiddleware = require("../middleware/domMiddleware");
const router = Router();

router.route("/getSum").get(domMiddleware.getSum);

router.route("/getTodos").get(domMiddleware.getTodos);

module.exports = router;
