const express = require('express');
const logger = require('morgan');

const app = express()

app.use(logger('dev'))
app.use(express.json());
/* El servidor sera capaz de entender los archivos json*/
app.use(express.urlencoded({extended : false}));
/* El servidor es capaz de entender los datos que se le envian de un formulario y convertirlo en un objeto js */

// Routes
app.use(require('./routes/auth.routes'))
app.get('/', (req, res) => {
  res.send('Welcome')
})

module.exports = app;