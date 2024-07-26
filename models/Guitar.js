// 1. importaciones
const mongoose = require('mongoose')

// 2. schema
const guitarSchema = mongoose.Schema({
        name: {
            type: String, 
            required: true
            },
        price: {
            type: Number
        },
    },
    {
	    // Permite agregar la fecha en el que fue generado el documento.
        timestamps: true
    }
)

// 3. modelo clases con mayuscula 
const Guitar = mongoose.model('Guitar', guitarSchema)

// 4. exportación
module.exports = Guitar;
