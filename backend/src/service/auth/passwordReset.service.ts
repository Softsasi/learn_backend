import { Request, Response } from 'express';
import { findByEmail } from '../user';

export const passwordResetService = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // check email
  const user = await findByEmail(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // update user password

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  user.password = password;

  await user.save();

  res.json({
    message: 'Password reset successful',
  });
};
