'use client';

import { api } from '@/utils/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '../page';

const PostItem = ({ post }: { post: Post }) => {
  const router = useRouter();
  const deleting = false;

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      const result = await api.delete(`/post/${post._id}`);
      if (result.ok) {
        // refresh the server components
        router.refresh();
      } else {
        alert(result.error || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete failed', error);
      alert('Failed to delete post');
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold leading-snug">{post.title}</h3>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              post.published
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {post.published ? 'Published' : post.status || 'Draft'}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="text-xs text-gray-500">
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/post/edit/${post._id}`}
            className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
          >
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
