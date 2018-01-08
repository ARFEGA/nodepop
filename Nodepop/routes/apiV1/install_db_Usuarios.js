'use strict';
const bcrypt = require('bcrypt');

function existCollection() {

    const conn = require('../../lib/ConnMongoose');
    return new Promise((resolve, reject) => {
        conn.modelNames().forEach(element => {
            if (element === 'Usuarios') {
                const borra = require('./dropTable');
                borra.borraTabla("Usuarios");
                console.log('Usuarios Borrada');
            }
        });
    })
}

function creaInicializaTabla() {
    //Modelo Usuarios
    const Usuarios = require('../../models/Usuario');
    var fs = require("fs");
    var contenido = fs.readFileSync(__dirname + "/usuarios.json");
    var jsonContent = JSON.parse(contenido);
    for (var clave in jsonContent) {
        jsonContent[clave].forEach(element => {
            var reg = element;
            reg.pwd = bcrypt.hashSync(element.pwd, 10);
            var promise = Usuarios.insertMany(reg);
        });
    };
    console.log('Usuarios Creada');
}

existCollection();
creaInicializaTabla();