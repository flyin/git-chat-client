import React, { PropTypes } from 'react';
import { ApolloProvider } from 'react-apollo';
import { StaticRouter } from 'react-router';

const Server = ({ client, location, context, store, children }) => (
  <ApolloProvider client={client} store={store}>
    <StaticRouter location={location} context={context}>
      {children}
    </StaticRouter>
  </ApolloProvider>
);

Server.propTypes = {
  children: PropTypes.node.isRequired,
  client: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired
};

export default Server;
