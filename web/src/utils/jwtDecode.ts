import { jwtDecode } from 'jwt-decode';
const token = process.env.JWT_SECRET;

type JwtPayload = {
  id: string | number;
  email: string;
  role: string;
  userName: string;
  exp?: number;
  iat?: number;
  name: string;
};

export const decodeJwtToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};
