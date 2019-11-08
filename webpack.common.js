const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/App.ts',
  output: {
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - for use with fork plugin
          //transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  stats: {
    all: undefined,
    assets: true,
    builtAt: true,
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    colors: true,
    depth: false,
    entrypoints: false,
    env: false,
    errors: true,
    errorDetails: false,
    hash: true,
    maxModules: 15,
    modules: false,
    moduleTrace: false,
    performance: true,
    providedExports: false,
    publicPath: false,
    reasons: false,
    source: false,
    timings: true,
    usedExports: false,
    version: true,
    warnings: true
  }
};