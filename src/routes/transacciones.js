const {Router} = require("express");
const {
  createTransaction,
  getNumberOnder,
  putNumberOrder,
} = require("../controllers/transaccion");

const router = Router();

router.get("/pedido", getNumberOnder);
router.put("/pedido/:number", putNumberOrder);
router.post("/", createTransaction);
module.exports = router;
