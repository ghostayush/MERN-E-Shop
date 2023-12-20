const nodeMailer = require("nodemailer");
require("dotenv").config({path:"backend/.env"});

const sendEmail = async (options) => {
  let transporter = nodeMailer.createTransport({

    service:process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

let info = await transporter.sendMail({
    from:  process.env.SMPT_MAIL,
    to:options.email,
    subject:options.subject ,
    html:options.message,
})
console.log(info);
return info;
};

module.exports = sendEmail;