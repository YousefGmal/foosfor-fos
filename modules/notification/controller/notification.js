/* eslint-disable eqeqeq */
const NotificationModel = require('../../../DB/model/Notification')
const UserModel = require('../../../DB/model/User')
const getNotifications = async (req, res) => {
  try {
    // const user = await UserModel.findOne({ _id: req.user.id }).select('-password')
    // console.log(user)
    
      const notification = await NotificationModel.find()
      res.status(200).json({ message: 'done', data: notification })
    
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getNotification = async (req, res) => {
  try {
    const { Nid } = req.params
    const Notification = await NotificationModel.findById({ _id: Nid })
    res.status(200).json({ message: 'done', Notification })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const addNotification = async (req, res) => {
  // try {
  const { Uid } = req.params
  const { NotificationName, description } = req.body
  
  if (true) {
    
    if (!req.file || req.file === [] || req.file == null) {
      console.log('not found')
      var imageURL 
    } else {
      console.log(req.file)
      imageURL = `https://github.com/YousefGmal/foosfor-fos/tree/master/uploadImages/${req.file.filename}`
        
      }
    const newNotification = new NotificationModel({ NotificationName, description, pic: imageURL})
    
    await newNotification.save()
    
      console.log(newNotification._id)
    res.status(200).json({ message: 'done' , data: newNotification })
  } else {
    res.status(400).json({ message: 'error' })
  }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}

const updateNotification = async (req, res) => {
  try {
    const { Uid, Nid } = req.params
    const { NotificationName, description } = req.body
    const user = await UserModel.findById({ _id: Uid })
    const Notification = await NotificationModel.findById({_id: Nid})
    if (user) {
      if (Notification) {
        const data = await NotificationModel.findByIdAndUpdate(Nid, { NotificationName, description }, { new: true })
        res.status(200).json({ message: 'done', data: data })
      } else {
        res.status(400).json({ message: 'Notification not valid' })
      }
    } else {
      res.status(400).json({ message: 'user not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}
const deleteNotification = async (req, res) => {
  try {
    const { Nid } = req.params
    const Notification = await NotificationModel.findById({ _id: Nid })
    if (Notification) {
      
      const data = await NotificationModel.findByIdAndDelete(Nid)

      res.status(200).json({ message: 'done', data })
    } else {
      res.status(400).json({ message: 'Notification not valid' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

module.exports = { addNotification, updateNotification, deleteNotification, getNotifications, getNotification }
