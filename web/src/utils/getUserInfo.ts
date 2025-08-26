import { cookies } from 'next/headers';
import { decodeJwtToken } from './jwtDecode';

type jwtUser = {
  id: string | number;
  email: string;
  role: string;
  userName: string;
  exp?: number;
  iat?: number;
  name: string;
};

export const getUserInfo = async (): Promise<jwtUser | null> => {
  const cookieStore = await cookies();

  if (cookieStore.has('accessToken')) {
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken && refreshToken) {
      const userInfo = decodeJwtToken(accessToken);
      return userInfo;
    }

    return null;
  }

  return null;
};
