const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/User')
const { SECRET } = require('../config')

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: 'Invalid username or password.' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 1440 * 14 })

  res.status(200).json({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = router