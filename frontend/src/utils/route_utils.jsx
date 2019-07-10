import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { hasCurrentUser } from '../utils/session_api_utils';

const Auth = ({ component: Component, path, loggedIn, exact, ...restProps }) => (
  <Route path={path} exact={exact} render={(props) => (
    !loggedIn ? (
      <Component {...props} {...restProps} />
    ) : (
      <Redirect to={`/`} />
    )
  )} 
  />
);

const mapStateToProps = state => {
  const loggedIn = hasCurrentUser();
  return {
    loggedIn
  };
};

const Protect = ({ component: Component, path, loggedIn }) => {
  return (
  <Route path={path} render={(props) => (
    loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={`/login`} />
    )
  )} />
)};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectRoute = withRouter(connect(mapStateToProps, null)(Protect));
