const CategoryModel = require('../../DB/model/category')
const { verifyadmin } = require('../../middleware/auth')
const { addcategory, getcategory, deletecategory, updatecategory, getcategories } = require('./controller/category')

const categoryRouter = require('express').Router()
// donot forget verifyadmin
categoryRouter.post('/addCategory', addcategory)
categoryRouter.post('/deleteCategory', deletecategory)
categoryRouter.post('/updateCategory', updatecategory)
categoryRouter.get('/Categories', getcategories)
categoryRouter.get('/Categories/:Cslug', getcategory)
categoryRouter.get("/", getcategories)


module.exports = categoryRouter
