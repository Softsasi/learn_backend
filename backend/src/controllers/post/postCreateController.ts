import { createPostService } from '@/service/post';
import { postSchema } from '@/validators/post.validator';
import { Request, Response } from 'express';

export const postCreateController = async (req: Request, res: Response) => {
  const validation = postSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid request data',
      issues: validation.error.issues,
    });
  }

  const postData = validation.data;


  const result = await createPostService(postData);
  res.status(201).json({
    message: 'Post created successfully',
    post: result,
  });
};
