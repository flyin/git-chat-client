/* eslint-disable sort-keys, max-len */
const environment = {
  development: {
    isProduction: false
  },

  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

export default Object.assign({
  urls: {
    api: `${process.env.API_URL}/graphql`,
    socket: process.env.API_URL
  },

  app: {
    head: {
      titleTemplate: '%s ∙ chat-example',

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII='
        }
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' }
      ]
    },
  }
}, environment);
