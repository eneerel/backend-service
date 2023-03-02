const { Router } = require("express");
const { getCategory, deleteCategory,createCategory, updateCategory } = require("../controllers/categories");

const router = Router();

router.get("/", getCategory);
router.post("/", createCategory);
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);

module.exports = router;