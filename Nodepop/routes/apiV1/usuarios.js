'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../../models/Usuario');
var errorJson = require('./errores').es;


router.post('/register', (req, res, next) => {
    req.user_lang = req.body.lang;
    var errorJson = require('./errores')[req.user_lang];
    var newUser = new user(req.body);
    newUser.pwd = bcrypt.hashSync(req.body.pwd, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(401).json({
                success: false,
                error: err.code === 11000 ? errorJson.DUPLICATE_KEY : err.code === 'undefined' ?
                    errorJson.FIELDS_REQUIRED : err
            });
        } else {
            user.pwd = undefined;
            return res.json(user);
        }
    });

});
router.post('/sign_in', (req, res, next) => {
    user.findOne({ email: req.body.email }, function(err, userEncontrado) {
        if (err) throw err;
        if (!userEncontrado) {
            return res.status(401).json({
                success: false,
                message: errorJson.USER_NOT_FOUND + '. Authentication failed, user not found'
            })
        } else if (userEncontrado) {
            req.user_lang = userEncontrado.lang;
            errorJson = require('./errores')[userEncontrado.lang];
            if (!bcrypt.compareSync(req.body.pwd, userEncontrado.pwd)) {
                return res.status(401).json({ success: false, message: errorJson.WRONG_PWD })
            } else {
                return res.json({
                    token: jwt.sign({
                        email: userEncontrado.email,
                        nombre: userEncontrado.nombre,
                        _id: userEncontrado._id,
                        lang: userEncontrado.lang
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
                })
            }
        }
    })
})


/**
 * CREACIÓN CON CARGA DE REGISTROS DE TABLA USUARIOS
 */
router.post('/reiniciaTablaUsuarios', (req, res, next) => {
    try {
        require('./install_db_Usuarios');
        res.json({ success: true });
    } catch (err) {
        res.send("Error", err);
        next(err);
    }
})



module.exports = router;