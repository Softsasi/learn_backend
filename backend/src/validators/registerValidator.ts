import { AccountStatus, UserRole } from '@/types/auth';
import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9._-]{3,35}$/;
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const userValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(35, 'Name must be at most 35 characters long'),

  username: z
    .string()
    .min(3)
    .max(35)
    .regex(usernameRegex, 'Invalid username format'),

  email: z.string().min(5).max(100).regex(emailRegex, 'Invalid email format'),

  password: z
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .max(256, 'Password must be at most 256 characters long'),

  phoneNumber: z.string().min(10).max(30),

  role: z.nativeEnum(UserRole).default(UserRole.USER),

  emailVerified: z.boolean().default(false),

  emailVerificationToken: z.string().nullable().default(null),

  emailVerificationExpires: z.date().nullable().default(null),

  accountStatus: z.nativeEnum(AccountStatus).default(AccountStatus.PENDING),

  createdAt: z.date().default(() => new Date()),

  updatedAt: z.date().default(() => new Date()),

  userAgent: z.string().nullable().optional().default(null),
});
