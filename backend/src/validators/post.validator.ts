import { PostStatus } from '@/types/posts';
import * as z from 'zod';

export const postSchema = z.object({
  _id: z.string().uuid().optional(),
  title: z.string().max(100),
  description: z.string().max(1000),
  content: z.string().max(50000),
  author: z.string(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  status: z.nativeEnum(PostStatus).default(PostStatus.DRAFT),
  category: z.string().min(2).max(100),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export type Post = z.infer<typeof postSchema>;

export type PostCreate = Omit<Post, '_id' | 'createdAt' | 'updatedAt'>;

export type PostUpdate = Omit<Post, 'createdAt' | 'updatedAt'>;
