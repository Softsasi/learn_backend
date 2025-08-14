import Post from '@/models/post.model';
import { PostUpdate } from '@/validators/post.validator';

export const updatePostService = async (
  id: string,
  postBody: Partial<PostUpdate>
) => {
  const updatedPost = await Post.findByIdAndUpdate(id, postBody, { new: true });
  return updatedPost;
};
