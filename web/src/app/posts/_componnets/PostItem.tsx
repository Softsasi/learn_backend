'use client';

import { Post } from '../page';

const PostItem = ({ post }: { post: Post }) => {
  
  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.description}</p>
    </div>
  );
};

export default PostItem;
