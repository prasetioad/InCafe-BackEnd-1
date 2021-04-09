const product = require("../controllers/product");
const middleUpload = require("../middleware/upload");
const { route } = require("./user");

const router = require("express").Router();

router.post("/", middleUpload("image"), product.create);
router.get("/", product.getData);
router.delete("/:id", product.deleteData);
router.get("/:id", product.getDataById);
router.put("/:movieId", middleUpload("image"), product.updateData)

module.exports = router;