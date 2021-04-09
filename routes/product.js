const product = require("../controllers/product");
const { AuthAdmin } = require("../middleware/auth");
const middleUpload = require("../middleware/upload");

const router = require("express").Router();

router.post("/", AuthAdmin, middleUpload("image"), product.create);
router.get("/", product.getData);
router.delete("/:id", AuthAdmin, product.deleteData);
router.get("/:id", product.getDataById);
router.post("/cat", product.getDataByCategory);
router.put("/:id", AuthAdmin, middleUpload("image"), product.updateData);

module.exports = router;
