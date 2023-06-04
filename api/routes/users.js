const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/User')
const { userExtractor } = require('../middlewares')

const router = express.Router()

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('recipes', { name: 1 })

  res.json(users)
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (password.length < 3) return res.status(400).json({ error: 'Password must be at least 3 characters long.'})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

router.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const userToBeDeleted = await User.findById(req.params.id)

  if (userToBeDeleted._id !== user.id) return res.status(401).end()

  const deletedUser = await User.findByIdAndDelete(req.params.id)

  if (deletedUser) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

router.put('/', userExtractor, async (req, res) => {
  const { username, name, password } = req.body
  const user = req.user
  const userToBeUpdated = User.findById(req.params.id)

  if (userToBeUpdated._id !== user.id) return res.status(401).end()

  if (password.length < 3) return res.status(400).json({ error: 'Password must be at least 3 characters long.'})

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, name, passwordHash }, { runValidators: true })

  res.json(updatedUser)
})

module.exports = router