const user = require("../controllers/user");

const router = require("express").Router();

router.post("/", user.create);
router.get("/", user.getData);
router.post("/login", user.login);

module.exports = router;
