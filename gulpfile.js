var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var exec = require('gulp-exec');

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
        .pipe(concat("cli.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));

});
gulp.task('tests', function() {
    return gulp.src(['src/js/Beefy.js', 'src/tests/BeefySpec.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', handleError)
        .pipe(concat("BeefySpec.js"))
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
    var watcher = gulp.watch(['src/js/beefycli.js', 'src/js/beefy.js'], ['cli']);
    var testwatcher = gulp.watch(['src/js/Beefy.js','src/tests/*.js'], ['tests', 'runtests']);
});