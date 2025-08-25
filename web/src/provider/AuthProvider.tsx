'use client';

import React, { createContext, useContext, useState } from 'react';

type User = {
  id: string;
  email: string;
  role: string;
  userName: string;
  exp: number;
};

const AuthContext = createContext<null | User>(null);

const AuthProvider = ({
  children,
  userInfo,
}: React.PropsWithChildren<{ userInfo: User }>) => {
  const [user, setUser] = useState<null | User>(userInfo ?? null);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthInfo = () => {
  const context = useContext(AuthContext);
  // if (!context) {
  //   throw new Error('useAuthInfo must be used within an AuthProvider');
  // }
  return context;
};
