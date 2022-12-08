const orderrouter = require('express').Router()
const { auth } = require('../../middleware/auth')
const {  addorder, getorders, getorderdetails, deleteOrder, ratingOrder, getOrderStatus, getUserOrder } = require('./controller/order')

// add to cart or creat an order
orderrouter.post('/addorder/:Uid',  addorder)

orderrouter.post('/deleteorder/:Oid',  deleteOrder)

// cart or orders
orderrouter.get('/getUserOrder',auth,  getUserOrder)

orderrouter.get('/getorders',  getorders)

orderrouter.get('/getorderstatus/:Oid', auth, getOrderStatus)

orderrouter.get('/admin/getorder/:Oid',  getorderdetails)

orderrouter.post('/ratingorder/:Oid',auth,  ratingOrder)


module.exports = orderrouter
