import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import UglifyJS from 'uglify-js';
import { memoize } from 'lodash';

const minifyJS = code => (UglifyJS.minify(code, { fromString: true })).code;
const minify = memoize(minifyJS);

const getState = store => `window.__STORE=${JSON.stringify(store.getState())};`;

const Html = ({ assets, content, styles, store }) => {
  const head = Helmet.rewind();

  return (
    <html lang="ru-RU">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
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
};

Html.propTypes = {
  assets: PropTypes.shape({
    bundle: PropTypes.shape({ js: PropTypes.string.isRequired }),
    manifest: PropTypes.shape({ js: PropTypes.string, text: PropTypes.string.isRequired }),
    vendor: PropTypes.shape({ js: PropTypes.string.isRequired }),
  }).isRequired,

  content: PropTypes.string.isRequired,

  store: PropTypes.shape({
    apollo: PropTypes.object,
    forms: PropTypes.object,
    router: PropTypes.object
  }).isRequired,

  styles: PropTypes.string.isRequired
};

export default Html;
