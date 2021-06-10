const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].bundle.css',
    chunkFilename: '[id].css'
  }),
];

// only enable hot in development
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = env => {
  return {
    plugins,
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      open: true,
      clientLogLevel: 'silent',
      port: 9000,
      historyApiFallback: true,
      hot: true
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
              ]
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
          test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ 
        },
      ]
    }
  }
}