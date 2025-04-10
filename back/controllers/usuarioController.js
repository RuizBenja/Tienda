var Usuario = require('../models/usuario.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt.js');

const registro_usuario_admin = async function (req,res) {
    console.log(req.user)
    if (req.user) {
        let data = req.body;

    let usuarios = await Usuario.find({email: data.email});

    if (usuarios.length >=1) {
        res.status(200).send({data:undefined,message: 'El correo electronico ya existe'});
    } else {
            bcrypt.hash('123456',null,null,async function(err,hash){
                if (err) {
                        res.status(200).send({data:undefined,message: 'No se pudo encriptar la contraseña'});
                } else {
                    data.password =  hash;
                    let usuario = await Usuario.create(data);
                    res.status(200).send({data:usuario});   
                }
            });
        }
    } else {
        res.status(500).send({data:undefined,message: 'ErrorToken'});
    }
}

const login_usuario = async function (req,res) {
    var data = req.body;
    var usuarios = await Usuario.find({email: data.email});

    if (usuarios.length >=1) {
        //correo existe
        bcrypt.compare(data.password, usuarios[0].password, async function(err, check){
            if (check) {
                //
                res.status(200).send({
                    token:jwt.createToken(usuarios[0]),
                    usuario: usuarios[0]
                });
            } else {
                res.status(200).send({data:undefined,message: 'La contraseña es incorrecta'});
            } 
        });
    } else {
        res.status(200).send({data:undefined,message: 'No se encontro el correo electronico'});
    }
}



module.exports = {
    registro_usuario_admin,
    login_usuario
}