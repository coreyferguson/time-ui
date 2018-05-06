
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Time',
      template: 'static/index.html'
    })
  ],

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }, {
      test: /\.html$/,
      use: [
        {
          loader: 'html-loader'
        }
      ]
    }]
  },

  externals: {
   'react': 'React',
   'react-dom': 'ReactDOM',
   'react-router': 'ReactRouter',
   'axios': true,
   'moment': true
  },

  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: 'local.time.overattribution.com',
    https: true
  }

};
