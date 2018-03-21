const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          }, {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer({
                browsers: ['> 1%', 'last 2 versions'],
              })],
            },
          }, {
            loader: 'sass-loader',
          }],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]',
      },
      {
        test: /\.(ico)$/, // favicon
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
    extractSass,
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
