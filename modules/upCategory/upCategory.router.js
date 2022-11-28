
const { verifyadmin } = require('../../middleware/auth')
const { addcategory, getcategory, deletecategory, updatecategory, getcategories } = require('./controller/upCategory')

const upcategoryRouter = require('express').Router()
// donot forget verifyadmin
upcategoryRouter.post('/addUpCategory', addcategory)
upcategoryRouter.post('/deleteUpCategory/:Cid', deletecategory)
upcategoryRouter.post('/updateUpCategory/:Cid', updatecategory)
upcategoryRouter.get('/UpCategories', getcategories)
upcategoryRouter.get('/UpCategories/:Cslug', getcategory)



module.exports = upcategoryRouter
