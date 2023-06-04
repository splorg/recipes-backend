const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const { DATABASE_URL } = require('./config')
const routes = require('./routes')
const { tokenExtractor, unknownEndpoint, errorHandler } = require('./middlewares')

const app = express()

mongoose.set('strictQuery', false)

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/', express.static('public'))
app.use('/api', routes)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app