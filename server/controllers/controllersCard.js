'use strict'

const { Card, Category, User } = require('../models')
// const io = require('socket.io')

class ControllerTask {
    static getAll(req, res, next) {
        let UserId = req.user.id
        console.log(req.user)
        Card.findAll({where:{UserId}, order:[['id','asc']]})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
                // console.log(err)
            })
    }

    static getOne(req, res, next) {
        let id = Number(req.params.id)
        Card.findOne({ where: { id } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(req, res, next) {
        const { title, description, category } = req.body
        let id = Number(req.params.id)
        Promise.all([Card.update({ title, description, category }, { where: { id } }), Card.findByPk(id)])
            .then(data => {
                req.io.emit('io',   )
                res.status(200).json(data[1])
            })
            .catch(err => {
                next(err)
            })
    }

    static addCard(req, res, next) {
        let UserId = req.user.id
        const { title, description } = req.body
        Card.create({ title, description, category: 0,UserId })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(req, res, next) {
        console.log('masuk')
        let id = Number(req.params.id)
        let find = ''
        Card.findByPk(id)
            .then(data => {
                console.log(data)
                find = data
                return Card.destroy({ where: { id } })
            })
            .then(data => {
                res.status(200).json(find)
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
}

module.exports = ControllerTask