const { auth } = require('../../middleware/auth')
const { getOrdersNotDelivered, selectOrders, getOrderSelected, getOrdersSelected, cancelled, delivered, createDelivery, addDelivery, deleteDelivery, getdelivery, getdeliveries } = require('./controller/delivery')

const deliveryrouter = require('express').Router()

deliveryrouter.post('/delivery/createDelivery/:Uid',  createDelivery)

deliveryrouter.post('/delivery/signin',  addDelivery)

deliveryrouter.post('/delivery/:Did',  deleteDelivery)

deliveryrouter.get('/delivery/:Did', getdelivery)

deliveryrouter.get('/deliveries', getdeliveries)

deliveryrouter.get('/delivery/orders',  getOrdersNotDelivered)

deliveryrouter.post('/delivery/selectorders/:Did', auth,  selectOrders)

deliveryrouter.get('/delivery/ordersSelected/:Did',  getOrdersSelected)

deliveryrouter.get('/delivery/order/:Did/:Oid',  getOrderSelected)

deliveryrouter.post('/delivery/order/delivered/:Did/:Oid',  delivered)

deliveryrouter.post('/delivery/order/cancelled/:Did/:Oid', auth,  cancelled)


module.exports = deliveryrouter


