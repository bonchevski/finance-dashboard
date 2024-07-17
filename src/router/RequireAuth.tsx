/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  AuthContextInstance,
  UserAuthContextProvider,
} from '../context/AuthContextProvider';

interface Props {
  children: React.ReactNode;
  not?: boolean;
}

const RequireAuth: React.FC<Props> = ({
  children,
  not = false,
}: Props): JSX.Element | null => {
  const location = useLocation();
  const { AuthContext } =
    useContext<UserAuthContextProvider>(AuthContextInstance);
  const redirectUrl = `${location.pathname}${location.search}`;

  useEffect(() => {
    if (!not && !AuthContext.isLoggedIn) {
      AuthContext.logout(redirectUrl);
    }
  }, [AuthContext, redirectUrl, not]);

  if (not && AuthContext.isLoggedIn) {
    const getRedirectURL = new URLSearchParams(location.search).get('redirect');
    return <Navigate replace to={getRedirectURL || '/'} />;
  } else if (!not && !AuthContext.isLoggedIn) {
    return <Navigate replace to={`/login?redirect=${redirectUrl}`} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
