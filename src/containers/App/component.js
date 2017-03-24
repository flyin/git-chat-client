import React from 'react';
import Helmet from 'react-helmet';

import { Switch, Route } from 'react-router-dom';

import settings from 'settings';
import Nav from './components/Nav';
import Chat from './containers/Chat';
import LoginCallback from './containers/LoginCallback';
import NotFound from './containers/NotFound';

const App = () => (
  <div>
    <Helmet {...settings.app.head} />
    <Nav />

    <Switch>
      <Route path="/" exact component={Chat} />
      <Route path="/callback" component={LoginCallback} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
