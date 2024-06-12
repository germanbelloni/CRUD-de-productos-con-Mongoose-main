const mongoose = require('mongoose')

// Definir el esquema y el modelo de Mongoose
const productsSchema = new mongoose.Schema({
  nombre: String,
  importe: Number,
  categoria: String,
})
const Product = mongoose.model('Producto', productsSchema)

module.exports = Product
