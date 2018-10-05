import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Room from './components/room.js'
import Home from './components/home.js'

const Router = () => (
  <Switch>
    <Route exact path='/' />
    <Route exact path='/home' component={Home} />
    <Route exact path='/:id' component={Room} />
  </Switch>
)

export default Router;
