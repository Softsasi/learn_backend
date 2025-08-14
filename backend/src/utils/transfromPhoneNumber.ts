export function transformPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) throw new Error('Phone number is required');

  let raw = phoneNumber.trim();

  // Remove spaces, dashes, parentheses, dots
  raw = raw.replace(/[\s\-\.\(\)]/g, '');

  // Handle "0044" → "+44"
  if (raw.startsWith('00')) {
    raw = '+' + raw.slice(2);
  }

  // If no country code, assume +1 (or change to your default)
  if (!raw.startsWith('+')) {
    raw = '+1' + raw;
  }

  // Keep only digits after +
  raw = '+' + raw.slice(1).replace(/\D/g, '');

  // Validate E.164 length
  const digitsOnly = raw.slice(1);
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    throw new Error('Invalid phone number length');
  }

  return raw;
}
