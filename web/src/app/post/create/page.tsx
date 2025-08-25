'use client';

import { useAuthInfo } from '@/provider/AuthProvider';
import { api, CreatePostResponse } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const MAX_TITLE = 100;
const MAX_DESCRIPTION = 1000;
const MAX_CONTENT = 50000;

type FormValues = {
  title: string;
  description: string;
  content: string;
  author: string;
  tags: string;
  published: boolean;
  status: 'draft' | 'published' | 'archived';
  category: string;
};

type User = {
  id: string;
  email: string;
  role: string;
  userName: string;
  exp: number;
};

const PostCreatePage = () => {
  const router = useRouter();
  const [errorsApi, setErrorsApi] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | User>(null);

  // todo - fix bug in user info
  const userInfo = useAuthInfo();

  if (!userInfo) {
    return <p>Loading user...</p>;
  }

  console.log('User Info:', userInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      author: '',
      tags: '',
      published: false,
      status: 'draft',
      category: '',
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({ author: userInfo.id });
    }
  }, [userInfo, reset]);

  const onSubmit = async (data: FormValues) => {
    setErrorsApi(null);
    setLoading(true);

    const payload = {
      ...data,
      tags: data.tags
        ? data.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    try {
      const result = await api.post<CreatePostResponse>('/post', payload);
      if (result.ok) {
        router.push('/post');
      } else {
        setErrorsApi(result.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Create post error', error);
      setErrorsApi('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      {errorsApi && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
          {errorsApi}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: MAX_TITLE,
                message: `Max length is ${MAX_TITLE}`,
              },
            })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description', {
              required: 'Description is required',
              maxLength: {
                value: MAX_DESCRIPTION,
                message: `Max length is ${MAX_DESCRIPTION}`,
              },
            })}
            rows={3}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            {...register('content', {
              required: 'Content is required',
              maxLength: {
                value: MAX_CONTENT,
                message: `Max length is ${MAX_CONTENT}`,
              },
            })}
            rows={8}
            className="w-full border px-3 py-2 rounded font-mono"
          />
          {errors.content && (
            <p className="text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* Author & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              {...register('author', { required: 'Author is required' })}
              className="w-full border px-3 py-2 rounded bg-gray-200"
              disabled
            />
            {errors.author && (
              <p className="text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              {...register('category', {
                required: 'Category is required',
                minLength: {
                  value: 2,
                  message: 'Min length is 2',
                },
                maxLength: {
                  value: 100,
                  message: 'Max length is 100',
                },
              })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Tags / Status / Published */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              {...register('tags')}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              {...register('status')}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('published')} />
              <span className="text-sm">Published</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/post')}
            className="text-sm text-gray-600 px-3 py-2 rounded border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreatePage;
