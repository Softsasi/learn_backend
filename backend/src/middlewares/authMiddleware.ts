import { verifyToken } from '@/utils/hash';

export const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      error: 'Unauthorized',
    });
  }

  try {
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    req.user = decoded;
  } catch (error) {
    return res.status(401).json({
      error: (error as Error).message || 'Unauthorized',
    });
  }

  next();
};
