const express = require('express')
const connectDB = require('./DB/connectDB')
const categoryRouter = require('./modules/category/category.router')
const foodrouter = require('./modules/food/food.router')
require('dotenv').config()
const router = require('./modules/user/user.router')
const app = express()
app.use(express.json())
app.use(router,foodrouter,categoryRouter)
connectDB()
let PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Example app listening on port 3000!')
  })
  