/* eslint-disable eqeqeq */
const CategoryModel = require('../../../DB/model/category')
const FoodModel = require('../../../DB/model/food')
const UserModel = require('../../../DB/model/User')
const getfoods = async (req, res) => {
  try {
    // const user = await UserModel.findOne({ _id: req.user.id }).select('-password')
    // console.log(user)
    if (true) {
      const food = await FoodModel.find()
      res.status(200).json({ message: 'done', data: food })
    } else {
      res.status(400).json({ message: 'error' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getfood = async (req, res) => {
  try {
    const { Fid } = req.params
    const food = await FoodModel.findById({ _id: Fid })
    res.status(200).json({ message: 'done', food })
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const addfood = async (req, res) => {
  // try {
  const { Uid } = req.params
  const { foodName, description, price, category } = req.body
  const categories = await CategoryModel.findOne({name: category})
  const userfinder = await UserModel.findOne({ _id: Uid })
  if (userfinder) {
    
    if (!req.file || req.file === [] || req.file == null) {
      console.log('not found')
      var imageURL 
    } else {
      console.log(req.file)
      imageURL = `https://github.com/YousefGmal/foosfor-fos/tree/master/uploadImages/${req.file.filename}`
        
      }
    const newfood = new FoodModel({ foodName, description, price, category, createdBy: Uid , pic: imageURL})
    
    await newfood.save()
    
      const categoryfinder = categories
      console.log(newfood._id)
      console.log(categoryfinder.foodIDs);
      if (categoryfinder) {
        // if(categoryfinder.foodIDs == undefined)
        // {
        //   await CategoryModel.updateOne({ name: categoryfinder.name }, { foodIDs: newfood._id }, { new: true })

        // }else{
          await CategoryModel.updateOne({ name: categoryfinder.name }, { foodIDs: [...(categoryfinder.foodIDs), newfood._id] })

        //}
      }
      
    res.status(200).json({ message: 'done' , data: newfood })
  } else {
    res.status(400).json({ message: 'error' })
  }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}

const updatefood = async (req, res) => {
  try {
    const { Uid, Fid } = req.params
    const { foodName, description, price } = req.body
    const user = await UserModel.findById({ _id: Uid })
    const food = await FoodModel.findById({_id: Fid})
    if (user) {
      if (food) {
        const data = await FoodModel.findByIdAndUpdate(Fid, { foodName, description, price }, { new: true })
        res.status(200).json({ message: 'done', data: data })
      } else {
        res.status(400).json({ message: 'food not valid' })
      }
    } else {
      res.status(400).json({ message: 'user not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}
const deletefood = async (req, res) => {
  try {
    const { Fid } = req.params
    const food = await FoodModel.findById({ _id: Fid })
    const categories = await CategoryModel.findByID({_id: food.category})
    if (food) {
      if(categories){
        const categoryfinder = categories
        if (categoryfinder) {
          await CategoryModel.updateOne({ name: categoryfinder.name }, { foodIDs: [...(categoryfinder.filter(x => x.foodIDs != food._id))] })
        }
    }
      const data = await FoodModel.findByIdAndDelete(Fid)

      res.status(200).json({ message: 'done', data })
    } else {
      res.status(400).json({ message: 'food not valid' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

module.exports = { addfood, updatefood, deletefood, getfoods, getfood }
