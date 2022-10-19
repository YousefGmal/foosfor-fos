const { default: mongoose } = require('mongoose')

const cartSchema = new mongoose.Schema({
  cartItems: [{ foodIDs: { type: mongoose.Types.ObjectId, ref: 'Food' }, quantity: { type: Number, default: 1 }, price: { type: Number } }],
  total: Number,
  userCart: { type: mongoose.Types.ObjectId, ref: 'User' }

}, {
  timestamps: true
})
const CartModel = mongoose.model('Cart', cartSchema)
module.exports = CartModel
