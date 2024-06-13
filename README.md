# API de productos

Este proyecto implementa una API RESTful para la gestión de productos almacenados en una base de datos JSON. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos, así como consultas avanzadas como filtrado por categoría, búsqueda por nombre y filtrado por rango de importe.

## Tecnologías Utilizadas

* Node.js
* Express.js
* MongoDB (con Mongoose para la integración)

## Instalación

1. Clonar el repositorio:
   git clone https://github.com/germanbelloni/CRUD-de-productos-con-Mongoose-main
3. Instalar dependencias:
   npm install
4. Configuración de la base de datos:
   Asegúrate de tener una instancia de MongoDB en ejecución. Puedes configurar la conexión en el archivo src/mongoose.js.
5. Ejecutar la aplicación:
   npm start
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

Uso

Endpoints

* GET /productos
  Devuelve todos los productos. Permite filtrar por categoría mediante query string.
  GET [http://localhost:3000/productos](http://localhost:3000/productos)
  GET [http://localhost:3000/productos?categoria=Electrónicos]()
* GET /productos/
  Devuelve un producto por su ID.
  GET [http://localhost:3000/productos/1]()
* POST /productos
  Crea un nuevo producto.
  POST [http://localhost:3000/productos](http://localhost:3000/productos)
  Content-Type: application/json
  {
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción del nuevo producto",
  "categoria": "Electrónicos",
  "precio": 399.99
  }
* DELETE /productos/
  Elimina un producto por su ID.
  DELETE [http://localhost:3000/productos/1]()
* PATCH /productos/
  Actualiza parcialmente un producto por su ID.
  PATCH [http://localhost:3000/productos/1]()
  Content-Type: application/json
  {
  "precio": 449.99
  }
* PUT /productos/
  Actualiza completamente un producto por su ID.
  PUT [http://localhost:3000/productos/1]()
  Content-Type: application/json
  {
  "nombre": "Producto Actualizado",
  "descripcion": "Nueva descripción del producto",
  "categoria": "Electrónicos",
  "precio": 449.99
  }
* GET /productos/importes/mayor/
  Devuelve los productos con un importe mayor al especificado.
  GET [http://localhost:3000/productos/importes/mayor/500]()
* GET /productos/importes/menor/
  Devuelve los productos con un importe menor al especificado.
  GET [http://localhost:3000/productos/importes/menor/200]()
* GET /productos/categorias
  Devuelve una lista de todas las categorías disponibles.
  GET [http://localhost:3000/productos/categorias]()
* GET /productos/nombre/
  Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial).
  GET [http://localhost:3000/productos/nombre/Laptop]()
* GET /productos/rango/
  /
  Devuelve los productos cuyo importe esté dentro del rango especificado.
  GET [http://localhost:3000/productos/rango/100/500]()
