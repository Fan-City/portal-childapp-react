const SERVICEID = require('../src/config.js').SERVICEID
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    service: './src/service.register.js'
  },
  output: {
    filename: SERVICEID + '-[name].js',
    publicPath: `/${SERVICEID}/`,
    path: path.resolve(__dirname, `../dist/${SERVICEID}/`)
  },
  devtool: 'cheap-source-map',
  devServer: {
    port: 8083,
    contentBase: './dist/'
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|inferno|preact/,
        loader: 'babel-loader',
        query: getBabelConfig()
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([`dist/${SERVICEID}/*.js`, `dist/${SERVICEID}/*.map`,`dist/${SERVICEID}/*.html`])
  ]
}

function getBabelConfig () {
  return {
    presets: [
      'react',
      ['babel-preset-env', {
        targets: {
          'browsers': ['edge >= 15']
        }
      }]
    ],
    plugins: [
      'transform-object-rest-spread',
      'transform-class-properties',
      'syntax-dynamic-import',
      'transform-function-bind'
    ]
  }
}
