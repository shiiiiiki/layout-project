'use strict';
const APP = 'dist';
let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let sourcemaps = require('gulp-sourcemaps');

function buildStyles() {
    return gulp.src(`./${APP}/scss/pages/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['node_modules'],
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 3 versions'))
        .pipe(
            // Optional if you want to see not minified CSS file
            gulp.dest(`./${APP}/styles`)
        )
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write(`./`))
        .pipe(gulp.dest(`./${APP}/styles`));
}

exports.buildStyles = buildStyles;
exports.default = async function() {
    gulp.watch(`./${APP}/scss/**/*.scss`, gulp.series(buildStyles));
};

const { src, dest, parallel } = require('gulp');

function copyIndexScss() {
    return gulp.src('dist/scss/index.scss')
        .pipe(dest('build/styles/'));
}


exports.default = async function() {
    gulp.watch(`dist/scss/index.scss`);
};

function copyScss() {
    return gulp.src(['dist/scss/**/*.scss', '!dist/scss/components/**'])
        .pipe(dest('build/styles/'));
}


exports.copy = parallel(copyIndexScss, copyScss);

function sassCompile(done) {
    console.log('Compile SASS to CSS');
    console.log('Compile Pug to HTML');

    done();
}
exports.layoutCompile = sassCompile;