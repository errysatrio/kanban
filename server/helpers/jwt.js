const jwt = require('jsonwebtoken')

function sign (obj,pass){
    return jwt.sign(obj,pass)
}

function verify (obj,pass){
    return jwt.verify(obj,pass)
}

module.exports = {sign, verify}