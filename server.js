
const express = require('express')

const app = express()
const port = 3000
// const morgan = require('morgan')
const mongoose = require('mongoose')
const Product = require('./src/mongooseModels');
const connectDB = require('./src/mongoose');
connectDB()

app.use(express.json())
// app.use(morgan.dev())

app.get('/', (req, res) => {
  res.send('Bienvenidos a la API de productos')
})

app.get('/productos', async(req,res)=>{
    const { categoria } = req.query
    const query = !categoria ? {} : {categoria : {$regex: categoria, $options: 'i' }}
    try {
        const productos = await Product.find(query)
        res.json(productos)
    } catch (error) {
        res.status(500).send('Error al buscar los productos')
    }
})

app.listen(port, () => {
  console.log(`Puerto corriendo en http://localhost:${port}`)
})
