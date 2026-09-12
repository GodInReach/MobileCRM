import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types';

const defaultTestUser: User = {
  name: 'Vizoroz',
  email: 'grow@vizoroz.com',
  location: 'CHENNAI',
  branch: 'VERDE MONDE - TEST',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = (email: string, _password: string): boolean => {
    // Allows test credentials or standard sign-in
    const trimmedEmail = email.trim();
    if (trimmedEmail.length > 0) {
      setUser({
        ...defaultTestUser,
        email: trimmedEmail || defaultTestUser.email,
      });
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
