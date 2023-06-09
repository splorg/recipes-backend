const express = require('express')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const { userExtractor } = require('../middlewares')

const router = express.Router()

router.get('/', async (req, res) => {
  const recipes = await Recipe.find({}).populate('author', { username: 1 })

  res.json(recipes)
})

router.post('/', userExtractor, async (req, res) => {
  const { name, ingredients, image_base64, instructions } = req.body

  const user = await User.findById(req.user.id)

  const recipe = new Recipe({
    name,
    ingredients,
    instructions,
    image_base64,
    author: user._id
  })

  const savedRecipe = await recipe.save()
  user.recipes = user.recipes.concat(savedRecipe._id)
  await user.save()

  res.status(201).json(savedRecipe)
})

router.delete('/:id', userExtractor, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)

  if (recipe && recipe.author && recipe.author.toString() === req.user.id) {
    await Recipe.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    return res.status(401).json({ error: 'Unauthorized access to this recipe.' })
  }
})

router.put('/:id', userExtractor, async (req, res) => {
  const { name, ingredients, image_base64, instructions } = req.body
  const user = req.user

  const recipe = {
    name,
    ingredients,
    instructions,
    image_base64
  }

  const recipeToBeUpdated = await Recipe.findById(req.params.id)
  
  if (recipeToBeUpdated.author.toString() !== user.id) return res.status(401).json({ error: 'Unauthorized access to this recipe.' })

  const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, recipe, { new: true, runValidators: true })

  if (updatedRecipe) {
    res.json(updatedRecipe)
  } else res.status(404).end()
})

module.exports = router