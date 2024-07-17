import { ReactElement, useContext, useEffect, useMemo } from 'react';
import { axiosInstance } from './AxiosInstance';
import { refreshToken } from '../utils/refreshToken';
import {
  AuthContextInstance,
  UserAuthContextProvider,
} from '../context/AuthContextProvider';

interface Props {
  children: ReactElement | null;
}

const AxiosInterceptor: React.FC<Props> = ({ children }) => {
  const { AuthContext } =
    useContext<UserAuthContextProvider>(AuthContextInstance);

  const resInterceptor = useMemo(() => {
    return axiosInstance.interceptors.response.use(
      (response) => {
        if (
          (response.config.method === 'post' ||
            response.config.method === 'put' ||
            response.config.method === 'patch') &&
          response.status >= 200 &&
          response.status <= 299
        ) {
          if (response.config.url !== `/token/`) {
            console.log('success');
          }
        }
        return response;
      },
      async (error) => {
        if (
          (error.response.status >= 400 && error.response.status <= 499) ||
          (error.response.status >= 500 && error.response.status <= 599)
        ) {
            // TODO: add notification popup from MUI;
            return error;
        }   

        if (error.response.status === 401) {
          refreshToken();
          const redirectUrl = window.location.pathname;
          AuthContext.logout(redirectUrl);
        }

        return error;
      }
    );
  }, [AuthContext]);

  useEffect(() => {
    axiosInstance.interceptors.response.eject(resInterceptor);
  }, [AuthContext, resInterceptor]);

  return children;
};

export default AxiosInterceptor;
