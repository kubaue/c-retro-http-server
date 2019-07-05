import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { buildStore } from "./store";
import AppRouter from './AppRouter';

export default class App extends Component {

  render () {
    return (
      <Provider store={buildStore()}>
        <AppRouter />
      </Provider>
    );
  }
}