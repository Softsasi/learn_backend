import { findByUserId } from '@/service/user';
import { AccountStatus } from '@/types/auth';
import { Request, Response } from 'express';

export const verifyEmailController = async (req: Request, res: Response) => {
  const { token, userId } = req.query;
  if (!token || !userId) {
    return res.status(400).json({ error: 'Token and userId are required' });
  }

  // find user
  const user = await findByUserId(userId as string);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // check token expiration
  if (user.emailVerificationExpires! < new Date()) {
    return res.status(400).json({ error: 'Token expired' });
  }

  if (user.emailVerificationToken !== token) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  // update status and emailVerified
  user.emailVerified = true;
  user.accountStatus = AccountStatus.ACTIVE;

  user.emailVerificationToken = '';
  user.emailVerificationExpires = null;

  // save
  await user.save();

  return res.status(200).json({
    message: 'Email verified successfully',
  });
};
