// import express from 'express'
// import login from './login'
// import users from './users'
// import recipes from './recipes'

// const router = express.Router()

// router.use('/users', users)
// router.use('/login', login)
// router.use('/recipes', recipes)

// export default router

const express = require('express')
const login = require('./login')
const users = require('./users')
const recipes = require('./recipes')

const router = express.Router()

router.use('/users', users)
router.use('/login', login)
router.use('/recipes', recipes)

module.exports = router