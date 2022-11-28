const { auth } = require('../../middleware/auth')
const { handelValidation } = require('../../middleware/handelValidation')
const { signup,  signin, profile, loginWithGoogle, blockUser, getusers } = require('./controller/user')
const { signUpValidator } = require('./user.validation')

const router = require('express').Router()
// sign up
router.post('/user/signup', signUpValidator, handelValidation(), signup)
// google login
router.post("/user/googleLogin" , loginWithGoogle)
// Email confirmation
// router.get('/user/confirm/:token', confirmEmail)
// sign in
// eslint-disable-next-line no-sequences
router.post('/user/signin', signUpValidator[1, 2], handelValidation(), signin)
router.get('/user/profile', auth, profile)

router.get('/getusers',  getusers)

router.post('/user/block/:Uid', blockUser)

// router.get('/', (req, res) => {res.status(200).json({ message: 'done' })})

module.exports = router
