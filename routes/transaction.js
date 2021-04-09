const { Auth, AuthAdmin } = require("../middleware/auth");
const trx = require("../controllers/transaction");
const router = require("express").Router();

router.post("/", Auth, trx.input);
router.get("/avail", AuthAdmin, trx.getProcessTrx);
router.get("/done/:id", AuthAdmin, trx.doneTrx);
router.delete("/:id", Auth, trx.deleteTrx);

module.exports = router;
