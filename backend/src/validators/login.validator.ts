import * as z from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'must be string' })
    .email('Invalid email format')
    .max(100, 'Email must be at most 100 characters long'),
  password: z
    .string({ message: 'must be string' })
    .min(4, 'Password must be at least 4 characters long')
    .max(100, 'Password must be at most 100 characters long'),
});
