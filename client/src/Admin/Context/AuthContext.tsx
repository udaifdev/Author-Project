import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem('admin_auth_token');
      const authExpiry = localStorage.getItem('admin_auth_expiry');

      if (authToken && authExpiry) {
        const expiryTime = parseInt(authExpiry);
        const currentTime = Date.now();

        if (currentTime < expiryTime) {
          setIsAuthenticated(true);
        } else {
          // Token expired, clear storage
          localStorage.removeItem('admin_auth_token');
          localStorage.removeItem('admin_auth_expiry');
        }
      }

      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);


  const login = async (email: string, password: string): Promise<boolean> => {
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;


    if (email === adminEmail && password === adminPassword) {
      // Set auth token with 24 hour expiry
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      const authToken = btoa(`${email}:${Date.now()}`); // Simple token generation

      localStorage.setItem('admin_auth_token', authToken);
      localStorage.setItem('admin_auth_expiry', expiryTime.toString());

      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('admin_auth_expiry');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
