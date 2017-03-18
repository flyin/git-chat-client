import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StaticRouter } from 'react-router';

const Server = ({ client, location, context, store, children }) => (
  <ApolloProvider client={client} store={store}>
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  </ApolloProvider>
);

export default Server;
