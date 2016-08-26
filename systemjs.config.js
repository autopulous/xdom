'use strict';

System.config({
    // tell the SystemJS loader where to look for packages and components

    map: {
        'xdom': '.'
    },

    // tell the SystemJS loader how to load when no filename and/or no extension

    packages: {
        'xdom': {main:'index.js', defaultExtension: 'js'}
    }
});