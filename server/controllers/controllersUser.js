'use strict'

require('dotenv').config()
const createError = require('http-errors')
const { User, Card, Category } = require('../models')
const { sign } = require('../helpers/jwt')
let jwt_secret = process.env.jwt_secret
const { compare } = require('../helpers/hashedPass')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.client_id);
const randomPass = require('../helpers/randomPass')

class ControllerUser {
    static google_login(req, res, next) {
        let payload
        client.verifyIdToken({
            idToken: req.body.token.id_token,
            audience: process.env.client_id,
        })
        .then(ticket => {
            payload = ticket.getPayload();
            console.log(payload,'============ini paload')
            console.log(ticket,'============ini ticket')
            return User.findOne({where:{email:payload.email}})
        }).then(data=>{
            // console.log(data)
            let {name, email} = payload
            if(data){
                return data
            } else {
                let password = randomPass()
                return User.create({name, email, password})
            }
        })
        .then(data =>{
            const {id, name} = data
            let access_token = sign({id,name}, process.env.jwt_secret)
            res.status(200).json({access_token})
        })
        .catch(err => {
            console.log(err)
        })

    }
    static register(req, res, next) {
        const { name, email, password } = req.body
        User.create({ name, email, password }, { individualHooks: true })
            .then(data => {
                let access_token = sign({ id: data.id, name: data.name }, jwt_secret)
                res.status(200).json({ access_token })
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body
        console.log({ email, password })
        User.findOne({ where: { email } })
            .then(data => {
                if (data) {
                    const { id, name } = data
                    if (compare(password, data)) {
                        let access_token = sign({ id, name }, jwt_secret)
                        res.status(200).json({ access_token })
                    } else {
                        throw createError(404, 'wrong USERNAME/PASSWORD')
                    }
                } else {
                    throw createError(400, 'email cant be empty')
                }
            })
            .catch(err => {
                console.log(err.msg)
                next(err)
            })
    }
}
module.exports = ControllerUser    