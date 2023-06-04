require('dotenv').config()

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://mongo:27017/recipes-app?retryWrites=true&w=majority'
const SECRET = process.env.SECRET || 'dockerSecret'

module.exports = {
  PORT,
  DATABASE_URL,
  SECRET
}