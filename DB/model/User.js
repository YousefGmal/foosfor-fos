const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String },
  //birthdate: { type: Date, required: true },
  //wishes: [{ type: mongoose.Types.ObjectId, ref: 'Food' }]
  phone: String,
  age: Number,
  address: { type: mongoose.Types.ObjectId, ref: 'Address' },
  gender: { type: String, default: 'Male' },
  confirmed: { type: Boolean, default: false },
  role: { type: String, default: 'Customer' },
  shareProfileLink: String,
  paymentHistory: Array,
  block: { type: Boolean, default: false },
  points: {type: Number , default: 0}
  // accountStatus:{type:String , default:'offline'},

}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT))
  next()
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
