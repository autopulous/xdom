'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var node = './node_modules';

var src = './src';
var debug = './debug';
var release = './release';

function clean(patterns) {
    console.log('deleting: ' + patterns);
    console.log('Note: should this fail you might have directories open in the terminal');

    var del = require('del');

    return del(patterns);
}

gulp.task('delete-node-modules', function () {
    return clean([node]);
});

gulp.task('clean', function () {
    return clean([debug, release, './*.log']);
});

gulp.task('compile-modules', function () {
    var sourcemaps = require('gulp-sourcemaps');
    var typescript = require('gulp-typescript');
    var merge = require('merge2');

    var src = gulp.src(['!./src/**/spec*.ts', './src/**/*.ts']);
    var dst = gulp.dest(release);

    var js = src.pipe(typescript(typescript.createProject('tsconfig.json')));
    var dts = src.pipe(typescript(typescript.createProject('tsconfig.json')));

    return merge([
        js.pipe(dst),     // writes .js files
        dts.dts.pipe(dst) // writes .d.ts files
    ]);
});

gulp.task('compile-modules-with-maps', function () {
    var sourcemaps = require('gulp-sourcemaps');
    var typescript = require('gulp-typescript');

    return gulp.src([src + '/**/*.ts', '!' + src + '/**/*spec.ts', './typings.d.ts'])
               .pipe(typescript(typescript.createProject('./tsconfig.json')))
               .pipe(sourcemaps.init())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(debug + '/'));
});

gulp.task('compile-tests', function () {
    var sourcemaps = require('gulp-sourcemaps');
    var typescript = require('gulp-typescript');

    return gulp.src([src + '/**/spec*.ts', './typings.d.ts'])
               .pipe(typescript(typescript.createProject('./tsconfig.json')))
               .pipe(sourcemaps.init())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(debug + '/'));
});

gulp.task('copy-static', function () {
    return gulp.src(['./src/package.json', './README.md'])
               .pipe(gulp.dest(release + '/'));
});

gulp.task('build-release', function (callback) {
    return runSequence(
        'clean',
        'compile-modules',
        'copy-static',
        callback);
});

gulp.task('build-debug', function (callback) {
    return runSequence(
        'clean',
        'compile-modules-with-maps',
        'compile-tests',
        callback);
});

// Do not automatically perform a clean files when rebuilding the tests because Karma in live mode tends to gets stuck when files that it is monitoring are deleted

gulp.task('watch', function () {
    gulp.watch([src + '/**/*.ts'], ['compile-modules-with-maps', 'compile-tests']);
});

gulp.task('default', function (callback) {
    return runSequence('build-debug',
                       'watch',
                       callback);
});