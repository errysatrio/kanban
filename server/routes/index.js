'use strict'

const router = require('express').Router()
const UserRouter = require('./UserRouter')
const CardRouter = require('./cardRouter')

router.use('/user', UserRouter)
router.use('/tasks', CardRouter)

module.exports = router