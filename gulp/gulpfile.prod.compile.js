const debug = require('debug')('server:prod-compile');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const tasks = require('./tasks');

const dist = 'dist';

gulp.task('clean', () => tasks.clean(dist));

gulp.task('compile', () => tasks.compile(dist, debug, false));

gulp.task('default', () => {
    runSequence('clean', 'compile');
});
