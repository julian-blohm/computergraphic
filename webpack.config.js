const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Computergrafik-Projekt',
    template: 'src/index.html'
  })],
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [
              "style-loader",
              "css-loader",
          ]
      },
    ]
  }
};