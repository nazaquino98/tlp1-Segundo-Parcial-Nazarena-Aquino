//iniciar servidor
const express = require("express")
const db = require("./db.js")

//crear servidor
const app = express()

//usar middlwares
app.use(express.json())


//crear las rutas


//obtener todos los productos
app.get("/productos", (req, res) => {
    res.json(db)
})

//obtener producto por su id
app.get("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const producto = db.find((producto) => producto.id === id)
    res.json(producto)
})

//crear producto
app.post("/productos", (req, res) => {
    const {id, nombre, cantidad, precio} = req.body
    const nuevoProducto = db.push({"id": id, "nombre": String(nombre), "cantidad": parseInt(cantidad), "precio": parseFloat(precio)})

    res.json({message: "producto nuevo creado correctamente"})
})

//actualizar producto
app.put("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const {nombre, cantidad, precio} = req.body
    const productoActualizado = db.find((producto) => producto.id === id)

    productoActualizado.nombre = String(nombre)
    productoActualizado.cantidad = parseInt(cantidad)
    productoActualizado.precio = parseFloat(precio)
res.json({message: "producto actualizado correctamente"})
})

//eliminar producto
app.delete("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const producto = db.find((producto) => producto.id === id)
    const indiceProducto = db.indexOf(producto)
    const eliminarProducto = db.splice(indiceProducto, 1)

    res.json({message: "producto eliminado correctamente"})
})











//correr servidor
const PORT = 4000;
app.listen(PORT, () => console.log("servidor corriendo en el puerto " + PORT))