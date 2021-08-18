const { merge } = require('webpack-merge')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'src/server/public'),
    filename: 'assets/app-[hash].js',
    publicPath: '/'
  },
  mode: 'production',
  devtool: 'hidden-source-map',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, 'src/server/public')
      ]
    }),
    new ManifestPlugin(),
    new CompressionWebpackPlugin({
      test: /\.js$|\.css$/,
      filename: '[path].gz'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/app-[hash].css'
    })
  ]
})
