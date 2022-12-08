const { default: mongoose } = require('mongoose')

const countrySchema = new mongoose.Schema({
  country: {type: String , unique : true},
  deliveryCost: Number,
  visible : {type: Boolean , default : true}
}, {
  timestamps: true
})
const CountryModel = mongoose.model('Country', countrySchema)
module.exports = CountryModel
