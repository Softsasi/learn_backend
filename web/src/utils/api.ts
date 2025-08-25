import { appConfig } from '@/config/appConfig';

interface ApiOptions extends RequestInit {
  requireAuth?: boolean;
}

interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

/**
 * Authenticated API fetch utility that automatically includes access token from cookies
 * @param endpoint - API endpoint (relative to NEXT_PUBLIC_API_URL)
 * @param options - Fetch options with optional requireAuth flag
 * @returns Promise with typed response
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const { requireAuth = true, headers = {}, ...fetchOptions } = options;

  // Build full URL  appConfig.backend_Url;
  const baseUrl = appConfig.backend_Url;
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

  // Prepare headers
  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
    credentials: 'include', // Ensure cookies are included
  };

  // Include credentials to send cookies (including accessToken)
  const requestOptions: RequestInit = {
    ...fetchOptions,
    headers: requestHeaders,
    credentials: 'include', // This ensures cookies are sent with the request
  };

  try {
    const response = await fetch(url, requestOptions);

    let data: T | undefined;
    let error: string | undefined;

    // Try to parse response body
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const json = await response.json();
      if (response.ok) {
        data = json;
      } else {
        error = json.message || json.error || 'Request failed';
      }
    } else if (!response.ok) {
      error = `Request failed with status ${response.status}`;
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
      error,
    };
  } catch (err) {
    console.error('API request failed:', err);
    return {
      ok: false,
      status: 0,
      error: 'Network error occurred',
    };
  }
}

// Convenience methods for common HTTP verbs
export const api = {
  get: <T = any>(endpoint: string, options?: Omit<ApiOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(
    endpoint: string,
    data?: any,
    options?: Omit<ApiOptions, 'method' | 'body'>
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T = any>(
    endpoint: string,
    data?: any,
    options?: Omit<ApiOptions, 'method' | 'body'>
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: Omit<ApiOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T = any>(
    endpoint: string,
    data?: any,
    options?: Omit<ApiOptions, 'method' | 'body'>
  ) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
};

// Type definitions for common API responses
export interface PostResponse {
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

export interface CreatePostResponse {
  message: string;
  post: PostResponse;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  issues?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}
