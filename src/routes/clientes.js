const {Router} = require("express");
const {
  getAllClients,
  getClientById,
  getClientBySeller,
  searchClientsBySeller,
  getLocalidades,
  filterClients,
} = require("../controllers/clientes");

const router = Router();

router.get("/", getAllClients);
router.get("/localidades/:id", getLocalidades);
router.get("/seller/:id", getClientBySeller);
router.get("/:id", getClientById);
router.put("/search", searchClientsBySeller);
router.put("/filters", filterClients);

module.exports = router;
