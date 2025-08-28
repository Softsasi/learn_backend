'use server';

import { appConfig } from '@/config/appConfig';
import { cookies } from 'next/headers';
import Link from 'next/link';
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

const PostPageSSR = async () => {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    // Get cookies from the incoming request
    const cookieStore = await cookies();

    // Forward cookies to the backend API
    const cookieHeader = cookieStore.toString();

    console.log('🍪 SSR: Forwarding cookies:', cookieHeader);

    const res = await fetch(`${appConfig.backend_Url}/post`, {
      cache: 'no-store',
      credentials: 'include',
      headers: {
        Cookie: cookieHeader, // Forward the cookies!
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      posts = (await res.json()) as Post[];
    } else {
      console.error('Failed to fetch posts:', res.status, res.statusText);
      error = 'Failed to load posts';
    }
  } catch (err) {
    console.error('Failed to load posts', err);
    error = 'Failed to load posts';
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-red-600">{error}</div>
        <div className="mt-4">
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Please login to continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Posts (SSR)</h1>
          <p className="text-sm text-gray-500">
            Server-side rendered posts with cookie forwarding
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

export default PostPageSSR;
