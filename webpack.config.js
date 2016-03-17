var path = require('path');

var config = {
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.svg$/,
        loaders: ['url-loader', 'svg-loader']
      },
      {
        test: /\.(?:eot|ttf|woff)$/,
        loaders: ['url-loader']
      }
    ]
  }
};

module.exports = config;
