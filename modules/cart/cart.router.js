const { auth } = require('../../middleware/auth')
const { getcart, addtocart, deleteitem } = require('./controller/cart')

const cartrouter = require('express').Router()

cartrouter.get('/cart', auth, getcart)

// add to cart
cartrouter.post('/addtocart/:Fid', auth, addtocart)

cartrouter.post('/deletefromcart/:Fid', auth, deleteitem)
module.exports = cartrouter
