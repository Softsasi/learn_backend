import { sendMail } from '@/lib';
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
      await sendMail({
        to: newEmail,
        subject: 'Welcome to Our Service',
        html: `<p>Hi ${name},</p><p>Thank you for registering with us!</p>
    <p>Your account has been created successfully. You can now log in and start using our services.</p>
    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
    <p>Here are your account details:</p>
    <p><strong>Email:</strong> ${newEmail}</p>
    <p><strong>Password:</strong> ${password}</p>

    <p
    ><a href="${process.env.BACKEND_URL}/auth/verify-email?token=${emailVerificationToken}&userId=${user.id}">Verify Email</a></p>

    <p>Please keep your password secure and do not share it with anyone.</p>
        <p>Best regards,</p><p>Your Team</p>
        `,
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
