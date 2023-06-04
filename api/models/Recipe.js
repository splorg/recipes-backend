const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingredient name must be provided!']
  },
  quantity: {
    type: Number,
    required: [true, "Ingredient quantity must be provided!"]
  },
  measurement: {
    type: String,
    required: [true, "Unit of measurement must be provided!"],
    enum: { values: ['un', 'xic', 'col', 'ml', 'lt', 'gr'], message: 'Invalid unit of measurement!' }
  },
  _id: false
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Recipe name must be provided!']
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: [true, 'Recipe must have step-by-step instructions!']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The recipe must have an author!']
  }
})

schema.set('toJSON', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id
    delete returnedDoc._id
    delete returnedDoc.__v
  }
})

const Recipe = mongoose.model('Recipe', schema)

module.exports = Recipe