const { default: mongoose } = require('mongoose')
const offerSchema = new mongoose.Schema({
    offerName: { type: String, required: true },
    pic: { type: String },
    description: { type: String, required: true },
    price: { type: String, required: true },
    expire: {type: Date},
    points: {type: Number},
    visible: {type: Boolean , required:true}
  }, {
    timestamps: true
  })
  
  
  const OfferModel = mongoose.model('Offer', offerSchema)
  module.exports = OfferModel
  