import { deletePostService } from '@/service/post/deletPost.service';
import { Request, Response } from 'express';

export const postDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deletePostService(id);

  if (!result) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json({ message: 'Post deleted successfully', post: result });
};
