import Post from '@/models/post.model';

export const createPostService = async (postData: any) => {
  const newPost = new Post(postData);

  return newPost.save();
};
