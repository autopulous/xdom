var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

gulp.task('delete-node-modules', function () {
    var patterns = ['./node_modules/'];

    console.log('deleting: ' + patterns);
    console.log('Note: should this fail you might have one of the directories open in the terminal');

    return del(patterns); // must return the del() result or intermittent and mysterious stream error may occur
});

gulp.task('CLEAN', function () {
    var patterns = ['./app/', './map/', './distro/', './*.log'];

    console.log('deleting: ' + patterns);
    console.log('Note: should this fail you might have one of the directories open in the terminal');

    return del(patterns); // must return the del() result or intermittent and mysterious stream error will occur
});

gulp.task('copy-images', function () {
    return gulp.src('./src/**/*.+(ico|gif|jpg|png)')
        .pipe(gulp.dest('./app/'));
});

gulp.task('compile-css', function () {
    var ext_replace = require('gulp-ext-replace');
    var postcss = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');
    var precss = require('precss');
    var cssnano = require('cssnano');
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src('./src/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write('../map/'))
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest('./app/'));
});

gulp.task('copy-html', function () {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./app/'));
});

gulp.task('copy-javascript', function () {
    return gulp.src(['./src/**/*.js', '!./src/**/spec*.js'])
        .pipe(gulp.dest('./app/'));
});

gulp.task('copy-test-javascript', function () {
    return gulp.src('./src/**/spec*.js')
        .pipe(gulp.dest('./app/'));
});

gulp.task('compile-typescript', function () {
    var typescript = require('gulp-typescript');
    var typescriptCompiler = typescript({typescript: require('ntypescript')});
    var typescriptProject = typescript(typescript.createProject('tsconfig.json'));
    var sourcemaps = require('gulp-sourcemaps');

    return gulp.src(['!./src/**/spec*.ts', './src/**/*.ts'])
        .pipe(typescriptProject)
        .pipe(gulp.dest('./app/'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('../map/'))
        .pipe(typescriptCompiler);
});

gulp.task('compile-test-typescript', function () {
    var sourcemaps = require('gulp-sourcemaps');
    var typescript = require('gulp-typescript');
    var typescriptCompiler = typescript({typescript: require('ntypescript')});
    var typescriptProject = typescript(typescript.createProject('tsconfig.json'));

    return gulp.src('./src/**/spec*.ts')
        .pipe(typescriptProject)
        .pipe(gulp.dest('./app/'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('../map/'))
        .pipe(typescriptCompiler);
});

gulp.task('build-distribution', function () {
    return gulp.src(['./src/package.json', './README.md', './app/**/*.js', './**/*.ts', '!./**/spec*.ts', '!./node_modules/', '!./node_modules/**', '!./typings/', '!./typings/**'])
        .pipe(gulp.dest('distro'));
});

gulp.task('BUILD-APPLICATION', function () {
    runSequence('CLEAN', 'compile-typescript', ['copy-images', 'compile-css', 'copy-html', 'copy-javascript']);
});

gulp.task('BUILD-TESTS', function () {
    runSequence('CLEAN', 'compile-typescript', ['copy-images', 'compile-css', 'copy-html', 'copy-javascript'], 'compile-test-typescript', 'copy-test-javascript');
});

gulp.task('BUILD-DISTRIBUTION', function () {
    runSequence('CLEAN', 'compile-typescript', ['copy-images', 'compile-css', 'copy-html', 'copy-javascript'], 'build-distribution');
});

gulp.task('WATCH', function () {
    gulp.watch(['./src/**/*'], ['BUILD-TESTS']);
});

gulp.task('default', function () {
    gulp.watch(['./src/**/*'], ['BUILD-TESTS']);
});