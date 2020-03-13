'use strict'

const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const Controller = require('../controllers/controllersCard')

router.get('/', authentication, Controller.getAll)
router.get('/:id', authentication, authorization, Controller.getOne)
router.post('/', authentication, Controller.addCard)
router.put('/:id', authentication, authorization, Controller.update)
router.delete('/:id', authentication, authorization, Controller.delete)

module.exports = router