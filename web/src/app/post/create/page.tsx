'use client';

import { api, CreatePostResponse } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const MAX_TITLE = 100;
const MAX_DESCRIPTION = 1000;
const MAX_CONTENT = 50000;

const PostCreatePage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('68aaea612b80ed3d45f2845d');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(false);
  const [status, setStatus] = useState('draft');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const validate = () => {
    if (!title || title.length > MAX_TITLE)
      return `Title is required and must be <= ${MAX_TITLE} chars`;
    if (!description || description.length > MAX_DESCRIPTION)
      return `Description is required and must be <= ${MAX_DESCRIPTION} chars`;
    if (!content || content.length > MAX_CONTENT)
      return `Content is required and must be <= ${MAX_CONTENT} chars`;
    if (!author) return 'Author is required';
    if (!category || category.length < 2 || category.length > 100)
      return 'Category must be between 2 and 100 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setErrors(err);
      return;
    }
    setErrors(null);
    setLoading(true);

    const payload = {
      title,
      description,
      content,
      author,
      tags: tags
        ? tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      published,
      status,
      category,
    };

    try {
      const result = await api.post<CreatePostResponse>('/post', payload);

      if (result.ok) {
        router.push('/post');
      } else {
        setErrors(result.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Create post error', error);
      setErrors('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>

      {errors && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">
          {errors}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={MAX_TITLE}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={MAX_DESCRIPTION}
            rows={3}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX_CONTENT}
            rows={8}
            className="w-full border px-3 py-2 rounded monospace"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <span className="text-sm">Published</span>
            </label>
          </div>
        </div>

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
