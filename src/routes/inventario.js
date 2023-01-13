const {Router} = require("express");

const {
  getAllProducts,
  getProductById,
  searchProduct,
} = require("../controllers/inventario");

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/search", searchProduct);
module.exports = router;
