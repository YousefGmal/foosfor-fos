const { default: mongoose } = require('mongoose')



const orderSchema = new mongoose.Schema({
  orderNumber: Number,
  foods: [{ foodIDs: { type: String, ref: 'Food' }, quantity: { type: Number, default: 1 }, price: { type: Number } }],
  total: Number,
  orderedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  // status: { type: String, default: 'Pending' },
  shipAddress: { type: mongoose.Types.ObjectId, ref: 'Address' },
  deliveryCost : Number,
  visible: {type: Boolean, default: true},
  delivered: {type: Boolean, default: false},
  status:{type: String, default:'processing' },
  deliveredBy: {type: mongoose.Types.ObjectId, ref: 'Delivery'},
  withDelivery: String,
  rating: Number,
  comment: String
}, {
  timestamps: true
})
const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel
