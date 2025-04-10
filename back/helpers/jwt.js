var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'benja';



exports.createToken = function(usuario){
    var payload ={
        sub: usuario._id,
        nombres: usuario._nombres,
        apellidos: usuario._apellidos,
        email: usuario._email,
        rol: usuario._rol,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload,secret);
}