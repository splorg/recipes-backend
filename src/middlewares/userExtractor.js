const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')

const userExtractor = (req, res, next) => {
  const token = req.token

  const decodedToken = jwt.verify(token, SECRET)

  if (!(token && decodedToken)) {
    return res.status(401).json({ error: 'Token missing or invalid.' })
  }

  req.user = decodedToken
  next()
}

module.exports = userExtractor