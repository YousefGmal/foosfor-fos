const CartModel = require('../../../DB/model/cart')
const FoodModel = require('../../../DB/model/food')
const UserModel = require('../../../DB/model/User')

const getcart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userCart: req.user.id }).populate('cartItems.foodIDs')

    res.status(200).json({ message: 'done', cart })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const addtocart = async (req, res) => {
  // try {
  const { Fid } = req.params
  const { quantity } = req.body
  const cartfinder = await CartModel.findOne({ userCart: req.user.id })
  const foodfinder = await FoodModel.findById({ _id: Fid })
  const userfinder = await UserModel.findOne({ _id: req.user.id })
  console.log()
  if (userfinder && foodfinder) {
    if (cartfinder) {
      await CartModel.updateOne({ userCart: req.user.id },
        {
          cartItems: [...cartfinder.cartItems, { foodIDs: foodfinder._id, quantity, price: (foodfinder.price * quantity) }],
          total: (cartfinder.total + foodfinder.price * quantity)
        })
      res.status(200).json({ message: 'done', cartfinder })
    } else {
      const newCart = new CartModel({ cartItems: { foodIDs: foodfinder._id, quantity, price: (foodfinder.price * quantity) }, total: (foodfinder.price * quantity), userCart: req.user.id })
      await newCart.save()
      res.status(200).json({ message: 'done' })
    }
  } else {
    res.status(400).json({ message: 'error' })
  }
  // } catch (error) {
  // res.status(500).json({ message: 'catch error', error })
  // }
}

const deleteitem = async (req, res) => {
  const { Fid } = req.params

  const cartfinder = await CartModel.findOne({ userCart: req.user.id })
  const foodfinder = await FoodModel.findById({ _id: Fid })
  const userfinder = await UserModel.findOne({ _id: req.user.id })
  if (userfinder && foodfinder) {
    if (cartfinder) {
      const food = cartfinder.cartItems.find((x) => x.foodIDs == Fid)
      const cartfilter = cartfinder.cartItems.filter((x) => x.foodIDs != Fid)
      console.log(food.price)
      console.log(cartfilter)
      await CartModel.updateOne({ userCart: req.user.id },
        {
          cartItems: [...cartfilter],
          total: (cartfinder.total - (food.price * food.quantity))
        })
      res.status(200).json({ message: 'done', cartfilter })
    } else {
      // const newCart = new CartModel({ cartItems: { foodIDs: foodfinder._id, quantity, price: (foodfinder.price * quantity) }, total: (foodfinder.price * quantity), userCart: req.user.id })
      // await newCart.save()
      res.status(400).json({ message: 'this item not found' })
    }
  } else {
    res.status(400).json({ message: 'error' })
  }
}

module.exports = { getcart, addtocart, deleteitem }
