import mailer from "../config/nodemailer.config";

export const sendVerificationEmail = async (email: string, otp: string) => {
  const subject = "Verify your email address";
  const from = process.env["MAIL_FROM"];
  const html = `<p>Your verification code is: ${otp}</p>
   
    <p>If you did not request this, please ignore this email.</p>`;

  await mailer.sendMail({
    to: email,
    from,
    subject,
    html,
  });
};
