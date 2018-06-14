import React, { Component } from 'react';
import { Route } from "react-router-dom";

import LoginScreen from './Screen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen';
import HomeScreen from './Screen/HomeScreen';
import CreateTodoScreen from './Screen/CreateTodoScreen';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact={true} path={'/'} component={LoginScreen} />
        <Route path={'/RegisterScreen'} component={RegisterScreen} />
        <Route path={'/HomeScreen'} component={HomeScreen} />
        <Route path={'/CreateTodoScreen'} component={CreateTodoScreen} />
      </div>
    );
  }
}

export default App;
