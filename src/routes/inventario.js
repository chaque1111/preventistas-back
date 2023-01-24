const {Router} = require("express");

const {
  getAllProducts,
  getProductById,
  searchProduct,
  deleteProduct,
  createProduct,
} = require("../controllers/inventario");

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/search", searchProduct);
router.delete("/:id", deleteProduct);
router.post("/product", createProduct);

module.exports = router;
