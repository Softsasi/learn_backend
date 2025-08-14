import {
  postCreateController,
  postDeleteController,
  postGetByIdController,
  postGetController,
  postUpdateController,
} from '@/controllers/post';

import { Router } from 'express';

export const postRouter = Router();

postRouter.get('/', postGetController); // public
postRouter.get('/:id', postGetByIdController); // public

// private routes
postRouter.post('/', postCreateController);
postRouter.patch('/:id', postUpdateController);
postRouter.delete('/:id', postDeleteController);
