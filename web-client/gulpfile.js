'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    copy = require('gulp-copy'),
    clean = require('gulp-clean');

const DIST_DIR = './dist',
    SRC_DIR = './app';

gulp.task('clean', () => gulp.src(DIST_DIR).pipe(clean()));

gulp.task('package.json', () => gulp
    .src(`${SRC_DIR}/package.json`)
    .pipe(copy(DIST_DIR, { prefix: 1 })));

gulp.task('electron', ['clean'], () => gulp.src(`${SRC_DIR}/index.js`).pipe(copy(DIST_DIR, { prefix: 1 })));

gulp.task('Procfile', () => gulp.src('./Procfile').pipe(copy(DIST_DIR)));

gulp.task('package-web', ['package.json', 'Procfile']);
gulp.task('package-electron', ['electron']);
