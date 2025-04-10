var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var port = process.env.port || 4201;

var app = express();

var cliente_route = require('./routes/cliente.js');
var usuario_route = require('./routes/usuario.js');

app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyparser.json({limit: '50mb', extended: true}));

async function startServer() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/tienda');
      console.log('Conectado a MongoDB');
      app.listen(4201, () => {
        console.log('Servidor escuchando en puerto 4201');
      });
  
    } catch (err) {
      console.error('Error al conectar a MongoDB', err);
    }
  }
  
  startServer();

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});
    

app.use('/api',cliente_route);
app.use('/api',usuario_route);