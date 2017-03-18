import ApolloClient, { createNetworkInterface } from 'apollo-client';
import cookies from 'js-cookie';

const networkInterface = createNetworkInterface({ uri: 'http://127.0.0.1' });

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    req.options.headers.authorization = cookies.get('token');
    next();
  }
}]);

export default () => new ApolloClient({ networkInterface });
