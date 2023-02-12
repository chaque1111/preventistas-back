const { Router } = require('express');
const {
  createTransaction,
  getNumberOnder,
  putNumberOrder,
  getOrder,
  getOrderByNumber,
  getOrderById,
  putTransaction,
} = require('../controllers/transaccion');

const router = Router();

router.get('/pedido', getNumberOnder);
router.get('/pedido/lista', getOrder);
router.get('/pedido/lista/:numberOrder', getOrderByNumber);
router.get('/pedido/:id', getOrderById);

router.put('/pedido/:number', putNumberOrder);
router.put('/pedido/lista/modif', putTransaction);

router.post('/', createTransaction);
module.exports = router;
