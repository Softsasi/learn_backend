import { EmailService } from '@/lib';
import { Request, Response } from 'express';
import { findByEmail } from '../user';

export const passwordResetService = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  console.log(req.body);

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // check email
  const user = await findByEmail(email);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // update user password

  if (!newPassword) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    // this logic must inside the verify-password-reset
    // user.password = newPassword;
    // await user.save();




    //send mail to further verification
    const verifyPasswordUrl = `${process.env.FRONTEND_URL}/verify-passwordReset?token=${user.email}&userId=${user.id}`;

    await EmailService.sendPasswordResetEmail({
      email: user.email,
      name: user.name,
      resetUrl: verifyPasswordUrl,
      expiresIn: '1h',
    });
  } catch (err) {
    console.error('Error sending password reset email:', err);
  }

  res.json({
    message: 'Password reset successful',
    code: 200,
  });
};
