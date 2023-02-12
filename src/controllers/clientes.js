const { DATE, where } = require('sequelize');
const XLSX = require('xlsx');
const { Cliente, Vendedor } = require('../db');
const { PrecargaVendedores } = require('./vendedores');

const FILE_CLIENTES = './Clientes.xlsx';

const readOpts = {
  // <--- need these settings in readFile options
  cellText: false,
  cellDates: true,
};
const jsonOpts = {
  header: 1,
  defval: '',
  blankrows: true,
  raw: false,
  dateNF: 'd"/"m"/"yyyy', // <--- need dateNF in sheet_to_json options (note the escape chars)
};

const ExcelToJson = () => {
  const excel = XLSX.readFile(FILE_CLIENTES, readOpts);
  var Excel = excel.SheetNames;
  //  let datosFromJson = XLSX.utils.sheet_to_json(excel.Sheets[Excel[0]], jsonOpts)
  let datosFromJson = XLSX.utils.sheet_to_json(excel.Sheets[Excel[0]]);
  return datosFromJson;
};

const clientes = ExcelToJson();

const PrecargaClientes = async () => {
  try {
    await PrecargaVendedores();

    function returnId(nombre) {
      if (nombre === 'NELSON') return 5;
      if (nombre === 'BRIONES') return 2;
      if (nombre === 'CAMPOS') return 3;
      if (nombre === 'CHARLY') return 6;
      if (nombre === 'COSI') return 11;
      if (nombre === 'CRISTIAN') return 10;
      if (nombre === 'DEBIT') return 18;
      if (nombre === 'DIEGO') return 17;
      if (nombre === 'GUDI') return 8;
      if (nombre === 'LUIS') return 4;
      if (nombre === 'MATIAS') return 13;
      if (nombre === 'MOSTRADOR') return 14;
      if (nombre === 'ROGELIO') return 12;
      if (nombre === 'RUTA 81') return 15;
      if (nombre === 'WALTER') return 1;
      if (nombre === 'AGUARAY') return 16;
    }

    const arrayC = clientes.map((e) => {
      return {
        id: e.Codigo,
        name: e.NomFant ? e.NomFant : 'not found',
        rzsocial: e.RzSocial ? e.RzSocial : 'not found',
        localidad: e.Localidad,
        direccion: e['Dirección'] ? e['Dirección'] : null,
        provincia: e.Provincia,
        pais: e.País,
        zona: e['CódigoPostal'] ? e['CódigoPostal'] : 'not found',
        whatsapp: e.Tel ? e.Tel : 'not found',
        tipoDocumento: e['Tipo de Documento']
          ? e['Tipo de Documento']
          : 'not found',
        numDocument: e['Número'] ? e['Número'] : 'not found',
        condicionIva: e['Condición Frente al IVA'],
        categoria: e['Categoría'] ? e['Categoría'] : 'not found',
        nombreVendedor: e.Vendedor,
        // saldo: e.Saldo,
        contacto: e.Contacto ? e.Contacto : 'not found',
        listaPrecios: e.ListaPrecios ? e.ListaPrecios : 'not found',
        activo: e.Activo === true ? e.Activo : false,
        fechaUC: e.FechaUC ? e.FechaUC : new DATE(),
        fechaAlta: e.FechaAlta ? e.FechaAlta : 'not found',
        email: e.email ? e.email : 'not found',
        observaciones: e.Oservaciones ? e.Oservaciones : 'sin observaciones',
        vendedorId: returnId(e.Vendedor),
      };
    });

    // await Cliente.bulkCreate(arrayC);
    for (let i = 0; i < arrayC.length; i++) {
      // await Cliente.findOrCreate({where: {id: arrayC[i].id}});
      await Cliente.findOrCreate({
        where: { id: arrayC[i].id },
        defaults: { ...arrayC[i] },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getAllClients = async (req, res) => {
  try {
    const { name } = req.query;
    const clientes = await Cliente.findAll({ include: Vendedor });
    const clientesMap = clientes.map((e) => {
      return {
        cliente: {
          id_client: e.id,
          name_client: e.name,
          direccion: e.direccion,
          localidad: e.localidad,
        },
        vendedor: {
          name_seller: e.nombreVendedor,
          sellerId: e.vendedorId,
        },
      };
    });
    if (name) {
      const { name } = req.query;
      const clientesFilter = clientesMap.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      return res.status(200).send(clientesFilter);
    } else {
      res.status(200).json(clientesMap);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

const getClientById = async (req, res) => {
  try {
    let { id } = req.params;
    const cliente = await Cliente.findByPk(id, { include: Vendedor });
    res.status(200).json(cliente);
  } catch (e) {
    res.status(404).send(e);
  }
};

let Clientes;
const getClientBySeller = async (req, res) => {
  try {
    const id = req.params.id;
    const vendedor = await Vendedor.findByPk(id, { include: Cliente });
    Clientes = vendedor.clientes.map((e) => {
      return {
        id: e.id,
        name: e.name,
        rzsocial: e.rzsocial,
        localidad: e.localidad,
        direccion: e.direccion,
        provincia: e.provincia,
        nombreVendedor: e.nombreVendedor,
        zona: e.zona,
        activo: e.activo,
        vendedorId: 5,
      };
    });
    res.status(200).json(Clientes);
  } catch (error) {
    res.status(404).send(error);
  }
};

const searchClientsBySeller = async (req, res) => {
  try {
    const sellerId = req.body.id;
    const nameClient = req.body.name;
    const vendedor = await Vendedor.findByPk(sellerId, { include: Cliente });
    let arrayClientes = vendedor.clientes;
    arrayClientes = arrayClientes.filter((e) =>
      e.name.toUpperCase().includes(nameClient.toUpperCase())
    );
    Clientes = arrayClientes.map((e) => {
      return {
        id: e.id,
        name: e.name,
        rzsocial: e.rzsocial,
        localidad: e.localidad,
        direccion: e.direccion,
        provincia: e.provincia,
        nombreVendedor: e.nombreVendedor,
        zona: e.zona,
        activo: e.activo,
        vendedorId: 5,
      };
    });

    arrayClientes.length
      ? res.status(200).json(Clientes)
      : res
          .status(400)
          .send('no se encontraron clientes con esas características');
  } catch (error) {
    res.status(400).send(error);
  }
};

const filterClients = async (req, res) => {
  try {
    let CopyClients = Clientes;
    const activo = req.body.activo;
    const localidad = req.body.localidad;
    console.log(localidad, activo);

    if (activo !== '') {
      CopyClients = CopyClients.filter((e) => e.activo.toString() === activo);
    }
    if (localidad !== '') {
      CopyClients = CopyClients.filter((e) => e.localidad === localidad);
    }

    CopyClients.length
      ? res.status(200).send(CopyClients)
      : res.status(400).send('no se encontraron coincidencias');
  } catch (e) {
    res.status(400).send(e);
  }
};

const getLocalidades = async (req, res) => {
  try {
    const id = req.params.id;
    const vendedor = await Vendedor.findByPk(id, { include: Cliente });
    if (vendedor) {
      const clientes = vendedor.clientes;
      const localidades = [];
      clientes.map((e) =>
        !localidades.includes(e.localidad) ? localidades.push(e.localidad) : ''
      );
      res.status(200).json(localidades);
    } else {
      res.status(200).json('no existe el vendedor');
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  ExcelToJson,
  PrecargaClientes,
  getAllClients,
  getClientById,
  getClientBySeller,
  searchClientsBySeller,
  getLocalidades,
  filterClients,
};
