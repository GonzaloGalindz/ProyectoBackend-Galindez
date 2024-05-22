import nodemailer from nodemailer
import config from "./config.js"

export const transporter = nodemailer.createTransporte({
    service: "gmail",
    port: 587,
    auth:{
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
})