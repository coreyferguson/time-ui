
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const webpackModule = require('./config/webpackModule');
const environment = process.env.NODE_ENV || 'dev';
const envConfig = path.resolve(__dirname, `./config/${environment}.json`);

const config = {

  resolve: {
    alias: {
      config: envConfig
    }
  },

  module: webpackModule,

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Time',
      template: './src/index.html'
    }),
    new DynamicCdnWebpackPlugin()
  ],

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: 'local.time.overattribution.com',
    https: true,
    historyApiFallback: {
      index: '/index.html'
    }
  },

  externals: {
    moment: true
  }

};

module.exports = config;
