'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var usuarioSchema = mongoose.Schema({
    nombre: { type: String, index: true, unique: true, trim: true, required: true },
    email: { type: String, index: true, unique: true, lowercase: true, trim: true, required: true },
    pwd: { type: String, required: true },
    lang: { type: String, enum: ['es', 'en', 'ES', 'EN'], default: 'es', lowercase: true, trim: true, required: true }

});
//Creo modelo
//usuarioSchema.methods.checkPassword = function(password) {
//    return bcrypt.compareSync(password, this.pwd);
//};
const Usuario = mongoose.model('Usuarios', usuarioSchema);
//Exporto modelo
module.exports = Usuario;