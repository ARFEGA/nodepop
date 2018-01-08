'use strict'
const mongoose = require('mongoose');

var anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true, unique: true, trim: true, required: true },
    venta: { type: Boolean, required: true },
    precio: { type: Number, required: true },
    foto: { type: String, required: true },
    tags: { type: [{ type: String, enum: ['work', 'lifestyle', 'motor', 'mobile'], required: true }] }
});
//Creamos un metodo estatico, la creamos aí schemaAgente.statics.list
anuncioSchema.statics.list = function(filters, limit, skip, sort, fields) {
        //Obtenemos la query sin ejecutarla
        const query = Anuncio.find(filters);
        //Añadimos parametros a la query, el parametro limit
        query.limit(limit);
        query.skip(skip);
        query.sort(sort);
        query.select(fields); //Para que me de el campo que yo quiera
        //En la siguiente línea le pido los campos age y name. Si quiereo evitar el id, lo indicamos como -_id
        //http://localhost:3000/apiV1/anuncios?fields=nombre email -_id

        //Ejecutamos la query y devolvemos una promesa
        return query.exec();
    }
    //Creo modelo, indicando la colección y el esquema
const Anuncio = mongoose.model("Anuncios", anuncioSchema);

//Exporto modelo
module.exports = Anuncio;