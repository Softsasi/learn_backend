import { sendMail } from '../sendMail';

interface RegistrationEmailData {
  name: string;
  email: string;
  password: string;
  verifyEmailUrl: string;
}

interface PasswordResetEmailData {
  name: string;
  email: string;
  resetUrl: string;
  expiresIn: string;
}

export class EmailService {
  /**
   * Send registration confirmation email with email verification link
   */
  static async sendRegistrationEmail(
    data: RegistrationEmailData
  ): Promise<void> {
    try {
      await sendMail({
        to: data.email,
        subject: 'Welcome to NextRush - Please Verify Your Email',
        template: 'registration',
        templateData: data,
      });
    } catch (error) {
      console.error('[EmailService] Registration email failed:', error);
      throw new Error('Failed to send registration email');
    }
  }

  /**
   * Send password reset email with reset link
   */
  static async sendPasswordResetEmail(
    data: PasswordResetEmailData
  ): Promise<void> {
    try {
      await sendMail({
        to: data.email,
        subject: 'NextRush - Password Reset Request',
        template: 'password-reset',
        templateData: data,
      });
    } catch (error) {
      console.error('[EmailService] Password reset email failed:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  /**
   * Send custom email with direct HTML (for special cases)
   */
  static async sendCustomEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    try {
      await sendMail({
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('[EmailService] Custom email failed:', error);
      throw new Error('Failed to send custom email');
    }
  }
}
