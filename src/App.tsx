/* eslint-disable react/react-in-jsx-scope */
import { Outlet, useRoutes } from 'react-router-dom';
import { useEffect } from 'react';
import AxiosInterseptor from './axiosHelpers/AxiosInterceptor';
import AxiosInstance from './axiosHelpers/AxiosInstance';
import RequireAuth from './router/RequireAuth';
import 'antd/dist/antd.less';
import { refreshToken } from './utils/refreshToken';
import Login from './pages/Login/Login';

export const API_URL = `${process.env.REACT_APP_API_URL}`;


export const commonRoutes = [
  {
    path: '/',
    element: (
      <RequireAuth>
        {/* <Header className="mb-12" /> */}
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </RequireAuth>
    ),
    children: [],
  },
  {
    path: '/login',
    element: (
      <RequireAuth not>
        <Login />
      </RequireAuth>
    ),
  },
  {
    path: '/logout',
    element: <>404</>,
    // element: <Logout />,
  },
  {
    path: '*',
    element: <>404</>,
  },
];


export const App = () => {

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userParsed = JSON.parse(user);
      const expiresIn = userParsed?.expires_in;
      setTimeout(refreshToken, expiresIn);
    }
  }, []);

  const RoutesElement = useRoutes(commonRoutes);

  return (
      <AxiosInstance>
        <AxiosInterseptor>{RoutesElement}</AxiosInterseptor>
      </AxiosInstance>
  );
};

export default App;
