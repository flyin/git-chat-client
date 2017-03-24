import 'isomorphic-fetch';
import React from 'react';
import { join, resolve } from 'path';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { memoize } from 'lodash';
import { getDataFromTree } from 'react-apollo';
import createMemoryHistory from 'history/createMemoryHistory';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import App, { actions as appActions } from './containers/App';
import { loadAssets, renderHtml } from './components/Html';
import Server from './components/Server';
import settings from './settings';
import createStore from './store';

const webRoot = resolve(__dirname, '..', 'web');
const loadCachedAssets = __DEV__ ? loadAssets : memoize(loadAssets);
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use('/static', express.static(webRoot));

app.get('*', async (req, res) => {
  const assets = await loadCachedAssets(join(webRoot, 'webpack-assets.json'));
  const networkInterface = createNetworkInterface({ uri: settings.urls.api });

  networkInterface.use([{
    applyMiddleware(apolloReq, done) {
      if (!apolloReq.options.headers) {
        apolloReq.options.headers = {};
      }

      apolloReq.options.headers.authorization = req.cookies.token;
      done();
    }
  }]);

  const client = new ApolloClient({ networkInterface, ssrMode: true });
  const store = createStore({}, createMemoryHistory(), client);
  store.dispatch(appActions.storeToken(req.cookies.token));

  const context = {};
  const html = <Server store={store} client={client} location={req.url} context={context}><App /></Server>;

  try {
    await getDataFromTree(html);

    if (context.url) {
      res.redirect(302, context.url);
    } else {
      // const styles = styleSheet.rules().map((rule: TStyleSheetRule) => rule.cssText).join('\n');
      res.send(renderHtml('', client.store, assets, html));
    }
  } catch (err) {
    res.status(500).send(renderHtml('', client.store, assets));
  }
});

app.listen(3000);
