const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });
const { checkForDuplicateEmail } = require('../components/user/user.service');

const createMailOpions = (data) => {
  const options = {
    from: 'todo-api@zuru.tech',
    to: data.email,
    subject: 'Registration Confirmation from nodemailer',
    text: `Hello ${data.name}\nPlease confirm registration.`,
  };
  return options;
};

const checkIfUserExist = async (email) => {
  const user = await checkForDuplicateEmail(email);
  if (user) throw new Error('DUPLICATE_KEY_ERROR');
};

const sendRegistrationEmail = async (req, res, next) => {
  try {
    const data = req.body;
    await checkIfUserExist(data.email);
    const mailOptions = createMailOpions(data);
    await mailgun.messages().send(mailOptions);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendRegistrationEmail,
};
