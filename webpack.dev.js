const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'twang.css'
    })
  ],
  output: {
    path: path.resolve(__dirname, './dev'),
    filename: 'twang.js'
  }
});