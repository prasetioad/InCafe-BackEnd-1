const product = require("../controllers/product");
const { route } = require("./user");

const router = require("express").Router();

router.post("/", product.create);
router.get("/", product.getData);
router.delete("/:id", product.deleteData);
router.get("/:id", product.getDataById);
router.put("/:id", product.updateData)

module.exports = router;