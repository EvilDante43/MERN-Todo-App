import { createContext, useState, useEffect } from 'react';
import api from '../utils/axios';
import { toast } from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register
  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);

      setUser(res.data);

      toast.success('Registration successful');

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed'
      );

      return false;
    }
  };

  // Login
  const login = async (userData) => {
    try {
      const res = await api.post('/auth/login', userData);

      setUser(res.data);

      toast.success('Login successful');

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed'
      );

      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/auth/logout');

      setUser(null);

      toast.success('Logged out successfully');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};