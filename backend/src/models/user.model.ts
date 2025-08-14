import { AccountStatus, UserRole } from '@/types/auth';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 35,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    maxlength: 35,
    minlength: 3,
    unique: true,
    validate: {
      validator: async function (value) {
        const usernameRegex = /^[a-zA-Z0-9._-]{3,35}$/;
        return usernameRegex.test(value);
      },
      message: 'Invalid username format',
    },
  },

  email: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 5,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    validate: {
      validator: async function (value) {
        const emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    maxlength: 256,
    minlength: 4,
  },

  phoneNumber: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 10,
    default: null,
  },

  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  emailVerificationToken: {
    type: String,
    default: null,
  },

  emailVerificationExpires: {
    type: Date as unknown as Date | null,
    default: null,
  },

  accountStatus: {
    type: String,
    enum: Object.values(AccountStatus),
    default: AccountStatus.PENDING,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  userAgent: {
    type: [String],
    required: false,
    default: [],
  },
});

export const User = model('User', userSchema);
