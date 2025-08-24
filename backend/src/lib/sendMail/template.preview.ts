import { passwordResetTemplate, registrationTemplate } from './template';

/**
 * Utility for previewing email templates during development
 * Run this file to generate HTML previews of your email templates
 */

const previewTemplates = () => {
  // Sample data for registration template
  const registrationData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'TempPassword123!',
    verifyEmailUrl:
      'https://yourapp.com/auth/verify-email?token=sample-token&userId=12345',
  };

  // Sample data for password reset template
  const passwordResetData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    resetUrl:
      'https://yourapp.com/auth/reset-password?token=sample-reset-token',
    expiresIn: '30 minutes',
  };

  // Generate HTML for templates
  const registrationHtml = registrationTemplate(registrationData);
  const passwordResetHtml = passwordResetTemplate(passwordResetData);

  console.log('=== REGISTRATION EMAIL PREVIEW ===');
  console.log(registrationHtml);
  console.log('\n=== PASSWORD RESET EMAIL PREVIEW ===');
  console.log(passwordResetHtml);

  // You can also write these to files for browser preview
  // fs.writeFileSync('preview-registration.html', registrationHtml);
  // fs.writeFileSync('preview-password-reset.html', passwordResetHtml);
};

// Export for use in other files or run directly
export { previewTemplates };

// Uncomment to run when file is executed directly
// if (require.main === module) {
//   previewTemplates();
// }
