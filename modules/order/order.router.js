const orderrouter = require('express').Router()
const { auth } = require('../../middleware/auth')
const { getorder, addorder } = require('./controller/order')

// add to cart or creat an order
orderrouter.post('/addorder', auth, addorder)

// cart or orders
orderrouter.get('/getorder', auth, getorder)

module.exports = orderrouter
