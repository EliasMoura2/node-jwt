const express = require('express');

const app = express()

app.use(express.json());
/* El servidor sera capaz de entender los archivos json*/
app.use(express.urlencoded({extended : false}));
/* El servidor es capaz de entender los datos que se le envian de un formulario y convertirlo en un objeto js */

app.use(require('./controllers/authController'))

module.exports = app;