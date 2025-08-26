import { loginService } from '@/service/auth';
import { loginSchema } from '@/validators/login.validator';
import { Request, Response } from 'express';

export const loginController = async (req: Request, res: Response) => {
  const userAgent = req.headers['user-agent'];

  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const result = await loginService({
    email: validation.data.email,
    password: validation.data.password,
    userAgent,
  });

  //send cookie with access token
  console.log('🍪 Setting cookies...');
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    // Don't set domain for localhost - let browser handle it
    path: '/',
    maxAge: 15 * 60 * 1000, //15 minutes
  });
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    // Don't set domain for localhost - let browser handle it
    path: '/',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
  console.log('✅ Cookies set successfully');

  return res.status(200).json(result);
};
