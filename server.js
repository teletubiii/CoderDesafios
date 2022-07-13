const express = require('express')
const fs = require("fs")

const app = express()

const PORT = 8080

class Contenedor {

   constructor(nombre) {
      this.nombre = nombre
      this.checkExist(this.nombre)
   }

   checkExist(file_name) {
      if (fs.existsSync("./" + file_name)) {
          return true
      } else {
          fs.writeFileSync(file_name, JSON.stringify([], null, 2), 'utf-8')
      }
  }

   async getAll() {
      try {
         const response = await fs.promises.readFile(this.nombre, 'utf-8')
         const object = JSON.parse(response);
         
         return object

      } catch (error) {
         return error
      }
   }

   async getOne() {
      try {
         const data = await fs.promises.readFile(this.nombre);
         const object = JSON.parse(data);
         const random = Math.floor(Math.random() * object.length);
         return object[random];
      } catch (err) {
         throw new Error(err);
      }
   }


}

const contenedor = new Contenedor("archivo.txt")

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', (req, res) => {
   contenedor.getAll().then(data => {
      res.send(data);
   }).catch(err => {
      res.send(err);
   })
})

app.get('/productoRandom', (req, res) => {
   contenedor.getOne().then(data => {
      res.send(data);
   }).catch(err => {
      res.send(err);
   })
})
