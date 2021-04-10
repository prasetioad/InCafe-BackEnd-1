const ordered = require("../controllers/ordered_product");
const { Auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", Auth, ordered.input);
router.get("/", Auth, ordered.history);
router.delete("/:id", Auth, ordered.delete);

module.exports = router;
