const gulp = require('gulp');
const webdriver = require('gulp-webdriver');
const options = require('../options');

gulp.task('yzysupply', function () {
  return   (options.url.yeezysupply === '')
    ? console.log('\n\nಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ \n\n' +
    'Fill out the options.js file first! ' +
    '\n\nಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ ಠ_ಠ \n\n')
    : gulp.src('./wdio.conf.js').pipe(webdriver());
});
