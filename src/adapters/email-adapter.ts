import nodemailer from "nodemailer";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string) {
        let transport = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: "skhazhi@internet.ru",
                pass: process.env.MAIL_RU_PASS// Пароль приложения
            },
            tls: {
                rejectUnauthorized: false,
            },
        })

        let info = await transport.sendMail({
            from: "Haji <skhazhi@internet.ru>",
            to: email,
            subject: subject,
            html: message,
        })
        return info
    },
}