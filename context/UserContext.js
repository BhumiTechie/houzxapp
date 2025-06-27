import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultUser = { email: '' };

const UserContext = createContext({
  user: defaultUser,
  setUser: () => {},
  updateUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser); // Always initialized safely

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          if (parsed && typeof parsed === 'object' && parsed.email) {
            setUser(parsed);
          } else {
            setUser(defaultUser); // Fallback if invalid structure
          }
        } else {
          setUser(defaultUser); // No user saved
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

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
