import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectMongo } from './db';
import { loggerMiddleware } from './middlewares/logger.middleware';
import adminRouter from './routes/adminRouter';
import authRouter from './routes/authRouter';
import { postRouter } from './routes/postRouter';
import userRouter from './routes/userRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 4003;
const servicename = process.env.SERVICENAME || 'Auth-Service';

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  process.env.FRONTEND_URL, // optional from .env
  "http://localhost:3000",  // React default
  "http://localhost:5173",  // Vite default
].filter(Boolean); // remove undefined

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS not allowed for this origin'));
    },
    credentials: true, // so cookies/headers work
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);


app.use(loggerMiddleware);

// Register routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'UP' });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found ' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.log(chalk.red(err.stack));
  res.status(500).json({ error: 'Internal Server Error' });
});

// Connect to MongoDB
connectMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`${servicename} is running on port ${port}`));
    });
  })
  .catch((err) => {
    console.error(chalk.red('Failed to connect to MongoDB:', err));
    process.exit(1);
  });
