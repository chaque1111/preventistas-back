const {
  Transaccion,
  Variable,
  Vendedor,
  Cliente,
  Inventario,
} = require('../db');

const createTransaction = async (req, res) => {
  try {
    const {
      vendedorId,
      clienteId,
      inventarioId,
      descripcion,
      costo,
      cantidad,
      subTotal,
      fecha,
      observacion,
      orderNumber,
    } = req.body;
    const transaccion = await Transaccion.create({
      vendedorId,
      clienteId,
      inventarioId,
      descripcion,
      costo,
      cantidad,
      subTotal,
      fecha,
      observacion,
      orderNumber,
    });

    const cliente = await Cliente.findByPk(clienteId);
    const vendedor = await Vendedor.findByPk(vendedorId);

    await cliente.addTransaccion(transaccion);
    await vendedor.addTransaccion(transaccion);
    // await cliente.setTransaccions(transaccion);
    // await vendedor.setTransaccions(transaccion);
    res.status(200).json(transaccion);
  } catch (error) {
    res.status(404).send(error);
  }
};

const createVariable = async () => {
  try {
    await Variable.create();
  } catch (e) {
    console.log(e);
  }
};
const getNumberOnder = async (req, res) => {
  try {
    const order = await Variable.findAll();
    res.status(200).json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getOrder = async (req, res) => {
  try {
    const allOrder = await Transaccion.findAll();
    const order = allOrder.map((e) => {
      return {
        vendedorId: e.vendedorId,
        clienteId: e.clienteId,
        inventarioId: e.inventarioId,
        descripcion: e.descripcion,
        cantidad: e.cantidad,
        orderNumber: e.orderNumber,
      };
    });
    res.status(200).json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getOrderByNumber = async (req, res) => {
  try {
    let { numberOrder } = req.params;
    const order = await Transaccion.findAll({
      where: {
        orderNumber: numberOrder,
      },
    });
    res.status(200).json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const getOrderById = async (req, res) => {
  try {
    let { id } = req.params;
    const order = await Transaccion.findAll({
      where: {
        id: id,
      },
    });
    res.status(200).json(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

const putNumberOrder = async (req, res) => {
  try {
    const newNumber = req.params.number;
    const order = await Variable.findByPk(1);
    order.nroPedido = newNumber;
    order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).send(error);
  }
};

const putTransaction = async (req, res) => {
  try {
    const {
      id,
      clienteId,
      inventarioId,
      descripcion,
      costo,
      cantidad,
      subTotal,
      fecha,
      observacion,
      orderNumber,
    } = req.body;

    const order = await Transaccion.findByPk(id);

    order.clienteId = clienteId;
    order.inventarioId = inventarioId;
    order.descripcion = descripcion;
    order.costo = costo;
    order.cantidad = cantidad;
    order.subTotal = subTotal;
    order.fecha = fecha;
    order.observacion = observacion;
    order.orderNumber = orderNumber;

    order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createTransaction,
  getNumberOnder,
  getOrder,
  getOrderByNumber,
  getOrderById,
  putNumberOrder,
  putTransaction,
  createVariable,
};
