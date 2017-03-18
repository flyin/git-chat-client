import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';

const Client = ({ client, history, store, children }) => (
  <ApolloProvider client={client} store={store}>
    <ConnectedRouter history={history}>
      {children}
    </ConnectedRouter>
  </ApolloProvider>
);

export default Client;
