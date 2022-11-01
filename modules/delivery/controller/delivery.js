const DeliveryModel = require("../../../DB/model/delivery")
const OrderModel = require("../../../DB/model/order")
const UserModel = require("../../../DB/model/User")
const { generateCuteCode } = require('cute-code-generator')
const AddressModel = require("../../../DB/model/address")
const createDelivery = async (req, res) => {
  // try {
    const {Uid} = req.params
    const userfinder = await UserModel.findOne({ _id: Uid })
    
    if (userfinder) {
      const cuteCode = generateCuteCode()
      const newDelivery = new DeliveryModel({ code : cuteCode})
    
    await newDelivery.save()
      res.status(200).json({ message: 'done', data: newDelivery })
    } else {
      res.status(400).json({ message: 'error' })
    }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}

const addDelivery = async (req, res) => {
  // try {
    const {deliveryName, code} = req.body
    const deliveryfinder = await DeliveryModel.findOne({code:code})
    
    if (deliveryfinder) {
      if(deliveryfinder.deliveryName){
        res.status(200).json({ message: 'done', data: deliveryfinder })
      } else {
        const deliveryfinder = await DeliveryModel.findOneAndUpdate(code, {deliveryName}, { new: true })
        res.status(200).json({ message: 'done', data: deliveryfinder })

      }

    } else {
      res.status(400).json({ message: 'code not found' })
    }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}

const deleteDelivery = async (req, res) => {
  // try {
    const {Did} = req.params
    const deliveryfinder = await DeliveryModel.findOneAndDelete({_id:Did})
    
    if (deliveryfinder) {
      
        res.status(200).json({ message: 'done', data: deliveryfinder })

    } else {
      res.status(400).json({ message: 'delivery not found' })
    }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}

const getOrdersNotDelivered = async (req, res) => {
    // try {
       const ordersfinder = await OrderModel.find({ visible: true })
      if (ordersfinder) {
        
        res.status(200).json({ message: 'done', data: ordersfinder })
      } else {
        res.status(400).json({ message: 'No orders yet' })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }


 // عند اختيار الاوردر
  const selectOrders = async (req, res) => {
    // try {
        const {Oid} = req.body 
        const {Did} = req.params
       const orderfinder = await OrderModel.findOne({ _id: Oid })
       const deliveryfinder = await DeliveryModel.findOne({ _id: Did })
      if (orderfinder) {
        if(deliveryfinder){
        const orderfinder = await OrderModel.findByIdAndUpdate(Oid, { visible : false , deliveredBy: Did }, { new: true })
        
        const deliveryupdated =  await DeliveryModel.findByIdAndUpdate(Did, { selectedOrders: [...(deliveryfinder.selectedOrders), orderfinder._id] })
        res.status(200).json({ message: 'done', data: deliveryupdated })
      } else {
        res.status(400).json({ message: 'delivery not found' })
      }} else {
        res.status(400).json({ message: 'order error' })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }

  const getOrdersSelected = async (req, res) => {
    // try {
        const {Did} = req.params
       const deliveryfinder = await DeliveryModel.findOne({_id : Did}).populate('selectedOrders','foods total orderedBy shipAddress')
      if (deliveryfinder) {
        
        res.status(200).json({ message: 'done', data: deliveryfinder })
      } else {
        res.status(400).json({ message: 'No orders yet' })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }

  const getOrderSelected = async (req, res) => {
    // try {
        const {Did , Oid} = req.params
       const deliveryfinder = await DeliveryModel.findOne({_id : Did})
        const order = await OrderModel.findOne({_id : Oid}).populate('shipAddress','countryName address district').populate('orderedBy','firstName lastName')
        if(deliveryfinder){
            if(order){
              // const address = await AddressModel.findOne({_id : })
                res.status(200).json({ message: 'done', data: order })
            } else {
                res.status(400).json({ message: 'error' })
            }
        
      } else {
        res.status(400).json({ message: 'No orders yet' })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }

  const delivered = async (req, res) => {
    // try {
        const {Did , Oid} = req.params
       const deliveryfinder = await DeliveryModel.findOne({_id : Did})
        const order = await OrderModel.findOne({_id : Oid})
        if(deliveryfinder){
            if(order){
              const orderfinder = await OrderModel.findByIdAndUpdate(order._id, { delivered: true }, { new: true })
                res.status(200).json({ message: 'done', data: order })
            } else {
                res.status(400).json({ message: 'error' })
            }
        
      } else {
        res.status(400).json({ message: 'error' })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }

  const cancelled = async (req, res) => {
    // try {
        const {Did , Oid} = req.params
       const deliveryfinder = await DeliveryModel.findOne({_id : Did})
        const order = await OrderModel.findOne({_id : Oid})
        if(deliveryfinder){
            if(order){
              const orderfinder = await OrderModel.findByIdAndUpdate(order._id, { visible : true , deliveredBy: null }, { new: true })
              const deliveryupdated =  await DeliveryModel.findByIdAndUpdate(Did, { selectedOrders: [...(deliveryfinder.selectedOrders.filter(x => x != Oid))] })
                res.status(200).json({ message: 'done', data: order })
            } else {
                res.status(400).json({ message: 'error' })
            }
        
      } else {
        res.status(400).json({ message: 'error' })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }

  module.exports = {getOrdersNotDelivered, selectOrders, getOrdersSelected, getOrderSelected, delivered, cancelled, deleteDelivery, addDelivery, createDelivery}


