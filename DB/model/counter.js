const { default: mongoose } = require('mongoose')

const counterSchema = new mongoose.Schema({
  counter: Number,
}, {
  timestamps: true
})
const CounterModel = mongoose.model('Counter', counterSchema)
module.exports = CounterModel
