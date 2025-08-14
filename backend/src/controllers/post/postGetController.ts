import { getPostAllService, getPostById } from '@/service/post';
import { Request, Response } from 'express';

const postGetController = async (req: Request, res: Response) => {
  const result = await getPostAllService();
  res.send(result);
};

const postGetByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getPostById(id);

  if (!result) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json(result);
};

export { postGetByIdController, postGetController };
