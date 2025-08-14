import { Router } from 'express';

const adminRouter = Router();

adminRouter.get('/', (_req, res) => {
  res.send('Hello World from Admin Route');
});

adminRouter.get('/test', (_req, res) => {
  res.send('Test route');
});

export default adminRouter;
