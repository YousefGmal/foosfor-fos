const mongoose = require('mongoose')

const connectDB = async () => {
    const mongooseDb = await mongoose.connect(process.env.atlasconnectionString, { useNewUrlParser: true }).then((result) => {
      console.log('connected....')
    }).catch((_error) => { console.log('error') })
  
    return mongooseDb
  }
  
  module.exports = connectDB