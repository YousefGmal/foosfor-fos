const { verifyadmin } = require('../../middleware/auth')
const { handelValidation } = require('../../middleware/handelValidation')
const { addNotification, updateNotification, deleteNotification, getNotification, getNotifications } = require('./controller/Notification')
//const { NotificationValidator } = require('./Notification.validation')
const Notificationrouter = require('express').Router()

// add Notification
// eslint-disable-next-line no-sequences
Notificationrouter.post('/Notification/add/:Uid',  addNotification)
// update Notification
Notificationrouter.post('/Notification/update/:Uid/:Nid',  updateNotification)
// delete Notification
Notificationrouter.delete('/Notification/delete/:Nid', deleteNotification)
// get Notifications
Notificationrouter.get('/Notifications', getNotifications)
// get Notification by ID
Notificationrouter.get('/Notification/:Nid',  getNotification)
module.exports = Notificationrouter
