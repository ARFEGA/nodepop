'use strict';

const express = require('express');
const router = express.Router();

//Modelo Anuncios
const Anuncio = require('../../models/Anuncio');
const jwtAuth = require('../../lib/jwt_auth');
//Autenticación con JWT. Se llama antes que el resto de middlewares, para que se asegure que el consumidor
//del api está autenticado
router.use(jwtAuth());


router.get('/ListaTags', (re, res, next) => {
    Anuncio.distinct('tags', function(err, results) {
        if (err) {
            return res.status(401).json({
                success: false,
                error: err
            });
        } else {
            res.json({ success: true, Tags: results });
        }

    })

})

/**
 * CREACIÓN CON CARGA DE REGISTROS DE TABLA ANUNCIOS
 */
router.post('/reiniciaTablaAnuncios', (req, res, next) => {
    try {
        require('./install_db_Anuncios');
        res.json({ success: true });
    } catch (err) {
        res.send("Error", err);
        next(err);
    }
})
router.get('/Listar', async(req, res, next) => {
    try {
        const nombre = req.query.nombre ? new RegExp('^' + req.query.nombre, "i") : req.query.nombre;
        const email = req.query.email;
        const tags = req.query.tags;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        //Indico que campos quiere obtener
        const fields = req.query.fields;
        //CReo el filtro
        const filter = {}
        if (nombre) {
            filter.nombre = nombre;
        };
        if (email) {
            filter.email = email;
        };
        if (tags) {
            filter.tags = tags;
        }
        if (venta) {
            filter.venta = venta;
        }
        if (precio) {
            filter.precio = require('./precios.json')[precio];
        }

        //const rows = await Agente.find(filter).exec() //Con exec, convertimos el find que es una query, en una promesa
        //Llamo al metodo limit estático del modelo
        const rows = await Anuncio.list(filter, limit, skip, sort, fields);
        res.json({ success: true, result: rows });
    } catch (err) {
        res.send('Error en el proceso' + err);
        next(err);
    };
});


/**
 * Insert de anuncios
 */

router.post('/Inserta', (req, res, next) => {
    const anuncio = new Anuncio(req.body);
    anuncio.save((err, anuncioInsertado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: anuncioInsertado });
    });
});



/**
 * Borrado de Anuncio
 */
router.delete('/borrado/:id', (req, res, next) => {
    const _id = req.params.id;
    const filter = { _id };
    Anuncio.findOneAndRemove(filter, (err, data) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, RegistroEliminado: data })
    });
});
module.exports = router;