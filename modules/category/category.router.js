const CategoryModel = require('../../DB/model/category')
const { verifyadmin } = require('../../middleware/auth')
const { addcategory, getcategory, deletecategory, updatecategory, getcategories } = require('./controller/category')
const cors = require('cors')

const categoryRouter = require('express').Router()
// donot forget verifyadmin
categoryRouter.post('/addCategory', addcategory)
categoryRouter.post('/deleteCategory/:Cid', deletecategory)
categoryRouter.post('/updateCategory/:Cid', updatecategory)
categoryRouter.get('/Categories', getcategories)
categoryRouter.get('/Categories/:Cslug', getcategory)
categoryRouter.get("/", getcategories)


module.exports = categoryRouter
