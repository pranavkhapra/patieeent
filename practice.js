const body = require('./Mail.js')

const mail = new body()
var n=10
var i=0
for (i = 0; i < n; i++) {
    var mailOptions = {
        from: 'onlinedctr@gmail.com',
        to: 'Ishangijain@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `this is a mail sent from node.js` + i + " of " + n
    };
    mail.send(mailOptions)
}
