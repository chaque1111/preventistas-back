const {Router} = require("express");
const {
  getAllVendedores,
  getVendedorById,
  logIng,
  putAdmin,
} = require("../controllers/vendedores");

const router = Router();

router.get("/", getAllVendedores);
router.get("/:id", getVendedorById);
router.put("/log", logIng);
router.put("/:id", putAdmin);

module.exports = router;
