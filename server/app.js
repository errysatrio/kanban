'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const port = process.env.port
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)
app.use(errorHandler)

app.listen(port, ()=> console.log('listening to port', port))