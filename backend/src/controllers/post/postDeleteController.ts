import { deletePostService } from '@/service/post/deletPost.service';
import { Request, Response } from 'express';

export const postDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deletePostService(id);
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }


  if (!result) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json({ message: 'Post deleted successfully', post: result });
};
