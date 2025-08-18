import {
  postCreateController,
  postDeleteController,
  postGetByIdController,
  postGetController,
  postUpdateController,
} from '@/controllers/post';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { isAdmin } from '@/middlewares/isAdmin';

import { Router } from 'express';

export const postRouter = Router();

postRouter.get('/', authMiddleware,postGetController); // public
postRouter.get('/:id', postGetByIdController); // public

// private routes
postRouter.post('/', authMiddleware,isAdmin, postCreateController);
postRouter.patch('/:id', authMiddleware,isAdmin, postUpdateController);
postRouter.delete('/:id', authMiddleware, isAdmin, postDeleteController);
