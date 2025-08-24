# API Utility Usage Guide

The `@/utils/api` module provides a reusable, authenticated API client that automatically includes the `accessToken` cookie with requests.

## Key Features

- **Automatic Authentication**: Includes `accessToken` cookie with all requests
- **Type Safety**: Full TypeScript support with generic types
- **Error Handling**: Consistent error handling across all requests
- **Convenience Methods**: Pre-configured HTTP verbs (GET, POST, PUT, DELETE, PATCH)

## Usage Examples

### Basic Usage

```typescript
import { api } from '@/utils/api';

// GET request
const result = await api.get<PostResponse[]>('/posts');
if (result.ok) {
  console.log(result.data); // Typed as PostResponse[]
} else {
  console.error(result.error);
}

// POST request
const createResult = await api.post<CreatePostResponse>('/post', {
  title: 'My Post',
  description: 'Post description',
  // ... other fields
});

// DELETE request
const deleteResult = await api.delete(`/post/${postId}`);

// PUT request for updates
const updateResult = await api.put(`/post/${postId}`, updatedData);
```

### Advanced Usage

```typescript
import { apiRequest } from '@/utils/api';

// Custom request with specific options
const result = await apiRequest('/posts', {
  method: 'GET',
  requireAuth: false, // Skip authentication for public endpoints
  headers: {
    'Custom-Header': 'value',
  },
});

// File upload (form data)
const formData = new FormData();
formData.append('file', file);

const uploadResult = await apiRequest('/upload', {
  method: 'POST',
  body: formData,
  headers: {}, // Don't set Content-Type for FormData
});
```

### Error Handling

```typescript
const result = await api.post('/post', postData);

if (result.ok) {
  // Success
  console.log('Post created:', result.data);
} else {
  // Handle errors
  if (result.status === 401) {
    // Redirect to login
    router.push('/login');
  } else if (result.status === 400) {
    // Validation errors
    console.error('Validation failed:', result.error);
  } else {
    // Other errors
    console.error('Request failed:', result.error);
  }
}
```

### React Component Example

```typescript
'use client';

import { useState } from 'react';
import { api, PostResponse } from '@/utils/api';

const PostList = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    setError(null);

    const result = await api.get<PostResponse[]>('/posts');

    if (result.ok) {
      setPosts(result.data || []);
    } else {
      setError(result.error || 'Failed to load posts');
    }

    setLoading(false);
  };

  const deletePost = async (id: string) => {
    const result = await api.delete(`/post/${id}`);

    if (result.ok) {
      setPosts(posts.filter((p) => p._id !== id));
    } else {
      alert(result.error || 'Failed to delete post');
    }
  };

  // ... rest of component
};
```

## Authentication

The API utility automatically includes the `accessToken` cookie with all requests by setting `credentials: 'include'`. This works with the backend's cookie-based authentication:

```typescript
// Backend sets cookie (in login/register controllers)
res.cookie('accessToken', result.accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
});

// Frontend automatically includes it
const result = await api.post('/post', data); // accessToken sent automatically
```

## Migration from Direct Fetch

**Before:**

```typescript
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

if (res.ok) {
  const result = await res.json();
  // handle success
} else {
  const error = await res.json().catch(() => null);
  // handle error
}
```

**After:**

```typescript
const result = await api.post('/post', data);

if (result.ok) {
  // handle success - result.data is already parsed
} else {
  // handle error - result.error is ready to use
}
```

## Available Types

```typescript
// Response types
interface PostResponse {
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
}

interface CreatePostResponse {
  message: string;
  post: PostResponse;
}

interface ErrorResponse {
  error: string;
  message?: string;
  issues?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}
```

This utility makes API calls consistent, authenticated, and type-safe throughout your application!
