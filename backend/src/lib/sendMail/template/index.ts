export { passwordResetTemplate } from './password-reset.template';
export { registrationTemplate } from './registration.template';

// Template types for better type safety
export type EmailTemplateType =
  | 'registration'
  | 'password-reset'
  | 'welcome'
  | 'notification';

// You can add more templates here as needed
// export { welcomeTemplate } from './welcome.template';
// export { notificationTemplate } from './notification.template';
