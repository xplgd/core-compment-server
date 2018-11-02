const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const del = require('del');

const minify = composer(uglifyes, console);

const src = ['./src/**/*.ts'];

const clean = dist => del(`./${dist}`);

const compile = (dist, debug, dev = true) => {
    debug('compiling...');
    const tsProject = ts.createProject('./tsconfig.json');
    let result = gulp.src(src);

    // 开发模式下初始化 source map
    if (dev) {
        result = result.pipe(sourcemaps.init());
    }
    result = result.pipe(tsProject()).js;
    // 开发模式下编写 source map
    if (dev) {
        result = result.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}));
    } else {
        result = result.pipe(minify());
    }

    return result.pipe(gulp.dest(`./${dist}`));
}

module.exports = {
    src,
    compile,
    clean
};
