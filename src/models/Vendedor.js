const {DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "vendedor",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comision: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      limiteBonif: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      vendCom: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      vendImp: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      vendTipoCom: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      observ: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recibonroSUC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recibonroDde: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recibonroHTA: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    },
    {timestamps: false}
  );
};
