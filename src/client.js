import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import cookies from 'js-cookie';
import App, { actions } from './containers/App';
import Client from './components/Client';
import createStore from './store';
import createApolloClient from './helpers/apollo-client';

const apolloClient = createApolloClient();
const history = createHistory();
const store = createStore(window.__STORE, history, apolloClient);
store.dispatch(actions.storeToken(cookies.get('token')));

const rootProps = { client: apolloClient, history, store };
const reactRoot = window.document.getElementById('react-root');

render(
  <AppContainer>
    <Client {...rootProps}>
      <App />
    </Client>
  </AppContainer>,

  reactRoot
);

/* eslint-disable */
if (__DEV__ && module.hot) {
  module.hot.accept('./containers/App', () => {
    const NewApp = require('./containers/App').default;

    render(
      <AppContainer>
        <Client {...rootProps}>
          <NewApp />
        </Client>
      </AppContainer>,

      reactRoot
    );
  });
}

if (__DEV__) {
  window.React = React; // enable debugger

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error(`Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.`);
  }
}
/* eslint-enable */
