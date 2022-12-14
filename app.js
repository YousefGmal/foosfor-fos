const express = require('express')
const multer = require('multer')
const path = require('path')
const shortid = require('shortid')
const cors = require('cors')
const connectDB = require('./DB/connectDB')
const passport = require('passport')
const cookieSesion = require('cookie-session')
const session = require('express-session')
const categoryRouter = require('./modules/category/category.router')
const foodrouter = require('./modules/food/food.router')
require('dotenv').config()
const router = require('./modules/user/user.router')
const orderrouter = require('./modules/order/order.router')
const cartrouter = require('./modules/cart/cart.router')
const upcategoryRouter = require('./modules/upCategory/upCategory.router')
const deliveryrouter = require('./modules/delivery/delivery.router')
const offerrouter = require('./modules/offer/offer.router')
const Notificationrouter = require('./modules/notification/notification.router')
const countryrouter = require('./modules/country/country.router')
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
app.use(express.static('public')); 
app.use('/images', express.static('./'));
// app.use(cookieSesion({
//   name:'session',
//   keys:["cyberwolve"],
//   maxAge: 24*60*60*100
// }))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
require('./passportFacebook')(passport)
require('./passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
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


app.use(router,foodrouter,categoryRouter,upcategoryRouter,orderrouter,Notificationrouter,cartrouter,countryrouter,deliveryrouter,offerrouter)
connectDB()
let PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log('Example app listening on port 3000!')
  })
  
const io = require('./services/socket').init(server)

io.on('connection' , (socket)=>{
  console.log(socket.id);
})
