import { loginController } from '@/controllers/loginController';
import { registerController } from '@/controllers/regiterController';
import { verifyEmailController } from '@/controllers/verifyEmailController';
import { passwordResetService } from '@/service/auth';
import { Router } from 'express';

const authRouter = Router();

authRouter.get('/', (_req, res) => {
  res.status(200).json({ message: 'Auth service is running' });
});

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.post('/password-reset', passwordResetService);
authRouter.get('/verify-email', verifyEmailController);


export default authRouter;
