import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

type jwtUser = {
  id: any;
  email: string;
  role: string;
  userName: string;
  exp?: number;
  iat?: number;
  name: string;
};

export const createJwtToken = (data: object) => {
  console.log('JWT', JWT_SECRET);
  const payload = { ...data };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

export const createRefreshToken = (data: object) => {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '15d' });
};

export const createTokens = (data: object) => {
  const accessToken = createJwtToken(data);
  const refreshToken = createRefreshToken(data);
  return { accessToken, refreshToken };
};

export const verifyJwtToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwtUser;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
