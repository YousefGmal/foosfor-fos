const UserModel = require('../../../DB/model/User')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const clint = new OAuth2Client(process.env.GOOGLECLINTID);
// const { sendEmail } = require('../../../commen/email')
const wbm = require('wbm');
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body
    const user = await UserModel.findOne({ email: email })

    if (user) {
      res.status(400).json({ message: 'email exist' })
    } else {
      const newUser = new UserModel({ userName, email, password })
      const savedUser = await newUser.save()
      const token = jwt.sign({ id: savedUser._id }, process.env.secretKey)
      const message = `<a href="${req.protocol}://${req.headers.host}/user/confirm/${token}">click me</a>`
      // const message = "sign up is finished"
      await sendEmail(email, message)
      res.status(200).json({ message: 'done' })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const loginWithGoogle = async(req, res) => {

  const {access_token} = req.query
  const { name, photoUrl, email, id_token } = req.body
  const idToken = id_token;
  clint.verifyIdToken({ idToken, audience: process.env.GOOGLECLINTID }).then(async () => {
    // console.log(response);
    // const { email_verified, email } = response.payload;


    if (email) {

      const user = await UserModel.findOne({ email });

      if (user) {
        //user already exist just login
        const token = jwt.sign({ id: user._id, isLoggedIn: true }, process.env.secretKey);
        res.status(200).json({ message: "Done already exist and login", token, status: 200 });
      } else {
        const newUser = await UserModel.insertMany({ userName: name,  email, confirmed: true, profilePic: photoUrl });
        const token = jwt.sign({ id: newUser._id, isLoggedIn: true }, process.env.secretKey);
        res.status(201).json({ message: "Done signup then login", token, status: 201 });

      }


    } else {
      res.status(400).json({ message: "in-valid google account" });
    }


  })


}

const phonevefy = async (req,res) => {
  const {phoneNumber} = req.body



wbm.start().then(async () => {
    const phones = [phoneNumber];
    const message = 'Good Morning.';
    await wbm.send(phones, message);
    await wbm.end();
}).catch(err => console.log(err));
}

// const confirmEmail = async (req, res) => {
//   try {
//     const { token } = req.params

//     if (!token || token === undefined || token == null) {
//       res.status(400).json({ message: 'token error' })
//     } else {
//       const decoded = jwt.verify(token, process.env.secretKey)
//       const user = await UserModel.findOneAndUpdate({ _id: decoded.id, confirmed: false }, { confirmed: true }, { new: true })
//       if (user) {
//         res.status(200).json({ message: 'please login' })
//       } else {
//         res.status(400).json({ message: 'in valid link' })
//       }
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'catch error', error })
//   }
// }

const signin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email : email }).lean()

    if (!user) {
      res.status(400).json({ message: 'check email or password' })
    } else {
      if (user.block) {
        res.status(400).json({ message: 'user is blocked' })
        
      } else {
        if(!user.confirmed){
          res.status(400).json({ message: 'in-valid user' })
        }else{
        const match = await bcrypt.compare(password, user.password)

        if (match) {
          const token = jwt.sign({ id: user._id, islogged: true, role: user.role }, process.env.secretKey)
          console.log(token)
          res.status(200).json({ message: 'Done', token })
        } else {
          res.status(400).json({ message: 'check email or password' })
        }}
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const profile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id }).select('-password')

    if (!user) {
      res.status(400).json({ message: 'in-valid user' })
    } else {
      res.status(200).json({ message: 'Done', user })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const getusers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password')
  
    
      res.status(200).json({ message: 'Done', users })
    
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const editprofile = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id }).select('-password')

    if (!user) {
      res.status(400).json({ message: 'in-valid user' })
    } else {
      res.status(200).json({ message: 'Done', user })
    }
  } catch (error) {
    res.status(500).json({ message: 'catch error', error })
  }
}

const blockUser = async (req, res) => {
  //try {
    const {Uid} = req.params
    const {block} = req.body
    const user = await UserModel.findOneAndUpdate({ _id: Uid },{block: block},{new: true})

    if (!user) {
      res.status(400).json({ message: 'in-valid user' })
    } else {
      res.status(200).json({ message: 'Done', user })
    }
  // } catch (error) {
  //   res.status(500).json({ message: 'catch error', error })
  // }
}


module.exports = { signup, signin, profile, loginWithGoogle, blockUser, getusers, phonevefy }
