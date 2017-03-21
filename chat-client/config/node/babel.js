module.exports = {
  babelrc: false,
  cacheDirectory: true,

  env: {
    development: {
      plugins: [
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
      plugins: [require.resolve('babel-plugin-transform-es2015-modules-commonjs')]
    }
  },

  plugins: [
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
        node: 'current'
      }
    }],

    require.resolve('babel-preset-react')
  ]
};
