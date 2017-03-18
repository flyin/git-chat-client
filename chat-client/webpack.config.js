module.exports = env => (env.target === 'web'
  ? require('./config/web/webpack')
  : require('./config/node/webpack')
)(env);
