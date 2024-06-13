const express = require("express");
const app = express();
const port = 3000;
const morgan = require("morgan");
const mongoose = require("mongoose");
const Product = require("./src/mongooseModels");
const connectDB = require("./src/mongoose");
connectDB();

app.use(express.json());
app.use(morgan("dev"));

//Ruta principal
app.get("/", (req, res) => {
  res.send("Bienvenidos a la API de productos");
});

//Devuelve todos los productos, puede filtrar por categoria
app.get("/productos", async (req, res) => {
  const { categoria } = req.query;
  const query = !categoria
    ? {}
    : { categoria: { $regex: categoria, $options: "i" } };
  try {
    const productos = await Product.find(query);
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al buscar los productos");
  }
});

//Devuelve un producto por su ID
app.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const producto = await Product.findById(id);
  if (producto) {
    return res.json(producto);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

//Crea un nuevo producto
app.post("/productos", async (req, res) => {
  const nuevoProducto = new Product(req.body);
  try {
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: "No se pudo añadir el producto" });
  }
});

//Borra un producto
app.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Product.findByIdAndDelete(id);
    if (resultado) {
      res.json({ message: "Producto borrado con exito" });
    } else {
      res
        .status(404)
        .json({ message: "No se encontro la pelicula para borrarla" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error al borrar la pelicula" });
  }
});

//Modifica un producto parcialmente
app.patch("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const peliModificada = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!peliModificada) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado para modificar" });
    } else {
      res.json({
        message: "Producto actualizado parcialmente con exito",
        peliModificada,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Hubo un error al modificar el producto" });
  }
});

//Modifica un producto completo
app.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const peliModificada = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      overwrite: true,
    });
    if (!peliModificada) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado para modificar" });
    } else {
      res.json({
        message: "Producto actualizado completo con exito",
        peliModificada,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Hubo un error al modificar el producto" });
  }
});

//Devuelve productos con un importe mayor al especificado
app.get("/productos/importes/mayor/:importe", async (req, res) => {
  const importe = parseFloat(req.params.importe);
  try {
    const productos = await Product.find({ importe: { $gt: importe } });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar los productos" });
  }
});

//Devuelve productos con un importe menor al especificado
app.get("/productos/importes/menor/:importe", async (req, res) => {
  const importe = parseFloat(req.params.importe);
  try {
    const productos = await Product.find({ importe: { $lt: importe } });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al encontrar los productos" });
  }
});

//Devuelve una lista de todas las categorias disponibles
app.get("/productos/categorias", async (req, res) => {
  try {
    const categorias = await Product.distinct("categoria");
    res.json(categorias);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al encontrar las categorias de productos" });
  }
});

//Devuelve productos que coinciden con el nombre especificado (busqueda parcial)
app.get("/productos/nombre/:nombre", async (req, res) => {
  const { nombre } = req.params;

  try {
    const nombreBuscado = await Product.find({
      nombre: new RegExp(nombre, "i"),
    });
    res.json(nombreBuscado);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el producto" });
  }
});

//Devuelve productos cuyo importe este dentro del rango especificado
app.get("/productos/rango/:min/:max", async (req, res) => {
  let { min } = parseFloat(req.params);
  let { max } = parseFloat(req.params);

  try {
    const rango = await Product.find({ importe: { $gte: min, $lte: max } });
    res.json(rango);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al buscar en el rango los productos" });
  }
});

app.listen(port, () => {
  console.log(`Puerto corriendo en http://localhost:${port}`);
});
