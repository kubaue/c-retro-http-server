import React, { Component } from 'react';
import { Redirect, Route, Router } from "react-router";
import LoginPage from "./components/pages/LoginPage";
import GroupsPage from "./components/pages/GroupsPage";
import { isLoggedIn } from "./selectors/authSelectors";
import connect from "react-redux/es/connect/connect";
import HomePage from './components/pages/HomePage';
import browserHistory from './history';

const history = browserHistory;

class AppRouter extends Component {
  render() {
    const loggedIn = this.props.isLoggedIn;
    return (
      <Router history={history}>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/home" component={HomePage} isLoggedIn={loggedIn} />
        <PrivateRoute path="/groups" component={GroupsPage} isLoggedIn={loggedIn} />
      </Router>
    );
  }
}

class PrivateRoute extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return <Route path={this.props.path} component={this.props.component} />
    } else {
      return <Redirect to={{ pathname: "/login" }}
      />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: isLoggedIn(state)
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
