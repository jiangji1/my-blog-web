const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function () {
  const option = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, './dabao'),
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /.tsx?$/,
          loader: 'ts-loader'
        },
        {
          test: /.json$/,
          loader: 'url-loader'
        },
        {
          test: /(css|styl)$/,
          loader: [
            MiniCssExtractPlugin.loader,
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugin: [
                  require('autoprefixer')({})
                ]
              }
            }
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json']
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            chunks: 'initial',
            minSize: 1,
            minChunks: 2
          }
        }
      }
    },
    devtool: process.env.NODE_ENV === 'dev'? 'inline-source-map': ''
  }
  if (process.env.NODE_ENV !== 'dev') {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    option.plugins.push(new CleanWebpackPlugin())
  }
  return option
}