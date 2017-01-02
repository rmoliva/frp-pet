'use strict';

module.exports = {
  context: __dirname + '/..',
  entry: {
    main: './src/index',
  },
  output: {
    filename: 'bundle.js',
    path: 'build',
  },

  // Turn on sourcemaps
  devtool: 'source-map-inline',
  resolve: {
    extensions: ['', '.js', '.json'],

    // Make sure root is src
    root: __dirname,

    // remove other default values
    modulesDirectories: ['node_modules'],
  },

  // Add minification
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'source-map-loader',
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
    }],
  },
  externals: {
    fs: 'require("fs")',
    buffer: 'require("buffer")',
    system: '{}',
    file: '{}',
  },
  target: 'node',
  watch: true,
};
