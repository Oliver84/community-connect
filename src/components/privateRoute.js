import React, { useContext } from "react";
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

const PrivateRoute = ({ render, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          render(location)
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login-page',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
