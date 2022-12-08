const CartModel = require('../../../DB/model/cart')
const FoodModel = require('../../../DB/model/food')
const OfferModel = require('../../../DB/model/offer')
const UserModel = require('../../../DB/model/User')

const getcart = async (req, res) => {
  //try {
    const cartfinder = await CartModel.findOne({ userCart: req.user.id })
    console.log(cartfinder);
    res.status(200).json({ message: 'done', cartfinder })
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}


const addtocart = async (req, res) => {
  // try {
  const { Fid } = req.params
  const cartfinder = await CartModel.findOne({ userCart: req.user.id })
  const foodfinder = await FoodModel.findById({ _id: Fid })
  const offerFinder = await OfferModel.findOne({_id: Fid})
  //const userfinder = await UserModel.findOne({ _id: req.user.id })
  console.log()
  if ( foodfinder) {
    if (cartfinder) {
      const cartfilter = cartfinder.cartItems.find((x) => x.foodIDs == foodfinder.foodName)
      console.log(cartfilter);
      if(cartfilter){
        res.status(200).json({ message: 'this item was added' })
      }
      else if(!cartfilter){
       const updateCart = await CartModel.findOneAndUpdate({ userCart: req.user.id},
        {
          cartItems: [...cartfinder.cartItems, { foodIDs: foodfinder.foodName, quantity: 1, price: (foodfinder.price) }],
          total: (parseInt(cartfinder.total) + parseInt(foodfinder.price ))
        },{new:true})
      res.status(200).json({ message: 'done', data: updateCart })
    }} else {
      const newCart = new CartModel({ cartItems: { foodIDs: foodfinder.foodName, quantity: 1, price: (foodfinder.price ) }, total: (foodfinder.price), userCart: req.user.id })
      await newCart.save()
      res.status(200).json({ message: 'done', data: newCart })
    }
    
  //add offer to cart
  }else if (offerFinder){
    if (cartfinder) {
      const cartfilter = cartfinder.cartItems.find((x) => x.foodIDs == offerFinder.offerName)
      console.log(cartfilter);
      if(cartfilter){
        res.status(200).json({ message: 'this item was added' })
      }
      else if(!cartfilter){
      const updateCart = await CartModel.findOneAndUpdate({ userCart: req.user.id},
       {
         cartItems: [...cartfinder.cartItems, { foodIDs: offerFinder.offerName, quantity: 1, price: (offerFinder.price) }],
         total: (parseInt(cartfinder.total) + parseInt(offerFinder.price ))
       },{new:true})
     res.status(200).json({ message: 'done', data: updateCart })
   }} else {
     const newCart = new CartModel({ cartItems: { foodIDs: offerFinder.foodName, quantity: 1, price: (offerFinder.price ) }, total: (offerFinder.price), userCart: req.user.id })
     await newCart.save()
     res.status(200).json({ message: 'done', data: newCart })
   }
  
  } else {
    res.status(400).json({ message: 'error' })
  }
  // } catch (error) {
  // res.status(500).json({ message: 'catch error', error })
  // }
}

const updatecart = async (req, res) => {
  // try {
  
  const { quantity } = req.body
  const cartfinder = await CartModel.findOne({ userCart: req.user.id })
  const foodfinder = await FoodModel.findById({ _id: Fid })
  //const userfinder = await UserModel.findOne({ _id: req.user.id })
  console.log()
  if ( foodfinder) {
    if (cartfinder) {
       await CartModel.updateOne({ userCart: req.user.id},
        {
          cartItems: [...cartfinder.cartItems, { foodIDs: foodfinder.foodName, quantity, price: (foodfinder.price * quantity) }],
          total: (cartfinder.total + (foodfinder.price * quantity))
        })
      res.status(200).json({ message: 'done', data: cartfinder })
    } else {
      const newCart = new CartModel({ cartItems: { foodIDs: foodfinder.foodName, quantity, price: (foodfinder.price * quantity) }, total: (foodfinder.price * quantity), userCart: req.user.id })
      await newCart.save()
      res.status(200).json({ message: 'done', data: newCart })
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
  
  //const userfinder = await UserModel.findOne({ _id: req.user.id })
  
  if ( true) {
    if (cartfinder) {
      const food = cartfinder.cartItems.find((x) => x._id == Fid)
      const cartfilter = cartfinder.cartItems.filter((x) => x._id != Fid)
      console.log(food)
      console.log(cartfilter)
      const updateCart = await CartModel.findOneAndUpdate({ userCart: req.user.id },
        {
          cartItems: [...cartfilter],
          total: (cartfinder.total - (food.price * food.quantity))
        },{new:true})
      res.status(200).json({ message: 'done', updateCart })
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
