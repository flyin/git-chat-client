import fs from 'fs';
import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import Html from 'components/Html';

const doctype = '<!doctype html>\n';

export const loadAssets = path => new Promise((resolve, reject) => fs.readFile(path, (err, data) => {
  if (err) {
    return reject(err);
  }

  return resolve(JSON.parse(data.toString()));
}));

export const renderHtml = (styles, store, assets, component) => doctype + renderToStaticMarkup(
  <Html assets={assets} store={store} content={component ? renderToString(component) : ''} styles={styles} />
);
