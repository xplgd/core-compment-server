const debug = require('debug')('server:dev-compile');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const nodemon = require('gulp-nodemon');
const tasks = require('./tasks');

const dist = 'dev';

gulp.task('clean', () => tasks.clean(dist));

gulp.task('compile', () => tasks.compile(dist, debug));

gulp.task('dev-nodemon', ['compile'], () => {
    const devNodeMon = nodemon({
        script: `./${dist}/example/server.js`,
        watch: tasks.src,
        env: {NODE_ENV: 'development'}
    });

    devNodeMon.on('restart', () => debug('server has restarted'))
        .on('crash', () => {
            debug('server has crashed! restart in 10s')
            devNodeMon.emit('restart', 10)
        });

    gulp.watch(tasks.src, () => {
        debug('detecting files changed, recompile');
        tasks.compile(dist, debug);
        debug('recompile complete');
        devNodeMon.emit('restart');
    });
});

gulp.task('default', () => {
    runSequence('clean', 'dev-nodemon');
});
