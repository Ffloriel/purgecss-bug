const {
  resolve
} = require('path');
const {
  sync
} = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve('build'),
  },
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new PurgecssPlugin({
      paths: () => sync(`./src/**/*`, {
        nodir: true
      }),
      safelist: ['icon', '[class^="icon-"]', /\[class\*=" icon-"\]/], // tried both string and regex but not worked
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'bundle',
          test: /\.s?[ac]ss$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
  }
};