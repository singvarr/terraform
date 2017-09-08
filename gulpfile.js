const gulp = require('gulp');
	concat = require('gulp-concat');
	rename = require('gulp-rename');
	less = require('gulp-less');
	LessAutoPrefix = require('less-plugin-autoprefix');
	autoprefix = new LessAutoPrefix({browsers: ['last 3 versions']});
	cleanCSS = require('gulp-clean-css');
	imagemin = require('gulp-imagemin');
	imageminJpegRecompress = require('imagemin-jpeg-recompress');
	imageminPngquant = require('imagemin-pngquant');
	uglify = require('gulp-uglify');
	inject = require('gulp-inject');
	series = require('stream-series');
	htmlMin = require('gulp-htmlmin');
	clean = require('del');

gulp.task('styles', () => {
	return gulp.src('./src/less/main.less')
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(less({
			plugins: [autoprefix]
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', () => {
	return gulp.src('./src/js/*.js')
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('images', () => {
	return gulp.src('./src/assets/**/*.*')
		.pipe(imagemin([
			imageminPngquant({
				floyd: 0.3,
				quality: '30'
			}),
			imageminJpegRecompress({
				loops: 1,
				min: 50,
				max: 90,
				quality: 'veryhigh'
			})
		]))
		.pipe(gulp.dest('./dist/assets'))
});

gulp.task('fonts', () => {
	return gulp.src('./src/fonts/**/*.*')
		.pipe(gulp.dest('./dist/fonts'))
});

gulp.task('vendor', () => {
	return gulp.src('src/vendor/**/*.*')
		.pipe(gulp.dest('dist/vendor'))
});

gulp.task('html', () => {
	const streams = {
		vendorJS: gulp.src('dist/vendor/**/*.min.js', {read: false}),
		appJS: gulp.src('dist/js/**/*.min.js', {read: false}),
		vendorCSS: gulp.src('dist/vendor/**/*.css', {read: false}),
		appCSS: gulp.src(['dist/css/**/*.min.css', 'dist/fonts/**/*.css'], {read: false})
	}

	return gulp.src('./src/*.html')
		.pipe(inject(streams.vendorCSS, {
			name: 'vendorCSS',
			relative: true
		}))
		.pipe(inject(streams.appCSS, {relative: true}))
		.pipe(inject(streams.vendorJS, {
			name: 'vendorJS',
			relative: true
		}))
		.pipe(inject(streams.appJS, {relative: true}))
		.pipe(gulp.dest('dist'))
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist'))
});

gulp.task('default', function () {
	gulp.watch('src/less/*.less', ['styles']);
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/*.html', ['html']);
})

	

