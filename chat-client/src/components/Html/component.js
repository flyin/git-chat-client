import React from 'react';
import UglifyJS from 'uglify-js';
import { memoize } from 'lodash';

const minifyJS = code => (UglifyJS.minify(code, { fromString: true })).code;
const minify = memoize(minifyJS);

const getState = store => `window.__STORE=${JSON.stringify(store.getState())};`;

const Html = ({ assets, content, styles, store }) => (
  <html lang="ru-RU">
    <head>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: styles }} />
    </head>
    <body>
      <div id="react-root" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: getState(store) }} />
      <script dangerouslySetInnerHTML={{ __html: minify(assets.manifest.text) }} />
      <script src={assets.vendor.js} />
      <script src={assets.bundle.js} />
    </body>
  </html>
);

export default Html;
