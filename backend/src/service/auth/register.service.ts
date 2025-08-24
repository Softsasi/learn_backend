import { EmailService } from '@/lib';
import { User } from '@/models/user.model';
import { toLowerCase } from '@/utils';
import { generateEmailVerification } from '@/utils/generateToken';
import { hashPassword } from '@/utils/hash';
import { addMinutes } from 'date-fns';
import { findByEmail } from '../user';

export const registerService = async ({
  name,
  email,
  password,
  username,
  phoneNumber,
}) => {
  try {
    const newEmail = toLowerCase(email);

    const existingUser = await findByEmail(newEmail);

    if (existingUser) {
      return {
        message: 'User already exists',
        status: 400,
      };
    }

    const hashedPassword = hashPassword(password);

    if (!hashedPassword) {
      return {
        message: 'Error hashing password',
        status: 500,
      };
    }

    const emailVerificationToken = generateEmailVerification();
    const emailVerificationExpires = addMinutes(new Date(), 30);

    const user = await User.create({
      name,
      email: newEmail,
      password: hashedPassword,
      username,
      phoneNumber,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    try {
      const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email/status?token=${emailVerificationToken}&userId=${user.id}`;

      await EmailService.sendRegistrationEmail({
        name,
        email: newEmail,
        password,
        verifyEmailUrl,
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return {
      message: 'User registered successfully, please verify your email',
      status: 200,
      user: { id: user.id, name: user.name, email: user.email },
    };
  } catch (error) {
    console.error('[registerService] Error:', error);
    return {
      message: 'Internal server error',
      status: 500,
    };
  }
};
