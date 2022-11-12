import axios from 'axios';

export const setAuthorizationHeader = (token: string | null) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};
