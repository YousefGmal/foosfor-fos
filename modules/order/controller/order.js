// (JWT) عشان تمنع الهاك وتاخد معلومات اليوزر
// (income) هتجيب الكمية وتضربها في السعر وتطلع الناتج

const FoodModel = require('../../../DB/model/food')
const OrderModel = require('../../../DB/model/order')
const UserModel = require('../../../DB/model/User')
const CartModel = require('../../../DB/model/cart')
const AddressModel = require('../../../DB/model/address')
const CounterModel = require('../../../DB/model/counter')
const io = require('../../../services/socket')
const addorder = async (req, res) => {
  // try {
  const {Uid} = req.params
  const { countryName, address, address2, district, cart } = req.body

  //const cartfinder = await CartModel.findOne({ userCart: Uid }).lean()
  const userfinder = await UserModel.findOne({ _id: Uid}).lean()
  // const counter = await CounterModel.findOne()
  //console.log(cartfinder)
  // if(!counter)
  // {
  //   const count = 1
  //   const newCounter = new CounterModel({ counter: count })
  //   await newCounter.save()
  // }
  if (userfinder ) {
    const counterfinder = await CounterModel.findOneAndUpdate({},{ '$inc': {'counter' : 1} })
    //const foods = cartfinder.cartItems
    if (true) {
      const newAddress = new AddressModel({ countryName, address, address2, district })
      await newAddress.save()
      let utotal = 0
      // for (let i = 0; i < cart.length; i++) {
      //    utotal = utotal + (cart[i].quantity * cart[i].price);
        
      // }
      let newcart = [{}]
      for (let i = 0; i < cart.length; i++) {
        utotal = utotal + (cart[i].quantity * cart[i].price);
        const {foodIDs,quantity,price} = cart[i]
         newcart[i] = {foodIDs,quantity,price}; 
      }
      console.log(newcart);
      const newOrder = new OrderModel({
        orderNumber: counterfinder.counter,
        foods: newcart,
        total: utotal,
        orderedBy: Uid,
        shipAddress: newAddress._id
      })
      await newOrder.save()
      //io.getIo().emit('newOrder' , saveOrder )
      // io.getIo().to().emit('newOrder' , saveOrder )

      //const data = await CounterModel.findOneAndUpdate({counter: counterfinder.counter},{ '$inc': {'counter' : 1} })
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
    
    const order = await OrderModel.find({ orderedBy: req.user.id }).select('-orderedBy').populate('shipAddress','countryName address address2 district ')
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
    
    const order = await OrderModel.find().populate('shipAddress','countryName address district').populate('orderedBy','firstName lastName')
    res.status(200).json({ message: 'done', order })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getOrderStatus = async (req, res) => {
  try {
    const {Oid} = req.params
    const order = await OrderModel.findOne({_id : Oid})
    if(order.orderedBy== req.user.id)
    {
      res.status(200).json({ message: 'done', order })
    }else{
      res.status(400).json({ message: 'order not valid' })
    }
    
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

const ratingOrder = async (req, res) => {
  //try {
    const {Oid} = req.params
    const {rating,comment} = req.body
    // const userfinder = await UserModel.findOne({ _id: req.user.id}).lean()
    const orderfinder = await OrderModel.findOne({ _id : Oid}).lean()
    if(orderfinder.orderedBy == req.user.id){
    const order = await OrderModel.findOneAndUpdate({_id : Oid},{rating: rating, comment:comment},{new:true})
    res.status(200).json({ message: 'done', order })
    } else{
      res.status(400).json({ message: 'error' })
    }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}



module.exports = { addorder, getorder, getorderdetails, getorders, deleteOrder, ratingOrder, getOrderStatus }
