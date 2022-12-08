const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
//const UserModl = require('../models/user')
//const { google } = require('./config')
const UserModel = require('./DB/model/User')
const jwt = require('jsonwebtoken')
module.exports = function(passport) {
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLECLINTID,
    clientSecret: process.env.GoogleSecretID,
    callbackURL: "http://localhost:3000/auth/google/callback"
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
    const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.secretKey);
    done(null, token)
})

passport.deserializeUser((email, done) =>{
    UserModel.findOne({email:email}).then((user) =>{
        const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.secretKey);
        done(null, token)})
    })

}