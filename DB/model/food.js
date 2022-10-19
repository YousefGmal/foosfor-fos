const { default: mongoose } = require('mongoose')
const foodSchema = new mongoose.Schema({
    foodName: { type: String, required: true },
    //pics: { type: String },
    description: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    price: { type: String, required: true },
  }, {
    timestamps: true
  })
  
  
  const FoodModel = mongoose.model('Food', foodSchema)
  module.exports = FoodModel
  