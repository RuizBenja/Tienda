var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = ({
    nombres : {type: String,required:true},
    apellidos : {type: String,required:true},
    email : {type: String,required:true,unique:true},
    rol :{type: String,required:true},
    password : {type: String,required:true},
    estado :{type:Boolean,default:true, require:true},
    createdAt :{type:Date, default:Date.now},
});

module.exports = mongoose.model('usuario',UsuarioSchema);