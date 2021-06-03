const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const JWT_KEY = process.env.JWT_KEY;

const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js')({ apiKey: API_KEY, domain: DOMAIN });

const createMailOpions = (data, url) => {
  const options = {
    from: 'todo-api@zuru.tech',
    to: data.email,
    subject: 'Registration Confirmation from nodemailer',
    text: `Hello ${data.name}\nPlease confirm registration by clicking on below link\n${url}.`,
  };
  return options;
};

const generateUrl = (id) => {
  const token = jwt.sign(id, JWT_KEY);
  const url = `http://localhost:3000/users/verify/${token}`;
  return url;
};

const sendRegistrationEmail = async (data) => {
  try {
    const url = generateUrl(data.id);
    const mailOptions = createMailOpions(data, url);
    await mailgun.messages().send(mailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendRegistrationEmail,
};
