import mongoose from 'mongoose';

const MONGO_URI =
  process.env.DB_URL || 'mongodb://localhost:27017/test_learn_mongo';

export async function connectMongo(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: 'test_learn_mongo',
      connectTimeoutMS: 5000,
    });

    console.log('[✅] MongoDB connected');
  } catch (err) {
    console.error('[❌] MongoDB connection failed:', err);
    process.exit(1);
  }
}
