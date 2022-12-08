/* eslint-disable eqeqeq */
const CountryModel = require('../../../DB/model/country')
const UserModel = require('../../../DB/model/User')
const getcountrys = async (req, res) => {
  try {
    // const user = await UserModel.findOne({ _id: req.user.id }).select('-password')
    // console.log(user)
    
      const country = await CountryModel.find({visible: true})
      res.status(200).json({ message: 'done', data: country })
    
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getcountry = async (req, res) => {
  try {
    const { Coid } = req.params
    const country = await CountryModel.findById({ _id: Coid })
    res.status(200).json({ message: 'done', country })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const addcountry = async (req, res) => {
  // try {
  const { Uid } = req.params
  const { country, deliveryCost } = req.body
  
  
    const newcountry = new CountryModel({ country, deliveryCost})
    
    await newcountry.save()
    
      console.log(newcountry._id)
    res.status(200).json({ message: 'done' , data: newcountry })
 
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}

const updatecountry = async (req, res) => {
  try {
    const { Uid, Coid } = req.params
    const { country , deliveryCost, visible } = req.body
    const user = await UserModel.findById({ _id: Uid })
    const countryFinder = await CountryModel.findById({_id: Coid})
    if (user) {
      if (countryFinder) {
        const data = await CountryModel.findByIdAndUpdate(Coid, { country, deliveryCost, visible }, { new: true })
        res.status(200).json({ message: 'done', data: data })
      } else {
        res.status(400).json({ message: 'country not valid' })
      }
    } else {
      res.status(400).json({ message: 'user not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}
const deletecountry = async (req, res) => {
  try {
    const { Coid } = req.params
    const country = await CountryModel.findById({ _id: Coid })
    if (country) {
      
      const data = await CountryModel.findByIdAndDelete(Coid)

      res.status(200).json({ message: 'done', data })
    } else {
      res.status(400).json({ message: 'country not valid' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const visibleCountry = async (req, res) => {
    //try {
      const {Coid} = req.params
      const {visible} = req.body
      const countryUpdated = await CountryModel.findOneAndUpdate({ _id: Coid },{visible: visible},{new: true})
  
      if (!countryUpdated) {
        res.status(400).json({ message: 'in-valid Country' })
      } else {
        res.status(200).json({ message: 'Done', countryUpdated })
      }
    // } catch (error) {
    //   res.status(500).json({ message: 'catch error', error })
    // }
  }

module.exports = { addcountry, updatecountry, deletecountry, getcountrys, getcountry, visibleCountry }
