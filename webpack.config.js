const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
dotenv.config();

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
    chunkFilename: '[id].css'
  }),
];

// only enable hot in development
if (process.env.NODE_ENV !== 'production') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = env => {
  return {
    plugins,
    entry: './src/index.tsx',
    mode: process.env.NODE_ENV,
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      publicPath: '/',
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      open: true,
      clientLogLevel: 'silent',
      port: 9000,
      historyApiFallback: false,
      hot: true,
      watchContentBase: true,
      proxy: {
        '/weather-report': {
          target: 'http://[::1]:3000',
          secure: false,
          changeOrigin: true,
        }
      }
    },
    module: {
      rules: [
        //JavaScript
        {
          test: /\.(jsx|js)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  "targets": "defaults" 
                }],
                '@babel/preset-react'
              ], 
              cacheDirectory: true, 
            }
          }]
        },
        //CSS
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },

            {
              loader: 'css-loader',
              options: {
                importLoaders: 0 
              }
            }
          ]
        }, 
        //TypeScript
        {
          test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ 
        },
        //videos
        {
          test: /\.mp4$/,
          use: [
              {
                  loader: "file-loader",
                  options: {
                      name: "[name].[ext]",
                      outputPath: "video"
                  }
              }
          ]
        }
      ]
    }
  }
}