module.exports = {
  babelrc: false,
  cacheDirectory: true,

  env: {
    development: {
      plugins: [
        require.resolve('react-hot-loader/babel'),
        require.resolve('babel-plugin-transform-react-jsx-source'),
        require.resolve('babel-plugin-transform-react-jsx-self')
      ]
    },

    production: {
      plugins: [
        require.resolve('babel-plugin-transform-react-remove-prop-types'),
        require.resolve('babel-plugin-transform-react-constant-elements'),
        require.resolve('babel-plugin-transform-react-inline-elements')
      ]
    },

    test: {
      plugins: ['transform-es2015-modules-commonjs']
    }
  },

  plugins: [
    require.resolve('babel-plugin-lodash'),
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties')
  ],

  presets: [
    [require('babel-preset-env').default, {
      es2015: {
        loose: true,
        modules: false
      },

      targets: {
        browsers: ["last 2 versions"]
      }
    }],

    require.resolve('babel-preset-react')
  ]
};
