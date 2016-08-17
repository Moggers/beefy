var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', function() {
    console.log("Building");
    return gulp.src("src/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});
gulp.task('watch', function() {
    var watcher = gulp.watch('src/*.js', ['default']);
    watcher.on('change', function(event) {
        console.log('file' + event.path + ' was ' + event.type + ', running tasks..');
    })
});