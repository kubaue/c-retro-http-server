import React, { Component } from 'react';
import { Redirect, Route, Router } from "react-router";
import { LoginScene } from "./components/scenes/LoginScene";
import { GroupsScene } from "./components/scenes/GroupsScene";
import { createBrowserHistory } from "history";
import { isLoggedIn } from "./selectors/authSelectors";
import connect from "react-redux/es/connect/connect";

const history = createBrowserHistory();

class AppRouter extends Component{
  render () {
    const loggedIn = this.props.isLoggedIn;
    return (
      <Router history={history}>
        <Route path="/login" component={LoginScene} />
        <PrivateRoute path="/groups" component={GroupsScene} isLoggedIn={loggedIn}/>
      </Router>
    );
  }
}

class PrivateRoute extends Component {
  render () {
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
