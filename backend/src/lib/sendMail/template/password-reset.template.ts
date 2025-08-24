interface PasswordResetTemplateProps {
  name: string;
  email: string;
  resetUrl: string;
  expiresIn: string;
}

export const passwordResetTemplate = ({
  name,
  email,
  resetUrl,
  expiresIn,
}: PasswordResetTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Request</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 10px;
        }
        .title-text {
          font-size: 18px;
          color: #e74c3c;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .reset-button {
          display: inline-block;
          background-color: #e74c3c;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
        }
        .reset-button:hover {
          background-color: #c0392b;
        }
        .warning {
          background-color: #fff3cd;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #ffc107;
          margin: 20px 0;
        }
        .security-notice {
          background-color: #f8d7da;
          color: #721c24;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #dc3545;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #7f8c8d;
        }
        .expiry-info {
          background-color: #e8f4fd;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">NextRush</div>
          <div class="title-text">Password Reset Request</div>
        </div>

        <div class="content">
          <p>Hi <strong>${name}</strong>,</p>

          <p>We received a request to reset your password for your NextRush account.</p>

          <p>If you requested this password reset, please click the button below to set a new password:</p>

          <div style="text-align: center;">
            <a href="${resetUrl}" class="reset-button">Reset Password</a>
          </div>

          <div class="expiry-info">
            <strong>⏰ Important:</strong> This password reset link will expire in <strong>${expiresIn}</strong>. Please use it before it expires.
          </div>

          <div class="security-notice">
            <strong>🔒 Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your account is still secure, and no changes have been made.
          </div>

          <div class="warning">
            <strong>Tips for a secure password:</strong>
            <ul>
              <li>Use at least 8 characters</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Add numbers and special characters</li>
              <li>Avoid using personal information</li>
            </ul>
          </div>
        </div>

        <div class="footer">
          <p>Best regards,<br><strong>The NextRush Team</strong></p>
          <p style="font-size: 12px; margin-top: 20px;">
            This email was sent to ${email}. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
