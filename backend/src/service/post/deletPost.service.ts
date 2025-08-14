import Post from '@/models/post.model';

export const deletePostService = async (id: string) => {
  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};
