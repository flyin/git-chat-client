import React from 'react';
import { join, resolve } from 'path';
import express from 'express';
import morgan from 'morgan';
import { memoize } from 'lodash';
import { getDataFromTree } from 'react-apollo';
import createMemoryHistory from 'history/createMemoryHistory';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import App from 'App';
import createStore from 'store';
import { loadAssets, renderHtml } from 'components/Html';
import Server from 'components/Server';

const webRoot = resolve(__dirname, '..', 'web');
const loadCachedAssets = __DEV__ ? loadAssets : memoize(loadAssets);

const app = express();
app.use(morgan('dev'));
app.use('/static', express.static(webRoot));

app.get('*', async (req, res) => {
  const assets = await loadCachedAssets(join(webRoot, 'webpack-assets.json'));
  const networkInterface = createNetworkInterface({ uri: 'http://127.0.0.1' });

  networkInterface.use([{
    applyMiddleware(apolloReq, done) {
      if (!apolloReq.options.headers) {
        apolloReq.options.headers = {};
      }

      // req.options.headers.authorization = req.cookies.get('token');
      done();
    }
  }]);

  const client = new ApolloClient({ networkInterface, ssrMode: true });
  const store = createStore({}, createMemoryHistory(), client);
  const context = {};
  const html = <Server store={store} client={client} location={req.url} context={context}><App /></Server>;

  try {
    await getDataFromTree(html, { isAuthenticated: true });

    if (context.url) {
      res.redirect(302, context.url);
    } else {
      // const styles = styleSheet.rules().map((rule: TStyleSheetRule) => rule.cssText).join('\n');
      res.send(renderHtml('', client.store, assets, html));
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

app.listen(3000);
