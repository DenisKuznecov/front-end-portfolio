const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};
const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

//this is for compile sass to css with sourcemap and expanded css
gulp.task('styles', () => {
	gulp.src('sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest('bundle/css'));
});

gulp.task('watch', () => {
	gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('default', ['styles', 'watch']);

//this is prod task without sourcemap and with minified css
gulp.task('prod', () => {
	gulp.src('sass/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest('bundle/css'));
});

