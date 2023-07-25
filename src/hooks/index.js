import { useContext, useEffect, useState } from 'react';
import { editProfile, register, login as userLogin } from '../api';
import { AuthContext } from '../providers/AuthProvider';
import {
  LOCALSTORAGE_TOKEN_KEY,
  removeItemInLocalStorage,
  setItemInLocalStorage,
  getItemInLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    if (userToken) {
      const user = jwt(userToken);
      console.log('user', user);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const updateProfile = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);
    console.log('response', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemInLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  return {
    user,
    login,
    logout,
    loading,
    signup,
    updateProfile,
  };
};
