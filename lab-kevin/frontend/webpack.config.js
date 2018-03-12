'use strict';

require('dotenv').config({path: `${__dirname}/.dev.env`});
let production = process.env.NODE_ENV === 'production';

const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const UglifyPlugin = require('uglifyjs-webpack-plugin');
const {DefinePlugin, EnvironmentPlugin} = require('webpack');

let plugins = [
  new HtmlPlugin({template: `${__dirname}/src/index.html`}),
  new ExtractTextPlugin('bundle-[hash].css'),
  new DefinePlugin({
    __DEBUG__: JSON.stringify(!production),
    __API_URL__: JSON.stringify(process.env.API_URL),
  }),
  new EnvironmentPlugin(['NODE_ENV']),
];

if (production){
  plugins = plugins.concat([
    new CleanPlugin(),
    new UglifyPlugin(),
  ]);
}

module.exports = {
  devtool: production ? undefined : 'eval-source-map',
  devServer: {historyApiFallback: true},
  entry: `${__dirname}/src/main.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'bungle-[hash].js',
    publicPath: '/',
  },
  plugins,
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node-modules/,
        loaders: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(jpg|jpeg|gif|png|tif|tiff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 6000,
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|glyph)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'font/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(mp3|mp4|wav)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};