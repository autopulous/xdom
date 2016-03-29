'use strict';

module.exports = function (config) {
    config.set({
        basePath: '.',

        files: [
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'app/xdom.js',
            'app/spec.js'
        ],

        autoWatch: true,

        logLevel: config.LOG_DEBUG,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-spec-reporter'],

        reporters: ["spec"],

        specReporter: {
            maxLogLines: 50,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: false,
            suppressErrorSummary: true
        }
    });
};
