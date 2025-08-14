import {
  findAllUsersService,
  findEmailService,
  findUserByIdService,
  updateProfileService,
} from '@/service/user';
import { Router } from 'express';

const userRouter = Router();

// find routes
userRouter
  .get('/all', findAllUsersService)
  .get('/:id', findUserByIdService)
  .get('/email/:email', findEmailService)
  .patch('/:id', updateProfileService);

export default userRouter;
