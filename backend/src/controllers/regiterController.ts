import { registerService } from '@/service/auth';
import { userValidationSchema } from '@/validators/registerValidator';
import { Request, Response } from 'express';

export async function registerController(req: Request, res: Response) {
  const validation = userValidationSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const { name, email, password, phoneNumber, username } = validation.data;

  const result = await registerService({
    name,
    email,
    password,
    phoneNumber,
    username,
  });

  return res.status(201).json(result);
}
