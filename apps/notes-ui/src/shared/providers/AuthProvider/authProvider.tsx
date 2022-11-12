import config from '../../../config';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { setAuthorizationHeader } from './setAuthorizationHeader';
import { useHistory } from 'react-router-dom';

const DEFAULT_CONTEXT: UserContext = {
  user: null,
  login: async () => undefined,
  register: async () => undefined,
  logout: () => null,
};

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface RegisterOptions {
  email: string;
  password: string;
  name: string;
}

export interface UserContext {
  user?: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (registerOptions: RegisterOptions) => Promise<void>;
  logout: () => void;
}

const authContext = createContext<UserContext>(DEFAULT_CONTEXT);

export function useAuth() {
  return useContext(authContext);
}

const STORAGE_PREFIX = '__shared_notes_app__';
const USER_ITEM_KEY = 'user_data';

export function AuthProvider({ children, ...props }: any) {
  const [user, setUser] = useState<User | null>(null);

  const history = useHistory();

  const loadUserData = () => {
    const userData = localStorage.getItem(`${STORAGE_PREFIX}${USER_ITEM_KEY}`);

    if (!userData) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = null;

    try {
      data = JSON.parse(userData);
    } catch {
      // ignore
    }
    if (data?.token) {
      setAuthorizationHeader(data?.token);
    }

    if (data?.user) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${config.apiHost}/api/v1/auth/login`, {
        email,
        password,
      });

      const { user, token } = response?.data || {};

      setUser(user);

      setAuthorizationHeader(token);

      localStorage.setItem(
        `${STORAGE_PREFIX}${USER_ITEM_KEY}`,
        JSON.stringify({ user, token })
      );

      // history.push('/notes');
      // workaround for MVP:
      window.location.href = '/notes';
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(`${STORAGE_PREFIX}${USER_ITEM_KEY}`);
  };

  const register = async ({ email, password, name }: RegisterOptions) => {
    try {
      const response = await axios.post(
        `${config.apiHost}/api/v1/auth/register`,
        {
          email,
          password,
          name,
        }
      );

      const { user, token } = response?.data || {};

      setUser(user);

      setAuthorizationHeader(token);

      localStorage.setItem(
        `${STORAGE_PREFIX}${USER_ITEM_KEY}`,
        JSON.stringify({ user, token })
      );
     // history.push('/notes');
      // workaround for MVP:
      window.location.href = '/notes';
    } catch (error) {
      console.error('Register error', error);
    }
  };

  return (
    <authContext.Provider
      value={{
        login,
        register,
        user,
        logout,
      }}
      {...props}
    >
      {children}
    </authContext.Provider>
  );
}
