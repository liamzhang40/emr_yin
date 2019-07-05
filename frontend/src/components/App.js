import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';
import { AuthRoute, ProtectRoute } from '../utils/route_utils';
import SessionFormContainer from './forms/session_form_container';
import Dashboard from './dashboard/dashboard';
import { hasCurrentUser } from '../utils/session_api_utils';
import { fetchCurrentUser } from '../actions/session_actions';

class App extends Component {
  componentDidMount() {
    if (hasCurrentUser()) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    return (
      <Fragment>
        <AuthRoute path="/login" component={SessionFormContainer} formType="login"/>
        <AuthRoute path="/signup" component={SessionFormContainer} formType="signup"/>
        <ProtectRoute path="/" component={Dashboard} />
      </Fragment>
    );
  }
}

export default connect(null, {
  fetchCurrentUser
})(App);
