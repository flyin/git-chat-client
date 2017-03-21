import React from 'react';
import Helmet from 'react-helmet';
import settings from 'settings';

const App = () => (
  <div>
    <Helmet {...settings.app.head} />
    <Helmet title="Home" />
    App goes here
  </div>
);

App.propTypes = {};
App.defaultProps = {};

export default App;
