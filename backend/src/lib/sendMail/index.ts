import nodemailer from 'nodemailer';
import {
  EmailTemplateType,
  passwordResetTemplate,
  registrationTemplate,
} from './template';

interface BaseMailOptions {
  to: string;
  subject: string;
}

interface DirectHtmlMailOptions extends BaseMailOptions {
  html: string;
  template?: never;
  templateData?: never;
}

interface TemplateMailOptions extends BaseMailOptions {
  template: EmailTemplateType;
  templateData: any;
  html?: never;
}

type MailOptions = DirectHtmlMailOptions | TemplateMailOptions;

export const sendMail = async (options: MailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let html: string;

  if (options.template && options.templateData) {
    // Use template
    switch (options.template) {
      case 'registration':
        html = registrationTemplate(options.templateData);
        break;
      case 'password-reset':
        html = passwordResetTemplate(options.templateData);
        break;
      default:
        throw new Error(`Template '${options.template}' not found`);
    }
  } else if (options.html) {
    // Use direct HTML
    html = options.html;
  } else {
    throw new Error(
      'Either template with templateData or html must be provided'
    );
  }

  await transporter.sendMail({
    from: `"NextRush Mailer" <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html,
  });
};
