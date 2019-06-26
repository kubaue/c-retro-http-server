import React, { Component } from 'react';
import './App.css';
import { Redirect, Route, Router } from "react-router";
import { LoginScene } from "./components/scenes/LoginScene";
import { GroupsScene } from "./components/scenes/GroupsScene";
import { createBrowserHistory } from "history";
import { isLoggedIn } from "./selectors/authSelectors";

const history = createBrowserHistory();

class App extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path="/login" component={LoginScene} />
        <PrivateRoute path="/groups" component={GroupsScene} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
