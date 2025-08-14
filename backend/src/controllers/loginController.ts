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

  return res.status(200).json(result);
};
