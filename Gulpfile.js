var sassPath = 'sass/';
var	browserSyncUrl = 'vvv.dev';

var gulp = require('gulp');
var	watch = require('gulp-watch');
var	sass = require('gulp-sass');
var	autoprefixer = require('gulp-autoprefixer');
var	browserSync = require('browser-sync');
var	notify = require('gulp-notify');

gulp.task('styles', function() {
	gulp.src(sassPath + '**/*.scss')
		.pipe(sass({outputStyle: 'expanded'})).on('error', function(err) {notify().write(err);})
		.pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(notify({ message: 'Styles task complete', onLast: true }));
});

gulp.task('browser-sync', function() {
	var files = ['**/*.php','**/*.{png,jpg,gif}'];
	browserSync.init(files, {
		proxy: browserSyncUrl,
		injectChanges: true
	});
});

gulp.task('watch', function() {
	gulp.watch(sassPath + '**/*.scss', ['styles']);
});

gulp.task('default', ['browser-sync','watch']);
