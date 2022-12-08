const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
//const UserModl = require('../models/user')
//const { google } = require('./config')
const UserModel = require('./DB/model/User')
module.exports = function(passport) {
passport.use(new FacebookStrategy({
    clientID: process.env.FacebookClientId,
    clientSecret: process.env.FacebookSecretId,
    callbackURL: "http://localhost:3000//auth/facebook/callback"
},async (accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    
  // check first if user already exists in our DB.
   const userFinder =  await UserModel.findOne({email: profile._json.email})
        if (userFinder) {
            done(null, userFinder)
        } else {
            const user =  await UserModel.insertMany({ userName: profile._json.name,  email:profile._json.email,firstName: profile._json.given_name,lastName: profile._json.family_name , confirmed: true, profilePic: profile._json.picture }).then(() => console.log("user saved to DB."))
            done(null, user)
        }
    })
)

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser((id, done) =>{
    UserModel.findById(id).then((user) =>{
        done(null, user)})
    })

}