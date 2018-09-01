
module.exports = {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    {
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }
  ]
};
