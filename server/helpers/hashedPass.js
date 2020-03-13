const bcrypt = require('bcrypt')
const salt = 10

function hashedPass(obj) {
    obj.password = bcrypt.hashSync(obj.password, salt)
    return obj
}

function compare(password, data) {
    return bcrypt.compareSync(password, data.password)
}


module.exports = { hashedPass, compare }