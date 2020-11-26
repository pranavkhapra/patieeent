
class mail {

    constructor() {
        this.nodemailer = require('nodemailer');
        this.workingId = "onlinedctr@gmail.com"
        this.transporter = this.nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'onlinedctr@gmail.com',
                pass: "ishakira@2"
            }
        });
    }

    send(mailOptions) {
        this.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }
}

module.exports=mail
