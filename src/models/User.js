const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username must be provided!'],
		unique: true,
		minLength: [4, 'Username must be at least 4 characters long!']
	},
	name: {
		type: String,
		required: [true, 'Name must be provided!']
	},
	passwordHash: String,
	recipes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Recipe'
		}
	]
})

schema.plugin(mongooseUniqueValidator)

schema.set('toJSON', {
	transform: (doc, returnedDoc) => {
		returnedDoc.id = returnedDoc._id.toString()
		delete returnedDoc._id
		delete returnedDoc.__v
		delete returnedDoc.passwordHash
	}
})

const User = mongoose.model('User', schema)

module.exports = User