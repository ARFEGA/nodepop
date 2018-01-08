'use strict';
const jwt = require('jsonwebtoken');
var errorJson = require('../routes/apiV1/errores').es;
//exportamos un creador de middleware de autenticación
//Vamos, una función que puede recibir parametros o no, que devuelve un middleware
module.exports = () => {
    return function(req, res, next) {
        //Leer credenciales
        const token = req.body.token || req.query.token || req.get('x-access-token'); //La últoma opción es lectura dela cabecera
        if (!token) {
            const err = new Error(errorJson.NO_TOKEN + ', no token provided.');
            err.status = 401;
            next(err);
            return;
        }
        //Comprobar  credenciales con librería jwt
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) { //Es por caducidad de token o por haber sido alterado
                const err = new Error(errorJson.INVALID_TOKEN + ', invalid token.');
                err.status = 401;
                next(err);
                return;
            }
            //Guardamos información obtenida de la codificación en req.
            //Podemos crear propiedades con cualquier nombre y guardar datos
            //user_id de decoded, es la propiedad que dimos al usurario, cuando creamos el token.
            //req.user_id = decoded.user_id;
            req.user_lang = decoded.lang;
            //Pasamos el flujo al siguiente middleware
            next();
        });
    }
}