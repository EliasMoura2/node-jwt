const jwt = require('jsonwebtoken')
const config = require('../config')

function verifyToken(req, res, next){
const token = req.headers['x-access-token'];
if(!token){
    return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET); //podemos pasar aca el config.secret del ejercicio
    req.userId = decoded.id;
    // en la variable userId enviamos por el objeto request el id
    // se usa el objeto request para que las rutas puedan leer este dato
    next();
}

module.exports = verifyToken;