require('dotenv').config()
const { verify } = require('../helpers/jwt')
const createError = require('http-errors')

function authentication(req, res, next) {
    try {
        // console.log(req.headers.access_token)
        req.user = verify(req.headers.access_token, process.env.jwt_secret)
        next()
    } catch (error) {
        throw createError (401,'Invalid Token')
    }
}
module.exports = authentication