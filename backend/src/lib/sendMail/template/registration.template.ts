interface RegistrationTemplateProps {
  name: string;
  email: string;
  password: string;
  verifyEmailUrl: string;
}

export const registrationTemplate = ({
  name,
  email,
  password,
  verifyEmailUrl,
}: RegistrationTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our Service</title>
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
        .welcome-text {
          font-size: 18px;
          color: #3498db;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 30px;
        }
        .account-details {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .account-details h3 {
          color: #2c3e50;
          margin-top: 0;
        }
        .detail-item {
          margin: 10px 0;
        }
        .detail-label {
          font-weight: bold;
          color: #34495e;
        }
        .verify-button {
          display: inline-block;
          background-color: #3498db;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
        }
        .verify-button:hover {
          background-color: #2980b9;
        }
        .warning {
          background-color: #fff3cd;
          color: #856404;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #ffc107;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #7f8c8d;
        }
        .support-info {
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
          <div class="welcome-text">Welcome to Our Service!</div>
        </div>

        <div class="content">
          <p>Hi <strong> ${name} </strong>,</p>

          <p>Thank you for registering with us! We're excited to have you as part of our community.</p>

          <p>Your account has been created successfully. To get started, please verify your email address by clicking the button below:</p>

          <div style="text-align: center;">
            <a href="${verifyEmailUrl}" class="verify-button">Verify Email Address</a>
          </div>

          <div class="account-details">
            <h3>Your Account Details</h3>
            <div class="detail-item">
              <span class="detail-label">Email:</span> ${email}
            </div>
            <div class="detail-item">
              <span class="detail-label">Password:</span> ${password}
            </div>
          </div>

          <div class="warning">
            <strong>Important:</strong> Please keep your password secure and do not share it with anyone. We recommend changing your password after your first login for added security.
          </div>

          <div class="support-info">
            <strong>Need Help?</strong><br>
            If you have any questions or need assistance, feel free to reach out to our support team. We're here to help you get the most out of our services.
          </div>
        </div>

        <div class="footer">
          <p>Best regards,<br><strong>The NextRush Team</strong></p>
          <p style="font-size: 12px; margin-top: 20px;">
            This email was sent to ${email}. If you didn't create an account with us, please ignore this email.
          </p>
        </div>
      </div>
    </body>
    </html>`;
};
