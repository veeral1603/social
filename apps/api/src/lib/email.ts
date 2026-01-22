import mailer from "../config/nodemailer.config";

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env["APP_URL"]}/verify?token=${token}`;
  const subject = "Verify your email address";
  const from = process.env["MAIL_FROM"];
  const html = `<p>Please verify your email address by clicking the link below:</p>
    <a href="${verificationLink}">${verificationLink}</a>
    <p>If you did not request this, please ignore this email.</p>`;

  await mailer.sendMail({
    to: email,
    from,
    subject,
    html,
  });
};
