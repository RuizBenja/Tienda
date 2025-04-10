var express = require('express');
var clienteController = require('../controllers/clienteController.js')


var api = express.Router();
api.get('/testing',clienteController.testing )


module.exports =  api