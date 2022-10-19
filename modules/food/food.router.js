const { verifyadmin } = require('../../middleware/auth')
const { handelValidation } = require('../../middleware/handelValidation')
const { addfood, updatefood, deletefood, getfood, getfoods } = require('./controller/food')
const { foodValidator } = require('./food.validation')
const foodrouter = require('express').Router()

// add food
// eslint-disable-next-line no-sequences
foodrouter.post('/food/add/:Uid', foodValidator[0, 2, 3, 4], handelValidation(), addfood)
// update food
foodrouter.post('/food/update/:Uid/:Fid', foodValidator, handelValidation(), updatefood)
// delete food
foodrouter.delete('/food/delete/:Fid', foodValidator[1], handelValidation(), deletefood)
// get foods
foodrouter.get('/foods', verifyadmin, getfoods)
// get food by ID
foodrouter.get('/food/:Fid', foodValidator[1], handelValidation(), getfood)
module.exports = foodrouter
