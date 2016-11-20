// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./public/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

// 监视scss变化
gulp.task('default',function(){
    gulp.run('sass');
    gulp.watch('./public/sass/*.scss',function(){
        gulp.run('sass');
    });
});
