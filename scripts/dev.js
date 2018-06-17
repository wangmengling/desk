/**
 * Setup and run the development server for Hot-Module-Replacement
 * https://webpack.github.io/docs/hot-module-replacement-with-webpack.html
 * @flow
 */
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../config';
// import webpackConfig from '../config/webpack.config.dev';
import webpackConfig from '../webpack.config';
const path = require('path')
const app = new express();
const compiler = webpack(webpackConfig);

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
    })
);
app.use(webpackHotMiddleware(compiler));    
app.disable('etag');
app.use(express.static('public'));
// app.use(Express.static(path.join(__dirname, 'static')));
app.get("/*", function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/index.html') );
});

app.listen(config.server.port, config.server.host, err => {
    if (err) {
        console.error(err);
        return;
    }

    console.log(`Server is running with port ${config.server.port} 👏`);
});