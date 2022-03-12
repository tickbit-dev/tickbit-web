// with thanks to https://github.com/Urigo/graphql-modules/blob/8cb2fd7d9938a856f83e4eee2081384533771904/website/lambda/contact.js
const process = require('process')
const { promisify } = require('util')
const nodemailer = require("nodemailer");

const sendMailLib = require('sendmail')

const { validateEmail, validateLength } = require('./validations')

//const sendMail = promisify(sendMailLib())

const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 50
const DETAILS_MIN_LENGTH = 10
const DETAILS_MAX_LENGTH = 1e3

async function sendMail(descriptor) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.dondominio.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.USER_SMTP, // generated ethereal user
      pass: process.env.PASS_SMTP, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(descriptor);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const handler = async (event) => {
  if (!process.env.USER_SMTP) {
    return {
      statusCode: 500,
      body: 'process.env.USER_SMTP must be defined',
      headers: {"Access-Control-Allow-Origin": "*"}
    }
  }

  if (!process.env.PASS_SMTP) {
    return {
      statusCode: 500,
      body: 'process.env.PASS_SMTP must be defined',
      headers: {"Access-Control-Allow-Origin": "*"}
    }
  }

  if (!process.env.FORM_MAIL) {
    return {
      statusCode: 500,
      body: 'process.env.FORM_MAIL must be defined',
      headers: {"Access-Control-Allow-Origin": "*"}
    }
  }

  console.log(event.body)

  var body = JSON.parse(event.body)

  /*try {
    validateLength('body.name', body.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH)
  } catch (error) {
    return {
      statusCode: 403,
      body: error.message,
    }
  }

  try {
    validateEmail('body.email', body.email)
  } catch (error) {
    return {
      statusCode: 403,
      body: error.message,
    }
  }

  try {
    validateLength('body.details', body.details, DETAILS_MIN_LENGTH, DETAILS_MAX_LENGTH)
  } catch (error) {
    return {
      statusCode: 403,
      body: error.message,
    }
  }*/

  /*const descriptor = {
    from: `"${body.email}" <no-reply@gql-modules.com>`,
    to: process.env.CONTACT_EMAIL,
    subject: `${body.name} sent you a message from gql-modules.com`,
    text: body.details,
  }*/

  const descriptor = {
    from: '"' + body.name + '" <' + process.env.USER_SMTP + '>', // sender address
    to: process.env.FORM_MAIL, // list of receivers
    subject: "✉️ [FORM] " + body.subject, // Subject line
    replyTo: '"' + body.name + '" <' + body.email + '>',
    //text: body.message + "\n", // plain text body
    html: "<b>De:</b> " + body.name + " &#60;" + body.email + "&#62; &#40;" + body.phone + "&#41; " + /*"<br><b>Para:</b> " + process.env.FORM_MAIL + */"<br><hr><br>" + body.message.replace(/\n/g, "<br />") + "<br><br>", // html body
  }

  try {
    await sendMail(descriptor)
    return { statusCode: 200, body: 'Success!', headers: {"Access-Control-Allow-Origin": "*"} }
  } catch (error) {
    console.log(error.message)
    return { statusCode: 500, body: error.message, headers: {"Access-Control-Allow-Origin": "*"} }
  }
}

module.exports = { handler }
