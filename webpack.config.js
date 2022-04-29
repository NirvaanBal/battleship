const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { exclude: ['node_modules'], loader: 'babel', test: /\.js?$/ },
      { loader: 'style-loader!css-loader', test: /\.css$/i },
    ],
  },
};
