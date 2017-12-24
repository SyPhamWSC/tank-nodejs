'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', function(){
    return gulp.src('src/scripts/es6/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('src/scripts/es5'));
});