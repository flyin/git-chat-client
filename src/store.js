import { routerMiddleware } from 'react-router-redux';
import { createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export default (initialData, history, client) => {
  const middleware = [thunk, routerMiddleware(history), client.middleware()];

  if (__DEV__ && __CLIENT__) {
    const createLogger = require('redux-logger').createLogger;
    middleware.push(createLogger({ collapsed: true }));
  }

  let finalCreateStore = applyMiddleware(...middleware)(reduxCreateStore);

  if (__DEV__ && __CLIENT__) {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )(reduxCreateStore);
  }

  const store = finalCreateStore(createRootReducer(client), initialData);

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createRootReducer(client));
    });
  }

  return store;
};
