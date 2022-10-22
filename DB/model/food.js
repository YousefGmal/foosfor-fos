const { default: mongoose } = require('mongoose')
const foodSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    pic: { type: String },
    description: { type: String, required: true },
    category: { type: String },
    price: { type: String, required: true },
  }, {
    timestamps: true
  })
  
  
  const FoodModel = mongoose.model('Food', foodSchema)
  module.exports = FoodModel
  