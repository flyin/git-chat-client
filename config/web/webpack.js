const webpack = require('webpack');
const { resolve } = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const apiUrl = process.env.API_URL || 'http://127.0.0.1:8000';
const hostname = process.env.WEBPACK_HOST || '127.0.0.1';
const port = process.env.WEBPACK_PORT || 3030;

module.exports = env => {
  const isProduction = env.environment === 'production';

  return {
    cache: true,
    target: 'web',
    context: resolve(__dirname),
    devtool: isProduction ? false : 'eval',
    stats: { colors: true },

    entry: {
      bundle: [
        ...!isProduction ? ['react-hot-loader/patch', `webpack-hot-middleware/client?path=http://${hostname}:${port}/__webpack_hmr`] : [],
        resolve('config', 'polyfills.js'),
        resolve('src', 'client.js')
      ]
    },

    output: {
      path: resolve('build', env.target),
      filename: isProduction ? '[name]-[chunkhash].js' : '[name].js',
      chunkFilename: isProduction ? '[name]-[chunkhash].js' : '[name].js',
      publicPath: isProduction ? '/static/' : `http://${hostname}:${port}/static/`,
      pathinfo: !isProduction
    },

    module: {
      noParse: /\.min\.js/,

      rules: [
        { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
        { test: /\.(graphql|gql)$/, exclude: /node_modules/, loader: 'graphql-tag/loader' },
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, query: require('./babel') },
        { test: /\.(jpg|png)$/, loader: 'url-loader?emitFile=false&limit=10240', exclude: /node_modules/ },
        { test: /\.(woff|woff2|ttf|eot)$/, loader: 'url-loader?emitFile=false&limit=10240', exclude: /node_modules/ },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?emitFile=false&limit=10240&mimetype=image/svg+xml' },

        {
          test: /\.css/,

          loaders: [
            'css-loader/locals?modules&camelCase=dashes&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
            'postcss-loader',
          ]
        }
      ]
    },

    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),

      new LodashModuleReplacementPlugin({
        paths: true
      }),

      new CleanPlugin([env.target], {
        root: resolve('build'),
        verbose: true,
        dry: false
      }),

      new AssetsPlugin({
        includeManifest: 'manifest',
        path: resolve('build', 'web')
      }),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
          API_URL: JSON.stringify(apiUrl)
        },

        __CLIENT__: true,
        __SERVER__: false,
        __DEV__: !isProduction
      }),

      new webpack.LoaderOptionsPlugin({
        options: {
          context: '/',

          postcss: function () {
            return [
              require('postcss-cssnext')(),
            ];
          }
        },

        minimize: isProduction,
        debug: !isProduction
      }),

      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', minChunks: module => /node_modules/.test(module.resource) }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),

      !isProduction && new webpack.HotModuleReplacementPlugin(),
      isProduction && new webpack.NoEmitOnErrorsPlugin(),

      isProduction && new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false, screw_ie8: true },
        output: { comments: false },
        sourceMap: false
      }),
    ].filter(i => !!i),

    resolve: {
      extensions: ['.json', '.js'],

      modules: [
        resolve('src'),
        'node_modules'
      ]
    }
  }
};
