const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'transaccion',
    {
      vendedorId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      clienteId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      inventarioId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      costo: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
      },
      costoTotalPedido: {
        type: DataTypes.DECIMAL(13, 2),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
