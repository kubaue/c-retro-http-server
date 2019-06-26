import React, { Component } from 'react';
import './App.css';
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