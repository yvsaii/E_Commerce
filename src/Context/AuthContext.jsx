import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem('novacart_isLoggedIn');
      const savedUser = localStorage.getItem('novacart_user');
      
      if (loggedIn === 'true' && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
          localStorage.removeItem('novacart_isLoggedIn');
          localStorage.removeItem('novacart_user');
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (email, password) => {
    // Get registered users from localStorage
    const registeredUsers = localStorage.getItem('novacart_users');
    let users = [];
    
    if (registeredUsers) {
      try {
        users = JSON.parse(registeredUsers);
      } catch (error) {
        console.error('Error parsing users:', error);
      }
    }

    // Find user with matching email and password
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('novacart_user', JSON.stringify(userData));
      localStorage.setItem('novacart_isLoggedIn', 'true');
      return { success: true };
    }
    
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name, email, password) => {
    // Get existing users
    const registeredUsers = localStorage.getItem('novacart_users');
    let users = [];
    
    if (registeredUsers) {
      try {
        users = JSON.parse(registeredUsers);
      } catch (error) {
        console.error('Error parsing users:', error);
      }
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('novacart_users', JSON.stringify(users));

    // Auto-login after registration
    const userData = { email: newUser.email, name: newUser.name };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('novacart_user', JSON.stringify(userData));
    localStorage.setItem('novacart_isLoggedIn', 'true');

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('novacart_user');
    localStorage.removeItem('novacart_isLoggedIn');
  };

  const value = {
    user,
    isLoggedIn,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

