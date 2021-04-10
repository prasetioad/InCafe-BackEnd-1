const product = require("../controllers/product");
const { AuthAdmin } = require("../middleware/auth");
const middleUpload = require("../middleware/upload");

const router = require("express").Router();

router.post("/",  middleUpload("image"), product.create);
router.get("/", product.getData);
router.delete("/:id", AuthAdmin, product.deleteData);
router.get("/:id", product.getDataById);
router.post("/cat", product.getDataByCategory);
router.put("/:id", AuthAdmin, middleUpload("image"), product.updateData);
router.post("/category/:category", product.getDataByCategory)

<<<<<<< HEAD
module.exports = router; 
=======
module.exports = router;
>>>>>>> cf30ca99945bf30f1611e778f8cb145e0ffe7f5d
