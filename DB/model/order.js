const { default: mongoose } = require('mongoose')

const orderSchema = new mongoose.Schema({
  foods: [{ foodIDs: { type: String, ref: 'Food' }, quantity: { type: Number, default: 1 }, price: { type: Number } }],
  total: Number,
  orderedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  // status: { type: String, default: 'Pending' },
  shipAddress: { type: mongoose.Types.ObjectId, ref: 'Address' },
  visible: {type: Boolean, default: true},
  delivered: {type: Boolean, default: false},
  deliveredBy: {type: mongoose.Types.ObjectId, ref: 'Delivery'},
}, {
  timestamps: true
})
const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel
