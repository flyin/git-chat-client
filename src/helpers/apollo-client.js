import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { print } from 'graphql/language/printer';
import cookies from 'js-cookie';
import settings from 'settings';
import SocketClient from './socket-client';

const networkInterface = createNetworkInterface({
  opts: {
    credentials: 'cors',
  },

  transportBatching: true,
  uri: settings.urls.api
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    req.options.headers.authorization = cookies.get('token');
    next();
  }
}]);

const addGraphQLSubscriptions = socketClient => Object.assign(networkInterface, {
  subscribe: (request, handler) => socketClient.subscribe({ query: print(request.query), variables: request.variables }, handler),
  unsubscribe: id => socketClient.unsubscribe(id)
});

export default () => new ApolloClient({
  networkInterface: addGraphQLSubscriptions(networkInterface, new SocketClient()),
  ssrForceFetchDelay: 100
});
