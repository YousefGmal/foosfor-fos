const { default: mongoose } = require('mongoose')
const notificationSchema = new mongoose.Schema({
    NotificationName: { type: String, required: true },
    pic: { type: String },
    description: { type: String, required: true },
  }, {
    timestamps: true
  })
  
  
  const NotificationModel = mongoose.model('Notification', notificationSchema)
  module.exports = NotificationModel