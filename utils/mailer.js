const nodemailer = require("nodemailer")
//transporter for node mailer
const transporterSMTP = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: 587,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS
    }
})
//function for mail sending by declaring options
const send = (to, subject, body) => {
    try {
        const mailOptions = {
            from: '"Tushar"<btushar700@gmail.com>',
            to,
            subject,
            html: body,
            attachments: [{
                filename: 'main1.png',
                path: 'public/asset/main1.png',
                cid: 'main1'
            }]
        }
        //sends mail
        return new Promise((ok, fail) => {
            transporterSMTP.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return fail(error)
                }
                return ok(info)
            })
        })
    } catch (error) {
        console.log("mail error", error)
    }
}

module.exports = send