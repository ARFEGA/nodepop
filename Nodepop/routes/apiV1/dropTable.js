'use strict';
//const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
module.exports.borraTabla = function borraTabla(tabla) {

    try {
        if (tabla === 'Anuncios') {
            const Anuncios = require('../../models/Anuncio');
            Anuncios.collection.drop();
        } else if (tabla === 'Usuarios') {
            const Usuarios = require('../../models/Usuario');
            Usuarios.collection.drop();
        }

    } catch (err) {
        next(err);
        console.log('Errror al borrar tabla');
    }
};