// (JWT) عشان تمنع الهاك وتاخد معلومات اليوزر
// (income) هتجيب الكمية وتضربها في السعر وتطلع الناتج

const FoodModel = require('../../../DB/model/food')
const OrderModel = require('../../../DB/model/order')
const UserModel = require('../../../DB/model/User')
const CartModel = require('../../../DB/model/cart')
const AddressModel = require('../../../DB/model/address')
const addorder = async (req, res) => {
  // try {
  const {Uid} = req.params
  const { countryName, address, address2, district } = req.body

  const cartfinder = await CartModel.findOne({ userCart: Uid })
  const userfinder = await UserModel.findOne({ _id: Uid})
  console.log(cartfinder)
  if (userfinder && cartfinder) {
    const foods = cartfinder.cartItems
    if (foods) {
      const newAddress = new AddressModel({ countryName, address, address2, district })
      await newAddress.save()
      const newOrder = new OrderModel({
        foods: cartfinder.cartItems,
        total: cartfinder.total,
        orderedBy: Uid,
        shipAddress: newAddress._id
      })
      await newOrder.save()
      // await CartModel.deleteOne({ userCart: req.user.id })
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
    const order = await OrderModel.findOne({ orderedBy: req.user.id }).select('-orderedBy').populate('shipAddress','countryName address address2 district ')
    res.status(200).json({ message: 'done', order })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getorderdetails = async (req, res) => {
  try {
    const {Oid} = req.params
    const order = await OrderModel.findOne({_id : Oid}).populate('shipAddress','countryName address district').populate('orderedBy','firstName lastName')
    res.status(200).json({ message: 'done', order })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getorders = async (req, res) => {
  try {
    
    const order = await OrderModel.find()
    res.status(200).json({ message: 'done', order })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const {Oid} = req.params
    const order = await OrderModel.findOneAndDelete({_id : Oid})
    res.status(200).json({ message: 'done', order })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

module.exports = { addorder, getorder, getorderdetails, getorders, deleteOrder }
