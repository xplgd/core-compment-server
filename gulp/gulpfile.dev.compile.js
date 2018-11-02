const debug = require('debug')('server:dev-compile');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const tasks = require('./tasks');

const dist = 'dev';

gulp.task('clean', () => tasks.clean(dist));

gulp.task('compile', () => tasks.compile(dist, debug));

gulp.task('default', () => {
    runSequence('clean', 'compile');
});
