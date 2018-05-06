
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },

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
    https: true
  }

};

module.exports = config;
