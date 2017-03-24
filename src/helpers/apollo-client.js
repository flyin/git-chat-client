import ApolloClient, { createBatchingNetworkInterface } from 'apollo-client';
import { print } from 'graphql/language/printer';
import cookies from 'js-cookie';
import settings from 'settings';
import SocketClient from './socket-client';

const networkInterface = createBatchingNetworkInterface({
  batchInterval: 10,

  opts: {
    credentials: 'cors',
  },

  uri: settings.urls.api
});


const authMiddleware = {
  applyBatchMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the headers object if needed.
    }

    req.options.headers.authorization = cookies.get('token');
    next();
  }
};

networkInterface.use([authMiddleware]);

const addGraphQLSubscriptions = socketClient => Object.assign(networkInterface, {
  subscribe: (request, handler) => socketClient.subscribe({ query: print(request.query), variables: request.variables }, handler),
  unsubscribe: id => socketClient.unsubscribe(id)
});

export default () => new ApolloClient({
  networkInterface: addGraphQLSubscriptions(networkInterface, new SocketClient()),
  queryDeduplication: true,
  ssrForceFetchDelay: 100,
});
