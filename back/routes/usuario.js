var express = require('express');
var usuarioController = require('../controllers/usuarioController.js');
var authenticate =  require('../middlewares/authenticate.js')


var api = express.Router();
api.post('/registro_usuario_admin',authenticate.decodeToken,usuarioController.registro_usuario_admin);
api.post('/login_usuario', usuarioController.login_usuario);

module.exports =  api;