require('./configure');

var argv = require('yargs').argv
var browserify = require('browserify');
var browsersync = require('browser-sync');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var jade = require('gulp-jade');
var minifycss = require('gulp-minify-css');
var notify = require('gulp-notify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

function buildScript (file) {
    var props = {
        entries: ['./src/' + file],
        debug: true,
        transform: [reactify]
    };
    var bundler = watchify(browserify(props));

    function rebundle () {
        var stream = bundler.bundle();

        return stream.on('error', handleError)
            .pipe(source('bundle.js'))
            .pipe(gulpif(argv.production, buffer()))
            .pipe(gulpif(argv.production, uglify()))
            .pipe(gulp.dest('./build/'));
    }

    bundler.on('update', function () {
        rebundle();
    });

    return rebundle();
}

function handleError () {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Error',
        message: '<%= error.message %>'
    }).apply(this, args);

    this.emit('end');
}

function buildView () {
    return gulp.src('./views/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./build/'));
}

function buildStyle () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/'));
}

gulp.task('build-script', function () {
    return buildScript('app.js');
});

gulp.task('build-view', function () {
    return buildView();
});

gulp.task('build-style', function () {
    return buildStyle();
});

gulp.task('watch-style', function () {
    gulp.watch(['./src/**/*.scss'], ['build-style']);
});

gulp.task('default', ['build-script', 'build-view', 'build-style', 'watch-style'], function () {
    if (!argv.production) {
        browsersync.init({
            files: ['./build/bundle.js', './build/styles.css'],
            notify: false,
            port: 8000,
            server: {
                baseDir: './build'
            },
            ui: false
        });
    }
});
