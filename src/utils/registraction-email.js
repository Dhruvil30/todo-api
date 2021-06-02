const nodemailer = require('nodemailer');
const { checkForDuplicateEmail } = require('../components/user/user.service');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nodemailertest7@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  }
});

const createMailOpions = (data) => {
  const options = {
    to: data.email,
    subject: 'Registration Confirmation from nodemailer',
    text: `Hello ${data.name}\nPlease confirm registration.`,
  };
  return options;
}

const checkIfUserExist = async (email) => {
  const user = await checkForDuplicateEmail(email);
  if (user) throw new Error('DUPLICATE_KEY_ERROR');
}

const sendRegistrationEmail = async (req, res, next) => {
  try {
    const data = req.body;
    await checkIfUserExist(data.email);
    const mailOptions = createMailOpions(data);
    transporter.sendMail(mailOptions);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  sendRegistrationEmail,
}