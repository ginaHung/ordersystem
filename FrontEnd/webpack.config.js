const path = require('path');
// const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      // filename: './index.html',
      // module: true,
      // columns: true,
      // lineToLine: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // 需轉譯的檔案
        exclude: /node_modules/, // 不需轉譯
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [ // 載入順序為後至前
          {
            // loader: "style-loader" // 後將解析的內容套入html
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader', // 先解析css
          },
        ],
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {
              'primary-color': 'rgba(90, 195, 235, 1)',
              'link-color': 'rgba(90, 195, 235, 1)',
            },
            javascriptEnabled: true,
          },
        }],
      },
      {
        test: /\.(pdf|jpg|png|gof|svg|ico)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
};
