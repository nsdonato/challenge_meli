const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: [
    './src/client/index.js',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'
  ],
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app.js',
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    historyApiFallback: true
  },
  devtool: 'inline-source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/app.css'
    })
  ]
})
