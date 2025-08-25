import { verifyToken } from '@/utils/hash';

export const authMiddleware = (req, res, next) => {
  console.log('=== AUTH MIDDLEWARE ===');
  const accessToken = req.cookies.accessToken;
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    console.log('❌ No access token found in cookies');
    return res.status(401).json({
      error: 'Unauthorized - No access token provided',
    });
  }

  try {
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    console.log('✅ Token verified successfully:', decoded);
    req.user = decoded;
  } catch (error) {
    console.log('❌ Authentication error:', error);

    return res.status(401).json({
      error: (error as Error).message || 'Unauthorized',
    });
  }

  next();
};
