'use client';
import Cookies from 'js-cookie';

export const useUserDetails = () => {
  // Custom hook logic here
  // extract data from cookies
  const accessToken = Cookies.get('accessToken');
  let user: Record<string, unknown> | null = null;
};
