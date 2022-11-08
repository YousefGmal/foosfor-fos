const orderrouter = require('express').Router()
const { auth } = require('../../middleware/auth')
const { getorder, addorder, getorders, getorderdetails, deleteOrder } = require('./controller/order')

// add to cart or creat an order
orderrouter.post('/addorder/:Uid',  addorder)

orderrouter.post('/deleteorder/:Oid',  deleteOrder)

// cart or orders
orderrouter.get('/getorder',  getorder)

orderrouter.get('/getorders',  getorders)

orderrouter.get('admin/getorder',  getorderdetails)


module.exports = orderrouter
