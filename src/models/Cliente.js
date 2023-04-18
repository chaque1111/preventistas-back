const {DataTypes, UUID, UUIDV4} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "cliente",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rzsocial: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      latitud: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      longitud: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      localidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      provincia: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zona: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      whatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      saldo: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      tipoDocumento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numDocument: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      condicionIva: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombreVendedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contacto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      listaPrecios: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      fechaUC: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fechaAlta: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      observaciones: {
        type: DataTypes.STRING(1200),
        allowNull: true,
      },
    },
    {timestamps: false}
  );
};
