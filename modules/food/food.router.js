const { verifyadmin } = require('../../middleware/auth')
const { handelValidation } = require('../../middleware/handelValidation')
const { addfood, updatefood, deletefood, getfood, getfoods } = require('./controller/food')
const { foodValidator } = require('./food.validation')
const foodrouter = require('express').Router()

// add food
// eslint-disable-next-line no-sequences
foodrouter.post('/food/add/:Uid',  addfood)
// update food
foodrouter.post('/food/update/:Uid/:Fid',  updatefood)
// delete food
foodrouter.delete('/food/delete/:Fid', deletefood)
// get foods
foodrouter.get('/foods', getfoods)
// get food by ID
foodrouter.get('/food/:Fid',  getfood)
module.exports = foodrouter
