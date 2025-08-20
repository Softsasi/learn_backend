import PostItem from './_componnets/PostItem';

export type Post = {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string[];
  published: boolean;
  status: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const PostPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`);
  const posts = (await res.json()) as Post[];


  return (
    <div className="flex flex-col gap-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostPage;
