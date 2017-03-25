'use strict';

const gulp = require('gulp'),
    copy = require('gulp-copy'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename');
    
const SRC_DIR = './src',
    DIST_DIR = './dist';

gulp.task('dist', ['clean'], () => gulp
                            .src([`${SRC_DIR}/**/*`, `!${SRC_DIR}/package.json`])
                            .pipe(copy(DIST_DIR, { prefix: 1 })));

gulp.task('package.json', ['clean'], () => gulp
                                .src(`${SRC_DIR}/package.production.json`)
                                .pipe(copy(DIST_DIR, { prefix: 1 })));

gulp.task('rename package.json', ['package.json'], () => gulp
                                                    .src(`${DIST_DIR}/package.production.json`)
                                                    .pipe(rename('package.json'))
                                                    .pipe(gulp.dest(DIST_DIR)));

gulp.task('clean', () => gulp.src(DIST_DIR).pipe(clean()));

gulp.task('default', ['dist', 'rename package.json']);
