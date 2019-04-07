
module.exports = {
  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    {
      test: /\.scss$/,
      use: [ "style-loader", "css-loader", "sass-loader" ]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [ 'file-loader' ]
    }
  ]
};
