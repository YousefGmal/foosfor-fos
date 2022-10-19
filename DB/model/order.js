const { default: mongoose } = require('mongoose')

const orderSchema = new mongoose.Schema({
  foods: [{ foodIDs: { type: mongoose.Types.ObjectId, ref: 'Food' }, quantity: { type: Number, default: 1 }, price: { type: Number } }],
  total: Number,
  orderedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  // status: { type: String, default: 'Pending' },
  shipAddress: { type: mongoose.Types.ObjectId, ref: 'Address' }
}, {
  timestamps: true
})
const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel
