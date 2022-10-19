// (JWT) عشان تمنع الهاك وتاخد معلومات اليوزر
// (income) هتجيب الكمية وتضربها في السعر وتطلع الناتج

const FoodModel = require('../../../DB/model/food')
const OrderModel = require('../../../DB/model/order')
const UserModel = require('../../../DB/model/User')
const CartModel = require('../../../DB/model/cart')
const AddressModel = require('../../../DB/model/address')
const addorder = async (req, res) => {
  // try {

  const { countryName, address, address2, district, postalCode } = req.body

  const cartfinder = await CartModel.findOne({ userCart: req.user.id })
  const userfinder = await UserModel.findOne({ _id: req.user.id })
  console.log(cartfinder)
  if (userfinder && cartfinder) {
    const foods = cartfinder.cartItems
    if (foods) {
      const newAddress = new AddressModel({ countryName, address, address2, district, postalCode })
      await newAddress.save()
      const newOrder = new OrderModel({
        foods: cartfinder.cartItems,
        total: cartfinder.total,
        orderedBy: req.user.id,
        shipAddress: newAddress._id
      })
      await newOrder.save()
      await CartModel.deleteOne({ userCart: req.user.id })
      res.status(200).json({ message: 'done', newOrder })
    } else {
      res.status(200).json({ message: 'no product to order' })
    }
  } else {
    res.status(400).json({ message: 'error' })
  }
  // } catch (error) {
  // res.status(500).json({ message: 'catch error', error })
  // }
}

const getorder = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ orderedBy: req.user.id }).select('-orderedBy')
    res.status(200).json({ message: 'done', order })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

module.exports = { addorder, getorder }
