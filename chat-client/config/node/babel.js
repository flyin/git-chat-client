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

    test: {
      plugins: [require.resolve('babel-plugin-transform-es2015-modules-commonjs')]
    }
  },

  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread')
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
