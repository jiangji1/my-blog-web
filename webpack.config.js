const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function () {
  const option = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './dabao'),
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            plugins: [
              ['import', { libraryName: 'antd', style: true }],
            ],
            cacheDirectory: true,
          }
        },
        {
          test: /\.(css|styl)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugin: [
                  require('autoprefixer')({ browsers: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"] })
                ]
              }
            },
            'stylus-loader'
          ]
        },
        {
          test: /\.less$/,
          loader: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugin: [
                  require('autoprefixer')({})
                ]
              }
            },
            {
              loader: 'less-loader',
              options: { javascriptEnabled: true }
            }
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name][id].css',
        ignoreOrder: false
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html')
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json']
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            minChunks:1,
            priority: -10
          },
          default: {
            test: /[\\/]src[\\/]js[\\/]/,
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          common: {
            chunks: 'initial',
            minSize: 1,
            minChunks: 2
          }
        },
        filename: 'common.js'
      },
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`
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