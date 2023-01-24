const {DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "inventario",
    {
      id: {
        //
        type: DataTypes.STRING,
        primaryKey: true,
      },
      descripcion: {
        //
        type: DataTypes.STRING,
        allowNull: false,
      },
      rubro: {
        //
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rubro2: {
        //
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      porcentaje: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      costo: {
        //
        type: DataTypes.STRING,
        allowNull: true,
      },
      unidadDeMedida: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stockActual: {
        //
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      tasaBonif: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      costoBonif: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      tipoStock: {
        //
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {timestamps: false}
  );
};
