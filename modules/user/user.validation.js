const { body } = require('express-validator')

const signUpValidator = [
  body('userName').isString().withMessage('in-valid username'),
  body('email').isEmail().withMessage('in-valid email'),
  body('password').isLength({ min: 5 }).withMessage('in-valid password'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  })

]

module.exports = { signUpValidator }
