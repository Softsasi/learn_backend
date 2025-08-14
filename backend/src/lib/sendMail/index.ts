import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  type?: 'register' | 'resetPassword' | 'welcome' | 'notification';
}

export const sendMail = async ({
  to,
  subject,
  html,
}: MailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NextRush Mailer" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
};
