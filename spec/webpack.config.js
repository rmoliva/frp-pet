'use strict';

// const path = require('path');
// const webpack = require('webpack');

module.exports = {
  context: __dirname + '/..',
  entry: {
    main: './spec/component.spec',
  },
  output: {
    filename: 'bundle.js',
    path: 'build',
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    root: __dirname,

    extensions: ['', '.js', '.json'],

    // remove other default values
    modulesDirectories: ['node_modules'],
  },
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
    // postLoaders: [{
    //   test: /^((?!\.spec\.ts).)*.ts$/,
    //   exclude: /(node_modules|bower_components)/,
    //   loader: 'istanbul-instrumenter'
    // }]
  },
  target: 'web',
  node: {
    fs: 'empty',
    window: false,
  },
  externals: {
    fs: 'require("fs")',
    buffer: 'require("buffer")',
    system: '{}',
    file: '{}',
  },
};
