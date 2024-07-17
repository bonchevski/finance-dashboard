import axios from 'axios';
import { ReactElement, useContext } from 'react';
import {
  UserAuthContextProvider,
  AuthContextInstance,
} from '../context/AuthContextProvider';

interface Props {
  children: ReactElement | null;
}
const baseURL = '/api';

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

const AxiosInstance: React.FC<Props> = ({ children }) => {
  const { AuthContext } =
    useContext<UserAuthContextProvider>(AuthContextInstance);

  axiosInstance.defaults.headers.common.Authorization =
    'Bearer ' + AuthContext.loggedUser?.token;

  return children;
};

export default AxiosInstance;
