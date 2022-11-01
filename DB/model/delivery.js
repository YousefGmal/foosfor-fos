const { default: mongoose } = require('mongoose')
const deliverySchema = new mongoose.Schema({
    deliveryName: { type: String},
    code: { type: String },
    selectedOrders: [{ type: mongoose.Types.ObjectId, ref: 'Order' }]
  }, {
    timestamps: true
  })
  
  
  const DeliveryModel = mongoose.model('Delivery', deliverySchema)
  module.exports = DeliveryModel