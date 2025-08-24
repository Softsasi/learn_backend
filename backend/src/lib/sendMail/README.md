# Email Template System

A professional email template system for NextRush backend application.

## Overview

This system provides a clean, maintainable way to manage email templates with the following features:

- **Type-safe templates** with TypeScript interfaces
- **Professional HTML designs** with responsive styling
- **Template inheritance** and reusable components
- **Easy to extend** for new email types
- **Separation of concerns** between email content and business logic

## Structure

```
src/lib/sendMail/
├── index.ts                    # Main sendMail function with template support
├── email.service.ts           # High-level email service class
└── template/
    ├── index.ts              # Template exports
    ├── registration.template.ts    # User registration email
    └── password-reset.template.ts  # Password reset email
```

## Usage Examples

### 1. Using EmailService (Recommended)

```typescript
import { EmailService } from '@/lib';

// Send registration email
await EmailService.sendRegistrationEmail({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'tempPassword123',
  verifyEmailUrl: 'https://app.com/verify?token=abc123',
});

// Send password reset email
await EmailService.sendPasswordResetEmail({
  name: 'John Doe',
  email: 'john@example.com',
  resetUrl: 'https://app.com/reset?token=xyz789',
  expiresIn: '30 minutes',
});
```

### 2. Using sendMail directly with templates

```typescript
import { sendMail } from '@/lib';

await sendMail({
  to: 'user@example.com',
  subject: 'Welcome to NextRush',
  template: 'registration',
  templateData: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'tempPassword123',
    verifyEmailUrl: 'https://app.com/verify?token=abc123',
  },
});
```

### 3. Using sendMail with custom HTML

```typescript
import { sendMail } from '@/lib';

await sendMail({
  to: 'user@example.com',
  subject: 'Custom Email',
  html: '<h1>Custom HTML content</h1>',
});
```

## Available Templates

### Registration Template

- **Template ID**: `'registration'`
- **Purpose**: Welcome new users and provide email verification
- **Data Required**:
  ```typescript
  {
    name: string;
    email: string;
    password: string;
    verifyEmailUrl: string;
  }
  ```

### Password Reset Template

- **Template ID**: `'password-reset'`
- **Purpose**: Help users reset their passwords securely
- **Data Required**:
  ```typescript
  {
    name: string;
    email: string;
    resetUrl: string;
    expiresIn: string;
  }
  ```

## Adding New Templates

### 1. Create Template File

Create a new file in `src/lib/sendMail/template/`:

```typescript
// welcome.template.ts
interface WelcomeTemplateProps {
  name: string;
  companyName: string;
}

export const welcomeTemplate = ({
  name,
  companyName,
}: WelcomeTemplateProps): string => {
  return \`
    <!DOCTYPE html>
    <html>
      <!-- Your HTML template here -->
    </html>
  \`;
};
```

### 2. Update Template Index

Add export to `src/lib/sendMail/template/index.ts`:

```typescript
export { welcomeTemplate } from './welcome.template';

export type EmailTemplateType = 'registration' | 'password-reset' | 'welcome';
```

### 3. Update sendMail Function

Add new case to `src/lib/sendMail/index.ts`:

```typescript
switch (options.template) {
  case 'registration':
    html = registrationTemplate(options.templateData);
    break;
  case 'password-reset':
    html = passwordResetTemplate(options.templateData);
    break;
  case 'welcome':
    html = welcomeTemplate(options.templateData);
    break;
  // ...
}
```

### 4. Add EmailService Method (Optional)

Add convenience method to `src/lib/sendMail/email.service.ts`:

```typescript
static async sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
  try {
    await sendMail({
      to: data.email,
      subject: 'Welcome to NextRush!',
      template: 'welcome',
      templateData: data,
    });
  } catch (error) {
    console.error('[EmailService] Welcome email failed:', error);
    throw new Error('Failed to send welcome email');
  }
}
```

## Template Design Guidelines

### 1. Responsive Design

- Use max-width: 600px for email container
- Include viewport meta tag
- Use table-based layouts for better email client support

### 2. Styling

- Use inline styles or `<style>` tags in head
- Avoid external CSS files
- Test across different email clients

### 3. Accessibility

- Use semantic HTML elements
- Include alt text for images
- Ensure good color contrast

### 4. Professional Appearance

- Consistent branding (colors, fonts, logos)
- Clear call-to-action buttons
- Proper spacing and typography
- Mobile-friendly design

## Environment Variables

Ensure these environment variables are set:

```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
BACKEND_URL=https://your-backend-url.com
```

## Error Handling

The system includes comprehensive error handling:

- **Template not found**: Throws error with specific template name
- **SMTP failures**: Logs error and throws with user-friendly message
- **Missing data**: TypeScript ensures required template data is provided

## Best Practices

1. **Use EmailService methods** for common email types
2. **Keep templates focused** - one template per email purpose
3. **Test thoroughly** across different email clients
4. **Use meaningful subjects** that clearly indicate email purpose
5. **Include unsubscribe links** for marketing emails
6. **Validate email addresses** before sending
7. **Log email failures** for debugging and monitoring

## Migration from Old System

The old hardcoded HTML in services has been replaced with this template system. Benefits include:

- ✅ **Better maintainability** - templates are separate from business logic
- ✅ **Reusability** - templates can be used across different services
- ✅ **Consistency** - unified styling and branding
- ✅ **Type safety** - TypeScript interfaces prevent data errors
- ✅ **Extensibility** - easy to add new templates
- ✅ **Professional appearance** - responsive, well-designed emails
