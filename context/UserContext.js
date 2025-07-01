import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultUser = { email: '' };

const UserContext = createContext({
  user: defaultUser,
  setUser: () => {},
  updateUser: () => {},
  logout: () => {}, // Add logout to context shape
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed && typeof parsed === 'object' && parsed.email) {
            setUser(parsed);
          } else {
            setUser(defaultUser);
          }
        } else {
          setUser(defaultUser);
        }
      } catch (err) {
        console.warn('Failed to load user:', err);
        setUser(defaultUser);
      }
    };

    loadUser();
  }, []);

  const updateUser = async (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    try {
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      console.warn('Failed to update user:', err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
    } catch (err) {
      console.warn('Failed to clear user:', err);
    }
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
