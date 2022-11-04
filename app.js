const express = require('express')
const multer = require('multer')
const path = require('path')
const shortid = require('shortid')
const cors = require('cors')
const connectDB = require('./DB/connectDB')
const categoryRouter = require('./modules/category/category.router')
const foodrouter = require('./modules/food/food.router')
require('dotenv').config()
const router = require('./modules/user/user.router')
const orderrouter = require('./modules/order/order.router')
const cartrouter = require('./modules/cart/cart.router')
const deliveryrouter = require('./modules/delivery/delivery.router')
const app = express()
app.use(express.json())
app.use('/uploadImages', express.static(path.join(__dirname, 'uploadImages')))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadImages')
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '_' + file.originalname)
  }
})

function fileFilter (req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb('sorry invalid ex', false)
  }
}

const upload = multer({ dest: 'uploadImages/', fileFilter, storage })

app.use(upload.single('image'))
const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(router,foodrouter,categoryRouter,orderrouter,cartrouter,deliveryrouter)
connectDB()
let PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Example app listening on port 3000!')
  })
  