import Post from '@/models/post.model';

export const getPostAllService = () => {
  return Post.find();
};

export const getPostById = (id: string) => {
  return Post.findById(id).populate('author');
};
