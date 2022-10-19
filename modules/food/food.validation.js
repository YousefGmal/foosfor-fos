const { body, param } = require('express-validator')

const foodValidator = [
  param('Uid').isString().withMessage('in-valid id'),
  param('Pid').isString().withMessage('in-valid id'),
  body('foodName').isString().withMessage('in-valid productname'),
  body('description').isString().withMessage('in-valid description'),
  body('price').isFloat().withMessage('in-valid price')

]

module.exports = { foodValidator }