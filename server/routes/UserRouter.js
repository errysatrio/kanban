'use strict'

const router = require('express').Router()
const Controller = require('../controllers/controllersUser')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/GoogleLogin', Controller.google_login)
router.put('/', authentication, Controller.editProfile)
router.get('/:id', authentication, authorization, Controller.getOneUser)

module.exports = router