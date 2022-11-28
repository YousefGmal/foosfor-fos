const { default: mongoose } = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  categoryPic: String,
  upCategory: {type: String},
  categoryURL: String,
  foodIDs: [{ type: mongoose.Types.ObjectId, ref: 'Food' }]

}, {
  timestamps: true
})
const CategoryModel = mongoose.model('Category', categorySchema)
module.exports = CategoryModel
