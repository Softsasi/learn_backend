import { verifyJwtToken } from '@/utils/jwt-token';

export const authMiddleware = (req, res, next) => {
  console.log('=== AUTH MIDDLEWARE ===');
  console.log('📋 All cookies:', req.cookies);
  console.log('📋 Raw cookie header:', req.headers.cookie);
  console.log('🌐 Origin:', req.headers.origin);
  console.log('🔗 Referer:', req.headers.referer);

  const accessToken = req.cookies.accessToken;
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    console.log('❌ No access token found in cookies');
    return res.status(401).json({
      error: 'Unauthorized - No access token provided',
    });
  }

  try {
    const decoded = verifyJwtToken(accessToken);
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
