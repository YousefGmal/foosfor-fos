const UserModel = require('../DB/model/User')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
  
    const headerToken = req.headers['authorization']
    console.log(headerToken)
    if (!headerToken || headerToken == null || !headerToken.startsWith('Bearer')) {
      res.status(400).json({ message: 'in_valid headerToken' })
    } else {
      const token = headerToken.split(' ')[1]
      const decoded = jwt.verify(token, process.env.secretKey)
      const user = await UserModel.findOne({ _id: decoded.id }).select('-password')
      if (!user) {
        res.status(400).json({ message: 'in-valid token data' })
      } else {
        req.user = user
        next()
      }
    }
  }


const verifyadmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role == 'Admin') {
      next()
    } else {
      res.status(403).json({ message: 'you are not allowed to do that' })
    }
  })
}

module.exports = { auth, verifyadmin }
