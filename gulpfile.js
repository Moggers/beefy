var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

function handleError(err){
    console.log("Failed to build")
    console.log(err.toString());
    this.emit('end');
}

gulp.task('default', function() {
    return gulp.src("src/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on("error", handleError)
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));

});
gulp.task('watch', function() {
    var watcher = gulp.watch('src/*.js', ['default']);
});