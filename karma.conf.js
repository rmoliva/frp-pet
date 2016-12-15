'use strict';

// const webpack = require('webpack');
const webpackConfig = require('./spec/webpack.config');

// Karma configuration
// Generated on Tue Apr 19 2016 10:44:24 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      './spec/**/*.spec.js',
    ],

    // files: [
    //    // './src/**/*.ts',
    //    './spec/**/*Spec.ts'
    //  ],
    // list of files to exclude
    exclude: [],

    preprocessors: {
      './spec/**/*.spec.js': ['webpack'],
      // './spec/**/!(*.spec)+(.ts)': ['webpack', 'coverage']
      // './src/**/*.ts': ['coverage']
      // './spec/**/*Spec.ts': ['webpack'],
      // './src/bootstrap.ts': ['webpack', 'sourcemap', 'coverage']
    },

    reporters: ['mocha'],

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true,
      },
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_DEBUG,
    client: {
      captureConsole: true,
      mocha: {
        bail: true,
      },
    },

    // disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
    ],
  });
};
