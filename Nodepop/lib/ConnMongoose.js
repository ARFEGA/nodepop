'use strict'
const mongoose = require('mongoose');
const conn = mongoose.connection;


conn.on('error', err => {
    console.log('Error al conectar DB', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log(`Servidor MongoDB conectado a ${mongoose.connection.name}`);
});
mongoose.connect('mongodb://localhost/Nodepop', { useMongoClient: true });
module.exports = conn;