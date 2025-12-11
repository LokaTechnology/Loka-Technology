
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendPinEmail({ to, pin, lockerId }: {
    to: string; pin: string; lockerId: string;
}) {
    await transporter.sendMail({
        from: `"Loka Lockers" <${process.env.SMTP_USER}>`,
        to,
        subject: "Your locker access PIN",
        html: `<p>PIN for locker <b>${lockerId}</b>: <b>${pin}</b></p>
           <p>Valid 30 min. Enter it on the kiosk or in the app.</p>`,
    });
}