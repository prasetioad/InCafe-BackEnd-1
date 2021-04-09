const promo = require("../controllers/promo");
const { AuthAdmin, Auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", AuthAdmin, promo.create);
router.get("/", Auth, promo.getData);
router.delete("/:id", AuthAdmin, promo.deleteData);
router.put("/:id", AuthAdmin, promo.updateData);

module.exports = router;
