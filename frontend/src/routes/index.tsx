import React from 'react';

import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Import from '../pages/Import';
import NewTransaction from '../pages/NewTransaction';

import { isAuthenticated } from '../services/auth';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/sign-up" component={SignUp} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/new-transaction" component={NewTransaction} />
    <PrivateRoute path="/import" component={Import} />
  </Switch>
);

export default Routes;
