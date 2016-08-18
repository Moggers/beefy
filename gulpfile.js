var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var exec = require('gulp-exec');
var browserify = require('browserify')
var rename = require('gulp-rename')
var fs = require('fs')

function handleError(err){
    console.log("Failed to build")
    console.log(err.toString());
    this.emit('end');
}

gulp.task('cli', function() {
    return gulp.src(["src/js/beefy.js", 'src/js/beefycli.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on("error", handleError)
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));

});
gulp.task('graphics', function() {
    return browserify("./src/js/beefygraphics.js")
        .transform("babelify", {presets : ['es2015']})
        .bundle()
        .pipe(fs.createWriteStream("dist/beefygraphics.js"))
        .on('error', handleError)
})
gulp.task('beefy', function() {
    return gulp.src(['src/js/beefy.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', handleError)
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"))
})
gulp.task('tests', function() {
    return gulp.src(['src/js/beefy.js', 'src/tests/BeefySpec.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', handleError)
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("spec/beefy"))
})
gulp.task('runtests', function() {
    return exec('jasmine', function(err, stdout, stderr ) {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    })
    .on("error", handleError)
})
gulp.task('watch', function() {
    var beefywatcher = gulp.watch(['src/js/beefy.js'], ['beefy']);
    var cliwatcher = gulp.watch(['src/js/beefycli.js'], ['cli']);
    var graphicswatcher = gulp.watch(['src/js/beefygraphics.js'], ['graphics']);
    var testwatcher = gulp.watch(['src/tests/*.js'], ['tests', 'runtests']);
});