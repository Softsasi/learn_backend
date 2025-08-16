import {
  postCreateController,
  postDeleteController,
  postGetByIdController,
  postGetController,
  postUpdateController,
} from '@/controllers/post';
import { authMiddleware } from '@/middlewares/authMiddleware';

import { Router } from 'express';

export const postRouter = Router();

postRouter.get('/', postGetController); // public
postRouter.get('/:id', postGetByIdController); // public

// private routes
postRouter.post('/', authMiddleware, postCreateController);
postRouter.patch('/:id', authMiddleware, postUpdateController);
postRouter.delete('/:id', authMiddleware, postDeleteController);
