const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const serviceConfig = require('./serviceConfig.js')
const WebpackAutouploadJ = require('webpack-auto-upload-j')

module.exports = function () {
  const isLocal = process.env.NODE_ENV === 'dev'
  const option = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
      path: path.resolve(__dirname, './dabao'),
      chunkFilename: 'js/[name].chunk.js'
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            plugins: [
              ['import', { libraryName: 'antd', style: true }, 'eslint-loader'],
            ],
            cacheDirectory: true,
            cacheCompression: isLocal,
            compact: isLocal,
          }
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    "browsers": [
                      "defaults",
                      "not ie < 11",
                      "last 2 versions",
                      "> 1%",
                      "iOS 7",
                      "last 3 iOS versions"
                    ]
                  })
                ]
              }
            },
          ]
        },
        {
          test: /\.styl$/,
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
                plugins: [
                  require('autoprefixer')({
                    "browsers": [
                      "defaults",
                      "not ie < 11",
                      "last 2 versions",
                      "> 1%",
                      "iOS 7",
                      "last 3 iOS versions"
                    ]
                  })
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
                plugins: [
                  require('autoprefixer')({
                    "browsers": [
                      "defaults",
                      "not ie < 11",
                      "last 2 versions",
                      "> 1%",
                      "iOS 7",
                      "last 3 iOS versions"
                    ]
                  })
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
      }),
      new ProgressBarPlugin(),
      new UglifyJsPlugin()
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json']
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          common: {
            chunks: 'initial',
            minSize: 1,
            minChunks: 2,
            name: 'common'
          }
        }
      },
      runtimeChunk: true,
    },
    devtool: process.env.NODE_ENV === 'dev'? 'inline-source-map': '',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8088',
          changeOrigin: true, 
          // pathRewrite: {'^/api' : ''},
          secure: false
        },
        '/static': {
          target: 'http://127.0.0.1:8088',
          changeOrigin: true, 
          // pathRewrite: {'^/api' : ''},
          secure: false
        },
      }
    },
  }
  if (process.env.NODE_ENV !== 'dev') {
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    option.plugins.push(new CleanWebpackPlugin())
    option.plugins.push(new WebpackAutouploadJ({
      entryDir: 'dabao',
      serviceDir: '/usr/share/nginx/web/dabao',
      serviceConfig,
    }))
  }
  if (isLocal) {
    delete option.optimization
    option.plugins.pop()
  }
  return option
}