import { cookies } from 'next/headers';
//  Buffer.from(token, 'base64').toString('utf-8');
export const getUserInfo = async () => {
  const cookieStore = await cookies();
  if (cookieStore.has('accessToken')) {
    const token = cookieStore.get('accessToken')?.value;

    if (token) {
      const userInfo = Buffer.from(token, 'base64').toString('utf-8');
      return JSON.parse(userInfo);
    }
  }

  return null;
};
