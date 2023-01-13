const {Router} = require("express");
const {
  getAllVendedores,
  getVendedorById,
  logIng,
} = require("../controllers/vendedores");

const router = Router();

router.get("/", getAllVendedores);
router.get("/:id", getVendedorById);
router.put("/log", logIng);

module.exports = router;
