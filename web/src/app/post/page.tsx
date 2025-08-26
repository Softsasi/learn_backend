'use client';

import { appConfig } from '@/config/appConfig';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${appConfig.backend_Url}/post`, {
          cache: 'no-store',
          credentials: 'include',
        });

        if (res.ok) {
          const data = (await res.json()) as Post[];
          setPosts(data);
        } else {
          setError('Failed to load posts');
        }
      } catch (err) {
        console.error('Failed to load posts', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-gray-600">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="text-sm text-gray-500">
            Manage your posts — create, edit, and remove content.
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

export default PostPage;
