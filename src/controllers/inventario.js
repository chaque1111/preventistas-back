const {where} = require("sequelize");
const XLSX = require("xlsx");
const {Inventario} = require("../db");
const filename = "./Inventario.xlsx";

const ExcelToJsonInventario = () => {
  const excel = XLSX.readFile(filename);
  var Excel = excel.SheetNames;
  //  let datosFromJson = XLSX.utils.sheet_to_json(excel.Sheets[Excel[0]], jsonOpts)
  let datosFromJson = XLSX.utils.sheet_to_json(excel.Sheets[Excel[0]]);
  return datosFromJson;
};

const PrecargaInventario = async () => {
  const inventario = ExcelToJsonInventario();
  const products = inventario.map((e) => {
    return {
      id: e["Código"].trim(),
      descripcion: e["Descripción"],
      rubro: e.Rubro,
      rubro2: e.Rubro2 ? e.Rubro2 : 0,
      porcentaje: e.Porcentaje,
      costo: e.Costo,
      unidadDeMedida: e.Unidiaddemedida ? e.Unidiaddemedida : null,
      stockActual: e.StockActual ? e.StockActual : null,
      tasaBonif: e.TasaBonif ? e.TasaBonif : null,
      costoBonif: e.CostoBonif ? e.CostoBonif : null,
      tiposStock: e.Tipostock ? e.Tipostock : false,
      imagen:
        "https://res.cloudinary.com/dw83apcj7/image/upload/v1675206685/pruductIcon_ltjnru.svg",
    };
  });
  await Inventario.bulkCreate(products);
  // for (let i = 0; i < products.length; i++) {
  //   const hay = await Inventario.findOne({where: {id: products[i].id}});
  //   if (!hay) {
  //     Inventario.create(products[i]);
  //   }
  // }
};

const getAllProducts = async (req, res) => {
  try {
    const {name} = req.query;
    const allProducts = await Inventario.findAll();
    if (name) {
      const productsByName = allProducts.filter((e) =>
        e.descripcion.toUpperCase().includes(name.toUpperCase())
      );
      productsByName.length
        ? res.status(200).json(productsByName)
        : res.status(300).send("Producto no encontrado");
    } else {
      const productsClean = allProducts.map((e) => {
        return {
          id: e.id,
          descripcion: e.descripcion,
          rubro: e.rubro,
          rubro2: e.rubro2,
          porcentaje: e.porcentaje,
          costo: e.costo,
          stockActual: e.stockActual,
          imagen: e.imagen,
        };
      });
      res.status(200).json(productsClean);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};

const getProductById = async (req, res) => {
  try {
    const {id} = req.params;
    const products = await Inventario.findByPk(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).send(error);
  }
};

const searchProduct = async (req, res) => {
  try {
    const {name} = req.body;
    console.log(name);
    const products = await Inventario.findAll();

    let productsFilters = products.filter((e) =>
      e.descripcion.toUpperCase().includes(name.toUpperCase())
    );
    productsFilters.length
      ? res.status(200).send(productsFilters)
      : res.status(300).send("no se encontraron resultados");
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    await Inventario.destroy({
      where: {id: id},
    });
    console.log(id);
    res.status(200).send("se borro el producto");
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const {id} = req.body;
    const {descripcion} = req.body;
    const {rubro} = req.body;
    const {rubro2} = req.body;
    const {costo} = req.body;
    const {stockActual} = req.body;
    const {tipoStock} = req.body;
    const {imagen} = req.body;

    if (
      !id ||
      !descripcion ||
      !rubro ||
      !rubro2 ||
      !costo ||
      !stockActual ||
      !tipoStock
    ) {
      res.status(200).send("faltan datos necesarios");
    } else {
      const hay = await Inventario.findByPk(id);
      if (!hay) {
        const producto = {
          id,
          descripcion,
          rubro,
          rubro2,
          costo,
          stockActual,
          tipoStock,
          imagen:
            imagen ||
            "https://res.cloudinary.com/dw83apcj7/image/upload/v1675206685/pruductIcon_ltjnru.svg",
        };
        await Inventario.create(producto);

        res.status(200).send("producto creado con éxito");
      } else {
        res.status(200).send("el producto con ese código ya existe");
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  PrecargaInventario,
  getAllProducts,
  getProductById,
  searchProduct,
  deleteProduct,
  createProduct,
};
