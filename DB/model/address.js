const { default: mongoose } = require('mongoose')

const addressSchema = new mongoose.Schema({
  countryName: { type: String, required: true },
  address: { type: String, required: true },
  address2: { type: String },
  district: Number,
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})
const AddressModel = mongoose.model('Address', addressSchema)
module.exports = AddressModel
