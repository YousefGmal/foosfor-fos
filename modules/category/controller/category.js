const { default: slugify } = require('slugify')
const CategoryModel = require('../../../DB/model/category')
const UserModel = require('../../../DB/model/User')

const addcategory = async (req, res) => {
  const { name } = req.body
  if (!req.file || req.file === [] || req.file == null) {
    console.log('not found')
    var imageURL 
  } else {
    console.log(req.file)
    imageURL = `${req.protocol}://${req.headers.host}/${req.file.destination}/${req.file.filename}`
      
    }
    const categoryURL = slugify(name)
    const newCategory = new CategoryModel({ name, slug: slugify(name), categoryURL, categoryPic: imageURL })
    await newCategory.save()

    res.status(200).json({ message: 'done', data: newCategory })
  
}

// // get category
// function createCategories (categories, parentID = null) {
//   const categoryList = []
//   let category
//   // console.log(parentID)
//   if (parentID == null) {
//     category = categories.filter((c) => c.parentID == undefined)
//     // console.log(category)
//   } else {
//     // console.log(categories);
//     category = categories.filter((c) => (c.parentID == parentID))
//     // console.log(category)
//   }

//   for (const cat of category) {
//     categoryList.push({
//       _id: cat._id,
//       name: cat.name,
//       slug: cat.slug,
//       children: createCategories(categories, cat._id)
//     })
//   }
//   return categoryList
// }

const getcategories = async (req, res) => {
  const categoryFinder = await CategoryModel.find().populate('foodIDs','foodName description price pic')
  //  console.log(categoryFinder);
  //  console.log(11111111);
  if (categoryFinder) {
    
    res.status(200).json({ message: 'done', data: categoryFinder })
  } else {
    res.status(400).json({ message: 'category not found' })
  }
}

const getcategory = async (req, res) => {
  const {Cslug} = req.params
  const categoryFinder = await CategoryModel.findOne({slug : Cslug}).populate('foodIDs','foodName description price pic')
  
  if (categoryFinder) {
    
    res.status(200).json({ message: 'done', data: categoryFinder })
  } else {
    res.status(400).json({ message: 'category not found' })
  }
}

const deletecategory = async (req, res) => {
    const { Uid, Cid } = req.params
    const userfinder = await UserModel.findById({_id: Uid})
    const categoryFinder = await CategoryModel.findById(Cid)
    if (userfinder) {
        if(categoryFinder){
            const category = await CategoryModel.findByIdAndDelete(Cid)
            res.status(200).json({ message: 'done', data: category })
        
        
    } else {
      res.status(400).json({ message: 'category not found' })
    
  }
  } else {
    res.status(400).json({ message: 'user not found' })
}
}
const updatecategory = async (req, res) => {
    const { Uid, Cid } = req.params
    const {name } = req.body
    const userfinder = await UserModel.findById({_id: Uid})
    const categoryFinder = await CategoryModel.findById(Cid)
    if (userfinder) {
      if (!req.file || req.file === [] || req.file == null) {
        console.log('not found')
        var imageURL 
      } else {
        console.log(req.file)
        imageURL = `${req.protocol}://${req.headers.host}/${req.file.destination}/${req.file.filename}`
          
        }
        if(categoryFinder){
            const category = await CategoryModel.findByIdAndUpdate(Cid, { name, categorypic: imageURL }, { new: true })
            res.status(200).json({ message: 'done', data: category })   
    } else {
      res.status(200).json({ message: 'category not found' })
    
  }
  } else {
    res.status(400).json({ message: 'user not found' })
}
}



const getProductInCategory = async (req, res) => {
  const { categoryURL } = req.params
  const category = await CategoryModel.findOne({ categoryURL }).select('-parentID').populate('productIDs')
  console.log(category)
  if (category) {
    if (category.productIDs[0] != undefined) {
      res.status(200).json({ message: 'done', category })
    } else {
      const categories = await CategoryModel.find()
      const categoryChildren = createCategories(categories)
      const categoryfilter = categoryChildren.filter((c) => (c.name == category.name))
      res.status(200).json({ message: 'done', categoryfilter })
    }
  } else {
    res.status(400).json({ message: 'category not found' })
  }
}


module.exports = { addcategory, getcategories, getcategory, deletecategory, updatecategory }
