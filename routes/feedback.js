const feedback = require("../controllers/feedback");
const { route } = require("./user");

const router = require("express").Router();

router.post("/", feedback.create);
router.get("/", feedback.getData);
router.delete("/:userId", feedback.deleteData);
router.get("/:userId", feedback.getDataById);
router.put("/:userId", feedback.updateData)

module.exports = router;