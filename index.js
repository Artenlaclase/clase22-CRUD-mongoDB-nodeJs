const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3001;

const Guitar = require('./models/Guitar') // nuestro modelo para permitir generar o modificar guitarras con la base de datos

const connectDB = require('./config/db') // importamos la carpeta para nuestra base de datos, aún no la creamos
// 2. middlewares

// cargamos las variables de entorno
require('dotenv').config()

// nos conectamos a la base de datos
connectDB()

// habilita CORS en la aplicación para permitir que la API pueda ser consumida desde cualquier origen.
app.use(cors());

app.use(express.json());

app.get('/obtener-guitarras', async (req, res) => {
    try {
        const guitars = await Guitar.find({})
        return res.json({ guitars })
    } catch (error) {
        return res.status(500).json({ msg: "There was an error obtaining the data" });
    }
})
app.post('/crear-guitarra', async (req, res) => {
    const { name, price } = req.body
    try {
        const newGuitar = await Guitar.create({ name, price })
        res.json({newGuitar})

    } catch (error) {
        res.status(500).json({
            msg: "There was an error creating the guitar"
        })       
    }
})
app.put("/actualizar-guitarra", async (req, res) => {const { id, name, price } = req.body 
try {
    const upgradeGuitar = await Guitar.findByIdAndUpdate(id, { name, price }, { new: true })
     res.json(upgradeGuitar)} 
catch (error) {
    res.status(500).json({msg: "There was an error updating the guitar"})
}})


app.delete("/borrar-guitarra", async (req, res) => {
    const { id } = req.body
    try {
        const deleteGuitar = await Guitar.findOneAndDelete({_id: id })
        return res.json(deleteGuitar)
    } catch (error) {
        res.status(500).json({
            msg: "There was an error erasing the specified guitar"
        })
    }
})

app.listen(port, () => {
    console.log(`app listen in port ${port}`);
})
