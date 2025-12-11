
import nodemailer from "nodemailer";

export function getTransport() {
    const host = process.env.SMTP_HOST!;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;
    return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

export async function sendPasswordReset(to: string, resetUrl: string) {
    const from = process.env.SMTP_FROM || "no-reply@loka.app";
    const transport = getTransport();
    await transport.sendMail({
        from,
        to,
        subject: "Reset your Loka Technology password",
        html: `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
        <h2 style="color:#2F4F4F;margin-bottom:8px">Reset your password</h2>
        <p>We received a request to reset your password. This link expires in 30 minutes.</p>
        <p><a href="${resetUrl}" style="display:inline-block;background:#1E7D4B;color:#fff;padding:10px 14px;border-radius:10px;text-decoration:none">Reset password</a></p>
        <p>If you didn’t request this, you can ignore this email.</p>
      </div>
    `,
    });
}
