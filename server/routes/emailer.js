const nodemailer = require('nodemailer');
const password = process.env.EMAILER_PASSWORD;

module.exports.sendEmail = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hobsonwebsolutions@gmail.com',
            pass: password
        }
    });

    const html = `
        <h3>New mailing list member:</h3>
        <p>Name: ${name}</p>
        <p>Email Address: ${email}</p>
    `;

    const mailOptions = {
        from: 'hobsonwebsolutions@gmail.com', // sender address
        to: 'cameron@pitching-theory.com', // list of receivers
        subject: `New Mailing List Member: ${name}`,
        html: html //can be text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
    res.send('Success');
}