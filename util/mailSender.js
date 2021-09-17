import nodemailer from 'nodemailer';

export default async function sendEmail(from, to, replyTo, subject, text, html) {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: 'login',
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        // send mail with defined transport object
        let mail = await transporter.sendMail({
            from,
            to,
            replyTo,
            subject,
            text,
            html
        });
        await transporter.close()
        return true
    } catch (error) {
        return error
    }
}