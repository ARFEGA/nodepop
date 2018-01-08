'use strict';

function existCollection() {

    const conn = require('../../lib/ConnMongoose');
    return new Promise((resolve, reject) => {
        conn.modelNames().forEach(element => {
            if (element === 'Anuncios') {
                const borra = require('./dropTable');
                borra.borraTabla("Anuncios");
                console.log('Anuncios Borrada');
            }
        });
    })
}

function creaInicializaTabla() {
    //Modelo Anuncios
    const Anuncios = require('../../models/Anuncio');
    var fs = require("fs");
    var contenido = fs.readFileSync(__dirname + "/anuncios.json");
    var jsonContent = JSON.parse(contenido);
    for (var clave in jsonContent) {
        jsonContent[clave].forEach(element => {
            var promise = Anuncios.insertMany(element);
            //console.log('Elemento creado');
        });
    };
    console.log('Anuncios Creada');
}

existCollection();
creaInicializaTabla();