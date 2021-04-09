const promo = require("../controllers/promo");
const { route } = require("./promo");

const router = require("express").Router();

router.post("/", promo.create);
router.get("/", promo.getData);
router.delete("/:id", promo.deleteData);
router.get("/:id", promo.getDataById);
router.put("/:id", promo.updateData)
router.get("/:promoCode", promo.getDataByPromoCode);

module.exports = router;