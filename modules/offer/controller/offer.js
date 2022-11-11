const OfferModel = require("../../../DB/model/offer")

const getoffers = async (req, res) => {
    try {
      // const user = await UserModel.findOne({ _id: req.user.id }).select('-password')
      // console.log(user)
      if (true) {
        const offer = await OfferModel.find({visible : true})
        res.status(200).json({ message: 'done', data: offer })
      } else {
        res.status(400).json({ message: 'error' })
      }
    } catch (error) {
      res.status(500).json({ message: 'catch error', error })
    }
  }
  
  const getoffer = async (req, res) => {
    try {
      const { OFid } = req.params
      const offer = await OfferModel.findById({ _id: OFid })
      res.status(200).json({ message: 'done', offer })
    } catch (error) {
      res.status(500).json({ message: 'catch error', error })
    }
  }
  
  const addoffer = async (req, res) => {
    // try {
    const { Uid } = req.params
    const { offerName, description, price, points, expire } = req.body
    
    const userfinder = await UserModel.findOne({ _id: Uid })
    if (userfinder) {
      
      if (!req.file || req.file === [] || req.file == null) {
        console.log('not found')
        var imageURL 
      } else {
        console.log(req.file)
        imageURL = `https://github.com/YousefGmal/foosfor-fos/tree/master/uploadImages/${req.file.filename}`
          
        }
      const newoffer = new OfferModel({ offerName, description, price, points, expire , pic: imageURL})
      
      await newoffer.save()
        
      res.status(200).json({ message: 'done' , data: newoffer })
    } else {
      res.status(400).json({ message: 'error' })
    }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }
  
  const updateoffer = async (req, res) => {
    try {
      const { Uid, OFid } = req.params
      const { offerName, description, price, points, expire } = req.body
      const user = await UserModel.findById({ _id: Uid })
      
      if (user) {
        const data = await OfferModel.findByIdAndUpdate(OFid, { offerName, description, price, points, expire }, { new: true })
        if (data) {
          res.status(200).json({ message: 'done', data: data })
        } else {
          res.status(400).json({ message: 'offer not valid' })
        }
      } else {
        res.status(400).json({ message: 'user not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'catch error', error })
    }
  }
  const deleteoffer = async (req, res) => {
    try {
      const { OFid } = req.params
      const offer = await OfferModel.findByIdAndUpdate({ _id: OFid },{visible: false},{new : true})
      
      if (offer) {
       
        res.status(200).json({ message: 'done', data })
      } else {
        res.status(400).json({ message: 'offer not valid' })
      }
    } catch (error) {
      res.status(500).json({ message: 'catch error', error })
    }
  }
  
  module.exports = { addoffer, updateoffer, deleteoffer, getoffers, getoffer }
  