import nodemailer from "nodemailer";

// Uses Gmail SMTP with an App Password (NOT your normal Gmail password).
// Generate one at https://myaccount.google.com/apppasswords once 2-Step
// Verification is enabled on the sending Gmail account, then put it in
// EMAIL_PASS in backend/.env.
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});