// const nodemailer = require("nodemailer");

  // create reusable transporter object using the default SMTP transport
//    let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port:587,
//     secure: false,
//     auth: {
//            user: '****@****.****',
//            pass: '*******'
//        }
//    });

//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: '"TechDev" <madcodein@gmail.com>', // sender address
//     to: `${email}`, // list of receivers
//     subject: 'Email Verification Request', // Subject line
//     text: 'Hello world?', // plain text body
//     html: message // html body
// };

// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message sent: %s', info.messageId);   
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     return res.render('pages/signup', {
//         alertTitle: "Signup SUccessful",
//         alertMessage: `Verify your email`,
//         alertType: "success",
//     });