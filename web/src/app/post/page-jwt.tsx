import { appConfig } from '@/config/appConfig';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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

const PostPageJWT = async () => {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    // Get the access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
      // Redirect to login if no token
      redirect('/login');
    }

    console.log('🔑 SSR: Using JWT token');

    const res = await fetch(`${appConfig.backend_Url}/post`, {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`, // JWT in header
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      posts = (await res.json()) as Post[];
    } else if (res.status === 401) {
      // Token expired or invalid
      redirect('/login');
    } else {
      error = 'Failed to load posts';
    }
  } catch (err) {
    console.error('Failed to load posts', err);
    error = 'Failed to load posts';
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Posts (JWT SSR)</h1>
          <p className="text-sm text-gray-500">
            Server-side rendered with JWT authorization
          </p>
        </div>

        <div>
          <Link
            href="/post/create"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            Create Post
          </Link>
        </div>
      </header>

      <main>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-600">No posts available yet.</p>
            <Link
              href="/post/create"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create your first post
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default PostPageJWT;
