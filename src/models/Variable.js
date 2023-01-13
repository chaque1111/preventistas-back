const {DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Variable",
    {
      nroPedido: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {timestamps: false}
  );
};
