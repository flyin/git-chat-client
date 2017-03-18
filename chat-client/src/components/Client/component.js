import React, { PropTypes } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';

const Client = ({ client, history, store, children }) => (
  <ApolloProvider client={client} store={store}>
    <ConnectedRouter history={history}>
      {children}
    </ConnectedRouter>
  </ApolloProvider>
);

Client.propTypes = {
  children: PropTypes.node.isRequired,
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default Client;
