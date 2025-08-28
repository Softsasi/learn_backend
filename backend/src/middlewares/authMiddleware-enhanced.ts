import { verifyJwtToken } from '@/utils/jwt-token';

export const authMiddleware = (req, res, next) => {
  console.log('=== AUTH MIDDLEWARE ===');
  console.log('📋 All cookies:', req.cookies);
  console.log('📋 Raw cookie header:', req.headers.cookie);
  console.log('🔑 Authorization header:', req.headers.authorization);
  console.log('🌐 Origin:', req.headers.origin);
  console.log('🔗 Referer:', req.headers.referer);

  // Try to get token from cookies first, then from Authorization header
  let accessToken = req.cookies.accessToken;

  if (!accessToken && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith('Bearer ')) {
      accessToken = authHeader.substring(7);
      console.log('🔑 Using token from Authorization header');
    }
  }

  console.log(
    'Access Token:',
    accessToken ? `${accessToken.substring(0, 10)}...` : 'undefined'
  );

  if (!accessToken) {
    console.log('❌ No access token found in cookies or headers');
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
