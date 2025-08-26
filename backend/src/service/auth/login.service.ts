import { User } from '@/models/user.model';
import { AccountStatus } from '@/types/auth';
import { verifyPassword } from '@/utils/hash';
import { createTokens } from '@/utils/jwt-token';
import { findByEmail } from '../user';

type LoginServiceParams = {
  email: string;
  password: string;
  username?: string;
  userAgent?: string;
};

export const loginService = async ({
  email,
  password,
  userAgent,
}: LoginServiceParams) => {
  // find user by email
  const user = await findByEmail(email);
  if (!user) {
    return {
      status: 404,
      error: 'User not found',
    };
  }

  // verify status
  if (user.emailVerified === false) {
    return {
      status: 403,
      error: 'Email not verified',
    };
  }

  // account status check
  if (user.accountStatus === AccountStatus.INACTIVE) {
    return {
      status: 400,
      error: `Your status ${AccountStatus.INACTIVE}!   Please Contact with Admin`,
    };
  }
  if (user.accountStatus === AccountStatus.SUSPENDED) {
    return {
      status: 400,
      error: `Your status ${AccountStatus.SUSPENDED}!   Please Contact with Admin`,
    };
  }
  if (user.accountStatus === AccountStatus.PENDING) {
    return {
      status: 400,
      error: `Your status ${AccountStatus.PENDING}!   verify your email`,
    };
  }

  // verify password
  const isPasswordValid = verifyPassword({
    hash: user.password,
    password,
  });

  if (!isPasswordValid) {
    return {
      status: 401,
      error: 'Invalid password',
    };
  }

  if (userAgent) {
    await User.updateOne({ _id: user._id }, { $addToSet: { userAgent } });
  }

  const { accessToken, refreshToken } = createTokens({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    userName: user.username,
  });

  return {
    status: 200,
    message: 'Login successful',
    accessToken,

    refreshToken,
    user: {
      id: user._id,
      email: user.email,
    },
  };
};
