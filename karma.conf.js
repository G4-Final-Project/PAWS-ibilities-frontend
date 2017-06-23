// Karma configuration
// Generated on Tue Jun 20 2017 10:47:06 GMT-0700 (PDT)

const webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;

module.exports = function(config) {
  config.set({
    webpack: webpackConfig,
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/entry.js',
      'test/**/*-test.js',
    ],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-coverage',
      'mocha',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
    ],
    exclude: [
    ],
    preprocessors: {
      'app/entry.js': ['webpack'],
      'test/**/*-test.js': ['webpack', 'coverage'],
    },
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    hostname: process.env.IP,
    port: process.env.PORT,
  });
};
