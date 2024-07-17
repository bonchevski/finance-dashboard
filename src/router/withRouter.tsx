/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface RouteComponentProps {
  children?: ReactNode;
  location: Location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: any; // Not included in first versions of `React DOM Router 6`
}

export const withRouter = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.FunctionComponent<any> | React.ComponentClass<any>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (props: any) => (
    <Component {...props} location={useLocation()} navigate={useNavigate()} />
  );
};
