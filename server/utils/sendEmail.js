const nodemailer = require('nodemailer')
const res = require("express/lib/response");

const sendEmail = async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "wibudev01@gmail.com",
                pass: "hwvxmsnlexgeicvw"
            }
        })

        await transporter.sendMail({
            from: "wibudev01@gmail.com",
            to: email,
            subject: subject,
            // text: text,
            html: text
        })
        return console.log("da gui thanh cong")
    } catch (e) {
        console.log(e)
    }
}

module.exports = sendEmail