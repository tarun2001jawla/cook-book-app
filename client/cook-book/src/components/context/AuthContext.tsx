import React, { createContext, useContext, useState, useEffect } from 'react';
import { parseJwt } from '../../utils/jwt'; 

interface AuthContextProps {
  user: { name?: string };
  isAuthenticated: boolean;
 
}

const AuthContext = createContext<AuthContextProps>({ user: {}, isAuthenticated: false });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name?: string }>({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (token) {
      const decoded = parseJwt(token.split('=')[1]);
      setUser({ name: decoded.name });
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
