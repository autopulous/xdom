'use strict';

module.exports = function (config) {
    config.set({
        basePath: '.',

        files: [
            {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false},
            {pattern: 'systemjs.config.js', included: true, watched: false},
            {pattern: 'karma.shim.js', included: true, watched: false},
            {pattern: 'debug/xdom.js', included: false, watched: true},
            {pattern: 'debug/spec.js', included: false, watched: true}
        ],

        autoWatch: true,

        logLevel: config.LOG_DEBUG,

        browsers: ['Chrome'],

        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-spec-reporter')
        ],

        reporters: ["spec"],

        specReporter: {
            maxLogLines: 100,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: false,
            suppressErrorSummary: true
        }
    });
};