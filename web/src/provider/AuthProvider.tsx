'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: string | number;
  email: string;
  role: string;
  userName: string;
  exp?: number;
  iat?: number;
  name: string;
};

const AuthContext = createContext<null | {
  user: User | null;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>(null);

const AuthProvider = ({
  children,
}: React.PropsWithChildren<{ userInfo: User | null }>) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('user');
    const parsedUserInfo = userInfoFromStorage
      ? JSON.parse(userInfoFromStorage)
      : null;
    setUser(parsedUserInfo);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthInfo = () => {
  const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error('useAuthInfo must be used within an AuthProvider');
  // }
  return context;
};
