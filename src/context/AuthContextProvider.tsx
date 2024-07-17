/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import { Component, createContext, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { axiosInstance } from '../axiosHelpers/AxiosInstance';
import {
  RouteComponentProps,
  withRouter,
} from '../router/withRouter';


export interface User {
  username: string;
  token: string;
  refresh: string;
  expiry: string;
  expires_in: number;
}

export interface UserAuthContextProvider {
  children?: ReactNode;
  AuthContext: {
    isLoggedIn: boolean;
    loggedUser: null | User;
    login(
      providerUrl: string,
      data: any,
      redirectUrl?: string | null
    ): Promise<void>;
    logout(redirectUrl?: string): void;
  };
}

export const AuthContextInstance = createContext<UserAuthContextProvider>({
  AuthContext: {
    isLoggedIn: false,
    loggedUser: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (providerUrl: string, data: any, redirectUrl?: string | null) =>
      new Promise(() => {}),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logout: (redirectUrl?: string) => new Promise(() => {}),
  },
} as UserAuthContextProvider);

class AuthContextProvider extends Component<
  RouteComponentProps,
  UserAuthContextProvider
> {
  
  protected readonly setLoggedUserInLocalStorage = (
    user: User | null
  ): void => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  protected readonly getIsLoggedInLocalStorage = (): User => {
    const loggedUser = JSON.parse(localStorage.getItem('user') || 'null');
    return loggedUser;
  };

  loggedUser: User | null = this.getIsLoggedInLocalStorage();

  set _loggedUser(_user: User | null) {
    this.loggedUser = _user;

    if (_user) {
      this.setLoggedUserInLocalStorage(this.loggedUser);
    } else {
      this.setLoggedUserInLocalStorage(null);
    }
  }

  get _loggedUser(): User | null {
    return this.loggedUser;
  }

  get isLoggedIn(): boolean {
    const isLoggedIn = Boolean(this.getIsLoggedInLocalStorage());
    return isLoggedIn;
  }

  getExpiryTime = (expiryTime: any) => {
    const expiry = expiryTime * 1000;
    const now = new Date().getTime();
    const timeLeft = expiry - now;
    return timeLeft;
  };

  readonly login = (
    providerUrl: string,
    data: {
      username: string;
      password: string;
    },
    redirectUrl?: string | null
  ): Promise<void> => {
    const { search } = this.props.location;

    return axiosInstance({
      method: 'POST',
      url: providerUrl,
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
            // TODO: replace any with proper type
          const decodeAccessToken: any = jwtDecode(res.data.access);
          const decodeRefreshToken: any = jwtDecode(res.data.refresh);

          const user: User = {
            username: decodeAccessToken.user,
            token: res.data.access,
            refresh: res.data.refresh,
            expiry: decodeAccessToken.exp,
            expires_in: this.getExpiryTime(decodeAccessToken.exp),
          };

          this._loggedUser = user;

          this.setState(
            {
              AuthContext: this,
            },
            () => {
              // Send them back to the page they tried to visit when they were
              // redirected to the login page. Use { replace: true } so we don't create
              // another entry in the history stack for the login page.  This means that
              // when they get to the protected page and click the back button, they
              // won't end up back on the login page, which is also really nice for the
              // user experience.
              // Redirect to last route URL before logout OR Home page
              const urlParams = new URLSearchParams(search);

              const loginRedirect =
                urlParams.get('redirect') || redirectUrl || '/';

              setTimeout(() => {
                this.props.navigate(loginRedirect, {
                  replace: true,
                });
              });
            }
          );
        }
      })
      .catch((error) => console.log(error));
  };

  readonly logout = (redirectUrl?: string): void => {
    this._loggedUser = null;

    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    const loginPageRedirectUrl = redirectUrl ? `?redirect=${redirectUrl}` : '';

    this.props.navigate({
      pathname: '/login',
      search: loginPageRedirectUrl,
    });

    // return axios({
    //   method: 'POST',
    //   url: `/logout`,
    // }).then(() => {
    //   this.setState({
    //     AuthContext: this,
    //   });
    // });
  };

  readonly state: UserAuthContextProvider = {
    AuthContext: this,
  } as UserAuthContextProvider;

  render() {
    return (
      <AuthContextInstance.Provider value={this.state}>
        {this.props.children}
      </AuthContextInstance.Provider>
    );
  }
}

export default withRouter(AuthContextProvider);
