const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'data'),
        publicPath: '/data',
      },
      {
        directory: path.join(__dirname, 'public'),
        publicPath: '/public',
      },
      {
        directory: path.join(__dirname, 'view'),
        publicPath: '/view',
      },
      {
        directory: path.join(__dirname, 'src'),
        publicPath: '/src',
      },
      {
        directory: path.join(__dirname, 'lib'),
        publicPath: '/lib',
      }
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "data", to: path.join(__dirname, 'dist/data'), },
        { from: "view", to: path.join(__dirname, 'dist/view') },
        { from: "public", to: path.join(__dirname, 'dist/public') },
    ],
  }),
],
  // resolve: {
  //   extensions: ['.js'],
  // },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                "targets": "> 0.25%, not dead",
                "useBuiltIns": "usage",
                "corejs": "3.8.3",
              }
            ]
          ]
        }
      }
    }]
  }
};