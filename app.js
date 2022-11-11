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
const offerrouter = require('./modules/offer/offer.router')
const app = express()
const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use(cors({
//   origin: ['http://localhost:3000'],
  
//   credentials: true,
// }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
  });
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


app.use(router,foodrouter,categoryRouter,orderrouter,cartrouter,deliveryrouter,offerrouter)
connectDB()
let PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Example app listening on port 3000!')
  })
  