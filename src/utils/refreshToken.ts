import { axiosInstance } from '../axiosHelpers/AxiosInstance';

export const refreshToken = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userParsed = JSON.parse(user);
    axiosInstance({
      method: 'POST',
      url: '/token/refresh/',
      data: { refresh: userParsed.refresh },
    }).then((response) => {
      userParsed.access = response.data.access;
      userParsed.refresh = response.data.refresh;
      localStorage.setItem('user', JSON.stringify(userParsed));
    });
  }
};

