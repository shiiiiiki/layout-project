"use strict";
const gulp = require('gulp')
const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browserSyncJob = () => {
  browserSync.init({
    server: "build/"
  });

  watch('build/sass/*.scss', buildSass);
  watch('build/pages/*.pug', buildPug);
};

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('dist/sass/*.scss')
      .pipe(sass())
      .pipe(dest('build/styles/'))
      .pipe(browserSync.stream());
}

const buildPug = () => {
  console.log('Компиляция Pug');

  return src('dist/pages/*.pug')
      .pipe(pug())
      .pipe(dest('build/'))
      .pipe(browserSync.stream());
}

exports.server = browserSyncJob;
exports.development = parallel(buildSass, buildPug);

exports.default = async function () {
  gulp.watch('build/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('build/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('build/*.html').on('change', browserSync.reload);
};

