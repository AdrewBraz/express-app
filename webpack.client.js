const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {

  entry: './src/client/client.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module:{
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'stylus-loader']
        })
      },
      { test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      { test: /\.(ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png|gif)$/i,
        use: ['file-loader', {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        }]
      }

      
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};