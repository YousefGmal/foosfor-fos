const { default: mongoose } = require('mongoose')

const upCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  categoryPic: String,
  //parentID: { type: mongoose.Types.ObjectId, ref: 'Category' },
  categoryURL: String,
  categoryIDs: [{ type: mongoose.Types.ObjectId, ref: 'Category' }]

}, {
  timestamps: true
})
const UpCategoryModel = mongoose.model('UpCategory', upCategorySchema)
module.exports = UpCategoryModel
