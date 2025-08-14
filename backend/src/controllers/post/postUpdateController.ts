import { updatePostService } from '@/service/post';
import { Request, Response } from 'express';

export const postUpdateController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const postBody = req.body;


  const result = await updatePostService(id, postBody);

  res.status(200).json(result);
};
