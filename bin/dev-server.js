process.env.NODE_ENV = 'development';

const Express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../config/web/webpack')({ environment: 'development', target: 'web' });

const hostname = process.env.WEBPACK_HOST || '127.0.0.1';
const port = process.env.WEBPACK_PORT || 3030;

const app = new Express();
const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  contentBase: `http://${hostname}:${port}`,
  headers: { 'Access-Control-Allow-Origin': '*' },
  hot: true,
  inline: true,
  lazy: false,
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  stats: { colors: true }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, (err) => {
  if (err) {
    throw err;
  }

  console.info(`==> Dev server listening: http://${hostname}:${port}`);
});
