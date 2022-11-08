const nodemailer = require('nodemailer')

async function sendEmail (dest, message) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    service: 'outlook',
    auth: {
      user: process.env.senderEmail, // generated ethereal user
      pass: process.env.senderPassword // generated ethereal password
    }
  })

  // send mail with defined transport object
  await transporter.sendMail({
    from: `"wellcome to fosfor" <${process.env.senderEmail}>`, // sender address
    to: dest, // list of receivers
    subject: 'confirmationEmail', // Subject line
    text: 'Hello world?', // plain text body
    html: message // html body
  })
}

module.exports = { sendEmail }
