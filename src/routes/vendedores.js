const {Router} = require("express");
const {
  getAllVendedores,
  getVendedorById,
  logIng,
  putAdmin,
  getSellerDetail,
} = require("../controllers/vendedores");

const router = Router();

router.get("/", getAllVendedores);
router.get("/:name", getAllVendedores);
router.get("/:id", getVendedorById);
router.get("/detail/:id", getSellerDetail);
router.put("/log", logIng);
router.put("/:id", putAdmin);

module.exports = router;
