import { PostStatus } from '@/types/posts';
import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  content: {
    type: String,
    required: true,
    maxlength: 50000,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: {
    type: [String],
    required: false,
    default: [],
  },

  published: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: Object.values(PostStatus),
    default: PostStatus.DRAFT,
  },

  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = model('Post', postSchema);

export default Post;
