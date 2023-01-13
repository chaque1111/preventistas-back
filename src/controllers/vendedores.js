const XLSX = require("xlsx");
const {Vendedor, Cliente} = require("../db");
const filename = "./Vendedores.xlsx";

const readOpts = {
  // <--- need these settings in readFile options
  cellText: false,
  cellDates: true,
};
const jsonOpts = {
  header: 1,
  defval: "",
  blankrows: true,
  raw: false,
  dateNF: 'd"/"m"/"yyyy', // <--- need dateNF in sheet_to_json options (note the escape chars)
};

const ExcelToJsonVendedores = () => {
  const excel = XLSX.readFile(filename);
  var Excel = excel.SheetNames;
  //  let datosFromJson = XLSX.utils.sheet_to_json(excel.Sheets[Excel[0]], jsonOpts)
  let datosFromJson = XLSX.utils.sheet_to_json(excel.Sheets[Excel[0]]);

  return datosFromJson;
};

const excelToJson = ExcelToJsonVendedores();

const PrecargaVendedores = async () => {
  const vendedores = excelToJson.map((e) => {
    return {
      id: e.Código,
      name: e.Vendedores,
      comision: e.comision,
      limiteBonif: e.LimiteBonif >= 0 ? e.limiteBonif : 0,
      vendCom: e.VendCom === true ? true : false,
      vendImp: e.VendImp === true ? true : false,
      vendTipoCom: e.VendTipoCom ? e.VendTipoCom : 0,
      observ: e.Observ ? e.Observ : "not found",
      recibonroSUC: e.ReciboNroSuc ? e.ReciboNroSuc : "not found",
      recibonroDde: e.ReciboNroDde ? e.ReciboNroDde : "not found",
      recibonroHTA: e.ReciboNroHta ? e.ReciboNroHta : "not found",
      password: "12345t",
    };
  });
  await Vendedor.bulkCreate(vendedores);
  // for (let i = 0; i < vendedores.length; i++) {
  //   const hay = await Vendedor.findOne({where: {id: vendedores[i].id}});
  //   if (!hay) {
  //     Vendedor.create(vendedores[i]);
  //   }
  // }
};

const getAllVendedores = async (req, res) => {
  try {
    const {name} = req.query;
    const vendedores = await Vendedor.findAll({include: Cliente});
    if (name) {
      const vendedorByName = vendedores.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      vendedorByName.length
        ? res.status(200).json(vendedorByName)
        : res.status(300).json("vendedor no encontrado");
    } else {
      const allSellers = vendedores.map((e) => {
        return {
          vendedor: {
            id: e.id,
            name: e.name,
          },
          clientes: e.clientes.map((e) => {
            return {
              id: e.id,
              name: e.name,
            };
          }),
        };
      });
      res.status(200).json(allSellers);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getVendedorById = async (req, res) => {
  try {
    const found = await Vendedor.findByPk(req.params.id, {include: Cliente});
    console.log(found);
    if (!found) {
      return res.status(404).send("el vendedor no existe");
    }
    return res.status(200).json(found);
  } catch (error) {
    res.status(400).send(error);
  }
};

const logIng = async (req, res) => {
  try {
    const seller = req.body;
    const sellerById = await Vendedor.findByPk(seller.id);
    console.log(sellerById);
    if (sellerById.password === seller.password) {
      res.status(200).send(sellerById);
    } else {
      res.status(200).send(false);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = {
  PrecargaVendedores,
  getAllVendedores,
  getVendedorById,
  logIng,
};
