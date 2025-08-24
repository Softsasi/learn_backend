import { findByUserId } from '@/service/user';
import { AccountStatus } from '@/types/auth';
import { Request, Response } from 'express';

export const verifyEmailController = async (req: Request, res: Response) => {
  const { token, userId } = req.query;
  if (!token || !userId) {
    return res
      .status(400)
      .json({ errorMsg: 'Token and userId are required', code: 400 });
  }

  // find user
  const user = await findByUserId(userId as string);
  if (!user) {
    return res.status(404).json({ errorMsg: 'User not found', code: 404 });
  }

  // check token expiration
  if (user.emailVerificationExpires! < new Date()) {
    return res.status(400).json({ errorMsg: 'Token expired', code: 400 });
  }

  if (user.emailVerificationToken !== token) {
    return res.status(400).json({ errorMsg: 'Invalid token', code: 400 });
  }

  // update status and emailVerified
  user.emailVerified = true;
  user.accountStatus = AccountStatus.ACTIVE;

  user.emailVerificationToken = '';
  user.emailVerificationExpires = null;

  // save
  await user.save();

  return res.status(200).json({
    successMsg: 'Email verified successfully',
    code: 200,
  });
};
