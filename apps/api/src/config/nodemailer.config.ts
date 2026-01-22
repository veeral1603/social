import nodemailer from "nodemailer";
import "dotenv/config";
const user = process.env["MAIL_USER"];
const pass = process.env["MAIL_PASS"];

if (!user || !pass) {
  throw new Error(
    "Mail user or password is not defined in environment variables",
  );
}

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env["MAIL_USER"],
    pass: process.env["MAIL_PASS"],
  },
});
export default mailer;
